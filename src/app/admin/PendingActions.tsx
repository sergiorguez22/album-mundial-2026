'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PendingActions({ userId }: { userId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<'approve' | 'reject' | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function call(action: 'approve' | 'reject') {
    setError(null);
    setBusy(action);
    try {
      const res = await fetch(`/api/admin/${action}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo procesar');
        return;
      }
      router.refresh();
    } catch {
      setError('Error de red');
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex shrink-0 flex-col items-end gap-1.5">
      <div className="flex gap-2">
        <button
          onClick={() => call('approve')}
          disabled={busy !== null}
          className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          {busy === 'approve' ? 'Aprobando…' : 'Aprobar'}
        </button>
        <button
          onClick={() => call('reject')}
          disabled={busy !== null}
          className="rounded-md border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-zinc-300 transition-colors hover:border-red-500/40 hover:text-red-300 disabled:opacity-50"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          {busy === 'reject' ? 'Rechazando…' : 'Rechazar'}
        </button>
      </div>
      {error && <div className="text-xs text-red-300">{error}</div>}
    </div>
  );
}
