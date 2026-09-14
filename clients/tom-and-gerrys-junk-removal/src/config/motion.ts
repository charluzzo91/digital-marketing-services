/**
 * Intro animation configuration.
 *
 * VIDEO_SRC stays null until the Higgsfield walk-cycle asset is ingested into
 * public/brand/motion/. While null the intro uses the coded fallback, so the
 * site never depends on the media existing.
 */
export const INTRO = {
  /** Set to "/brand/motion/mascot-cart-walk" (no extension) once the loop lands. */
  VIDEO_SRC: null as string | null,

  /** Seconds for the mascot to cross the viewport. Keep this honest — it is time
   *  a lead-gen visitor spends not reading the phone number. */
  TRAVERSE_SECONDS: 4.6,

  /** Intrinsic size of the video loop, used to reserve space and avoid CLS. */
  VIDEO_W: 768,
  VIDEO_H: 768,

  /** "once-per-session" | "always" — "always" is useful while reviewing. */
  REPLAY: "once-per-session" as "once-per-session" | "always",
} as const;
