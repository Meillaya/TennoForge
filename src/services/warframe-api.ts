import axios from 'axios';
import { redis } from '../lib/redis';
import { prisma } from '../lib/prisma';
import { WarframeData, ModData, ApiSyncStatus } from '../types/warframe-api';

const WARFRAME_API_BASE = 'https://api.warframestat.us';
const CACHE_TTL = {
  ITEMS: 60 * 60 * 24, // 24 hours
  MODS: 60 * 60 * 24,
  WARFRAMES: 60 * 60 * 24,
  BUILD_DATA: 60 * 5, // 5 minutes
};

export class WarframeApiService {
  private static instance: WarframeApiService;
  private syncInProgress: boolean = false;
  private lastSyncStatus: ApiSyncStatus | null = null;

  private constructor() {}

  static getInstance(): WarframeApiService {
    if (!WarframeApiService.instance) {
      WarframeApiService.instance = new WarframeApiService();
    }
    return WarframeApiService.instance;
  }

  async syncWarframeData(): Promise<ApiSyncStatus> {
    if (this.syncInProgress) {
      throw new Error('Sync already in progress');
    }

    this.syncInProgress = true;
    const status: ApiSyncStatus = {
      lastSync: new Date(),
      itemsUpdated: 0,
      errors: [],
    };

    try {
      // Sync Warframes
      const warframes = await this.fetchWarframes();
      await this.updateWarframesInDb(warframes);
      status.itemsUpdated += warframes.length;

      // Sync Mods
      const mods = await this.fetchMods();
      await this.updateModsInDb(mods);
      status.itemsUpdated += mods.length;

      // Update cache
      await this.updateCache();
      
      this.lastSyncStatus = status;
    } catch (error) {
      status.errors.push({
        item: 'global',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      this.syncInProgress = false;
    }

    return status;
  }

  private async fetchWarframes(): Promise<WarframeData[]> {
    const response = await axios.get(`${WARFRAME_API_BASE}/warframes`);
    return response.data;
  }

  private async fetchMods(): Promise<ModData[]> {
    const response = await axios.get(`${WARFRAME_API_BASE}/mods`);
    return response.data;
  }

  private async updateWarframesInDb(warframes: WarframeData[]): Promise<void> {
    for (const warframe of warframes) {
      await prisma.warframe.upsert({
        where: { uniqueName: warframe.uniqueName },
        update: {
          name: warframe.name,
          description: warframe.description,
          health: warframe.health,
          shield: warframe.shield,
          armor: warframe.armor,
          energy: warframe.power,
          imageUrl: `https://cdn.warframestat.us/img/${warframe.imageName}`,
          abilities: {
            deleteMany: {},
            create: warframe.abilities.map(ability => ({
              name: ability.name,
              description: ability.description,
            })),
          },
        },
        create: {
          uniqueName: warframe.uniqueName,
          name: warframe.name,
          description: warframe.description,
          health: warframe.health,
          shield: warframe.shield,
          armor: warframe.armor,
          energy: warframe.power,
          imageUrl: `https://cdn.warframestat.us/img/${warframe.imageName}`,
          abilities: {
            create: warframe.abilities.map(ability => ({
              name: ability.name,
              description: ability.description,
            })),
          },
        },
      });
    }
  }

  private async updateModsInDb(mods: ModData[]): Promise<void> {
    for (const mod of mods) {
      await prisma.mod.upsert({
        where: { uniqueName: mod.uniqueName },
        update: {
          name: mod.name,
          description: mod.description,
          polarity: mod.polarity.toLowerCase(),
          baseDrain: mod.baseDrain,
          fusionLimit: mod.fusionLimit,
          type: mod.type,
          imageUrl: `https://cdn.warframestat.us/img/${mod.uniqueName}.png`,
          rarity: mod.rarity,
          stats: {
            deleteMany: {},
            create: mod.levelStats?.[mod.levelStats.length - 1]?.formatted.map(stat => ({
              description: stat,
            })) || [],
          },
        },
        create: {
          uniqueName: mod.uniqueName,
          name: mod.name,
          description: mod.description,
          polarity: mod.polarity.toLowerCase(),
          baseDrain: mod.baseDrain,
          fusionLimit: mod.fusionLimit,
          type: mod.type,
          imageUrl: `https://cdn.warframestat.us/img/${mod.uniqueName}.png`,
          rarity: mod.rarity,
          stats: {
            create: mod.levelStats?.[mod.levelStats.length - 1]?.formatted.map(stat => ({
              description: stat,
            })) || [],
          },
        },
      });
    }
  }

  private async updateCache(): Promise<void> {
    const warframes = await prisma.warframe.findMany({
      include: { abilities: true },
    });
    const mods = await prisma.mod.findMany({
      include: { stats: true },
    });

    await Promise.all([
      redis.set('warframes', JSON.stringify(warframes), 'EX', CACHE_TTL.WARFRAMES),
      redis.set('mods', JSON.stringify(mods), 'EX', CACHE_TTL.MODS),
    ]);
  }

  async getWarframe(uniqueName: string): Promise<WarframeData | null> {
    const cached = await redis.get(`warframe:${uniqueName}`);
    if (cached) {
      return JSON.parse(cached);
    }

    const warframe = await prisma.warframe.findUnique({
      where: { uniqueName },
      include: { abilities: true },
    });

    if (warframe) {
      await redis.set(
        `warframe:${uniqueName}`,
        JSON.stringify(warframe),
        'EX',
        CACHE_TTL.WARFRAMES
      );
    }

    return warframe;
  }

  async getMod(uniqueName: string): Promise<ModData | null> {
    const cached = await redis.get(`mod:${uniqueName}`);
    if (cached) {
      return JSON.parse(cached);
    }

    const mod = await prisma.mod.findUnique({
      where: { uniqueName },
      include: { stats: true },
    });

    if (mod) {
      await redis.set(
        `mod:${uniqueName}`,
        JSON.stringify(mod),
        'EX',
        CACHE_TTL.MODS
      );
    }

    return mod;
  }

  async searchItems(query: string): Promise<Array<WarframeData | ModData>> {
    const results = await prisma.$transaction([
      prisma.warframe.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: { abilities: true },
      }),
      prisma.mod.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: { stats: true },
      }),
    ]);

    return [...results[0], ...results[1]];
  }

  getLastSyncStatus(): ApiSyncStatus | null {
    return this.lastSyncStatus;
  }

  isSyncInProgress(): boolean {
    return this.syncInProgress;
  }
}</content>