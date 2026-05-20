import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Header } from '@/components/Header';
import ProfileForm from './ProfileForm';

export const metadata: Metadata = {
  title: 'Mi perfil · Álbum Mundial 2026',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function PerfilPage() {
  const me = await getCurrentUser();
  if (!me) redirect('/login');

  return (
    <>
      <Header showBack />
      <main className="mx-auto w-full max-w-md flex-1 px-6 py-12">
        <div
          className="mb-2 text-[10px] tracking-[0.32em] text-zinc-500"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          MI PERFIL
        </div>
        <h1
          className="mb-2 text-4xl uppercase text-white sm:text-5xl"
          style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
        >
          {me.name}
        </h1>
        <p
          className="mb-8 text-sm text-zinc-500"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          {me.email}
          {me.role === 'admin' && (
            <span
              className="ml-3 rounded-sm bg-white/95 px-2 py-0.5 text-[10px] font-black tracking-[0.15em] text-black"
              style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            >
              ADMIN
            </span>
          )}
        </p>

        <ProfileForm currentName={me.name} />
      </main>
    </>
  );
}
