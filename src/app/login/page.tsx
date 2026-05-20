import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Entrar · Álbum Mundial 2026',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ returnTo?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { returnTo } = await searchParams;
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <div
          className="mb-2 text-center text-[10px] tracking-[0.32em] text-zinc-500"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          ÁLBUM VIRTUAL · MUNDIAL 2026
        </div>
        <h1
          className="mb-8 text-center text-4xl uppercase text-white sm:text-5xl"
          style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
        >
          Entrar
        </h1>

        <LoginForm returnTo={returnTo} />

        <p
          className="mt-6 text-center text-sm text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          ¿Aún no tienes cuenta?{' '}
          <Link href="/registro" className="font-bold text-white hover:underline">
            Solicitar acceso
          </Link>
        </p>
      </main>
    </>
  );
}
