'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import type { GlobeMethods } from 'react-globe.gl';
import worldAtlas from '../lib/world-atlas-110m.json';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type Feature = { type: string; properties: Record<string, unknown>; geometry: unknown };

// Decode TopoJSON → GeoJSON once at module load — eliminates a network
// fetch and a useEffect roundtrip on every visit.
const COUNTRIES_TOPO = worldAtlas as unknown as Topology;
const COUNTRIES_FEATURES: Feature[] =
  (feature(
    COUNTRIES_TOPO,
    COUNTRIES_TOPO.objects.countries as GeometryCollection,
  ) as unknown as { features: Feature[] }).features;

// Baked config (sourced from the dev tuner).
const BASE_ROTATE_SPEED = -2.6;
const SIZE_VH = 120;
const RIGHT_OFFSET_PCT = -6;
const Y_OFFSET_PCT = 3;
const HEX_COLOR = '#575757';

// Mobile (< lg) — sourced from the dev tuner.
const MOBILE_SIZE_VH = 75;
const MOBILE_RIGHT_OFFSET_PCT = -100;
const MOBILE_Y_OFFSET_PCT = -3;

/**
 * Hex polygon globe for the hero. Countries rendered as a low-resolution
 * mosaic of dot-hexagons on a black sphere. Auto-rotates at a slow base
 * speed; user scroll adds a momentary velocity boost that decays back —
 * the globe "scrolls with you".
 */
export default function HeroGlobe() {
  const [size, setSize] = useState({ w: 560, h: 560 });
  const [isMobile, setIsMobile] = useState(false);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    const compute = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      const sizeVh = mobile ? MOBILE_SIZE_VH : SIZE_VH;
      const w = Math.min(1100, (window.innerHeight * sizeVh) / 100);
      setSize({ w, h: w });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Wire auto-rotate + scroll velocity onto the OrbitControls.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let scrollBoost = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf = 0;

    const ensureRotating = () => {
      const ctrl = globeRef.current?.controls();
      if (!ctrl) return null;
      ctrl.autoRotate = true;
      return ctrl;
    };

    const tick = () => {
      const ctrl = ensureRotating();
      if (ctrl) {
        scrollBoost *= 0.93; // ease back to baseline
        if (Math.abs(scrollBoost) < 0.01) scrollBoost = 0;
        ctrl.autoRotateSpeed = reduceMotion ? 0 : BASE_ROTATE_SPEED + scrollBoost;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (reduceMotion) return;
      const y = window.scrollY;
      const t = performance.now();
      const dy = y - lastY;
      const dt = Math.max(t - lastT, 1);
      const v = dy / dt; // px/ms — negative when scrolling up
      // Map velocity into rotation boost, clamp so fast flicks don't overspin.
      const boost = scrollBoost + v * 28;
      scrollBoost = Math.max(-22, Math.min(22, boost));
      lastY = y;
      lastT = t;
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-globe-root
      className="pointer-events-none fixed inset-y-0 right-0 block z-0"
      style={{ width: 'min(60vw, 820px)', willChange: 'transform' }}
    >
      <div className="relative h-full w-full">
        <div
          className="absolute"
          style={{
            top: '50%',
            right: `${isMobile ? MOBILE_RIGHT_OFFSET_PCT : RIGHT_OFFSET_PCT}%`,
            transform: `translateY(calc(-50% + ${isMobile ? MOBILE_Y_OFFSET_PCT : Y_OFFSET_PCT}%))`,
            width: `min(1100px, ${isMobile ? MOBILE_SIZE_VH : SIZE_VH}vh)`,
            aspectRatio: '1 / 1',
            // Mask follows the globe's own bounds, not the wrapper's, so the
            // canvas can extend below the hero section without being clipped.
            // On mobile the globe is small + tucked off-screen right, so the
            // fade mask would erase the visible sliver — drop it there.
            WebkitMaskImage: isMobile
              ? 'none'
              : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 22%, #000 50%)',
            maskImage: isMobile
              ? 'none'
              : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 22%, #000 50%)',
          }}
        >
          <Globe
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere={false}
            atmosphereColor="#5c27be"
            atmosphereAltitude={0.18}
            showGlobe
            hexPolygonsData={COUNTRIES_FEATURES}
            hexPolygonResolution={3}
            hexPolygonMargin={0.3}
            hexPolygonAltitude={0}
            hexPolygonUseDots
            hexPolygonColor={() => HEX_COLOR}
          />
        </div>
      </div>
    </div>
  );
}
