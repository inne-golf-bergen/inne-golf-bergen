import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { cache } from "react";
import polfJson from "@/content/turnering-polf.json";
import vinterJson from "@/content/turnering-vinter.json";
import type { Lang } from "./i18n";

/**
 * Typed access to the content/ files the owner edits in /admin.
 *
 * SERVER/BUILD ONLY — this module reads the filesystem, so it must never be
 * imported from a "use client" file. Every route is fully prerendered
 * (dynamicParams=false everywhere), so fs is only ever touched at build time.
 *
 * The explicit type annotations are the schema guard: a CMS commit that
 * breaks a shape fails `tsc`/the guards inside `next build`, and the last
 * good deploy keeps serving while Vercel emails the developer.
 */

/** A NO/EN text pair from a content file — pick with t(lang, x.no, x.en). */
export type Bilingual = { no: string; en: string };

/* ------------------------------------------------------------------ */
/* Bespoke tournament pages (vinterturnering, polf)                    */
/* ------------------------------------------------------------------ */

/** Season/round state for the bespoke tournament pages — drives which
    #pameld section renders (entry form vs. underway vs. archive). */
export type TurneringStatus = "pamelding" | "pagaende" | "ferdigspilt";

const STATUSES: readonly string[] = ["pamelding", "pagaende", "ferdigspilt"];

/* JSON imports type enum-like fields as plain string — narrow at module
   evaluation time (= build time) so a bad CMS value fails the build with a
   message naming the file. */
function asStatus(value: string, file: string): TurneringStatus {
  if (!STATUSES.includes(value)) {
    throw new Error(`${file}: ugyldig status "${value}" — bruk ${STATUSES.join(" | ")}`);
  }
  return value as TurneringStatus;
}

export type VinterSettings = {
  sesong: Bilingual;
  nesteSesong: string;
  status: TurneringStatus;
  datoTekst: Bilingual;
  prisPerSpiller: number;
  vipps: string;
  premiepott: number;
  jakkeNote: Bilingual;
  premier: { plass: string; belop: number; note: Bilingual }[];
};

export type PolfSettings = {
  rundeLabel: Bilingual;
  status: TurneringStatus;
  golfvinduTekst: Bilingual;
  pokerkveldTekst: Bilingual;
  entry: number;
  bounty: number;
  avgift: number;
  vipps: string;
  pottTrinn: { spillere: number; belop: number; utbetaling: Bilingual }[];
};

export const VINTER: VinterSettings = {
  ...vinterJson,
  status: asStatus(vinterJson.status, "content/turnering-vinter.json"),
};

export const POLF: PolfSettings = {
  ...polfJson,
  status: asStatus(polfJson.status, "content/turnering-polf.json"),
};

/** Biggest possible POLF pot ("premiepott inntil 63 000 kr"). */
export const polfMaksPott = Math.max(...POLF.pottTrinn.map((p) => p.belop));

/* ------------------------------------------------------------------ */
/* Markdown collections (content/aktuelt, content/turneringer)         */
/* ------------------------------------------------------------------ */

const CONTENT_DIR = join(process.cwd(), "content");

/* Frontmatter guards: a broken CMS commit fails the build with a message
   naming the file, instead of prerendering a half-empty page. */
