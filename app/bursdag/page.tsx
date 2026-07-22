import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import sub from "../subpage.module.css";
import BursdagForm from "./BursdagForm";
import s from "./bursdag.module.css";

export const metadata: Metadata = {
  title: "Bursdag — INNE Golf Bergen",
  description:
    "Bursdag hos INNE Golf Bergen — 2 timer simulatorgolf med vert, alt utstyr, pizza og brus. 450 kr per barn, minimum 6 barn.",
};

const PAKKE = [
  "2 timer simulatorgolf — Shuffle Golf og Bowling Golf",
  "Vert/instruktør inkludert",
  "Vi stiller med alt nødvendig golfutstyr",
  "Stor pizza (1 stor pr. 3–4 barn)",
  "0,33 l brus til alle",
  "Gratis kaffe til foreldrene til bursdagsbarnet",
  "Lov å ta med egen kake — vi har engangsbestikk",
  "Varighet ca. 2 timer",
  "Vi tilpasser opplegget etter alder og ønsker",
];

export default function BursdagPage() {
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
            sizes="100vw"
            className={`${sub.heroImg} ${s.heroImg}`}
          />
          <div className={s.gradV} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>Bursdag</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            Bursdag de snakker om etterpå.
          </h1>
          <div data-fade="true" className={s.badgeWrap}>
            <span className={s.badge}>450 kr per barn · alt inkludert · min. 6 barn</span>
          </div>
          <p data-fade="true" className={s.heroLead}>
            Feir dagen med en aktiv og morsom bursdag hos oss. Golf og lek i en trygg og sosial setting — perfekt for
            barn i alle aldre.
          </p>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#skjema" size="lg">
              PLANLEGG BURSDAG
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Pakke og booking ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className={`container ${s.bookGrid}`}>
          <div data-st="true" className={s.pakkeCard}>
            <Eyebrow>INNE Bursdag-pakken</Eyebrow>
            <h2 className={s.pakkeH2}>Alt er ordnet.</h2>
            <ul className={s.checkList}>
              {PAKKE.map((item) => (
                <li key={item} className={s.checkItem}>
                  <span className={s.checkMark} />
                  <span className={s.checkText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="skjema" data-st="true" className={s.skjemaBlock}>
            <Eyebrow>Forespørsel</Eyebrow>
            <h2 className={s.pakkeH2}>Book bursdag.</h2>
            <BursdagForm />
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>Godt å vite.</h2>
          </div>
          <div data-st="true" className={sub.faqList}>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>Passer det for nybegynnere?</span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>Ja — alle kan slå. Vi tilpasser opplegget etter alder, og verten hjelper alle i gang.</p>
            </details>
            <details className={`inne-faq ${sub.faqItem}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>Kan foreldre være med?</span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>Ja, foreldre er velkomne. Bursdagsbarnets foreldre får gratis kaffe mens barna spiller.</p>
            </details>
            <details className={`inne-faq ${sub.faqItem} ${sub.faqItemLast}`}>
              <summary className={sub.faqSummary}>
                <span className={sub.faqQ}>Hva med allergier?</span>
                <span className={`faq-x ${sub.faqX}`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={sub.faqA}>Gi beskjed i skjemaet, så tilpasser vi mat og drikke.</p>
            </details>
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
