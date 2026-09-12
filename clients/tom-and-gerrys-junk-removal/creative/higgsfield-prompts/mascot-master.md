# Mascot — Master Character Prompt

**Purpose:** lock the canonical character. Everything else derives from the approved output here.
**Model:** `gpt_image_2` · probes at 1k/medium · final sheet at 2k/high · 3:2
**Status:** not yet generated — awaiting owner go-ahead on credit spend.

---

## Non-negotiable guardrails

Paste this block into **every** mascot prompt, without exception.

> Original character designed from first principles. Do NOT reference, imitate, parody or evoke
> any existing animated franchise, cartoon short, studio house style, or title-card typography.
> No cat. No cat-and-mouse imagery. No chase scenes. Not Disney-like, not Pixar-like, not
> Saturday-morning-cartoon, not esports-mascot, not hyperrealistic rodent.

**Explicit negatives** (append to the negative prompt every time):
`small round head with oversized round ears, large glossy anime eyes, cute infantile proportions,
franchise title lettering, cat character, chase scene, photorealistic rodent, glossy 3D render,
gradient shading, drop shadows, watermark, signature, text artifacts`

---

## Canonical character description

> A confident anthropomorphic **workman mouse**. Compact, powerfully built adult proportions —
> broad shoulders, thick muscular forearms, short strong legs. Head is proportional to the body,
> NOT oversized. Rounded tapering snout. Small rounded ears set low and back, sage-green inner ear.
> One visible dark eye with a heavy angled brow giving a confident, slightly amused expression —
> a half-smile, never a wide grin, never cute.
>
> **Wardrobe:** cream off-white work shirt with sleeves pushed up; deep forest-green work trousers;
> dark utility belt with a brass-toned buckle; oversized cream canvas work gloves; heavy dark work
> boots; forest-green work cap with a short brim. Thin tail.
>
> **Style:** flat vector editorial illustration. Exactly 4 flat colours plus outline. Heavy uniform
> 3px black-green outline. NO gradients, NO soft shading, NO drop shadows, NO texture.
> Plain flat background. Full body visible, feet included, generous margin around the figure.

**Palette (state hex values explicitly):**
`#F4EEDC` cream · `#214E3A` forest green · `#122A20` near-black outline · `#9EAF91` sage ·
`#C6923C` ochre (buckle only)

---

## Batch 1 — style probes (RUN FIRST)

Three images, `gpt_image_2`, **1k / quality: medium**, 3:2, one image each.
Same character description, three drawing treatments. Pick ONE before spending more.

| Probe | Treatment clause to append |
|---|---|
| **A — Vintage decal** | "Rendered as a mid-century painted truck decal. Thick confident outline, slightly rounded geometric shapes, subtle off-register print feel." |
| **B — Modern editorial** | "Rendered as contemporary editorial vector illustration. No outline; forms defined by flat colour blocks and negative space. Crisp and restrained." |
| **C — Workwear patch** | "Rendered as an embroidered workwear badge. Heavy simplified shapes, minimal interior detail, bold readable silhouette." |

**Selection criteria:** silhouette readability at 32px · does he look like a *worker* not a pet ·
does he survive being flattened to two colours · is he clearly independent of any franchise.

## Batch 2 — canonical sheet (after Batch 1 lock)

`gpt_image_2`, **2k / quality: high**. Run `get_workflow_instructions { workflow: "character-sheet" }`
first and follow it. Front / three-quarter / side, neutral stance, plus a head close-up.
This sheet becomes the reference image for every later pose.

## Pre-spend checklist

- [ ] `higgsfield generate cost …` run and credit cost reported to owner
- [ ] Owner approved this specific batch
- [ ] Guardrail block present in the prompt
- [ ] Negative prompt present
- [ ] Logged in `GENERATION-LOG.md`

---

## ✅ LOCKED — Direction A, 2026-09-10

**Approved treatment:** **A — Vintage decal.** Heavy uniform outline, slightly rounded geometric
shapes, subtle off-register print feel. Chosen because the outline survives 32px, one-colour
printing, vehicle vinyl and stencil work. B was rejected (gradient shading the spec forbids, no
outline so it dissolves at small size). C was rejected (a render of a physical embroidered patch —
thread cannot be vectorised).

**Approved fur — sampled from the probe, not guessed:**

| Token | Hex | Use |
|---|---|---|
| `fur` | `#6F7765` | main coat |
| `fur-light` | `#96927D` | muzzle, inner highlights |
| `fur-dark` | `#4E5548` | shadow shapes |

It reads as grey but measures **hue 87°, saturation 8% — a desaturated olive**, the same family as
sage `#9EAF91`. State these hex values explicitly in every prompt or the tone will drift.

**⚠ DARK-GROUND RULE:** `fur` on `forest` is only **2.03:1**, and `fur-dark` on forest is **1.23:1**.
Against the forest About band the mascot MUST carry a **cream `#F4EEDC` outline**, not the
near-black one. Ink outline on dark = no silhouette.

**Output requirements the probe sheet did not meet — fix these on the real run:**
- **Transparent background.** The probe came back opaque; ingestion flags it.
- **No captions, labels or lettering anywhere in the image.**
- Simplify the face for the head-icon variant — whiskers and fine facial detail mush below ~64px.
  The icon is a redraw, not a shrink.
