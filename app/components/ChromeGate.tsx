'use client';

import { usePathname } from 'next/navigation';

// Hides site chrome (cursor, dot grid, nav, footer, overlays) on the embedded
// Sanity Studio at /studio so the CMS renders full-screen and uncluttered.
// Children are passed in from the server layout, so wrapped server components
// (Footer, SiteMenu) keep their server nature — this only decides visibility.
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/studio')) return null;
  return <>{children}</>;
}
