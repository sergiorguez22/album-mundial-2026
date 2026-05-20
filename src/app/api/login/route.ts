import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSupabase } from '@/lib/supabase';
import { createSessionCookie } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.email !== 'string' || typeof body.password !== 'string') {
    return NextResponse.json({ error: 'Faltan email o contraseña' }, { status: 400 });
  }
  const email = body.email.trim().toLowerCase();
  const password = body.password;

  const { data: user } = await getSupabase()
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  // Mensaje genérico para no filtrar si existe el email
  const generic = NextResponse.json(
    { error: 'Email o contraseña incorrectos' },
    { status: 401 },
  );

  if (!user) return generic;
  if (user.status !== 'approved') {
    if (user.status === 'pending') {
      return NextResponse.json(
        { error: 'Tu solicitud sigue pendiente de aprobación' },
        { status: 403 },
      );
    }
    return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 403 });
  }
  if (!user.password_hash) {
    return NextResponse.json(
      { error: 'Aún no has activado tu cuenta. Revisa tu email.' },
      { status: 403 },
    );
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return generic;

  await createSessionCookie(user.id);
  return NextResponse.json({ ok: true, name: user.name, role: user.role });
}
