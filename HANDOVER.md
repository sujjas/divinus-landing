# Divinus — Handover Guide

Everything the client needs to (1) edit **Insights** and **Events** themselves, and
(2) receive every **Contact** and **Newsletter** submission by email *and* in a
Google Sheet.

There are three accounts to set up: **Sanity** (the CMS), **Resend** (email), and a
**Google Sheet** (with a small script). Each maps to a few environment variables.

---

## 0. Environment variables (the master list)

Set these in **two** places:

- **Local development** — `divinus-next/.env.local` (already scaffolded with blanks).
- **Production** — Vercel → Project → Settings → Environment Variables (Production +
  Preview). After adding/changing any, **redeploy**.

| Variable | Used by | Where it comes from |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | CMS + site | Sanity → Manage → project id |
| `NEXT_PUBLIC_SANITY_DATASET` | CMS + site | `production` (default) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | CMS + site | leave `2024-10-01` |
| `SANITY_API_WRITE_TOKEN` | migration script only | Sanity → API → Tokens (Editor) |
| `RESEND_API_KEY` | email | Resend → API Keys |
| `CONTACT_FROM_EMAIL` | email | a verified-domain sender, e.g. `Divinus <noreply@divinus.com>` |
| `CONTACT_TO_EMAIL` | email | inbox to notify, e.g. `divinusblack@gmail.com` |
| `GOOGLE_SHEET_WEBHOOK_URL` | sheet | Apps Script deployment `/exec` URL |
| `GOOGLE_SHEET_SECRET` | sheet | optional shared secret (matches the script) |
| `NEXT_PUBLIC_SITE_URL` | SEO | the live URL, e.g. `https://divinus.com` |

> The site is resilient: if Sanity isn't configured it shows the bundled seed
> content (never blank), and if a form provider is down the submission still
> succeeds as long as the other sink records it.

---

## 1. Sanity CMS — edit Insights & Events

### What it is
An embedded editing studio at **`/studio`** (e.g. `https://divinus.com/studio`).
Log in with a Sanity account; edit Insights (blog) and Events; click **Publish** and
the live site updates within ~60 seconds.

### One-time setup
1. Create a project at **https://sanity.io/manage** (free plan is fine).
   - Note the **Project ID**.
   - Ensure a dataset named **`production`** exists (public/read).
2. Create a write token: **Manage → API → Tokens → Add token**, permission
   **Editor**. Copy it (shown once).
3. Put both in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_WRITE_TOKEN=<your editor token>
   ```
4. Add the **Studio URL** to CORS origins so editors can log in:
   Manage → API → CORS origins → add `http://localhost:3000` and your production
   URL (e.g. `https://divinus.com`), both **with credentials**.
5. Add the same `NEXT_PUBLIC_SANITY_*` vars to Vercel and redeploy.

### Seed the existing content (so the CMS starts populated)

**Recommended — CLI import (runs as you, the project owner):**

> The Sanity CLI needs **Node ≥ 20.19.1 or ≥ 22.12**. This repo otherwise runs on
> Node 20.16, so switch first: `nvm use 22` (v22.22.3 is installed). The Next dev
> server / build are fine on 20.16 — only the `sanity` CLI needs the newer Node.

```bash
nvm use 22                                   # CLI requires Node >= 22.12
npx tsx scripts/generate-ndjson.ts           # builds scripts/seed-content.ndjson
npx sanity@latest login --provider google    # opens a browser; log in as the owner
npx sanity@latest dataset import scripts/seed-content.ndjson production --replace
```
*(Done once during handover — the content is already imported. Re-run only to
re-seed or after editing the seed data.)*
This imports all 6 Insights + 5 Events and uploads their images as editable
assets. `--replace` makes it idempotent (safe to re-run). The `seed-content.ndjson`
file is already generated and committed-out under `scripts/`.

> **Why not the token script?** There's also `npm run migrate:sanity` (uses
> `SANITY_API_WRITE_TOKEN`). On this project the **Editor _robot token_ is not
> granted content `create`** under Sanity's newer permission model, so the token
> path returns *"permission create required"*. The CLI import above runs under
> your own (admin) session and sidesteps it. If you later need the token path to
> work (e.g. CI), grant the robot token content-write under Manage → **Access**.

After importing, the live site reads from Sanity. To revert to bundled content,
just unset `NEXT_PUBLIC_SANITY_PROJECT_ID`. The site is never blank either way —
with an empty/unconfigured dataset it falls back to the bundled seed content.

### Day-to-day editing
- Go to `/studio`, pick **Insights** or **Events**.
- **New post:** title → "Generate" the slug → fill fields → write the body
  (Normal text, the **H2** style for subheads, **Quote** style for the gold
  pull-quotes) → **Publish**.
