import type { MetadataRoute } from "next";

const BASE = "https://innegolfbergen.no";

/** Every public page, by its unprefixed (Norwegian) path. */
const PATHS = [
  "/",
  "/medlemskap",
  "/gavekort",
  "/bursdag",
  "/bedrift",
  "/praktisk",
  "/vip-losjen",
  "/vinterturnering",
  "/polf",
  "/veien-til-golf",
  "/personvern",
  "/vilkar",
];

const en = (path: string) => (path === "/" ? "/en" : `/en${path}`);

/** Static /sitemap.xml — one entry per page with its hreflang pair. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${BASE}${path}`,
    alternates: {
      languages: { no: `${BASE}${path}`, en: `${BASE}${en(path)}` },
    },
  }));
}
