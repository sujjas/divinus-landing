/**
 * Generates scripts/seed-content.ndjson — an NDJSON export of the seed Insights
 * + Events for `sanity dataset import`. Image URLs use the `_sanityAsset`
 * strong-reference form so the importer uploads them as real assets.
 *
 * This path needs NO write token — you import it while logged in as yourself
 * (the project owner), which has content-create permission:
 *
 *   npx tsx scripts/generate-ndjson.ts
 *   npx sanity@latest login
 *   npx sanity@latest dataset import scripts/seed-content.ndjson production --replace
 *
 * `--replace` keeps it idempotent (matches on _id). Run from divinus-next/.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SEED_POSTS, type Section } from '../app/blog/posts';
import { SEED_EVENTS } from '../app/events/events-data';

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

function imageField(url: string) {
  // The import CLI resolves `image@<url>` into an uploaded asset reference.
  return { _sanityAsset: `image@${url}` };
}

const docs: unknown[] = [];

for (const p of SEED_POSTS) {
  docs.push({
    _id: `post-${p.slug}`,
    _type: 'post',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    excerpt: p.excerpt,
    category: p.category,
    date: p.date,
    readMins: p.readMins,
    author: p.author,
    authorRole: p.authorRole,
    image: imageField(p.img),
    body: toPortableText(p.body),
  });
}

for (const e of SEED_EVENTS) {
  docs.push({
    _id: `event-${e.id}`,
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
    image: imageField(e.img),
    longBlurb: e.longBlurb,
    format: e.format,
    capacity: e.capacity,
    hosts: keyed(e.hosts, 'h'),
    agenda: keyed(e.agenda, 'a'),
    expect: e.expect,
  });
}

const out = join(process.cwd(), 'scripts', 'seed-content.ndjson');
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join('\n') + '\n', 'utf8');
console.log(`✓ Wrote ${docs.length} documents to ${out}`);
