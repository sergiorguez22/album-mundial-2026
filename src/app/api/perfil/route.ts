import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSupabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function PATCH(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Body inválido' }, { status: 400 });

  const updates: Record<string, string> = {};

  if (typeof body.name === 'string') {
    const name = body.name.trim();
    if (name.length < 2 || name.length > 60) {
      return NextResponse.json({ error: 'Nombre no válido' }, { status: 400 });
    }
    updates.name = name;
  }

  if (typeof body.password === 'string') {
    if (body.password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 },
      );
    }
    updates.password_hash = await bcrypt.hash(body.password, 10);
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 });
  }

  const { error } = await getSupabase().from('users').update(updates).eq('id', me.id);
  if (error) {
    return NextResponse.json({ error: 'No se pudo actualizar' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
