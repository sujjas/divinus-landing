import { NextResponse } from 'next/server';

// TODO: wire to a real list provider (Mailchimp / Buttondown / Beehiiv /
// Resend Audiences / Loops) before launch. For now the endpoint accepts the
// email, logs it, and returns 200 so the UI flow can be reviewed end-to-end.
//
// Suggested env vars when wiring real delivery:
//   NEWSLETTER_PROVIDER_KEY
//   NEWSLETTER_LIST_ID

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid-email' }, { status: 400 });
  }

  console.log('[newsletter] subscribe', { email });

  return NextResponse.json({ ok: true });
}
