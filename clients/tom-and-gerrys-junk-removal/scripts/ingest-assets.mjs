#!/usr/bin/env node
/**
 * ASSET INGESTION — assets/higgsfield-inbox/  ->  public/brand/<category>/
 *
 *   npm run assets:ingest            inspect + process everything new
 *   npm run assets:inspect           inspect only, write nothing
 *   npm run assets:ingest -- --force reprocess even if outputs exist
 *
 * Principles:
 *  - Originals in the inbox are NEVER modified, moved or deleted.
 *  - Quality is preserved. We do not crush images to chase bytes.
 *  - Transparency is preserved when present (PNG/WebP/AVIF all carry alpha).
 *  - Every run appends to public/brand/manifest.json for provenance.
 */

import { readdir, stat, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, "..");
const INBOX = path.join(ROOT, "assets", "higgsfield-inbox");
const OUT = path.join(ROOT, "public", "brand");
const MANIFEST = path.join(OUT, "manifest.json");

const INSPECT_ONLY = process.argv.includes("--inspect");
const FORCE = process.argv.includes("--force");

const IMG = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".tif", ".tiff"]);
const VID = new Set([".mp4", ".webm", ".mov", ".m4v"]);

/** Responsive widths. We never upscale past the source width. */
const WIDTHS = [400, 800, 1200, 1600];

/** Category is inferred from the filename prefix; unknown falls back to mascot. */
const CATEGORIES = ["logo", "mascot", "motion", "backgrounds", "icons"];
function categorize(name) {
  const n = name.toLowerCase();
  if (n.startsWith("logo")) return "logo";
  if (n.startsWith("icon") || n.includes("favicon") || n.includes("avatar")) return "icons";
  if (n.startsWith("bg") || n.includes("background")) return "backgrounds";
  if (n.startsWith("motion") || VID.has(path.extname(n))) return "motion";
  return "mascot";
}

const kb = (b) => `${(b / 1024).toFixed(1)} KB`;
const ratio = (w, h) => {
  const g = (a, b) => (b ? g(b, a % b) : a);
  const d = g(w, h);
  return `${w / d}:${h / d}`;
};

