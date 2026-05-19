import type { CSSProperties } from 'react';
import type { Player, Team } from '@/types';
import { POSITIONS_MAP } from '@/data/positions';

interface CardProps {
  player: Player;
  team: Team;
}

interface PlayerSilhouetteProps {
  tint: string;
  id: string;
}

function PlayerSilhouette({ tint, id }: PlayerSilhouetteProps) {
  const gradientId = `sil-${id}`;
  return (
    <svg viewBox="0 0 200 280" style={{ width: '70%', height: '90%', opacity: 0.55 }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint} stopOpacity="0.5" />
          <stop offset="100%" stopColor={tint} stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="60" r="38" fill={`url(#${gradientId})`} />
      <path d="M 30 280 Q 30 150 100 130 Q 170 150 170 280 Z" fill={`url(#${gradientId})`} />
    </svg>
  );
}

const FONT_DISPLAY = 'var(--font-anton), sans-serif';
const FONT_SANS = 'var(--font-archivo), sans-serif';
const FONT_SERIF = 'var(--font-cormorant), serif';
const FONT_MONO = 'var(--font-jetbrains), monospace';

export function Card({ player, team }: CardProps) {
  const {
    firstName,
    lastName,
    number,
    position,
    club,
    age,
    cardNumber,
    totalCards,
    photo,
    rarity,
  } = player;

  const pos = POSITIONS_MAP[position];
  const c = team.colors;
  const countryName = team.name.toUpperCase();

  const isIcon = rarity === 'icono';
  const isTopMaster = rarity === 'topmaster';
  const isCrack = rarity === 'crack';
  const isCapitan = rarity === 'capitan';

  let cardBg: string;
  let borderStyle: string;
  let glowStyle: CSSProperties = {};
  let textPrimary: string;
  let textSecondary: string;
  let accentColor: string;
  let rarityLabel: string;
  let rarityColor: string;

  if (isIcon) {
    cardBg = 'linear-gradient(165deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)';
    borderStyle = '3px solid #D4AF37';
    textPrimary = '#D4AF37';
    textSecondary = '#FFFFFF';
    accentColor = '#D4AF37';
    glowStyle = { animation: 'goldGlow 3s ease-in-out infinite' };
    rarityLabel = 'ICONO';
    rarityColor = '#D4AF37';
  } else if (isTopMaster) {
    cardBg = 'linear-gradient(160deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #B8860B 100%)';
    borderStyle = '3px solid #FFFFFF';
    textPrimary = '#1A1A1A';
    textSecondary = '#1A1A1A';
    accentColor = '#1A1A1A';
    glowStyle = {
      boxShadow:
        '0 0 40px rgba(255, 165, 0, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)',
    };
    rarityLabel = 'TOP MASTER';
    rarityColor = '#1A1A1A';
  } else if (isCrack) {
    cardBg = `linear-gradient(135deg, ${c.primary} 0%, ${c.secondary} 50%, ${c.primary} 100%)`;
    borderStyle = '3px solid transparent';
    textPrimary = '#FFFFFF';
    textSecondary = c.secondary === '#FFFFFF' ? c.accent : c.secondary;
    accentColor = c.accent;
    glowStyle = {
      backgroundImage: `linear-gradient(135deg, ${c.primary} 0%, ${c.secondary} 50%, ${c.primary} 100%), linear-gradient(135deg, #ff00ff, #00ffff, #ffff00, #ff00ff)`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      backgroundSize: '100% 100%, 400% 400%',
      animation: 'holoShimmer 4s linear infinite',
    };
    rarityLabel = 'CRACK';
    rarityColor = '#FFFFFF';
  } else if (isCapitan) {
    cardBg = `linear-gradient(160deg, ${c.primary} 0%, ${c.primary} 60%, ${c.accent} 100%)`;
    borderStyle = `3px solid ${c.secondary}`;
    textPrimary = '#FFFFFF';
    textSecondary = c.secondary;
    accentColor = c.secondary;
    glowStyle = { boxShadow: `0 0 30px ${c.secondary}50` };
    rarityLabel = 'CAPITÁN';
    rarityColor = c.secondary;
  } else {
    cardBg = `linear-gradient(160deg, ${c.primary} 0%, ${c.primary} 55%, ${c.accent} 100%)`;
    borderStyle = `2px solid ${c.secondary}`;
    textPrimary = '#FFFFFF';
    textSecondary = c.secondary;
    accentColor = c.secondary;
    glowStyle = {};
    rarityLabel = 'BASE';
    rarityColor = '#FFFFFF';
  }

  const photoFilter = isIcon
    ? 'grayscale(100%) contrast(1.1)'
    : isTopMaster
    ? 'saturate(1.3) contrast(1.1)'
    : 'none';
  const silhouetteTint = isIcon ? '#D4AF37' : isTopMaster ? '#1A1A1A' : '#FFFFFF';
  const silhouetteId = `${team.code}-${cardNumber}`;

  return (
    <div
      style={{
        width: '300px',
        height: '470px',
        borderRadius: '14px',
        background: cardBg,
        border: borderStyle,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: FONT_SANS,
        flexShrink: 0,
        ...glowStyle,
      }}
    >
      {/* Patrón decorativo de fondo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: isIcon
            ? 'repeating-linear-gradient(45deg, transparent 0, transparent 10px, rgba(212, 175, 55, 0.05) 10px, rgba(212, 175, 55, 0.05) 11px)'
            : isTopMaster
            ? 'repeating-linear-gradient(135deg, transparent 0, transparent 8px, rgba(255,255,255,0.08) 8px, rgba(255,255,255,0.08) 9px)'
            : 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.18) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Dorsal gigante marca de agua */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          right: '-30px',
          fontFamily: FONT_DISPLAY,
          fontSize: '320px',
          color: isIcon
            ? 'rgba(212, 175, 55, 0.07)'
            : isTopMaster
            ? 'rgba(0,0,0,0.08)'
            : 'rgba(255, 255, 255, 0.08)',
          lineHeight: 1,
          fontWeight: 900,
          pointerEvents: 'none',
        }}
      >
        {number}
      </div>

      {/* Banda superior: país + número de coleccionable */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: isIcon
            ? 'rgba(212, 175, 55, 0.12)'
            : isTopMaster
            ? 'rgba(0,0,0,0.15)'
            : 'rgba(0, 0, 0, 0.28)',
          backdropFilter: 'blur(4px)',
          borderBottom: `1px solid ${accentColor}40`,
          zIndex: 5,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ fontSize: '18px' }}>{team.flag}</span>
          <span
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 900,
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: textPrimary,
            }}
          >
            {countryName}
          </span>
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 700,
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: textPrimary,
            opacity: 0.85,
          }}
        >
          {String(cardNumber).padStart(3, '0')} / {totalCards}
        </div>
      </div>

      {/* Badge posición flotante */}
      <div
        style={{
          position: 'absolute',
          top: '48px',
          left: '14px',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: isIcon ? '#D4AF37' : isTopMaster ? '#1A1A1A' : pos.color,
          color: isTopMaster ? '#FFD700' : '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_DISPLAY,
          fontSize: '14px',
          fontWeight: 900,
          letterSpacing: '0.05em',
          zIndex: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
          border: '2px solid rgba(255,255,255,0.2)',
        }}
      >
        {pos.label}
      </div>

      {/* Sello rareza */}
      <div
        style={{
          position: 'absolute',
          top: '48px',
          right: '12px',
          padding: '4px 9px',
          background: isIcon
            ? '#D4AF37'
            : isTopMaster
            ? '#1A1A1A'
            : isCrack
            ? 'rgba(0,0,0,0.6)'
            : isCapitan
            ? c.secondary
            : 'rgba(0,0,0,0.45)',
          color: isIcon
            ? '#1A1A1A'
            : isTopMaster
            ? '#FFD700'
            : isCapitan
            ? c.primary
            : rarityColor,
          fontFamily: FONT_SANS,
          fontSize: '9px',
          fontWeight: 900,
          letterSpacing: '0.15em',
          borderRadius: '3px',
          zIndex: 4,
          border: isIcon || isTopMaster ? 'none' : '1px solid rgba(255,255,255,0.3)',
        }}
      >
        {rarityLabel}
      </div>

      {/* Brazalete capitán */}
      {isCapitan && (
        <div
          style={{
            position: 'absolute',
            top: '170px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-8deg)',
            zIndex: 4,
            width: '76px',
            height: '26px',
            background: `linear-gradient(90deg, ${c.secondary}, ${c.accent})`,
            border: '2px solid #FFFFFF',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT_DISPLAY,
            fontSize: '18px',
            color: '#FFFFFF',
            letterSpacing: '0.15em',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          C
        </div>
      )}

      {/* Zona foto — protagonista */}
      <div
        style={{
          position: 'absolute',
          top: '42px',
          left: 0,
          right: 0,
          height: '320px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={lastName}
            style={{
              maxWidth: '95%',
              maxHeight: '100%',
              objectFit: 'contain',
              filter: photoFilter,
            }}
          />
        ) : (
          <PlayerSilhouette tint={silhouetteTint} id={silhouetteId} />
        )}
      </div>

      {/* Banda inferior con nombre + dorsal */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '14px 16px',
          background: isIcon
            ? 'linear-gradient(0deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 85%, transparent 100%)'
            : isTopMaster
            ? 'linear-gradient(0deg, rgba(0,0,0,0.35) 0%, transparent 100%)'
            : 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
          zIndex: 3,
        }}
      >
        {firstName && (
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: '11px',
              fontWeight: 500,
              color: isTopMaster ? '#1A1A1A' : textSecondary,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.9,
              marginBottom: '-3px',
            }}
          >
            {firstName}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontFamily: isIcon ? FONT_SERIF : FONT_DISPLAY,
              fontSize: isIcon ? '36px' : '34px',
              fontWeight: isIcon ? 700 : 900,
              color: isTopMaster ? '#1A1A1A' : '#FFFFFF',
              letterSpacing: isIcon ? '0' : '0.02em',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              fontStyle: isIcon ? 'italic' : 'normal',
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {lastName}
          </div>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: '32px',
              fontWeight: 900,
              color: isTopMaster ? '#1A1A1A' : textSecondary,
              lineHeight: 0.95,
            }}
          >
            {number}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '8px',
            marginTop: '8px',
            borderTop: `1px solid ${
              isTopMaster ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)'
            }`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: '10px',
              fontWeight: 700,
              color: isTopMaster ? '#1A1A1A' : '#FFFFFF',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.95,
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {club || '—'}
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: '10px',
              fontWeight: 700,
              color: isTopMaster ? '#1A1A1A' : textSecondary,
              opacity: 0.95,
              letterSpacing: '0.05em',
            }}
          >
            {age ? `${age} AÑOS` : '∞'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
