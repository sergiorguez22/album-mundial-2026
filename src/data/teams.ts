import type { GroupId, Team } from '@/types';

export const TEAMS: Team[] = [
  // Grupo A
  { code: 'MEX', name: 'México',          flag: '🇲🇽', confederation: 'CONCACAF', group: 'A', colors: { primary: '#006847', secondary: '#FFFFFF', accent: '#CE1126' } },
  { code: 'KOR', name: 'Corea del Sur',   flag: '🇰🇷', confederation: 'AFC',      group: 'A', colors: { primary: '#FFFFFF', secondary: '#CD2E3A', accent: '#0047A0' } },
  { code: 'RSA', name: 'Sudáfrica',       flag: '🇿🇦', confederation: 'CAF',      group: 'A', colors: { primary: '#007749', secondary: '#FFB81C', accent: '#000000' } },
  { code: 'CZE', name: 'República Checa', flag: '🇨🇿', confederation: 'UEFA',     group: 'A', colors: { primary: '#D7141A', secondary: '#FFFFFF', accent: '#11457E' } },

  // Grupo B
  { code: 'CAN', name: 'Canadá',               flag: '🇨🇦', confederation: 'CONCACAF', group: 'B', colors: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#1A1A1A' } },
  { code: 'SUI', name: 'Suiza',                flag: '🇨🇭', confederation: 'UEFA',     group: 'B', colors: { primary: '#DA291C', secondary: '#FFFFFF', accent: '#1A1A1A' } },
  { code: 'QAT', name: 'Catar',                flag: '🇶🇦', confederation: 'AFC',      group: 'B', colors: { primary: '#8A1538', secondary: '#FFFFFF', accent: '#1A1A1A' } },
  { code: 'BIH', name: 'Bosnia y Herzegovina', flag: '🇧🇦', confederation: 'UEFA',     group: 'B', colors: { primary: '#002F6C', secondary: '#FECB00', accent: '#FFFFFF' } },

  // Grupo C
  { code: 'BRA', name: 'Brasil',    flag: '🇧🇷', confederation: 'CONMEBOL', group: 'C', colors: { primary: '#FEDF00', secondary: '#009C3B', accent: '#002776' } },
  { code: 'MAR', name: 'Marruecos', flag: '🇲🇦', confederation: 'CAF',      group: 'C', colors: { primary: '#C1272D', secondary: '#006233', accent: '#FFFFFF' } },
  { code: 'SCO', name: 'Escocia',   flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA',     group: 'C', colors: { primary: '#0065BD', secondary: '#FFFFFF', accent: '#1A1A1A' } },
  { code: 'HAI', name: 'Haití',     flag: '🇭🇹', confederation: 'CONCACAF', group: 'C', colors: { primary: '#00209F', secondary: '#D21034', accent: '#FFFFFF' } },

  // Grupo D
  { code: 'USA', name: 'Estados Unidos', flag: '🇺🇸', confederation: 'CONCACAF', group: 'D', colors: { primary: '#3C3B6E', secondary: '#FFFFFF', accent: '#B22234' } },
  { code: 'PAR', name: 'Paraguay',       flag: '🇵🇾', confederation: 'CONMEBOL', group: 'D', colors: { primary: '#D52B1E', secondary: '#FFFFFF', accent: '#0038A8' } },
  { code: 'AUS', name: 'Australia',      flag: '🇦🇺', confederation: 'AFC',      group: 'D', colors: { primary: '#012169', secondary: '#FFD100', accent: '#E4002B' } },
  { code: 'TUR', name: 'Turquía',        flag: '🇹🇷', confederation: 'UEFA',     group: 'D', colors: { primary: '#E30A17', secondary: '#FFFFFF', accent: '#1A1A1A' } },

  // Grupo E
  { code: 'GER', name: 'Alemania',        flag: '🇩🇪', confederation: 'UEFA',     group: 'E', colors: { primary: '#1A1A1A', secondary: '#DD0000', accent: '#FFCE00' } },
  { code: 'ECU', name: 'Ecuador',         flag: '🇪🇨', confederation: 'CONMEBOL', group: 'E', colors: { primary: '#FFD100', secondary: '#0072CE', accent: '#EF3340' } },
  { code: 'CIV', name: 'Costa de Marfil', flag: '🇨🇮', confederation: 'CAF',      group: 'E', colors: { primary: '#FF8200', secondary: '#FFFFFF', accent: '#009A44' } },
  { code: 'CUW', name: 'Curazao',         flag: '🇨🇼', confederation: 'CONCACAF', group: 'E', colors: { primary: '#002B7F', secondary: '#FFFFFF', accent: '#F9E814' } },

  // Grupo F
  { code: 'NED', name: 'Países Bajos', flag: '🇳🇱', confederation: 'UEFA', group: 'F', colors: { primary: '#FF6700', secondary: '#FFFFFF', accent: '#21468B' } },
  { code: 'JPN', name: 'Japón',        flag: '🇯🇵', confederation: 'AFC',  group: 'F', colors: { primary: '#BC002D', secondary: '#FFFFFF', accent: '#1A1A1A' } },
  { code: 'TUN', name: 'Túnez',        flag: '🇹🇳', confederation: 'CAF',  group: 'F', colors: { primary: '#E70013', secondary: '#FFFFFF', accent: '#1A1A1A' } },
  { code: 'SWE', name: 'Suecia',       flag: '🇸🇪', confederation: 'UEFA', group: 'F', colors: { primary: '#006AA7', secondary: '#FECC00', accent: '#FFFFFF' } },

  // Grupo G
  { code: 'BEL', name: 'Bélgica',        flag: '🇧🇪', confederation: 'UEFA', group: 'G', colors: { primary: '#1A1A1A', secondary: '#FAE042', accent: '#ED2939' } },
  { code: 'IRN', name: 'Irán',           flag: '🇮🇷', confederation: 'AFC',  group: 'G', colors: { primary: '#239F40', secondary: '#FFFFFF', accent: '#DA0000' } },
  { code: 'EGY', name: 'Egipto',         flag: '🇪🇬', confederation: 'CAF',  group: 'G', colors: { primary: '#CE1126', secondary: '#FFFFFF', accent: '#1A1A1A' } },
  { code: 'NZL', name: 'Nueva Zelanda',  flag: '🇳🇿', confederation: 'OFC',  group: 'G', colors: { primary: '#FFFFFF', secondary: '#000000', accent: '#C8102E' } },

  // Grupo H
  { code: 'ESP', name: 'España',         flag: '🇪🇸', confederation: 'UEFA',     group: 'H', colors: { primary: '#C60B1E', secondary: '#FFC400', accent: '#1A1A1A' } },
  { code: 'URU', name: 'Uruguay',        flag: '🇺🇾', confederation: 'CONMEBOL', group: 'H', colors: { primary: '#5CBFEB', secondary: '#FFFFFF', accent: '#1A1A1A' } },
  { code: 'KSA', name: 'Arabia Saudita', flag: '🇸🇦', confederation: 'AFC',      group: 'H', colors: { primary: '#006C35', secondary: '#FFFFFF', accent: '#1A1A1A' } },
  { code: 'CPV', name: 'Cabo Verde',     flag: '🇨🇻', confederation: 'CAF',      group: 'H', colors: { primary: '#003893', secondary: '#FFFFFF', accent: '#CF2027' } },

  // Grupo I
  { code: 'FRA', name: 'Francia', flag: '🇫🇷', confederation: 'UEFA', group: 'I', colors: { primary: '#002654', secondary: '#FFFFFF', accent: '#ED2939' } },
  { code: 'SEN', name: 'Senegal', flag: '🇸🇳', confederation: 'CAF',  group: 'I', colors: { primary: '#00853F', secondary: '#FDEF42', accent: '#E31B23' } },
  { code: 'NOR', name: 'Noruega', flag: '🇳🇴', confederation: 'UEFA', group: 'I', colors: { primary: '#EF2B2D', secondary: '#FFFFFF', accent: '#002868' } },
  { code: 'IRQ', name: 'Irak',    flag: '🇮🇶', confederation: 'AFC',  group: 'I', colors: { primary: '#CE1126', secondary: '#FFFFFF', accent: '#1A1A1A' } },

  // Grupo J
  { code: 'ARG', name: 'Argentina', flag: '🇦🇷', confederation: 'CONMEBOL', group: 'J', colors: { primary: '#74ACDF', secondary: '#FFFFFF', accent: '#F6B40E' } },
  { code: 'AUT', name: 'Austria',   flag: '🇦🇹', confederation: 'UEFA',     group: 'J', colors: { primary: '#ED2939', secondary: '#FFFFFF', accent: '#1A1A1A' } },
  { code: 'ALG', name: 'Argelia',   flag: '🇩🇿', confederation: 'CAF',      group: 'J', colors: { primary: '#006233', secondary: '#FFFFFF', accent: '#D21034' } },
  { code: 'JOR', name: 'Jordania',  flag: '🇯🇴', confederation: 'AFC',      group: 'J', colors: { primary: '#1A1A1A', secondary: '#FFFFFF', accent: '#CE1126' } },

  // Grupo K
  { code: 'POR', name: 'Portugal',    flag: '🇵🇹', confederation: 'UEFA',     group: 'K', colors: { primary: '#046A38', secondary: '#DA291C', accent: '#FFD100' } },
  { code: 'COL', name: 'Colombia',    flag: '🇨🇴', confederation: 'CONMEBOL', group: 'K', colors: { primary: '#FCD116', secondary: '#003893', accent: '#CE1126' } },
  { code: 'UZB', name: 'Uzbekistán',  flag: '🇺🇿', confederation: 'AFC',      group: 'K', colors: { primary: '#0099B5', secondary: '#FFFFFF', accent: '#1EB53A' } },
  { code: 'COD', name: 'RD Congo',    flag: '🇨🇩', confederation: 'CAF',      group: 'K', colors: { primary: '#007FFF', secondary: '#F7D618', accent: '#CE1021' } },

  // Grupo L
  { code: 'ENG', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA',     group: 'L', colors: { primary: '#FFFFFF', secondary: '#CE1124', accent: '#1A1A1A' } },
  { code: 'CRO', name: 'Croacia',    flag: '🇭🇷', confederation: 'UEFA',     group: 'L', colors: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#171796' } },
  { code: 'PAN', name: 'Panamá',     flag: '🇵🇦', confederation: 'CONCACAF', group: 'L', colors: { primary: '#005AA7', secondary: '#FFFFFF', accent: '#D21034' } },
  { code: 'GHA', name: 'Ghana',      flag: '🇬🇭', confederation: 'CAF',      group: 'L', colors: { primary: '#CE1126', secondary: '#FCD116', accent: '#006B3F' } },
];

export const SQUAD_SIZE = 26;

export const GROUPS_ORDER: GroupId[] = [
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
];

export const CONFEDERATION_NAMES: Record<Team['confederation'], string> = {
  CONCACAF: 'CONCACAF',
  CONMEBOL: 'CONMEBOL',
  UEFA: 'UEFA',
  AFC: 'AFC',
  CAF: 'CAF',
  OFC: 'OFC',
};

export const CONFEDERATION_FULL_NAMES: Record<Team['confederation'], string> = {
  CONCACAF: 'CONCACAF · Norteamérica, Centroamérica y Caribe',
  CONMEBOL: 'CONMEBOL · Sudamérica',
  UEFA: 'UEFA · Europa',
  AFC: 'AFC · Asia',
  CAF: 'CAF · África',
  OFC: 'OFC · Oceanía',
};

export function getTeamByCode(code: string): Team | undefined {
  const normalized = code.toUpperCase();
  return TEAMS.find((t) => t.code === normalized);
}

export function getTeamsByGroup(group: GroupId): Team[] {
  return TEAMS.filter((t) => t.group === group);
}
