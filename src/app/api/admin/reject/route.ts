import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';
import { sendRejection } from '@/lib/email';

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

  const { error } = await sb.from('users').update({ status: 'rejected' }).eq('id', user.id);
  if (error) {
    return NextResponse.json({ error: 'No se pudo rechazar' }, { status: 500 });
  }

  try {
    await sendRejection(user.name, user.email);
  } catch (e) {
    console.error('[reject] email error', e);
  }

  return NextResponse.json({ ok: true });
}
