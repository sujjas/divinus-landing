// Centralised Sanity env access. All values are read from environment
// variables so nothing is hard-coded — see HANDOVER.md for where each comes from.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

// True only when a real project id has been supplied. Pages use this to fall
// back to the bundled seed data so the site is never blank during local dev.
export const sanityConfigured = projectId.length > 0;

// Server-only write token, used exclusively by the migration script. Never
// expose this to the browser.
export const writeToken = process.env.SANITY_API_WRITE_TOKEN || '';
