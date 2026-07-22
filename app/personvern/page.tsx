import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import { SITE } from "@/lib/site";
import s from "../legal.module.css";

export const metadata: Metadata = {
  title: "Personvern — INNE Golf Bergen",
  description: "Personvernerklæring for INNE Golf Bergen (IN GOLF BERGEN DA, org.nr. 933 998 584).",
};

const SECTIONS: { id: string; num: string; title: string; text?: string }[] = [
  { id: "pv-ansvar", num: "01", title: "Behandlingsansvarlig" },
  {
    id: "pv-opplysninger",
    num: "02",
    title: "Hvilke opplysninger",
    text: "Beskrivelse av hvilke personopplysninger som samles inn ved booking, medlemskap, verdikort og påmelding til turneringer settes inn her.",
  },
  {
    id: "pv-formal",
    num: "03",
    title: "Formål",
    text: "Formålet med behandlingen og rettslig grunnlag (avtale, samtykke, berettiget interesse) settes inn her.",
  },
  {
    id: "pv-lagring",
    num: "04",
    title: "Lagringstid",
    text: "Hvor lenge opplysningene lagres, og rutiner for sletting, settes inn her.",
  },
  {
    id: "pv-rettigheter",
    num: "05",
    title: "Dine rettigheter",
    text: "Innsyn, retting, sletting, dataportabilitet og klageadgang til Datatilsynet beskrives her.",
  },
];

export default function PersonvernPage() {
  return (
    <main>
      <section className={s.hero}>
        <div className={s.narrow}>
          <Eyebrow>Personvern</Eyebrow>
          <h1 className={s.h1}>Personvern.</h1>
          <p className={s.heroLead}>
            Slik behandler INNE Golf Bergen personopplysninger. Utkast — hele erklæringen krever juridisk gjennomgang
            før publisering.
          </p>
        </div>
      </section>

      <section className={s.body}>
        <div className={s.narrow}>
          <div className={`legal-grid ${s.grid}`}>
            <nav aria-label="Innhold" className={`legal-toc ${s.toc}`}>
              <span className={s.tocLabel}>Innhold</span>
              <a href="#pv-ansvar" className={s.tocLink}>
                01 · Behandlingsansvarlig
              </a>
              <a href="#pv-opplysninger" className={s.tocLink}>
                02 · Hvilke opplysninger
              </a>
              <a href="#pv-formal" className={s.tocLink}>
                03 · Formål
              </a>
              <a href="#pv-lagring" className={s.tocLink}>
                04 · Lagringstid
              </a>
              <a href="#pv-rettigheter" className={s.tocLink}>
                05 · Dine rettigheter
              </a>
              <a href="#pv-kontakt" className={`${s.tocLink} ${s.tocLinkLast}`}>
                06 · Kontakt
              </a>
            </nav>

            <div className={`${s.content} ${s.contentTight}`}>
              {SECTIONS.map((section) => (
                <section key={section.id} id={section.id} className={s.sectionAnchor}>
                  <div className={s.sectionHead}>
                    <span className={s.sectionNum}>{section.num}</span>
                    <h2 className={s.sectionH2}>{section.title}</h2>
                  </div>
                  <div className={s.sectionBody}>
                    {section.id === "pv-ansvar" ? (
                      <div className={s.orgCard}>
                        <span className={s.orgName}>{SITE.legalName}</span>
                        <span className={s.orgMeta}>
                          Org.nr. {SITE.orgNr} · {SITE.email}
                        </span>
                      </div>
                    ) : (
                      <p className={s.sectionText}>{section.text}</p>
                    )}
                    <span className={s.reviewTag}>[Juridisk gjennomgang kreves]</span>
                  </div>
                </section>
              ))}

              <section id="pv-kontakt" className={s.sectionAnchor}>
                <div className={s.sectionHead}>
                  <span className={s.sectionNum}>06</span>
                  <h2 className={s.sectionH2}>Kontakt</h2>
                </div>
                <div className={s.sectionBody}>
                  <p className={s.sectionText}>
                    Spørsmål om personvern rettes til{" "}
                    <a data-sweep="true" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                    . {SITE.legalName}{" "}
                    · Org.nr. {SITE.orgNr}.
                  </p>
                  <span className={s.reviewTag}>[Juridisk gjennomgang kreves]</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
