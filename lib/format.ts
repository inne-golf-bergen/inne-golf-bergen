import type { Lang } from "./i18n";

/* Typographic spaces for numbers, mirrored from the page-level consts they
   replace: U+202F narrow no-break space groups thousands ("1 800") and sits
   before % ("20 %" — U+2009 breaks!); U+00A0 no-break space sits before the
   unit ("1 800 kr") so a price can never line-break internally. */
export const NNBSP = "\u202f";
export const NBSP = "\u00a0";
export const THIN = "\u202f";
export const MINUS = "\u2212";

/** 1800 → "1 800" — NNBSP thousands groups, the site's visible-copy style. */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP);

/** 1800 → "1 800" with plain spaces — meta descriptions only (search snippets). */
export const fmtSp = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** 1800 → "1 800 kr" — NBSP before the unit. */
export const kr = (n: number): string => `${fmt(n)}${NBSP}kr`;

/** (100, 200) → "100–200 kr" — plain space, matching the price-table typography. */
export const krRange = (lo: number, hi: number): string => `${fmt(lo)}–${fmt(hi)} kr`;

/** "91330248" → "913 30 248" — NBSP-joined 3-2-3 grouping. */
export const phoneDisplay = (digits: string): string =>
  `${digits.slice(0, 3)}${NBSP}${digits.slice(3, 5)}${NBSP}${digits.slice(5)}`;

/** "91330248" → "+4791330248" */
export const phoneHref = (digits: string): string => `+47${digits}`;

/** "2026-08-20" → "20. august 2026" / "20 August 2026" */
export function formatDate(lang: Lang, iso: string): string {
  const date = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(lang === "no" ? "nb-NO" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
