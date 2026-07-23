import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import { asLang, type Lang, langAlternates, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import s from "../legal.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Personvern — INNE Golf Bergen", "Privacy — INNE Golf Bergen"),
    description: t(
      lang,
      "Personvernerklæring for INNE Golf Bergen (IN GOLF BERGEN DA, org.nr. 933 998 584).",
      "Privacy policy for INNE Golf Bergen (IN GOLF BERGEN DA, org. no. 933 998 584).",
    ),
    alternates: langAlternates("/personvern"),
  };
}

const sections = (lang: Lang): { id: string; num: string; title: string; text?: string }[] => [
  { id: "pv-ansvar", num: "01", title: t(lang, "Behandlingsansvarlig", "Data controller") },
  {
    id: "pv-opplysninger",
    num: "02",
    title: t(lang, "Hvilke opplysninger", "What we collect"),
    text: t(
      lang,
      "Full oversikt over opplysningene som samles inn ved booking, medlemskap, verdikort og turneringspåmelding kommer her.",
      "A full list of the data collected for booking, membership, vouchers and tournament entry is coming here.",
    ),
  },
  {
    id: "pv-formal",
    num: "03",
    title: t(lang, "Formål", "Purpose"),
    text: t(
      lang,
      "Formålet med behandlingen og rettslig grunnlag (avtale, samtykke, berettiget interesse) beskrives her.",
      "The purpose of processing and legal basis (contract, consent, legitimate interest) appears here.",
    ),
  },
  {
    id: "pv-lagring",
    num: "04",
    title: t(lang, "Lagringstid", "Retention"),
    text: t(
      lang,
      "Hvor lenge opplysningene lagres, og rutiner for sletting, publiseres her.",
      "How long data is stored, and deletion routines, appear here.",
    ),
  },
  {
    id: "pv-rettigheter",
    num: "05",
    title: t(lang, "Dine rettigheter", "Your rights"),
    text: t(
      lang,
      "Innsyn, retting, sletting, dataportabilitet og klageadgang til Datatilsynet beskrives her.",
      "Access, correction, deletion, portability and complaints to Datatilsynet go here.",
    ),
  },
];

export default async function PersonvernPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      <section className={s.hero}>
        <div className={s.narrow}>
          <Eyebrow>{t(lang, "Personvern", "Privacy")}</Eyebrow>
          <h1 className={s.h1}>{t(lang, "Personvern.", "Privacy.")}</h1>
          <p className={s.heroLead}>
            {t(
              lang,
              "Slik behandler INNE Golf Bergen personopplysninger. Den fullstendige erklæringen er under arbeid.",
              "How INNE Golf Bergen handles personal data. The full policy is in progress.",
            )}
          </p>
        </div>
      </section>

      <section className={s.body}>
        <div className={s.narrow}>
          <div className={`legal-grid ${s.grid}`}>
            <nav aria-label={t(lang, "Innhold", "Content")} className={`legal-toc ${s.toc}`}>
              <span className={s.tocLabel}>{t(lang, "Innhold", "Content")}</span>
              <a href="#pv-ansvar" className={s.tocLink}>
                {t(lang, "01 · Behandlingsansvarlig", "01 · Data controller")}
              </a>
              <a href="#pv-opplysninger" className={s.tocLink}>
                {t(lang, "02 · Hvilke opplysninger", "02 · What we collect")}
              </a>
              <a href="#pv-formal" className={s.tocLink}>
                {t(lang, "03 · Formål", "03 · Purpose")}
              </a>
              <a href="#pv-lagring" className={s.tocLink}>
                {t(lang, "04 · Lagringstid", "04 · Retention")}
              </a>
              <a href="#pv-rettigheter" className={s.tocLink}>
                {t(lang, "05 · Dine rettigheter", "05 · Your rights")}
              </a>
              <a href="#pv-kontakt" className={`${s.tocLink} ${s.tocLinkLast}`}>
                {t(lang, "06 · Kontakt", "06 · Contact")}
              </a>
            </nav>

            <div className={`${s.content} ${s.contentTight}`}>
              {sections(lang).map((section) => (
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
                    <span className={s.reviewTag}>{t(lang, "Under arbeid", "In progress")}</span>
                  </div>
                </section>
              ))}

              <section id="pv-kontakt" className={s.sectionAnchor}>
                <div className={s.sectionHead}>
                  <span className={s.sectionNum}>06</span>
                  <h2 className={s.sectionH2}>{t(lang, "Kontakt", "Contact")}</h2>
                </div>
                <div className={s.sectionBody}>
                  <p className={s.sectionText}>
                    {t(lang, "Spørsmål om personvern rettes til", "Privacy questions go to")}{" "}
                    <a data-sweep="true" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                    . {SITE.legalName} · Org.nr. {SITE.orgNr}.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
