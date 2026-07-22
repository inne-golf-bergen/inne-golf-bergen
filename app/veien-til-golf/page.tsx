import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { SITE } from "@/lib/site";
import sub from "../subpage.module.css";
import VtgForm from "./VtgForm";
import s from "./vtg.module.css";

export const metadata: Metadata = {
  title: "Veien til Golf — INNE Golf Bergen",
  description:
    "Lær golf i vinter, spill ute til våren. Nybegynnerkurs hos INNE Golf Bergen i samarbeid med Hardanger GK og Voss GK — teori, slagtrening og nasjonal spillerett.",
};

const STEG: { kicker: string; title: string; copy: string; featured?: boolean }[] = [
  {
    kicker: "Steg 01",
    title: "Teori",
    copy: "VTG e-læring før slagtreningen. Du lærer grunnlaget hjemmefra, i ditt eget tempo.",
  },
  {
    kicker: "Steg 02",
    title: "Slagtrening",
    copy: "8 timer slagtrening, putting og etikette med instruktør i simulator.",
  },
  {
    kicker: "Steg 03",
    title: "Fire kursdager",
    copy: "Alt gjennomføres over 4 kursdager. Passer ikke en dato, ordner vi det.",
  },
  {
    kicker: "Steg 04",
    title: "Oppspill",
    copy: "Oppspill når banene åpner hos Hardanger GK eller Voss GK — så har du nasjonal spillerett og kan spille i hele Norge og utlandet.",
    featured: true,
  },
];

export default function VeienTilGolfPage() {
  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          <Image
            src="/assets/photos/veien-til-golf-hero.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 300vw, 150vw"
            quality={85}
            className={`${sub.heroImg} ${s.heroImg}`}
          />
          <div className={s.gradV} />
          <div className={s.gradH} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>Veien til Golf · Nybegynnerkurs</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            Lær golf i vinter. <span className={s.heroAccent}>Spill ute til våren.</span>
          </h1>
          <p data-fade="true" className={sub.heroLead}>
            I samarbeid med Hardanger GK og Voss GK gjør vi golf tilgjengelig — hele året.
          </p>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#pameld" size="lg">
              MELD INTERESSE
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Kursløp ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Slik lærer du</Eyebrow>
            <h2 className={sub.h2}>Fire steg til spillerett.</h2>
          </div>
          <div className={s.stegGrid}>
            {STEG.map((steg) => (
              <div key={steg.kicker} data-st="true" className={`${s.stegCard} ${steg.featured ? s.stegCardFeatured : ""}`}>
                <span className={`${s.stegKicker} ${steg.featured ? s.stegKickerFeatured : ""}`}>{steg.kicker}</span>
                <h3 className={s.stegTitle}>{steg.title}</h3>
                <p className={`${s.stegCopy} ${steg.featured ? s.stegCopyFeatured : ""}`}>{steg.copy}</p>
              </div>
            ))}
          </div>
          <p data-st="true" className={s.stegFoot}>
            Gratis lånekøller ved undervisning.
          </p>
        </div>
      </section>

      {/* ============ Priser ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Priser</Eyebrow>
            <h2 className={sub.h2}>Velg kurs.</h2>
          </div>
          <div className={s.kursGrid}>
            <div data-st="true" className={s.kursCard}>
              <div className={s.kursHead}>
                <h3 className={s.kursTitle}>Junior</h3>
                <span className={s.kursAge}>T.o.m. 23 år</span>
              </div>
              <div className={s.kursPriceRow}>
                <span className={s.kursPrice}>{"3 000 kr"}</span>
                <span className={s.kursPriceNote}>totalpris</span>
              </div>
              <div className={s.kursDeposit}>
                <span className={s.kursDepositLabel}>Ved påmelding</span>
                <span className={s.kursDepositValue}>{"2 000 kr"}</span>
              </div>
              <p className={s.kursNote}>
                Inkluderer gratis innmelding i Åsane Golf Forening — som gir 20 % på simulatorspill hos oss.
              </p>
            </div>
            <div data-st="true" className={s.kursCard}>
              <div className={s.kursHead}>
                <h3 className={s.kursTitle}>Voksen</h3>
                <span className={s.kursAge}>Fra 24 år</span>
              </div>
              <div className={s.kursPriceRow}>
                <span className={s.kursPrice}>{"3 500 kr"}</span>
                <span className={s.kursPriceNote}>totalpris</span>
              </div>
              <div className={s.kursDeposit}>
                <span className={s.kursDepositLabel}>Ved påmelding</span>
                <span className={s.kursDepositValue}>{"2 000 kr"}</span>
              </div>
              <p className={s.kursNote}>
                Inkluderer gratis innmelding i Åsane Golf Forening — som gir 20 % på simulatorspill hos oss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Kontakt og påmelding ============ */}
      <section id="pameld" className={`${sub.bg950} ${sub.section}`} style={{ scrollMarginTop: 80 }}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true" className={s.kontaktCol}>
            <div>
              <Eyebrow>Meld interesse</Eyebrow>
              <h2 className={`${sub.h2} ${s.kontaktH2}`}>Start her.</h2>
            </div>
            <div className={s.kontaktCard}>
              <span className={s.kontaktKicker}>Direkte kontakt</span>
              <span className={s.kontaktText}>Spørsmål, eller ønsker du kurs i april/mai? Ring/SMS Kjetil.</span>
              <a href="tel:+4791330248" className={s.kontaktPhone}>
                913 30 248
              </a>
              <a href={`mailto:${SITE.email}`} className={s.kontaktMail}>
                {SITE.email}
              </a>
            </div>
            <p className={s.kontaktNote}>Tilpasset VTG-kurs for grupper? Vi skreddersyr.</p>
          </div>
          <div data-st="true">
            <VtgForm />
          </div>
        </div>
      </section>

      {/* ============ Åsane Golf Forening ============ */}
      <section className={s.agf}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow barColor="var(--orange-400)">Åsane Golf Forening</Eyebrow>
            <h2 className={s.agfH2}>Golf for alle.</h2>
            <div className={s.agfGoal}>
              <span className={s.agfGoalLabel}>Mål 2026</span>
              <p className={s.agfGoalText}>
                Felles treninger for barn og ungdom, og åpne dager der barn og ungdom kan prøve golf for første gang —
                et lavterskeltilbud der foreningen stiller med utstyr.
              </p>
            </div>
          </div>
          <div data-st="true" className={s.agfCol}>
            <p className={s.agfLead}>
              En forening med et tydelig mål — å skape et inkluderende og sosialt miljø der barn og ungdom får trene og
              utvikle seg innen golf. Gjennom samarbeid, frivillig innsats og fellesskap gir vi flere tilgang til
              aktivitet og idrettsglede, uavhengig av erfaring og bakgrunn.
            </p>
            <p className={s.agfBody}>
              Som medlem støtter du et lokalt initiativ for treningstider, samhold og mestring. Langsiktig mål: åpne
              dager og faste treninger hos INNE Golf Bergen i Åsane.
            </p>
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
