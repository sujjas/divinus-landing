import { NextResponse } from 'next/server';
import { sendContactNotification, type ContactPayload } from '@/lib/resend';
import { appendToSheet } from '@/lib/google-sheet';

// Receives ContactForm submissions and fans them out to two sinks:
//   1. Email notification to the team via Resend
//   2. A new row in the Google Sheet via the Apps Script web app
// The submission succeeds (200) as long as at least one sink records it, so a
// transient outage in one provider never loses the lead from the other. If both
// fail it returns 502 and the form shows its error state.
//
// Required env (see HANDOVER.md): RESEND_API_KEY, CONTACT_FROM_EMAIL,
// CONTACT_TO_EMAIL, GOOGLE_SHEET_WEBHOOK_URL, (optional) GOOGLE_SHEET_SECRET.

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'invalid-body' }, { status: 400 });
  }

  // Minimal validation — name + email are always required by the form.
  if (!body.name || !body.email) {
    return NextResponse.json({ error: 'missing-fields' }, { status: 400 });
  }

  const [emailed, sheeted] = await Promise.all([
    sendContactNotification(body),
    appendToSheet({
      type: 'contact',
      mode: body.mode ?? '',
      subject: body.subjectLabel || body.subject || '',
      name: body.name ?? '',
      email: body.email ?? '',
      organisation: body.organisation ?? '',
      phone: body.phone ?? '',
      preferredTime: body.preferredTime ?? '',
      message: body.message ?? '',
      route: body.route ?? '',
    }),
  ]);

  if (!emailed && !sheeted) {
    console.error('[contact] both sinks failed', body);
    return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, emailed, sheeted });
}
