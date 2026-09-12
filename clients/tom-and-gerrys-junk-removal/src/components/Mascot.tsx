/**
 * MASCOT — serves the APPROVED v3 character art.
 * Master: public/brand/mascot/mascot-master-reference.png
 *
 * Why raster and not hand-authored SVG: this is a detailed illustrated character.
 * Hand-vectorising it measurably degraded the artwork, so we ship the approved art
 * as optimised transparent AVIF/WebP with a PNG fallback. The LOGO is still true
 * vector — see Logo.tsx, where the wordmark is live text.
 *
 * Every pose carries explicit width/height so it reserves layout space and
 * contributes no CLS. Decorative uses pass alt="".
 *
 * DARK-GROUND NOTE: fur (#787860) on forest (#214E3A) is ~2:1. On the forest
 * About band the mascot sits inside a bordered panel for separation rather than
 * relying on its own outline.
 */

type Pose = "front" | "arms-crossed" | "head" | "side";

/** Intrinsic pixel dimensions of each exported pose. */
const DIMS: Record<Pose, { w: number; h: number }> = {
  front: { w: 550, h: 913 },
  "arms-crossed": { w: 520, h: 931 },
  head: { w: 574, h: 744 },
  side: { w: 393, h: 918 },
};

/** Which poses have a 400w derivative (the ingest step skips upscaling). */
const HAS_400: Record<Pose, boolean> = {
  front: true, "arms-crossed": true, head: true, side: false,
};

interface MascotProps {
  pose?: Pose;
  className?: string;
  /** Meaningful description, or "" when purely decorative. */
  alt?: string;
  priority?: boolean;
  sizes?: string;
}

export function Mascot({
  pose = "arms-crossed",
  className,
  alt = "",
  priority = false,
  sizes = "(max-width: 1024px) 60vw, 380px",
}: MascotProps) {
  const { w, h } = DIMS[pose];
  const base = `/brand/mascot/mascot-${pose}`;
  const srcSet = (ext: string) =>
    HAS_400[pose] ? `${base}-400w.${ext} 400w, ${base}.${ext} ${w}w` : `${base}.${ext} ${w}w`;

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`${base}.png`}
        width={w}
        height={h}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        // fetchPriority is a real React 19 prop; helps the hero mascot specifically.
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

/** Convenience wrappers so call sites read clearly. */
export const MascotStanding = (p: Omit<MascotProps, "pose">) => <Mascot pose="arms-crossed" {...p} />;
export const MascotHead = (p: Omit<MascotProps, "pose">) => <Mascot pose="head" {...p} />;
export const MascotFront = (p: Omit<MascotProps, "pose">) => <Mascot pose="front" {...p} />;
export const MascotSide = (p: Omit<MascotProps, "pose">) => <Mascot pose="side" {...p} />;
