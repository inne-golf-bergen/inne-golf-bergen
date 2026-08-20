import forsidenJson from "@/content/forsiden.json";
import { polfMaksPott, VINTER } from "./content";
import { kr, krRange, MINUS, THIN } from "./format";
import type { Lang } from "./i18n";
import { gavekortMaksBonusPct, gavekortMinPris, PRISER } from "./prices";

/**
 * The editable parts of the front page, sourced from content/forsiden.json —
 * the file the owner edits under "Forsiden" in /admin. As in lib/prices.ts,
 * the explicit `Forsiden` annotation on the export is the schema guard: a CMS
 * commit that breaks the shape fails `tsc` inside `next build`, so Vercel
 * keeps the last good deploy serving.
 */

/** Norwegian is required; English is optional and falls back to Norwegian. */
export type Tekst = { no: string; en?: string };

export type Forsiden = {
  seksjoner: { visSelskap: boolean; visSkjer: boolean; visGavekort: boolean; visFaq: boolean };
  skjer: { vis: boolean; lenke: string; merkelapp: Tekst; tittel: Tekst; tekst: Tekst }[];
  faq: { sporsmal: Tekst; svar: Tekst }[];
};

export const FORSIDEN: Forsiden = forsidenJson;

/**
 * Price placeholders the owner may type into any front-page text, so a price
 * lives in exactly one place (content/priser.json) no matter how many
 * sentences mention it. Values carry the site's number typography — NNBSP
 * thousands groups, NBSP before the unit — so editors never type them.
 *
 * Keep this list in sync with the hint text in public/admin/config.yml.
 */
const TOKENS: Record<string, string> = {
  pris30: krRange(PRISER.sim.halvtimeMin, PRISER.sim.halvtimeMax),
  prisTime: krRange(PRISER.sim.timeMin, PRISER.sim.timeMax),
  medlemAar: kr(PRISER.medlemskap.aarspris),
  medlemVerdikort: kr(PRISER.medlemskap.verdikort),
  medlemRabatt: `${MINUS}${PRISER.medlemskap.rabattProsent}${THIN}%`,
  gavekortFra: kr(gavekortMinPris),
  gavekortBonus: `${gavekortMaksBonusPct}${THIN}%`,
  vinterPris: kr(VINTER.prisPerSpiller),
  vinterPott: kr(VINTER.premiepott),
  polfMaks: kr(polfMaksPott),
  vtgJunior: kr(PRISER.vtg.junior),
  vtgVoksen: kr(PRISER.vtg.voksen),
};

/** All token names, for the CMS hint and the i18n length checker. */
export const TOKEN_NAMES = Object.keys(TOKENS);

/**
 * Resolve one editable string: pick the locale (English falls back to
 * Norwegian when the owner left it blank) and substitute {{price}} tokens.
 * An unknown token is left visible rather than silently blanked, so a typo
 * shows up on the preview instead of quietly deleting a price.
 */
export function tekst(lang: Lang, value: Tekst): string {
  const raw = lang === "en" ? value.en?.trim() || value.no : value.no;
  return raw.replace(/\{\{(\w+)\}\}/g, (whole, name: string) => TOKENS[name] ?? whole);
}

/** Front-page cards the owner has left switched on. */
export const skjerKort = FORSIDEN.skjer.filter((k) => k.vis);

/** FAQ entries with a non-empty question — an empty row can never render. */
export const faqRader = FORSIDEN.faq.filter((f) => f.sporsmal.no.trim() && f.svar.no.trim());
