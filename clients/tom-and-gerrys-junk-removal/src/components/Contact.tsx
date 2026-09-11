"use client";

import { useState } from "react";
import {
  BUSINESS, SERVICES, ESTIMATE_CTA, ESTIMATE_DISCLAIMER,
  telHref, smsHref, mailHref,
} from "@/config/business";

type Errors = Partial<Record<"name" | "phone" | "email" | "zip" | "service", string>>;

const field =
  "w-full rounded-sm border-2 border-ink bg-paper px-3.5 py-3 text-[1rem] " +
  "placeholder:text-ink/40 focus:outline-none";

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "blocked">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    const next: Errors = {};
    if (!get("name")) next.name = "Please enter your name.";
    if (!get("phone") && !get("email")) {
      next.phone = "Enter a phone number or an email so we can reply.";
      next.email = "Enter a phone number or an email so we can reply.";
    }
    if (get("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) {
      next.email = "That email address doesn't look right.";
    }
    if (get("zip") && !/^\d{5}(-\d{4})?$/.test(get("zip"))) {
      next.zip = "Enter a 5-digit ZIP code.";
    }
    if (!get("service")) next.service = "Pick the closest match.";

    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`f-${Object.keys(next)[0]}`)?.focus();
      return;
    }

    // No FORM_ENDPOINT is configured, so there is nowhere to deliver this lead.
    // We refuse to fake a success message.
    setStatus("blocked");
  }

  const tel = telHref(), sms = smsHref(), mail = mailHref();
  const err = (k: keyof Errors) =>
    errors[k] ? <p id={`e-${k}`} className="mt-1.5 text-[0.85rem] font-medium text-error">{errors[k]}</p> : null;
  const a11y = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });

  return (
    <section id="contact" className="u-section scroll-mt-20 border-b-2 border-ink">
      <div className="u-wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="u-label mb-4 flex items-center gap-2.5 text-ochre-text">
            <span aria-hidden className="inline-block h-[2px] w-8 bg-ochre" />
            Get in touch
          </p>
          <h2 className="u-h2 text-[clamp(2rem,4.5vw,3.25rem)]">Ready to<br />clear it out?</h2>
          <p className="u-measure mt-5 text-[1.05rem] text-ink/78">
            Tell us what needs to go and we'll let you know what options are available.
          </p>

          <ul className="mt-9 space-y-3">
            {[
              { label: "Call", href: tel, value: BUSINESS.PHONE_DISPLAY },
              { label: "Text", href: sms, value: BUSINESS.PHONE_DISPLAY },
              { label: "Email", href: mail, value: BUSINESS.EMAIL },
            ].map((c) => (
              <li key={c.label} className="flex items-center gap-4 border-b border-[var(--border-hair)] pb-3">
                <span className="u-label w-14 shrink-0 text-ink/55">{c.label}</span>
                {c.href && c.value ? (
                  <a href={c.href} className="text-[1.05rem] font-medium underline decoration-ochre decoration-2 underline-offset-4">
                    {c.value}
                  </a>
                ) : (
                  <span className="text-[0.95rem] text-ink/40">Pending — to be supplied by owner</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate
                className="rounded-sm border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_var(--color-ink)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="f-name" className="u-label mb-1.5 block">Name <span className="text-error">*</span></label>
                <input id="f-name" name="name" autoComplete="name" className={field} placeholder="Your name" {...a11y("name")} />
                {err("name")}
              </div>

              <div>
                <label htmlFor="f-phone" className="u-label mb-1.5 block">Phone</label>
                <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel"
                       className={field} placeholder="(555) 123-4567" {...a11y("phone")} />
                {err("phone")}
              </div>

              <div>
                <label htmlFor="f-email" className="u-label mb-1.5 block">Email</label>
                <input id="f-email" name="email" type="email" inputMode="email" autoComplete="email"
                       className={field} placeholder="you@example.com" {...a11y("email")} />
                {err("email")}
              </div>

              <div>
                <label htmlFor="f-zip" className="u-label mb-1.5 block">ZIP code</label>
                <input id="f-zip" name="zip" inputMode="numeric" autoComplete="postal-code"
                       maxLength={10} className={field} placeholder="12345" {...a11y("zip")} />
                {err("zip")}
              </div>

              <div>
                <label htmlFor="f-service" className="u-label mb-1.5 block">Type of job <span className="text-error">*</span></label>
                <select id="f-service" name="service" className={field} defaultValue="" {...a11y("service")}>
                  <option value="" disabled>Choose one…</option>
                  {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  <option value="other">Something else</option>
                </select>
                {err("service")}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="f-message" className="u-label mb-1.5 block">What needs to go?</label>
                <textarea id="f-message" name="message" rows={4} className={field}
                          placeholder="A couch, two dressers and about ten boxes in a second-floor apartment…" />
              </div>

              {/* Photo upload is UI-only until storage, retention and privacy are decided. */}
              <div className="sm:col-span-2">
                <span className="u-label mb-1.5 block">Photos (optional)</span>
                <div className="flex items-center gap-3 rounded-sm border-2 border-dashed border-ink/30 px-4 py-5 text-ink/45">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <span className="text-[0.9rem]">
                    Photo upload not enabled yet — needs storage, file-type/size limits and a retention policy first.
                  </span>
                </div>
              </div>
            </div>

            {/* Consent limited strictly to replying about THIS request. Not pre-checked,
                not bundled with promotional marketing. */}
            <p className="mt-6 text-[0.85rem] leading-relaxed text-ink/65">
              By sending this, you're asking us to contact you about your estimate request. We'll
              only use your details to reply about this job.
            </p>
            <p className="mt-3 text-[0.85rem] leading-relaxed text-ink/65">{ESTIMATE_DISCLAIMER}</p>

            <button type="submit" className="btn btn--primary mt-6 w-full sm:w-auto">{ESTIMATE_CTA}</button>

            <div aria-live="polite">
              {status === "blocked" && (
                <p className="mt-5 rounded-sm border-2 border-error/45 bg-error/5 p-4 text-[0.9rem] text-ink">
                  <strong className="font-semibold">Not connected yet.</strong> Your details were
                  validated but <em>not sent</em> — no destination is configured. Set{" "}
                  <code className="text-[0.85em]">FORM_ENDPOINT</code> in{" "}
                  <code className="text-[0.85em]">src/config/business.ts</code>, then the privacy
                  policy must be updated to name that processor.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
