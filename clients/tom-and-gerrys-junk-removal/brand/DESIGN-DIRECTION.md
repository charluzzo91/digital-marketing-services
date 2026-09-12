# Tom and Gerry's Junk Removal — Design Direction v0.1

Status: **AWAITING APPROVAL.** Nothing is built and no credits are spent until the three locks
at the bottom are signed off.

---

## 0. Inspection findings

### Repo
Monorepo of client sites, no root package.json.

```
_starter-template/          Vite + vanilla HTML/CSS/JS. Thin. Has .do/app.yaml (DigitalOcean).
clients/
  dimar-demolition-services/  React 18 + Vite (NOT Next.js). src/constants.js holds all
                              business facts; src/theme.js holds tokens; src-design/handoff/.
```

**Stack decision:** the repo does not dictate Next.js — the one real client site is React + Vite.
But this project needs server-rendered indexable HTML, per-service routes later, `sitemap.xml`,
metadata and OG tags. Vite SPA fights all of that.

**Recommendation: Next.js (App Router) + TypeScript + Tailwind + Framer Motion**, as the brief's
default. It is a deliberate departure from the Dimar precedent, justified by SEO. The Dimar
`constants.js` convention carries over as `src/config/business.ts`.

### Tooling — verified, not assumed

| Tool | Status |
|---|---|
| UI/UX Pro Max | ✅ installed, `~/.claude/skills/ui-ux-pro-max`, Python CLI. Used below. |
| 21st.dev Magic (MCP) | ❌ **failed to connect** — `-32001 Not authenticated`. API key missing/reset. Fix at https://21st.dev/mcp. |
| 21st.dev CLI skills | ✅ installed (`21st-ai`, `21st-ui-build`, `21st-cli-use`, …) — usable without the MCP server. |
| Higgsfield | ✅ **already connected as an MCP connector.** The CLI install in the brief is unnecessary — do not run it. |
| Higgsfield account | Plus plan, **1200 credits**. |

### Higgsfield model availability — this is the important correction

The brief names four models. Checked against this account's live catalog:

| Brief asks for | Actually available? |
|---|---|
| **GPT Image 2** | ✅ `gpt_image_2` — 1k/2k/4k, low/med/high quality. |
| Seedream 5 Pro | ❌ not in this account's catalog. |
| Kling 3.0 **Motion Control** | ❌ only `kling3_0_turbo` (image-to-video, single start frame). Motion Control routes through Genjutsu and **requires a driving reference video we do not have**. |
| Seedance 2.5 | ❌ not in this account's catalog. |

Also available and relevant: **`nano_banana_pro`** (Google — top-tier text rendering, 4k), useful as
the second opinion against GPT Image 2 for logo lockups.

> ⚠️ **`unlim` is currently `available: false` on this account.** Every generation spends credits,
> including on models tagged `unlim`-capable. Do not assume "Plus = unlimited."

**Consequence:** the loader is built in **code (SVG + Framer Motion), not AI video.** That matches
the brief's own loader correction, and it is now also the only sensible route since Motion Control
and Seedance are unavailable. It costs 0 credits, ships ~10–20KB instead of megabytes, and cannot
become the LCP element.

### Claude model routing
`claude --model` accepts `fable`, `opus`, `sonnet` (or full IDs). Current session is **Opus 5**.
Fable 5.1 is not confirmed spawnable from here as a subagent — the Agent tool exposes model
overrides of `sonnet | opus | haiku | fable`, so `fable` can be requested but I will not claim it
resolves until a task actually runs on it. Plan: keep architecture/critique on the current Opus 5
session; route bulk implementation to Sonnet 5 subagents **only** where workstreams are genuinely
independent (see §6). No subagents for trivial work.

---

## 1. Aesthetic direction

**Name: "Painted Truck."**

The reference point is not a junk-removal website. It is the side of a well-kept 1960s moving truck:
hand-painted lettering, a flat two-colour character decal, hard edges, generous unused space, one
accent colour used sparingly, everything built to be legible from across a parking lot.

Governing rules:

- **Flat, no depth theatre.** No glassmorphism, no soft drop shadows, no gradients except a single
  optional paper grain. Elevation is communicated by a 2px ink border and a hard offset shadow
  (`4px 4px 0 var(--ink)`) — a printed/stamped feel, not a floating one.
