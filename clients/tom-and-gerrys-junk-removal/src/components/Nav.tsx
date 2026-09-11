"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { BUSINESS, ESTIMATE_CTA, telHref } from "@/config/business";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How It Works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const tel = telHref();

  // Lock scroll + trap focus while the mobile panel is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>("a, button");
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-hair)] bg-cream/95 backdrop-blur-[2px]">
      <nav aria-label="Main" className="u-wrap flex items-center justify-between gap-4 py-3.5">
        <a href="#main" className="shrink-0" aria-label={`${BUSINESS.BUSINESS_NAME_FULL} home`}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}
                 className="group relative block px-3 py-2 text-[0.9rem] font-medium text-ink/85 transition-colors hover:text-ink">
                {l.label}
                <span aria-hidden
                      className="absolute inset-x-3 bottom-1 h-[2px] origin-left scale-x-0 bg-ochre transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {tel && (
            <a href={tel} className="u-label text-ink/80 transition-colors hover:text-ochre-text">
              {BUSINESS.PHONE_DISPLAY}
            </a>
          )}
          <a href="#contact" className="btn btn--primary">{ESTIMATE_CTA}</a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 items-center justify-center rounded-sm border-2 border-ink lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            {open ? <><path d="M5 5l14 14" /><path d="M19 5L5 19" /></>
                  : <><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h18" /></>}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" ref={panelRef}
             className="fixed inset-x-0 bottom-0 top-[68px] z-50 overflow-y-auto border-t-2 border-ink bg-cream lg:hidden">
          <ul className="u-wrap flex flex-col py-4">
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-[var(--border-hair)]">
                <a href={l.href} onClick={() => setOpen(false)}
                   className="u-h3 block py-5 text-2xl">{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="u-wrap flex flex-col gap-3 pb-10">
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn--primary w-full">
              {ESTIMATE_CTA}
            </a>
            {tel ? (
              <a href={tel} className="btn btn--secondary w-full">Call {BUSINESS.PHONE_DISPLAY}</a>
            ) : (
              <span className="u-label rounded-sm border-2 border-dashed border-ink/30 px-4 py-3 text-center text-ink/50">
                Phone number pending
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
