import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import sub from "../subpage.module.css";
import PolfForm from "./PolfForm";
import s from "./polf.module.css";

const NNBSP = "\u202F";

export const metadata: Metadata = {
  title: "POLF — Golf møter poker · INNE Golf Bergen",
  description:
    "POLF hos INNE Golf Bergen — golf møter poker. Spill golfrunden fra ditt eget senter, samle sjetonger og avgjør det rundt pokerbordet. Premiepott inntil 63 000 kr. 18 år.",
};

const SIM_RULES: { label: string; value: string; accent?: boolean }[] = [
  { label: "Startsjetonger", value: `1${NNBSP}500` },
  { label: "Per Stableford-poeng", value: "+500", accent: true },
  { label: "Birdie", value: "+500", accent: true },
  { label: "Eagle", value: `+1${NNBSP}000`, accent: true },
  { label: "Hole-in-one", value: `+5${NNBSP}000`, accent: true },
  { label: "Handicap-godtgjørelse", value: "50 %" },
  { label: "Gimme", value: "2,4 m" },
];

const UTE_RULES: { label: string; value: string; accent?: boolean }[] = [
  { label: "Startsjetonger", value: "Samme" },
  { label: "Handicap-godtgjørelse", value: "100 %", accent: true },
  { label: "Longest drive", value: "Ekstra sjetonger", accent: true },
  { label: "Closest to pin", value: "Ekstra sjetonger", accent: true },
];

const POKER_ROWS: { label: string; value: string; accent?: boolean }[] = [
  { label: "Entry", value: "200 kr + 200 kr bounty (Vipps #963257)" },
  { label: "Rebuy", value: `500 + 200 bounty (innen 100 min) → 15${NNBSP}000 chips` },
  { label: "Add-on", value: `500 (innen 100 min) → 15${NNBSP}000 chips` },
  { label: "Blinds", value: "16 nivåer à 20 min" },
  { label: "Startstack", value: `1${NNBSP}500 chips + bonus fra golfrunden` },
  { label: "Vinner", value: "Pengepremie + pokal", accent: true },
];

const POTT_CELLS: { label: string; num: string; note: string; accent?: boolean }[] = [
  { label: "30 spillere", num: `21${NNBSP}000 kr`, note: "Utbetaling 1.–4. plass" },
  { label: "60 spillere", num: `42${NNBSP}000 kr`, note: "Utbetaling 1.–8. plass" },
  { label: "90 spillere", num: `63${NNBSP}000 kr`, note: "Utbetaling 1.–12. plass", accent: true },
];

