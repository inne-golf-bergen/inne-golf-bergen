export const SITE = {
  name: "INNE Golf Bergen",
  legalName: "IN GOLF BERGEN DA",
  orgNr: "933 998 584",
  email: "post@innegolfbergen.no",
  instagram: "https://instagram.com/innegolfbergen",
  facebook: "https://www.facebook.com/profile.php?id=61564888844128",
  phones: ["913 30 248", "404 73 935", "995 38 913"],
  phoneHrefs: ["+4791330248", "+4740473935", "+4799538913"],
  bookAsane: "https://innegolfbergen.no/book/asane",
  bookSandviken: "https://innegolfbergen.no/book/sandviken",
  gavekortBase: "https://innegolfbergen.no/gavekort",
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
  paymentAccepted: "Kort, Vipps",
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

export const LOCATIONS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    location(
      "asane",
      "INNE Golf Bergen — Åsane",
      "Innendørs golfsimulatorsenter med TrackMan iO i Åsane, Bergen. Selvbetjent, åpent hele døgnet.",
      "https://innegolfbergen.no/assets/photos/bays-wide.jpg",
      "Haukedalen 1",
      "5121",
      "Ulset",
    ),
    location(
      "sandviken",
      "INNE Golf Bergen — Sandviken",
      "Innendørs golfsimulatorsenter med TrackMan iO og 5 m widescreen i Sandviken, Bergen. Selvbetjent, åpent hele døgnet.",
      "https://innegolfbergen.no/assets/photos/bay-screen-stools.jpg",
      "Sandviksbodene 9",
      "5035",
      "Bergen",
    ),
  ],
};
