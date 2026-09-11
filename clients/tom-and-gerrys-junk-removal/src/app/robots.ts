import type { MetadataRoute } from "next";
import { BUSINESS } from "@/config/business";

/**
 * While PRODUCTION_DOMAIN is null this is a local/staging build and must be
 * fully disallowed. Setting the domain in config flips it open — there is no
 * separate staging noindex that could ship to production by accident.
 */
export default function robots(): MetadataRoute.Robots {
  if (!BUSINESS.PRODUCTION_DOMAIN) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${BUSINESS.PRODUCTION_DOMAIN}/sitemap.xml`,
    host: BUSINESS.PRODUCTION_DOMAIN,
  };
}
