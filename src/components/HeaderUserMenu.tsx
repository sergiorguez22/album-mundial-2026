'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  name: string;
  role: 'admin' | 'user';
}

export default function HeaderUserMenu({ name, role }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:border-white/30"
        style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
      >
        <span className="max-w-[120px] truncate">{name}</span>
        {role === 'admin' && (
          <span
            className="rounded-sm bg-white/95 px-1.5 py-0.5 text-[9px] font-black tracking-[0.15em] text-black"
            style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
          >
            ADMIN
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute right-0 z-50 mt-1.5 w-44 overflow-hidden rounded-md border border-white/10 bg-black/95 shadow-2xl backdrop-blur-md"
          role="menu"
        >
          {role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-xs uppercase tracking-[0.15em] text-zinc-200 transition-colors hover:bg-white/[0.06] hover:text-white"
              style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
              role="menuitem"
            >
              Panel admin
            </Link>
          )}
          <Link
            href="/perfil"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-xs uppercase tracking-[0.15em] text-zinc-200 transition-colors hover:bg-white/[0.06] hover:text-white"
            style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            role="menuitem"
          >
            Mi perfil
          </Link>
          <button
            onClick={logout}
            className="block w-full border-t border-white/10 px-3 py-2 text-left text-xs uppercase tracking-[0.15em] text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
            style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            role="menuitem"
          >
            Salir
          </button>
        </div>
      )}
    </div>
  );
}
