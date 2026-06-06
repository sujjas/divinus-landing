// Embedded Sanity Studio, served at /studio. The client logs in here with
// their Sanity account to edit Insights and Events.
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';
import { sanityConfigured } from '../../../sanity/env';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  // Render a setup notice until NEXT_PUBLIC_SANITY_PROJECT_ID is set, so the
  // build never fails on a missing project id before the CMS is provisioned.
  if (!sanityConfigured) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0a0a0a', color: '#e5e5e5', fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <div style={{ maxWidth: 440, textAlign: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Sanity Studio not configured</h1>
          <p style={{ color: '#a3a3a3', lineHeight: 1.6 }}>
            Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and the related Sanity
            variables) in the environment, then redeploy. See <code>HANDOVER.md</code>.
          </p>
        </div>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
