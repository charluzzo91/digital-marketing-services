import { MascotStanding } from "./Mascot";
import { BUSINESS } from "@/config/business";

/**
 * NO FACTUAL CLAIMS IN THIS SECTION.
 * No years in business, no certifications, no insurance status, no awards,
 * no disposal partnerships, no recycling percentages, no testimonials.
 * Everything here describes intent and process only.
 */
export function About() {
  return (
    <section id="about" className="on-dark u-grain u-section relative scroll-mt-20 border-b-2 border-ink bg-forest text-cream">
      <div className="u-wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="u-label mb-4 flex items-center gap-2.5 text-ochre-on-dark">
            <span aria-hidden className="inline-block h-[2px] w-8 bg-ochre-on-dark" />
            About us
          </p>
          <h2 className="u-h2 text-[clamp(2rem,4.5vw,3.25rem)]">
            No runaround.<br />Just get the junk gone.
          </h2>
          <div className="u-measure mt-6 space-y-4 text-[1.05rem] text-cream/85">
            <p>
              {BUSINESS.BUSINESS_NAME} was built around a simple idea: junk removal shouldn't be
              complicated. Tell us what needs to go, get a straightforward estimate, and let us
              handle the lifting, loading and cleanup.
            </p>
            <p>
              We show up when we say we will, we treat your home or property with respect, and we
              tell you what something costs before we start — not after. No pressure, no vague
              quotes, no mess left behind.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-[300px]">
            <div aria-hidden className="absolute inset-x-2 bottom-4 top-8 rotate-2 rounded-sm border-2 border-cream/25" />
            <MascotStanding alt="" className="relative h-auto w-full" sizes="300px" />
          </div>
        </div>
      </div>
    </section>
  );
}
