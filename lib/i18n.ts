export const LANGS = ["no", "en"] as const;

export type Lang = (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** Normalizes a route param to a supported language (routing + dynamicParams=false guarantee no/en). */
export function asLang(value: string): Lang {
  return isLang(value) ? value : "no";
}

/**
 * Picks the copy for the active language. Keep the English variant at most as
 * long as the Norwegian one — layout boxes are sized for the Norwegian copy
 * (checked by scripts/check-i18n-lengths.mjs for plain strings).
 */
export function t<T>(lang: Lang, no: T, en: T): T {
  return lang === "no" ? no : en;
}

/**
 * Prefixes an internal href with the language. Norwegian URLs stay unprefixed
 * (next.config.ts rewrites them to /no internally); English lives under /en.
 */
export function langHref(lang: Lang, path: string): string {
  if (lang === "no") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** hreflang alternates for a page, given its unprefixed path (e.g. "/medlemskap"). */
export function langAlternates(path: string) {
  return {
    languages: {
      no: path,
      en: path === "/" ? "/en" : `/en${path}`,
      "x-default": path,
    },
  };
}
