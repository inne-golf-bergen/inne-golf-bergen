import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site";

/**
 * Static /robots.txt. Before this file existed the URL fell into the
 * catch-all and crawlers got an HTML page back — some treat an unparseable
 * 200 robots.txt as "crawl nothing". Built once, served by the CDN.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    // /admin (the Sveltia CMS shell in public/admin) is noindexed at the page
    // and header level too; this keeps crawlers from bothering with it at all.
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
