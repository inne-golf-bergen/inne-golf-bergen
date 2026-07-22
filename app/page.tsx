import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import CompareSlider from "@/components/CompareSlider";
import Eyebrow from "@/components/Eyebrow";
import HeroVideo from "@/components/HeroVideo";
import LandingFx from "@/components/LandingFx";
import OpenBookButton from "@/components/OpenBookButton";
import { SITE } from "@/lib/site";
import s from "./page.module.css";

const NNBSP = "\u202F"; // narrow no-break space — grouping in numbers
const THIN = "\u2009"; // thin space — before %
const MINUS = "\u2212";

const FAQ_ITEMS: { q: string; a: string; placeholder?: boolean }[] = [
  {
    q: "Hva koster det å spille?",
    a: `100–200 kr per 30 minutter per bay, avhengig av tidspunkt og senter. Prisen gjelder hele bayen — dere kan være opptil seks.`,
  },
  {
    q: "Trenger jeg eget utstyr?",
    a: "Nei. Gratis lånekøller, baller og tees ligger klare i begge sentre — herre, dame og junior.",
  },
  { q: "Hvor mange kan vi være?", a: "Opptil seks personer per bay." },
  { q: "Når har dere åpent?", a: "Hele døgnet, hele uka. Du får adgang etter booking." },
  { q: "Kan nybegynnere spille?", a: "Ja. Nybegynnere er velkomne, og utstyr i alle størrelser er inkludert." },
  {
    q: "Er det parkering?",
    a: "Gratis parkering ved begge sentre. Åsane har egne plasser; i Sandviken parkerer du gratis rett utenfor, hele døgnet.",
  },
  {
    q: "Hva får jeg som medlem?",
    a: `Årsmedlemskap koster 1${NNBSP}800 kr og gir et verdikort på 2${NNBSP}800 kr til fri booking, pluss ${MINUS}20${THIN}% på alle timer.`,
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    [
      "Hva koster det å spille?",
      "100–200 kr per 30 minutter per bay, avhengig av tidspunkt og senter. Prisen gjelder hele bayen — dere kan være opptil seks.",
    ],
    ["Trenger jeg eget utstyr?", "Nei. Gratis lånekøller, baller og tees ligger klare i begge sentre — herre, dame og junior."],
    ["Hvor mange kan vi være per bay?", "Opptil seks personer per bay."],
    ["Når har dere åpent?", "Hele døgnet, hele uka. Du får adgang etter booking."],
    ["Kan nybegynnere spille?", "Ja. Nybegynnere er velkomne, og utstyr i alle størrelser er inkludert."],
    [
      "Er det parkering?",
      "Gratis parkering ved begge sentre. Åsane har egne plasser; i Sandviken parkerer du gratis rett utenfor, hele døgnet.",
    ],
    [
      "Hva får jeg som medlem?",
      "Årsmedlemskap koster 1 800 kr og gir et verdikort på 2 800 kr til fri booking, pluss −20 % på alle timer.",
    ],
  ].map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

const ASANE_ROWS: [string, string][] = [
  ["Simulatorer", "3 × TrackMan iO"],
  ["VIP-losje", "6–8 personer"],
  ["Trening", "Egen green"],
  ["Parkering", "Gratis, rett utenfor"],
  ["Åpent", "Hele døgnet"],
];

const SANDVIKEN_ROWS: [string, string][] = [
  ["Simulator", "TrackMan iO"],
  ["Kiosk", "Selvbetjent"],
  ["Kollektiv", "Buss 40 m unna"],
  ["Parkering", "Gratis, rett utenfor"],
  ["Åpent", "Hele døgnet"],
];

function CentreRows({ rows }: { rows: [string, string][] }) {
  return (
    <div className={s.centreRows}>
      {rows.map(([label, value], i) => (
        <div key={label} className={`${s.centreRow} ${i === rows.length - 1 ? s.centreRowLast : ""}`}>
          <span className={s.centreRowLabel}>{label}</span>
          <span className={s.centreRowValue}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />

      {/* ============ Hero ============ */}
      <section id="top" className={s.hero}>
        <div aria-hidden="true" className={s.heroBg}>
          <HeroVideo src="/uploads/vg3_explainer_short_optimized_v3.mp4" className={s.heroVideo} />
          <div className={s.heroGradV} />
          <div className={s.heroGradH} />
          <div className={s.heroBlob} />
        </div>
        <div className={s.heroContent}>
          <div data-fade="true">
            <Eyebrow hero>Innendørs golf i Bergen</Eyebrow>
          </div>
          <h1 className={s.heroH1}>
            <span className={s.lineMask}>
              <span data-reveal="true" className={s.lineIn}>
                Golf.
              </span>
            </span>
            <span className={s.lineMask}>
              <span data-reveal="true" className={s.lineIn}>
                Hele året.
              </span>
            </span>
          </h1>
          <p data-fade="true" className={s.heroLead}>
            TrackMan iO i Åsane og Sandviken. Book på 60 sekunder — fra 100 kr per halvtime.
          </p>
          <div data-fade="true" className={s.heroCtas}>
            <span className={s.ctaSlot}>
              <Button as="a" href="#book-asane" size="lg" fullWidth magnetic>
                BOOK ÅSANE
              </Button>
            </span>
            <span className={s.ctaSlot}>
              <Button as="a" href="#book-sandviken" size="lg" fullWidth magnetic>
                BOOK SANDVIKEN
              </Button>
            </span>
          </div>
        </div>
        <div id="hero-ticker" className={s.ticker}>
          <div data-fade="true" className={s.tickerRow}>
            <div className={s.tickerCell}>
              <span aria-hidden="true" className={s.tickerStar}>
                ★
              </span>
              <span className={s.tickerScore}>5,0</span>
              <span className={s.tickerLabel}>På Google</span>
            </div>
            <div className={s.tickerCell}>
              <span className={s.tickerLabel}>TrackMan iO</span>
            </div>
            <div className={s.tickerCell}>
              <span className={s.tickerLabel}>Gratis parkering</span>
            </div>
            <div className={s.tickerCell}>
              <span aria-hidden="true" className={s.pulseDot} />
              <span className={s.tickerLabel}>Åpent hele døgnet</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Velg ditt senter ============ */}
      <section id="sentre" className={`${s.section} ${s.bg950}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>To sentre i Bergen</Eyebrow>
            <h2 className={s.h2}>Velg ditt senter.</h2>
          </div>
          <div className={s.sentreGrid}>
            <div id="asane" data-st="true" className={s.centreCard}>
              <span id="book-asane" aria-hidden="true" className={s.centreAnchor} />
              <div className={s.centreMedia}>
                <Image
                  src="/assets/photos/asane-bay.jpg"
                  alt="Treningsbay med green i Åsane"
                  fill
                  loading="eager"
                  sizes="(max-width: 767px) 100vw, (max-width: 1440px) 50vw, 660px"
                  className={s.centreImg}
                />
              </div>
              <div className={s.centreBody}>
                <div className={s.centreTitleWrap}>
                  <h3 className={s.centreName}>Åsane</h3>
                  <span className={s.centreTag}>3 × TrackMan iO</span>
                </div>
                <CentreRows rows={ASANE_ROWS} />
                <Button as="a" href={SITE.bookAsane} size="lg" fullWidth>
                  BOOK ÅSANE
                </Button>
              </div>
            </div>
            <div id="sandviken" data-st="true" className={s.centreCard}>
              <span id="book-sandviken" aria-hidden="true" className={s.centreAnchor} />
              <div className={s.centreMediaWrap}>
                <Image
                  src="/assets/photos/sandviken-bay.jpg"
                  alt="Widescreen-bay med barkrakker i Sandviken"
                  fill
                  loading="eager"
                  sizes="(max-width: 767px) 100vw, (max-width: 1440px) 50vw, 660px"
                  className={s.centreImgSandviken}
                />
                <span aria-hidden="true" className={s.centreVignette} />
              </div>
              <div className={s.centreBody}>
                <div className={s.centreTitleWrap}>
                  <h3 className={s.centreName}>Sandviken</h3>
                  <span className={s.centreTag}>5 m widescreen</span>
                </div>
                <CentreRows rows={SANDVIKEN_ROWS} />
                <Button as="a" href={SITE.bookSandviken} size="lg" fullWidth>
                  BOOK SANDVIKEN
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Priser ============ */}
      <section id="priser" className={`${s.section} ${s.bg900}`} style={{ scrollMarginTop: 60 }}>
        <div className={`container ${s.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>Priser</Eyebrow>
            <h2 className={`${s.h2} ${s.priserH2}`}>Fra 100 kr.</h2>
            <p className={s.priserLead}>
              Per bay, per halvtime — ikke per person. Del bayen med opptil seks, så koster kvelden mindre enn en
              kinobillett.
            </p>
            <div className={s.priserCtaWrap}>
              <OpenBookButton size="lg" magnetic>
                SE LEDIGE TIDER
              </OpenBookButton>
            </div>
          </div>
          <div data-st="true" className={s.priceList}>
            <div className={s.priceRow}>
              <span className={s.priceLabelWrap}>
                <span className={s.priceLabel}>Bay · 30 min</span>
                <span className={s.priceLabelSub}>avhengig av tidspunkt og senter</span>
              </span>
              <span className={s.priceValue}>Fra 100 kr</span>
            </div>
            <div className={s.priceRow}>
              <span className={s.priceLabel}>Bay · 60 min</span>
              <span className={s.priceValue}>Fra 200 kr</span>
            </div>
            <div className={s.priceRow}>
              <Link data-sweep="true" href="/medlemskap" className={s.priceLinkLabel}>
                Medlem
              </Link>
              <span className={`${s.priceValue} ${s.priceValueAccent}`}>{`${MINUS}20${THIN}% på alt`}</span>
            </div>
            <div className={s.priceIncluded}>
              <span className={s.priceIncludedLabel}>Alltid inkludert</span>
              <span className={s.priceIncludedItem}>Gratis lånekøller, baller og tees — herre, dame og junior</span>
              <span className={s.priceIncludedItem}>Betal med kort eller Vipps</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Medlemskap ============ */}
      <section id="medlemskap" className={s.medlemskap}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Medlemskap</Eyebrow>
          </div>
          <h2 id="medlem-tall" data-st="true" className={s.medlemTall}>
            <span className={s.medlemLine}>
              Betal <span data-count="1800">{`1${NNBSP}800`}</span>.
            </span>
            <span className={s.medlemLine}>
              Få{" "}
              <span data-count="2800" className={s.medlemAccent}>
                {`2${NNBSP}800`}
              </span>
              .
            </span>
          </h2>
          <p data-st="true" className={s.medlemLead}>
            {`Årsmedlemskap 1${NNBSP}800 kr/år — 150 kr i måneden. Du får et verdikort på 2${NNBSP}800 kr til fri booking, og ${MINUS}20${THIN}% på alle timer.`}
          </p>
          <p data-st="true" className={s.medlemNote}>
            Ingen timer som brenner inne. Du styrer alt selv.
          </p>
          <div data-st="true" className={s.chipRow}>
            <span className={s.chip}>{`2${NNBSP}800 kr i verdikort`}</span>
            <span className={s.chip}>{`${MINUS}20${THIN}% på alle timer`}</span>
            <span className={s.chip}>Partnerfordeler</span>
          </div>
          <div data-st="true" className={s.medlemCtaWrap}>
            <Button as="a" href="/medlemskap" size="lg" magnetic>
              BLI MEDLEM
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Slik funker det ============ */}
      <section id="slik" className={`${s.section} ${s.bg900}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Slik funker det</Eyebrow>
          </div>
          <div className={s.slikGrid}>
            {[
              ["01", "Book.", "Velg senter, dag og tid. Betal med kort eller Vipps — ferdig på 60 sekunder."],
              [
                "02",
                "Lås opp.",
                "Etter booking åpner du døren rett fra mobilen. Ingen resepsjon, ingen nøkkel, ingen kø.",
              ],
              ["03", "Spill.", "Bayen står klar med gratis lånekøller. Trykk i gang TrackMan og slå ut."],
            ].map(([num, title, copy]) => (
              <div key={num} data-st="true" className={s.slikStep}>
                <span className={s.stepNum}>{num}</span>
                <h3 className={s.stepTitle}>{title}</h3>
                <p className={s.stepCopy}>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TrackMan ============ */}
      <section id="simulatorene" className={s.sim}>
        <div aria-hidden="true" className={s.simBg}>
          <Image
            id="sim-photo"
            src="/uploads/why_accuracy_matters_desktop-f3cbab17.webp"
            alt="TrackMan-bay hos INNE — spiller i sving foran simulatorskjermen"
            fill
            sizes="100vw"
            className={s.simPhoto}
          />
          <div className={s.simGradA} />
          <div className={s.simGradB} />
          <div className={s.simGradC} />
          <div id="sim-scrim-mobile" className={s.simScrimMobile} />
        </div>
        <div className={s.simContent}>
          <div className="sim-text" data-st="true">
            <Eyebrow>TrackMan iO</Eyebrow>
            <h2 className={s.simH2}>
              Samme data
              <br />
              som touren.
            </h2>
            <p className={`${s.simCopy} ${s.simCopyFirst}`}>
              Radar og dobbeltkamera i ett kabinett. TrackMan iO leser hele ballflukten på hvert eneste slag med hvilken
              som helst kølle — ikke et estimat, men de samme tallene proffene på touren trener etter.
            </p>
            <p className={`${s.simCopy} ${s.simCopyNext}`}>
              Slå med dine egne køller eller våre gratis lånekøller, se dataene i sanntid, og spill over 300
              verdensbaner i Virtual Golf.
            </p>
          </div>
        </div>
        <div className={s.simSpacer} />
      </section>

      {/* ============ Ekte vs. simulator ============ */}
      <section id="virtual-golf" className={s.virtualGolf}>
        <CompareSlider />
      </section>

      {/* ============ Ta med gjengen ============ */}
      <section id="selskap" className={`${s.section} ${s.bg950}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Selskap &amp; grupper</Eyebrow>
            <h2 className={s.h2}>Ta med gjengen.</h2>
          </div>
          <div className={s.cardGrid}>
            <Link data-st="true" href="/vip-losjen" className={s.photoCard}>
              <div className={s.photoCardMedia}>
                <Image
                  src="/assets/photos/vip-losje.jpg"
                  alt="VIP-losjen med skinnstoler og egen bay"
                  fill
                  sizes="(max-width: 659px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className={s.photoCardImg}
                />
              </div>
              <div className={s.photoCardBody}>
                <h3 className={s.photoCardTitle}>VIP-losjen</h3>
                <p className={s.photoCardCopy}>
                  Egen losje i Åsane for 6–8. Skinnstoler, egen bay og plass til mat og drikke.
                </p>
                <span className={s.cardCta}>Book losjen →</span>
              </div>
            </Link>
            <Link data-st="true" href="/bursdag" className={s.photoCard}>
              <div className={s.photoCardMediaWrap}>
                <Image
                  src="/assets/photos/bursdag-bay.jpg"
                  alt="Bay med green og loungeområde"
                  fill
                  sizes="(max-width: 659px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className={s.photoCardImg}
                />
                <span className={s.photoCardBadge}>450 kr per barn</span>
              </div>
              <div className={s.photoCardBody}>
                <h3 className={s.photoCardTitle}>Bursdag</h3>
                <p className={s.photoCardCopy}>
                  2 timer simulatorgolf med vert, alt utstyr, pizza og brus. Minimum 6 barn — alle kan slå.
                </p>
                <span className={s.cardCta}>Planlegg bursdag →</span>
              </div>
            </Link>
            <Link data-st="true" href="/bedrift" className={s.photoCard}>
              <div className={s.photoCardMedia}>
                <Image
                  src="/assets/photos/lounge-fireplace.jpg"
                  alt="Loungen med peis"
                  fill
                  sizes="(max-width: 659px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className={s.photoCardImg}
                />
              </div>
              <div className={s.photoCardBody}>
                <h3 className={s.photoCardTitle}>Bedrift</h3>
                <p className={s.photoCardCopy}>
                  Kickoff, kundekveld eller fredagsrunde. Turneringsmodus gjør konkurransen enkel.
                </p>
                <span className={s.cardCta}>Se pakker →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Det skjer på INNE ============ */}
      <section id="skjer" className={`${s.section} ${s.bg900}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Turneringer &amp; kurs</Eyebrow>
            <h2 className={s.h2}>Det skjer på INNE.</h2>
          </div>
          <div className={s.cardGrid}>
            <Link data-st="true" href="/vinterturnering" className={s.lineCard}>
              <span className={s.stepNum}>01</span>
              <h3 className={s.lineCardTitle}>{"Vinter\u200Bturneringen"}</h3>
              <p className={s.lineCardCopy}>
                {`2-spillerlag · 500 kr per spiller · premiepott 20${NNBSP}000 kr + Cutter & Buck-jakker`}
              </p>
              <span className={s.cardCta}>Les mer →</span>
            </Link>
            <Link data-st="true" href="/polf" className={s.lineCard}>
              <span className={s.stepNum}>02</span>
              <h3 className={s.lineCardTitle}>POLF</h3>
              <p className={s.lineCardCopy}>{`Golf + poker · premiepott inntil 63${NNBSP}000 kr · 18 år`}</p>
              <span className={s.cardCta}>Les mer →</span>
            </Link>
            <Link data-st="true" href="/veien-til-golf" className={s.lineCard}>
              <span className={s.stepNum}>03</span>
              <h3 className={s.lineCardTitle}>Veien til Golf</h3>
              <p className={s.lineCardCopy}>
                {`Nybegynnerkurs med nasjonal spillerett · Junior 3${NNBSP}000 kr · Voksen 3${NNBSP}500 kr`}
              </p>
              <span className={s.cardCta}>Les mer →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Gavekort ============ */}
      <section id="gavekort" className={s.gavekort}>
        <div data-st="true" className={`container ${s.gavekortInner}`}>
          <div className={s.gavekortText}>
            <h2 className={s.gavekortH2}>Spar på golf.</h2>
            <p className={s.gavekortCopy}>
              {`Verdikort fra 820 kr — opptil 30${THIN}% ekstra verdi å spille for. Gjelder i begge sentre.`}
            </p>
          </div>
          <Link href="/gavekort" className={s.darkCta}>
            Kjøp verdikort
          </Link>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className={`${s.section} ${s.bg900}`}>
        <div className={`container ${s.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={s.h2}>Det du lurer på.</h2>
            <p className={s.faqLead}>
              Finner du ikke svaret? Skriv til{" "}
              <a data-sweep="true" href={`mailto:${SITE.email}`} className={s.faqLink}>
                {SITE.email}
              </a>
              .
            </p>
          </div>
          <div data-st="true" className={s.faqList}>
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={item.q}
                className={`inne-faq ${s.faqItem} ${i === FAQ_ITEMS.length - 1 ? s.faqItemLast : ""}`}
              >
                <summary className={s.faqSummary}>
                  <span className={s.faqQ}>{item.q}</span>
                  <span className={`faq-x ${s.faqX}`} aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className={`${s.faqA} ${item.placeholder ? s.faqAPlaceholder : ""}`}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div id="inne-glow" aria-hidden="true" />
      <div id="inne-grain" aria-hidden="true" />
      <LandingFx />
    </main>
  );
}
