// Resend email notifications for form submissions.
//
// Env:
//   RESEND_API_KEY      — Resend API key (re_...)
//   CONTACT_FROM_EMAIL  — verified sender, e.g. "Divinus <noreply@divinus.com>".
//                         The domain MUST be verified in Resend or sends 403.
//   CONTACT_TO_EMAIL    — where notifications land, e.g. divinusblack@gmail.com
//
// Server-only. The Resend SDK returns { data, error } — it does NOT throw on API
// errors, so we check `error` explicitly.
import { Resend } from 'resend';

const FROM = process.env.CONTACT_FROM_EMAIL || 'Divinus <onboarding@resend.dev>';
const TO = process.env.CONTACT_TO_EMAIL || '';

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key || !TO) {
    console.warn('[resend] RESEND_API_KEY or CONTACT_TO_EMAIL not set — skipping email');
    return null;
  }
  return new Resend(key);
}

function esc(v: unknown): string {
  return String(v ?? '—')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function row(label: string, value: unknown): string {
  return `<tr><td style="padding:6px 14px 6px 0;color:#737373;font:13px/1.5 -apple-system,Segoe UI,sans-serif;vertical-align:top;white-space:nowrap">${esc(
    label,
  )}</td><td style="padding:6px 0;color:#0a0a0a;font:14px/1.6 -apple-system,Segoe UI,sans-serif">${esc(
    value,
  )}</td></tr>`;
}

export type ContactPayload = {
  mode?: string;
  subject?: string;
  subjectLabel?: string;
  route?: string | null;
  name?: string;
  email?: string;
  organisation?: string;
  phone?: string;
  preferredTime?: string;
  message?: string;
};

export async function sendContactNotification(p: ContactPayload): Promise<boolean> {
  const resend = getClient();
  if (!resend) return false;

  const isCall = p.mode === 'call';
  const heading = isCall ? 'New call request' : 'New contact message';
  const rows = [
    row('Type', isCall ? 'Request a call' : 'Send a message'),
    row('Subject', p.subjectLabel || p.subject),
    row('Name', p.name),
    row('Email', p.email),
    row('Organisation', p.organisation),
    isCall ? row('Phone', p.phone) : '',
    isCall ? row('Preferred time', p.preferredTime) : '',
    row('Message', p.message),
    p.route ? row('Route', p.route) : '',
  ].join('');

  const html = `<div style="max-width:560px;margin:0 auto;padding:24px">
    <p style="font:12px/1.4 ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#a3a3a3;margin:0 0 4px">Divinus · Website</p>
    <h1 style="font:600 22px/1.3 -apple-system,Segoe UI,sans-serif;color:#0a0a0a;margin:0 0 18px">${heading}</h1>
    <table style="border-collapse:collapse;width:100%">${rows}</table>
    <p style="font:12px/1.5 -apple-system,Segoe UI,sans-serif;color:#a3a3a3;margin:22px 0 0">Reply directly to this email to reach ${esc(
      p.name,
    )}.</p>
  </div>`;

  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: `${heading}${p.subjectLabel ? ` — ${p.subjectLabel}` : ''}`,
    html,
    ...(p.email ? { replyTo: p.email } : {}),
  });

  if (error) {
    console.error('[resend] contact send failed:', error.message);
    return false;
  }
  return true;
}

export async function sendNewsletterNotification(email: string, source?: string): Promise<boolean> {
  const resend = getClient();
  if (!resend) return false;

  const html = `<div style="max-width:560px;margin:0 auto;padding:24px">
    <p style="font:12px/1.4 ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#a3a3a3;margin:0 0 4px">Divinus · Newsletter</p>
    <h1 style="font:600 22px/1.3 -apple-system,Segoe UI,sans-serif;color:#0a0a0a;margin:0 0 18px">New subscriber</h1>
    <table style="border-collapse:collapse;width:100%">${row('Email', email)}${
      source ? row('Source', source) : ''
    }</table>
  </div>`;

  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: `New newsletter subscriber — ${email}`,
    html,
  });

  if (error) {
    console.error('[resend] newsletter send failed:', error.message);
    return false;
  }
  return true;
}
