# Mascot — Loader / Intro Animation

## Current decision: DO NOT GENERATE VIDEO

The intro is implemented in code — `src/components/IntroOverlay.tsx`, SVG + Framer Motion.

**Why:**
- Kling 3.0 **Motion Control** needs a driving reference video we don't have, and isn't exposed
  by the MCP connector. Seedance 2.5 isn't exposed either.
- Coded motion is a few KB, cannot become the LCP element, and cannot fail to load.
- The brief's own loader correction prefers lightweight SVG/CSS over video.
- Cost: **0 credits.**

The coded loader already satisfies the spec: mascot pushes a dark-green cart left→right across a
cream field, cart holds four junk silhouettes (lamp, box, chair leg, bag), ~1.5s, plays once per
session, `pointer-events-none` so the page stays usable, skipped under `prefers-reduced-motion`.

## If we later decide code isn't enough

Use Higgsfield for a **motion reference only** — something to animate *against* in code, not to ship.

Prompt sketch (locked side profile, no camera move):

> Locked-off side profile. The approved workman mouse character pushes a small dark-green wheeled
> cart from left to right at a steady walking pace. Camera completely static — no pan, no zoom, no
> parallax. Flat cream background, no environment detail. Character proportions must not change,
> no morphing, no style drift. Loopable. Silent.

Only if a shippable video is genuinely required: WebM + MP4 fallback, explicit width/height,
optimised poster frame, hard size cap, `preload="none"`, never the LCP element.
