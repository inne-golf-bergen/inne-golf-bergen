import type { Metadata } from "next";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import sub from "../subpage.module.css";
import VinterFaser from "./VinterFaser";
import VinterForm from "./VinterForm";
import s from "./vinter.module.css";

const NNBSP = "\u202F";

export const metadata: Metadata = {
  title: "Vinterturneringen — INNE Golf Bergen",
  description:
    "Vinterturneringen hos INNE Golf Bergen — 2-spillerlag, 500 kr per spiller. Gruppespill til finale fra 15. november til 30. april. Premiepott 20 000 kr og Cutter & Buck-jakker.",
};

const PRIZES: { place: string; amount: string; note: string }[] = [
  {
    place: "1.",
    amount: `10${NNBSP}000 kr`,
    note: `2 INNE Golf Bergen-jakker fra Cutter & Buck (verdi 5${NNBSP}000 kr) + 2 drikkeflasker`,
  },
  { place: "2.", amount: `5${NNBSP}000 kr`, note: "+ 2 drikkeflasker" },
  { place: "3.", amount: `3${NNBSP}000 kr`, note: "+ 2 drikkeflasker" },
  { place: "4.", amount: `2${NNBSP}000 kr`, note: "+ 2 drikkeflasker" },
];

export default function VinterturneringPage() {
  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/photos/vinterturnering-hero.webp" alt="" className={`${sub.heroImg} ${s.heroImg}`} />
          <div className={s.gradV} />
          <div className={s.gradH} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>Turnering · Sesong 2025/2026</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            {"Vinter\u200Bturneringen."}
          </h1>
          <div data-fade="true" className={sub.chips}>
            <span className={sub.chipGhost}>2-spillerlag</span>
            <span className={sub.chipGhost}>500 kr per spiller</span>
            <span className={sub.chipGhost}>15. nov – 30. apr</span>
          </div>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#pameld" size="lg">
              MELD PÅ LAGET
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Premiering ============ */}
      <section className={s.premier}>
        <div className="container">
          <div data-st="true" className={s.premierHead}>
            <h2 className={s.premierH2}>{`Premiepott 20${NNBSP}000 kr.`}</h2>
            <span className={s.premierNote}>{`+ 2 Cutter & Buck-jakker (verdi 5${NNBSP}000 kr)`}</span>
          </div>
          <div className={s.prizeGrid}>
            {PRIZES.map((prize, i) => (
              <div
                key={prize.place}
                data-st="true"
                className={`${s.prizeCell} ${i === 0 ? s.prizeCellFirst : ""} ${
                  i === PRIZES.length - 1 ? s.prizeCellLast : ""
                }`}
              >
                <span className={s.prizePlace}>{prize.place}</span>
                <span className={s.prizeAmount}>{prize.amount}</span>
                <span className={s.prizeNote}>{prize.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Turneringsplan ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className={s.planWrap}>
          <div data-st="true">
            <Eyebrow>5 faser</Eyebrow>
            <h2 className={sub.h2}>Fra pulje til finale.</h2>
            <p className={s.planLead}>
              Turneringen spilles i fem faser gjennom hele vinteren. Trykk på en fase for komplette regler, format og
              handicap-beregning.
            </p>
          </div>
          <VinterFaser />
        </div>
      </section>

      {/* ============ Påmelding ============ */}
      <section id="pameld" className={`${sub.bg950} ${sub.section}`} style={{ scrollMarginTop: 80 }}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>Meld på</Eyebrow>
            <h2 className={sub.h2}>Finn en makker.</h2>
            <div className={sub.infoCard}>
              <span className={sub.infoCardKicker}>Deltakeravgift</span>
              <span className={sub.infoCardValue}>500 kr per spiller</span>
              <span className={sub.infoCardText}>
                Betales til Vipps <strong className={sub.accent}>#946014</strong>{" "}
                {`(1${NNBSP}000 kr for laget). Påmeldingen er bekreftet når avgiften er registrert.`}
              </span>
            </div>
            <p className={s.pameldNote}>
              Puljer og lagoppsett publiseres i vår{" "}
              <a href="https://facebook.com" target="_blank" rel="noopener">
                Facebook-gruppe
              </a>
              .
            </p>
          </div>
          <div data-st="true">
            <VinterForm />
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
