import {
  TEAMS,
  CONFEDERATIONS_ORDER,
  CONFEDERATION_NAMES,
  getTeamsByConfederation,
} from '@/data/teams';
import { Header } from '@/components/Header';
import { TeamBadge } from '@/components/TeamBadge';

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <section className="mb-12 text-center">
          <div
            className="mb-3 text-[11px] tracking-[0.3em] text-zinc-500"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            COLECCIONABLE NO OFICIAL · USO PRIVADO
          </div>
          <h1
            className="bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-5xl uppercase leading-none text-transparent sm:text-6xl md:text-7xl"
            style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
          >
            48 selecciones
          </h1>
          <p
            className="mx-auto mt-5 max-w-xl text-sm text-zinc-400"
            style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
          >
            Cada selección clasificada para el Mundial 2026. Elige una para abrir su plantilla y
            empezar a coleccionar cromos.
          </p>
          <div
            className="mx-auto mt-6 inline-flex gap-6 rounded-full border border-white/10 bg-black/40 px-6 py-2 text-[11px] tracking-[0.15em] text-zinc-400"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            <span>
              <span className="text-white">{TEAMS.length}</span> selecciones
            </span>
            <span>
              <span className="text-white">{TEAMS.filter((t) => t.isHost).length}</span> anfitriones
            </span>
            <span>
              <span className="text-white">{TEAMS.filter((t) => t.isDebutant).length}</span>{' '}
              debutantes
            </span>
          </div>
        </section>

        <div className="space-y-12">
          {CONFEDERATIONS_ORDER.map((conf) => {
            const teams = getTeamsByConfederation(conf);
            return (
              <section key={conf}>
                <div className="mb-5 flex items-baseline justify-between border-b border-white/10 pb-3">
                  <h2
                    className="text-base font-black uppercase tracking-[0.2em] text-white"
                    style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                  >
                    {CONFEDERATION_NAMES[conf]}
                  </h2>
                  <span
                    className="text-xs tracking-[0.15em] text-zinc-500"
                    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                  >
                    {teams.length} {teams.length === 1 ? 'selección' : 'selecciones'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {teams.map((team) => (
                    <TeamBadge key={team.code} team={team} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <footer className="mt-12 border-t border-white/[0.06] bg-black/40 py-6 text-center">
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
