import type { Metadata } from "next";
import { BUSINESS } from "@/config/business";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BUSINESS.BUSINESS_NAME_FULL}`,
  description: "How we handle information submitted through this website.",
};

/**
 * DRAFT. This policy must describe the ACTUAL implementation before launch.
 * It currently reflects the real state: the form does not transmit anything,
 * because no endpoint is configured. Update it the moment that changes.
 */
export default function Privacy() {
  return (
    <main id="main" className="u-section">
      <div className="u-wrap max-w-3xl">
        <p className="u-label mb-4 text-ochre-text">Legal</p>
        <h1 className="u-h2 text-[clamp(2rem,4.5vw,3rem)]">Privacy Policy</h1>

        <div className="mt-5 rounded-sm border-2 border-dashed border-ink/35 p-5">
          <p className="u-label mb-2 text-error">Draft — not ready for launch</p>
          <p className="text-[0.95rem] text-ink/75">
            This document must be reviewed and completed by the business owner before the site
            goes live. Items marked <strong>[TO CONFIRM]</strong> depend on decisions that have
            not yet been made.
          </p>
        </div>

        <div className="u-measure mt-10 space-y-7 text-[1rem] leading-relaxed">
          <section>
            <h2 className="u-h3 mb-2 text-xl">What we collect</h2>
            <p>
              If you submit the estimate request form, we collect the name, phone number, email
              address, ZIP code, job type and description you choose to provide. We collect this
              only to respond to your request.
            </p>
          </section>

          <section>
            <h2 className="u-h3 mb-2 text-xl">Current state of the form</h2>
            <p>
              {BUSINESS.FORM_ENDPOINT
                ? "Submissions are transmitted to the destination configured for this site."
                : "The form does not currently transmit or store anything. No destination is configured, so no submission leaves your browser."}
            </p>
          </section>

          <section>
            <h2 className="u-h3 mb-2 text-xl">Who receives it <span className="text-error">[TO CONFIRM]</span></h2>
            <p>
              Once form delivery is enabled, this section must name every third-party processor
              that receives submissions — email provider, CRM, form service or hosting provider.
            </p>
          </section>

          <section>
            <h2 className="u-h3 mb-2 text-xl">How long we keep it <span className="text-error">[TO CONFIRM]</span></h2>
            <p>A retention period must be stated here once delivery and storage are decided.</p>
          </section>

          <section>
            <h2 className="u-h3 mb-2 text-xl">How we contact you</h2>
            <p>
              We use your phone number or email to reply about your estimate request. We do not
              add you to a promotional mailing list and we do not send automated marketing texts.
            </p>
          </section>

          <section>
            <h2 className="u-h3 mb-2 text-xl">Contact us about privacy <span className="text-error">[TO CONFIRM]</span></h2>
            <p>{BUSINESS.PRIVACY_CONTACT ?? "A privacy contact address must be supplied by the business owner."}</p>
          </section>
        </div>

        <p className="mt-12">
          <a href="/" className="btn btn--secondary">Back to site</a>
        </p>
      </div>
    </main>
  );
}
