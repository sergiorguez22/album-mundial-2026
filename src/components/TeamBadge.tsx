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
  const { code, name, colors } = team;
  const flagSrc = getFlagSrc(code);

  const bottomGradient = `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.88) 100%)`;
  const topAccent = `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 100%)`;

  return (
    <Link
      href={`/seleccion/${code.toLowerCase()}`}
      aria-label={`Ver selección de ${name}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-zinc-950 transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
    >
      {/* Banda superior con colores del equipo */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-1"
        style={{ background: topAccent }}
        aria-hidden="true"
      />

      {/* Bandera de fondo (ocupa toda la carta, con escala al hover) */}
      <div className="absolute inset-0">
        {flagSrc ? (
          <Image
            src={flagSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ objectPosition: 'center' }}
            unoptimized={flagSrc.endsWith('.svg')}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: `linear-gradient(160deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
            }}
          />
        )}
      </div>

      {/* Gradiente oscuro inferior para que el texto se lea */}
      <div className="absolute inset-x-0 bottom-0 h-3/5" style={{ background: bottomGradient }} aria-hidden="true" />

      {/* Código FIFA en esquina superior derecha */}
      <div className="absolute right-2 top-3 z-10 rounded-sm bg-black/70 px-2 py-0.5 backdrop-blur-sm">
        <span
          className="text-[10px] font-bold tracking-[0.2em] text-white"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          {code}
        </span>
      </div>

      {/* Bloque inferior con nombre + contador */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-3">
        <div
          className="text-lg uppercase leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-xl"
          style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
        >
          {name}
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(collected / SQUAD_SIZE) * 100}%`,
                background: colors.primary === '#FFFFFF' ? '#fff' : colors.primary,
              }}
            />
          </div>
          <span
            className="ml-2 text-[10px] font-bold tracking-[0.1em] text-white/95"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            {collected}/{SQUAD_SIZE}
          </span>
        </div>
      </div>

    </Link>
  );
}

export default TeamBadge;
