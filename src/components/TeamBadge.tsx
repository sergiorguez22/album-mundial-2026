import Link from 'next/link';
import Image from 'next/image';
import type { Team } from '@/types';
import { SQUAD_SIZE } from '@/data/teams';
import { getFlagSrc } from '@/data/flags';

interface TeamBadgeProps {
  team: Team;
  collected?: number;
}

export function TeamBadge({ team, collected = 0 }: TeamBadgeProps) {
  const { code, name, flag, colors, isHost, isDebutant } = team;
  const flagSrc = getFlagSrc(code);

  const gradient = `linear-gradient(160deg, ${colors.primary} 0%, ${colors.primary} 55%, ${colors.accent} 100%)`;
  const borderColor =
    colors.secondary === '#FFFFFF' ? 'rgba(255,255,255,0.35)' : colors.secondary;

  return (
    <Link
      href={`/seleccion/${code.toLowerCase()}`}
      aria-label={`Ver selección de ${name}`}
      className="group relative block overflow-hidden rounded-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl"
      style={{
        background: gradient,
        border: `2px solid ${borderColor}`,
        minHeight: '180px',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.25) 0%, transparent 50%)',
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-3">
          {flagSrc ? (
            <div
              className="relative h-12 w-16 overflow-hidden rounded-sm shadow-md ring-1 ring-black/30"
              aria-hidden="true"
            >
              <Image
                src={flagSrc}
                alt=""
                fill
                sizes="64px"
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
          ) : (
            <span className="text-4xl leading-none drop-shadow-lg" aria-hidden="true">
              {flag}
            </span>
          )}
          <div className="flex flex-col items-end gap-1">
            {isHost && (
              <span
                className="rounded-sm bg-white/95 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-black"
                style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
              >
                ANFITRIÓN
              </span>
            )}
            {isDebutant && (
              <span
                className="rounded-sm border border-white/40 bg-black/40 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-white"
                style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
              >
                DEBUTANTE
              </span>
            )}
          </div>
        </div>

        <div>
          <div
            className="text-xl font-black uppercase leading-tight text-white drop-shadow-md"
            style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
          >
            {name}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span
              className="text-[10px] font-bold tracking-[0.2em] text-white/90"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {code}
            </span>
            <span
              className="rounded-sm bg-black/40 px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-white/95"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {collected} / {SQUAD_SIZE}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TeamBadge;