- **Radius discipline.** `--r-sm: 2px`, `--r-md: 4px`. Nothing above 8px anywhere except the mascot's
  own artwork. This single rule is what stops it reading as an AI template.
- **Type does the heavy lifting.** Headlines are large, uppercase, tightly tracked, and allowed to
  break the grid. The mascot supplies warmth; the typography supplies authority.
- **Asymmetry.** Hero is a 7/5 split, not 6/6. Section headers sit left, not centred. Only the
  process steps are centred.
- **One accent per viewport.** Ochre appears at most once per screenful.

### On the UI/UX Pro Max output — overridden, with reasons

`--design-system` returned: pattern *Immersive/Interactive Experience*, style *Trust & Authority*,
colours *industrial grey + safety orange* `#64748B/#F97316`, type *Abril Fatface + Merriweather*.

Rejected, and why:
- *Immersive/Interactive* explicitly trades performance for engagement and gates the CTA behind a
  completed interaction. That is the opposite of a local-service lead page where the phone number
  must be reachable in under a second.
- *Trust & Authority* is credential-led — badges, certifications, case-study metrics. We are
  contractually forbidden from claiming licensed/insured/certified status until verified, so the
  style's core mechanic is unavailable to us.
- *Slate grey + safety orange* is the exact generic junk-removal palette the brief rules out.
- *Abril Fatface* is a high-contrast didone — fashion-magazine, not workwear. Wrong genre.

**Kept from the tool** (these are good and are folded into §2, §7, §8): the accessibility and touch
priority ordering, 44×44px targets, `prefers-reduced-motion`, "animate 1–2 elements per view max",
ease-out entering, no-emoji-as-icons, `cursor-pointer` on interactives, minimum-fields-wins on the
lead form, 150–300ms transitions, and the pre-delivery checklist.

---

## 2. Colour system — computed, not guessed

Every pair below was run through the WCAG 2.x relative-luminance formula. **Two of the brief's
proposed values do not survive as text colours** and are re-scoped.

### Tokens

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FBF8F0` | Lightest surface — cards on cream |
| `--cream` | `#F4EEDC` | Default page background |
| `--sage-bg` | `#DCE3D3` | Alternating band background |
| `--sage` | `#9EAF91` | **Fill / rule / illustration only.** Also muted text *on ink*. |
| `--forest` | `#214E3A` | Primary — buttons, dark bands, headings |
| `--forest-hover` | `#1A3F2F` | Primary hover |
| `--ink` | `#122A20` | Body text, borders, hard shadows |
| `--ochre` | `#C6923C` | **Graphic accent only** — rules, underlines, icon fills |
| `--ochre-text` | `#8A6220` | Accent *text* on cream |
| `--ochre-on-dark` | `#E0B25C` | Accent text/links on forest or ink |
| `--error` | `#A33B2A` | Form errors |
| `--border` | `#122A20` @ 14% | Hairline dividers |

### Verified ratios

| fg | bg | ratio | AA text | AA large/UI |
|---|---|---|---|---|
| ink | cream | **13.14** | ✅ | ✅ |
| forest | cream | **8.17** | ✅ | ✅ |
| ink | paper | **14.36** | ✅ | ✅ |
| cream | forest | **8.17** | ✅ | ✅ |
| cream | ink | **13.14** | ✅ | ✅ |
| forest | sage-bg | **7.21** | ✅ | ✅ |
| ink | sage-bg | **11.59** | ✅ | ✅ |
| sage | ink | **6.53** | ✅ | ✅ |
| ochre-text | cream | **4.71** | ✅ | ✅ |
| ochre-on-dark | forest | **4.83** | ✅ | ✅ |
| error | cream | **5.63** | ✅ | ✅ |
| ~~ochre~~ | cream | 2.39 | ❌ | ❌ |
| ~~sage~~ | cream | 2.01 | ❌ | ❌ |
| ~~ochre~~ | forest | 3.42 | ❌ | ✅ large only |

**Enforced rules:**
1. `--ochre` and `--sage` are **never** used for text on cream. Shapes, rules and fills only.
2. Accent text on cream uses `--ochre-text`; on dark, `--ochre-on-dark`.
3. Focus ring: `2px solid var(--ochre-text)` + `2px` offset on light, `--ochre-on-dark` on dark —
   both clear 3:1 against their surfaces.

Section rhythm: `cream → sage-bg → cream → forest (inverted) → cream → ink (footer)`.

---

