import type { Metadata } from "next";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { asLang, langAlternates, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import sub from "../subpage.module.css";
import s from "./praktisk.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Parkering, adgang & kontakt — INNE Golf Bergen", "Parking, access & contact — INNE Golf Bergen"),
    description: t(
      lang,
      "Parkering, adgang og kontakt for INNE Golf Bergen i Åsane og Sandviken. Selvbetjente sentre, åpne hele døgnet.",
      "Parking, access and contact for INNE Golf Bergen in Åsane and Sandviken. Self-serve venues, open 24/7.",
    ),
    alternates: langAlternates("/praktisk"),
  };
}

export default async function PraktiskPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.bg900} ${sub.textHero} ${sub.textHeroShort}`}>
        <div className="container">
          <div data-fade="true">
            <Eyebrow>{t(lang, "Praktisk", "Info")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={s.heroH1}>
            {t(lang, <>Parkering, adgang &amp; kontakt.</>, <>Parking, access &amp; contact.</>)}
          </h1>
          <p data-fade="true" className={s.heroLead}>
            {t(
              lang,
              "Begge sentre er selvbetjente og åpne hele døgnet. Her finner du frem — og inn.",
              "Both venues are self-serve and open 24/7. Here's how to find us — and get in.",
            )}
          </p>
        </div>
      </section>

      {/* ============ Åsane ============ */}
      <section className={`${sub.bg950} ${sub.sectionShort}`}>
        <div className={`container ${s.centreGrid}`}>
          <div data-st="true">
            <div className={s.photoFrame}>
              <div className={s.photoFrameHead}>
                <span className={s.photoFrameLabel}>{t(lang, "Flyfoto · Åsane", "Aerial · Åsane")}</span>
                <span className={s.photoFrameNote}>{t(lang, <>Inngang &amp; parkering</>, <>Entrance &amp; parking</>)}</span>
              </div>
              <div className={s.photoMedia}>
                <Image
                  src="/assets/praktisk-asane-aerial.jpg"
                  alt={t(
                    lang,
                    "Annotert flyfoto av INNE Golf Bergen Åsane med inngang og parkering",
                    "Annotated aerial of INNE Golf Åsane with entrance and parking",
                  )}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className={s.photoImg}
                />
              </div>
            </div>
          </div>
          <div data-st="true" className={s.centreCol}>
            <h2 className={s.centreH2}>Åsane</h2>
            <div className={s.centreRows}>
              <div className={s.centreRow}>
                <span className={s.centreRowLabel}>{t(lang, "Adresse", "Address")}</span>
                <a
                  data-sweep="true"
                  href="https://maps.google.com/?q=Haukedalen+1,+5121+Ulset"
                  target="_blank"
                  rel="noopener"
                  className={s.centreRowValue}
                >
                  Haukedalen 1, 5121 Ulset
                </a>
              </div>
              <div className={s.centreRow}>
                <span className={s.centreRowLabel}>{t(lang, "Parkering", "Parking")}</span>
                <span className={s.centreRowValue}>{t(lang, "Egne P-plasser", "Own spaces")}</span>
              </div>
              <div className={`${s.centreRow} ${s.centreRowLast}`}>
                <span className={s.centreRowLabel}>{t(lang, "Åpent", "Open")}</span>
                <span className={s.centreRowValue}>{t(lang, "Hele døgnet", "24/7")}</span>
              </div>
            </div>
            <div className={sub.noteBox}>
              <p className={sub.noteBoxText}>
                {t(
                  lang,
                  "INNE Golf Bergen Åsane har egne P-plasser — vennligst bruk våre plasser når dere besøker oss.",
                  "INNE Golf Bergen Åsane has its own spaces — please use ours when you visit.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Sandviken ============ */}
      <section className={`${sub.bg900} ${sub.sectionShort}`}>
        <div className={`container ${s.centreGrid}`}>
          <div data-st="true" className={`${s.centreCol} ${s.orderSecond}`}>
            <h2 className={s.centreH2}>Sandviken</h2>
            <div className={s.centreRows}>
              <div className={s.centreRow}>
                <span className={s.centreRowLabel}>{t(lang, "Adresse", "Address")}</span>
                <a
                  data-sweep="true"
                  href="https://maps.google.com/?q=Sandviksbodene+9,+5035+Bergen"
                  target="_blank"
                  rel="noopener"
                  className={s.centreRowValue}
                >
                  Sandviksbodene 9, 5035 Bergen
                </a>
              </div>
              <div className={s.centreRow}>
                <span className={s.centreRowLabel}>{t(lang, "Parkering", "Parking")}</span>
                <span className={s.centreRowValue}>{t(lang, "Gratis rett utenfor · 24/7", "Free right outside · 24/7")}</span>
              </div>
              <div className={`${s.centreRow} ${s.centreRowLast}`}>
                <span className={s.centreRowLabel}>{t(lang, "Kollektiv", "Transit")}</span>
                <span className={s.centreRowValue}>{t(lang, "Busstopp 40 m unna", "Bus stop 40 m away")}</span>
              </div>
            </div>
            <div className={sub.noteBox}>
              <p className={sub.noteBoxText}>
                {t(
                  lang,
                  "Gratis parkering rett utenfor bygget hele døgnet, og busstopp 40 m fra inngangen. Etter kl. 17:00 kan du også parkere på plassene vis-à-vis Babyland i nabobygget.",
                  "Free parking right outside the building 24/7, and a bus stop 40 m from the door. After 17:00 you can also park in the spaces facing Babyland next door.",
                )}
              </p>
            </div>
          </div>
          <div data-st="true" className={`${s.photoStack} ${s.orderFirst}`}>
            <div className={`${s.photoFrame} ${s.photoFrameDark}`}>
              <div className={s.photoFrameHead}>
                <span className={s.photoFrameLabel}>{t(lang, "Gatefoto 1 · Sandviken", "Street 1 · Sandviken")}</span>
                <span className={s.photoFrameNote}>{t(lang, "Inngang", "Entry")}</span>
              </div>
              <div className={`${s.photoMedia} ${s.photoMediaWide}`}>
                <Image
                  src="/assets/praktisk-sandviken-1.png"
                  alt={t(
                    lang,
                    "Gatefoto av inngangen til INNE Golf Bergen Sandviken",
                    "Street view of the Sandviken entrance",
                  )}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className={s.photoImg}
                />
              </div>
            </div>
            <div className={`${s.photoFrame} ${s.photoFrameDark}`}>
              <div className={s.photoFrameHead}>
                <span className={s.photoFrameLabel}>{t(lang, "Gatefoto 2 · Sandviken", "Street 2 · Sandviken")}</span>
                <span className={s.photoFrameNote}>{t(lang, "Parkering ved Babyland", "Parking by Babyland")}</span>
              </div>
              <div className={`${s.photoMedia} ${s.photoMediaWide}`}>
                <Image
                  src="/assets/praktisk-sandviken-2.png"
                  alt={t(lang, "Gatefoto av parkeringen vis-à-vis Babyland", "Street view of parking by Babyland")}
                  fill
                  sizes="(max-width: 767px) 150vw, 50vw"
                  className={s.photoImg}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Adgang ============ */}
      <section className={`${sub.bg950} ${sub.sectionShort}`}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>{t(lang, "Adgang", "Access")}</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Compact}`}>{t(lang, "Slik kommer du inn.", "How you get in.")}</h2>
          </div>
          <div data-st="true" className={s.adgangCol}>
            <p className={s.adgangLead}>
              {t(
                lang,
                "Du får adgangsinformasjon på e-post etter booking. Ingen resepsjon, ingen kø — døra er din hele døgnet.",
                "Access info arrives by email after booking. No front desk, no queue — the door is yours 24/7.",
              )}
            </p>
            <div className={s.adgangBox}>
              <span className={s.adgangBoxKicker}>{t(lang, "Slik åpner du", "How to open")}</span>
              <span className={s.adgangBoxText}>
                {t(
                  lang,
                  "Lås opp døra med mobilen fra bekreftelsen — så er du inne. Ingen nøkkel, ingen kode å huske.",
                  "Unlock the door with your phone from the confirmation — and you're in. No key, no code.",
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Kontakt ============ */}
      <section className={`${sub.bg900} ${sub.sectionShort}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>{t(lang, "Kontakt", "Contact")}</Eyebrow>
          </div>
          <div className={s.kontaktGrid}>
            <div data-st="true" className={s.kontaktCell}>
              <span className={s.kontaktLabel}>{t(lang, "E-post", "Email")}</span>
              <a href={`mailto:${SITE.email}`} className={s.kontaktLink}>
                {SITE.email}
              </a>
            </div>
            <div data-st="true" className={s.kontaktCell}>
              <span className={s.kontaktLabel}>{t(lang, "Telefon", "Phone")}</span>
              <div className={s.kontaktPhones}>
                {SITE.phones.map((phone, i) => (
                  <a key={phone} href={`tel:${SITE.phoneHrefs[i]}`} className={s.kontaktLink}>
                    {phone}
                  </a>
                ))}
              </div>
            </div>
            <div data-st="true" className={s.kontaktCell}>
              <span className={s.kontaktLabel}>Instagram</span>
              <a href={SITE.instagram} target="_blank" rel="noopener" className={s.kontaktLink}>
                @innegolfbergen
              </a>
            </div>
            <div data-st="true" className={s.kontaktCell}>
              <span className={s.kontaktLabel}>{t(lang, "Åpningstid", "Open hours")}</span>
              <span className={s.kontaktOpen}>{t(lang, "Hele døgnet · begge sentre", "24/7 · both venues")}</span>
            </div>
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
