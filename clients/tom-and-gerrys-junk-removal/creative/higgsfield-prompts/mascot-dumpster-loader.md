# Mascot — Intro Walk Cycle (VIDEO)

**Route:** WEB (higgsfield.ai) — use your entitlement, 0 credits.
Neither Kling Motion Control nor Seedance is exposed by the MCP connector, and `unlim` is
`false` there, so generating through the connector would bill credits for a worse model list.

**Reference image:** `assets/higgsfield-inbox/mascot-side.png` (approved v3 side profile, transparent)
**Model:** Kling 3.0 image-to-video — or Seedance 2.0 if your plan exposes it on web.
**Aspect:** 1:1 · **Duration:** 4–5s · **Resolution:** 720p is plenty (see sizing below)
**Audio:** OFF. The page must never autoplay sound.

---

## ⚠ Generate him WALKING IN PLACE — do NOT pan across the screen

This is the single most important instruction, and it is counter-intuitive.

If the video travels across frame, the traverse speed and distance are baked in. A 375px phone
and a 1920px desktop need completely different traverses, so it will look wrong on one of them.

Instead: **locked camera, mascot walks in place, background static.** CSS then translates the
whole video element across the viewport. That gives us:
- speed and distance tunable in code without regenerating
- a seamless loop, so duration is free
- a far smaller file
- correct behaviour at every viewport width

## ⚠ Solid CREAM background — NOT transparent

Alpha video is a compatibility trap: VP9 alpha works in Chrome/Firefox, Safari needs HEVC with
alpha. Generate on flat cream **#F4EEDC**, matching the intro backdrop exactly. No alpha needed,
no per-browser encoding.

No ground texture, no environment, no shadows cast onto a floor beyond a simple contact shadow.

---

## Prompt

> Using the supplied reference image as the exact character design, animate a seamless looping
> side-profile walk cycle.
>
> The character walks in place, pushing a small dark-green two-wheeled cart loaded with junk.
> He is working at it — leaning forward into the push, shoulders set, taking steady deliberate
> strides under a heavy load. A slight effort in the body: a small bob with each step, weight
> shifting, the cart rocking very slightly as it rolls. He is straining a little but making
> steady progress and clearly in control. Determined and good-natured, not exhausted, not
> comedic, not staggering.
>
> LOCKED CAMERA. The camera does not move, pan, zoom, track or shake at all. The character stays
> centred in frame and does not travel left or right — he walks in place like a treadmill shot.
>
> Flat solid cream #F4EEDC background. No environment, no scenery, no floor texture, no
> background objects, no lighting changes.
>
> The character's design, proportions, colours, clothing and line weight must stay exactly as the
> reference in every frame. No morphing, no style drift, no changing proportions.
>
> Seamless loop: the last frame must flow back into the first so the walk cycle repeats without
> a visible jump. Smooth, fluid, natural walking motion.
>
> Flat 2D vector cartoon animation style, consistent heavy outline, no gradients, no 3D
> rendering, no photorealism. Silent, no audio.

**Negative:** `camera movement, camera pan, zoom, tracking shot, handheld shake, character moves
across frame, travelling shot, background scenery, environment, floor texture, changing
background, morphing, style drift, proportion changes, extra characters, text, captions,
watermark, logo, 3D render, photorealistic, gradient shading, audio, speech, staggering,
falling, comedic stumbling, exhausted collapse`

---

## Accept / reject

- [ ] Camera **completely static** — this is the most common failure
- [ ] Character walks **in place**, does not drift across frame
- [ ] **Loops seamlessly** — scrub the last frame into the first, no jump
- [ ] Design matches the reference in every frame; no morphing
- [ ] Reads as effort — leaning in, steady strides — not staggering or comedic
- [ ] Flat cream background throughout, no scenery creeping in
- [ ] No text or watermark
- [ ] Silent

## After it lands

1. Drop it in `assets/higgsfield-inbox/` named `motion-mascot-cart-walk.mp4`
   (the `motion-` prefix routes it to `public/brand/motion/`).
2. `npm run assets:ingest` — produces MP4 + WebM + poster.
   ⚠ Needs **ffmpeg**, which is not installed yet: `sudo apt install ffmpeg`.
3. Set `VIDEO_SRC: "/brand/motion/motion-mascot-cart-walk"` in `src/config/motion.ts`.
   The overlay picks it up and falls back automatically if it ever fails to load.
4. Tune `TRAVERSE_SECONDS` in the same file — no regeneration needed.

**Size budget:** keep the encoded loop **under ~400KB**. It is decorative; it must never compete
with the hero for bandwidth. If it lands heavy, shorten the loop rather than dropping quality —
a 3s seamless cycle looks identical to a 5s one once it repeats.
