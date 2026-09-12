"use client";

import { useEffect, useState } from "react";
import { ESTIMATE_CTA, BUSINESS, telHref } from "@/config/business";

/** Mobile-only call/estimate bar. Appears after the hero, never over the form. */
export function StickyBar() {
  const [show, setShow] = useState(false);
  const tel = telHref();

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.75;
      const contact = document.getElementById("contact");
      const inForm = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      setShow(past && !inForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-cream transition-transform duration-300 ease-out md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      // Hidden from AT when off-screen so it isn't a phantom tab stop.
      aria-hidden={!show}
      // React 19 takes `inert` as a real boolean; false removes the attribute.
      inert={!show}
    >
      <div className="flex gap-2 p-2.5" style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}>
        {tel ? (
          <a href={tel} className="btn btn--secondary flex-1">Call</a>
        ) : (
          <span className="btn btn--secondary flex-1 opacity-45">No number yet</span>
        )}
        <a href="#contact" className="btn btn--primary flex-[1.4]">{ESTIMATE_CTA}</a>
      </div>
    </div>
  );
}
