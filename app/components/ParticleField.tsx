'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import {
  CFG, computeIntensity, isOverText, rebuildGradientStops, sampleGradient,
  type Mouse,
} from '../lib/dotgrid-shared';

type Particle = {
  x: number; y: number; vx: number; vy: number;
  baseAlpha: number; size: number; targetDist: number;
  _tx?: number; _ty?: number;
};

export default function ParticleField({
  className = '',
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    let particles: Particle[] = [];
    const mouse: Mouse = { x: -9999, y: -9999, active: false, lastMove: 0, overText: false };
    let intensity = 0, textFactor = 0;
    let homingUntil = 0, noiseBoostUntil = 0;
    let raf = 0;

    function makeParticle(): Particle {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseAlpha: 0.14 + Math.random() * 0.32,
        size: 0.6 + Math.random() * 1.0,
        targetDist: 80 + Math.sqrt(Math.random()) * 380,
      };
    }
    function buildParticles() {
      const target = Math.min(5000, Math.floor((w * h) / 220));
      const cur = particles.length;
      if (cur === target) return;
      if (cur < target) for (let i = cur; i < target; i++) particles.push(makeParticle());
      else particles.length = target;
    }
    function resize() {
      const rect = el!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    }
    function step() {
      const I = intensity;
      const SEEK = 0.0016;
      const NOISE_AMBIENT = 0.05;
      const NOISE_ACTIVE = 0.04;
      const DAMP = 0.92;
      const MAX_SPEED = 8;
      const now = performance.now();
      const releaseT = noiseBoostUntil && now < noiseBoostUntil
        ? (noiseBoostUntil - now) / 1500 : 0;
      const boost = 1 + releaseT * 3.0;
      const noise = (NOISE_AMBIENT + (NOISE_ACTIVE - NOISE_AMBIENT) * I) * boost;
      const homingT = homingUntil && now < homingUntil ? (homingUntil - now) / 1500 : 0;
      const HOMING_PULL = 0.005;
      const mx = mouse.x, my = mouse.y;
      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * noise;
        p.vy += (Math.random() - 0.5) * noise;
        if (I > 0) {
          const dx = mx - p.x, dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const HARD_MIN = 50;
          if (dist < HARD_MIN) {
            const push = (HARD_MIN - dist) * 0.10 * I;
            p.vx -= (dx / dist) * push;
            p.vy -= (dy / dist) * push;
          } else {
            const offset = dist - p.targetDist;
            const force = offset * SEEK * I;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
        if (homingT > 0 && p._tx !== undefined && p._ty !== undefined) {
          p.vx += (p._tx - p.x) * HOMING_PULL * homingT;
          p.vy += (p._ty - p.y) * HOMING_PULL * homingT;
        }
        p.vx *= DAMP;
        p.vy *= DAMP;
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > MAX_SPEED) { p.vx = (p.vx / sp) * MAX_SPEED; p.vy = (p.vy / sp) * MAX_SPEED; }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = w + 5; else if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5; else if (p.y > h + 5) p.y = -5;
      }
    }
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const I = intensity;
      const useGradient = CFG.gradientEnabled && I > 0;
      if (useGradient) rebuildGradientStops();
      const GR = CFG.radius * CFG.gradientSize;
      const TF = textFactor;
      const mx = mouse.x, my = mouse.y;
      for (const p of particles) {
        let r = 255, g = 255, b = 255;
        let alpha = p.baseAlpha;
        if (useGradient) {
          const dx = p.x - mx, dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GR) {
            const t = dist / GR;
            const sample = sampleGradient(t);
            if (sample) {
              const tR = sample[0] + (10 - sample[0]) * TF;
              const tG = sample[1] + (10 - sample[1]) * TF;
              const tB = sample[2] + (10 - sample[2]) * TF;
              const fade = 1 - t;
              const blend = Math.min(1, fade * I * CFG.gradientAlpha * 2);
              r = 255 + (tR - 255) * blend;
              g = 255 + (tG - 255) * blend;
              b = 255 + (tB - 255) * blend;
              alpha = Math.min(1, alpha + blend * 0.5);
            }
          }
        }
        ctx!.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
        const s = p.size;
        ctx!.fillRect(p.x - s * 0.5, p.y - s * 0.5, s, s);
      }
    }
    function loop() {
      intensity = computeIntensity(mouse, CFG.idleMs);
      const targetTF = mouse.overText ? 1 : 0;
      textFactor += (targetTF - textFactor) * 0.18;
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      const rect = el!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      mouse.lastMove = performance.now();
      mouse.overText = isOverText(e.target, e.clientX, e.clientY);
    };
    const onLeave = () => {
      mouse.overText = false;
      mouse.active = false;
      const cx = mouse.x, cy = mouse.y;
      for (const p of particles) {
        const dx = p.x - cx, dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const mag = 1.8 + Math.random() * 2.4;
        p.vx += (dx / dist) * mag;
        p.vy += (dy / dist) * mag;
        p._tx = Math.random() * w;
        p._ty = Math.random() * h;
      }
      const NOW = performance.now();
      homingUntil = NOW + 1500;
      noiseBoostUntil = NOW + 1500;
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // Only run the rAF loop while the section is in (or near) the viewport.
    // Saves a lot of CPU on weaker hardware — multiple ParticleFields can
    // exist on one page (CTAs across the site), and they shouldn't burn
    // battery when they're scrolled off-screen.
    let visible = false;
    const start = () => {
      if (visible) return;
      visible = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!visible) return;
      visible = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (el.getBoundingClientRect().top < window.innerHeight && el.getBoundingClientRect().bottom > 0) {
        start();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`particle-section ${className}`} {...rest}>
      <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
      {children}
    </section>
  );
}
