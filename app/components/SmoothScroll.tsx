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

// How much room to leave above a hash-target section, so it isn't hidden
// under the fixed header / sticky sub-nav. Matches the `scroll-mt-32`
// (8rem = 128px) the anchored sections are designed around.
const HEADER_OFFSET = 128;

type WithLenis = Window & { __lenis?: Lenis };

/** Resolve a hash (`#id`) to its element, tolerating malformed selectors. */
function hashTarget(hash: string): HTMLElement | null {
  if (!hash || hash.length <= 1) return null;
  const id = decodeURIComponent(hash.slice(1));
  return document.getElementById(id);
}

/** Scroll to a hash target via Lenis (or native, under reduced motion). */
function scrollToHash(hash: string, immediate: boolean): boolean {
  const el = hashTarget(hash);
  if (!el) return false;
  const lenis = (window as WithLenis).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -HEADER_OFFSET, immediate, force: true });
  } else {
    // Reduced-motion path: no Lenis. Native scroll; `scroll-mt-*` on the
    // section supplies the offset.
    el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  }
  return true;
}

/**
 * Site-wide smooth scroll via Lenis, wired to drive GSAP's ScrollTrigger so
 * pinned and scrub animations stay in sync with the eased scroll position.
 *
 * Lenis is bypassed when the user prefers reduced motion — native scroll
 * remains, and GSAP ticker keeps ScrollTrigger updating on the rAF the
 * browser fires naturally.
 *
 * On route change we normally snap to the top (Lenis tracks its own target
 * and doesn't pick up Next's scroll reset). BUT when the destination URL
 * carries a hash (e.g. `/divisions#capital`), we scroll to that section
 * instead — so deep links from the homepage division rows, the "Find your
 * place" cards, and the footer all land where they point. Same-page anchor
 * clicks (the divisions sticky nav) are intercepted below and scrolled
 * smoothly through Lenis with the same header offset.
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

    (window as WithLenis).__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Intercept SAME-PAGE anchor clicks so in-page jumps (e.g. the divisions
    // sticky nav `#ai`, `#capital`) ease through Lenis with the header offset
    // instead of doing a native jump Lenis can't see.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || !href.includes('#')) return;
      // Only handle links that resolve to the current page.
      const url = new URL(href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      if (!hashTarget(url.hash)) return;
      e.preventDefault();
      scrollToHash(url.hash, false);
      // Keep the URL in sync without triggering a navigation.
      history.pushState(null, '', url.hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete (window as WithLenis).__lenis;
    };
  }, []);

  // On every route change: scroll to the hash target if the URL has one,
  // otherwise snap to top. Runs in useLayoutEffect so it lands BEFORE paint
  // (no flash of the new route at the old scroll position).
  useIsoLayoutEffect(() => {
    const hash = window.location.hash;
    const lenis = (window as WithLenis).__lenis;

    if (!(hash && hash.length > 1)) {
      window.scrollTo(0, 0);
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      ScrollTrigger.refresh();
      return;
    }

    // Deep link (e.g. `/divisions#capital`). Land on the section immediately,
    // then RE-ASSERT the position whenever the page height changes: on a
    // client-side navigation the `load` event never fires again, and content
    // above the target (images, fonts) can finish loading just after we land,
    // pushing the target down with nothing to re-correct it. A ResizeObserver
    // re-lands on every layout shift; we stop once the user scrolls (so we
    // never fight them) or after a short settle window — and it's a no-op
    // once layout is stable, which is the common case in production.
    ScrollTrigger.refresh();
    const land = () => scrollToHash(hash, true);
    land();
    requestAnimationFrame(land); // target may not be in the DOM on frame 0

    let done = false;
    const ro = new ResizeObserver(() => { if (!done) land(); });
    ro.observe(document.body);

    const stop = () => {
      if (done) return;
      done = true;
      ro.disconnect();
      window.clearTimeout(settle);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
      window.removeEventListener('load', onLoad);
    };
    // Stop re-asserting the moment the user takes over.
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    const onLoad = () => land();
    window.addEventListener('load', onLoad, { once: true });
    const settle = window.setTimeout(stop, 2500);

    return stop;
  }, [pathname]);

  return null;
}
