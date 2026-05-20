import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { getSupabase, type UserRow } from './supabase';

const SESSION_COOKIE = 'ngc-session';
const SESSION_DAYS = 30;

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error('SESSION_SECRET no definida o demasiado corta (mínimo 32 chars)');
  }
  return s;
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

function safeCompare(a: string, b: string): boolean {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  if (A.length !== B.length) return false;
  return timingSafeEqual(A, B);
}

/* --------------------------- Sesión (cookie firmada) --------------------------- */

interface SessionPayload {
  uid: string;
  exp: number;
}

function encodePayload(p: SessionPayload): string {
  return Buffer.from(JSON.stringify(p)).toString('base64url');
}

function decodePayload(s: string): SessionPayload | null {
  try {
    return JSON.parse(Buffer.from(s, 'base64url').toString('utf8')) as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSessionCookie(userId: string): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400;
  const payload = encodePayload({ uid: userId, exp });
  const value = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function destroySessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

/** Lee la cookie y devuelve el userId si la sesión es válida. No toca BD. */
export async function readSessionFromCookies(): Promise<string | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  return verifyRawSession(raw);
}

/** Versión "sin server context" para el middleware (Edge). */
export function verifyRawSession(raw: string): string | null {
  const dot = raw.lastIndexOf('.');
  if (dot < 0) return null;
  const payload = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  if (!safeCompare(sig, sign(payload))) return null;
  const data = decodePayload(payload);
  if (!data) return null;
  if (data.exp < Math.floor(Date.now() / 1000)) return null;
  return data.uid;
}

export async function getCurrentUser(): Promise<UserRow | null> {
  const uid = await readSessionFromCookies();
  if (!uid) return null;
  const { data } = await getSupabase()
    .from('users')
    .select('*')
    .eq('id', uid)
    .maybeSingle();
  return (data as UserRow | null) ?? null;
}

/* ------------------------------ Magic link ------------------------------ */
// Token de activación: payload = base64url(JSON{uid, exp}); firma = HMAC.
// Sin BD intermedia: el token es válido mientras no expire.

const MAGIC_HOURS = 48;

export function createMagicToken(userId: string): string {
  const exp = Math.floor(Date.now() / 1000) + MAGIC_HOURS * 3600;
  const payload = encodePayload({ uid: userId, exp });
  return `${payload}.${sign(payload)}`;
}

export function verifyMagicToken(token: string): string | null {
  return verifyRawSession(token);
}
