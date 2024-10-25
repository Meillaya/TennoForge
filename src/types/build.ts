export type BuildType = 'warframe' | 'primary' | 'secondary' | 'melee' | 'archwing' | 'companion';

export type Polarity = 'madurai' | 'vazarin' | 'naramon' | 'zenurik' | 'unairu' | 'penjaga' | 'umbra';

export interface Mod {
  id: string;
  name: string;
  description: string;
  image: string;
  rank: number;
  maxRank: number;
  polarity: Polarity;
  capacity: number;
  effect: {
    type: string;
    value: number;
  }[];
}

export interface BuildData {
  title: string;
  description: string;
  mods: (Mod | null)[];
  forma: number;
  polarities: (Polarity | null)[];
  capacity: {
    current: number;
    max: number;
  };
}

export interface Build extends BuildData {
  id: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  votes: number;
  comments: number;
  views: number;
}