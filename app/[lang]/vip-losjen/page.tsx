import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { asLang, type Lang, langAlternates, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import sub from "../subpage.module.css";
import s from "./vip.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "VIP-losjen — INNE Golf Bergen", "VIP Box — INNE Golf Bergen"),
    description: t(
      lang,
      "VIP-losjen i Åsane — widescreen-simulator i 16:9, eget sofahjørne for 6–8 personer, pokerbord og live sport på storskjerm. Deres egen kveld.",
      "The VIP Box in Åsane — 16:9 widescreen simulator, sofa corner for 6–8, poker table and live sport on the big screen. Your own night.",
    ),
    alternates: langAlternates("/vip-losjen"),
  };
}

const specs = (lang: Lang): [string, string][] => [
  [t(lang, "Kapasitet", "Capacity"), t(lang, "6–8 personer", "6–8 people")],
  ["Simulator", "16:9 widescreen"],
  [t(lang, "Skjerm", "Screen"), t(lang, "Live sport", "Live sport")],
  [t(lang, "Spill", "Games"), t(lang, "Pokerbord", "Poker")],
  ["Bay", t(lang, "Egen bay", "Own bay")],
];

const chips = (lang: Lang) => [
  t(lang, "6–8 personer", "6–8 people"),
  "16:9 widescreen",
  t(lang, "Storskjerm med live sport", "Big screen, live sport"),
  t(lang, "Pokerbord", "Poker"),
  t(lang, "Egen bay", "Own bay"),
];

export default async function VipLosjenPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          <Image
            src="/assets/photos/vip-losjen.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 300vw, 100vw"
            quality={85}
            className={`${sub.heroImg} ${s.heroImg}`}
          />
          <div className={s.gradV} />
          <div className={s.gradH} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>{t(lang, "Åsane · 6–8 personer", "Åsane · 6–8 people")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            <span className={s.heroLine}>{t(lang, "VIP-losjen.", "VIP Box.")}</span>
            <span className={`${s.heroLine} ${s.heroAccent}`}>
              {t(lang, "Deres egen kveld.", "Your own night.")}
            </span>
          </h1>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href={SITE.bookAsane} size="lg">
              {t(lang, "BOOK VIP-LOSJEN", "BOOK VIP BOX")}
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Om losjen ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>{t(lang, "Losjen", "Inside")}</Eyebrow>
            <h2 className={`${sub.h2} ${s.omH2}`}>{t(lang, "Golf på sitt beste.", "Golf at its best.")}</h2>
            <p className={s.omLead}>
              {t(
                lang,
                "En førsteklasses golfopplevelse i Åsane. Imponerende widescreen-simulator i 16:9-format — perfekt for favorittbanene. Eget sofahjørne med plass til 6–8 personer, pokerbord og live sport på storskjerm. Golf på sitt beste, kombinert med sosial hygge i en eksklusiv setting.",
                "A first-class golf experience in Åsane. An impressive 16:9 widescreen simulator — perfect for your favourite courses. A sofa corner for 6–8, poker table and live sport on the big screen. Golf at its best, with great company in an exclusive setting.",
              )}
            </p>
          </div>
          <div data-st="true" className={sub.specList}>
            {specs(lang).map(([label, value], i) => (
              <div key={label} className={`${sub.specRow} ${i === specs(lang).length - 1 ? sub.specRowLast : ""}`}>
                <span className={sub.specLabel}>{label}</span>
                <span className={sub.specValue}>{value}</span>
              </div>
            ))}
            <div className={s.chipRow}>
              {chips(lang).map((chip) => (
                <span key={chip} className={sub.chip}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ Passer til ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>{t(lang, "Passer til", "Made for")}</Eyebrow>
          </div>
          <div className={s.passerGrid}>
            {[
              t(lang, "Vors", "Pre-party"),
              t(lang, "Date night", "Date night"),
              t(lang, "Kundekveld", "Clients"),
              t(lang, "Kampkveld", "Game day"),
            ].map((label) => (
              <div key={label} data-st="true" className={s.passerCell}>
                <span className={s.passerText}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className={sub.copperBand}>
        <div data-st="true" className={`container ${sub.copperInner}`}>
          <div className={sub.copperText}>
            <h2 className={sub.copperH2}>{t(lang, "Deres egen kveld.", "Your own night.")}</h2>
            <p className={sub.copperCopy}>
              {t(
                lang,
                "Widescreen-simulator, eget sofahjørne, pokerbord og live sport i Åsane.",
                "Widescreen simulator, sofa corner, poker table and live sport in Åsane.",
              )}
            </p>
          </div>
          <a href={SITE.bookAsane} className={sub.darkCta}>
            {t(lang, "Book VIP-losjen", "Book VIP Box")}
          </a>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
