import type { Metadata } from "next";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import OpenBookButton from "@/components/OpenBookButton";
import SiteFx from "@/components/SiteFx";
import { asLang, type Lang, langAlternates, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import sub from "../subpage.module.css";
import s from "./medlemskap.module.css";

const NNBSP = " ";
const THIN = " ";
const MINUS = "−";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Priser & medlemskap — INNE Golf Bergen", "Prices & membership — INNE Golf Bergen"),
    description: t(
      lang,
      "Årsmedlemskap 1 800 kr/år — verdikort på 2 800 kr til fri booking, 20 % på alle simulatortimer og partnerfordeler i Bergen.",
      "Annual membership 1 800 kr/yr — a 2 800 kr voucher, 20 % off all simulator hours and partner perks in Bergen.",
    ),
    alternates: langAlternates("/medlemskap"),
  };
}

const tier1Benefits = (lang: Lang) => [
  t(lang, `10${THIN}% hos Pham muskelspesialist`, `10${THIN}% at Pham muskelspesialist`),
  t(lang, `20${THIN}% på mat hos Porto13`, `20${THIN}% on food at Porto13`),
  t(
    lang,
    `20${THIN}% hos Bella Italia Åsane ved bestilling direkte til INNE Golf Bergen Åsane`,
    `20${THIN}% at Bella Italia Åsane when ordering direct to INNE Golf Bergen Åsane`,
  ),
  t(lang, `25${THIN}% CashPoints — Sumo Restaurant takeaway`, `25${THIN}% CashPoints — Sumo Restaurant takeaway`),
  t(lang, `10${THIN}% rabatt bespisning hos Sumo Åsane`, `10${THIN}% off dining at Sumo Åsane`),
];

const tier2Benefits = (lang: Lang) => [
  t(lang, `20${THIN}% hos Peppes Åsane`, `20${THIN}% at Peppes Åsane`),
  t(
    lang,
    `20${THIN}% hos Bella Italia Åsane (også ved henting — vis frem bookingen)`,
    `20${THIN}% at Bella Italia Åsane (pickup too — show your booking)`,
  ),
  t(lang, `10${THIN}% CashPoints — Sumo dine-in`, `10${THIN}% CashPoints — Sumo dine-in`),
];