## 3. Typography

Two directions. **A is recommended.**

### A — "Painted Truck" ✅
- **Display / H1–H3 / logotype: Archivo Expanded**, 700–800, uppercase, tracking `-0.01em`.
  Wide industrial grotesque. Reads as painted truck lettering. Variable font, one file.
- **Body / UI: Chivo**, 400/500/700. Humanist grotesque, same foundry lineage (Omnibus-Type), warm
  and highly legible at 16–18px.
- **Micro-labels / stamped copy: Archivo** 600 uppercase, `letter-spacing: 0.09em`, 12–13px.

Both **SIL Open Font License** → commercial web use, shirts, trucks and signage all cleared.
Not Inter/Roboto/Open Sans. Not a novelty face.

### B — "Hardware Store Slab"
- Logotype only: **Alfa Slab One**. H1–H3: **Bitter** 700–800. Body: **Chivo**.
- Warmer and more nostalgic; slightly less contemporary. Also OFL.

### Scale (fluid, `clamp()`)
| Step | Size | Line-height |
|---|---|---|
| Display | `clamp(2.75rem, 7vw, 5.5rem)` | 0.92 |
| H2 | `clamp(2rem, 4.5vw, 3.25rem)` | 1.0 |
| H3 | `clamp(1.25rem, 2vw, 1.625rem)` | 1.15 |
| Body-lg | `clamp(1.0625rem, 1.4vw, 1.1875rem)` | 1.65 |
| Body | `1rem` (never below 16px on mobile) | 1.65 |
| Label | `0.8125rem` uppercase | 1.2 |

Measure capped at `68ch`.

---

## 4. Spacing, borders, buttons, motion

**Spacing** — 4px base: `4 8 12 16 24 32 48 64 96 128`. Section padding
`clamp(64px, 9vw, 128px)` block. Page gutter `clamp(20px, 5vw, 80px)`, applied once on a wrapper
using `padding-inline` so it can never be zeroed by a shorthand.

**Borders** — `1px` hairline at 14% ink for dividers; `2px solid ink` for anything that behaves like
a printed object (cards, inputs, buttons). Never both.

**Buttons**
- *Primary*: forest fill, cream text, `2px` ink border, `4px 4px 0 ink` offset shadow, radius 4px.
  Hover: shadow → `2px 2px 0`, translate `2px, 2px`. Active: shadow `0 0`, translate `4px, 4px`.
  That is the "physical weight" the brief asks for — the button is pressed *into* the page.
- *Secondary (Call)*: transparent, `2px` ink border, ink text, same press mechanic.
- Min height **48px**, min width 44px, 24px horizontal padding.
- Transitions `160ms ease-out` on `transform` and `box-shadow` only.

**Illustration treatment** — flat vector, max 4 brand colours + one darker shade for shadow shape,
no gradients, no outlines thinner than 2px at 1× so the mascot survives at 32px favicon size.

**Motion language** — enter 240ms ease-out, exit 160ms ease-in, micro 160ms. Scroll reveals are
`opacity 0→1` + `translateY(16px→0)`, once, never on exit. Maximum **two** animated elements per
viewport. Everything collapses to opacity-only (or none) under `prefers-reduced-motion: reduce`.
No parallax on mobile.

---

## 5. Homepage section plan

Single page. Anchors are real `<a href="#id">`, crawlable.

| # | Section | Background | Content | Motion |
|---|---|---|---|---|
| 0 | **Intro overlay** *(optional, non-blocking)* | cream | Mascot pushes cart L→R, SVG. Page is already rendered and interactive underneath. ≤1.4s, `sessionStorage` so it plays once. Skipped entirely under reduced-motion. | Framer Motion |
| 1 | **Nav** | cream, sticky ≥1024px | Logo · Services · About · Contact · `[REQUEST AN ESTIMATE]` · phone. Mobile: full-screen panel, focus-trapped. | underline slide |
| 2 | **Hero** 7/5 asym | cream | H1 *"We haul the junk. You take back your space."* · sub · primary + Call · 4-item trust strip | headline word stagger; mascot idle sway |
| 3 | **Services** | sage-bg | **7 items as a bold typographic list**, not a card grid. Oversized `01–07`, name in Archivo Expanded, blurb, thin ochre rule. Hover reveals a small mascot/object illustration at the right edge. | icon lift 6px |
| 4 | **Process** | cream | 3 steps, oversized numerals, connecting dashed line. Mascot walks the line as it scrolls. | scroll-linked |
| 5 | **About** | forest (inverted) | *"No runaround. Just get the junk gone."* + 2 paragraphs. Mascot leaning on the logo. Zero factual claims. | fade |
| 6 | **Contact** | cream | *"Ready to clear it out?"* Form + Call/Text/Email block. | field focus |
| 7 | **Footer** | ink | Nav repeat, hours placeholder, Privacy, trademark-provisional note. Mascot drags one last box off the right edge. | idle |
| — | **Mobile sticky bar** | forest | `CALL` \| `GET ESTIMATE`, ≤680px, appears after hero. Never covers the form's submit. | slide-up once |

