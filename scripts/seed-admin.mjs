// Inserta (o actualiza) el usuario admin Sergio en Supabase.
// Uso: node scripts/seed-admin.mjs
// Lee env vars de .env.local automáticamente.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

// Carga manual de .env.local (sin dotenv para no añadir dep)
try {
  const env = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
  for (const line of env.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
} catch {}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'srodrib@gmail.com';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Sergio';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mundial2026';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
const now = new Date().toISOString();

const { data, error } = await supabase
  .from('users')
  .upsert(
    {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      password_hash: hash,
      role: 'admin',
      status: 'approved',
      approved_at: now,
      activated_at: now,
    },
    { onConflict: 'email' },
  )
  .select('id, email, name, role, status')
  .single();

if (error) {
  console.error('Error insertando admin:', error.message);
  process.exit(1);
}
console.log('Admin OK:', data);
