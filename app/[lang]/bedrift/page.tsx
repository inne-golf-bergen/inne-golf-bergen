import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { asLang, langAlternates, langHref, t } from "@/lib/i18n";
import sub from "../subpage.module.css";
import BedriftForm from "./BedriftForm";
import s from "./bedrift.module.css";

const THIN = " ";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Bedrift — INNE Golf Bergen", "Company — INNE Golf Bergen"),
    description: t(
      lang,
      "Firmakveld hos INNE Golf Bergen — kickoff, turneringskveld eller VIP-kveld i losjen. Turneringsmodus, premier og mat levert. Vi skreddersyr.",
      "Company nights at INNE — kickoff, tournament night or VIP night in the box. Tournament mode, prizes, food delivered. We tailor it.",
    ),
    alternates: langAlternates("/bedrift"),
  };
}

export default async function BedriftPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          {/* 300vw on mobile: the portrait cover crop is height-constrained, so
              100vw would serve a ~750px file upscaled ~2.6× */}
          <Image
            src="/assets/photos/bedrift-bay.jpg"
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
            <Eyebrow>{t(lang, "Bedrift", "Company")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            <span className={s.desktopCopy}>{t(lang, "Firmakvelden alle møter opp på.", "The work night no one skips.")}</span>
            <span className={s.mobileCopy}>{t(lang, "Kvelden alle møter opp på.", "The night no one skips.")}</span>
          </h1>
          <p data-fade="true" className={s.heroLead}>
            {t(
              lang,
              "Kickoff, kundekveld eller lagbygging. Turneringsmodus gjør konkurransen enkel — alle slår, skjermen holder styr på resten.",
              "Kickoff, client night or team building. Tournament mode keeps it simple — everyone hits, the screen tracks the rest.",
            )}
          </p>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#tilbud" size="lg">
              {t(lang, "FÅ TILBUD", "GET QUOTE")}
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Pakker ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>{t(lang, "Pakker", "Plans")}</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>{t(lang, "Velg format.", "Pick format.")}</h2>
          </div>
          <div className={s.pakkeGrid}>
            <div data-st="true" className={s.pakkeCard}>
              <span className={s.pakkeNum}>01</span>
              <h3 className={s.pakkeTitle}>Kickoff</h3>
              <p className={s.pakkeCopy}>
                {t(
                  lang,
                  "1,5 time simulatorgolf i turneringsmodus. Rask å sette i gang, morsom for alle nivåer.",
                  "1.5 hours of simulator golf in tournament mode. Quick to start, fun at every level.",
                )}
              </p>
            </div>

            <div data-st="true" className={`${s.pakkeCard} ${s.pakkeCardFeatured}`}>
              <div className={s.pakkeNumRow}>
                <span className={s.pakkeNum}>02</span>
                <span className={s.pakkeBadge}>{t(lang, "Mest populær", "Most popular")}</span>
              </div>
              <h3 className={s.pakkeTitle}>{t(lang, "Turneringskveld", "Tournament")}</h3>
              <p className={`${s.pakkeCopy} ${s.pakkeCopyFeatured}`}>
                {t(
                  lang,
                  `2 timer med premier og mat levert. Maten kommer med 20${THIN}% via Bella Italia-avtalen.`,
                  `2 hours with prizes and food delivered — 20${THIN}% off via the Bella Italia deal.`,
                )}
              </p>
            </div>

            <div data-st="true" className={s.pakkeCard}>
              <span className={s.pakkeNum}>03</span>
              <h3 className={s.pakkeTitle}>{t(lang, "VIP-kveld", "VIP night")}</h3>
              <p className={s.pakkeCopy}>
                {t(
                  lang,
                  "Sim 3-losjen for dere selv — privat for 6–8 personer, egen bay og storskjerm.",
                  "The Sim 3 box to yourselves — private for 6–8, own bay and big screen.",
                )}
              </p>
            </div>
          </div>
          <p data-st="true" className={s.skreddersyr}>
            {t(lang, "Vi skreddersyr — også", "We tailor it — even")}{" "}
            <Link data-sweep="true" href={langHref(lang, "/polf")} style={{ color: "var(--orange-400)" }}>
              {t(lang, "POLF for bedrifter", "POLF for companies")}
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ============ Tilbud ============ */}
      <section id="tilbud" className={`${sub.bg900} ${sub.section}`} style={{ scrollMarginTop: 80 }}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>{t(lang, "Be om tilbud", "Get a quote")}</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>{t(lang, "Få tilbud.", "Get quote.")}</h2>
            <p className={s.tilbudLead}>
              {t(
                lang,
                "Fortell oss litt om kvelden, så setter vi opp et forslag som passer laget. Svar innen én arbeidsdag.",
                "Tell us a bit about the night and we’ll draft a plan that fits the team. Reply within one workday.",
              )}
            </p>
          </div>
          <div data-st="true">
            <BedriftForm lang={lang} />
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
