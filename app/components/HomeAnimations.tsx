'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Page-scoped GSAP animations for the home page only.
 * Listens to sections marked with `data-fx="gsap"` to coordinate entrances
 * — EntranceFx.tsx skips those sections so we are the single source of truth.
 *
 * Storyboard:
 *   t=0.0  eyebrow line slides up + fades in
 *   t=0.1  hero headline rises in two halves (white line, then muted line)
 *   t=0.4  sub paragraph + CTAs fade up
 *   t=0.7  Group/Divisions/Direction triplet stamps in with slight overshoot
 *   t=1.0  voice strip slides in from the left
 *
 * Below the fold each section gets a quick batch on its content as it
 * enters the viewport — never more than 600ms, never with bounce.
 */
export default function HomeAnimations() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const eou = 'expo.out';
      const cubic = 'cubic-bezier(0.16, 1, 0.3, 1)';

      // ── HERO ──────────────────────────────────────────────────────
      const hero = document.querySelector('[data-fx="gsap"][data-section="hero"]');
      if (hero) {
        const eyebrow = hero.querySelector('[data-anim="eyebrow"]');
        const headlineLines = hero.querySelectorAll('[data-anim="headline"] [data-anim-line]');
        const sub = hero.querySelector('[data-anim="sub"]');
        const ctas = hero.querySelectorAll('[data-anim="cta"] > *');
        const triplet = hero.querySelectorAll('[data-anim="triplet"] > div');

        const initial: { el: Element | null; from: gsap.TweenVars }[] = [
          { el: eyebrow, from: { opacity: 0, y: 24 } },
          { el: sub,     from: { opacity: 0, y: 24 } },
        ];
        initial.forEach(({ el, from }) => { if (el) gsap.set(el, from); });
        if (headlineLines.length) gsap.set(headlineLines, { opacity: 0, y: 48, scale: 0.985 });
        if (ctas.length)          gsap.set(ctas,          { opacity: 0, y: 18 });
        if (triplet.length)       gsap.set(triplet,       { opacity: 0, y: 24 });

        const tl = gsap.timeline({ defaults: { ease: eou } });
        if (eyebrow)               tl.to(eyebrow,       { opacity: 1, y: 0, duration: 0.7 }, 0.05);
        if (headlineLines.length)  tl.to(headlineLines, { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.12 }, 0.15);
        if (sub)                   tl.to(sub,           { opacity: 1, y: 0, duration: 0.8 }, 0.55);
        if (ctas.length)           tl.to(ctas,          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.7);
        if (triplet.length)        tl.to(triplet,       { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.85);
      }

      // ── GROUP OVERVIEW — pinned-feel reveal of the three lines ────
      const group = document.querySelector('[data-fx="gsap"][data-section="group"]');
      if (group) {
        const lines = group.querySelectorAll('[data-anim="group-line"]');
        const body = group.querySelectorAll('[data-anim="group-body"] > *');
        if (lines.length) {
          gsap.set(lines, { opacity: 0, y: 36 });
          gsap.to(lines, {
            opacity: 1, y: 0, duration: 0.9, ease: eou, stagger: 0.14,
            scrollTrigger: { trigger: group, start: 'top 78%', once: true },
          });
        }
        if (body.length) {
          gsap.set(body, { opacity: 0, y: 16 });
          gsap.to(body, {
            opacity: 1, y: 0, duration: 0.7, ease: eou, stagger: 0.1,
            scrollTrigger: { trigger: group, start: 'top 70%', once: true },
          });
        }
      }

      // ── SEVEN DIVISIONS rows — batched entrance ───────────────────
      const divisions = document.querySelector('[data-fx="gsap"][data-section="divisions"]');
      if (divisions) {
        const head = divisions.querySelectorAll('[data-anim="div-head"] > *');
        if (head.length) {
          gsap.set(head, { opacity: 0, y: 18 });
          gsap.to(head, {
            opacity: 1, y: 0, duration: 0.7, ease: eou, stagger: 0.08,
            scrollTrigger: { trigger: divisions, start: 'top 80%', once: true },
          });
        }

        const rows = divisions.querySelectorAll('[data-anim="div-row"]');
        if (rows.length) {
          gsap.set(rows, { opacity: 0, y: 28 });
          ScrollTrigger.batch(Array.from(rows) as Element[], {
            start: 'top 88%',
            once: true,
            interval: 0.08,
            onEnter: (els) => {
              gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: eou, stagger: 0.09 });
            },
          });
        }
      }

      // ── COMMUNITIES — two cards drop in side-by-side ──────────────
      const communities = document.querySelector('[data-fx="gsap"][data-section="communities"]');
      if (communities) {
        const head = communities.querySelectorAll('[data-anim="comm-head"] > *');
        const cards = communities.querySelectorAll('[data-anim="comm-card"]');
        if (head.length) {
          gsap.set(head, { opacity: 0, y: 22 });
          gsap.to(head, {
            opacity: 1, y: 0, duration: 0.8, ease: eou, stagger: 0.08,
            scrollTrigger: { trigger: communities, start: 'top 78%', once: true },
          });
        }
        if (cards.length) {
          gsap.set(cards, { opacity: 0, y: 36, scale: 0.985 });
          gsap.to(cards, {
            opacity: 1, y: 0, scale: 1, duration: 0.9, ease: eou, stagger: 0.14,
            scrollTrigger: { trigger: communities, start: 'top 70%', once: true },
          });
        }
      }

      // ── FIND YOUR PLACE — rows slide in left → right ──────────────
      const routing = document.querySelector('[data-fx="gsap"][data-section="routing"]');
      if (routing) {
        const head = routing.querySelectorAll('[data-anim="route-head"] > *');
        const rows = routing.querySelectorAll('[data-anim="route-row"]');
        if (head.length) {
          gsap.set(head, { opacity: 0, y: 18 });
          gsap.to(head, {
            opacity: 1, y: 0, duration: 0.7, ease: eou, stagger: 0.08,
            scrollTrigger: { trigger: routing, start: 'top 78%', once: true },
          });
        }
        if (rows.length) {
          gsap.set(rows, { opacity: 0, x: -28 });
          gsap.to(rows, {
            opacity: 1, x: 0, duration: 0.7, ease: eou, stagger: 0.08,
            scrollTrigger: { trigger: routing, start: 'top 80%', once: true },
          });
        }
      }

      // ── CTA BANNER — assertive scale-in ───────────────────────────
      const cta = document.querySelector('[data-fx="gsap"][data-section="cta"]');
      if (cta) {
        const lines = cta.querySelectorAll('[data-anim="cta-headline"] [data-anim-line]');
        const rest = cta.querySelectorAll('[data-anim="cta-body"] > *');
        if (lines.length) {
          gsap.set(lines, { opacity: 0, y: 40, scale: 0.97 });
          gsap.to(lines, {
            opacity: 1, y: 0, scale: 1, duration: 1.0, ease: eou, stagger: 0.12,
            scrollTrigger: { trigger: cta, start: 'top 75%', once: true },
          });
        }
        if (rest.length) {
          gsap.set(rest, { opacity: 0, y: 18 });
          gsap.to(rest, {
            opacity: 1, y: 0, duration: 0.7, ease: eou, stagger: 0.1,
            scrollTrigger: { trigger: cta, start: 'top 70%', once: true },
          });
        }
      }

      // ── DIVISIONS — cursor-tracking image preview ────────────────
      // GSAP recipe: gsap.quickTo for the smooth-follow, fade in/out
      // on row pointerenter/leave, swap which tile is visible.
      const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const previewStack = document.querySelector<HTMLElement>('[data-preview-stack]');
      const host = document.querySelector<HTMLElement>('[data-preview-host]');
      if (fineHover && previewStack && host) {
        const tiles = Array.from(document.querySelectorAll<HTMLElement>('[data-preview-tile]'));

        // Smoothed follow — quickTo gives the slightly lagging "wand" feel.
        const xTo = gsap.quickTo(previewStack, 'x', { duration: 0.55, ease: 'power3' });
        const yTo = gsap.quickTo(previewStack, 'y', { duration: 0.55, ease: 'power3' });
        const rTo = gsap.quickTo(previewStack, 'rotate', { duration: 0.7, ease: 'power3' });

        let active: string | null = null;
        let lastX = 0, lastY = 0;

        const onMove = (e: PointerEvent) => {
          // Offset so the tile rides ahead-and-up of the cursor, not under it.
          const x = e.clientX + 32;
          const y = e.clientY - 240;
          xTo(x);
          yTo(y);
          // Subtle rotation based on horizontal velocity for liveliness.
          const dx = e.clientX - lastX;
          rTo(Math.max(-8, Math.min(8, dx * 0.4)));
          lastX = e.clientX;
          lastY = e.clientY;
        };

        const setActive = (anchor: string) => {
          if (active === anchor) return;
          active = anchor;
          tiles.forEach((t) => {
            const isActive = t.dataset.previewTile === anchor;
            gsap.to(t, {
              opacity: isActive ? 1 : 0,
              duration: 0.35,
              ease: 'power2.out',
            });
          });
        };

        const onScroll = () => {
          // Cursor doesn't move on scroll — check if the last known position is still over the host section.
          const el = document.elementFromPoint(lastX, lastY);
          if (!el || !host.contains(el)) hideStack();
        };

        const onLeaveHost = () => hideStack();

        const showStack = (anchor: string, e: PointerEvent) => {
          // Place instantly at first cursor position so it doesn't sweep in from origin.
          gsap.set(previewStack, { x: e.clientX + 32, y: e.clientY - 240 });
          lastX = e.clientX;
          lastY = e.clientY;
          setActive(anchor);
          gsap.to(previewStack, {
            opacity: 1, scale: 1, duration: 0.45, ease: 'expo.out',
            overwrite: 'auto',
          });
          window.addEventListener('pointermove', onMove, { passive: true });
          window.addEventListener('scroll', onScroll, { passive: true });
          host.addEventListener('pointerleave', onLeaveHost);
        };

        const hideStack = () => {
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('scroll', onScroll);
          host.removeEventListener('pointerleave', onLeaveHost);
          gsap.to(previewStack, {
            opacity: 0, scale: 0.96, duration: 0.3, ease: 'power2.out',
            overwrite: 'auto',
          });
          active = null;
        };

        gsap.set(previewStack, { scale: 0.96 });

        // Delegate via pointerover/out on the host — survives row re-renders
        // and synthetic dispatch.
        const onOver = (e: PointerEvent) => {
          const row = (e.target as Element | null)?.closest?.('[data-preview-row]') as HTMLElement | null;
          if (!row) return;
          const anchor = row.dataset.previewRow!;
          if (active === null) showStack(anchor, e);
          else setActive(anchor);
        };
        const onOut = (e: PointerEvent) => {
          const from = (e.target as Element | null)?.closest?.('[data-preview-row]');
          if (!from) return;
          const to = e.relatedTarget as Element | null;
          if (to && to.closest && to.closest('[data-preview-row]')) return;
          // Only hide once we've actually left the host's row area entirely.
          const stillInHost = to && host.contains(to);
          if (!stillInHost) hideStack();
        };
        host.addEventListener('pointerover', onOver);
        host.addEventListener('pointerout', onOut);
      }

      // Avoid an unused-var lint after the cubic constant lives only in a comment.
      void cubic;
    },
    { scope: root },
  );

  return <div ref={root} aria-hidden="true" style={{ display: 'contents' }} />;
}
