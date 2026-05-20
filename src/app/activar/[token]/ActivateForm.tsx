'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function ActivateForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo activar');
        return;
      }
      router.push('/');
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
          htmlFor="password"
          className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          Nueva contraseña
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition-colors focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)]"
        />
      </div>
      <div>
        <label
          htmlFor="confirm"
          className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          Confírmala
        </label>
        <input
          id="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition-colors focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)]"
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
        {loading ? 'Activando…' : 'Activar y entrar'}
      </button>
    </form>
  );
}
