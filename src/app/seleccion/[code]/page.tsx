import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  TEAMS,
  SQUAD_SIZE,
  CONFEDERATION_NAMES,
  getTeamByCode,
} from '@/data/teams';
import { getFlagSrc } from '@/data/flags';
import { Header } from '@/components/Header';

interface PageParams {
  params: Promise<{ code: string }>;
}

export function generateStaticParams() {
  return TEAMS.map((team) => ({ code: team.code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { code } = await params;
  const team = getTeamByCode(code);
  if (!team) return { title: 'Selección no encontrada · Álbum Mundial 2026' };
  return {
    title: `${team.name} · Álbum Mundial 2026`,
    description: `Plantilla y cromos de ${team.name} para el Mundial 2026.`,
  };
}

export default async function SeleccionPage({ params }: PageParams) {
  const { code } = await params;
  const team = getTeamByCode(code);
  if (!team) notFound();

  const { name, flag, confederation, isHost, isDebutant, colors } = team;
  const flagSrc = getFlagSrc(team.code);
  const bgGradient = `radial-gradient(ellipse at top, ${colors.primary}55 0%, transparent 60%), radial-gradient(ellipse at bottom right, ${colors.accent}33 0%, transparent 60%), #0a0a0a`;

  return (
    <>
      <Header showBack />
      <main className="flex-1">
        <section
          className="relative overflow-hidden border-b border-white/10"
          style={{ background: bgGradient }}
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-16 text-center sm:flex-row sm:items-end sm:text-left">
            {flagSrc ? (
              <div
                className="relative h-32 w-48 shrink-0 overflow-hidden rounded-md shadow-2xl ring-1 ring-white/20 sm:h-40 sm:w-60"
                aria-hidden="true"
              >
                <Image
                  src={flagSrc}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 192px, 240px"
                  style={{ objectFit: 'cover' }}
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <div
                className="text-[120px] leading-none drop-shadow-2xl sm:text-[160px]"
                aria-hidden="true"
              >
                {flag}
              </div>
            )}
            <div className="flex-1">
              <div
                className="mb-2 text-[11px] tracking-[0.3em] text-white/60"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {CONFEDERATION_NAMES[confederation]}
              </div>
              <h1
                className="text-5xl uppercase leading-none text-white drop-shadow-lg sm:text-7xl"
                style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
              >
                {name}
              </h1>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span
                  className="rounded-sm bg-white/95 px-3 py-1 text-[10px] font-black tracking-[0.2em] text-black"
                  style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                >
                  {team.code}
                </span>
                {isHost && (
                  <span
                    className="rounded-sm bg-[var(--accent-red)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white"
                    style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                  >
                    ANFITRIÓN
                  </span>
                )}
                {isDebutant && (
                  <span
                    className="rounded-sm border border-white/40 bg-black/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white"
                    style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                  >
                    DEBUTANTE
                  </span>
                )}
                <span
                  className="rounded-sm border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-white"
                  style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                >
                  0 / {SQUAD_SIZE} CROMOS
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <div
              className="mb-3 text-[10px] tracking-[0.3em] text-zinc-500"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              PRÓXIMO SPRINT
            </div>
            <h2
              className="text-3xl uppercase text-white"
              style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
            >
              Plantilla en construcción
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-400"
              style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            >
              Los jugadores de {name} se cargarán en el próximo sprint, con cromos de las cinco
              rarezas: base, crack, capitán, top master e icono.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {(['base', 'crack', 'capitán', 'top master', 'icono'] as const).map((r) => (
                <span
                  key={r}
                  className="rounded-sm border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-300"
                  style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-white/[0.06] bg-black/40 py-6 text-center">
        <p
          className="text-[10px] tracking-[0.2em] text-zinc-600"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          ÁLBUM VIRTUAL · MUNDIAL 2026 · COLECCIONABLE NO OFICIAL
        </p>
      </footer>
    </>
  );
}
