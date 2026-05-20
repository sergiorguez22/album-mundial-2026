'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);
    const payload: { name?: string; password?: string } = {};
    if (name !== currentName) payload.name = name;
    if (password) payload.password = password;
    if (!payload.name && !payload.password) {
      setError('No hay cambios que guardar');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/perfil', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo guardar');
        return;
      }
      setOk(true);
      setPassword('');
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
          htmlFor="name"
          className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          Nombre
        </label>
        <input
          id="name"
          type="text"
          required
          minLength={2}
          maxLength={60}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition-colors focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)]"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          Nueva contraseña (opcional)
        </label>
        <input
          id="password"
          type="password"
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Déjalo vacío para no cambiarla"
          className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white placeholder-zinc-500 outline-none transition-colors focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)]"
        />
      </div>
      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}
      {ok && (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          Cambios guardados.
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[var(--accent-red)] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
      >
        {loading ? 'Guardando…' : 'Guardar cambios'}
      </button>
    </form>
  );
}
