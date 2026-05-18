'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

// useLayoutEffect warns on the server (it's a no-op there). Use it only in
// the browser; fall back to useEffect for SSR-safe import.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide smooth scroll via Lenis, wired to drive GSAP's ScrollTrigger so
 * pinned and scrub animations stay in sync with the eased scroll position.
 *
 * Lenis is bypassed when the user prefers reduced motion — native scroll
 * remains, and GSAP ticker keeps ScrollTrigger updating on the rAF the
 * browser fires naturally.
 *
 * Lenis tracks its own scroll target. Next.js's default scroll-to-top on
 * route change writes `scrollTop = 0`, but Lenis doesn't pick that up
 * automatically — so the new page can render from wherever Lenis was last
 * looking. We watch `pathname` and explicitly tell Lenis to jump to the
 * top whenever the route changes.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
      smoothWheel: true,
    });

    // Expose the instance so the path-change effect below can reach it
    // without prop-drilling. Keyed off this module's lifetime only.
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    // Bridge: Lenis fires after each tick → tell ScrollTrigger to recompute.
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP drives Lenis' rAF so pinned scrubs stay perfectly in lockstep.
    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // On every route change, force scroll to top — both the native window and
  // Lenis's internal target. Runs in useLayoutEffect so it lands BEFORE the
  // browser paints the new route. With a plain useEffect the user sees one
  // frame of the new page at the OLD scroll position before the snap, which
  // reads as a glitch: "page starts from down, then jumps to top".
  useIsoLayoutEffect(() => {
    window.scrollTo(0, 0);
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    // Re-measure ScrollTrigger positions against the new layout.
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
