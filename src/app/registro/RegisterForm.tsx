'use client';

import { useState, type FormEvent } from 'react';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo enviar la solicitud');
        return;
      }
      setDone(true);
    } catch {
      setError('Error de red');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
        <div
          className="mb-2 text-[10px] tracking-[0.25em] text-emerald-300"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          SOLICITUD ENVIADA
        </div>
        <h2
          className="text-2xl uppercase text-white"
          style={{ fontFamily: 'var(--font-anton), sans-serif', letterSpacing: '0.02em' }}
        >
          Gracias, {name}
        </h2>
        <p
          className="mt-3 text-sm text-zinc-300"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          Cuando el admin apruebe tu solicitud te llegará un email a <strong>{email}</strong> con un
          enlace para crear tu contraseña.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          Tu nombre
        </label>
        <input
          id="name"
          type="text"
          required
          minLength={2}
          maxLength={60}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white placeholder-zinc-500 outline-none transition-colors focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)]"
          placeholder="Ej: Yeray"
        />
      </div>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-white placeholder-zinc-500 outline-none transition-colors focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)]"
          placeholder="tu@email.com"
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
        {loading ? 'Enviando…' : 'Solicitar acceso'}
      </button>
    </form>
  );
}
