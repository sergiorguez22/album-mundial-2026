import { Resend } from 'resend';

let cached: Resend | null = null;

function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY no definida');
  cached = new Resend(key);
  return cached;
}

function from(): string {
  return process.env.EMAIL_FROM || 'Álbum Mundial 2026 <noreply@newgearcars.es>';
}

function baseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000'
  ).replace(/^(?!https?:\/\/)/, 'https://');
}

function adminEmail(): string {
  return process.env.ADMIN_EMAIL || 'srodrib@gmail.com';
}

/* ------------------- Templates ------------------- */

function wrap(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="es">
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#141414;border:1px solid #1f1f1f;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:24px 28px 8px;border-bottom:1px solid #1f1f1f;">
          <div style="font-size:10px;letter-spacing:.3em;color:#888;">ÁLBUM VIRTUAL · MUNDIAL 2026</div>
          <h1 style="margin:6px 0 0;font-size:22px;color:#fff;font-weight:700;">${title}</h1>
        </td></tr>
        <tr><td style="padding:20px 28px 28px;font-size:15px;line-height:1.55;color:#d4d4d4;">${bodyHtml}</td></tr>
        <tr><td style="padding:14px 28px;border-top:1px solid #1f1f1f;font-size:11px;color:#666;letter-spacing:.15em;text-transform:uppercase;">
          Coleccionable no oficial · uso privado
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendRequestPendingToUser(name: string, email: string) {
  return getResend().emails.send({
    from: from(),
    to: email,
    subject: 'Solicitud recibida · Álbum Mundial 2026',
    html: wrap(
      `Hola ${escapeHtml(name)}`,
      `<p>Hemos recibido tu solicitud para entrar en el álbum del Mundial 2026.</p>
       <p>El admin la revisará y, si te aprueba, te llegará un email con un enlace para crear tu contraseña.</p>`,
    ),
  });
}

export async function sendRequestNotificationToAdmin(name: string, email: string) {
  const adminUrl = `${baseUrl()}/admin`;
  return getResend().emails.send({
    from: from(),
    to: adminEmail(),
    subject: `Nueva solicitud: ${name}`,
    html: wrap(
      'Nueva solicitud de acceso',
      `<p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) quiere unirse al álbum.</p>
       <p style="margin:24px 0;"><a href="${adminUrl}" style="display:inline-block;background:#E10600;color:#fff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:600;">Revisar en el panel admin</a></p>`,
    ),
  });
}

export async function sendActivationLink(name: string, email: string, token: string) {
  const url = `${baseUrl()}/activar/${token}`;
  return getResend().emails.send({
    from: from(),
    to: email,
    subject: '¡Aprobado! Activa tu cuenta · Álbum Mundial 2026',
    html: wrap(
      `Bienvenido, ${escapeHtml(name)}`,
      `<p>Tu solicitud ha sido aprobada. Para entrar al álbum, elige una contraseña haciendo click en el botón:</p>
       <p style="margin:24px 0;"><a href="${url}" style="display:inline-block;background:#E10600;color:#fff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:600;">Crear mi contraseña</a></p>
       <p style="font-size:13px;color:#888;">Si el botón no funciona, copia y pega este enlace en tu navegador:<br><span style="color:#aaa;word-break:break-all;">${url}</span></p>
       <p style="font-size:13px;color:#888;">El enlace caduca en 48 horas.</p>`,
    ),
  });
}

export async function sendRejection(name: string, email: string) {
  return getResend().emails.send({
    from: from(),
    to: email,
    subject: 'Solicitud no aprobada · Álbum Mundial 2026',
    html: wrap(
      `Hola ${escapeHtml(name)}`,
      `<p>Tu solicitud para entrar al álbum no ha sido aprobada.</p>
       <p>Si crees que es un error, escribe directamente al admin.</p>`,
    ),
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
