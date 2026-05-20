import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import {
  sendRequestPendingToUser,
  sendRequestNotificationToAdmin,
} from '@/lib/email';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (
    !body ||
    typeof body.name !== 'string' ||
    typeof body.email !== 'string'
  ) {
    return NextResponse.json({ error: 'Faltan nombre o email' }, { status: 400 });
  }
  const name = body.name.trim();
  const email = body.email.trim().toLowerCase();
  if (name.length < 2 || name.length > 60) {
    return NextResponse.json({ error: 'Nombre demasiado corto o largo' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email no válido' }, { status: 400 });
  }

  const sb = getSupabase();
  const { data: existing } = await sb
    .from('users')
    .select('id, status')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    // No revelamos si ya existe; respuesta genérica
    return NextResponse.json({ ok: true });
  }

  const { error } = await sb.from('users').insert({
    email,
    name,
    role: 'user',
    status: 'pending',
  });
  if (error) {
    return NextResponse.json({ error: 'No se pudo registrar' }, { status: 500 });
  }

  // Envíos best-effort: si fallan no rompemos el registro.
  try {
    await Promise.all([
      sendRequestPendingToUser(name, email),
      sendRequestNotificationToAdmin(name, email),
    ]);
  } catch (e) {
    console.error('[register] email error', e);
  }

  return NextResponse.json({ ok: true });
}
