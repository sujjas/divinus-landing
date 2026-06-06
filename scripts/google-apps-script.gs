/**
 * Divinus — Google Sheet form sink + alerts
 * ==========================================
 * On every website form submission this script:
 *   1. Appends a row to this spreadsheet (Contact / Newsletter tabs)
 *   2. Sends a Telegram alert (so you get a phone ping)
 *   3. Emails a notification to your inbox (reply-to = the submitter)
 *
 * ── SHEET SETUP (one time) ──────────────────────────────────────────────
 *  1. Create a Google Sheet (e.g. "Divinus — Website Submissions").
 *  2. Extensions → Apps Script. Delete the boilerplate, paste this whole file.
 *  3. Deploy → New deployment → "Web app":
 *       - Execute as: Me
 *       - Who has access: Anyone   (must be "Anyone", not "Anyone with Google account")
 *     Deploy, authorise, and copy the Web app URL (ends in /exec) into the
 *     site's GOOGLE_SHEET_WEBHOOK_URL env var.
 *
 * ── ALERTS SETUP (Script Properties — keeps secrets out of code) ─────────
 *  Project Settings (⚙️ gear, left sidebar) → Script properties → Add:
 *       TELEGRAM_BOT_TOKEN   your BotFather token (e.g. 123456:AA...)
 *       TELEGRAM_CHAT_ID     the chat/group id to message (e.g. 926128815)
 *       NOTIFY_EMAIL         where email alerts go (e.g. divinusblack@gmail.com)
 *  Leave any of them blank to disable that channel.
 *  (Optional) FORM_SECRET — if set, must match the site's GOOGLE_SHEET_SECRET.
 *
 * ── UPDATING ─────────────────────────────────────────────────────────────
 *  After editing, Deploy → Manage deployments → edit (✏️) → New version → Deploy.
 *  The /exec URL stays the same. Script-property changes take effect immediately
 *  (no redeploy needed).
 */

var HEADERS = {
  contact: [
    'Timestamp', 'Mode', 'Subject', 'Name', 'Email',
    'Organisation', 'Phone', 'Preferred time', 'Message', 'Route',
  ],
  newsletter: ['Timestamp', 'Email', 'Source'],
};

function prop(key) {
  return PropertiesService.getScriptProperties().getProperty(key) || '';
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    var secret = prop('FORM_SECRET');
    if (secret && body.secret !== secret) {
      return json({ ok: false, error: 'unauthorized' });
    }

    var type = body.type === 'newsletter' ? 'newsletter' : 'contact';
    var sheet = getSheet(type === 'newsletter' ? 'Newsletter' : 'Contact', HEADERS[type]);
    var now = new Date();

    if (type === 'newsletter') {
      sheet.appendRow([now, body.email || '', body.source || '']);
    } else {
      sheet.appendRow([
        now,
        body.mode || '',
        body.subject || '',
        body.name || '',
        body.email || '',
        body.organisation || '',
        body.phone || '',
        body.preferredTime || '',
        body.message || '',
        body.route || '',
      ]);
    }

    // Alerts must never break the response — each is best-effort.
    try { notify(type, body); } catch (err) {}

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Health check — opening the /exec URL in a browser returns this.
function doGet() {
  return json({ ok: true, service: 'divinus-form-sink' });
}

// ── Notifications ──────────────────────────────────────────────────────────
function notify(type, body) {
  var isCall = body.mode === 'call';
  var subjectLabel = body.subject || 'General enquiry';

  var lines, subject;
  if (type === 'newsletter') {
    subject = 'New newsletter subscriber — ' + (body.email || '');
    lines = [
      ['Email', body.email],
      ['Source', body.source],
    ];
  } else {
    subject = (isCall ? 'New call request' : 'New contact message') + ' — ' + subjectLabel;
    lines = [
      ['Type', isCall ? 'Request a call' : 'Send a message'],
      ['Subject', subjectLabel],
      ['Name', body.name],
      ['Email', body.email],
      ['Organisation', body.organisation],
      isCall ? ['Phone', body.phone] : null,
      isCall ? ['Preferred time', body.preferredTime] : null,
      ['Message', body.message],
      body.route ? ['Route', body.route] : null,
    ];
  }
  lines = lines.filter(function (l) { return l && l[1]; });

  sendTelegram('🔔 <b>' + esc(subject) + '</b>\n\n' +
    lines.map(function (l) { return '<b>' + esc(l[0]) + ':</b> ' + esc(l[1]); }).join('\n'));

  sendEmail(subject, lines, type === 'contact' ? body.email : '');
}

function sendTelegram(text) {
  var token = prop('TELEGRAM_BOT_TOKEN');
  var chatId = prop('TELEGRAM_CHAT_ID');
  if (!token || !chatId) return;
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
    muteHttpExceptions: true,
  });
}

function sendEmail(subject, lines, replyTo) {
  var to = prop('NOTIFY_EMAIL');
  if (!to) return;
  var rows = lines.map(function (l) {
    return '<tr><td style="padding:4px 14px 4px 0;color:#737373;white-space:nowrap;vertical-align:top">' +
      esc(l[0]) + '</td><td style="padding:4px 0;color:#0a0a0a">' + esc(l[1]) + '</td></tr>';
  }).join('');
  var html = '<div style="font:14px/1.6 -apple-system,Segoe UI,sans-serif;max-width:560px">' +
    '<h2 style="font-size:18px;margin:0 0 12px">' + esc(subject) + '</h2>' +
    '<table style="border-collapse:collapse">' + rows + '</table></div>';
  var opts = { htmlBody: html, name: 'Divinus Website' };
  if (replyTo) opts.replyTo = replyTo;
  MailApp.sendEmail(to, subject, '', opts);
}

function getSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * DIAGNOSTIC — run this from the editor (select `testAlerts` → Run).
 * It (a) triggers the authorization prompt for email + external requests the
 * first time, and (b) logs which Script Properties are set, then sends one test
 * Telegram + one test email. Check Execution log (View → Logs) for the output.
 */
function testAlerts() {
  var p = PropertiesService.getScriptProperties().getProperties();
  Logger.log('TELEGRAM_BOT_TOKEN set? ' + (p.TELEGRAM_BOT_TOKEN ? 'YES' : 'NO — MISSING'));
  Logger.log('TELEGRAM_CHAT_ID: ' + (p.TELEGRAM_CHAT_ID || '(MISSING)'));
  Logger.log('NOTIFY_EMAIL: ' + (p.NOTIFY_EMAIL || '(MISSING)'));
  notify('contact', {
    mode: 'message', subject: 'TEST', name: 'Test Run',
    email: 'test@example.com', message: 'Hello from testAlerts()',
  });
  Logger.log('testAlerts: done (if no error above, both alerts were sent)');
}

function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
