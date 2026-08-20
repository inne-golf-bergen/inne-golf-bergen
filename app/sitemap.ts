import type { MetadataRoute } from "next";
import { getAktueltPosts, getTurneringer } from "@/lib/content";
import { SITE_ORIGIN } from "@/lib/site";

const BASE = SITE_ORIGIN;

/** Every fixed public page, by its unprefixed (Norwegian) path. */
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
  "/turneringer",
  "/aktuelt",
  "/personvern",
  "/vilkar",
];

const en = (path: string) => (path === "/" ? "/en" : `/en${path}`);

const entry = (path: string, lastModified?: string): MetadataRoute.Sitemap[number] => ({
  url: `${BASE}${path}`,
  ...(lastModified ? { lastModified } : {}),
  alternates: {
    languages: { no: `${BASE}${path}`, en: `${BASE}${en(path)}` },
  },
});

/** Static /sitemap.xml — fixed pages plus the CMS collections (drafts are
    already excluded by the loaders). Regenerated on every deploy. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PATHS.map((path) => entry(path)),
    ...getAktueltPosts("no").map((post) => entry(`/aktuelt/${post.slug}`, post.date)),
    ...getTurneringer("no").map((turnering) => entry(`/turneringer/${turnering.slug}`, turnering.date)),
  ];
}