**Services presentation** is the section most at risk of looking generic. The typographic-list
treatment — not seven rounded cards — is the single biggest anti-template decision here.

### Copy safety (already applied above)
- CTA is **"REQUEST AN ESTIMATE"**, not "GET A FREE ESTIMATE" — "free" is unverified.
- Trust strip ships as `FAST PICKUP · UPFRONT ESTIMATES · LOCAL CREW · RESIDENTIAL + COMMERCIAL`
  **only if** confirmed. Until then: `TELL US WHAT YOU'VE GOT · WE DO THE LIFTING · CLEAR PRICING
  BEFORE WE START` — process descriptions, not claims.
- Construction/renovation debris is **excluded** from the launch service list pending confirmation.
- Standing disclaimer near the service list: *"Some materials may require special handling or may
  not be accepted. Contact us to confirm your items before pickup."*

---

## 6. Build plan

Phase 1 (this doc) → **approval gate** → Phase 2 (Higgsfield: mascot + logo) → **approval gate** →
Phase 3 (vectorise logo + mascot to SVG in-repo) → Phase 4 (site build) → Phase 5 (pre-launch audit).

Subagents only in Phase 4, and only for these genuinely independent tracks, all on Sonnet 5:
`(a)` config + SEO/metadata/schema/sitemap/robots, `(b)` contact form + validation + a11y,
`(c)` services + process sections. Nav, hero and the motion system stay on the lead session —
they share too much state to parallelise honestly.

---

## 7. Higgsfield asset list

Ordered. **Nothing runs without per-batch approval and a stated credit cost.**

| # | Asset | Model | Why that model | Gate |
|---|---|---|---|---|
| 1 | 3 mascot style probes | `gpt_image_2` @1k/medium | Cheapest way to pick a *drawing style* before committing. 1k is enough to judge style. | **FIRST** |
| 2 | Canonical character sheet | `gpt_image_2` @2k/high | Locks proportions/colour/face. MCP requires `get_workflow_instructions{character-sheet}` first — will follow it. | after #1 |
| 3 | Logo lockup exploration | `gpt_image_2` @2k/high | Best-in-class text rendering; lockups live or die on letterforms. | after #2 |
| 3b | Logo second opinion | `nano_banana_pro` @2k | Only if #3 is weak. Different text-rendering engine. | conditional |
| 4 | Pose set (5–6) | `gpt_image_2`, character sheet as reference | Consistency via reference image. | after lock |
| 5 | Cart/dumpster + junk silhouettes | `gpt_image_2` @2k | Needed as tracing reference for the coded loader. | after lock |
| — | ~~Loader video~~ | **none** | Motion Control + Seedance unavailable; coded SVG is lighter and better for CWV. **0 credits.** | n/a |
| — | ~~Hero cinematic~~ | **none** | Not proposed. Decorative movement CSS can do. | n/a |

Everything AI-generated is **reference art**. The shipped logo and mascot are hand-rebuilt as SVG
in-repo — scalable, editable, transparent, favicon-safe, print-safe.

### Mascot prompt guardrails (in every prompt)
Original character. Explicitly **not** referencing any existing animated franchise. Anthropomorphic
mouse **workman**, broad shoulders, muscular forearms, compact build, oversized canvas work gloves,
work boots, forest-green work pants, cream shirt, utility belt, optional green cap. Rounded snout,
small rounded ears, confident half-smile, **not** large glossy eyes, **not** a small round head with
oversized ears. Flat vector editorial illustration, 2–4 flat colours, heavy 3px outline, no
gradients. No cat. No chase. No franchise typography. Side or three-quarter view, plain background.

