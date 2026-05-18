'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Page-scoped GSAP reveals for any page that opts in.
 *
 * Sections marked `data-fx="gsap"` + `data-section="..."` are owned by this
 * component — EntranceFx skips them. Two layers run:
 *
 * 1. Headline reveal — `[data-anim-line]` spans slide up behind a clip-mask
 *    with a per-line stagger.
 * 2. Body batch — paragraphs, list items, and article cards in the section
 *    fade up in a small stagger as they enter the viewport (or as part of
 *    the above-fold timeline).
 *
 * `data-above-fold` sections animate everything on mount via a timeline.
 * Other sections use ScrollTrigger so the reveal lands the moment the
 * section reaches `top 78%` of the viewport.
 *
 * Opt-out with `data-anim-skip` on any element you don't want animated.
 */
export default function PageHeadlines() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Track everything we create so we can tear it down cleanly on unmount.
    // Without this, ScrollTriggers and timelines from a previous page leak
    // into the next, and a `gsap.from(p, { opacity: 0 })` from the old route
    // can leave elements stuck invisible after a back-nav.
    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];
    const timelines: gsap.core.Timeline[] = [];

    const eou = 'expo.out';
    const bodySel =
      ':scope p:not([data-anim="eyebrow"]):not([data-anim-skip]),' +
      ' :scope li:not([data-anim-skip]),' +
      ' :scope article:not([data-anim-skip])';

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-fx="gsap"][data-section]'),
    );

    sections.forEach((section) => {
      const lines = section.querySelectorAll<HTMLElement>('[data-anim-line]');
      const body = Array.from(section.querySelectorAll<HTMLElement>(bodySel));
      const isAboveFold = section.hasAttribute('data-above-fold');
      const isPinReveal = section.hasAttribute('data-pin-reveal');

      if (isAboveFold) {
        const eyebrow = section.querySelector<HTMLElement>('[data-anim="eyebrow"]');
        const tl = gsap.timeline({ defaults: { ease: eou } });
        timelines.push(tl);
        if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 20, duration: 0.7 }, 0.05);
        if (lines.length) tl.from(lines, { yPercent: 110, duration: 1.15, stagger: 0.12 }, 0.2);
        if (body.length) tl.from(body, { opacity: 0, y: 18, duration: 0.8, stagger: 0.06 }, 0.9);
        return;
      }

      if (isPinReveal && lines.length) {
        const eyebrow = section.querySelector<HTMLElement>('[data-anim="eyebrow"]');
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'center center',
            end: '+=100%',
            pin: true,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
          },
        });
        timelines.push(tl);
        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
        if (eyebrow) tl.fromTo(eyebrow, { y: 0 }, { y: -40 }, 0);
        tl.from(lines, { yPercent: 110, stagger: 0.25, duration: 1 }, 0);
        return;
      }

      if (lines.length) {
        const tween = gsap.from(lines, {
          yPercent: 110,
          duration: 1.1,
          ease: eou,
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        });
        tweens.push(tween);
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }
    });

    // Top-rule draw-in — any data-fx="gsap" section that uses a top border.
    // Replace the static hairline with a pseudo-element that scales from 0 to
    // full width as the section enters view.
    const ruleSections = sections.filter((s) => /\bborder-(t|y)\b/.test(s.className));
    ruleSections.forEach((s) => {
      s.setAttribute('data-rule', 'hidden');
      const st = ScrollTrigger.create({
        trigger: s,
        start: 'top 92%',
        once: true,
        onEnter: () => s.setAttribute('data-rule', 'shown'),
      });
      triggers.push(st);
    });

    // Body batch — applies to all data-fx="gsap" sections that are NOT
    // above-fold. Each element animates when it crosses the trigger line,
    // letting long lists (architecture rows, division items) cascade
    // naturally as the user scrolls through them.
    const belowFoldBody = sections
      .filter((s) => !s.hasAttribute('data-above-fold'))
      .flatMap((s) => Array.from(s.querySelectorAll<HTMLElement>(bodySel)));

    if (belowFoldBody.length) {
      gsap.set(belowFoldBody, { opacity: 0, y: 18 });
      const batched = ScrollTrigger.batch(belowFoldBody, {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: eou,
            overwrite: 'auto',
          }),
      });
      batched.forEach((st) => triggers.push(st));
    }

    return () => {
      // Fast-forward animations to their END state before killing, so any
      // half-played `gsap.from(...)` (which starts at opacity:0) lands on its
      // natural visible state instead of leaving the element invisible. This
      // is the difference between "user navigated away mid-animation and the
      // hero is now blank on back-nav" and "everything works".
      tweens.forEach((t) => { try { t.progress(1); } catch { /* tween already disposed */ } t.kill(); });
      timelines.forEach((t) => { try { t.progress(1); } catch { /* timeline already disposed */ } t.kill(); });
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
