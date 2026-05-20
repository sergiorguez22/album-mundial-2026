import {
  TEAMS,
  GROUPS_ORDER,
  getTeamsByGroup,
  SQUAD_SIZE,
} from '@/data/teams';
import { Header } from '@/components/Header';
import { TeamBadge } from '@/components/TeamBadge';

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        {/* Hero */}
        <section className="mb-14 text-center">
          <div
            className="mb-3 text-[11px] tracking-[0.32em] text-zinc-500"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            COLECCIONABLE NO OFICIAL · USO PRIVADO
          </div>
          <h1
            className="bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-5xl uppercase leading-none text-transparent sm:text-7xl"
            style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
          >
            Álbum Mundial 2026
          </h1>
          <p
            className="mx-auto mt-5 max-w-xl text-sm text-zinc-400"
            style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
          >
            48 selecciones, 12 grupos, una colección. Elige una para abrir su plantilla y empezar
            a coleccionar cromos.
          </p>
          <div
            className="mx-auto mt-7 inline-flex gap-6 rounded-full border border-white/10 bg-black/40 px-5 py-2.5 text-[11px] tracking-[0.18em] text-zinc-400"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            <span>
              <span className="text-white">{TEAMS.length}</span> selecciones
            </span>
            <span>
              <span className="text-white">{GROUPS_ORDER.length}</span> grupos
            </span>
            <span>
              <span className="text-white">{TEAMS.length * SQUAD_SIZE}</span> cromos
            </span>
          </div>
        </section>

        {/* Grupos A-L */}
        <div className="space-y-14">
          {GROUPS_ORDER.map((groupId) => {
            const teams = getTeamsByGroup(groupId);
            return (
              <section key={groupId} aria-labelledby={`grupo-${groupId}`}>
                <div className="mb-5 flex items-baseline gap-4 border-b border-white/10 pb-3">
                  <div
                    className="text-[10px] tracking-[0.35em] text-zinc-500"
                    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                  >
                    GRUPO
                  </div>
                  <h2
                    id={`grupo-${groupId}`}
                    className="text-4xl leading-none text-white sm:text-5xl"
                    style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.04em' }}
                  >
                    {groupId}
                  </h2>
                  <div className="ml-auto flex flex-wrap items-center gap-1.5">
                    {teams.map((t) => (
                      <span
                        key={t.code}
                        className="rounded-sm border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-zinc-300"
                        style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                      >
                        {t.code}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                  {teams.map((team) => (
                    <TeamBadge key={team.code} team={team} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <footer className="mt-14 border-t border-white/[0.06] bg-black/40 py-6 text-center">
        <p
          className="text-[10px] tracking-[0.22em] text-zinc-600"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          ÁLBUM VIRTUAL · MUNDIAL 2026 · COLECCIONABLE NO OFICIAL
        </p>
      </footer>
    </>
  );
}
