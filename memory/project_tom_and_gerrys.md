---
name: project-tom-and-gerrys
description: Tom and Gerry's Junk Removal — brand + site build, provisional name, claim-gating rules, localhost-only
metadata:
  type: project
---

Client site at `clients/tom-and-gerrys-junk-removal/` (Next.js 16 + React 19 + Tailwind 4 +
Framer Motion). Departs from the repo's React+Vite precedent (Dimar) deliberately, for SEO.
Dev server: `npm run dev` → **http://localhost:3100**.

Design direction and full spec: `brand/DESIGN-DIRECTION.md`. Approved 2026-09-10:
palette (cream/forest/ink, with ochre + sage demoted to **graphic-only** because they fail WCAG
as text on cream — 2.39:1 and 2.01:1), and typography Direction A (Archivo Expanded + Chivo).

**Hard constraints carried by this project:**
- Owner directive: **localhost only.** No hosting/deploy moves without explicit say-so.
- Business name is **provisional pending trademark clearance**; lives only in
  `src/config/business.ts` so it can be swapped. Mascot must never evoke the Tom & Jerry franchise.
- Every marketing claim is gated behind a `*_CONFIRMED: false` flag in `src/config/business.ts`.
  The UI branches on the flag; it must never hardcode a claim. Unverified = not displayed.
- `robots`/`noindex` are driven by `BUSINESS.PRODUCTION_DOMAIN` being null — setting the domain
  flips the site indexable, so there is no staging noindex that can ship to production.
- Contact form deliberately **refuses to fake success** while `FORM_ENDPOINT` is null.
- Construction/renovation debris is excluded from the service list pending confirmation.

See [[higgsfield-mcp-entitlements]] for the generation-cost rules before spending credits.
