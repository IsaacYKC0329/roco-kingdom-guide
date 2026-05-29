export interface Pet {
  id: number;
  name: string;
  element: string;
  elementColor: string;
  elementBg: string;
  rarity: number;
  image: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    magic: number;
    resist: number;
  };
  description: string;
  skills: string[];
  evolution?: string;
}

export interface Skill {
  id: number;
  name: string;
  element: string;
  elementColor: string;
  power: number;
  pp: number;
  accuracy: number;
  type: 'Physical' | 'Special' | 'Status';
  description: string;
}

export interface ElementType {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  icon: string;
  strongAgainst: string[];
  weakAgainst: string[];
  immuneTo?: string[];
}

export interface PvPTier {
  tier: string;
  tierName: string;
  color: string;
  pets: {
    name: string;
    role: string;
    element: string;
    elementColor: string;
    why: string;
  }[];
}

export interface GuideSection {
  id: string;
  title: string;
  icon: string;
  content: GuideContent[];
}

export interface GuideContent {
  subtitle: string;
  text: string;
}