export default function PolfPage() {
  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          <Image
            src="/assets/photos/sim-data-lounge.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className={`${sub.heroImg} ${s.heroImg}`}
          />
          <div className={s.gradV} />
          <div className={s.gradH} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>Golf + poker · 18 års aldersgrense</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            <span className={s.heroLine}>POLF.</span>
            <span className={s.heroSub}>Golf møter poker.</span>
          </h1>
          <div data-fade="true" className={sub.chips}>
            <span className={sub.chipGhost}>{`Premiepott inntil 63${NNBSP}000 kr`}</span>
            <span className={sub.chipGhost}>18 års aldersgrense</span>
            <span className={sub.chipGhost}>Spill golfrunden fra ditt eget senter</span>
          </div>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#pameld" size="lg">
              MELD DEG PÅ
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Hva er POLF ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>Hva er POLF?</Eyebrow>
            <h2 className={`${sub.h2} ${s.introH2}`}>To spill, én seier.</h2>
          </div>
          <div data-st="true">
            <p className={s.introCopy}>
              En unik kombinasjon av golf og poker. Først spiller deltakerne en golfrunde og samler sjetonger basert på
              prestasjon mot eget handicap. Deretter fortsetter spillet rundt pokerbordet, der sjetongene avgjør hvem
              som stikker av med seieren.
            </p>
          </div>
        </div>
      </section>

      {/* ============ Sjetongregler ============ */}
      <section className={`${sub.bg950} ${sub.sectionShort}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Slik samler du sjetonger</Eyebrow>
          </div>
          <div className={s.chipGrid}>
            <div data-st="true" className={s.ruleCard}>
              <h3 className={s.ruleTitle}>Simulator-POLF</h3>
              <div className={s.ruleRows}>
                {SIM_RULES.map((row, i) => (
                  <div key={row.label} className={`${s.ruleRow} ${i === SIM_RULES.length - 1 ? s.ruleRowLast : ""}`}>
                    <span className={s.ruleLabel}>{row.label}</span>
                    <span className={`${s.ruleValue} ${row.accent ? s.ruleValueAccent : ""}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div data-st="true" className={s.ruleCard}>
              <h3 className={s.ruleTitle}>Utendørs-POLF</h3>
              <div className={s.ruleRows}>
                {UTE_RULES.map((row, i) => (
                  <div key={row.label} className={`${s.ruleRow} ${i === UTE_RULES.length - 1 ? s.ruleRowLast : ""}`}>
                    <span className={s.ruleLabel}>{row.label}</span>
                    <span className={`${s.ruleValue} ${row.accent ? s.ruleValueAccent : ""}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <p className={s.ruleFootnote}>
                Samme sjetonggrunnlag som simulator-POLF, men med full handicap-godtgjørelse og egne konkurranser på
                banen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Arrangement ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Arrangement</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Mid}`}>Bergens første POLF-arrangement.</h2>
          </div>
          <div className={s.eventGrid}>
            <div data-st="true" className={s.eventCard}>
              <span className={s.eventKicker}>Del 1</span>
              <h3 className={s.eventTitle}>Golfrunden</h3>
              <span className={s.eventDate}>22. okt – 4. des</span>
              <ul className={s.eventList}>
                {[
                  "Obligatorisk runde innen oppgitt tidspunkt.",
                  "1 runde Stableford i turneringsmodul på ditt golfsenter.",
                  "TrackMan-bruker påkrevd.",
                  "50 % av ute-HCP legges inn manuelt. Maks spille-HCP 18.",
                  "Premiering 1.–3. plass, sponsede premier.",
                ].map((item) => (
                  <li key={item} className={s.eventItem}>
                    <span className={s.eventDash}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={s.setupBox}>
                <span className={s.setupKicker}>Treningsoppsett</span>
                <span className={s.setupText}>
                  Meland Golfbane · tee 5255 m · gimme 2,4 · manuell putting · easy pins · fairway medium · green easy ·
                  wind calm · stimp 9.
                </span>
                <span className={s.setupHighlight}>Stor sjanse for mange birdies.</span>
              </div>
            </div>

            <div data-st="true" className={s.eventCard}>
              <span className={s.eventKicker}>Del 2</span>
              <h3 className={s.eventTitle}>Pokerturnering</h3>
              <span className={s.eventDate}>Fredag 5. des · kl. 19:00 · hos INNE Golf Bergen</span>
              <p className={s.eventCopy}>Texas Hold&apos;em No Limit + Bounty i lokalene våre.</p>
              <div className={s.pokerRows}>
                {POKER_ROWS.map((row, i) => (
                  <div key={row.label} className={`${s.pokerRow} ${i === POKER_ROWS.length - 1 ? s.pokerRowLast : ""}`}>
                    <span className={s.pokerLabel}>{row.label}</span>
                    <span className={`${s.pokerValue} ${row.accent ? s.pokerValueAccent : ""}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-st="true" className={s.pottWrap}>
            <span className={s.pottLabel}>Premiepott etter felt</span>
            <div className={s.pottGrid}>
              {POTT_CELLS.map((cell) => (
                <div key={cell.label} className={s.pottCell}>
                  <span className={`${s.pottCellLabel} ${cell.accent ? s.pottCellLabelAccent : ""}`}>{cell.label}</span>
                  <span className={`${s.pottCellNum} ${cell.accent ? s.pottCellNumAccent : ""}`}>{cell.num}</span>
                  <span className={s.pottCellNote}>{cell.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ Påmelding ============ */}
      <section id="pameld" className={`${sub.bg950} ${sub.section}`} style={{ scrollMarginTop: 80 }}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>Meld deg på</Eyebrow>
            <h2 className={sub.h2}>Tør du satse?</h2>
            <div className={sub.infoCard}>
              <span className={sub.infoCardKicker}>Avgift</span>
              <span className={sub.infoCardValue}>600 kr</span>
              <span className={sub.infoCardText}>
                Betales til Vipps <strong className={sub.accent}>#963257</strong>. Når avgiften er betalt, er du
                registrert.
              </span>
            </div>
          </div>
          <div data-st="true">
            <PolfForm />
          </div>
        </div>
      </section>

      {/* ============ Arranger POLF ============ */}
      <section className={sub.copperBand}>
        <div data-st="true" className={`container ${sub.copperInner}`}>
          <div className={sub.copperText} style={{ maxWidth: "52ch" }}>
            <h2 className={`${sub.copperH2} ${sub.copperH2Small}`}>Vil du arrangere POLF?</h2>
            <p className={sub.copperCopy}>Vi skreddersyr for venner, liga eller bedrift.</p>
          </div>
          <a href="/bedrift" className={sub.darkCta}>
            Se bedrift →
          </a>
        </div>
      </section>

      {/* ============ Ansvar ============ */}
      <section className={s.ansvar}>
        <div className="container">
          <p className={s.ansvarText}>
            Arrangør er alltid en ikke-fortjenestebasert forening, i henhold til § 22 i lov om pengespill. 18 års
            aldersgrense.
          </p>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
