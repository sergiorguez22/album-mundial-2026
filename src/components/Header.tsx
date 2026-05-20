import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import HeaderUserMenu from './HeaderUserMenu';

interface HeaderProps {
  showBack?: boolean;
}

export async function Header({ showBack = false }: HeaderProps) {
  const user = await getCurrentUser().catch(() => null);

  return (
    <header className="border-b border-white/[0.06] bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-baseline gap-3">
          <span
            className="hidden text-xs tracking-[0.3em] text-zinc-500 sm:inline"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            ÁLBUM VIRTUAL
          </span>
          <span
            className="text-xl font-black uppercase tracking-tight text-white transition-colors group-hover:text-[var(--accent-red)]"
            style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
          >
            Mundial 2026
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {showBack && (
            <Link
              href="/"
              className="hidden text-xs uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white sm:inline"
              style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            >
              ← Volver
            </Link>
          )}
          {user ? (
            <HeaderUserMenu name={user.name} role={user.role} />
          ) : (
            <Link
              href="/login"
              className="rounded-md border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:border-white/30"
              style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
