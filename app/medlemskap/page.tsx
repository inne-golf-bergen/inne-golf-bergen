import type { Metadata } from "next";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import OpenBookButton from "@/components/OpenBookButton";
import SiteFx from "@/components/SiteFx";
import { SITE, mailtoSubject } from "@/lib/site";
import sub from "../subpage.module.css";
import s from "./medlemskap.module.css";

const NNBSP = "\u202F";
const THIN = "\u2009";
const MINUS = "\u2212";

export const metadata: Metadata = {
  title: "Priser & medlemskap — INNE Golf Bergen",
  description:
    "Årsmedlemskap 1 800 kr/år — verdikort på 2 800 kr til fri booking, 20 % på alle simulatortimer og partnerfordeler i Bergen.",
};

const TIER1_BENEFITS = [
  `10${THIN}% hos Pham muskelspesialist`,
  `20${THIN}% på mat hos Porto13`,
  `20${THIN}% hos Bella Italia Åsane ved bestilling direkte til INNE Golf Bergen Åsane`,
  `25${THIN}% CashPoints — Sumo Restaurant takeaway`,
  `10${THIN}% rabatt bespisning hos Sumo Åsane`,
];

const TIER2_BENEFITS = [
  `20${THIN}% hos Peppes Åsane`,
  `20${THIN}% hos Bella Italia Åsane (også ved henting — vis frem bookingen)`,
  `10${THIN}% CashPoints — Sumo dine-in`,
];

