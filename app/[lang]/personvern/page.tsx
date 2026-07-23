import type { Metadata } from "next";
import { asLang, langAlternates, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { LegalPage, type LegalSection } from "../LegalPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Personvern — INNE Golf Bergen", "Privacy — INNE Golf Bergen"),
    description: t(
      lang,
      "Personvernerklæring for INNE Golf Bergen (IN GOLF BERGEN DA, org.nr. 933 998 584).",
      "Privacy policy for INNE Golf Bergen (IN GOLF BERGEN DA, org. no. 933 998 584).",
    ),
    alternates: langAlternates("/personvern"),
  };
}

const SECTIONS: LegalSection[] = [
  {
    id: "pv-01",
    num: "01",
    title: { no: "Behandlingsansvarlig", en: "Data controller" },
    toc: { no: "Behandlingsansvarlig", en: "Data controller" },
    blocks: [
      {
        kind: "p",
        no: "IN GOLF BERGEN DA er behandlingsansvarlig for personopplysningene vi behandler når du booker, blir medlem, kjøper verdikort eller melder deg på en turnering hos INNE Golf Bergen.",
        en: "IN GOLF BERGEN DA is the data controller for the personal data we process when you book, become a member, buy a voucher or enter a tournament at INNE Golf Bergen.",
      },
      { kind: "org" },
    ],
  },
  {
    id: "pv-02",
    num: "02",
    title: { no: "Hvilke opplysninger vi behandler", en: "What data we process" },
    toc: { no: "Opplysninger vi behandler", en: "Data we process" },
    blocks: [
      {
        kind: "p",
        no: "Vi behandler kun opplysninger som er nødvendige for å levere tjenestene våre. Avhengig av hva du gjør, kan dette være:",
        en: "We only process data that is necessary to provide our services. Depending on what you do, this may include:",
      },
      {
        kind: "ul",
        no: [
          "Navn, e-postadresse og telefonnummer.",
          "Booking-, kjøps- og medlemskapshistorikk.",
          "Verdikort- og betalingsopplysninger (kortopplysninger håndteres av betalingsleverandøren – vi lagrer dem ikke).",
          "Meldinger og henvendelser du sender oss.",
        ],
        en: [
          "Name, email address and phone number.",
          "Booking, purchase and membership history.",
          "Voucher and payment details (card details are handled by the payment provider – we do not store them).",
          "Messages and enquiries you send us.",
        ],
      },
    ],
  },
  {
    id: "pv-03",
    num: "03",
    title: { no: "Formål og rettslig grunnlag", en: "Purpose and legal basis" },
    toc: { no: "Formål og grunnlag", en: "Purpose and basis" },
    blocks: [
      {
        kind: "p",
        no: "Vi bruker opplysningene til å gjennomføre bookinger og kjøp, administrere medlemskap og verdikort, gi kundeservice og oppfylle lovpålagte plikter. Behandlingen er basert på å oppfylle avtalen med deg, rettslige forpliktelser som regnskapsplikt, og vår berettigede interesse i å drive og forbedre virksomheten. Eventuell markedsføring skjer kun med ditt samtykke, som du når som helst kan trekke tilbake.",
        en: "We use the data to carry out bookings and purchases, administer memberships and vouchers, provide customer service and meet statutory obligations. The processing is based on performing the agreement with you, legal obligations such as accounting duties, and our legitimate interest in operating and improving the business. Any marketing is only sent with your consent, which you can withdraw at any time.",
      },
    ],
  },
  {
    id: "pv-04",
    num: "04",
    title: { no: "Databehandlere og utlevering", en: "Data processors and disclosure" },
    toc: { no: "Databehandlere", en: "Data processors" },
    blocks: [
      {
        kind: "p",
        no: "Vi deler opplysninger bare når det er nødvendig. Booking og betaling håndteres gjennom bookingplattformen vår (Alba) og betalingsleverandører, som behandler opplysninger på våre vegne under databehandleravtaler. Vi selger aldri personopplysninger, og utleverer dem ellers kun når loven krever det.",
        en: "We only share data when it is necessary. Booking and payment are handled through our booking platform (Alba) and payment providers, which process data on our behalf under data-processing agreements. We never sell personal data, and otherwise disclose it only when required by law.",
      },
    ],
  },
  {
    id: "pv-05",
    num: "05",
    title: { no: "Lagringstid", en: "Retention" },
    toc: { no: "Lagringstid", en: "Retention" },
    blocks: [
      {
        kind: "p",
        no: "Vi lagrer personopplysninger så lenge det er nødvendig for formålet de ble samlet inn for. Booking- og kundeopplysninger slettes når de ikke lenger trengs, mens regnskapsmateriale oppbevares så lenge bokføringsloven krever – som hovedregel fem år.",
        en: "We store personal data for as long as it is necessary for the purpose it was collected for. Booking and customer data is deleted when it is no longer needed, while accounting records are kept for as long as the Bookkeeping Act requires – as a rule five years.",
      },
    ],
  },
  {
    id: "pv-06",
    num: "06",
    title: { no: "Informasjonskapsler", en: "Cookies" },
    toc: { no: "Informasjonskapsler", en: "Cookies" },
    blocks: [
      {
        kind: "p",
        no: "Nettstedet vårt bruker ikke informasjonskapsler eller sporingsverktøy. Booking og betaling foregår på plattformen til leverandøren vår (Alba), som har sin egen personvernerklæring.",
        en: "Our website does not use cookies or tracking tools. Booking and payment take place on our provider's platform (Alba), which has its own privacy policy.",
      },
    ],
  },
  {
    id: "pv-07",
    num: "07",
    title: { no: "Dine rettigheter", en: "Your rights" },
    toc: { no: "Dine rettigheter", en: "Your rights" },
    blocks: [
      {
        kind: "links",
        no: [
          "Du har rett til innsyn i, retting og sletting av egne personopplysninger, og til å begrense eller protestere mot behandlingen, samt til dataportabilitet. Har du gitt et samtykke, kan du når som helst trekke det tilbake. For å bruke rettighetene dine, kontakt oss på ",
          { text: SITE.email, href: `mailto:${SITE.email}` },
          ". Mener du at vi behandler opplysningene dine i strid med regelverket, kan du klage til Datatilsynet (",
          { text: "datatilsynet.no", href: "https://www.datatilsynet.no" },
          ").",
        ],
        en: [
          "You have the right to access, correct and delete your own personal data, and to restrict or object to the processing, as well as to data portability. If you have given consent, you can withdraw it at any time. To exercise your rights, contact us at ",
          { text: SITE.email, href: `mailto:${SITE.email}` },
          ". If you believe we process your data in breach of the rules, you can lodge a complaint with the Norwegian Data Protection Authority (",
          { text: "datatilsynet.no", href: "https://www.datatilsynet.no" },
          ").",
        ],
      },
    ],
  },
  {
    id: "pv-08",
    num: "08",
    title: { no: "Kontakt", en: "Contact" },
    toc: { no: "Kontakt", en: "Contact" },
    blocks: [
      {
        kind: "links",
        no: [
          "Spørsmål om personvern rettes til ",
          { text: SITE.email, href: `mailto:${SITE.email}` },
          `. ${SITE.legalName} · Org.nr. ${SITE.orgNr}.`,
        ],
        en: [
          "Privacy questions can be directed to ",
          { text: SITE.email, href: `mailto:${SITE.email}` },
          `. ${SITE.legalName} · Org. no. ${SITE.orgNr}.`,
        ],
      },
    ],
  },
];

export default async function PersonvernPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <LegalPage
      lang={lang}
      eyebrow={{ no: "Personvern", en: "Privacy" }}
      title={{ no: "Personvern.", en: "Privacy." }}
      lead={t(
        lang,
        "Slik behandler INNE Golf Bergen personopplysninger du deler når du booker, blir medlem eller kontakter oss.",
        "How INNE Golf Bergen handles the personal data you share when you book, join or contact us.",
      )}
      sections={SECTIONS}
    />
  );
}
