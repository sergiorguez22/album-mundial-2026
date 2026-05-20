import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import ActivateForm from './ActivateForm';

export const metadata: Metadata = {
  title: 'Activar cuenta · Álbum Mundial 2026',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function ActivarPage({ params }: PageProps) {
  const { token } = await params;
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
          className="mb-2 text-center text-4xl uppercase text-white sm:text-5xl"
          style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
        >
          Activar cuenta
        </h1>
        <p
          className="mx-auto mb-8 max-w-sm text-center text-sm text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          Elige una contraseña para acceder al álbum.
        </p>

        <ActivateForm token={token} />
      </main>
    </>
  );
}
