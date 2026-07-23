import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import { asLang, langAlternates, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import s from "../legal.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Kjøpsvilkår — INNE Golf Bergen", "Terms — INNE Golf Bergen"),
    description: t(lang, "Kjøpsvilkår for INNE Golf Bergen.", "Terms for INNE Golf Bergen."),
    alternates: langAlternates("/vilkar"),
  };
}

export default async function VilkarPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      <section className={s.hero}>
        <div className={s.narrow}>
          <Eyebrow>{t(lang, "Vilkår", "Terms")}</Eyebrow>
          <h1 className={s.h1}>{t(lang, "Kjøpsvilkår.", "Sales terms.")}</h1>
          <p className={s.heroLead}>
            {t(
              lang,
              "Vilkårene gjelder alle kjøp og bookinger hos INNE Golf Bergen (",
              "The terms cover all purchases and booking at INNE Golf Bergen (",
            )}
            {SITE.legalName}, org.nr. {SITE.orgNr}).
          </p>
        </div>
      </section>

      <section className={s.body}>
        <div className={s.narrow}>
          <div className={`legal-grid ${s.grid}`}>
            <nav aria-label={t(lang, "Innhold", "Content")} className={`legal-toc ${s.toc}`}>
              <span className={s.tocLabel}>{t(lang, "Innhold", "Content")}</span>
              <a href="#vilkar-kjop" className={s.tocLink}>
                {t(lang, "01 · Kjøpsvilkår", "01 · Sales terms")}
              </a>
              <a href="#vilkar-booking" className={s.tocLink}>
                {t(lang, "02 · Booking og avbestilling", "02 · Booking & cancellation")}
              </a>
              <a href={`mailto:${SITE.email}`} className={`${s.tocLink} ${s.tocLinkLast}`}>
                {t(lang, "Kontakt", "Contact")}
              </a>
            </nav>

            <div className={s.content}>
              <section id="vilkar-kjop" className={s.sectionAnchor}>
                <div className={s.sectionHead}>
                  <span className={s.sectionNum}>01</span>
                  <h2 className={s.sectionH2}>{t(lang, "Kjøpsvilkår", "Sales terms")}</h2>
                </div>
                {/* Internal handoff note: INNE’s sales terms go in this slot
                    verbatim once supplied — do not rewrite them. */}
                <div className={s.slot}>
                  <span className={s.slotKicker}>{t(lang, "Under arbeid", "In progress")}</span>
                  <span className={s.slotTitle}>{t(lang, "Fullstendige vilkår kommer", "Full terms coming")}</span>
                  <span className={s.slotText}>
                    {t(
                      lang,
                      "Frem til de er publisert: spørsmål om kjøp og booking besvares på post@innegolfbergen.no.",
                      "Until they’re published, purchase and booking questions: post@innegolfbergen.no.",
                    )}
                  </span>
                </div>
              </section>

              <section id="vilkar-booking" className={s.sectionAnchor}>
                <div className={s.sectionHead}>
                  <span className={s.sectionNum}>02</span>
                  <h2 className={s.sectionH2}>{t(lang, "Booking og avbestilling", "Booking & cancellation")}</h2>
                </div>
                <div className={s.slot}>
                  <span className={s.slotKicker}>{t(lang, "Under arbeid", "In progress")}</span>
                  <span className={s.slotTitle}>{t(lang, "Regler kommer", "Coming")}</span>
                  <span className={s.slotText}>
                    {t(
                      lang,
                      "Regler for booking, endring og avbestilling publiseres her.",
                      "Booking, change and cancellation rules will appear here.",
                    )}
                  </span>
                </div>
              </section>

              <p className={s.footNote}>
                {t(lang, "Spørsmål om vilkårene?", "Questions?")}{" "}
                <a data-sweep="true" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>{" "}
                · {SITE.legalName} · Org.nr. {SITE.orgNr}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
