import { type Lang, t } from "./i18n";

export const SITE = {
  name: "INNE Golf Bergen",
  legalName: "IN GOLF BERGEN DA",
  orgNr: "933\u00a0998\u00a0584", // NBSP joins — the number never line-breaks
  email: "post@innegolfbergen.no",
  instagram: "https://instagram.com/innegolfbergen",
  facebook: "https://www.facebook.com/profile.php?id=61564888844128",
  phones: ["913\u00a030\u00a0248", "404\u00a073\u00a0935", "995\u00a038\u00a0913"],
  phoneHrefs: ["+4791330248", "+4740473935", "+4799538913"],
  bookAsane: "https://albaplay.com/en/venue/ingolf-bergen",
  bookSandviken: "https://albaplay.com/en/venue/inne-golf-bergen-avd-sandviken",
  membership: "https://albaplay.com/en/venue/ingolf-bergen/offers/membership",
  gavekortBase: "https://albaplay.com/en/venue/ingolf-bergen/offers/vouchers",
  gavekortSandviken: "https://albaplay.com/en/venue/inne-golf-bergen-avd-sandviken/offers/vouchers",
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
  priceRange: "100–400 kr",
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
