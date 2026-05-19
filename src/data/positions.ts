import type { PositionMeta } from '@/types';

export const POSITIONS: PositionMeta[] = [
  { id: 'POR', label: 'POR', color: '#F59E0B', fullName: 'Portero' },
  { id: 'DEF', label: 'DEF', color: '#3B82F6', fullName: 'Defensa' },
  { id: 'MED', label: 'MED', color: '#10B981', fullName: 'Mediocampista' },
  { id: 'DEL', label: 'DEL', color: '#EF4444', fullName: 'Delantero' },
];

export const POSITIONS_MAP: Record<string, PositionMeta> = POSITIONS.reduce(
  (acc, p) => ({ ...acc, [p.id]: p }),
  {} as Record<string, PositionMeta>,
);
