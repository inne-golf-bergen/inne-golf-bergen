import type { Metadata } from "next";
import Image from "next/image";
import simDataLounge from "@/public/assets/photos/sim-data-lounge.jpg";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { asLang, type Lang, langAlternates, langHref, t } from "@/lib/i18n";
import { mailtoSubject } from "@/lib/site";
import sub from "../subpage.module.css";
/* Round one (autumn 2025) is settled — entry is closed. When the next POLF is
   dated: restore `import PolfForm from "./PolfForm"` and the form column below,
   and swap the archive copy back to the live entry copy (see git history). */
import s from "./polf.module.css";

const NNBSP = "\u202f"; // narrow NO-BREAK space — was a plain space, which line-breaks

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "POLF — Golf møter poker · INNE Golf Bergen", "POLF — Golf meets poker · INNE Golf Bergen"),
    description: t(
      lang,
      "POLF hos INNE Golf Bergen — golf møter poker. Spill golfrunden fra ditt eget senter, samle sjetonger og avgjør det rundt pokerbordet. Premiepott inntil 63 000 kr. 18 år.",
      "POLF at INNE Golf Bergen — golf meets poker. Play the round at your own venue, earn chips and settle it at the poker table. Prize pot up to 63 000 kr. 18+.",
    ),
    alternates: langAlternates("/polf"),
  };
}

type Rule = { label: string; value: string; accent?: boolean };

const simRules = (lang: Lang): Rule[] => [
  { label: t(lang, "Startsjetonger", "Starting chips"), value: `1${NNBSP}500` },
  { label: t(lang, "Per Stableford-poeng", "Per Stableford point"), value: "+500", accent: true },
  { label: "Birdie", value: "+500", accent: true },
  { label: "Eagle", value: `+1${NNBSP}000`, accent: true },
  { label: "Hole-in-one", value: `+5${NNBSP}000`, accent: true },
  { label: t(lang, "Handicap-godtgjørelse", "Handicap allowance"), value: "50 %" },
  { label: "Gimme", value: t(lang, "2,4 m", "2.4 m") },
];

const uteRules = (lang: Lang): Rule[] => [
  { label: t(lang, "Startsjetonger", "Starting chips"), value: t(lang, "Samme", "Same") },
  { label: t(lang, "Handicap-godtgjørelse", "Handicap allowance"), value: "100 %", accent: true },
  { label: "Longest drive", value: t(lang, "Ekstra sjetonger", "Bonus chips"), accent: true },
  { label: "Closest to pin", value: t(lang, "Ekstra sjetonger", "Bonus chips"), accent: true },
];

const pokerRows = (lang: Lang): Rule[] => [
  { label: "Entry", value: "200 kr + 200 kr bounty" },
  {
    label: "Rebuy",
    value: t(
      lang,
      `500 + 200 bounty (innen 100 min) → 15${NNBSP}000 chips`,
      `500 + 200 bounty (first 100 min) → 15${NNBSP}000 chips`,
    ),
  },
  {
    label: "Add-on",
    value: t(lang, `500 (innen 100 min) → 15${NNBSP}000 chips`, `500 (first 100 min) → 15${NNBSP}000 chips`),
  },
  { label: "Blinds", value: t(lang, "16 nivåer à 20 min", "16 levels × 20 min") },
  {
    label: t(lang, "Startstack", "Stack"),
    value: t(lang, `1${NNBSP}500 chips + bonus fra golfrunden`, `1${NNBSP}500 chips + golf round bonus`),
  },
  { label: t(lang, "Vinner", "Winner"), value: t(lang, "Pengepremie + pokal", "Cash prize + trophy"), accent: true },
];

const pottCells = (lang: Lang): { label: string; num: string; note: string; accent?: boolean }[] => [
  {
    label: t(lang, "30 spillere", "30 players"),
    num: `21${NNBSP}000 kr`,
    note: t(lang, "Utbetaling 1.–4. plass", "Payouts 1st–4th"),
  },
  {
    label: t(lang, "60 spillere", "60 players"),
    num: `42${NNBSP}000 kr`,
    note: t(lang, "Utbetaling 1.–8. plass", "Payouts 1st–8th"),
  },
  {
    label: t(lang, "90 spillere", "90 players"),
    num: `63${NNBSP}000 kr`,
    note: t(lang, "Utbetaling 1.–12. plass", "Payouts 1st–12th"),
    accent: true,
  },
];