export default function MedlemskapPage() {
  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.bg900} ${sub.textHero}`}>
        <div className="container">
          <div data-fade="true">
            <Eyebrow>Priser &amp; medlemskap</Eyebrow>
          </div>
          <h1 data-fade="true" className={s.heroH1}>
            <span className={s.heroLine}>{`Betal 1${NNBSP}800.`}</span>
            <span className={`${s.heroLine} ${s.heroAccent}`}>{`Få 2${NNBSP}800.`}</span>
          </h1>
          <p data-fade="true" className={s.heroLead}>
            {`Årsmedlemskap 1${NNBSP}800 kr per år — det er 150 kr i måneden.`}
          </p>
          <div data-fade="true" className={s.heroCtaWrap}>
            <Button as="a" href={mailtoSubject("Årsmedlemskap")} size="lg">
              BLI MEDLEM
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Priser ============ */}
      <section className={s.priserSection}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>Priser</Eyebrow>
            <h2 className={s.priserH2}>Fra 100 kr.</h2>
            <p className={s.priserLead}>
              Per bay, per halvtime — ikke per person. Del bayen med opptil seks, så koster kvelden mindre enn en
              kinobillett.
            </p>
            <div className={s.priserCtaWrap}>
              <OpenBookButton size="lg">SE LEDIGE TIDER</OpenBookButton>
            </div>
          </div>
          <div data-st="true" className={s.priceList}>
            <div className={s.priceRow}>
              <span className={s.priceLabelWrap}>
                <span className={s.priceLabel}>Bay · 30 min</span>
                <span className={s.priceLabelSub}>avhengig av tidspunkt og senter</span>
              </span>
              <span className={s.priceValue}>100–200 kr</span>
            </div>
            <div className={s.priceRow}>
              <span className={s.priceLabel}>Bay · 60 min</span>
              <span className={s.priceValue}>200–400 kr</span>
            </div>
            <div className={s.priceRow}>
              <span className={`${s.priceLabel} ${s.priceLabelAccent}`}>Medlem</span>
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

      {/* ============ Medlemskapstige ============ */}
      <section className={`${sub.bg900} ${sub.sectionTall}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>To trinn</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>Velg ditt nivå.</h2>
          </div>

          <div className={s.ladder}>
            <div aria-hidden="true" className={s.ladderLine} />

            <div data-st="true" className={s.step}>
              <span className={s.stepBullet}>1</span>
              <div className={s.stepCard}>
                <div className={s.stepHead}>
                  <div className={s.stepTitleWrap}>
                    <h3 className={s.stepTitle}>Golfklubb-medlem</h3>
                    <span className={s.stepTitleSub}>Velg Åsane eller Sandviken ved kjøp</span>
                  </div>
                  <span className={s.stepPrice}>1 kr/år</span>
                </div>
                <div className={s.stepBenefit}>
                  <span className={s.stepBenefitPct}>{`20${THIN}%`}</span>
                  <span className={s.stepBenefitText}>på alle simulatortimer</span>
                </div>
                <div>
                  <span className={s.listLabel}>I tillegg</span>
                  <ul className={s.benefitList}>
                    {TIER1_BENEFITS.map((b) => (
                      <li key={b} className={s.benefitItem}>
                        <span className={s.benefitDot} />
                        <span className={s.benefitText}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className={s.stepFootnote}>
                  Alle tilleggsrabatter er tilgjengelige etter første gjennomførte simulatortime.
                </p>
                <div className={s.stepCtaWrap}>
                  <Button as="a" href={mailtoSubject("Golfklubb-medlem (1 kr)")} variant="secondary" size="lg">
                    BLI MEDLEM (1 KR)
                  </Button>
                </div>
              </div>
            </div>

            <div data-st="true" className={s.step}>
              <span className={s.stepBullet}>2</span>
              <div className={`${s.stepCard} ${s.stepCardFeatured}`}>
                <div className={`${s.stepHead} ${s.stepHeadTop}`}>
                  <div className={`${s.stepTitleWrap} ${s.stepTitleWrapBadge}`}>
                    <span className={s.stepBadge}>Mest verdi</span>
                    <h3 className={s.stepTitle}>Årsmedlemskap</h3>
                  </div>
                  <span className={s.stepPrice}>{`1${NNBSP}800 kr/år`}</span>
                </div>
                <div className={s.valueGrid}>
                  <div className={s.valueCell}>
                    <span className={s.valueCellLabel}>Pris du betaler</span>
                    <span className={s.valueCellNum}>{`1${NNBSP}800 kr`}</span>
                  </div>
                  <div className={s.valueCell}>
                    <span className={s.valueCellLabel}>Verdikort du mottar</span>
                    <span className={`${s.valueCellNum} ${s.valueCellNumAccent}`}>{`2${NNBSP}800 kr`}</span>
                  </div>
                </div>
                <p className={s.stepCopy}>
                  Verdikortet går til fri booking av timer du selv velger. Du styrer alt selv, uten å kontakte INNE for
                  bestilling.
                </p>
                <p className={s.stepCopy}>
                  Medlemskapet tilsvarer ca. 7 simulatortimer i ordinær tid, eller opptil 17,5 timer på våre billigste
                  tider. Ingen timer som brenner inne.
                </p>
                <div>
                  <span className={s.listLabel}>Alt i Golfklubb-medlem, pluss</span>
                  <ul className={s.benefitList}>
                    {TIER2_BENEFITS.map((b) => (
                      <li key={b} className={s.benefitItem}>
                        <span className={s.benefitDot} />
                        <span className={s.benefitText}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.stepCtaWrap}>
                  <Button as="a" href={mailtoSubject("Årsmedlemskap")} size="lg">
                    BLI MEDLEM
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Partnerfordeler ============ */}
      <section className={`${sub.bg950} ${sub.sectionTall}`}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>Partnere</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>Fordeler i byen.</h2>
            <p className={s.partnerLead}>
              Slik fungerer avtalene med partnerne våre. Tilgjengelig etter din første gjennomførte simulatortime.
            </p>
          </div>
          <div data-st="true" className={sub.faqList}>
            <details className={`inne-faq ${sub.faqItem}`} open>
              <summary className={sub.faqSummary}>
                <span className={s.partnerSummaryText}>
                  <span className={s.partnerName}>Bella Italia Åsane</span>
                  <span className={s.partnerDeal}>{`20${THIN}% på mat`}</span>
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={s.partnerA}>{`20${THIN}% på mat bestilt direkte til INNE GOLF BERGEN sine lokaler.`}</p>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={s.partnerSummaryText}>
                  <span className={s.partnerName}>Sumo Restaurant</span>
                  <span className={s.partnerDeal}>{`Inntil 25${THIN}% CashPoints`}</span>
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <div className={s.partnerBody}>
                <p className={s.partnerText}>
                  {`25${THIN}% CashPoints på takeaway via nettsiden, og 10${THIN}% via QR-kode i restaurant man–tors. Gjelder alle Sumo-restauranter i Norge.`}
                </p>
                <p className={s.partnerText}>Kontakt INNE-teamet for kodeord.</p>
                <p className={s.partnerHint}>
                  Slik gjør du det: legg inn kodeordet i promokodefeltet, velg CashPoints som betalingsmetode ved
                  utsjekk. Saldoen vises på brukerprofilen.
                </p>
              </div>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={s.partnerSummaryText}>
                  <span className={s.partnerName}>Porto 13, Bergen sentrum</span>
                  <span className={s.partnerDeal}>{`20${THIN}% mat · 10${THIN}% timer`}</span>
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={s.partnerA}>
                {`20${THIN}% på mat i restauranten, pluss 10${THIN}% på timer booket via medlemsbruker på albagolf.no.`}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={s.partnerSummaryText}>
                  <span className={s.partnerName}>Bergen Harbour Hotell</span>
                  <span className={s.partnerDeal}>{`15${THIN}% overnatting`}</span>
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={s.partnerA}>
                {`15${THIN}% på overnatting november–mars ved ledig kapasitet. Bestilles direkte hos hotellet, bergenharbourhotel.no.`}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem} ${sub.faqItemLast}`}>
              <summary className={sub.faqSummary}>
                <span className={s.partnerSummaryText}>
                  <span className={s.partnerName}>Pham muskelspesialist</span>
                  <span className={s.partnerDeal}>{`10${THIN}% behandling`}</span>
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={s.partnerA}>{`10${THIN}% på all behandling.`}</p>
            </details>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className={`${sub.bg900} ${sub.sectionTall}`}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>Det du lurer på.</h2>
            <p className={sub.faqLead}>
              Finner du ikke svaret? Skriv til{" "}
              <a data-sweep="true" href={`mailto:${SITE.email}`} className={sub.faqLink}>
                {SITE.email}
              </a>
              .
            </p>
          </div>
          <div data-st="true" className={sub.faqList}>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>Gjelder medlemskapet i begge sentre?</span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>
                {`Ja. Både verdikortet og ${MINUS}20${THIN}% på timer gjelder i både Åsane og Sandviken.`}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>Hvordan aktiveres rabattene?</span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>
                Alle tilleggsrabatter blir tilgjengelige etter din første gjennomførte simulatortime.
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>Hvor lenge er verdikortet gyldig?</span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={`${sub.faqA} ${sub.faqAPlaceholder}`}>[GYLDIGHET SETTES INN — bekreftes]</p>
            </details>
            <details className={`inne-faq ${sub.faqItem} ${sub.faqItemLast}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>Oppsigelse og fornyelse?</span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={`${sub.faqA} ${sub.faqAPlaceholder}`}>[OPPSIGELSE OG FORNYELSE SETTES INN — bekreftes]</p>
            </details>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className={sub.copperBand}>
        <div data-st="true" className={`container ${sub.copperInner}`}>
          <div className={sub.copperText}>
            <h2 className={sub.copperH2}>{`Betal 1${NNBSP}800. Få 2${NNBSP}800.`}</h2>
            <p className={sub.copperCopy}>
              {`150 kr i måneden — verdikort på 2${NNBSP}800 kr og partnerfordeler i hele byen.`}
            </p>
          </div>
          <a href={mailtoSubject("Årsmedlemskap")} className={sub.darkCta}>
            Bli medlem
          </a>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