function slug(file) {
  return path.basename(file, path.extname(file)).toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function inspectImage(file) {
  const buf = await readFile(file);
  const m = await sharp(buf).metadata();
  const s = await stat(file);
  return {
    kind: "image",
    format: m.format,
    width: m.width,
    height: m.height,
    aspect: m.width && m.height ? ratio(m.width, m.height) : "?",
    alpha: Boolean(m.hasAlpha),
    bytes: s.size,
  };
}

async function ingestImage(file, info) {
  const cat = categorize(path.basename(file));
  const dir = path.join(OUT, cat);
  await mkdir(dir, { recursive: true });
  const base = slug(file);
  const written = [];
  const src = sharp(await readFile(file), { failOn: "none" });

  // Full-size modern formats. High quality on purpose.
  const targets = [
    { ext: "webp", fn: (p) => p.webp({ quality: 90, effort: 5 }) },
    { ext: "avif", fn: (p) => p.avif({ quality: 62, effort: 5 }) },
  ];
  for (const t of targets) {
    const out = path.join(dir, `${base}.${t.ext}`);
    if (!FORCE && existsSync(out)) { written.push({ file: out, skipped: true }); continue; }
    await t.fn(src.clone()).toFile(out);
    written.push({ file: out, bytes: (await stat(out)).size });
  }

  // Responsive widths, never upscaling.
  for (const w of WIDTHS.filter((w) => w < info.width)) {
    for (const t of targets) {
      const out = path.join(dir, `${base}-${w}w.${t.ext}`);
      if (!FORCE && existsSync(out)) { written.push({ file: out, skipped: true }); continue; }
      await t.fn(src.clone().resize({ width: w, withoutEnlargement: true })).toFile(out);
      written.push({ file: out, bytes: (await stat(out)).size });
    }
  }

  // Lossless PNG copy preserves transparency for print/vector-tracing work.
  if (info.alpha) {
    const out = path.join(dir, `${base}.png`);
    if (FORCE || !existsSync(out)) {
      await src.clone().png({ compressionLevel: 9 }).toFile(out);
      written.push({ file: out, bytes: (await stat(out)).size });
    }
  }
  return { category: cat, written };
}

/**
 * Generative models often DRAW a transparency checkerboard instead of producing alpha.
 * The file then looks transparent in a viewer and ships as visible grey squares.
 * Heuristic: sample a corner patch; if it has no alpha but is dominated by exactly two
 * near-white greys in similar proportion, it is almost certainly painted.
 */
async function looksLikePaintedCheckerboard(file) {
  try {
    const { data, info } = await sharp(file)
      .extract({ left: 8, top: 8, width: 160, height: 100 }).raw()
      .toBuffer({ resolveWithObject: true });
    const buckets = new Map();
    let n = 0;
    for (let i = 0; i < data.length; i += info.channels) {
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      if (r < 200 || g < 200 || b < 200) return false;      // real artwork in the corner
      if (Math.abs(r - g) > 6 || Math.abs(g - b) > 6) return false; // not grey
      const k = Math.round(r / 6) * 6;
      buckets.set(k, (buckets.get(k) || 0) + 1);
      n++;
    }
    const top = [...buckets.values()].sort((a, b) => b - a).slice(0, 2);
    if (top.length < 2) return false;
    const [a, b] = top;
    return (a + b) / n > 0.6 && b / a > 0.3;   // two tones, both well represented
  } catch { return false; }
}

async function ffmpegAvailable() {
  try { await run("ffmpeg", ["-version"]); return true; } catch { return false; }
}

async function ingestVideo(file) {
  const dir = path.join(OUT, "motion");
  await mkdir(dir, { recursive: true });
  const base = slug(file);
  if (!(await ffmpegAvailable())) {
    return { category: "motion", skipped: "ffmpeg not installed — install it, then re-run", written: [] };
  }
  const written = [];
  const mp4 = path.join(dir, `${base}.mp4`);
  const webm = path.join(dir, `${base}.webm`);
  const poster = path.join(dir, `${base}-poster.webp`);

  if (FORCE || !existsSync(mp4)) {
    await run("ffmpeg", ["-y", "-i", file, "-vcodec", "libx264", "-crf", "24",
      "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", mp4]);
    written.push({ file: mp4, bytes: (await stat(mp4)).size });
  }
  if (FORCE || !existsSync(webm)) {
    await run("ffmpeg", ["-y", "-i", file, "-c:v", "libvpx-vp9", "-crf", "34",
      "-b:v", "0", "-an", webm]);
    written.push({ file: webm, bytes: (await stat(webm)).size });
  }
  if (FORCE || !existsSync(poster)) {
    await run("ffmpeg", ["-y", "-i", file, "-vf", "select=eq(n\\,0)", "-vframes", "1", poster]);
    written.push({ file: poster, bytes: (await stat(poster)).size });
  }
  return { category: "motion", written };
}

async function main() {
  if (!existsSync(INBOX)) {
    console.error(`Inbox missing: ${path.relative(ROOT, INBOX)}`);
    process.exit(1);
  }
  // Reference-only material (character sheets, style probes) is archived in the
  // inbox for provenance but must never become a production asset.
  const REFERENCE_ONLY = /character-sheet|probes|reference|^ref[_-]/i;
  const all = (await readdir(INBOX)).filter((f) => !f.startsWith(".") && f !== "README.md");
  const skipped = all.filter((f) => REFERENCE_ONLY.test(f));
  const entries = all.filter((f) => !REFERENCE_ONLY.test(f));
  if (skipped.length) console.log(`\nSkipping ${skipped.length} reference-only file(s): ${skipped.join(", ")}`);
  if (!entries.length) {
    console.log("Inbox is empty.\n");
    console.log("Drop Higgsfield downloads into assets/higgsfield-inbox/, then re-run.");
    console.log("Filename prefix picks the destination: logo-, icon-, bg-, motion-; anything else -> mascot/");
    return;
  }

  console.log(`\nFound ${entries.length} file(s) in the inbox.\n`);
  const manifest = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, "utf8")) : { assets: [] };

  for (const name of entries) {
    const file = path.join(INBOX, name);
    if ((await stat(file)).isDirectory()) continue;
    const ext = path.extname(name).toLowerCase();

    if (IMG.has(ext)) {
      const info = await inspectImage(file);
      console.log(`  ${name}`);
      console.log(`     ${info.format}  ${info.width}x${info.height}  ${info.aspect}  ` +
                  `${info.alpha ? "transparent" : "opaque"}  ${kb(info.bytes)}`);

      // Quality gates worth flagging rather than silently accepting.
      if (info.width < 1000) console.log(`     ⚠  under 1000px wide — likely too small for hero use`);
      if (!info.alpha && categorize(name) === "mascot")
        console.log(`     ⚠  no alpha channel — mascot art should be transparent; re-export or run background removal`);
      if (!info.alpha && (await looksLikePaintedCheckerboard(file)))
        console.log(`     ⚠  background looks like a PAINTED checkerboard, not real transparency — ` +
                    `it will ship as visible squares. Regenerate on a plain solid background.`);

      if (INSPECT_ONLY) { console.log(); continue; }
      const res = await ingestImage(file, info);
      const made = res.written.filter((w) => !w.skipped);
      console.log(`     -> public/brand/${res.category}/  (${made.length} written, ` +
                  `${res.written.length - made.length} already present)`);
      manifest.assets = manifest.assets.filter((a) => a.source !== name);
      manifest.assets.push({
        source: name, ingested: new Date().toISOString(), category: res.category,
        ...info, outputs: res.written.map((w) => path.relative(ROOT, w.file)),
      });
      console.log();
    } else if (VID.has(ext)) {
      const s = await stat(file);
      console.log(`  ${name}\n     video  ${kb(s.size)}`);
      if (INSPECT_ONLY) { console.log(); continue; }
      const res = await ingestVideo(file);
      if (res.skipped) console.log(`     ⚠  ${res.skipped}`);
      else console.log(`     -> public/brand/motion/  (${res.written.length} written)`);
      console.log();
    } else {
      console.log(`  ${name}\n     (unrecognised type — left untouched)\n`);
    }
  }

  if (!INSPECT_ONLY) {
    await mkdir(OUT, { recursive: true });
    await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
    console.log(`Manifest: public/brand/manifest.json`);
  }
  console.log("Originals in the inbox were not modified.\n");
}

main().catch((e) => { console.error(e); process.exit(1); });
