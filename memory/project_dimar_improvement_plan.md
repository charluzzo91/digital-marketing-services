---
name: dimar-improvement-plan
description: Combined competitor research + site review findings and prioritized improvement plan for Dimar Demolition Services website
metadata: 
  node_type: memory
  type: project
  originSessionId: 03c3ecbf-073d-4c24-b4a6-f4d90fb7f712
---

Site review score: **7.2/10**. Strong copy, palette, and SEO foundation. Main gaps: no real photography, no social proof, dead-end service cards, no lead form.

**Why:** Based on parallel agent analysis — one reviewed competitor demolition sites (training knowledge), one reviewed the Dimar codebase directly.

**How to apply:** Use this as the implementation checklist when returning to Dimar website work. Address Critical items before deploying to DigitalOcean.

## What's Working (Keep These)
- "TEAR. HAUL. DONE." — distinctive, rare in the industry
- Color palette: `#C8102E` red, `#1F4FAA` blue, `#f6f4ec` off-white — avoids orange/black cliché
- Contact section — better than most competitors
- SEO/JSON-LD structured data (`LocalBusiness` schema in dist/index.html) — most small demo contractors skip this
- `prefers-reduced-motion` support in animations

## Critical Fixes (Before Launch)
1. **Real photography** — Hero, Services sections. Entire industry fails here; biggest trust gap.
2. **Testimonials section** — No social proof anywhere. Critical for homeowners ($15K+ decisions).
3. **Service card CTAs** — `Services.jsx`: cards are visual dead ends, clicking does nothing.
4. **Move Process above Contact** — `App.jsx:16-17`: one-line swap, better funnel logic.
5. **Lead capture form** — `Contact.jsx`: mailto fails on mobile; need a real form (Formspree/Netlify).

## Quick Wins (30 min or less)
6. Dynamic "X Years in NYC" — `Stats.jsx:4`: change `'6'` to `` `${new Date().getFullYear() - 2020}` ``
7. Add "DEMOLITION" to header logo text — `Header.jsx:21`
8. License number in footer credentials — `Footer.jsx:63`
9. Better mailto pre-fill (body with Name/Address/Description fields) — `constants.js`
10. "Get a Free Quote" CTA in nav — `Header.jsx`

## Missing Sections to Add
- Portfolio / project gallery (critical)
- Testimonials / Google reviews
- FAQ (long-tail SEO + reduces phone tag)
- Service area visual (NYC borough map)
- About/human story (footer says "family-run" but no face/name)
- Hazardous materials / asbestos info (NYC pre-1980 buildings)

## Industry Differentiators (Almost No Competitor Does These)
- Before/after image sliders for selective demo & pool removal
- Safety record / EMR score displayed on page
- Environmental/recycling diversion rate (LEED clients)
- Transparent pricing framework ("demo typically runs $4–$12/sq ft")
- Individual service landing pages for local SEO ("pool removal NYC", "interior demo Brooklyn")

## Deployment Status
- Code is committed and pushed to GitHub: `github.com/charluzzo91/dimar-demolition-services`
- DigitalOcean: NOT yet deployed (apps list was empty as of last check)
- `dist/` production build exists and is current

## Key Files
- `src/App.jsx` — section ordering issue (Contact before Process)
- `src/components/Stats.jsx` — hardcoded "6 Years"
- `src/components/Services.jsx` — dead-end service cards
- `src/components/Contact.jsx` — best section, extend it
- `src/components/Footer.jsx` — credentials need license number
- `src/constants.js` — source of truth for all business data
- `dist/index.html` — SEO head is solid
