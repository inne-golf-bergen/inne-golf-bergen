import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import CompareSlider from "@/components/CompareSlider";
import Eyebrow from "@/components/Eyebrow";
import Faq from "@/components/Faq";
import HeroVideo from "@/components/HeroVideo";
import {
  Cascade,
  CascadeItem,
  FadeUp,
  HeroIntro,
  HeroItem,
  HeroLine,
  Magnetic,
  ParallaxY,
} from "@/components/motion/fx";
import MedlemTall from "@/components/motion/MedlemTall";
import OpenBookButton from "@/components/OpenBookButton";
import { asLang, type Lang, langHref, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import s from "./page.module.css";

const NNBSP = " "; // narrow no-break space — grouping in numbers
const THIN = " "; // thin space — before %
const MINUS = "−";

const faqItems = (lang: Lang): { q: string; a: string }[] => [
  {
    q: t(lang, "Hva koster det å spille?", "What does it cost?"),
    a: t(
      lang,
      `100–200 kr per 30 minutter per bay, avhengig av tidspunkt og senter. Prisen gjelder hele bayen — dere kan være opptil seks.`,
      `100–200 kr per 30 minutes per bay, depending on time and venue. The price covers the whole bay — up to six of you.`,
    ),
  },
  {
    q: t(lang, "Trenger jeg eget utstyr?", "Do I need my own gear?"),
    a: t(
      lang,
      "Nei. Gratis lånekøller, baller og tees ligger klare i begge sentre — herre, dame og junior.",
      "No. Free loaner clubs, balls and tees at both venues — men’s, women’s and junior.",
    ),
  },
  {
    q: t(lang, "Hvor mange kan vi være?", "How many can we bring?"),
    a: t(lang, "Opptil seks personer per bay.", "Up to six people per bay."),
  },
  {
    q: t(lang, "Når har dere åpent?", "When are you open?"),
    a: t(lang, "Hele døgnet, hele uka. Du får adgang etter booking.", "24/7, all week. You get access after booking."),
  },
  {
    q: t(lang, "Kan nybegynnere spille?", "Can beginners play?"),
    a: t(
      lang,
      "Ja. Nybegynnere er velkomne, og utstyr i alle størrelser er inkludert.",
      "Yes. Beginners are welcome, and gear in every size is included.",
    ),
  },
  {
    q: t(lang, "Er det parkering?", "Is there parking?"),
    a: t(
      lang,
      "Gratis parkering ved begge sentre. Åsane har egne plasser; i Sandviken parkerer du gratis rett utenfor, hele døgnet.",
      "Free parking at both venues. Åsane has its own spots; in Sandviken you park free right outside, 24/7.",
    ),
  },
  {
    q: t(lang, "Hva får jeg som medlem?", "What do members get?"),
    a: t(
      lang,
      `Årsmedlemskap koster 1${NNBSP}800 kr og gir et verdikort på 2${NNBSP}800 kr til fri booking, pluss ${MINUS}20${THIN}% på alle timer.`,
      `Annual membership is 1${NNBSP}800 kr and gives a 2${NNBSP}800 kr voucher for free booking, plus ${MINUS}20${THIN}% on all hours.`,
    ),
  },
];

const faqJsonld = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems(lang).map(({ q, a }) => ({
    "@type": "Question",
    name: q.replace(/[  ]/g, " "),
    acceptedAnswer: { "@type": "Answer", text: a.replace(/[  ]/g, " ") },
  })),
});

const asaneRows = (lang: Lang): [string, string][] => [
  [t(lang, "Simulatorer", "Simulators"), "3 × TrackMan iO"],
  [t(lang, "VIP-losje", "VIP box"), t(lang, "6–8 personer", "6–8 people")],
  [t(lang, "Trening", "Putting"), t(lang, "Egen green", "Own green")],
  [t(lang, "Parkering", "Parking"), t(lang, "Gratis, rett utenfor", "Free, right outside")],
  [t(lang, "Åpent", "Open"), t(lang, "Hele døgnet", "24/7")],
];

