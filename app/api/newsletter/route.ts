import { NextResponse } from 'next/server';
import { sendNewsletterNotification } from '@/lib/resend';
import { appendToSheet } from '@/lib/google-sheet';

// Receives NewsletterForm subscriptions and fans them out to:
//   1. Email notification to the team via Resend
//   2. A new row in the "Newsletter" tab of the Google Sheet
// Succeeds (200) if at least one sink records the email. See HANDOVER.md for env.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: unknown; source?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const source = typeof body.source === 'string' ? body.source : '';
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid-email' }, { status: 400 });
  }

  const [emailed, sheeted] = await Promise.all([
    sendNewsletterNotification(email, source),
    appendToSheet({ type: 'newsletter', email, source }),
  ]);

  if (!emailed && !sheeted) {
    console.error('[newsletter] both sinks failed', { email });
    return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, emailed, sheeted });
}
