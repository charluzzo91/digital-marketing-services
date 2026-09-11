"use client";

import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  { n: "1", title: "Send us what you've got",
    body: "Describe the items or send a few photos. The more we can see, the tighter the estimate." },
  { n: "2", title: "Get your estimate",
    body: "We come back with what it takes to clear it out, and what it will cost, before any work starts." },
  { n: "3", title: "We haul it away",
    body: "We do the lifting, loading and sweep-up. You get your space back." },
];

export function Process() {
  const reduce = useReducedMotion();
  return (
    <section id="process" className="u-section scroll-mt-20 border-b-2 border-ink">
      <div className="u-wrap">
        <div className="mx-auto max-w-2xl text-center">
          <p className="u-label mb-4 text-ochre-text">How it works</p>
          <h2 className="u-h2 text-[clamp(2rem,4.5vw,3.25rem)]">Three steps. That's it.</h2>
        </div>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {/* Dashed connector, desktop only */}
          <span aria-hidden
                className="absolute left-0 right-0 top-[38px] hidden border-t-2 border-dashed border-ink/25 md:block" />
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center md:px-4"
            >
              <span className="u-display relative z-10 mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-sm border-2 border-ink bg-cream text-3xl shadow-[4px_4px_0_var(--color-ink)]">
                {s.n}
              </span>
              <h3 className="u-h3 mt-6 text-xl">{s.title}</h3>
              <p className="mx-auto mt-2.5 max-w-xs text-[0.98rem] text-ink/72">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