const sandvikenRows = (lang: Lang): [string, string][] => [
  ["Simulator", "TrackMan iO"],
  ["Kiosk", t(lang, "Selvbetjent", "Self-serve")],
  [t(lang, "Kollektiv", "Transit"), t(lang, "Buss 40 m unna", "Bus 40 m away")],
  [t(lang, "Parkering", "Parking"), t(lang, "Gratis, rett utenfor", "Free, right outside")],
  [t(lang, "Åpent", "Open"), t(lang, "Hele døgnet", "24/7")],
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

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonld(lang)) }} />

      {/* ============ Hero ============ */}
      <section id="top" className={s.hero}>
        <div aria-hidden="true" className={s.heroBg}>
          <HeroVideo
            src="/uploads/vg3_explainer_short_optimized_v3.mp4"
            webmSrc="/uploads/vg3_explainer_short_optimized_v3.webm"
            mobileSrc="/uploads/vg3_explainer_short_mobile_optimized_v3.mp4"
            mobileWebmSrc="/uploads/vg3_explainer_short_mobile_optimized_v3.webm"
            className={s.heroVideo}
          />
          <div className={s.heroGradV} />
          <div className={s.heroGradH} />
        </div>
        <HeroIntro className={s.heroContent}>
          <HeroItem>
            <Eyebrow hero>{t(lang, "Innendørs golf i Bergen", "Indoor golf in Bergen")}</Eyebrow>
          </HeroItem>
          <h1 className={s.heroH1}>
            <span className={s.lineMask}>
              <HeroLine className={s.lineIn}>Golf.</HeroLine>
            </span>
            <span className={s.lineMask}>
              <HeroLine className={s.lineIn}>{t(lang, "Hele året.", "All year.")}</HeroLine>
            </span>
          </h1>
          <HeroItem>
            <p className={s.heroLead}>
              {t(lang, "TrackMan iO i Åsane og Sandviken", "TrackMan iO in Åsane & Sandviken")}
              <span className={s.heroLeadBooking}>{t(lang, ". Book på 60 sekunder", ". Book in 60 seconds")}</span>{" "}
              <span className={s.heroLeadPrice}>
                {t(lang, "— fra 100 kr per halvtime.", "— from 100 kr per 30 min.")}
              </span>
            </p>
          </HeroItem>
          <HeroItem className={s.heroCtas}>
            <Magnetic className={s.ctaSlot}>
              <Button as="a" href="#book-asane" size="lg" fullWidth>
                BOOK ÅSANE
              </Button>
            </Magnetic>
            <Magnetic className={s.ctaSlot}>
              <Button as="a" href="#book-sandviken" size="lg" fullWidth>
                BOOK SANDVIKEN
              </Button>
            </Magnetic>
          </HeroItem>
        </HeroIntro>
        <div id="hero-ticker" className={s.ticker}>
          <FadeUp mode="mount" delay={1.05} className={s.tickerRow}>
            <div className={s.tickerCell}>
              <span aria-hidden="true" className={s.tickerStar}>
                ★
              </span>
              <span className={s.tickerScore}>{t(lang, "5,0", "5.0")}</span>
              <span className={s.tickerLabel}>{t(lang, "På Google", "On Google")}</span>
            </div>
            <div className={s.tickerCell}>
              <span className={s.tickerLabel}>TrackMan iO</span>
            </div>
            <div className={s.tickerCell}>
              <span className={s.tickerLabel}>{t(lang, "Gratis parkering", "Free parking")}</span>
            </div>
            <div className={s.tickerCell}>
              <span aria-hidden="true" className={s.pulseDot} />
              <span className={s.tickerLabel}>{t(lang, "Åpent hele døgnet", "Open 24/7")}</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============ Velg ditt senter ============ */}
      <section id="sentre" className={`${s.section} ${s.bg950}`}>
        <div className="container">
          <FadeUp>
            <Eyebrow>{t(lang, "To sentre i Bergen", "Two Bergen venues")}</Eyebrow>
            <h2 className={s.h2}>{t(lang, "Velg ditt senter.", "Pick your venue.")}</h2>
          </FadeUp>
          <Cascade className={s.sentreGrid}>
            <CascadeItem id="asane" className={s.centreCard}>
              <span id="book-asane" aria-hidden="true" className={s.centreAnchor} />
              <div className={s.centreMedia}>
                <Image
                  src="/assets/photos/asane-bay.jpg"
                  alt={t(lang, "Treningsbay med green i Åsane", "Practice bay and green, Åsane")}
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
                <CentreRows rows={asaneRows(lang)} />
                <Button as="a" href={SITE.bookAsane} size="lg" fullWidth>
                  BOOK ÅSANE
                </Button>
              </div>
            </CascadeItem>
            <CascadeItem id="sandviken" index={1} className={s.centreCard}>
              <span id="book-sandviken" aria-hidden="true" className={s.centreAnchor} />
              <div className={s.centreMedia}>
                <Image
                  src="/assets/photos/sandviken-bay.jpg"
                  alt={t(lang, "Widescreen-bay med barkrakker i Sandviken", "Widescreen bay with stools in Sandviken")}
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
                <CentreRows rows={sandvikenRows(lang)} />
                <Button as="a" href={SITE.bookSandviken} size="lg" fullWidth>
                  BOOK SANDVIKEN
                </Button>
              </div>
            </CascadeItem>
          </Cascade>
        </div>
      </section>

      {/* ============ Priser ============ */}
      <section id="priser" className={`${s.section} ${s.bg900}`} style={{ scrollMarginTop: 60 }}>
        <div className={`container ${s.splitGrid}`}>
          <FadeUp>
            <Eyebrow>{t(lang, "Priser", "Prices")}</Eyebrow>
            <h2 className={`${s.h2} ${s.priserH2}`}>{t(lang, "Fra 100 kr.", "From 100 kr.")}</h2>
            <p className={s.priserLead}>
              {t(
                lang,
                "Per bay, per halvtime — ikke per person. Del bayen med opptil seks, så koster kvelden mindre enn en kinobillett.",
                "Per bay, per 30 min — not per person. Share the bay with up to six and the night costs less than a movie ticket.",
              )}
            </p>
            <div className={s.priserCtaWrap}>
              <Magnetic>
                <OpenBookButton size="lg">{t(lang, "SE LEDIGE TIDER", "SEE OPEN TIMES")}</OpenBookButton>
              </Magnetic>
            </div>
          </FadeUp>
          <FadeUp delay={0.1} className={s.priceList}>
            <div className={s.priceRow}>
              <span className={s.priceLabelWrap}>
                <span className={s.priceLabel}>Bay · 30 min</span>
                <span className={s.priceLabelSub}>
                  {t(lang, "avhengig av tidspunkt og senter", "depends on time and venue")}
                </span>
              </span>
              <span className={s.priceValue}>100–200 kr</span>
            </div>
            <div className={s.priceRow}>
              <span className={s.priceLabel}>Bay · 60 min</span>
              <span className={s.priceValue}>200–400 kr</span>
            </div>
            <div className={s.priceRow}>
              <Link data-sweep="true" href={langHref(lang, "/medlemskap")} className={s.priceLinkLabel}>
                {t(lang, "Medlem", "Member")}
              </Link>
              <span className={`${s.priceValue} ${s.priceValueAccent}`}>
                {t(lang, `${MINUS}20${THIN}% på alt`, `${MINUS}20${THIN}% off`)}
              </span>
            </div>
            <div className={s.priceIncluded}>
              <span className={s.priceIncludedLabel}>{t(lang, "Alltid inkludert", "Always included")}</span>
              <span className={s.priceIncludedItem}>
                {t(
                  lang,
                  "Gratis lånekøller, baller og tees — herre, dame og junior",
                  "Free loaner clubs, balls, tees — men’s, women’s, junior",
                )}
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============ Medlemskap ============ */}
      <section id="medlemskap" className={s.medlemskap}>
        <div className="container">
          <FadeUp>
            <Eyebrow>{t(lang, "Medlemskap", "Membership")}</Eyebrow>
          </FadeUp>
          <FadeUp>
            <h2 id="medlem-tall" className={s.medlemTall}>
              <MedlemTall
                pay={t(lang, "Betal", "Pay")}
                get={t(lang, "Få", "Get")}
                lineClass={s.medlemLine}
                accentClass={s.medlemAccent}
              />
            </h2>
          </FadeUp>
          <FadeUp>
            <p className={s.medlemLead}>
              {t(
                lang,
                `Årsmedlemskap 1${NNBSP}800 kr/år — 150 kr i måneden. Du får et verdikort på 2${NNBSP}800 kr til fri booking, og ${MINUS}20${THIN}% på alle timer.`,
                `Annual membership 1${NNBSP}800 kr/yr — 150 kr a month. You get a 2${NNBSP}800 kr voucher for free booking, and ${MINUS}20${THIN}% on all hours.`,
              )}
            </p>
          </FadeUp>
          <FadeUp>
            <p className={s.medlemNote}>
              {t(
                lang,
                "Ingen timer som brenner inne. Du styrer alt selv.",
                "No hours go to waste. You manage it all yourself.",
              )}
            </p>
          </FadeUp>
          <FadeUp className={s.chipRow}>
            <span className={s.chip}>{t(lang, `2${NNBSP}800 kr i verdikort`, `2${NNBSP}800 kr voucher`)}</span>
            <span className={s.chip}>{`${MINUS}20${THIN}% ${t(lang, "på alle timer", "on all hours")}`}</span>
            <span className={s.chip}>{t(lang, "Partnerfordeler", "Partner perks")}</span>
          </FadeUp>
          <FadeUp className={s.medlemCtaWrap}>
            <Magnetic>
              <Button as="a" href={langHref(lang, "/medlemskap")} size="lg">
                {t(lang, "BLI MEDLEM", "JOIN NOW")}
              </Button>
            </Magnetic>
          </FadeUp>
        </div>
      </section>

      {/* ============ Slik funker det ============ */}
      <section id="slik" className={`${s.section} ${s.bg900}`}>
        <div className="container">
          <FadeUp>
            <Eyebrow>{t(lang, "Slik funker det", "How it works")}</Eyebrow>
          </FadeUp>
          <Cascade className={s.slikGrid}>
            {[
              [
                "01",
                "Book.",
                t(
                  lang,
                  "Velg senter, dag og tid. Betal med kort eller Vipps — ferdig på 60 sekunder.",
                  "Pick venue, day and time. Pay by card or Vipps — done in 60 seconds.",
                ),
              ],
              [
                "02",
                t(lang, "Lås opp.", "Unlock."),
                t(
                  lang,
                  "Etter booking åpner du døren rett fra mobilen. Ingen resepsjon, ingen nøkkel, ingen kø.",
                  "After booking you open the door from your phone. No front desk, no key, no queue.",
                ),
              ],
              [
                "03",
                t(lang, "Spill.", "Play."),
                t(
                  lang,
                  "Bayen står klar med gratis lånekøller. Trykk i gang TrackMan og slå ut.",
                  "The bay is ready with free loaner clubs. Fire up TrackMan and hit away.",
                ),
              ],
            ].map(([num, title, copy], i) => (
              <CascadeItem key={num} index={i} className={s.slikStep}>
                <span className={s.stepNum}>{num}</span>
                <h3 className={s.stepTitle}>{title}</h3>
                <p className={s.stepCopy}>{copy}</p>
              </CascadeItem>
            ))}
          </Cascade>
        </div>
      </section>

      {/* ============ TrackMan ============ */}
      <section id="simulatorene" className={s.sim}>
        <div aria-hidden="true" className={s.simBg}>
          <ParallaxY className={s.simParallax}>
            {/* Over-declared sizes: the crop is height-constrained on every
                viewport (portrait on mobile, parallax overscan on desktop), so
                width-based srcset selection (100vw) would serve a file that
                gets upscaled 1.4-4×. */}
            <Image
              id="sim-photo"
              src="/uploads/why_accuracy_matters_desktop-f3cbab17.webp"
              alt={t(
                lang,
                "TrackMan-bay hos INNE — spiller i sving foran simulatorskjermen",
                "TrackMan bay at INNE — player mid-swing at the simulator screen",
              )}
              fill
              sizes="(max-width: 768px) 300vw, 150vw"
              quality={85}
              className={s.simPhoto}
            />
          </ParallaxY>
          <div className={s.simGradA} />
          <div className={s.simGradB} />
          <div className={s.simGradC} />
          <div id="sim-scrim-mobile" className={s.simScrimMobile} />
        </div>
        <div className={s.simContent}>
          <FadeUp className="sim-text">
            <Eyebrow>TrackMan iO</Eyebrow>
            <h2 className={s.simH2}>
              {t(lang, "Samme data", "Same data")}
              <br />
              {t(lang, "som touren.", "as the tour.")}
            </h2>
            <p className={`${s.simCopy} ${s.simCopyFirst}`}>
              {t(
                lang,
                "Radar og dobbeltkamera i ett kabinett. TrackMan iO leser hele ballflukten på hvert eneste slag med hvilken som helst kølle — ikke et estimat, men de samme tallene proffene på touren trener etter.",
                "Radar and dual cameras in one unit. TrackMan iO reads the full ball flight on every single shot with any club — not an estimate, but the same numbers the tour pros train by.",
              )}
            </p>
            <p className={`${s.simCopy} ${s.simCopyNext}`}>
              {t(
                lang,
                "Slå med dine egne køller eller våre gratis lånekøller, se dataene i sanntid, og spill over 300 verdensbaner i Virtual Golf.",
                "Hit your own clubs or our free loaners, see the data live, and play 300+ world courses in Virtual Golf.",
              )}
            </p>
            <p className={`${s.simCopy} ${s.simCopyMobile}`}>
              {t(
                lang,
                "TrackMan iO leser hele ballflukten på hvert slag — de samme tallene proffene på touren trener etter. Gratis lånekøller, data i sanntid og over 300 verdensbaner i Virtual Golf.",
                "TrackMan iO reads the full ball flight on every shot — the same numbers the tour pros train by. Free loaner clubs, live data and 300+ world courses in Virtual Golf.",
              )}
            </p>
          </FadeUp>
        </div>
        <div className={s.simSpacer} />
      </section>

      {/* ============ Ekte vs. simulator ============ */}
      <section id="virtual-golf" className={s.virtualGolf}>
        <CompareSlider lang={lang} />
      </section>

      {/* ============ Ta med gjengen ============ */}
      <section id="selskap" className={`${s.section} ${s.bg950}`}>
        <div className="container">
          <FadeUp>
            <Eyebrow>{t(lang, <>Selskap &amp; grupper</>, <>Events &amp; groups</>)}</Eyebrow>
            <h2 className={s.h2}>{t(lang, "Ta med gjengen.", "Bring the crew.")}</h2>
          </FadeUp>
          <Cascade className={s.cardGrid}>
            <CascadeItem className={s.cardCell}>
              <Link href={langHref(lang, "/vip-losjen")} className={s.photoCard}>
              <div className={s.photoCardMedia}>
                <Image
                  src="/assets/photos/vip-losje.jpg"
                  alt={t(lang, "VIP-losjen med skinnstoler og egen bay", "VIP box with leather chairs, own bay")}
                  fill
                  sizes="(max-width: 659px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className={s.photoCardImg}
                />
              </div>
              <div className={s.photoCardBody}>
                <h3 className={s.photoCardTitle}>{t(lang, "VIP-losjen", "VIP Box")}</h3>
                <p className={s.photoCardCopy}>
                  {t(
                    lang,
                    "Egen losje i Åsane for 6–8. Skinnstoler, egen bay og plass til mat og drikke.",
                    "Own box in Åsane for 6–8. Leather chairs, own bay, space for food and drinks.",
                  )}
                </p>
                <span className={s.cardCta}>
                  {t(lang, "Book losjen", "Book it")} <span className={s.cardCtaArrow}>→</span>
                </span>
              </div>
              </Link>
            </CascadeItem>
            <CascadeItem index={1} className={s.cardCell}>
              <Link href={langHref(lang, "/bursdag")} className={s.photoCard}>
              <div className={s.photoCardMedia}>
                <Image
                  src="/assets/photos/bursdag-bay.jpg"
                  alt={t(lang, "Bay med green og loungeområde", "Bay with green and lounge")}
                  fill
                  sizes="(max-width: 659px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className={s.photoCardImg}
                />
                <span className={s.photoCardBadge}>{t(lang, "450 kr per barn", "450 kr per kid")}</span>
              </div>
              <div className={s.photoCardBody}>
                <h3 className={s.photoCardTitle}>{t(lang, "Bursdag", "Birthday")}</h3>
                <p className={s.photoCardCopy}>
                  {t(
                    lang,
                    "2 timer simulatorgolf med vert, alt utstyr, pizza og brus. Minimum 6 barn — alle kan slå.",
                    "2 hours of simulator golf with host, gear, pizza and soda. Min. 6 kids — all can play.",
                  )}
                </p>
                <span className={s.cardCta}>
                  {t(lang, "Planlegg bursdag", "Plan the party")} <span className={s.cardCtaArrow}>→</span>
                </span>
              </div>
              </Link>
            </CascadeItem>
            <CascadeItem index={2} className={s.cardCell}>
              <Link href={langHref(lang, "/bedrift")} className={s.photoCard}>
              <div className={s.photoCardMedia}>
                <Image
                  src="/assets/photos/lounge-fireplace.jpg"
                  alt={t(lang, "Loungen med peis", "Lounge fireplace")}
                  fill
                  sizes="(max-width: 659px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className={s.photoCardImg}
                />
              </div>
              <div className={s.photoCardBody}>
                <h3 className={s.photoCardTitle}>{t(lang, "Bedrift", "Company")}</h3>
                <p className={s.photoCardCopy}>
                  {t(
                    lang,
                    "Kickoff, kundekveld eller fredagsrunde. Turneringsmodus gjør konkurransen enkel.",
                    "Kickoff, client night or Friday round. Tournament mode makes competing easy.",
                  )}
                </p>
                <span className={s.cardCta}>
                  {t(lang, "Se pakker", "See plans")} <span className={s.cardCtaArrow}>→</span>
                </span>
              </div>
              </Link>
            </CascadeItem>
          </Cascade>
        </div>
      </section>

      {/* ============ Det skjer på INNE ============ */}
      <section id="skjer" className={`${s.section} ${s.bg900}`}>
        <div className="container">
          <FadeUp>
            <Eyebrow>{t(lang, <>Turneringer &amp; kurs</>, <>Compete &amp; learn</>)}</Eyebrow>
            <h2 className={s.h2}>{t(lang, "Det skjer på INNE.", "Happening at INNE.")}</h2>
          </FadeUp>
          <Cascade className={s.cardGrid}>
            <CascadeItem className={s.cardCell}>
            <Link href={langHref(lang, "/vinterturnering")} className={s.lineCard}>
              <span className={s.stepNum}>{t(lang, "Lagturnering", "Team cup")}</span>
              <h3 className={s.lineCardTitle}>{t(lang, "Vinter​turneringen", "The Winter Cup")}</h3>
              <p className={s.lineCardCopy}>
                {t(
                  lang,
                  `2-spillerlag · 500 kr per spiller · premiepott 20${NNBSP}000 kr + Cutter & Buck-jakker`,
                  `2-player teams · 500 kr each · 20${NNBSP}000 kr pot + Cutter & Buck jackets`,
                )}
              </p>
              <span className={s.cardCta}>
                {t(lang, "Les mer", "Details")} <span className={s.cardCtaArrow}>→</span>
              </span>
            </Link>
            </CascadeItem>
            <CascadeItem index={1} className={s.cardCell}>
            <Link href={langHref(lang, "/polf")} className={s.lineCard}>
              <span className={s.stepNum}>{t(lang, "Golf + poker", "Golf + poker")}</span>
              <h3 className={s.lineCardTitle}>POLF</h3>
              <p className={s.lineCardCopy}>
                {t(
                  lang,
                  `Golf + poker · premiepott inntil 63${NNBSP}000 kr · 18 år`,
                  `Golf + poker · pot up to 63${NNBSP}000 kr · 18+`,
                )}
              </p>
              <span className={s.cardCta}>
                {t(lang, "Les mer", "Details")} <span className={s.cardCtaArrow}>→</span>
              </span>
            </Link>
            </CascadeItem>
            <CascadeItem index={2} className={s.cardCell}>
            <Link href={langHref(lang, "/veien-til-golf")} className={s.lineCard}>
              <span className={s.stepNum}>{t(lang, "Nybegynnerkurs", "Intro course")}</span>
              <h3 className={s.lineCardTitle}>Veien til Golf</h3>
              <p className={s.lineCardCopy}>
                {t(
                  lang,
                  `Nybegynnerkurs med nasjonal spillerett · Junior 3${NNBSP}000 kr · Voksen 3${NNBSP}500 kr`,
                  `Beginner course with playing rights · Junior 3${NNBSP}000 kr · Adult 3${NNBSP}500 kr`,
                )}
              </p>
              <span className={s.cardCta}>
                {t(lang, "Les mer", "Details")} <span className={s.cardCtaArrow}>→</span>
              </span>
            </Link>
            </CascadeItem>
          </Cascade>
        </div>
      </section>

      {/* ============ Gavekort ============ */}
      <section id="gavekort" className={s.gavekort}>
        <FadeUp className={`container ${s.gavekortInner}`}>
          <div className={s.gavekortText}>
            <h2 className={s.gavekortH2}>{t(lang, "Spar på golf.", "Save on golf.")}</h2>
            <p className={s.gavekortCopy}>
              {t(
                lang,
                `Verdikort fra 820 kr — opptil 43${THIN}% ekstra verdi å spille for. Gjelder i begge sentre.`,
                `Vouchers from 820 kr — up to 43${THIN}% extra value to play for. Valid at both venues.`,
              )}
            </p>
          </div>
          <Link href={langHref(lang, "/gavekort")} className={s.darkCta}>
            {t(lang, "Kjøp verdikort", "Buy vouchers")}
          </Link>
        </FadeUp>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className={`${s.section} ${s.bg900}`}>
        <div className={`container ${s.splitGrid}`}>
          <FadeUp>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={s.h2}>{t(lang, "Det du lurer på.", "Your questions.")}</h2>
            <p className={s.faqLead}>
              {t(lang, "Finner du ikke svaret? Skriv til", "Can’t find the answer? Write to")}{" "}
              <a data-sweep="true" href={`mailto:${SITE.email}`} className={s.faqLink}>
                {SITE.email}
              </a>
              .
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Faq items={faqItems(lang)} />
          </FadeUp>
        </div>
      </section>

    </main>
  );
}
