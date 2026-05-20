import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  TEAMS,
  SQUAD_SIZE,
  CONFEDERATION_FULL_NAMES,
  getTeamByCode,
  getTeamsByGroup,
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
    title: `${team.name} · Grupo ${team.group} · Álbum Mundial 2026`,
    description: `Plantilla y cromos de ${team.name} para el Mundial 2026.`,
  };
}

export default async function SeleccionPage({ params }: PageParams) {
  const { code } = await params;
  const team = getTeamByCode(code);
  if (!team) notFound();

  const { name, flag, confederation, group, colors } = team;
  const flagSrc = getFlagSrc(team.code);
  const rivals = getTeamsByGroup(group).filter((t) => t.code !== team.code);

  const bgGradient = `radial-gradient(ellipse at top, ${colors.primary}55 0%, transparent 60%), radial-gradient(ellipse at bottom right, ${colors.accent}33 0%, transparent 60%), #0a0a0a`;
  const accentBar = `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 100%)`;

  return (
    <>
      <Header showBack />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden border-b border-white/10"
          style={{ background: bgGradient }}
        >
          <div className="absolute inset-x-0 top-0 h-1" style={{ background: accentBar }} aria-hidden="true" />
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-16 text-center sm:flex-row sm:items-end sm:text-left">
            {flagSrc ? (
              <div
                className="relative h-32 w-48 shrink-0 overflow-hidden rounded-md shadow-2xl ring-1 ring-white/20 sm:h-44 sm:w-64"
                aria-hidden="true"
              >
                <Image
                  src={flagSrc}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 192px, 256px"
                  style={{ objectFit: 'cover' }}
                  priority
                  unoptimized={flagSrc.endsWith('.svg')}
                />
              </div>
            ) : (
              <div className="text-[140px] leading-none drop-shadow-2xl" aria-hidden="true">
                {flag}
              </div>
            )}
            <div className="flex-1">
              <div
                className="mb-2 text-[11px] tracking-[0.3em] text-white/60"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {CONFEDERATION_FULL_NAMES[confederation]}
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
                <span
                  className="rounded-sm border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                  style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                >
                  Grupo {group}
                </span>
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

        {/* Rivales del grupo */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-5 flex items-baseline justify-between">
            <h2
              className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-300"
              style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            >
              Rivales en el grupo {group}
            </h2>
            <span
              className="text-[10px] tracking-[0.2em] text-zinc-500"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {rivals.length} selecciones
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {rivals.map((r) => {
              const rivalFlag = getFlagSrc(r.code);
              return (
                <Link
                  key={r.code}
                  href={`/seleccion/${r.code.toLowerCase()}`}
                  className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-white/30 hover:bg-white/[0.06]"
                >
                  {rivalFlag && (
                    <div className="relative h-9 w-12 shrink-0 overflow-hidden rounded-sm ring-1 ring-black/40">
                      <Image
                        src={rivalFlag}
                        alt=""
                        fill
                        sizes="48px"
                        style={{ objectFit: 'cover' }}
                        unoptimized={rivalFlag.endsWith('.svg')}
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div
                      className="truncate text-sm uppercase text-white sm:text-base"
                      style={{
                        fontFamily: 'var(--font-anton), sans-serif',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {r.name}
                    </div>
                    <div
                      className="text-[10px] tracking-[0.15em] text-zinc-500"
                      style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                    >
                      {r.code}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Placeholder Sprint 2 */}
        <section className="mx-auto max-w-3xl px-6 pb-20">
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
              Los 26 jugadores de {name} se cargarán en el próximo sprint, con cromos de las cinco
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
