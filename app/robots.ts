import type { MetadataRoute } from "next";

/**
 * Static /robots.txt. Before this file existed the URL fell into the
 * catch-all and crawlers got an HTML page back — some treat an unparseable
 * 200 robots.txt as "crawl nothing". Built once, served by the CDN.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://innegolfbergen.no/sitemap.xml",
  };
}
