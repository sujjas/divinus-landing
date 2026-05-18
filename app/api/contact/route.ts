import { NextResponse } from 'next/server';

// TODO: wire to a real provider (Resend / Postmark / SES / Notion / Linear / etc.)
// before launch. Until then this endpoint accepts submissions, logs them, and
// returns 200 so the UI flow can be reviewed end-to-end.
//
// Suggested env vars when wiring real delivery:
//   RESEND_API_KEY            — provider key
//   CONTACT_TO_EMAIL          — inbox to deliver to (e.g. hello@divinus.com)
//   CONTACT_FROM_EMAIL        — verified sender domain
//
// Implementation sketch:
//   const { Resend } = await import('resend');
//   const resend = new Resend(process.env.RESEND_API_KEY!);
//   await resend.emails.send({ from, to, subject, text });

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  // Basic shape check — keep liberal until a real schema is in place.
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'invalid-body' }, { status: 400 });
  }

  // Dev/visibility: surface submissions in the server log so reviewers can
  // confirm the flow works before email delivery is wired up.
  console.log('[contact] submission', body);

  return NextResponse.json({ ok: true });
}
