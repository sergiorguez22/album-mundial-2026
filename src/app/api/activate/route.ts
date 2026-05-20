import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSupabase } from '@/lib/supabase';
import { createSessionCookie, verifyMagicToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (
    !body ||
    typeof body.token !== 'string' ||
    typeof body.password !== 'string'
  ) {
    return NextResponse.json({ error: 'Faltan token o contraseña' }, { status: 400 });
  }
  if (body.password.length < 8) {
    return NextResponse.json(
      { error: 'La contraseña debe tener al menos 8 caracteres' },
      { status: 400 },
    );
  }

  const userId = verifyMagicToken(body.token);
  if (!userId) {
    return NextResponse.json(
      { error: 'Enlace caducado o no válido. Pide al admin que te apruebe de nuevo.' },
      { status: 400 },
    );
  }

  const sb = getSupabase();
  const { data: user } = await sb
    .from('users')
    .select('id, status')
    .eq('id', userId)
    .maybeSingle();
  if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  if (user.status !== 'approved') {
    return NextResponse.json({ error: 'Tu cuenta no está aprobada' }, { status: 403 });
  }

  const hash = await bcrypt.hash(body.password, 10);
  const { error } = await sb
    .from('users')
    .update({ password_hash: hash, activated_at: new Date().toISOString() })
    .eq('id', user.id);
  if (error) {
    return NextResponse.json({ error: 'No se pudo guardar la contraseña' }, { status: 500 });
  }

  await createSessionCookie(user.id);
  return NextResponse.json({ ok: true });
}
