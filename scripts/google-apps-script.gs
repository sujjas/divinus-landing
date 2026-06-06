/**
 * Divinus — Google Sheet form sink
 * ================================
 * Appends website form submissions (Contact + Newsletter) to this spreadsheet.
 *
 * SETUP (one time, ~3 minutes):
 *  1. Create a Google Sheet (e.g. "Divinus — Website Submissions").
 *  2. Extensions → Apps Script. Delete any boilerplate, paste this whole file.
 *  3. (Optional) set SECRET below to a random string and put the SAME value in
 *     the site's GOOGLE_SHEET_SECRET env var. Leave '' to disable the check.
 *  4. Deploy → New deployment → type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Click Deploy, authorise, and COPY the Web app URL (ends in /exec).
 *  5. Put that URL in the site's GOOGLE_SHEET_WEBHOOK_URL env var.
 *
 * To update the script later you must create a NEW deployment (or "Manage
 * deployments" → edit → new version) for changes to take effect.
 *
 * Tabs "Contact" and "Newsletter" are created automatically on first submission.
 */

var SECRET = ''; // must match GOOGLE_SHEET_SECRET on the site, or '' to disable

var HEADERS = {
  contact: [
    'Timestamp', 'Mode', 'Subject', 'Name', 'Email',
    'Organisation', 'Phone', 'Preferred time', 'Message', 'Route',
  ],
  newsletter: ['Timestamp', 'Email', 'Source'],
};

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (SECRET && body.secret !== SECRET) {
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

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Health check — opening the /exec URL in a browser returns this.
function doGet() {
  return json({ ok: true, service: 'divinus-form-sink' });
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

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
