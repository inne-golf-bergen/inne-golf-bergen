import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import sub from "../subpage.module.css";
import s from "./vip.module.css";

export const metadata: Metadata = {
  title: "VIP-losjen — INNE Golf Bergen",
  description:
    "VIP-losjen i Åsane — widescreen-simulator i 16:9, eget sofahjørne for 6–8 personer, pokerbord og live sport på storskjerm. Deres egen kveld.",
};

const SPECS: [string, string][] = [
  ["Kapasitet", "6–8 personer"],
  ["Simulator", "16:9 widescreen"],
  ["Skjerm", "Live sport"],
  ["Spill", "Pokerbord"],
  ["Bay", "Egen bay"],
];

const CHIPS = ["6–8 personer", "16:9 widescreen", "Storskjerm med live sport", "Pokerbord", "Egen bay"];

export default function VipLosjenPage() {
  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          <Image
            src="/assets/photos/vip-losjen.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 300vw, 100vw"
            quality={85}
            className={`${sub.heroImg} ${s.heroImg}`}
          />
          <div className={s.gradV} />
          <div className={s.gradH} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>Åsane · 6–8 personer</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            <span className={s.heroLine}>VIP-losjen.</span>
            <span className={`${s.heroLine} ${s.heroAccent}`}>Deres egen kveld.</span>
          </h1>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="/#book-asane" size="lg">
              BOOK VIP-LOSJEN
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Om losjen ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>Losjen</Eyebrow>
            <h2 className={`${sub.h2} ${s.omH2}`}>Golf på sitt beste.</h2>
            <p className={s.omLead}>
              En førsteklasses golfopplevelse i Åsane. Imponerende widescreen-simulator i 16:9-format — perfekt for
              favorittbanene. Eget sofahjørne med plass til 6–8 personer, pokerbord og live sport på storskjerm. Golf på
              sitt beste, kombinert med sosial hygge i en eksklusiv setting.
            </p>
          </div>
          <div data-st="true" className={sub.specList}>
            {SPECS.map(([label, value], i) => (
              <div key={label} className={`${sub.specRow} ${i === SPECS.length - 1 ? sub.specRowLast : ""}`}>
                <span className={sub.specLabel}>{label}</span>
                <span className={sub.specValue}>{value}</span>
              </div>
            ))}
            <div className={s.chipRow}>
              {CHIPS.map((chip) => (
                <span key={chip} className={sub.chip}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ Passer til ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>Passer til</Eyebrow>
          </div>
          <div className={s.passerGrid}>
            {["Vors", "Date night", "Kundekveld", "Kampkveld"].map((label) => (
              <div key={label} data-st="true" className={s.passerCell}>
                <span className={s.passerText}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className={sub.copperBand}>
        <div data-st="true" className={`container ${sub.copperInner}`}>
          <div className={sub.copperText}>
            <h2 className={sub.copperH2}>Deres egen kveld.</h2>
            <p className={sub.copperCopy}>Widescreen-simulator, eget sofahjørne, pokerbord og live sport i Åsane.</p>
          </div>
          <Link href="/#book-asane" className={sub.darkCta}>
            Book VIP-losjen
          </Link>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
