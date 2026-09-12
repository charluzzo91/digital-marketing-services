import type { Metadata } from "next";
import { Archivo, Chivo } from "next/font/google";
import { BUSINESS } from "@/config/business";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});

/**
 * SEO NOTE: title/description stay generic until the owner supplies the primary
 * service area. Once BUSINESS.PRIMARY_SERVICE_AREA is set, the title becomes
 * "Junk Removal in {area} | {name}" automatically. We do not invent a location.
 */
const area = BUSINESS.PRIMARY_SERVICE_AREA;
const title = area
  ? `Junk Removal in ${area} | ${BUSINESS.BUSINESS_NAME_FULL}`
  : `${BUSINESS.BUSINESS_NAME_FULL} | Fast Local Junk Removal`;

const description = area
  ? `Furniture, appliances, cleanouts and general clutter hauled away in ${area}. Tell us what needs to go and we'll handle the lifting, loading and cleanup.`
  : `Furniture, appliances, cleanouts and general clutter hauled away by a local crew. Tell us what needs to go and we'll handle the lifting, loading and cleanup.`;

export const metadata: Metadata = {
  metadataBase: BUSINESS.PRODUCTION_DOMAIN ? new URL(BUSINESS.PRODUCTION_DOMAIN) : undefined,
  title,
  description,
  alternates: BUSINESS.PRODUCTION_DOMAIN ? { canonical: "/" } : undefined,
  // Until a production domain is confirmed, this build must never be indexed.
  // Setting PRODUCTION_DOMAIN flips it to indexable — no manual noindex to forget.
  robots: BUSINESS.PRODUCTION_DOMAIN
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    title,
    description,
    siteName: BUSINESS.BUSINESS_NAME_FULL,
  },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/favicon-32.png", apple: "/apple-icon.png" },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#F4EEDC" };

/**
 * JSON-LD. Only properties we can actually verify are emitted.
 * No address, no coordinates, no hours, no priceRange, no ratings, no reviews.
 */
function schema() {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.BUSINESS_NAME_FULL,
  };
  if (BUSINESS.PRODUCTION_DOMAIN) node.url = BUSINESS.PRODUCTION_DOMAIN;
  if (BUSINESS.PHONE) node.telephone = BUSINESS.PHONE;
  if (BUSINESS.EMAIL) node.email = BUSINESS.EMAIL;
  if (BUSINESS.SERVICE_AREAS.length) node.areaServed = BUSINESS.SERVICE_AREAS;
  const socials = Object.values(BUSINESS.SOCIAL_LINKS);
  if (socials.length) node.sameAs = socials;
  return node;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${chivo.variable}`}>
      <body>
        <a className="u-skip" href="#main">Skip to content</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema()) }}
        />
      </body>
    </html>
  );
}
