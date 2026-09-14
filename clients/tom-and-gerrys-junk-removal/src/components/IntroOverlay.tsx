"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mascot } from "./Mascot";
import { Cart } from "./Cart";
import { INTRO } from "@/config/motion";

/**
 * NON-BLOCKING branded intro.
 *
 * Contract that must not regress:
 *  - Page is rendered and interactive underneath from first paint.
 *  - Backdrop is pointer-events-none, so clicks pass through. Only Skip is clickable.
 *  - Escape, or Skip, dismisses immediately.
 *  - Skipped entirely under prefers-reduced-motion.
 *  - Falls back to coded motion when no video asset exists, so content never
 *    depends on media loading.
 *  - Video is decorative: muted, playsInline, no audio track.
 *
 * REVIEWING IT: append ?intro=1 to force a replay, ?intro=0 to suppress.
 * Plain refresh will NOT replay — it is the same session by design.
 */
export function IntroOverlay() {
  const reduce = useReducedMotion();
  const [play, setPlay] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce) return;

    const q = new URLSearchParams(window.location.search).get("intro");
    if (q === "0") return;

    const forced = q === "1" || INTRO.REPLAY === "always";
    if (!forced) {
      let seen = true;
      try { seen = sessionStorage.getItem("tg-intro") === "1"; } catch { seen = true; }
      if (seen) return;
    }
    try { sessionStorage.setItem("tg-intro", "1"); } catch { /* private mode */ }

    setPlay(true);
    timer.current = setTimeout(() => setPlay(false), INTRO.TRAVERSE_SECONDS * 1000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [reduce]);

  // Escape dismisses.
  useEffect(() => {
    if (!play) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPlay(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [play]);

  const useVideo = Boolean(INTRO.VIDEO_SRC) && !videoFailed;

  return (
    <AnimatePresence>
      {play && (
        <motion.div
          key="intro"
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeIn" }}
        >
          {/* ground line he walks along */}
          <div aria-hidden className="absolute inset-x-0 bottom-[19%] h-[3px] bg-ink/12" />

          <motion.div
            className="absolute bottom-[18%] w-[min(46vw,340px)]"
            initial={{ x: "-55vw" }}
            animate={{ x: "112vw" }}
            transition={{ duration: INTRO.TRAVERSE_SECONDS, ease: "linear" }}
            aria-hidden="true"
          >
            {useVideo ? (
              <video
                autoPlay muted loop playsInline
                width={INTRO.VIDEO_W} height={INTRO.VIDEO_H}
                poster={`${INTRO.VIDEO_SRC}-poster.webp`}
                onError={() => setVideoFailed(true)}
                className="h-auto w-full"
              >
                <source src={`${INTRO.VIDEO_SRC}.webm`} type="video/webm" />
                <source src={`${INTRO.VIDEO_SRC}.mp4`} type="video/mp4" />
              </video>
            ) : (
              <CodedWalk />
            )}
          </motion.div>

          {/* The only interactive element in the overlay. */}
          <button
            type="button"
            onClick={() => setPlay(false)}
            className="u-label pointer-events-auto absolute bottom-6 right-6 rounded-sm border-2 border-ink bg-cream px-4 py-2.5 text-ink transition-colors hover:bg-sage-bg"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Coded fallback. A still image can't articulate legs, so effort is conveyed by
 * a walk bob, a forward lean, and a cart wobble deliberately out of phase with
 * the bob — which is what reads as "heavy load" rather than "floating".
 */
function CodedWalk() {
  const STEP = 0.52; // seconds per step
  return (
    <div className="relative flex items-end justify-center">
      <motion.div
        className="relative z-10 -mr-[6%] w-[44%] origin-bottom"
        animate={{ y: [0, -5, 0, -5, 0], rotate: [4.5, 3.2, 4.5, 3.2, 4.5] }}
        transition={{ duration: STEP * 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mascot pose="side" alt="" sizes="180px" className="h-auto w-full" />
      </motion.div>
      <motion.div
        className="w-[58%] origin-bottom"
        animate={{ y: [0, -3, 0, -3, 0], rotate: [0, -0.8, 0, 0.8, 0] }}
        transition={{ duration: STEP * 4, repeat: Infinity, ease: "easeInOut", delay: STEP * 0.5 }}
      >
        <Cart className="h-auto w-full" />
      </motion.div>
    </div>
  );
}
