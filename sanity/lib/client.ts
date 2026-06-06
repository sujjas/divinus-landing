import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

// Lazily created read-only client. We never construct it unless a real
// projectId is configured (createClient throws on an empty projectId), so the
// build/sitemap don't fail before the CMS is provisioned. Callers must gate on
// `sanityConfigured` before calling getClient().
let cached: SanityClient | null = null;

export function getClient(): SanityClient {
  if (!cached) {
    cached = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    });
  }
  return cached;
}
