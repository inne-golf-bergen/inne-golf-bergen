import type { Metadata } from "next";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { SITE } from "@/lib/site";
import sub from "../subpage.module.css";
import s from "./praktisk.module.css";

export const metadata: Metadata = {
  title: "Parkering, adgang & kontakt — INNE Golf Bergen",
  description: "Parkering, adgang og kontakt for INNE Golf Bergen i Åsane og Sandviken. Selvbetjente sentre, åpne hele døgnet.",
};

export default function PraktiskPage() {
  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.bg900} ${sub.textHero} ${sub.textHeroShort}`}>
        <div className="container">
          <div data-fade="true">
            <Eyebrow>Praktisk</Eyebrow>
          </div>
          <h1 data-fade="true" className={s.heroH1}>
            Parkering, adgang &amp; kontakt.
          </h1>
          <p data-fade="true" className={s.heroLead}>
            Begge sentre er selvbetjente og åpne hele døgnet. Her finner du frem — og inn.
          </p>
        </div>
      </section>

      {/* ============ Åsane ============ */}
      <section className={`${sub.bg950} ${sub.sectionShort}`}>
        <div className={`container ${s.centreGrid}`}>
          <div data-st="true">
            <div className={s.photoFrame}>
              <div className={s.photoFrameHead}>
                <span className={s.photoFrameLabel}>Flyfoto · Åsane</span>
                <span className={s.photoFrameNote}>Inngang &amp; parkering</span>
              </div>
              <div className={s.photoMedia}>
                <Image
                  src="/assets/praktisk-asane-aerial.jpg"
                  alt="Annotert flyfoto av INNE Golf Bergen Åsane med inngang og parkering"
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
                <span className={s.centreRowLabel}>Adresse</span>
                <span className={s.centreRowValue}>Haukedalen 1, 5121 Ulset</span>
              </div>
              <div className={s.centreRow}>
                <span className={s.centreRowLabel}>Parkering</span>
                <span className={s.centreRowValue}>Egne P-plasser</span>
              </div>
              <div className={`${s.centreRow} ${s.centreRowLast}`}>
                <span className={s.centreRowLabel}>Åpent</span>
                <span className={s.centreRowValue}>Hele døgnet</span>
              </div>
            </div>
            <div className={sub.noteBox}>
              <p className={sub.noteBoxText}>
                INNE Golf Bergen Åsane har egne P-plasser — vennligst bruk våre plasser når dere besøker oss.
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
                <span className={s.centreRowLabel}>Adresse</span>
                <span className={s.centreRowValue}>Sandviksbodene 9</span>
              </div>
              <div className={s.centreRow}>
                <span className={s.centreRowLabel}>Parkering</span>
                <span className={s.centreRowValue}>Gratis rett utenfor · 24/7</span>
              </div>
              <div className={`${s.centreRow} ${s.centreRowLast}`}>
                <span className={s.centreRowLabel}>Kollektiv</span>
                <span className={s.centreRowValue}>Busstopp 40 m unna</span>
              </div>
            </div>
            <div className={sub.noteBox}>
              <p className={sub.noteBoxText}>
                Gratis parkering rett utenfor bygget hele døgnet, og busstopp 40 m fra inngangen. Etter kl. 17:00 kan du
                også parkere på plassene vis-à-vis Babyland i nabobygget.
              </p>
            </div>
          </div>
          <div data-st="true" className={`${s.photoStack} ${s.orderFirst}`}>
            <div className={`${s.photoFrame} ${s.photoFrameDark}`}>
              <div className={s.photoFrameHead}>
                <span className={s.photoFrameLabel}>Gatefoto 1 · Sandviken</span>
                <span className={s.photoFrameNote}>Inngang</span>
              </div>
              <div className={`${s.photoMedia} ${s.photoMediaWide}`}>
                <Image
                  src="/assets/praktisk-sandviken-1.png"
                  alt="Gatefoto av inngangen til INNE Golf Bergen Sandviken"
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className={s.photoImg}
                />
              </div>
            </div>
            <div className={`${s.photoFrame} ${s.photoFrameDark}`}>
              <div className={s.photoFrameHead}>
                <span className={s.photoFrameLabel}>Gatefoto 2 · Sandviken</span>
                <span className={s.photoFrameNote}>Parkering ved Babyland</span>
              </div>
              <div className={`${s.photoMedia} ${s.photoMediaWide}`}>
                <Image
                  src="/assets/praktisk-sandviken-2.png"
                  alt="Gatefoto av parkeringen vis-à-vis Babyland"
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
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
            <Eyebrow>Adgang</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Compact}`}>Slik kommer du inn.</h2>
          </div>
          <div data-st="true" className={s.adgangCol}>
            <p className={s.adgangLead}>
              Du får adgangsinformasjon på e-post etter booking. Ingen resepsjon, ingen kø — døra er din hele døgnet.
            </p>
            <div className={s.adgangBox}>
              <span className={s.adgangBoxKicker}>Slik åpner du</span>
              <span className={s.adgangBoxText}>
                Lås opp døra med mobilen fra bekreftelsen — så er du inne. Ingen nøkkel, ingen kode å huske.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Kontakt ============ */}
      <section className={`${sub.bg900} ${sub.sectionShort}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Kontakt</Eyebrow>
          </div>
          <div className={s.kontaktGrid}>
            <div data-st="true" className={s.kontaktCell}>
              <span className={s.kontaktLabel}>E-post</span>
              <a href={`mailto:${SITE.email}`} className={s.kontaktLink}>
                {SITE.email}
              </a>
            </div>
            <div data-st="true" className={s.kontaktCell}>
              <span className={s.kontaktLabel}>Telefon</span>
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
              <span className={s.kontaktLabel}>Åpningstid</span>
              <span className={s.kontaktOpen}>Hele døgnet · begge sentre</span>
            </div>
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
