import { NextResponse, type NextRequest } from 'next/server';

// Verificación inline (sin importar src/lib/auth.ts) para mantener el middleware
// compatible con el runtime Edge. Solo valida HMAC + expiración de la cookie.
const SESSION_COOKIE = 'ngc-session';

async function verifyCookie(raw: string): Promise<boolean> {
  const dot = raw.lastIndexOf('.');
  if (dot < 0) return false;
  const payload = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;

  // HMAC-SHA256 con Web Crypto (Edge runtime)
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  const expected = base64UrlFromArrayBuffer(mac);
  if (!safeEqual(sig, expected)) return false;

  try {
    const data = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as {
      uid?: string;
      exp?: number;
    };
    if (!data.uid || !data.exp) return false;
    if (data.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

function base64UrlFromArrayBuffer(buf: ArrayBuffer): string {
  let s = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Rutas accesibles sin sesión
const PUBLIC_PREFIXES = [
  '/login',
  '/registro',
  '/activar',
  '/api/login',
  '/api/register',
  '/api/activate',
];

function isPublic(pathname: string): boolean {
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isPublic(pathname)) return NextResponse.next();

  const raw = req.cookies.get(SESSION_COOKIE)?.value;
  if (raw && (await verifyCookie(raw))) {
    return NextResponse.next();
  }

  // Para llamadas API devuelve 401; para páginas redirige a /login con returnTo.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  if (pathname !== '/') {
    url.searchParams.set('returnTo', pathname + req.nextUrl.search);
  }
  return NextResponse.redirect(url);
}

export const config = {
  // Excluye assets estáticos, imágenes y _next del middleware
  matcher: ['/((?!_next/static|_next/image|favicon.ico|flags|shields).*)'],
};
