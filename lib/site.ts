import kontakt from "@/content/kontakt.json";
import { krRange, phoneDisplay, phoneHref } from "./format";
import { type Lang, t } from "./i18n";
import { PRISER } from "./prices";

/**
 * Origin for absolute URLs in metadata, sitemap and robots. innegolfbergen.no
 * still points at the old site, so hardcoding it breaks share previews — the
 * scrapers (iMessage, Messenger, WhatsApp, Slack) would fetch og:image from a
 * host that 404s it. On Vercel this env var is the project's production host:
 * the .vercel.app domain today, and it flips to innegolfbergen.no
 * automatically the day the domain moves over. Fallback covers local `next
 * build` outside Vercel.
 */
export const SITE_ORIGIN = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://innegolfbergen.no";

/* Contact details and booking links come from content/kontakt.json (edited by
   the owner in /admin); legal identity and addresses stay hardcoded - changing
   those is a developer-level event. Phones are stored as bare 8-digit strings
   so the owner cannot break the NBSP typography. */
export const SITE = {
  name: "INNE Golf Bergen",
  legalName: "IN GOLF BERGEN DA",
  orgNr: "933\u00a0998\u00a0584", // NBSP joins — the number never line-breaks
  email: kontakt.email,
  instagram: kontakt.instagram,
  facebook: kontakt.facebook,
  phones: kontakt.phones.map(phoneDisplay),
  phoneHrefs: kontakt.phones.map(phoneHref),
  bookAsane: kontakt.bookAsane,
  bookSandviken: kontakt.bookSandviken,
  membership: kontakt.membership,
  gavekortBase: kontakt.gavekortBase,
  gavekortSandviken: kontakt.gavekortSandviken,
} as const;

/** Builds a mailto: link to post@ with a prefilled subject and body. */
export function mailtoHref(subject: string, body: string): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Builds a mailto: link to post@ with only a subject. */
export function mailtoSubject(subject: string): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}

/** Formats "Key: value" rows into a mail body. */
export function mailBody(rows: [string, FormDataEntryValue | null][], intro?: string, outro?: string): string {
  const lines = rows.map(([k, v]) => `${k}: ${v ?? ""}`).join("\n");
  return [intro, lines, outro].filter(Boolean).join("\n\n");
}

const location = (
  lang: Lang,
  id: string,
  name: string,
  description: string,
  image: string,
  street: string,
  postalCode: string,
  locality: string,
) => ({
  "@type": "SportsActivityLocation",
  "@id": `https://innegolfbergen.no/#${id}`,
  name,
  description,
  image,
  url: "https://innegolfbergen.no/",
  email: SITE.email,
  priceRange: krRange(PRISER.sim.halvtimeMin, PRISER.sim.timeMax),
  currenciesAccepted: "NOK",
  paymentAccepted: t(lang, "Kort, Vipps", "Card, Vipps"),
  address: {
    "@type": "PostalAddress",
    streetAddress: street,
    postalCode,
    addressLocality: locality,
    addressRegion: "Vestland",
    addressCountry: "NO",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: [SITE.instagram],
});

export const locationsJsonld = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@graph": [
    location(
      lang,
      "asane",
      "INNE Golf Bergen — Åsane",
      t(
        lang,
        "Innendørs golfsimulatorsenter med TrackMan iO i Åsane, Bergen. Selvbetjent, åpent hele døgnet.",
        "Indoor golf simulator venue with TrackMan iO in Åsane, Bergen. Self-serve, open 24/7.",
      ),
      "https://innegolfbergen.no/assets/photos/bays-wide.jpg",
      "Haukedalen 1",
      "5121",
      "Ulset",
    ),
    location(
      lang,
      "sandviken",
      "INNE Golf Bergen — Sandviken",
      t(
        lang,
        "Innendørs golfsimulatorsenter med TrackMan iO og 5 m widescreen i Sandviken, Bergen. Selvbetjent, åpent hele døgnet.",
        "Indoor golf simulator venue with TrackMan iO and a 5 m widescreen in Sandviken, Bergen. Self-serve, open 24/7.",
      ),
      "https://innegolfbergen.no/assets/photos/bay-screen-stools.jpg",
      "Sandviksbodene 9",
      "5035",
      "Bergen",
    ),
  ],
});
