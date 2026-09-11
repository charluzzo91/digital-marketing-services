/**
 * SINGLE SOURCE OF TRUTH for every business fact on this site.
 *
 * RULES — do not break these:
 *  1. `null` means UNKNOWN. The UI must render a visible placeholder, never invent a value.
 *  2. `false` on a *_CONFIRMED flag means the related marketing claim is FORBIDDEN.
 *     The UI reads the flag; it never hardcodes the claim.
 *  3. Nothing here may be filled in by an AI assistant. Only the business owner supplies these.
 *
 * TRADEMARK NOTICE: BUSINESS_NAME is provisional pending name/trademark clearance.
 * It is referenced only through this file so it can be swapped without touching components.
 */

export const BUSINESS = {
  // --- Identity (PROVISIONAL - see trademark notice above) ---
  BUSINESS_NAME: "Tom and Gerry's",
  BUSINESS_NAME_FULL: "Tom and Gerry's Junk Removal",
  LEGAL_BUSINESS_NAME: null as string | null,

  // --- Contact ---
  PHONE: null as string | null,          // e.g. "+15551234567"
  PHONE_DISPLAY: null as string | null,  // e.g. "(555) 123-4567"
  SMS: null as string | null,
  EMAIL: null as string | null,

  // --- Location / service area ---
  PRIMARY_SERVICE_AREA: null as string | null,
  SERVICE_AREAS: [] as string[],
  PUBLIC_ADDRESS: null as string | null,
  SHOW_ADDRESS: false, // service-area business until owner confirms a storefront
  HOURS: null as { day: string; open: string; close: string }[] | null,

  // --- Web ---
  PRODUCTION_DOMAIN: null as string | null, // e.g. "https://example.com"
  SOCIAL_LINKS: {} as Record<string, string>,
  GOOGLE_BUSINESS_PROFILE: null as string | null,
  PRIVACY_CONTACT: null as string | null,
  FORM_ENDPOINT: null as string | null, // where leads are delivered; drives privacy policy
} as const;

/**
 * CLAIM GATES. Every one is a factual marketing statement that must be
 * verified by the owner before it may appear anywhere on the site.
 * All default to false. The UI must branch on these, never assume.
 */
export const CLAIMS = {
  FREE_ESTIMATES_CONFIRMED: false,
  NO_OBLIGATION_CONFIRMED: false,
  LICENSED_CONFIRMED: false,
  INSURED_CONFIRMED: false,
  BONDED_CONFIRMED: false,
  RESIDENTIAL_CONFIRMED: false,
  COMMERCIAL_CONFIRMED: false,
  SAME_DAY_CONFIRMED: false,
  UPFRONT_PRICING_CONFIRMED: false,
  LOCALLY_OWNED_CONFIRMED: false,
  FAMILY_OWNED_CONFIRMED: false,
  YEARS_IN_BUSINESS: null as number | null,
  RECYCLING_CLAIMS: null as string | null,
  DONATION_CLAIMS: null as string | null,
} as const;

export type ServiceId =
  | "household" | "furniture" | "appliance"
  | "garage-basement" | "moveout-estate" | "yard";

export interface Service {
  id: ServiceId;
  index: string;
  name: string;
  blurb: string;
  /** Set true only once the owner confirms the service is actually offered. */
  confirmed: boolean;
  /** Future dedicated URL. Only linked once the page genuinely exists. */
  href: string | null;
}

/**
 * NOTE: "Construction + renovation debris" is deliberately EXCLUDED from launch.
 * It requires confirmation of what material the company is legally and
 * operationally equipped to transport. Do not re-add it without that confirmation.
 */
export const SERVICES: Service[] = [
  { id: "household", index: "01", name: "Household Junk",
    blurb: "Old furniture, boxes, unwanted items and the general clutter that piles up.",
    confirmed: false, href: null },
  { id: "furniture", index: "02", name: "Furniture Removal",
    blurb: "Couches, mattresses, tables, dressers and awkward, heavy pieces.",
    confirmed: false, href: null },
  { id: "appliance", index: "03", name: "Appliance Removal",
    blurb: "Refrigerators, washers, dryers and other approved appliances.",
    confirmed: false, href: null },
  { id: "garage-basement", index: "04", name: "Garage + Basement Cleanouts",
    blurb: "Clear years of accumulated clutter without making trip after trip yourself.",
    confirmed: false, href: null },
  { id: "moveout-estate", index: "05", name: "Move-Out + Estate Cleanouts",
    blurb: "Cleanup for moves, estates, landlords and property turnovers.",
    confirmed: false, href: null },
  { id: "yard", index: "06", name: "Yard + Outdoor Cleanup",
    blurb: "Approved outdoor debris, unwanted equipment and general cleanup.",
    confirmed: false, href: null },
];

/** Shown near the service list. Required — do not remove. */
export const ITEM_DISCLAIMER =
  "Some materials may require special handling or may not be accepted. Contact us to confirm your items before pickup.";

/** Shown near any estimate CTA or the lead form. Required — do not remove. */
export const ESTIMATE_DISCLAIMER =
  "Final pricing may depend on the volume and type of material, access conditions, location and any applicable disposal or handling requirements.";

/** CTA label adapts to whether "free" has been verified. */
export const ESTIMATE_CTA = CLAIMS.FREE_ESTIMATES_CONFIRMED
  ? "Get My Free Estimate"
  : "Request an Estimate";

/**
 * Trust strip. Only *process descriptions* until the owner confirms claims.
 * These describe how the company works; they assert nothing verifiable.
 */
export const TRUST_STRIP: string[] = [
  "Tell us what you've got",
  "We do the lifting",
  "Clear pricing before we start",
  "Local crew",
];

export const hasPhone = () => Boolean(BUSINESS.PHONE);
export const telHref = () => (BUSINESS.PHONE ? `tel:${BUSINESS.PHONE}` : null);
export const smsHref = () => (BUSINESS.SMS ? `sms:${BUSINESS.SMS}` : null);
export const mailHref = () => (BUSINESS.EMAIL ? `mailto:${BUSINESS.EMAIL}` : null);
