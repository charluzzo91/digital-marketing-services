# Mascot — Character Sheet, REVISION 2

**This is a targeted revision of v1, not a restart.** Pass the v1 sheet in as a reference image so
construction, wardrobe and colour carry over. We are changing four things and nothing else.

**Route:** WEB (higgsfield.ai) · **Model:** GPT Image 2 · **2K / High** · **Aspect:** 3:2
**Reference:** `assets/higgsfield-inbox/2026-09-10_mascot-character-sheet_gpt-image-2_v1.png`

---

## What v1 got right — PRESERVE ALL OF THIS

Four-view layout · consistent construction across views · cream shirt with chest pocket and rolled
sleeves · forest-green trousers with turn-ups · dark belt with brass buckle · heavy lace-up work
boots · forest-green cap · long thin tail · confident half-smile with heavy angled brows ·
the Direction A decal treatment.

Colour held well (verified): forest `#284838`, cream `#F8E8C8`, fur `#787860`. Keep these.

## What must change — the only four edits

**1. HE MUST READ AS A MOUSE.** v1 reads as a bear or badger.
- Snout: longer and tapering to a rounded point. Not short, not broad, not bear-like.
- Ears: **notably larger**, round, set **lower and wider** on the skull — not small and high.
  Sage `#9EAF91` inner ear, clearly visible.
- Add **whiskers**: three or four per side, thin, springing from the muzzle. Clean and sparse.
- KEEP the heavy angled brow and the strong jaw. He is a workman with a mouse's head, not a
  cute rodent. This is also what keeps him distinct from any existing cartoon mouse.

**2. COMPACT BUILD.** v1 is ~6.5–7 heads tall and athletic. Target **~5 heads tall**:
shorter, sturdier legs · broader chest and shoulders · thicker forearms · lower centre of gravity.
A stocky workman mascot, not a tall action figure.

**3. RESTORE THE GLOVES.** v1 lost them. **Oversized cream canvas work gloves**, clearly
readable as gloves — visible cuff at the wrist, chunky fingers, distinctly bigger than a bare hand.
Gloves are a primary "this person does physical work" signal.

**4. FLATTEN AND STRENGTHEN THE LINE.**
- Remove the soft cel-shading on the fur. Flat colour fills only, no gradients, no airbrush.
  At most ONE flat darker shadow shape per form.
- Outline heavier and darker — near-black `#122A20`, thick and uniform, as in the Direction A
  probe. v1's line came back at `#303830` and is too light and thin.

## Output requirements — v1 FAILED THE FIRST ONE

> ⚠ **v1 returned a PAINTED CHECKERBOARD, not transparency.** The file had 3 channels and no
> alpha; the "transparent" background was literally drawn as alternating `#fbfbfb`/`#ededed`
> squares. It looks transparent in a viewer and would ship as a checkerboard.
>
> **Ask for a plain flat solid background instead** — a single uniform colour, no checkerboard,
> no gradient, no texture. We remove it cleanly ourselves afterwards. Requesting "transparent"
> is what produced the painted checkerboard.

- Plain flat **solid** background, one uniform colour, clearly different from every character colour.
- **No captions, labels, titles, lettering or watermarks anywhere in the image.**
- Four views, evenly spaced, generous margin, nothing cropped: front · three-quarter arms crossed ·
  full side profile · head-and-shoulders close-up.

---

## Full prompt

> Character model sheet of the SAME original character shown in the reference image, redrawn with
> four specific changes. Four views in a row on a plain flat solid background:
> (1) front view, neutral stance, arms at sides;
> (2) three-quarter view, arms crossed;
> (3) full side profile;
> (4) head and shoulders close-up, front.
>
> CHANGE 1 — SPECIES: the character must clearly read as a MOUSE. Give him a longer tapering snout
> rounded at the tip, notably larger round ears set lower and wider on the skull with sage-green
> inner ear, and three or four thin whiskers per side. Keep the heavy angled brows, the strong jaw
> and the confident half-smile — he is a tough workman with a mouse's head, not a cute rodent.
>
> CHANGE 2 — BUILD: compact and stocky, approximately five heads tall. Shorter sturdy legs, broad
> chest, wide shoulders, thick muscular forearms, low centre of gravity. NOT tall, NOT athletic,
> NOT heroic proportions.
>
> CHANGE 3 — GLOVES: oversized cream canvas work gloves on both hands, clearly readable as gloves,
> with a visible cuff at the wrist and chunky fingers, noticeably larger than a bare hand.
>
> CHANGE 4 — RENDERING: completely flat colour. No gradients, no airbrush, no soft cel-shading —
> at most one flat darker shadow shape per form. Thick, uniform, near-black #122A20 outline
> throughout, in the style of a mid-century painted truck decal.
>
> KEEP UNCHANGED from the reference: cream off-white work shirt with chest pocket and rolled
> sleeves; deep forest-green work trousers with turn-ups; dark belt with brass buckle; heavy dark
> lace-up work boots; forest-green work cap with short brim; long thin tail.
>
> FUR: desaturated olive-grey, main coat #6F7765, lighter muzzle #96927D, shadow #4E5548.
> PALETTE: #F4EEDC cream, #214E3A forest green, #122A20 outline, #9EAF91 sage inner ear,
> #C6923C ochre belt buckle only.
>
> Plain flat solid background in one uniform colour. No captions, labels, titles, lettering or
> watermarks anywhere in the image. Generous margin, nothing cropped.
>
> Original character designed from first principles. Do NOT reference, imitate, parody or evoke any
> existing animated franchise, cartoon short, studio house style, or title-card typography. No cat.
> No cat-and-mouse imagery.

**Negative:** `bear, badger, otter, dog, short broad muzzle, small high-set ears, no whiskers,
tall athletic heroic proportions, long legs, bare hands, gradient shading, airbrush, soft shading,
thin outline, checkerboard background, transparent background pattern, captions, labels, lettering,
watermark, signature, cat character, franchise title lettering, cute infantile proportions`

---

## Accept / reject checklist

- [ ] Reads unmistakably as a **mouse** at full size AND squinted down to thumbnail
- [ ] Roughly **5 heads tall**, stocky
- [ ] **Oversized gloves** clearly visible on both hands
- [ ] Flat colour, **no gradients**; thick near-black outline
- [ ] Wardrobe identical to v1
- [ ] Plain solid background, **no checkerboard**
- [ ] No lettering anywhere
- [ ] All four views on-model with each other
