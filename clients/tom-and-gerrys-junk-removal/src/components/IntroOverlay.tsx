"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MascotWithCart } from "./Mascot";

/**
 * NON-BLOCKING branded intro.
 *
 * Contract:
 *  - The page is fully rendered and interactive underneath from the first paint.
 *  - `pointer-events-none` means clicks/taps pass straight through, so a visitor
 *    who wants the phone number immediately is never held up.
 *  - Plays once per browser session (sessionStorage).
 *  - Skipped entirely under prefers-reduced-motion.
 *  - Pure SVG + transform animation. No video, no network request, no layout shift.
 */
export function IntroOverlay() {
  const reduce = useReducedMotion();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let seen = true;
    try { seen = sessionStorage.getItem("tg-intro") === "1"; } catch { seen = true; }
    if (seen) return;
    try { sessionStorage.setItem("tg-intro", "1"); } catch { /* private mode: just skip */ }
    setPlay(true);
    const t = setTimeout(() => setPlay(false), 1500);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {play && (
        <motion.div
          key="intro"
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: "easeIn" }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute bottom-[18%] w-[min(70vw,520px)]"
            initial={{ x: "-70vw" }}
            animate={{ x: "115vw" }}
            transition={{ duration: 1.5, ease: [0.35, 0, 0.3, 1] }}
          >
            <MascotWithCart className="h-auto w-full" />
          </motion.div>
          {/* ground line */}
          <div className="absolute bottom-[17%] left-0 right-0 h-[3px] bg-ink/15" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
