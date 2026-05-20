import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

/** Cliente Supabase server-side con service_role key. Nunca exponer al cliente. */
export function getSupabase(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no definidas');
  }
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}

export type Role = 'admin' | 'user';
export type Status = 'pending' | 'approved' | 'rejected';

export interface UserRow {
  id: string;
  email: string;
  name: string;
  password_hash: string | null;
  role: Role;
  status: Status;
  created_at: string;
  approved_at: string | null;
  activated_at: string | null;
}
