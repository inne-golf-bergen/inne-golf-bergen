import type { Metadata } from "next";
import Image from "next/image";
import vinterturneringHero from "@/public/assets/photos/vinterturnering-hero.webp";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { asLang, type Lang, langAlternates, t } from "@/lib/i18n";
import { mailtoSubject, SITE } from "@/lib/site";
import sub from "../subpage.module.css";
import VinterFaser from "./VinterFaser";
/* Season 2025/26 is played out — sign-up is closed. When 2026/27 opens:
   restore `import VinterForm from "./VinterForm"` and the form column below,
   and swap the archive copy back to the live entry copy (see git history). */
import s from "./vinter.module.css";

const NNBSP = "\u202f"; // narrow NO-BREAK space — was a plain space, which line-breaks

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Vinterturneringen — INNE Golf Bergen", "The Winter Cup — INNE Golf Bergen"),
    description: t(
      lang,
      "Vinterturneringen hos INNE Golf Bergen — 2-spillerlag, 500 kr per spiller. Gruppespill til finale fra 15. november til 30. april. Premiepott 20 000 kr og Cutter & Buck-jakker.",
      "The Winter Cup at INNE Golf Bergen — teams of 2, 500 kr per player. Group play to final from 15 November to 30 April. 20 000 kr prize pot and Cutter & Buck jackets.",
    ),
    alternates: langAlternates("/vinterturnering"),
  };
}

const prizes = (lang: Lang): { place: string; amount: string; note: string }[] => [
  {
    place: "1.",
    amount: `10${NNBSP}000 kr`,
    note: t(
      lang,
      `2 INNE Golf Bergen-jakker fra Cutter & Buck (verdi 5${NNBSP}000 kr) + 2 drikkeflasker`,
      `2 INNE Golf Bergen jackets from Cutter & Buck (worth 5${NNBSP}000 kr) + 2 bottles`,
    ),
  },
  { place: "2.", amount: `5${NNBSP}000 kr`, note: t(lang, "+ 2 drikkeflasker", "+ 2 bottles") },
  { place: "3.", amount: `3${NNBSP}000 kr`, note: t(lang, "+ 2 drikkeflasker", "+ 2 bottles") },
  { place: "4.", amount: `2${NNBSP}000 kr`, note: t(lang, "+ 2 drikkeflasker", "+ 2 bottles") },
];

export default async function VinterturneringPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          <Image
            src={vinterturneringHero}
            alt=""
            fill
            preload
            placeholder="blur"
            sizes="(max-width: 768px) 300vw, 100vw"
            quality={85}
            className={`${sub.heroImg} ${s.heroImg}`}
          />
          <div className={s.gradV} />
          <div className={s.gradH} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>{t(lang, "Turnering · Sesong 2025/2026", "Tournament · Season 2025/26")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            {t(lang, "Vinter​turneringen.", "The Winter Cup.")}
          </h1>
          <div data-fade="true" className={sub.chips}>
            <span className={sub.chipGhost}>{t(lang, "2-spillerlag", "Teams of 2")}</span>
            <span className={sub.chipGhost}>{t(lang, "500 kr per spiller", "500 kr per player")}</span>
            <span className={sub.chipGhost}>{t(lang, "15. nov – 30. apr", "15 Nov – 30 Apr")}</span>
          </div>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#pameld" size="lg">
              {t(lang, "NESTE SESONG: 2026/27", "NEXT SEASON: 2026/27")}
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Premiering ============ */}
      <section className={s.premier}>
        <div className="container">
          <div data-st="true" className={s.premierHead}>
            <h2 className={s.premierH2}>
              {t(lang, `Premiepott 20${NNBSP}000 kr.`, `20${NNBSP}000 kr prize pot.`)}
            </h2>
            <span className={s.premierNote}>
              {t(
                lang,
                `+ 2 Cutter & Buck-jakker (verdi 5${NNBSP}000 kr)`,
                `+ 2 Cutter & Buck jackets worth 5${NNBSP}000 kr`,
              )}
            </span>
          </div>
          <div className={s.prizeGrid}>
            {prizes(lang).map((prize, i) => (
              <div
                key={prize.place}
                data-st="true"
                className={`${s.prizeCell} ${i === 0 ? s.prizeCellFirst : ""} ${
                  i === prizes(lang).length - 1 ? s.prizeCellLast : ""
                }`}
              >
                <span className={s.prizePlace}>{prize.place}</span>
                <span className={s.prizeAmount}>{prize.amount}</span>
                <span className={s.prizeNote}>{prize.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Turneringsplan ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className={s.planWrap}>
          <div data-st="true">
            <Eyebrow>{t(lang, "5 faser", "Stages")}</Eyebrow>
            <h2 className={sub.h2}>{t(lang, "Fra pulje til finale.", "From group to final.")}</h2>
            <p className={s.planLead}>
              {t(
                lang,
                "Turneringen spilles i fem faser gjennom hele vinteren. Trykk på en fase for komplette regler, format og handicap-beregning.",
                "The tournament runs in five stages across the winter. Tap a stage for full rules, format and handicap math.",
              )}
            </p>
          </div>
          <VinterFaser lang={lang} />
        </div>
      </section>

      {/* ============ Neste sesong (sesongen 2025/26 er ferdigspilt) ============ */}
      <section id="pameld" className={`${sub.bg950} ${sub.section}`} style={{ scrollMarginTop: 80 }}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>{t(lang, "Sesongen er over", "Season done")}</Eyebrow>
            <h2 className={sub.h2}>{t(lang, "Vi sees til høsten.", "Back this autumn.")}</h2>
            <div className={sub.infoCard}>
              <span className={sub.infoCardKicker}>{t(lang, "Neste sesong", "Next season")}</span>
              <span className={sub.infoCardValue}>2026/27</span>
              <span className={sub.infoCardText}>
                {t(
                  lang,
                  "Sesongen 2025/26 er ferdigspilt. Påmeldingen for neste sesong åpner til høsten.",
                  "The 2025/26 season is played out. Sign-up for next season opens this autumn.",
                )}
              </span>
            </div>
            <p className={s.pameldNote}>
              {t(lang, "Puljer og lagoppsett publiseres i vår", "Groups and pairings are posted in our")}{" "}
              <a data-sweep="true" href={SITE.facebook} target="_blank" rel="noopener">
                {t(lang, "Facebook-gruppe", "Facebook group")}
              </a>
              .
            </p>
          </div>
          <div data-st="true">
            <div className={sub.infoCard}>
              <span className={sub.infoCardKicker}>{t(lang, "Bli varslet", "Be notified")}</span>
              <span className={sub.infoCardValue}>{t(lang, "Stå først i køen", "First in line")}</span>
              <span className={sub.infoCardText}>
                {t(
                  lang,
                  "Send oss en e-post, så får du beskjed når påmeldingen åpner.",
                  "Email us and we’ll tell you the moment sign-up opens.",
                )}
              </span>
            </div>
            <div className={sub.heroCtaWrap}>
              <Button
                as="a"
                href={mailtoSubject(t(lang, "Varsle meg — Vinterturneringen 2026/27", "Notify me — Winter Cup 2026/27"))}
                size="lg"
              >
                {t(lang, "VARSLE MEG", "NOTIFY ME")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
