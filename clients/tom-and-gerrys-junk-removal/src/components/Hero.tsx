"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MascotStanding } from "./Mascot";
import { BUSINESS, ESTIMATE_CTA, TRUST_STRIP, telHref } from "@/config/business";

const HEADLINE = ["We haul", "the junk.", "You take back", "your space."];

export function Hero() {
  const reduce = useReducedMotion();
  const tel = telHref();

  const word = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: reduce ? 0 : i * 0.07, duration: 0.44, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section className="u-grain relative overflow-hidden border-b-2 border-ink">
      <div className="u-wrap grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
        {/* LEFT — 7 of 12. Asymmetric on purpose. */}
        <div className="lg:col-span-7">
          <p className="u-label mb-5 flex items-center gap-2.5 text-ochre-text">
            <span aria-hidden className="inline-block h-[2px] w-8 bg-ochre" />
            Local junk removal
          </p>

          <h1 className="u-display text-[clamp(2.75rem,7vw,5.5rem)]">
            {HEADLINE.map((line, i) => (
              <motion.span key={line} custom={i} variants={word} initial="hidden" animate="show"
                           className="block">
                {line}
              </motion.span>
            ))}
          </h1>

          <p className="u-measure mt-6 text-[clamp(1.0625rem,1.4vw,1.1875rem)] text-ink/80">
            Straightforward junk removal without the hassle. Furniture, cleanouts, appliances
            and general clutter — hauled away by a crew that does the heavy lifting for you.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn btn--primary">{ESTIMATE_CTA}</a>
            {tel ? (
              <a href={tel} className="btn btn--secondary">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>
                Call now
              </a>
            ) : (
              <span className="u-label self-start rounded-sm border-2 border-dashed border-ink/30 px-4 py-3.5 text-ink/50">
                Phone number pending
              </span>
            )}
          </div>

          {/* Trust strip — process descriptions only, no unverified claims. */}
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--border-hair)] pt-6">
            {TRUST_STRIP.map((t) => (
              <li key={t} className="u-label flex items-center gap-2 text-ink/70">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-ochre-text)"
                     strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — 5 of 12. Mascot with a slow idle sway. */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-[340px] lg:max-w-none"
          >
            <div aria-hidden className="absolute inset-x-4 bottom-6 top-10 -rotate-2 rounded-sm bg-sage-bg" />
            <motion.div
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <MascotStanding className="mx-auto h-auto w-full max-w-[380px]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
