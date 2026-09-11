import { Logo } from "./Logo";
import { MascotWithCart } from "./Mascot";
import { BUSINESS, telHref, mailHref } from "@/config/business";

export function Footer() {
  const tel = telHref(), mail = mailHref();
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-cream">
      {/* Mascot dragging the last load off the edge */}
      <div aria-hidden className="pointer-events-none absolute -bottom-4 right-[-70px] w-[300px] opacity-[0.13] sm:right-4 sm:w-[380px]">
        <MascotWithCart className="h-auto w-full" />
      </div>

      <div className="u-wrap relative py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="[&_.text-ochre-text]:text-ochre-on-dark">
              <Logo />
            </div>
            <p className="u-measure mt-4 max-w-xs text-[0.92rem] text-cream/70">
              Furniture, appliances, cleanouts and general clutter — hauled away by a local crew.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="u-label mb-4 text-cream/55">Site</h2>
            <ul className="space-y-2.5">
              {[["#services","Services"],["#process","How It Works"],["#about","About"],["#contact","Contact"],["/privacy","Privacy Policy"]].map(([h,l]) => (
                <li key={h}><a href={h} className="text-[0.95rem] text-cream/85 transition-colors hover:text-ochre-on-dark">{l}</a></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="u-label mb-4 text-cream/55">Contact</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              <li>{tel ? <a href={tel} className="hover:text-ochre-on-dark">{BUSINESS.PHONE_DISPLAY}</a> : <span className="text-cream/40">Phone pending</span>}</li>
              <li>{mail ? <a href={mail} className="hover:text-ochre-on-dark">{BUSINESS.EMAIL}</a> : <span className="text-cream/40">Email pending</span>}</li>
              <li className="text-cream/40">
                {BUSINESS.PRIMARY_SERVICE_AREA ?? "Service area pending"}
              </li>
              <li className="text-cream/40">{BUSINESS.HOURS ? "See hours" : "Hours pending"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6">
          <p className="text-[0.82rem] text-cream/50">
            © {year} {BUSINESS.LEGAL_BUSINESS_NAME ?? BUSINESS.BUSINESS_NAME_FULL}. All rights reserved.
          </p>
          {/* Internal build notice — remove before public launch. */}
          <p className="mt-2 text-[0.78rem] text-cream/35">
            Internal note: business name and logo are provisional pending name/trademark clearance.
          </p>
        </div>
      </div>
    </footer>
  );
}
