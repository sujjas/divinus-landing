// Appends a form submission to a Google Sheet via a Google Apps Script web app.
// The Apps Script source + deploy steps live in scripts/google-apps-script.gs.
//
// Env:
//   GOOGLE_SHEET_WEBHOOK_URL  — the Apps Script deployment /exec URL
//   GOOGLE_SHEET_SECRET       — optional shared secret (must match the script)
//
// Server-only. Never import into a client component.

export type SheetRow = Record<string, unknown> & { type: 'contact' | 'newsletter' };

export async function appendToSheet(row: SheetRow): Promise<boolean> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    console.warn('[sheet] GOOGLE_SHEET_WEBHOOK_URL not set — skipping sheet append');
    return false;
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      // Apps Script web apps accept text/plain without a CORS preflight; the
      // script JSON-parses the body itself.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...row, secret: process.env.GOOGLE_SHEET_SECRET ?? '' }),
      // Apps Script issues a 302 redirect to script.googleusercontent.com; follow it.
      redirect: 'follow',
    });
    if (!res.ok) {
      console.error('[sheet] append failed', res.status, await res.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('[sheet] append error', err);
    return false;
  }
}