- **New event:** fill the fields; **Status** (Upcoming/Past) controls which grid it
  shows in; the **slug** is the URL (`/events/<slug>`).
- Existing URLs are preserved — the migrated docs keep their original slugs.

---

## 2. Resend — email notifications

### One-time setup
1. Create an account at **https://resend.com** and **verify a sending domain**
   (Resend → Domains → add `divinus.com`, then add the DNS records it shows).
   - You can't send "from" a Gmail address — the `from` domain must be one you've
     verified. `CONTACT_TO_EMAIL` (the recipient) can be any inbox, incl. Gmail.
2. Create an API key (Resend → API Keys).
3. Set in `.env.local` (and Vercel):
   ```
   RESEND_API_KEY=re_xxx
   CONTACT_FROM_EMAIL=Divinus <noreply@divinus.com>
   CONTACT_TO_EMAIL=divinusblack@gmail.com
   ```

> **Before the domain is verified** you can test using `onboarding@resend.dev` as
> the `CONTACT_FROM_EMAIL`, but it only delivers to your own Resend-account email.

### What happens
Each Contact submission emails a formatted notification (with **reply-to** set to
the sender, so you can reply straight from your inbox). Each Newsletter signup
emails a short "new subscriber" note.

---

## 3. Google Sheet — a row per submission

### One-time setup (~3 minutes)
1. Create a Google Sheet, e.g. **"Divinus — Website Submissions"**.
2. **Extensions → Apps Script**, delete the boilerplate, and paste the entire
   contents of **`scripts/google-apps-script.gs`**.
3. **Deploy → New deployment → Web app**:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone** ⚠️ (must be plain "Anyone", **not** "Anyone with
     Google account" — the latter bounces the server's POST to a login page).
   - Deploy, authorise, and copy the **Web app URL** (ends in `/exec`).
4. Set in `.env.local` (and Vercel):
   ```
   GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
   GOOGLE_SHEET_SECRET=<optional; only if you set FORM_SECRET, below>
   ```

The script auto-creates a **Contact** tab and a **Newsletter** tab on first use.
Opening the `/exec` URL in a browser returns `{"ok":true,...}` — a quick health
check.

> If you later edit the script, you must create a **new deployment version** for
> changes to take effect (Manage deployments → edit → deploy new version). The
> `/exec` URL stays the same. **Script-property** changes (below) apply
> immediately — no redeploy needed.

### Alerts: Telegram + email on every submission
The same script also **pings Telegram** and **emails you** per submission. Secrets
live in **Script Properties** (not the code): Apps Script → **⚙️ Project Settings →
Script properties → Add**, then **Save script properties**:

| Property | Value | Effect if blank |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | BotFather token | Telegram disabled |
| `TELEGRAM_CHAT_ID` | chat/group id (e.g. `926128815`) | Telegram disabled |
| `NOTIFY_EMAIL` | inbox for alerts (`divinusblack@gmail.com`) | email disabled |
| `FORM_SECRET` | optional shared secret (match `GOOGLE_SHEET_SECRET`) | no auth check |

- **Telegram bot:** message @BotFather → `/newbot` → copy the token. Open your bot,
  send it any message, then read your chat id from
  `https://api.telegram.org/bot<TOKEN>/getUpdates`. (For a team, add the bot to a
  group and use the group's chat id.)
- **First run needs authorization** — the email + external-request permissions are
  granted the first time you run the `testAlerts` function in the editor (function
  dropdown → `testAlerts` → Run → approve). Use `testAlerts` any time to verify;
  it logs which properties are set and sends one test of each.
- The contact email's **reply-to** is the submitter, so you can reply directly.

> ⚠️ Common gotcha: after adding Script Properties you **must click "Save script
> properties"** or they silently don't persist (and alerts quietly no-op).

---

## 4. Verifying end-to-end

1. `npm run dev`, open `http://localhost:3000`.
2. **CMS:** open `/studio`, edit an Insight title, Publish, refresh `/blog` after a
   few seconds.
3. **Forms:** submit `/contact` and the newsletter card — confirm an email arrives
   at `CONTACT_TO_EMAIL` and a row appears in the Sheet.
4. `npm run typecheck` should pass (it does as of handover).

---

## 5. What's still a placeholder (not part of this CMS/forms work)

These pre-date this handover and are tracked in the repo's main `CLAUDE.md`:
- Real brand imagery (currently picsum placeholders) — replace in `/public` and
  Sanity.
- Legal pages (`/privacy`, `/terms`) are AI-drafted — need counsel review.
- Open Graph / social-card images aren't created yet.
- WhatsApp number vs investor-doc number mismatch — confirm with client.
