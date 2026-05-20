'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({ returnTo }: { returnTo?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo entrar');
        return;
      }
      router.push(returnTo && returnTo.startsWith('/') ? returnTo : '/');
      router.refresh();
    } catch {
      setError('Error de red');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white placeholder-zinc-500 outline-none transition-colors focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)]"
          placeholder="tu@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white placeholder-zinc-500 outline-none transition-colors focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)]"
        />
      </div>
      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[var(--accent-red)] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
      >
        {loading ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}
