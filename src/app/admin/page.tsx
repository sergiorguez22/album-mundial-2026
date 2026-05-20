import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getSupabase, type UserRow } from '@/lib/supabase';
import { Header } from '@/components/Header';
import PendingActions from './PendingActions';

export const metadata: Metadata = {
  title: 'Admin · Álbum Mundial 2026',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const me = await getCurrentUser();
  if (!me || me.role !== 'admin') notFound();

  const { data: users } = await getSupabase()
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  const all = (users ?? []) as UserRow[];
  const pending = all.filter((u) => u.status === 'pending');
  const approved = all.filter((u) => u.status === 'approved');
  const rejected = all.filter((u) => u.status === 'rejected');

  return (
    <>
      <Header showBack />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <div
          className="mb-2 text-[10px] tracking-[0.32em] text-zinc-500"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          PANEL ADMIN
        </div>
        <h1
          className="mb-10 text-5xl uppercase text-white"
          style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
        >
          Solicitudes
        </h1>

        <section className="mb-12">
          <div className="mb-4 flex items-baseline justify-between border-b border-white/10 pb-3">
            <h2
              className="text-sm font-bold uppercase tracking-[0.2em] text-white"
              style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            >
              Pendientes
            </h2>
            <span
              className="text-[10px] tracking-[0.2em] text-zinc-500"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {pending.length}
            </span>
          </div>
          {pending.length === 0 ? (
            <p className="text-sm text-zinc-500">Sin solicitudes pendientes.</p>
          ) : (
            <div className="space-y-3">
              {pending.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-lg text-white"
                      style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
                    >
                      {u.name}
                    </div>
                    <div
                      className="text-xs text-zinc-400"
                      style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                    >
                      {u.email}
                    </div>
                    <div
                      className="mt-1 text-[10px] tracking-[0.15em] text-zinc-600"
                      style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                    >
                      {new Date(u.created_at).toLocaleString('es-ES', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </div>
                  </div>
                  <PendingActions userId={u.id} />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mb-12">
          <div className="mb-4 flex items-baseline justify-between border-b border-white/10 pb-3">
            <h2
              className="text-sm font-bold uppercase tracking-[0.2em] text-white"
              style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            >
              Aprobados
            </h2>
            <span
              className="text-[10px] tracking-[0.2em] text-zinc-500"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {approved.length}
            </span>
          </div>
          {approved.length === 0 ? (
            <p className="text-sm text-zinc-500">Aún no hay usuarios aprobados.</p>
          ) : (
            <ul className="divide-y divide-white/5 rounded-lg border border-white/10 bg-white/[0.02]">
              {approved.map((u) => (
                <li key={u.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-white">{u.name}</span>
                    <span
                      className="ml-2 text-xs text-zinc-500"
                      style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                    >
                      {u.email}
                    </span>
                  </div>
                  {u.role === 'admin' && (
                    <span
                      className="rounded-sm bg-white/95 px-2 py-0.5 text-[10px] font-black tracking-[0.15em] text-black"
                      style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                    >
                      ADMIN
                    </span>
                  )}
                  <span
                    className={
                      'rounded-sm border px-2 py-0.5 text-[10px] font-bold tracking-[0.15em] ' +
                      (u.activated_at
                        ? 'border-emerald-500/40 text-emerald-300'
                        : 'border-amber-500/40 text-amber-300')
                    }
                    style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                  >
                    {u.activated_at ? 'ACTIVO' : 'SIN ACTIVAR'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {rejected.length > 0 && (
          <section>
            <div className="mb-4 flex items-baseline justify-between border-b border-white/10 pb-3">
              <h2
                className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400"
                style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
              >
                Rechazados
              </h2>
              <span
                className="text-[10px] tracking-[0.2em] text-zinc-600"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {rejected.length}
              </span>
            </div>
            <ul className="divide-y divide-white/5 rounded-lg border border-white/10 bg-white/[0.02] opacity-70">
              {rejected.map((u) => (
                <li key={u.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-zinc-300">{u.name}</span>
                  <span
                    className="text-xs text-zinc-500"
                    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                  >
                    {u.email}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
