import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
  title: 'Solicitar acceso · Álbum Mundial 2026',
  robots: { index: false, follow: false },
};

export default function RegistroPage() {
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
          Solicitar acceso
        </h1>
        <p
          className="mx-auto mb-8 max-w-sm text-center text-sm text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          El admin revisa cada solicitud. Cuando te apruebe, recibirás un email para crear tu
          contraseña y entrar.
        </p>

        <RegisterForm />

        <p
          className="mt-6 text-center text-sm text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-bold text-white hover:underline">
            Entrar
          </Link>
        </p>
      </main>
    </>
  );
}
