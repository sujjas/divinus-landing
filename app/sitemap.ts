import type { MetadataRoute } from 'next';
import { POSTS } from './blog/posts';
import { EVENTS } from './events/events-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://divinus.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,            lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/about`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/divisions`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/communities`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/events`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE_URL}/blog`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE_URL}/contact`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = POSTS.map(p => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = EVENTS.map(e => ({
    url: `${SITE_URL}/events/${e.id}`,
    lastModified: new Date(e.date),
    changeFrequency: e.status === 'upcoming' ? 'weekly' : 'yearly',
    priority: e.status === 'upcoming' ? 0.7 : 0.4,
  }));

  return [...staticRoutes, ...postRoutes, ...eventRoutes];
}
