# Mascot — Canonical Character Sheet

**This is the asset everything else depends on.** Generate it once, approve it once, then reference
it in every later prompt. Do not run this until a style probe from `mascot-master.md` is chosen.

**Route:** WEB (higgsfield.ai) — use your web entitlement, preserve credits.
**Model:** GPT Image 2 · **Resolution:** 2K · **Quality:** High · **Aspect:** 3:2
**References:** the approved style probe from `/assets/higgsfield-inbox/`

Higgsfield's own character-sheet workflow exists — on the web app, use it if offered. Via MCP the
equivalent is `get_workflow_instructions { workflow: "character-sheet" }`.

---

## Prompt

> Character model sheet on a single flat cream background. The same original character shown four
> times in a row, identical design, identical proportions, identical colours:
> (1) front view, neutral standing stance, arms at sides;
> (2) three-quarter view, arms crossed;
> (3) full side profile, arms at sides;
> (4) head and shoulders close-up, front.
>
> CHARACTER: A confident anthropomorphic workman mouse. Compact, powerfully built adult
> proportions — broad shoulders, thick muscular forearms, short strong legs. Head proportional to
> the body, NOT oversized. Rounded tapering snout. Small rounded ears set low and back with
> sage-green inner ear. Dark eyes with heavy angled brows giving a confident, slightly amused
> expression — a half-smile, never a wide grin, never cute.
>
> WARDROBE: cream off-white work shirt, sleeves pushed up; deep forest-green work trousers; dark
> utility belt with brass-toned buckle; oversized cream canvas work gloves; heavy dark work boots;
> forest-green work cap with short brim. Thin tail.
>
> STYLE: flat vector editorial illustration. Exactly four flat colours plus outline. Heavy uniform
> outline. NO gradients, NO soft shading, NO drop shadows, NO texture, NO scene. Even lighting.
> Full body visible in views 1–3, feet included, generous margin around every figure.
>
> PALETTE: #F4EEDC cream, #214E3A forest green, #122A20 near-black outline, #9EAF91 sage,
> #C6923C ochre (buckle only).
>
> Original character designed from first principles. Do NOT reference, imitate, parody or evoke any
> existing animated franchise, cartoon short, studio house style, or title-card typography. No cat.
> No cat-and-mouse imagery. Not Disney-like, not Pixar-like, not Saturday-morning-cartoon, not
> esports-mascot, not hyperrealistic rodent.

**Negative:** `small round head with oversized round ears, large glossy anime eyes, cute infantile
proportions, franchise title lettering, cat character, chase scene, photorealistic rodent, glossy
3D render, gradient shading, drop shadows, watermark, signature, text artifacts, inconsistent
proportions between views`

---

## After approval

1. Save the chosen result as `/public/brand/mascot/mascot-master-reference.png`
2. Consider creating a reusable Higgsfield **Element / character reference** from it on the web app,
   so later poses stay locked to this design.
3. Vectorise it into `src/components/Mascot.tsx`, replacing the placeholder paths.
4. Every later prompt references this sheet. Never redesign him per scene.
