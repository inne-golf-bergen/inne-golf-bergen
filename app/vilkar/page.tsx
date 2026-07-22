import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import { SITE } from "@/lib/site";
import s from "../legal.module.css";

export const metadata: Metadata = {
  title: "Kjøpsvilkår — INNE Golf Bergen",
  description: "Kjøpsvilkår for INNE Golf Bergen.",
};

export default function VilkarPage() {
  return (
    <main>
      <section className={s.hero}>
        <div className={s.narrow}>
          <Eyebrow>Vilkår</Eyebrow>
          <h1 className={s.h1}>Kjøpsvilkår.</h1>
          <p className={s.heroLead}>
            Sist oppdatert [DATO]. Vilkårene gjelder alle kjøp og bookinger hos INNE Golf Bergen ({SITE.legalName},
            org.nr. {SITE.orgNr}).
          </p>
        </div>
      </section>

      <section className={s.body}>
        <div className={s.narrow}>
          <div className={`legal-grid ${s.grid}`}>
            <nav aria-label="Innhold" className={`legal-toc ${s.toc}`}>
              <span className={s.tocLabel}>Innhold</span>
              <a href="#vilkar-kjop" className={s.tocLink}>
                01 · Kjøpsvilkår
              </a>
              <a href="#vilkar-booking" className={s.tocLink}>
                02 · Booking og avbestilling
              </a>
              <a href={`mailto:${SITE.email}`} className={`${s.tocLink} ${s.tocLinkLast}`}>
                Kontakt
              </a>
            </nav>

            <div className={s.content}>
              <section id="vilkar-kjop" className={s.sectionAnchor}>
                <div className={s.sectionHead}>
                  <span className={s.sectionNum}>01</span>
                  <h2 className={s.sectionH2}>Kjøpsvilkår</h2>
                </div>
                <div className={s.slot}>
                  <span className={s.slotKicker}>Slot for verbatim tekst</span>
                  <span className={s.slotTitle}>[Lim inn kjøpsvilkår]</span>
                  <span className={s.slotText}>Kundens kjøpsvilkår limes inn her ordrett. Teksten skal ikke omskrives.</span>
                </div>
              </section>

              <section id="vilkar-booking" className={s.sectionAnchor}>
                <div className={s.sectionHead}>
                  <span className={s.sectionNum}>02</span>
                  <h2 className={s.sectionH2}>Booking og avbestilling</h2>
                </div>
                <div className={s.slot}>
                  <span className={s.slotKicker}>Ny seksjon</span>
                  <span className={s.slotTitle}>[Settes inn]</span>
                  <span className={s.slotText}>
                    Regler for booking, endring og avbestilling settes inn her etter avklaring med INNE.
                  </span>
                </div>
              </section>

              <p className={s.footNote}>
                Spørsmål om vilkårene?{" "}
                <a data-sweep="true" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>{" "}
                · {SITE.legalName} · Org.nr.{" "}
                {SITE.orgNr}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