export default async function MedlemskapPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.bg900} ${sub.textHero}`}>
        <div className="container">
          <div data-fade="true">
            <Eyebrow>{t(lang, <>Priser &amp; medlemskap</>, <>Prices &amp; membership</>)}</Eyebrow>
          </div>
          <h1 data-fade="true" className={s.heroH1}>
            <span className={s.heroLine}>{t(lang, `Betal 1${NNBSP}800.`, `Pay 1${NNBSP}800.`)}</span>
            <span className={`${s.heroLine} ${s.heroAccent}`}>{t(lang, `Få 2${NNBSP}800.`, `Get 2${NNBSP}800.`)}</span>
          </h1>
          <p data-fade="true" className={s.heroLead}>
            {t(lang, `Årsmedlemskap 1${NNBSP}800 kr per år`, `Annual membership 1${NNBSP}800 kr/yr`)}{" "}
            <span className={s.heroLeadPrice}>
              {t(lang, `— det er 150 kr i måneden.`, `— that's 150 kr a month.`)}
            </span>
          </p>
          <div data-fade="true" className={s.heroCtaWrap}>
            <Button as="a" href={SITE.membership} size="lg">
              {t(lang, "BLI MEDLEM", "JOIN NOW")}
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Priser ============ */}
      <section className={s.priserSection}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>{t(lang, "Priser", "Prices")}</Eyebrow>
            <h2 className={s.priserH2}>{t(lang, "Fra 100 kr.", "From 100 kr.")}</h2>
            <p className={s.priserLead}>
              {t(
                lang,
                "Per bay, per halvtime — ikke per person. Del bayen med opptil seks, så koster kvelden mindre enn en kinobillett.",
                "Per bay, per 30 min — not per person. Share the bay with up to six and the night costs less than a movie ticket.",
              )}
            </p>
            <div className={s.priserCtaWrap}>
              <OpenBookButton size="lg">{t(lang, "SE LEDIGE TIDER", "SEE OPEN TIMES")}</OpenBookButton>
            </div>
          </div>
          <div data-st="true" className={s.priceList}>
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
              <span className={`${s.priceLabel} ${s.priceLabelAccent}`}>{t(lang, "Medlem", "Member")}</span>
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
                  "Free loaner clubs, balls, tees — men's, women's, junior",
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Medlemskapstige ============ */}
      <section className={`${sub.bg900} ${sub.sectionTall}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>{t(lang, "To trinn", "2 tiers")}</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>{t(lang, "Velg ditt nivå.", "Pick your tier.")}</h2>
          </div>

          <div className={s.ladder}>
            <div aria-hidden="true" className={s.ladderLine} />

            <div data-st="true" className={s.step}>
              <span className={s.stepBullet}>1</span>
              <div className={s.stepCard}>
                <div className={s.stepHead}>
                  <div className={s.stepTitleWrap}>
                    <h3 className={s.stepTitle}>{t(lang, "Golfklubb-medlem", "Golf club member")}</h3>
                    <span className={s.stepTitleSub}>
                      {t(lang, "Velg Åsane eller Sandviken ved kjøp", "Pick Åsane or Sandviken at checkout")}
                    </span>
                  </div>
                  <span className={s.stepPrice}>{t(lang, "1 kr/år", "1 kr/yr")}</span>
                </div>
                <div className={s.stepBenefit}>
                  <span className={s.stepBenefitPct}>{`20${THIN}%`}</span>
                  <span className={s.stepBenefitText}>
                    {t(lang, "på alle simulatortimer", "on all simulator hours")}
                  </span>
                </div>
                <div>
                  <span className={s.listLabel}>{t(lang, "I tillegg", "Plus")}</span>
                  <ul className={s.benefitList}>
                    {tier1Benefits(lang).map((b) => (
                      <li key={b} className={s.benefitItem}>
                        <span className={s.benefitDot} />
                        <span className={s.benefitText}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className={s.stepFootnote}>
                  {t(
                    lang,
                    "Alle tilleggsrabatter er tilgjengelige etter første gjennomførte simulatortime.",
                    "All extra discounts unlock after your first completed simulator hour.",
                  )}
                </p>
                <div className={s.stepCtaWrap}>
                  <Button as="a" href={SITE.membership} variant="secondary" size="lg">
                    {t(lang, "BLI MEDLEM (1 KR)", "JOIN NOW (1 KR)")}
                  </Button>
                </div>
              </div>
            </div>

            <div data-st="true" className={s.step}>
              <span className={s.stepBullet}>2</span>
              <div className={`${s.stepCard} ${s.stepCardFeatured}`}>
                <div className={`${s.stepHead} ${s.stepHeadTop}`}>
                  <div className={`${s.stepTitleWrap} ${s.stepTitleWrapBadge}`}>
                    <span className={s.stepBadge}>{t(lang, "Mest verdi", "Best value")}</span>
                    <h3 className={s.stepTitle}>{t(lang, "Årsmedlemskap", "Annual plan")}</h3>
                  </div>
                  <span className={s.stepPrice}>{t(lang, `1${NNBSP}800 kr/år`, `1${NNBSP}800 kr/yr`)}</span>
                </div>
                <div className={s.valueGrid}>
                  <div className={s.valueCell}>
                    <span className={s.valueCellLabel}>{t(lang, "Pris du betaler", "You pay")}</span>
                    <span className={s.valueCellNum}>{`1${NNBSP}800 kr`}</span>
                  </div>
                  <div className={s.valueCell}>
                    <span className={s.valueCellLabel}>{t(lang, "Verdikort du mottar", "Voucher you receive")}</span>
                    <span className={`${s.valueCellNum} ${s.valueCellNumAccent}`}>{`2${NNBSP}800 kr`}</span>
                  </div>
                </div>
                <p className={s.stepCopy}>
                  {t(
                    lang,
                    "Verdikortet går til fri booking av timer du selv velger. Du styrer alt selv, uten å kontakte INNE for bestilling.",
                    "The voucher covers free booking of any hours you choose. You manage it yourself — no need to contact INNE.",
                  )}
                </p>
                <p className={s.stepCopy}>
                  {t(
                    lang,
                    "Medlemskapet tilsvarer ca. 7 simulatortimer i ordinær tid, eller opptil 17,5 timer på våre billigste tider. Ingen timer som brenner inne.",
                    "The plan equals about 7 simulator hours at standard times, or up to 17.5 hours at our cheapest. No hours go to waste.",
                  )}
                </p>
                <div>
                  <span className={s.listLabel}>
                    {t(lang, "Alt i Golfklubb-medlem, pluss", "All of Golf club member, plus")}
                  </span>
                  <ul className={s.benefitList}>
                    {tier2Benefits(lang).map((b) => (
                      <li key={b} className={s.benefitItem}>
                        <span className={s.benefitDot} />
                        <span className={s.benefitText}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.stepCtaWrap}>
                  <Button as="a" href={SITE.membership} size="lg">
                    {t(lang, "BLI MEDLEM", "JOIN NOW")}
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
            <Eyebrow>{t(lang, "Partnere", "Partners")}</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>{t(lang, "Fordeler i byen.", "Perks in town.")}</h2>
            <p className={s.partnerLead}>
              {t(
                lang,
                "Slik fungerer avtalene med partnerne våre. Tilgjengelig etter din første gjennomførte simulatortime.",
                "How our partner deals work. Available after your first completed simulator hour.",
              )}
            </p>
          </div>
          <div data-st="true" className={sub.faqList}>
            <details className={`inne-faq ${sub.faqItem}`} open>
              <summary className={sub.faqSummary}>
                <span className={s.partnerSummaryText}>
                  <span className={s.partnerName}>Bella Italia Åsane</span>
                  <span className={s.partnerDeal}>{t(lang, `20${THIN}% på mat`, `20${THIN}% food`)}</span>
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={s.partnerA}>
                {t(
                  lang,
                  `20${THIN}% på mat bestilt direkte til INNE GOLF BERGEN sine lokaler.`,
                  `20${THIN}% on food ordered direct to the INNE Golf Bergen venues.`,
                )}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={s.partnerSummaryText}>
                  <span className={s.partnerName}>Sumo Restaurant</span>
                  <span className={s.partnerDeal}>
                    {t(lang, `Inntil 25${THIN}% CashPoints`, `Up to 25${THIN}% CashPoints`)}
                  </span>
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <div className={s.partnerBody}>
                <p className={s.partnerText}>
                  {t(
                    lang,
                    `25${THIN}% CashPoints på takeaway via nettsiden, og 10${THIN}% via QR-kode i restaurant man–tors. Gjelder alle Sumo-restauranter i Norge.`,
                    `25${THIN}% CashPoints on takeaway via the site, and 10${THIN}% via QR code in restaurant Mon–Thu. All Sumo restaurants in Norway.`,
                  )}
                </p>
                <p className={s.partnerText}>
                  {t(lang, "Kontakt INNE-teamet for kodeord.", "Ask the INNE team for the code.")}
                </p>
                <p className={s.partnerHint}>
                  {t(
                    lang,
                    "Slik gjør du det: legg inn kodeordet i promokodefeltet, velg CashPoints som betalingsmetode ved utsjekk. Saldoen vises på brukerprofilen.",
                    "How: enter the code in the promo field, pick CashPoints as payment at checkout. The balance shows on your profile.",
                  )}
                </p>
              </div>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={s.partnerSummaryText}>
                  <span className={s.partnerName}>
                    {t(lang, "Porto 13, Bergen sentrum", "Porto 13, central Bergen")}
                  </span>
                  <span className={s.partnerDeal}>
                    {t(lang, `20${THIN}% mat · 10${THIN}% timer`, `20${THIN}% food · 10${THIN}% play`)}
                  </span>
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={s.partnerA}>
                {t(
                  lang,
                  `20${THIN}% på mat i restauranten, pluss 10${THIN}% på timer booket via medlemsbruker på albagolf.no.`,
                  `20${THIN}% on restaurant food, plus 10${THIN}% on hours booked via member login on albagolf.no.`,
                )}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={s.partnerSummaryText}>
                  <span className={s.partnerName}>
                    {t(lang, "Bergen Harbour Hotell", "Bergen Harbour Hotel")}
                  </span>
                  <span className={s.partnerDeal}>{t(lang, `15${THIN}% overnatting`, `15${THIN}% stays`)}</span>
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={s.partnerA}>
                {t(
                  lang,
                  `15${THIN}% på overnatting november–mars ved ledig kapasitet. Bestilles direkte hos hotellet, bergenharbourhotel.no.`,
                  `15${THIN}% on stays November–March when space allows. Book direct with the hotel, bergenharbourhotel.no.`,
                )}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem} ${sub.faqItemLast}`}>
              <summary className={sub.faqSummary}>
                <span className={s.partnerSummaryText}>
                  <span className={s.partnerName}>Pham muskelspesialist</span>
                  <span className={s.partnerDeal}>{t(lang, `10${THIN}% behandling`, `10${THIN}% treatment`)}</span>
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={s.partnerA}>
                {t(lang, `10${THIN}% på all behandling.`, `10${THIN}% on all treatment.`)}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className={`${sub.bg900} ${sub.sectionTall}`}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>{t(lang, "Det du lurer på.", "Your questions.")}</h2>
            <p className={sub.faqLead}>
              {t(lang, "Finner du ikke svaret? Skriv til", "Can't find the answer? Write to")}{" "}
              <a data-sweep="true" href={`mailto:${SITE.email}`} className={sub.faqLink}>
                {SITE.email}
              </a>
              .
            </p>
          </div>
          <div data-st="true" className={sub.faqList}>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>
                  {t(lang, "Gjelder medlemskapet i begge sentre?", "Is membership valid at both venues?")}
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>
                {t(
                  lang,
                  `Ja. Både verdikortet og ${MINUS}20${THIN}% på timer gjelder i både Åsane og Sandviken.`,
                  `Yes. Both the voucher and ${MINUS}20${THIN}% on hours apply in Åsane and Sandviken.`,
                )}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>
                  {t(lang, "Hvordan aktiveres rabattene?", "How do discounts activate?")}
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>
                {t(
                  lang,
                  "Alle tilleggsrabatter blir tilgjengelige etter din første gjennomførte simulatortime.",
                  "All extra discounts unlock after your first completed simulator hour.",
                )}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>
                  {t(lang, "Hvor lenge er verdikortet gyldig?", "How long is the voucher valid?")}
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>
                {t(
                  lang,
                  "Verdikortet er gyldig frem til det er brukt opp.",
                  "The voucher stays valid until it's used up.",
                )}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem} ${sub.faqItemLast}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>{t(lang, "Oppsigelse og fornyelse?", "Cancel and renew?")}</span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>
                {t(
                  lang,
                  "Oppsigelse og fornyelse må gjøres hvert år — det skjer ikke automatisk.",
                  "You renew or cancel each year yourself — nothing is automatic.",
                )}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className={sub.copperBand}>
        <div data-st="true" className={`container ${sub.copperInner}`}>
          <div className={sub.copperText}>
            <h2 className={sub.copperH2}>
              {t(lang, `Betal 1${NNBSP}800. Få 2${NNBSP}800.`, `Pay 1${NNBSP}800. Get 2${NNBSP}800.`)}
            </h2>
            <p className={sub.copperCopy}>
              {t(
                lang,
                `150 kr i måneden — verdikort på 2${NNBSP}800 kr og partnerfordeler i hele byen.`,
                `150 kr a month — a 2${NNBSP}800 kr voucher and partner perks across town.`,
              )}
            </p>
          </div>
          <a href={SITE.membership} className={sub.darkCta}>
            {t(lang, "Bli medlem", "Join now")}
          </a>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
