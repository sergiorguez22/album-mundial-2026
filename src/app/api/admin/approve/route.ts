import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { createMagicToken, getCurrentUser } from '@/lib/auth';
import { sendActivationLink } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== 'admin') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.userId !== 'string') {
    return NextResponse.json({ error: 'Falta userId' }, { status: 400 });
  }

  const sb = getSupabase();
  const { data: user } = await sb
    .from('users')
    .select('id, email, name, status')
    .eq('id', body.userId)
    .maybeSingle();

  if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  if (user.status !== 'pending') {
    return NextResponse.json({ error: `El usuario ya está ${user.status}` }, { status: 409 });
  }

  const { error } = await sb
    .from('users')
    .update({ status: 'approved', approved_at: new Date().toISOString() })
    .eq('id', user.id);
  if (error) {
    return NextResponse.json({ error: 'No se pudo aprobar' }, { status: 500 });
  }

  const token = createMagicToken(user.id);
  try {
    await sendActivationLink(user.name, user.email, token);
  } catch (e) {
    console.error('[approve] email error', e);
  }

  return NextResponse.json({ ok: true });
}
