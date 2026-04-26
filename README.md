# Divinus Investment Group — Landing Page

Static landing page for **Divinus Investment Group (DIG)**.

Single HTML file (`index.html`) with inline CSS, vanilla JS, and one SVG asset (`Divinus logo.svg`). Uses Tailwind CDN, Three.js (none currently — particle work is canvas-based), Google Fonts.

## What's in the page

- Animated dot-grid background with cursor dispersion + Antigravity-style gradient reveal
- Custom yellow ring cursor
- Stripe-style scroll entrance animations (each section cascades in as it enters the viewport)
- Counter animations for stats
- Particle swarm in the Mission and CTA sections (cursor attraction with hollow centre, snap-and-redistribute on leave)
- Hidden tweak panel (press `Shift+T` or append `?tweaks=1` to the URL) for live tuning of the dot grid + gradient

## Local preview

Just open `index.html` in a browser, or run any static server:

```bash
python3 -m http.server 3000
# → http://localhost:3000
```

## Deploy to Vercel

```bash
vercel deploy        # preview
vercel --prod        # production
```

No build step — Vercel auto-detects this as a static site and serves `index.html` from the root.
