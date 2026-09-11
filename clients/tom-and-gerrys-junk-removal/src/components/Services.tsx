"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SERVICES, ITEM_DISCLAIMER, type Service } from "@/config/business";

/** Small flat pictograms — SVG, never emoji. */
function Glyph({ id }: { id: Service["id"] }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7,
              strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "household":
      return <svg viewBox="0 0 32 32" {...p}><path d="M4 12 16 4l12 8v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M12 28v-9h8v9"/></svg>;
    case "furniture":
      return <svg viewBox="0 0 32 32" {...p}><path d="M4 18v-5a3 3 0 0 1 6 0v3h12v-3a3 3 0 0 1 6 0v5"/><path d="M3 18h26v7H3Z"/><path d="M6 25v3M26 25v3"/></svg>;
    case "appliance":
      return <svg viewBox="0 0 32 32" {...p}><rect x="7" y="3" width="18" height="26" rx="2"/><path d="M7 12h18"/><circle cx="16" cy="20" r="4.5"/></svg>;
    case "garage-basement":
      return <svg viewBox="0 0 32 32" {...p}><path d="M3 13 16 5l13 8v16H3Z"/><path d="M8 29v-9h16v9"/><path d="M8 24h16"/></svg>;
    case "moveout-estate":
      return <svg viewBox="0 0 32 32" {...p}><rect x="5" y="9" width="22" height="16" rx="1.5"/><path d="M16 9v16M5 15h22"/><path d="M12 5h8"/></svg>;
    case "yard":
      return <svg viewBox="0 0 32 32" {...p}><path d="M16 28V13"/><path d="M16 17c-5 0-8-3-8-8 5 0 8 3 8 8Z"/><path d="M16 21c5 0 8-3 8-8-5 0-8 3-8 8Z"/><path d="M9 28h14"/></svg>;
  }
}

function Row({ service, i }: { service: Service; i: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.42, delay: reduce ? 0 : Math.min(i * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className="group border-b border-ink/15"
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-7 md:gap-x-9 md:py-9">
        {/* Oversized service numeral */}
        <span aria-hidden
              className="u-display select-none text-[clamp(1.6rem,4.5vw,2.9rem)] text-ink/22 transition-colors duration-200 group-hover:text-ochre">
          {service.index}
        </span>

        <div>
          <h3 className="u-h3 text-[clamp(1.25rem,2.6vw,1.9rem)]">{service.name}</h3>
          <p className="u-measure mt-2 text-[0.98rem] text-ink/72">{service.blurb}</p>
          {!service.confirmed && (
            <span className="u-label mt-3 inline-block rounded-sm border border-dashed border-ink/30 px-2 py-1 text-[0.6rem] text-ink/45">
              Pending owner confirmation
            </span>
          )}
        </div>

        {/* Glyph lifts on hover — the "being picked up" cue */}
        <span aria-hidden
              className="hidden self-center text-ink/45 transition-all duration-200 ease-out group-hover:-translate-y-1.5 group-hover:text-forest sm:block">
          <span className="block h-11 w-11 md:h-14 md:w-14"><Glyph id={service.id} /></span>
        </span>
      </div>
    </motion.li>
  );
}

export function Services() {
  return (
    <section id="services" className="u-section scroll-mt-20 border-b-2 border-ink bg-sage-bg">
      <div className="u-wrap">
        <div className="max-w-3xl">
          <p className="u-label mb-4 flex items-center gap-2.5 text-ochre-text">
            <span aria-hidden className="inline-block h-[2px] w-8 bg-ochre" />
            What we take
          </p>
          <h2 className="u-h2 text-[clamp(2rem,4.5vw,3.25rem)]">
            If it's heavy, awkward,<br />or in your way — it goes.
          </h2>
        </div>

        <ul className="mt-12 border-t-2 border-ink">
          {SERVICES.map((s, i) => <Row key={s.id} service={s} i={i} />)}
        </ul>

        {/* Required disclaimer, kept visible next to the claim it qualifies. */}
        <p className="u-measure mt-8 text-[0.9rem] text-ink/65">{ITEM_DISCLAIMER}</p>
      </div>
    </section>
  );
}
