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
    title: t(lang, "Kjøpsvilkår — INNE Golf Bergen", "Terms — INNE Golf Bergen"),
    description: t(lang, "Kjøpsvilkår for INNE Golf Bergen.", "Terms for INNE Golf Bergen."),
    alternates: langAlternates("/vilkar"),
  };
}

/*
 * INNE's sales terms, supplied verbatim. The parties clause renders the
 * registered company name and org. number from SITE so the whole site stays
 * consistent (the source draft abbreviated it to "In golf DA").
 */
const SECTIONS: LegalSection[] = [
  {
    id: "vilkar-01",
    num: "01",
    title: { no: "Avtalen", en: "The agreement" },
    toc: { no: "Avtalen", en: "The agreement" },
    blocks: [
      {
        kind: "p",
        no: "Avtalen består av disse salgsbetingelsene, opplysninger gitt i bestillingsløsningen og eventuelt særskilt avtalte vilkår. Ved eventuell motstrid mellom opplysningene, går det som særskilt er avtalt mellom partene foran, så fremt det ikke strider mot ufravikelig lovgivning.",
        en: "The agreement consists of these sales terms, the information given in the ordering solution and any separately agreed terms. In the event of any conflict between the information, whatever has been separately agreed between the parties takes precedence, provided it does not conflict with mandatory legislation.",
      },
      {
        kind: "p",
        no: "Avtalen vil i tillegg bli utfylt av relevante lovbestemmelser som regulerer kjøp av varer mellom næringsdrivende og forbrukere.",
        en: "The agreement will additionally be supplemented by the relevant statutory provisions governing the purchase of goods between businesses and consumers.",
      },
    ],
  },
  {
    id: "vilkar-02",
    num: "02",
    title: { no: "Partene", en: "The parties" },
    toc: { no: "Partene", en: "The parties" },
    blocks: [
      {
        kind: "p",
        no: `Selger er ${SITE.legalName}, org.nr. ${SITE.orgNr}, og betegnes i det følgende som selger/selgeren.`,
        en: `The seller is ${SITE.legalName}, org. no. ${SITE.orgNr}, and is referred to below as the seller.`,
      },
      {
        kind: "p",
        no: "Kjøper er den forbrukeren som foretar bestillingen, og betegnes i det følgende som kjøper/kjøperen.",
        en: "The buyer is the consumer who places the order, and is referred to below as the buyer.",
      },
    ],
  },
  {
    id: "vilkar-03",
    num: "03",
    title: { no: "Pris", en: "Price" },
    toc: { no: "Pris", en: "Price" },
    blocks: [
      {
        kind: "p",
        no: "Den oppgitte prisen for varen og tjenester er den totale prisen kjøper skal betale. Denne prisen inkluderer alle avgifter og tilleggskostnader. Ytterligere kostnader som selger før kjøpet ikke har informert om, skal kjøper ikke bære.",
        en: "The stated price for the goods and services is the total price the buyer is to pay. This price includes all taxes and additional costs. The buyer shall not bear any further costs that the seller has not informed about before the purchase.",
      },
    ],
  },
  {
    id: "vilkar-04",
    num: "04",
    title: { no: "Avtaleinngåelse", en: "Formation of the agreement" },
    toc: { no: "Avtaleinngåelse", en: "Formation" },
    blocks: [
      {
        kind: "p",
        no: "Avtalen er bindende for begge parter når kjøperen har sendt sin bestilling til selgeren.",
        en: "The agreement is binding on both parties once the buyer has submitted the order to the seller.",
      },
      {
        kind: "p",
        no: "Avtalen er likevel ikke bindende hvis det har forekommet skrive- eller tastefeil i tilbudet fra selgeren i bestillingsløsningen i nettbutikken eller i kjøperens bestilling, og den annen part innså eller burde ha innsett at det forelå en slik feil.",
        en: "The agreement is nevertheless not binding if there has been a writing or keying error in the seller's offer in the online store's ordering solution, or in the buyer's order, and the other party realised or ought to have realised that such an error existed.",
      },
    ],
  },
  {
    id: "vilkar-05",
    num: "05",
    title: { no: "Betalingen", en: "Payment" },
    toc: { no: "Betaling", en: "Payment" },
    blocks: [
      {
        kind: "p",
        no: "Selgeren kan kreve betaling for varen fra det tidspunkt den blir sendt fra selgeren til kjøperen.",
        en: "The seller may demand payment for the goods from the time they are dispatched from the seller to the buyer.",
      },
      {
        kind: "p",
        no: "Dersom kjøperen bruker kredittkort eller debetkort ved betaling, kan selgeren reservere kjøpesummen på kortet ved bestilling. Kortet blir belastet samme dag som varen sendes.",
        en: "If the buyer uses a credit card or debit card to pay, the seller may reserve the purchase amount on the card when the order is placed. The card is charged on the same day the goods are dispatched.",
      },
      {
        kind: "p",
        no: "Ved betaling med faktura, blir fakturaen til kjøperen utstedt ved forsendelse av varen. Betalingsfristen fremgår av fakturaen og er på minimum 14 dager fra mottak.",
        en: "When paying by invoice, the invoice to the buyer is issued upon dispatch of the goods. The payment deadline appears on the invoice and is a minimum of 14 days from receipt.",
      },
      {
        kind: "p",
        no: "Kjøpere under 18 år kan ikke betale med etterfølgende faktura.",
        en: "Buyers under the age of 18 cannot pay by subsequent invoice.",
      },
    ],
  },
  {
    id: "vilkar-06",
    num: "06",
    title: { no: "Levering", en: "Delivery" },
    toc: { no: "Levering", en: "Delivery" },
    blocks: [
      {
        kind: "p",
        no: "Levering er skjedd når kjøperen, eller hans representant, har overtatt tingen.",
        en: "Delivery has taken place when the buyer, or the buyer's representative, has taken possession of the item.",
      },
      {
        kind: "p",
        no: "Hvis ikke leveringstidspunkt fremgår av bestillingsløsningen, skal selgeren levere varen til kjøper uten unødig opphold og senest 30 dager etter bestillingen fra kunden. Varen skal leveres hos kjøperen med mindre annet er særskilt avtalt mellom partene.",
        en: "If no delivery time is stated in the ordering solution, the seller shall deliver the goods to the buyer without undue delay and no later than 30 days after the customer's order. The goods shall be delivered to the buyer unless otherwise separately agreed between the parties.",
      },
    ],
  },
  {
    id: "vilkar-07",
    num: "07",
    title: { no: "Risikoen for varen", en: "Risk for the goods" },
    toc: { no: "Risiko", en: "Risk" },
    blocks: [
      {
        kind: "p",
        no: "Risikoen for varen går over på kjøper når han, eller hans representant, har fått varene levert i tråd med punkt 6.",
        en: "The risk for the goods passes to the buyer when the buyer, or the buyer's representative, has had the goods delivered in accordance with clause 6.",
      },
    ],
  },
  {
    id: "vilkar-08",
    num: "08",
    title: { no: "Angrerett", en: "Right of withdrawal" },
    toc: { no: "Angrerett", en: "Right of withdrawal" },
    blocks: [
      {
        kind: "p",
        no: "Med mindre avtalen er unntatt fra angrerett, kan kjøperen angre kjøpet av varen i henhold til angrerettloven.",
        en: "Unless the agreement is exempt from the right of withdrawal, the buyer may withdraw from the purchase of the goods in accordance with the Right of Withdrawal Act.",
      },
      {
        kind: "p",
        no: "Kjøperen må gi selger melding om bruk av angreretten innen 14 dager fra fristen begynner å løpe. I fristen inkluderes alle kalenderdager. Dersom fristen ender på en lørdag, helligdag eller høytidsdag forlenges fristen til nærmeste virkedag.",
        en: "The buyer must notify the seller of the use of the right of withdrawal within 14 days from when the deadline begins to run. The deadline includes all calendar days. If the deadline ends on a Saturday, public holiday or feast day, the deadline is extended to the nearest working day.",
      },
      {
        kind: "p",
        no: "Angrefristen anses overholdt dersom melding er sendt før utløpet av fristen. Kjøper har bevisbyrden for at angreretten er blitt gjort gjeldende, og meldingen bør derfor skje skriftlig (angrerettskjema, e-post eller brev).",
        en: "The withdrawal deadline is considered met if the notice is sent before the deadline expires. The buyer bears the burden of proof that the right of withdrawal has been exercised, and the notice should therefore be given in writing (withdrawal form, email or letter).",
      },
      {
        kind: "p",
        no: "Angrefristen begynner å løpe:",
        en: "The withdrawal deadline begins to run:",
      },
      {
        kind: "ul",
        no: [
          "Ved kjøp av enkeltstående varer vil angrefristen løpe fra dagen etter varen(e) er mottatt.",
          "Selges et abonnement, eller innebærer avtalen regelmessig levering av identiske varer, løper fristen fra dagen etter første forsendelse er mottatt.",
          "Består kjøpet av flere leveranser, vil angrefristen løpe fra dagen etter siste leveranse er mottatt.",
        ],
        en: [
          "For the purchase of single items, the withdrawal deadline runs from the day after the item(s) is/are received.",
          "If a subscription is sold, or the agreement involves the regular delivery of identical goods, the deadline runs from the day after the first shipment is received.",
          "If the purchase consists of several deliveries, the withdrawal deadline runs from the day after the last delivery is received.",
        ],
      },
      {
        kind: "p",
        no: "Angrefristen utvides til 12 måneder etter utløpet av den opprinnelige fristen dersom selger ikke før avtaleinngåelsen opplyser om at det foreligger angrerett og standardisert angreskjema. Tilsvarende gjelder ved manglende opplysning om vilkår, tidsfrister og fremgangsmåte for å benytte angreretten. Sørger den næringsdrivende for å gi opplysningene i løpet av disse 12 månedene, utløper angrefristen likevel 14 dager etter den dagen kjøperen mottok opplysningene.",
        en: "The withdrawal deadline is extended to 12 months after the expiry of the original deadline if the seller, before the agreement is entered into, does not inform about the existence of the right of withdrawal and provide the standardised withdrawal form. The same applies where there is a lack of information about the terms, deadlines and procedure for using the right of withdrawal. If the business provides the information during these 12 months, the withdrawal deadline nevertheless expires 14 days after the day the buyer received the information.",
      },
      {
        kind: "p",
        no: "Ved bruk av angreretten må varen leveres tilbake til selgeren uten unødig opphold og senest 14 dager fra melding om bruk av angreretten er gitt. Kjøper dekker de direkte kostnadene ved å returnere varen, med mindre annet er avtalt eller selger har unnlatt å opplyse om at kjøper skal dekke returkostnadene. Selgeren kan ikke fastsette gebyr for kjøperens bruk av angreretten.",
        en: "When exercising the right of withdrawal, the goods must be returned to the seller without undue delay and no later than 14 days from when notice of the use of the right of withdrawal was given. The buyer covers the direct costs of returning the goods, unless otherwise agreed or the seller has failed to state that the buyer is to cover the return costs. The seller cannot impose a fee for the buyer's use of the right of withdrawal.",
      },
      {
        kind: "p",
        no: "Kjøper kan prøve eller teste varen på en forsvarlig måte for å fastslå varens art, egenskaper og funksjon, uten at angreretten faller bort. Dersom prøving eller test av varen går utover hva som er forsvarlig og nødvendig, kan kjøperen bli ansvarlig for eventuell redusert verdi på varen.",
        en: "The buyer may examine or test the goods in a reasonable manner to determine the nature, characteristics and function of the goods without losing the right of withdrawal. If examining or testing the goods goes beyond what is reasonable and necessary, the buyer may become liable for any reduction in the value of the goods.",
      },
      {
        kind: "p",
        no: "Selgeren er forpliktet til å tilbakebetale kjøpesummen til kjøperen uten unødig opphold, og senest 14 dager fra selgeren fikk melding om kjøperens beslutning om å benytte angreretten. Selger har rett til å holde tilbake betalingen til han har mottatt varene fra kjøperen, eller til kjøper har lagt frem dokumentasjon for at varene er sendt tilbake.",
        en: "The seller is obliged to refund the purchase amount to the buyer without undue delay, and no later than 14 days from when the seller received notice of the buyer's decision to use the right of withdrawal. The seller has the right to withhold payment until the goods have been received from the buyer, or until the buyer has provided documentation that the goods have been returned.",
      },
    ],
  },
  {
    id: "vilkar-09",
    num: "09",
    title: {
      no: "Forsinkelse og manglende levering — kjøperens rettigheter og frist for å melde krav",
      en: "Delay and non-delivery — the buyer's rights and deadline for reporting claims",
    },
    toc: { no: "Forsinkelse og manglende levering", en: "Delay and non-delivery" },
    blocks: [
      {
        kind: "p",
        no: "Dersom selgeren ikke leverer varen eller leverer den for sent i henhold til avtalen mellom partene, og dette ikke skyldes kjøperen eller forhold på kjøperens side, kan kjøperen i henhold til reglene i forbrukerkjøpslovens kapittel 5 etter omstendighetene holde kjøpesummen tilbake, kreve oppfyllelse, heve avtalen og/eller kreve erstatning fra selgeren.",
        en: "If the seller does not deliver the goods or delivers them late in accordance with the agreement between the parties, and this is not due to the buyer or circumstances on the buyer's side, the buyer may, in accordance with the rules in Chapter 5 of the Consumer Purchases Act and depending on the circumstances, withhold the purchase amount, demand performance, cancel the agreement and/or claim compensation from the seller.",
      },
      {
        kind: "p",
        no: "Ved krav om misligholdsbeføyelser bør meldingen av bevishensyn være skriftlig (for eksempel e-post).",
        en: "When claiming remedies for breach, the notice should, for evidentiary reasons, be in writing (for example email).",
      },
      { kind: "sub", no: "Oppfyllelse", en: "Performance" },
      {
        kind: "p",
        no: "Kjøper kan fastholde kjøpet og kreve oppfyllelse fra selger. Kjøper kan imidlertid ikke kreve oppfyllelse dersom det foreligger en hindring som selgeren ikke kan overvinne, eller dersom oppfyllelse vil medføre en så stor ulempe eller kostnad for selger at det står i vesentlig misforhold til kjøperens interesse i at selgeren oppfyller. Skulle vanskene falle bort innen rimelig tid, kan kjøper likevel kreve oppfyllelse.",
        en: "The buyer may maintain the purchase and demand performance from the seller. However, the buyer cannot demand performance if there is an obstacle that the seller cannot overcome, or if performance would cause the seller such great inconvenience or cost that it is substantially disproportionate to the buyer's interest in the seller performing. Should the difficulties disappear within a reasonable time, the buyer may nevertheless demand performance.",
      },
      {
        kind: "p",
        no: "Kjøperen taper sin rett til å kreve oppfyllelse om han eller hun venter urimelig lenge med å fremme kravet.",
        en: "The buyer loses the right to demand performance if they wait an unreasonably long time before making the claim.",
      },
      { kind: "sub", no: "Heving", en: "Cancellation" },
      {
        kind: "p",
        no: "Dersom selgeren ikke leverer varen på leveringstidspunktet, skal kjøperen oppfordre selger til å levere innen en rimelig tilleggsfrist for oppfyllelse. Dersom selger ikke leverer varen innen tilleggsfristen, kan kjøperen heve kjøpet.",
        en: "If the seller does not deliver the goods at the time of delivery, the buyer shall call on the seller to deliver within a reasonable additional period for performance. If the seller does not deliver the goods within the additional period, the buyer may cancel the purchase.",
      },
      {
        kind: "p",
        no: "Kjøper kan imidlertid heve kjøpet umiddelbart hvis selger nekter å levere varen. Tilsvarende gjelder dersom levering til avtalt tid var avgjørende for inngåelsen av avtalen, eller dersom kjøperen har underrettet selger om at leveringstidspunktet er avgjørende.",
        en: "However, the buyer may cancel the purchase immediately if the seller refuses to deliver the goods. The same applies if delivery at the agreed time was decisive for entering into the agreement, or if the buyer has notified the seller that the time of delivery is decisive.",
      },
      {
        kind: "p",
        no: "Leveres tingen etter tilleggsfristen forbrukeren har satt eller etter leveringstidspunktet som var avgjørende for inngåelsen av avtalen, må krav om heving gjøres gjeldende innen rimelig tid etter at kjøperen fikk vite om leveringen.",
        en: "If the item is delivered after the additional period the consumer has set, or after the time of delivery that was decisive for entering into the agreement, a claim for cancellation must be made within a reasonable time after the buyer learned of the delivery.",
      },
      { kind: "sub", no: "Erstatning", en: "Compensation" },
      {
        kind: "p",
        no: "Kjøperen kan kreve erstatning for lidt tap som følge av forsinkelsen. Dette gjelder imidlertid ikke dersom selgeren godtgjør at forsinkelsen skyldes hindring utenfor selgers kontroll som ikke med rimelighet kunne blitt tatt i betraktning på avtaletiden, unngått, eller overvunnet følgene av.",
        en: "The buyer may claim compensation for loss suffered as a result of the delay. However, this does not apply if the seller proves that the delay is due to an obstacle beyond the seller's control that could not reasonably have been taken into account at the time of the agreement, avoided, or the consequences of which could not have been overcome.",
      },
    ],
  },
  {
    id: "vilkar-10",
    num: "10",
    title: {
      no: "Mangel ved varen — kjøperens rettigheter og reklamasjonsfrist",
      en: "Defects in the goods — the buyer's rights and complaint deadline",
    },
    toc: { no: "Mangel ved varen", en: "Defects in the goods" },
    blocks: [
      {
        kind: "p",
        no: "Hvis det foreligger en mangel ved varen må kjøper innen rimelig tid etter at den ble oppdaget eller burde ha blitt oppdaget, gi selger melding om at han eller hun vil påberope seg mangelen. Kjøper har alltid reklamert tidsnok dersom det skjer innen 2 mnd. fra mangelen ble oppdaget eller burde blitt oppdaget. Reklamasjon kan skje senest to år etter at kjøper overtok varen. Dersom varen eller deler av den er ment å vare vesentlig lenger enn to år, er reklamasjonsfristen fem år.",
        en: "If there is a defect in the goods, the buyer must, within a reasonable time after it was discovered or ought to have been discovered, notify the seller that they will invoke the defect. The buyer has always complained in time if it happens within 2 months from when the defect was discovered or ought to have been discovered. A complaint may be made no later than two years after the buyer took over the goods. If the goods or parts of them are intended to last significantly longer than two years, the complaint deadline is five years.",
      },
      {
        kind: "p",
        no: "Dersom varen har en mangel og dette ikke skyldes kjøperen eller forhold på kjøperens side, kan kjøperen i henhold til reglene i forbrukerkjøpsloven kapittel 6 etter omstendighetene holde kjøpesummen tilbake, velge mellom retting og omlevering, kreve prisavslag, kreve avtalen hevet og/eller kreve erstatning fra selgeren.",
        en: "If the goods have a defect and this is not due to the buyer or circumstances on the buyer's side, the buyer may, in accordance with the rules in Chapter 6 of the Consumer Purchases Act and depending on the circumstances, withhold the purchase amount, choose between repair and replacement, demand a price reduction, demand cancellation of the agreement and/or claim compensation from the seller.",
      },
      {
        kind: "p",
        no: "Reklamasjon til selgeren bør skje skriftlig.",
        en: "A complaint to the seller should be made in writing.",
      },
      { kind: "sub", no: "Retting eller omlevering", en: "Repair or replacement" },
      {
        kind: "p",
        no: "Kjøperen kan velge mellom å kreve mangelen rettet eller levering av tilsvarende ting. Selger kan likevel motsette seg kjøperens krav dersom gjennomføringen av kravet er umulig eller volder selgeren urimelige kostnader. Retting eller omlevering skal foretas innen rimelig tid. Selger har i utgangspunktet ikke rett til å foreta mer enn to avhjelpsforsøk for samme mangel.",
        en: "The buyer may choose between demanding that the defect be repaired or the delivery of an equivalent item. The seller may nevertheless oppose the buyer's claim if carrying out the claim is impossible or causes the seller unreasonable costs. Repair or replacement shall be carried out within a reasonable time. As a general rule, the seller is not entitled to make more than two remedy attempts for the same defect.",
      },
      { kind: "sub", no: "Prisavslag", en: "Price reduction" },
      {
        kind: "p",
        no: "Kjøper kan kreve et passende prisavslag dersom varen ikke blir rettet eller omlevert. Dette innebærer at forholdet mellom nedsatt og avtalt pris svarer til forholdet mellom tingens verdi i mangelfull og kontraktsmessig stand. Dersom særlige grunner taler for det, kan prisavslaget i stedet settes lik mangelens betydning for kjøperen.",
        en: "The buyer may demand an appropriate price reduction if the goods are not repaired or replaced. This means that the ratio between the reduced and agreed price corresponds to the ratio between the value of the item in defective and contractual condition. If special grounds so warrant, the price reduction may instead be set equal to the significance of the defect for the buyer.",
      },
      { kind: "sub", no: "Heving", en: "Cancellation" },
      {
        kind: "p",
        no: "Dersom varen ikke er rettet eller omlevert, kan kjøperen også heve kjøpet når mangelen ikke er uvesentlig.",
        en: "If the goods have not been repaired or replaced, the buyer may also cancel the purchase when the defect is not insignificant.",
      },
    ],
  },
  {
    id: "vilkar-11",
    num: "11",
    title: {
      no: "Selgerens rettigheter ved kjøperens mislighold",
      en: "The seller's rights in the event of the buyer's breach",
    },
    toc: { no: "Selgerens rettigheter", en: "The seller's rights" },
    blocks: [
      {
        kind: "p",
        no: "Dersom kjøperen ikke betaler eller oppfyller de øvrige pliktene etter avtalen eller loven, og dette ikke skyldes selgeren eller forhold på selgerens side, kan selgeren i henhold til reglene i forbrukerkjøpsloven kapittel 9 etter omstendighetene holde varen tilbake, kreve oppfyllelse av avtalen, kreve avtalen hevet samt kreve erstatning fra kjøperen. Selgeren vil også etter omstendighetene kunne kreve renter ved forsinket betaling, inkassogebyr og et rimelig gebyr ved uavhentede varer.",
        en: "If the buyer does not pay or fulfil the other obligations under the agreement or the law, and this is not due to the seller or circumstances on the seller's side, the seller may, in accordance with the rules in Chapter 9 of the Consumer Purchases Act and depending on the circumstances, withhold the goods, demand performance of the agreement, demand cancellation of the agreement and claim compensation from the buyer. Depending on the circumstances, the seller may also claim interest on late payment, debt-collection charges and a reasonable fee for uncollected goods.",
      },
      { kind: "sub", no: "Oppfyllelse", en: "Performance" },
      {
        kind: "p",
        no: "Selger kan fastholde kjøpet og kreve at kjøperen betaler kjøpesummen. Er varen ikke levert, taper selgeren sin rett dersom han venter urimelig lenge med å fremme kravet.",
        en: "The seller may maintain the purchase and require the buyer to pay the purchase amount. If the goods have not been delivered, the seller loses the right if they wait an unreasonably long time before making the claim.",
      },
      { kind: "sub", no: "Heving", en: "Cancellation" },
      {
        kind: "p",
        no: "Selger kan heve avtalen dersom det foreligger vesentlig betalingsmislighold eller annet vesentlig mislighold fra kjøperens side. Selger kan likevel ikke heve dersom hele kjøpesummen er betalt. Fastsetter selger en rimelig tilleggsfrist for oppfyllelse og kjøperen ikke betaler innen denne fristen, kan selger heve kjøpet.",
        en: "The seller may cancel the agreement if there is a material payment default or other material breach on the buyer's side. However, the seller cannot cancel if the entire purchase amount has been paid. If the seller sets a reasonable additional period for performance and the buyer does not pay within this deadline, the seller may cancel the purchase.",
      },
      { kind: "sub", no: "Renter ved forsinket betaling / inkassogebyr", en: "Interest on late payment / debt-collection charges" },
      {
        kind: "p",
        no: "Dersom kjøperen ikke betaler kjøpesummen i henhold til avtalen, kan selger kreve renter av kjøpesummen etter forsinkelsesrenteloven. Ved manglende betaling kan kravet, etter forutgående varsel, bli sendt til inkasso. Kjøper kan da bli holdt ansvarlig for gebyr etter inkassoloven.",
        en: "If the buyer does not pay the purchase amount in accordance with the agreement, the seller may claim interest on the purchase amount under the Late Payment Interest Act. In the event of non-payment, the claim may, after prior notice, be sent to debt collection. The buyer may then be held liable for charges under the Debt Collection Act.",
      },
      { kind: "sub", no: "Gebyr ved uavhentede ikke-forskuddsbetalte varer", en: "Fee for uncollected goods not paid in advance" },
      {
        kind: "p",
        no: "Dersom kjøperen unnlater å hente ubetalte varer, kan selger belaste kjøper med et gebyr. Gebyret skal maksimalt dekke selgerens faktiske utlegg for å levere varen til kjøperen. Et slikt gebyr kan ikke belastes kjøpere under 18 år.",
        en: "If the buyer fails to collect unpaid goods, the seller may charge the buyer a fee. The fee shall at most cover the seller's actual outlay for delivering the goods to the buyer. Such a fee cannot be charged to buyers under the age of 18.",
      },
    ],
  },
  {
    id: "vilkar-12",
    num: "12",
    title: { no: "Garanti", en: "Guarantee" },
    toc: { no: "Garanti", en: "Guarantee" },
    blocks: [
      {
        kind: "p",
        no: "Garanti som gis av selgeren eller produsenten, gir kjøperen rettigheter i tillegg til de kjøperen allerede har etter ufravikelig lovgivning. En garanti innebærer dermed ingen begrensninger i kjøperens rett til reklamasjon og krav ved forsinkelse eller mangler etter punkt 9 og 10.",
        en: "A guarantee given by the seller or the manufacturer gives the buyer rights in addition to those the buyer already has under mandatory legislation. A guarantee therefore does not imply any limitations on the buyer's right to complain and make claims in the event of delay or defects under clauses 9 and 10.",
      },
    ],
  },
  {
    id: "vilkar-13",
    num: "13",
    title: { no: "Personopplysninger", en: "Personal data" },
    toc: { no: "Personopplysninger", en: "Personal data" },
    blocks: [
      {
        kind: "p",
        no: "Behandlingsansvarlig for innsamlede personopplysninger er selger. Med mindre kjøperen samtykker til noe annet, kan selgeren, i tråd med personopplysningsloven, kun innhente og lagre de personopplysninger som er nødvendig for at selgeren skal kunne gjennomføre forpliktelsene etter avtalen. Kjøperens personopplysninger vil kun bli utlevert til andre hvis det er nødvendig for at selger skal få gjennomført avtalen med kjøperen, eller i lovbestemte tilfelle.",
        en: "The data controller for collected personal data is the seller. Unless the buyer consents to otherwise, the seller may, in accordance with the Personal Data Act, only collect and store the personal data necessary for the seller to be able to fulfil its obligations under the agreement. The buyer's personal data will only be disclosed to others if it is necessary for the seller to carry out the agreement with the buyer, or in statutory cases.",
      },
    ],
  },
  {
    id: "vilkar-14",
    num: "14",
    title: { no: "Konfliktløsning", en: "Dispute resolution" },
    toc: { no: "Konfliktløsning", en: "Dispute resolution" },
    blocks: [
      {
        kind: "links",
        no: [
          "Klager rettes til selger innen rimelig tid, jf. punkt 9 og 10. Partene skal forsøke å løse eventuelle tvister i minnelighet. Dersom dette ikke lykkes, kan kjøperen ta kontakt med Forbrukerrådet for mekling. Forbrukerrådet er tilgjengelig på telefon ",
          { text: "23 400 500", href: "tel:+4723400500" },
          " eller ",
          { text: "www.forbrukerradet.no", href: "https://www.forbrukerradet.no" },
          ".",
        ],
        en: [
          "Complaints are to be directed to the seller within a reasonable time, cf. clauses 9 and 10. The parties shall attempt to resolve any disputes amicably. If this does not succeed, the buyer may contact the Norwegian Consumer Council (Forbrukerrådet) for mediation. The Consumer Council is available by telephone on ",
          { text: "23 400 500", href: "tel:+4723400500" },
          " or at ",
          { text: "www.forbrukerradet.no", href: "https://www.forbrukerradet.no" },
          ".",
        ],
      },
      {
        kind: "links",
        no: [
          "Europa-Kommisjonens klageportal kan også brukes hvis du ønsker å inngi en klage. Det er særlig relevant hvis du er forbruker bosatt i et annet EU-land. Klagen inngis her: ",
          { text: "ec.europa.eu/odr", href: "https://ec.europa.eu/odr" },
          ".",
        ],
        en: [
          "The European Commission's complaints portal may also be used if you wish to submit a complaint. This is particularly relevant if you are a consumer resident in another EU country. The complaint is submitted here: ",
          { text: "ec.europa.eu/odr", href: "https://ec.europa.eu/odr" },
          ".",
        ],
      },
    ],
  },
];

export default async function VilkarPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <LegalPage
      lang={lang}
      eyebrow={{ no: "Vilkår", en: "Terms" }}
      title={{ no: "Kjøpsvilkår.", en: "Sales terms." }}
      lead={
        <>
          {t(
            lang,
            "Vilkårene gjelder alle kjøp og bookinger hos INNE Golf Bergen (",
            "The terms cover all purchases and booking at INNE Golf Bergen (",
          )}
          {SITE.legalName}, org.nr. {SITE.orgNr}).
        </>
      }
      sections={SECTIONS}
      contactTocHref={`mailto:${SITE.email}`}
      footNote={
        <>
          {t(lang, "Spørsmål om vilkårene?", "Questions?")}{" "}
          <a data-sweep="true" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          · {SITE.legalName} · Org.nr. {SITE.orgNr}
        </>
      }
    />
  );
}