export default async function PolfPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const sim = simRules(lang);
  const ute = uteRules(lang);
  const poker = pokerRows(lang);

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          <Image
            src={simDataLounge}
            alt=""
            fill
            preload
            placeholder="blur"
            sizes="(max-width: 768px) 300vw, 100vw"
            quality={85}
            className={`${sub.heroImg} ${s.heroImg}`}
          />
          <div className={s.gradV} />
          <div className={s.gradH} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>{t(lang, "Golf + poker · 18 års aldersgrense", "Golf + poker · 18+ only")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            <span className={s.heroLine}>POLF.</span>
            <span className={s.heroSub}>{t(lang, "Golf møter poker.", "Golf meets poker.")}</span>
          </h1>
          <div data-fade="true" className={sub.chips}>
            <span className={sub.chipGhost}>
              {t(lang, `Premiepott inntil 63${NNBSP}000 kr`, `Prize pot up to 63${NNBSP}000 kr`)}
            </span>
            <span className={sub.chipGhost}>{t(lang, "18 års aldersgrense", "18+ age limit")}</span>
            <span className={sub.chipGhost}>
              {t(lang, "Spill golfrunden fra ditt eget senter", "Play the round at your own venue")}
            </span>
          </div>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#pameld" size="lg">
              {t(lang, "NESTE RUNDE", "NEXT ROUND")}
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Hva er POLF ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>{t(lang, "Hva er POLF?", "What’s POLF?")}</Eyebrow>
            <h2 className={`${sub.h2} ${s.introH2}`}>{t(lang, "To spill, én seier.", "Two games, one win.")}</h2>
          </div>
          <div data-st="true">
            <p className={s.introCopy}>
              {t(
                lang,
                "En unik kombinasjon av golf og poker. Først spiller deltakerne en golfrunde og samler sjetonger basert på prestasjon mot eget handicap. Deretter fortsetter spillet rundt pokerbordet, der sjetongene avgjør hvem som stikker av med seieren.",
                "A unique mix of golf and poker. First, players play a golf round and earn chips based on performance against their own handicap. Then the game moves to the poker table, where the chips decide who takes the win.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ============ Sjetongregler ============ */}
      <section className={`${sub.bg950} ${sub.sectionShort}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>{t(lang, "Slik samler du sjetonger", "How you earn chips")}</Eyebrow>
          </div>
          <div className={s.chipGrid}>
            <div data-st="true" className={s.ruleCard}>
              <h3 className={s.ruleTitle}>{t(lang, "Simulator-POLF", "Simulator POLF")}</h3>
              <div className={s.ruleRows}>
                {sim.map((row, i) => (
                  <div key={row.label} className={`${s.ruleRow} ${i === sim.length - 1 ? s.ruleRowLast : ""}`}>
                    <span className={s.ruleLabel}>{row.label}</span>
                    <span className={`${s.ruleValue} ${row.accent ? s.ruleValueAccent : ""}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div data-st="true" className={s.ruleCard}>
              <h3 className={s.ruleTitle}>{t(lang, "Utendørs-POLF", "Outdoor POLF")}</h3>
              <div className={s.ruleRows}>
                {ute.map((row, i) => (
                  <div key={row.label} className={`${s.ruleRow} ${i === ute.length - 1 ? s.ruleRowLast : ""}`}>
                    <span className={s.ruleLabel}>{row.label}</span>
                    <span className={`${s.ruleValue} ${row.accent ? s.ruleValueAccent : ""}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <p className={s.ruleFootnote}>
                {t(
                  lang,
                  "Samme sjetonggrunnlag som simulator-POLF, men med full handicap-godtgjørelse og egne konkurranser på banen.",
                  "Same chip basis as simulator POLF, but with full handicap allowance and extra contests on the course.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Arrangement ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>{t(lang, "Første runde · 2025", "Round one · 2025")}</Eyebrow>
            <h2 className={`${sub.h2} ${sub.h2Mid}`}>
              {t(lang, "Bergens første POLF-arrangement.", "Bergen’s first POLF event.")}
            </h2>
          </div>
          <div className={s.eventGrid}>
            <div data-st="true" className={s.eventCard}>
              <span className={s.eventKicker}>{t(lang, "Del 1", "Act 1")}</span>
              <h3 className={s.eventTitle}>{t(lang, "Golf\u00adrunden", "Golf round")}</h3>
              <span className={s.eventDate}>{t(lang, "22. okt – 4. des", "22 Oct – 4 Dec")}</span>
              <ul className={s.eventList}>
                {[
                  t(lang, "Obligatorisk runde innen oppgitt tidspunkt.", "Mandatory round within the set window."),
                  t(
                    lang,
                    "1 runde Stableford i turneringsmodul på ditt golfsenter.",
                    "1 Stableford round in tournament mode at your venue.",
                  ),
                  t(lang, "TrackMan-bruker påkrevd.", "TrackMan user required."),
                  t(
                    lang,
                    "50 % av ute-HCP legges inn manuelt. Maks spille-HCP 18.",
                    "50 % of outdoor HCP set manually. Max playing HCP 18.",
                  ),
                  t(lang, "Premiering 1.–3. plass, sponsede premier.", "Prizes for 1st–3rd, sponsored prizes."),
                ].map((item) => (
                  <li key={item} className={s.eventItem}>
                    <span className={s.eventDash}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={s.setupBox}>
                <span className={s.setupKicker}>{t(lang, "Treningsoppsett", "Practice setup")}</span>
                <span className={s.setupText}>
                  {t(
                    lang,
                    "Meland Golfbane · tee 5255 m · gimme 2,4 · manuell putting · easy pins · fairway medium · green easy · wind calm · stimp 9.",
                    "Meland Golfbane · tee 5255 m · gimme 2.4 · manual putting · easy pins · fairway medium · green easy · wind calm · stimp 9.",
                  )}
                </span>
                <span className={s.setupHighlight}>
                  {t(lang, "Stor sjanse for mange birdies.", "Expect a lot of birdies.")}
                </span>
              </div>
            </div>

            <div data-st="true" className={s.eventCard}>
              <span className={s.eventKicker}>{t(lang, "Del 2", "Act 2")}</span>
              <h3 className={s.eventTitle}>{t(lang, "Poker\u00adturnering", "Poker night")}</h3>
              <span className={s.eventDate}>
                {t(lang, "Fredag 5. des · kl. 19:00 · hos INNE Golf Bergen", "Friday 5 Dec · 19:00 · at INNE Golf Bergen")}
              </span>
              <p className={s.eventCopy}>
                {t(
                  lang,
                  "Texas Hold’em No Limit + Bounty i lokalene våre.",
                  "Texas Hold’em No Limit + Bounty at our venue.",
                )}
              </p>
              <div className={s.pokerRows}>
                {poker.map((row, i) => (
                  <div key={row.label} className={`${s.pokerRow} ${i === poker.length - 1 ? s.pokerRowLast : ""}`}>
                    <span className={s.pokerLabel}>{row.label}</span>
                    <span className={`${s.pokerValue} ${row.accent ? s.pokerValueAccent : ""}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-st="true" className={s.pottWrap}>
            <span className={s.pottLabel}>{t(lang, "Premiepott etter felt", "Prize pot by field")}</span>
            <div className={s.pottGrid}>
              {pottCells(lang).map((cell) => (
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

      {/* ============ Neste runde (første runde er ferdigspilt) ============ */}
      <section id="pameld" className={`${sub.bg950} ${sub.section}`} style={{ scrollMarginTop: 80 }}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow>{t(lang, "Neste runde", "Next round")}</Eyebrow>
            <h2 className={sub.h2}>{t(lang, "Tør du satse?", "Dare to bet?")}</h2>
            <div className={sub.infoCard}>
              <span className={sub.infoCardKicker}>Status</span>
              <span className={sub.infoCardValue}>{t(lang, "Ferdigspilt", "Wrapped")}</span>
              <span className={sub.infoCardText}>
                {t(
                  lang,
                  "Første runde er avgjort. Neste POLF annonseres her og på Facebook-siden vår.",
                  "Round one is settled. The next POLF drops here and on our Facebook page.",
                )}
              </span>
            </div>
          </div>
          <div data-st="true">
            <div className={sub.infoCard}>
              <span className={sub.infoCardKicker}>{t(lang, "Bli varslet", "Be notified")}</span>
              <span className={sub.infoCardValue}>{t(lang, "Stå først i køen", "First in line")}</span>
              <span className={sub.infoCardText}>
                {t(
                  lang,
                  "Send oss en e-post, så får du beskjed når neste POLF er klar.",
                  "Email us and we’ll tell you the moment the next POLF is set.",
                )}
              </span>
            </div>
            <div className={sub.heroCtaWrap}>
              <Button as="a" href={mailtoSubject(t(lang, "Varsle meg — neste POLF", "Notify me — next POLF"))} size="lg">
                {t(lang, "VARSLE MEG", "NOTIFY ME")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Arranger POLF ============ */}
      <section className={sub.copperBand}>
        <div data-st="true" className={`container ${sub.copperInner}`}>
          {/* line length lives on the copy (subpage copperCopy) — capping the
              whole column squeezed the headline into hyphen breaks */}
          <div className={sub.copperText}>
            <h2 className={`${sub.copperH2} ${sub.copperH2Small}`}>
              {t(lang, "Vil du arrangere POLF?", "Want to host POLF?")}
            </h2>
            <p className={sub.copperCopy}>
              {t(lang, "Vi skreddersyr for venner, liga eller bedrift.", "We tailor for friends, leagues or companies.")}
            </p>
          </div>
          <a href={langHref(lang, "/bedrift")} className={sub.darkCta}>
            {t(lang, "Se bedrift →", "Company →")}
          </a>
        </div>
      </section>

      {/* ============ Ansvar ============ */}
      <section className={s.ansvar}>
        <div className="container">
          <p className={s.ansvarText}>
            {t(
              lang,
              "Arrangør er alltid en ikke-fortjenestebasert forening, i henhold til § 22 i lov om pengespill. 18 års aldersgrense.",
              "The organiser is always a non-profit association, per § 22 of the Norwegian Gambling Act. 18+ age limit.",
            )}
          </p>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
