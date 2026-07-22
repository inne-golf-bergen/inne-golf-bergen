import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import sub from "../subpage.module.css";
import BedriftForm from "./BedriftForm";
import s from "./bedrift.module.css";

const THIN = "\u2009";

export const metadata: Metadata = {
  title: "Bedrift — INNE Golf Bergen",
  description:
    "Firmakveld hos INNE Golf Bergen — kickoff, turneringskveld eller VIP-kveld i losjen. Turneringsmodus, premier og mat levert. Vi skreddersyr.",
};

export default function BedriftPage() {
  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          {/* 300vw on mobile: the portrait cover crop is height-constrained, so
              100vw would serve a ~750px file upscaled ~2.6× */}
          <Image
            src="/assets/photos/bedrift-bay.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 300vw, 100vw"
            quality={85}
            className={`${sub.heroImg} ${s.heroImg}`}
          />
          <div className={s.gradV} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>Bedrift</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            Firmakvelden alle møter opp på.
          </h1>
          <p data-fade="true" className={s.heroLead}>
            Kickoff, kundekveld eller lagbygging. Turneringsmodus gjør konkurransen enkel — alle slår, skjermen holder
            styr på resten.
          </p>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#tilbud" size="lg">
              FÅ TILBUD
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Pakker ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Pakker</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>Velg format.</h2>
          </div>
          <div className={s.pakkeGrid}>
            <div data-st="true" className={s.pakkeCard}>
              <span className={s.pakkeNum}>01</span>
              <h3 className={s.pakkeTitle}>Kickoff</h3>
              <p className={s.pakkeCopy}>
                1,5 time simulatorgolf i turneringsmodus. Rask å sette i gang, morsom for alle nivåer.
              </p>
            </div>

            <div data-st="true" className={`${s.pakkeCard} ${s.pakkeCardFeatured}`}>
              <div className={s.pakkeNumRow}>
                <span className={s.pakkeNum}>02</span>
                <span className={s.pakkeBadge}>Mest populær</span>
              </div>
              <h3 className={s.pakkeTitle}>Turneringskveld</h3>
              <p className={`${s.pakkeCopy} ${s.pakkeCopyFeatured}`}>
                {`2 timer med premier og mat levert. Maten kommer med 20${THIN}% via Bella Italia-avtalen.`}
              </p>
            </div>

            <div data-st="true" className={s.pakkeCard}>
              <span className={s.pakkeNum}>03</span>
              <h3 className={s.pakkeTitle}>VIP-kveld</h3>
              <p className={s.pakkeCopy}>
                Sim 3-losjen for dere selv — privat for 6–8 personer, egen bay og storskjerm.
              </p>
            </div>
          </div>
          <p data-st="true" className={s.skreddersyr}>
            Vi skreddersyr — også{" "}
            <Link data-sweep="true" href="/polf" style={{ color: "var(--orange-400)" }}>
              POLF for bedrifter
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ============ Tilbud ============ */}
      <section id="tilbud" className={`${sub.bg900} ${sub.section}`} style={{ scrollMarginTop: 80 }}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>Be om tilbud</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Large}`}>Få tilbud.</h2>
            <p className={s.tilbudLead}>
              Fortell oss litt om kvelden, så setter vi opp et forslag som passer laget. Svar innen én arbeidsdag.
            </p>
          </div>
          <div data-st="true">
            <BedriftForm />
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
