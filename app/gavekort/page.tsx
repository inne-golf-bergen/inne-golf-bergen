import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import sub from "../subpage.module.css";
import GavekortVelger from "./GavekortVelger";
import s from "./gavekort.module.css";

const THIN = "\u2009";

export const metadata: Metadata = {
  title: "Verdikort — INNE Golf Bergen",
  description: "Verdikort fra 820 kr med opptil 30 % ekstra verdi — spar på golf hele året. Gjelder i begge sentre.",
};

export default function GavekortPage() {
  return (
    <main>
      <section className={`${sub.bg900} ${sub.textHero} ${sub.textHeroShort}`}>
        <div className="container">
          <div data-fade="true">
            <Eyebrow>Verdikort</Eyebrow>
          </div>
          <h1 data-fade="true" className={s.heroH1}>
            Spar på golf.
          </h1>
          <p data-fade="true" className={s.heroLead}>
            {`Fyll opp én gang og få opptil 30${THIN}% ekstra verdi å spille for — gjelder i begge sentre.`}
          </p>
        </div>
      </section>

      <section className={s.cardsSection}>
        <div className="container">
          <GavekortVelger />

          <div data-st="true" className={s.perfectRow}>
            <span className={s.perfectLabel}>Perfekt for</span>
            <div className={s.perfectChips}>
              <span className={s.perfectChip}>Faste spillere</span>
              <span className={s.perfectChip}>Trening</span>
              <span className={s.perfectChip}>Runder med venner</span>
              <span className={s.perfectChip}>Bedrift</span>
            </div>
          </div>

          <div data-st="true" className={s.footRow}>
            <span className={s.footNote}>Verdien ligger klar med en gang — bruk den når du vil.</span>
            <span className={s.footPlaceholder}>[Gyldighet/utløp bekreftes]</span>
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
