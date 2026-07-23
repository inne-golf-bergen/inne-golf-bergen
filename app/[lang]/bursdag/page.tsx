import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { asLang, type Lang, langAlternates, t } from "@/lib/i18n";
import sub from "../subpage.module.css";
import BursdagForm from "./BursdagForm";
import s from "./bursdag.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Bursdag — INNE Golf Bergen", "Birthday — INNE Golf Bergen"),
    description: t(
      lang,
      "Bursdag hos INNE Golf Bergen — 2 timer simulatorgolf med vert, alt utstyr, pizza og brus. 450 kr per barn, minimum 6 barn.",
      "Birthdays at INNE Golf Bergen — 2 hours of golf with host, all gear, pizza and soda. 450 kr per kid, minimum 6 kids.",
    ),
    alternates: langAlternates("/bursdag"),
  };
}

const pakke = (lang: Lang) => [
  t(
    lang,
    "2 timer simulatorgolf — Shuffle Golf og Bowling Golf",
    "2 hours of golf — Shuffle Golf and Bowling Golf",
  ),
  t(lang, "Vert/instruktør inkludert", "Host/instructor included"),
  t(lang, "Vi stiller med alt nødvendig golfutstyr", "We provide all the golf gear you need"),
  t(lang, "Stor pizza (1 stor pr. 3–4 barn)", "Large pizza (1 per 3–4 kids)"),
  t(lang, "0,33 l brus til alle", "0.33 l soda for all"),
  t(lang, "Gratis kaffe til foreldrene til bursdagsbarnet", "Free coffee for the birthday child's parents"),
  t(lang, "Lov å ta med egen kake — vi har engangsbestikk", "Bring your own cake — we have the cutlery"),
  t(lang, "Varighet ca. 2 timer", "About 2 hours long"),
  t(lang, "Vi tilpasser opplegget etter alder og ønsker", "We tailor it to ages and wishes"),
];

export default async function BursdagPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          <Image
            src="/assets/photos/bursdag-lounge.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 300vw, 100vw"
            quality={85}
            className={`${sub.heroImg} ${s.heroImg}`}
          />
          <div className={s.gradV} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>{t(lang, "Bursdag", "Birthday")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            <span className={s.desktopCopy}>
              {t(lang, "Bursdag de snakker om etterpå.", "A birthday they'll talk about.")}
            </span>
            <span className={s.mobileCopy}>{t(lang, "Bursdag de husker.", "One to remember.")}</span>
          </h1>
          <div data-fade="true" className={s.badgeWrap}>
            <span className={s.badge}>
              <span className={s.desktopCopy}>
                {t(lang, "450 kr per barn · alt inkludert · min. 6 barn", "450 kr per kid · all included · min. 6 kids")}
              </span>
              <span className={s.mobileCopy}>
                {t(lang, "450 kr per barn · min. 6 barn", "450 kr per kid · min. 6 kids")}
              </span>
            </span>
          </div>
          <p data-fade="true" className={s.heroLead}>
            <span className={s.desktopCopy}>
              {t(
                lang,
                "Feir dagen med en aktiv og morsom bursdag hos oss. Golf og lek i en trygg og sosial setting — perfekt for barn i alle aldre.",
                "Celebrate with an active, fun birthday with us. Golf and play in a safe, social setting — great for kids of all ages.",
              )}
            </span>
            <span className={s.mobileCopy}>
              {t(
                lang,
                "Golf og lek i trygge rammer — alt inkludert, for barn i alle aldre.",
                "Golf and play, safe and fun — all included, for kids of all ages.",
              )}
            </span>
          </p>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#skjema" size="lg">
              {t(lang, "PLANLEGG BURSDAG", "PLAN THE PARTY")}
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Pakke og booking ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className={`container ${s.bookGrid}`}>
          <div data-st="true" className={s.pakkeCard}>
            <Eyebrow>{t(lang, "INNE Bursdag-pakken", "The INNE party pack")}</Eyebrow>
            <h2 className={s.pakkeH2}>{t(lang, "Alt er ordnet.", "All sorted.")}</h2>
            <ul className={s.checkList}>
              {pakke(lang).map((item) => (
                <li key={item} className={s.checkItem}>
                  <span className={s.checkMark} />
                  <span className={s.checkText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="skjema" data-st="true" className={s.skjemaBlock}>
            <Eyebrow>{t(lang, "Forespørsel", "Request")}</Eyebrow>
            <h2 className={s.pakkeH2}>{t(lang, "Book bursdag.", "Book a party.")}</h2>
            <BursdagForm lang={lang} />
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>{t(lang, "Godt å vite.", "The details.")}</h2>
          </div>
          <div data-st="true" className={sub.faqList}>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>
                  {t(lang, "Passer det for nybegynnere?", "Is it beginner-friendly?")}
                </span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>
                {t(
                  lang,
                  "Ja — alle kan slå. Vi tilpasser opplegget etter alder, og verten hjelper alle i gang.",
                  "Yes — anyone can hit. We adapt to age, and the host gets everyone going.",
                )}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>{t(lang, "Kan foreldre være med?", "Can parents join?")}</span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>
                {t(
                  lang,
                  "Ja, foreldre er velkomne. Bursdagsbarnets foreldre får gratis kaffe mens barna spiller.",
                  "Yes — parents are welcome, and the birthday parents get free coffee.",
                )}
              </p>
            </details>
            <details className={`inne-faq ${sub.faqItem} ${sub.faqItemLast}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>{t(lang, "Hva med allergier?", "Allergies?")}</span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>
                {t(
                  lang,
                  "Gi beskjed i skjemaet, så tilpasser vi mat og drikke.",
                  "Tell us in the form and we'll adapt food and drinks.",
                )}
              </p>
            </details>
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
