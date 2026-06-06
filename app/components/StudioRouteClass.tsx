'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Toggles `studio-route` on <html> while on /studio, so globals.css can restore
// the native cursor + text selection that the custom-cursor system disables
// site-wide. Always mounted; renders nothing.
export default function StudioRouteClass() {
  const pathname = usePathname();
  useEffect(() => {
    const isStudio = !!pathname?.startsWith('/studio');
    document.documentElement.classList.toggle('studio-route', isStudio);
    return () => document.documentElement.classList.remove('studio-route');
  }, [pathname]);
  return null;
}
