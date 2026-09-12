# Higgsfield Generation Log

Every generation gets a row — CLI or web. This is the provenance record for asset licensing
and for tracking credit burn.

| Date | Asset | Model | Route | Settings | Credits | Approved by | Output file | Kept? |
|---|---|---|---|---|---|---|---|---|
| _(none yet)_ | | | | | | | | |

**Route** = `web` (higgsfield.ai, unlimited entitlements may apply) or `cli`/`mcp` (bills credits).

## Rules
1. Nothing is generated without the owner's explicit approval for that specific batch.
2. Report the credit cost **before** spending — `higgsfield generate cost …`.
3. Never assume "Plus" grants unlimited. Unlimited entitlements are **web-only**; CLI and MCP
   generations bill credits regardless.
4. AI output is **reference art**. Shipped logo and mascot are rebuilt as vector in-repo.
5. Never use copyrighted artwork or competitor imagery as a reference image.

| 2026-09-10 | Mascot style probes A/B/C | GPT Image 2 | web | 2048x1360, opaque | web entitlement (0 credits) | Owner | `assets/higgsfield-inbox/2026-09-10_mascot-probes-ABC_gpt-image-2_v1.png` | **A selected** |
| 2026-09-10 | Character sheet v1 | GPT Image 2 | web | 2048x1360, 4 views | web entitlement (0 credits) | Owner | `assets/higgsfield-inbox/2026-09-10_mascot-character-sheet_gpt-image-2_v1.png` | **Revise** — reads bear not mouse; proportions heroic; gloves lost; painted checkerboard bg |
| 2026-09-10 | Character sheet v2 | GPT Image 2 | web | 2048x1360, solid bg #8FA185 | web entitlement (0 credits) | Owner | `assets/higgsfield-inbox/2026-09-10_mascot-character-sheet_gpt-image-2_v2.png` | **Body APPROVED** — build, gloves, wardrobe, line all good. Face too sharp → rev3 (face only) |
| 2026-09-12 | Character sheet v3 | GPT Image 2 | web | 2048x1360, solid bg | web entitlement (0 credits) | Owner | `assets/higgsfield-inbox/2026-09-10_mascot-character-sheet_gpt-image-2_v3-FINAL.png` | ✅ **LOCKED** — master reference |
