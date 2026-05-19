export type Confederation = 'UEFA' | 'CAF' | 'AFC' | 'CONMEBOL' | 'CONCACAF' | 'OFC';

export interface Team {
  code: string;
  name: string;
  flag: string;
  confederation: Confederation;
  isHost: boolean;
  isDebutant: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export type Rarity = 'base' | 'crack' | 'capitan' | 'topmaster' | 'icono';
export type Position = 'POR' | 'DEF' | 'MED' | 'DEL';

export interface Player {
  firstName: string;
  lastName: string;
  number: number;
  position: Position;
  club: string;
  age: number | null;
  photo: string | null;
  rarity: Rarity;
  cardNumber: number;
  totalCards: number;
  teamCode: string;
}

export interface RarityMeta {
  id: Rarity;
  label: string;
  description: string;
}

export interface PositionMeta {
  id: Position;
  label: string;
  color: string;
  fullName: string;
}
