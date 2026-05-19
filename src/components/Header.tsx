import Link from 'next/link';

interface HeaderProps {
  showBack?: boolean;
}

export function Header({ showBack = false }: HeaderProps) {
  return (
    <header className="border-b border-white/[0.06] bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-baseline gap-3">
          <span
            className="text-xs tracking-[0.3em] text-zinc-500"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            ÁLBUM VIRTUAL
          </span>
          <span
            className="text-xl font-black uppercase tracking-tight text-white group-hover:text-[var(--accent-red)] transition-colors"
            style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
          >
            Mundial 2026
          </span>
        </Link>
        {showBack && (
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
          >
            ← Volver
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
