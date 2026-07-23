import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { asLang, langAlternates, t } from "@/lib/i18n";
import sub from "../subpage.module.css";
import GavekortVelger from "./GavekortVelger";
import s from "./gavekort.module.css";

const THIN = " ";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Verdikort — INNE Golf Bergen", "Vouchers — INNE Golf Bergen"),
    description: t(
      lang,
      "Verdikort fra 820 kr med opptil 43 % ekstra verdi — spar på golf hele året. Gjelder i begge sentre.",
      "Vouchers from 820 kr with up to 43 % extra value — save on golf all year. Valid at both venues.",
    ),
    alternates: langAlternates("/gavekort"),
  };
}

export default async function GavekortPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      <section className={`${sub.bg900} ${sub.textHero} ${sub.textHeroShort}`}>
        <div className="container">
          <div data-fade="true">
            <Eyebrow>{t(lang, "Verdikort", "Vouchers")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={s.heroH1}>
            {t(lang, "Spar på golf.", "Save on golf.")}
          </h1>
          <p data-fade="true" className={s.heroLead}>
            {t(
              lang,
              `Fyll opp én gang og få opptil 43${THIN}% ekstra verdi å spille for — gjelder i begge sentre.`,
              `Top up once and get up to 43${THIN}% extra value to play for — valid at both venues.`,
            )}
          </p>
        </div>
      </section>

      <section className={s.cardsSection}>
        <div className="container">
          <GavekortVelger lang={lang} />

          <div data-st="true" className={s.perfectRow}>
            <span className={s.perfectLabel}>{t(lang, "Perfekt for", "Perfect for")}</span>
            <div className={s.perfectChips}>
              <span className={s.perfectChip}>{t(lang, "Faste spillere", "Regulars")}</span>
              <span className={s.perfectChip}>{t(lang, "Trening", "Practice")}</span>
              <span className={s.perfectChip}>{t(lang, "Runder med venner", "Friendly rounds")}</span>
              <span className={s.perfectChip}>{t(lang, "Bedrift", "Company")}</span>
            </div>
          </div>

          <div data-st="true" className={s.footRow}>
            <span className={s.footNote}>
              {t(
                lang,
                "Verdien ligger klar med en gang — bruk den når du vil.",
                "The value is ready right away — use it whenever.",
              )}
            </span>
            <span className={s.footPlaceholder}>
              {t(lang, "Gyldighet vises ved kjøp", "Expiry shown at checkout")}
            </span>
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
