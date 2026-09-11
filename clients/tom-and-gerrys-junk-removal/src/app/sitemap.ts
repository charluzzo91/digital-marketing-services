import type { MetadataRoute } from "next";
import { BUSINESS, SERVICES } from "@/config/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.PRODUCTION_DOMAIN;
  if (!base) return [];
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
  // Only list service URLs that actually exist.
  for (const s of SERVICES) {
    if (s.href) pages.push({ url: `${base}${s.href}`, lastModified: now, priority: 0.7 });
  }
  return pages;
}
