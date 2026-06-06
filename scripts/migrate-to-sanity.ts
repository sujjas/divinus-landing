/**
 * One-time migration: seeds the existing hard-coded Insights + Events into Sanity
 * so the CMS is pre-populated (the site is never blank) and the client can edit
 * everything from /studio.
 *
 * Run from divinus-next/:
 *   npx tsx scripts/migrate-to-sanity.ts
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 *
 * Idempotent: documents use deterministic ids (post-<slug> / event-<id>) and are
 * created-or-replaced. Existing images are reused, so re-running won't duplicate
 * uploaded assets. Pass --skip-images to leave images untouched.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createClient } from 'next-sanity';
import { SEED_POSTS, type Section } from '../app/blog/posts';
import { SEED_EVENTS } from '../app/events/events-data';

// ── Load .env.local (standalone scripts don't get Next's auto-loading) ────────
function loadEnv() {
  try {
    const raw = readFileSync(join(process.cwd(), '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (!m) continue;
      const key = m[1];
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* no .env.local — rely on already-exported vars */
  }
}
loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
const skipImages = process.argv.includes('--skip-images');

if (!projectId || !token) {
  console.error(
    '✗ Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
});

// ── Helpers ───────────────────────────────────────────────────────────────
type ImageField = { _type: 'image'; asset: { _type: 'reference'; _ref: string } };

async function existingImageRef(docId: string): Promise<string | null> {
  const ref = await client.fetch<string | null>(
    `*[_id == $id][0].image.asset._ref`,
    { id: docId },
  );
  return ref ?? null;
}

async function uploadImage(url: string, filename: string): Promise<ImageField | undefined> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload('image', buf, { filename });
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.warn(`  ! image upload failed for ${filename}:`, (err as Error).message);
    return undefined;
  }
}

// Resolve the image field for a doc: reuse existing, else upload, else skip.
async function resolveImage(
  docId: string,
  url: string,
  filename: string,
): Promise<ImageField | undefined> {
  const existing = await existingImageRef(docId);
  if (existing) return { _type: 'image', asset: { _type: 'reference', _ref: existing } };
  if (skipImages) return undefined;
  return uploadImage(url, filename);
}

// Section[] → Portable Text blocks (normal / h2 / blockquote).
function toPortableText(body: Section[]) {
  return body.map((s, i) => ({
    _type: 'block',
    _key: `b${i}`,
    style: s.kind === 'h2' ? 'h2' : s.kind === 'pull' ? 'blockquote' : 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `b${i}s0`, text: s.text, marks: [] }],
  }));
}

function keyed<T extends object>(items: T[] | undefined, prefix: string) {
  return (items ?? []).map((it, i) => ({ ...it, _key: `${prefix}${i}` }));
}

// ── Migrate ─────────────────────────────────────────────────────────────────
async function run() {
  console.log(`→ Migrating to project ${projectId} / dataset ${dataset}\n`);
  const tx = client.transaction();

  console.log('Insights:');
  for (const p of SEED_POSTS) {
    const _id = `post-${p.slug}`;
    const image = await resolveImage(_id, p.img, `${p.slug}.jpg`);
    tx.createOrReplace({
      _id,
      _type: 'post',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      excerpt: p.excerpt,
      category: p.category,
      date: p.date,
      readMins: p.readMins,
      author: p.author,
      authorRole: p.authorRole,
      ...(image ? { image } : {}),
      body: toPortableText(p.body),
    });
    console.log(`  ✓ ${p.slug}${image ? '' : ' (no image)'}`);
  }

  console.log('\nEvents:');
  for (const e of SEED_EVENTS) {
    const _id = `event-${e.id}`;
    const image = await resolveImage(_id, e.img, `${e.id}.jpg`);
    tx.createOrReplace({
      _id,
      _type: 'event',
      title: e.title,
      slug: { _type: 'slug', current: e.id },
      status: e.status,
      type: e.type,
      date: e.date,
      displayDate: e.displayDate,
      location: e.location,
      blurb: e.blurb,
      ctaLabel: e.ctaLabel,
      ctaHref: e.ctaHref,
      ...(image ? { image } : {}),
      longBlurb: e.longBlurb,
      format: e.format,
      capacity: e.capacity,
      hosts: keyed(e.hosts, 'h'),
      agenda: keyed(e.agenda, 'a'),
      expect: e.expect,
    });
    console.log(`  ✓ ${e.id}${image ? '' : ' (no image)'}`);
  }

  console.log('\n→ Committing…');
  await tx.commit();
  console.log('✓ Done. Open /studio to edit, and the live site now reads from Sanity.');
}

run().catch((err) => {
  console.error('✗ Migration failed:', err);
  process.exit(1);
});
