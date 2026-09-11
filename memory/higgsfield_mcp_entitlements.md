---
name: higgsfield-mcp-entitlements
description: Higgsfield unlimited generations are web-only and do not apply through the MCP connector; connector catalog is a subset of the website's models
metadata:
  type: reference
---

Higgsfield is connected to Claude Code as an **MCP connector** (`claude_ai_Higgsfield`), not the CLI.
Do not run `npm i -g @higgsfield/cli` — it is unnecessary.

Verified 2026-09-10 on the account (`current_plan: "plus"`):

1. **Unlimited/free-gen entitlements are WEB-ONLY.** `show_plans_and_credits` returns feature
   tooltips reading "Available on web" / "Available for 1 year after purchase on web". Through
   the MCP connector, `unlim.available` is `false` and `unlim_trial_in_mcp_active` is `false` —
   every generation bills credits regardless of what the website offers.
2. **The "365 UNLIMITED" badges belong to the ULTRA plan card**, which the tool returns as an
   upsell. They are not Plus entitlements. Do not read that block as the current plan's features.
3. **The connector's model catalog is a subset of the website's.** `models_explore` exposes
   `gpt_image_2`, `nano_banana_pro`, `kling3_0_turbo`, `wan2_7`, soul/cinema/marketing models.
   It does NOT expose Seedream 5, Seedance 2.5, or Kling 3.0 Motion Control — but those may
   still be available to the user in the browser.
4. **`models_explore` pagination is broken**: `next_page_token: "20"` returns page 1 again in a
   loop. Use `action: "search"` / `"recommend"` to probe for a model, not `list` pagination.

**Practical rule:** for models missing from the connector, or to use unlimited entitlements,
generate on higgsfield.ai in the browser and hand the images over. Only use the connector when
credit spend is intended and approved.

## Standing directive: HYBRID WORKFLOW (owner-set, 2026-09-10)

- **WEB route is the default** for anything covered by a web entitlement, or when preserving
  credits matters. Claude writes the prompt to `creative/higgsfield-prompts/`, names the exact
  model/settings/aspect/references, and the owner generates manually on higgsfield.ai and drops
  the download into `assets/higgsfield-inbox/`.
- **CLI/MCP route only** with explicit per-batch approval after showing model, purpose and
  credit cost (`higgsfield generate cost …`).
- **Never automate the Higgsfield website or drive a browser** to reach web-only entitlements.
- Not being able to use web-only unlimited from Claude Code is expected, not a bug.
- CLI installed: `higgsfield` v1.1.24. Needs `higgsfield auth login` (interactive OAuth PKCE)
  **and** `hf workspace set <workspace_id>` — `model list` fails with "No workspace selected"
  until both are done.
- Ingestion: `npm run assets:ingest` (or `assets:inspect`) in the client project.
