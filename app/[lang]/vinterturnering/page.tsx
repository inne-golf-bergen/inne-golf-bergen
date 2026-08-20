import type { Metadata } from "next";
import Image from "next/image";
import vinterturneringHero from "@/public/assets/photos/vinterturnering-hero.webp";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { VINTER } from "@/lib/content";
import { fmt, fmtSp } from "@/lib/format";
import { asLang, type Lang, langAlternates, t } from "@/lib/i18n";
import { mailtoSubject, SITE } from "@/lib/site";
import sub from "../subpage.module.css";
import VinterFaser from "./VinterFaser";
import VinterForm from "./VinterForm";
import s from "./vinter.module.css";

/* Season state (status, dates, fee, prizes) lives in content/turnering-vinter.json,
   edited by the owner in /admin — the #pameld section below switches on status.
   Identical ${TOKEN}s in NO/EN t() pairs keep scripts/check-i18n-lengths.mjs fair. */
const VPRIS = fmt(VINTER.prisPerSpiller); // 500
const LAG = fmt(VINTER.prisPerSpiller * 2); // 1 000
const VPOTT = fmt(VINTER.premiepott); // 20 000
const VPOTT_SP = fmtSp(VINTER.premiepott); // plain-space flavour for meta
const DATO_NO = VINTER.datoTekst.no;
const DATO_EN = VINTER.datoTekst.en;

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
      `Vinterturneringen hos INNE Golf Bergen — 2-spillerlag, ${VPRIS} kr per spiller. Gruppespill til finale, ${DATO_NO}. Premiepott ${VPOTT_SP} kr og Cutter & Buck-jakker.`,
      `The Winter Cup at INNE Golf Bergen — teams of 2, ${VPRIS} kr per player. Group play to final, ${DATO_EN}. ${VPOTT_SP} kr prize pot and Cutter & Buck jackets.`,
    ),
    alternates: langAlternates("/vinterturnering"),
  };
}

const prizes = (lang: Lang): { place: string; amount: string; note: string }[] =>
  VINTER.premier.map((p) => ({
    place: p.plass,
    amount: `${fmt(p.belop)} kr`,
    note: t(lang, p.note.no, p.note.en),
  }));

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
            <Eyebrow>{t(lang, `Turnering · Sesong ${VINTER.sesong.no}`, `Tournament · Season ${VINTER.sesong.en}`)}</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            {t(lang, "Vinter​turneringen.", "The Winter Cup.")}
          </h1>
          <div data-fade="true" className={sub.chips}>
            <span className={sub.chipGhost}>{t(lang, "2-spillerlag", "Teams of 2")}</span>
            <span className={sub.chipGhost}>{t(lang, `${VPRIS} kr per spiller`, `${VPRIS} kr per player`)}</span>
            <span className={sub.chipGhost}>{t(lang, DATO_NO, DATO_EN)}</span>
          </div>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#pameld" size="lg">
              {VINTER.status === "pamelding"
                ? t(lang, "MELD PÅ LAGET", "REGISTER TEAM")
                : VINTER.status === "pagaende"
                  ? t(lang, "SESONGEN ER I GANG", "SEASON UNDERWAY")
                  : t(lang, `NESTE SESONG: ${VINTER.nesteSesong}`, `NEXT SEASON: ${VINTER.nesteSesong}`)}
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Premiering ============ */}
      <section className={s.premier}>
        <div className="container">
          <div data-st="true" className={s.premierHead}>
            <h2 className={s.premierH2}>
              {t(lang, `Premiepott ${VPOTT} kr.`, `${VPOTT} kr prize pot.`)}
            </h2>
            <span className={s.premierNote}>{t(lang, VINTER.jakkeNote.no, VINTER.jakkeNote.en)}</span>
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

      {/* ============ Påmelding / sesongstatus (content/turnering-vinter.json) ============ */}
      <section id="pameld" className={`${sub.bg950} ${sub.section}`} style={{ scrollMarginTop: 80 }}>
        <div className={`container ${sub.splitGrid}`}>
          {VINTER.status === "pamelding" ? (
            <>
              <div data-st="true">
                <Eyebrow>{t(lang, "Meld på", "Sign up")}</Eyebrow>
                <h2 className={sub.h2}>{t(lang, "Finn en makker.", "Find a partner.")}</h2>
                <div className={sub.infoCard}>
                  <span className={sub.infoCardKicker}>{t(lang, "Deltakeravgift", "Entry fee")}</span>
                  <span className={sub.infoCardValue}>
                    {t(lang, `${VPRIS} kr per spiller`, `${VPRIS} kr per player`)}
                  </span>
                  <span className={sub.infoCardText}>
                    {t(lang, "Betales til Vipps", "Pay via Vipps")}{" "}
                    <strong className={sub.accent}>#{VINTER.vipps}</strong>{" "}
                    {t(
                      lang,
                      `(${LAG} kr for laget). Påmeldingen er bekreftet når avgiften er registrert.`,
                      `(${LAG} kr per team). Your entry is confirmed once the fee is registered.`,
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
                <VinterForm lang={lang} prisPerSpiller={VINTER.prisPerSpiller} vipps={VINTER.vipps} />
              </div>
            </>
          ) : (
            <>
              <div data-st="true">
                {VINTER.status === "pagaende" ? (
                  <>
                    <Eyebrow>{t(lang, "Sesongen er i gang", "Season underway")}</Eyebrow>
                    <h2 className={sub.h2}>{t(lang, "Følg med videre.", "Follow along.")}</h2>
                    <div className={sub.infoCard}>
                      <span className={sub.infoCardKicker}>Status</span>
                      <span className={sub.infoCardValue}>{t(lang, "Sesongen spilles", "Season underway")}</span>
                      <span className={sub.infoCardText}>
                        {t(
                          lang,
                          "Påmeldingen er stengt. Resultater og oppdateringer publiseres i vår Facebook-gruppe.",
                          "Entry is closed. Results and updates are posted in our Facebook group.",
                        )}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <Eyebrow>{t(lang, "Sesongen er over", "Season done")}</Eyebrow>
                    <h2 className={sub.h2}>{t(lang, "Vi sees til høsten.", "Back this autumn.")}</h2>
                    <div className={sub.infoCard}>
                      <span className={sub.infoCardKicker}>{t(lang, "Neste sesong", "Next season")}</span>
                      <span className={sub.infoCardValue}>{VINTER.nesteSesong}</span>
                      <span className={sub.infoCardText}>
                        {t(
                          lang,
                          `Sesongen ${VINTER.sesong.no} er ferdigspilt. Påmeldingen for neste sesong åpner til høsten.`,
                          `The ${VINTER.sesong.en} season is played out. Sign-up for next season opens this autumn.`,
                        )}
                      </span>
                    </div>
                  </>
                )}
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
                    href={mailtoSubject(
                      t(
                        lang,
                        `Varsle meg — Vinterturneringen ${VINTER.nesteSesong}`,
                        `Notify me — Winter Cup ${VINTER.nesteSesong}`,
                      ),
                    )}
                    size="lg"
                  >
                    {t(lang, "VARSLE MEG", "NOTIFY ME")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