function reqString(value: unknown, file: string, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${file}: feltet "${field}" mangler eller er tomt`);
  }
  return value.trim();
}

function optString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/** js-yaml parses an unquoted `date: 2026-08-20` as a JS Date — normalise
    back to the ISO string the loaders and sitemap work with. */
function isoDate(value: unknown, file: string): string {
  const s =
    value instanceof Date ? value.toISOString().slice(0, 10) : typeof value === "string" ? value.trim() : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    throw new Error(`${file}: feltet "date" må være en dato på formen YYYY-MM-DD`);
  }
  return s;
}

/* Content authors are repo committers (via /admin) — the same trust level as
   code — so the markdown is rendered without a sanitizer. */
const md = (body: string): string => marked.parse(body, { async: false }) as string;

type RawEntry = {
  /** Frontmatter of the Norwegian file — the source of truth for
      date/hero/draft/status and every non-translated field. */
  data: Record<string, unknown>;
  /** Frontmatter of the English file, when one exists. */
  enData?: Record<string, unknown>;
  title: string;
  description: string;
  bodyHtml: string;
  /** English was requested but only Norwegian content exists. */
  fallback: boolean;
};

function readEntry(folder: string, slug: string, lang: Lang): RawEntry {
  const label = `content/${folder}/${slug}.no.md`;
  const no = matter(readFileSync(join(CONTENT_DIR, folder, `${slug}.no.md`), "utf8"));
  const base: RawEntry = {
    data: no.data,
    title: reqString(no.data.title, label, "title"),
    description: reqString(no.data.description, label, "description"),
    bodyHtml: md(no.content),
    fallback: false,
  };
  if (lang === "no") return base;
  const enFile = join(CONTENT_DIR, folder, `${slug}.en.md`);
  if (!existsSync(enFile)) return { ...base, fallback: true };
  const en = matter(readFileSync(enFile, "utf8"));
  const enBody = en.content.trim();
  return {
    ...base,
    enData: en.data,
    title: optString(en.data.title) ?? base.title,
    description: optString(en.data.description) ?? base.description,
    bodyHtml: enBody ? md(enBody) : base.bodyHtml,
    fallback: !enBody,
  };
}

/** A translatable extra field: the EN file's value wins when present. */
function localized(entry: RawEntry, field: string): unknown {
  return optString(entry.enData?.[field]) ?? entry.data[field];
}

function listSlugs(folder: string): string[] {
  const dir = join(CONTENT_DIR, folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".no.md"))
    .map((f) => f.replace(/\.no\.md$/, ""))
    .sort();
}

export type AktueltPost = {
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD, always from the NO file
  description: string;
  hero?: string;
  draft: boolean;
  html: string;
  fallback: boolean;
};

function basePost(folder: string, slug: string, entry: RawEntry): AktueltPost {
  const label = `content/${folder}/${slug}.no.md`;
  return {
    slug,
    title: entry.title,
    date: isoDate(entry.data.date, label),
    description: entry.description,
    hero: optString(entry.data.hero),
    draft: Boolean(entry.data.draft),
    html: entry.bodyHtml,
    fallback: entry.fallback,
  };
}

/** Published posts, newest first. Drafts (Kladd) never leave the build. */
export const getAktueltPosts = cache((lang: Lang): AktueltPost[] =>
  listSlugs("aktuelt")
    .map((slug) => basePost("aktuelt", slug, readEntry("aktuelt", slug, lang)))
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date)),
);

export function getAktueltPost(lang: Lang, slug: string): AktueltPost | undefined {
  return getAktueltPosts(lang).find((post) => post.slug === slug);
}

export const getAktueltSlugs = (): string[] => getAktueltPosts("no").map((post) => post.slug);

export type TurneringEntryStatus = "kommende" | "pagaende" | "arkivert";

const ENTRY_STATUSES: readonly string[] = ["kommende", "pagaende", "arkivert"];

export type TurneringEntry = AktueltPost & {
  status: TurneringEntryStatus;
  datoTekst: string;
  prisTekst?: string;
  premier: { plass: string; belop: number; note?: string }[];
  pameldingApen: boolean;
  pameldingUrl?: string;
};

function parsePremier(value: unknown, file: string): TurneringEntry["premier"] {
  if (value == null) return [];
  if (!Array.isArray(value)) throw new Error(`${file}: "premier" må være en liste`);
  return value.map((row, i) => {
    const r = (row ?? {}) as Record<string, unknown>;
    if (typeof r.belop !== "number") {
      throw new Error(`${file}: premie ${i + 1} mangler "belop" (et tall)`);
    }
    return { plass: reqString(r.plass, file, `premier[${i + 1}].plass`), belop: r.belop, note: optString(r.note) };
  });
}

/** Published tournament entries, newest first (group by status in the page). */
export const getTurneringer = cache((lang: Lang): TurneringEntry[] =>
  listSlugs("turneringer")
    .map((slug) => {
      const label = `content/turneringer/${slug}.no.md`;
      const entry = readEntry("turneringer", slug, lang);
      const status = reqString(entry.data.status, label, "status");
      if (!ENTRY_STATUSES.includes(status)) {
        throw new Error(`${label}: ugyldig status "${status}" — bruk ${ENTRY_STATUSES.join(" | ")}`);
      }
      return {
        ...basePost("turneringer", slug, entry),
        status: status as TurneringEntryStatus,
        datoTekst: reqString(localized(entry, "datoTekst"), label, "datoTekst"),
        prisTekst: optString(localized(entry, "prisTekst")),
        premier: parsePremier(entry.data.premier, label),
        pameldingApen: Boolean(entry.data.pameldingApen),
        pameldingUrl: optString(entry.data.pameldingUrl),
      };
    })
    .filter((entry) => !entry.draft)
    .sort((a, b) => b.date.localeCompare(a.date)),
);

export function getTurnering(lang: Lang, slug: string): TurneringEntry | undefined {
  return getTurneringer(lang).find((entry) => entry.slug === slug);
}

export const getTurneringSlugs = (): string[] => getTurneringer("no").map((entry) => entry.slug);
