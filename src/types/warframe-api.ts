export interface WarframeItem {
  uniqueName: string;
  name: string;
  description: string;
  type: string;
  imageName: string;
  category: string;
  productCategory: string;
  tradable: boolean;
  masteryReq: number;
  buildPrice: number;
  buildTime: number;
  skipBuildTimePrice: number;
  buildQuantity: number;
  consumeOnBuild: boolean;
  components: Component[];
}

export interface Component {
  uniqueName: string;
  name: string;
  description: string;
  itemCount: number;
  imageName: string;
  tradable: boolean;
  ducats: number;
  credits: number;
}

export interface ModData {
  uniqueName: string;
  name: string;
  polarity: string;
  rarity: string;
  baseDrain: number;
  fusionLimit: number;
  description: string;
  type: string;
  levelStats: Array<{
    stats: string[];
    formatted: string[];
  }>;
  drops: Array<{
    location: string;
    type: string;
    chance: number;
    rarity: string;
  }>;
}

export interface WarframeData extends WarframeItem {
  health: number;
  shield: number;
  armor: number;
  power: number;
  sprintSpeed: number;
  abilities: Array<{
    name: string;
    description: string;
  }>;
}

export interface ApiSyncStatus {
  lastSync: Date;
  itemsUpdated: number;
  errors: Array<{
    item: string;
    error: string;
  }>;
}</content>