### First generations I recommend running
**Batch 1 only: three mascot style probes, `gpt_image_2`, 1k, quality `medium`, 3:2, one image each.**
Three distinct treatments — (i) vintage decal, thick outline, 3 flat colours; (ii) modern editorial
vector, subtle texture, no outline; (iii) mid-century workwear-patch, heavier shapes.

Three images is the minimum that answers the question "what does he look like." I will report the
exact displayed credit cost and wait for your go-ahead before submitting.

---

## 8. Open items requiring your confirmation

**Blocking the Higgsfield spend (Locks 1–3):**
1. **Colour system** — approve §2 as written, including ochre/sage demoted to graphic-only?
2. **Typography** — Direction A (Archivo Expanded + Chivo) or B (Alfa Slab One + Bitter + Chivo)?
3. **Mascot + logo direction** — approve the guardrails in §7, and approve Batch 1 (3 probes)?

**Blocking launch, not the build** — all ship as `null`/`false` placeholders:
phone · email · primary service area + areas served · public address & whether to show it · hours ·
social links · Google Business Profile · privacy contact · form destination (email? CRM? which
processor?) · photo upload yes/no · and every claim in the brief's disabled list — free estimates,
licensed, insured, same-day, residential/commercial, locally/family owned, eco/recycling/donation.

**Also needs a decision:**
- Production domain (needed for canonicals, sitemap, OG).
- **Trademark:** "Tom and Gerry's" is held provisional. Name lives in one config value; the logo is
  a separate SVG module. Both are replaceable without rebuilding. Not a legal opinion.
- 21st.dev Magic MCP is unauthenticated — re-key it, or I proceed with the 21st CLI skills only
  (which is fine; Magic is inspiration, not a dependency).

---

## Addendum — Mascot locked, 2026-09-12

**Character LOCKED at v3.** Master: `public/brand/mascot/mascot-master-reference.png`
(transparent, background removed by border flood fill so the sage inner ears survive —
a naive colour key would have punched holes, sage `#9CA284` being ~14 points from the
`#8FA185` background).

Took three rounds: v1 read as a bear with heroic proportions and lost the gloves; v2 fixed
species/build/gloves but the face was too sharp (inner brows angled down = anger signal); v3
flipped the brows level, opened and centred the eyes, shortened the snout to blunt, rounded
the jaw. Approved.

### Reversal: the mascot ships as RASTER, not hand-authored SVG

§7 originally said all AI art would be rebuilt as vector in-repo. **That held for the logo
and has been abandoned for the character.** Hand-vectorising a detailed illustrated character
measurably degraded it — the hand-authored SVG lost the face entirely. The approved artwork is
better than what hand-authoring produces, so it ships as optimised transparent AVIF/WebP with
PNG fallback.

Split that now applies:

| Asset | Format | Why |
|---|---|---|
| Character poses | AVIF/WebP/PNG, transparent | Detailed illustration; vectorising destroys it |
| Junk cart | SVG (`Cart.tsx`) | Simple geometric object; vector is correct and cheap |
| Logo wordmark | Live text, Archivo | True vector, selectable, accessible |
| Favicon / app icon | PNG from approved art | Hand-drawn simplification looked wrong |

Hero AVIF is 21KB. Every pose carries explicit width/height, so no CLS.

### Mascot palette — sampled from the locked sheet, not guessed

`--color-mascot-cream #EAD8B4` is deliberately **deeper** than `--color-cream #F4EEDC`:
a page-cream shirt on a cream ground dissolves. `--color-mascot-line #2B3A30` is the
reference's dark olive rather than `--color-ink`, which is what keeps him warm rather than harsh.
Fur `#787860`, sage inner ear `#9CA284`.

**Dark-ground rule still applies:** fur on forest is ~2:1. In the forest About band the mascot
sits inside a bordered panel rather than relying on its own outline.

### Pipeline hardening added along the way
- Ingest detects **painted checkerboards** — v1 returned a drawn checkerboard, not alpha, which
  would have shipped as visible squares.
- Ingest skips reference-only files (`character-sheet`, `probes`) so they never become assets.
- Crops are despeckled via connected-component filtering to drop fragments bled in from
  neighbouring figures on the sheet.

### Outstanding
Pose crops are ~520px wide (four figures on one 2048px sheet). Fine at current display sizes,
tight for 2× retina on the hero. If it matters, regenerate the hero pose **alone** at 2K on the
web route — 0 credits.
