import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import polfPhoto from "@/public/assets/photos/sim-data-lounge.jpg";
import vinterHero from "@/public/assets/photos/vinterturnering-hero.webp";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import {
  getTurneringer,
  POLF,
  type TurneringEntryStatus,
  type TurneringStatus,
  VINTER,
} from "@/lib/content";
import { fmt } from "@/lib/format";
import { asLang, type Lang, langAlternates, langHref, t } from "@/lib/i18n";
import sub from "../subpage.module.css";
import s from "./turneringer.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Turneringer — INNE Golf Bergen", "Tournaments — INNE Golf Bergen"),
    description: t(
      lang,
      "Turneringer hos INNE Golf Bergen — Vinterturneringen, POLF og flere konkurranser i simulatorene i Åsane og Sandviken.",
      "Tournaments at INNE Golf Bergen — the Winter Cup, POLF and more contests in our bays.",
    ),
    alternates: langAlternates("/turneringer"),
  };
}

/* Status labels for the two flagship pages (content/turnering-*.json). */
function flaggStatus(lang: Lang, status: TurneringStatus): string {
  if (status === "pamelding") return t(lang, "Påmelding åpen", "Entry open");
  if (status === "pagaende") return t(lang, "Pågår", "Live");
  return t(lang, "Ferdigspilt", "Wrapped");
}

/* Status labels for CMS tournament entries (content/turneringer/). */
function innslagStatus(lang: Lang, status: TurneringEntryStatus): string {
  if (status === "kommende") return t(lang, "Kommende", "Upcoming");
  if (status === "pagaende") return t(lang, "Pågår", "Live");
  return t(lang, "Arkivert", "Archived");
}

const isLive = (status: TurneringStatus | TurneringEntryStatus): boolean =>
  status === "pamelding" || status === "pagaende" || status === "kommende";

export default async function TurneringerPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const entries = getTurneringer(lang);
  /* Live things first: pågående → kommende → arkivert, newest first within each. */
  const ordered = (["pagaende", "kommende", "arkivert"] as const).flatMap((status) =>
    entries.filter((entry) => entry.status === status),
  );

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.bg900} ${sub.textHero} ${sub.textHeroShort}`}>
        <div className="container">
          <div data-fade="true">
            <Eyebrow>{t(lang, "Turneringer", "Tournaments")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={s.heroH1}>
            {t(lang, "Konkurrer på INNE.", "Compete at INNE.")}
          </h1>
          <p data-fade="true" className={s.heroLead}>
            {t(
              lang,
              "Faste turneringer gjennom året — og nye konkurranser når de dukker opp. Alt spilles i simulatorene våre.",
              "Regular tournaments all year — and new contests as they appear. All played in our bays.",
            )}
          </p>
        </div>
      </section>

      {/* ============ Faste turneringer ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className="container">
          <div className={s.featGrid}>
            <Link data-st="true" href={langHref(lang, "/vinterturnering")} className={s.featCard}>
              <div className={s.featMedia}>
                <Image
                  src={vinterHero}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(max-width: 659px) 100vw, 50vw"
                  className={s.featImg}
                />
              </div>
              <div className={s.featBody}>
                <span className={`${s.statusChip} ${isLive(VINTER.status) ? s.statusChipLive : ""}`}>
                  {flaggStatus(lang, VINTER.status)}
                </span>
                <h2 className={s.featTitle}>{t(lang, "Vinterturneringen", "The Winter Cup")}</h2>
                <span className={s.featMeta}>
                  {t(lang, VINTER.datoTekst.no, VINTER.datoTekst.en)} ·{" "}
                  {t(lang, `${fmt(VINTER.prisPerSpiller)} kr per spiller`, `${fmt(VINTER.prisPerSpiller)} kr per player`)}
                </span>
                <p className={s.featCopy}>
                  {t(
                    lang,
                    "2-spillerlag fra pulje til finale gjennom hele vinteren. Premiepott og Cutter & Buck-jakker.",
                    "Teams of 2 from group to final across the winter. Prize pot and Cutter & Buck jackets.",
                  )}
                </p>
                <span className={s.featCta}>
                  {t(lang, "Les mer", "Details")} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>

            <Link data-st="true" href={langHref(lang, "/polf")} className={s.featCard}>
              <div className={s.featMedia}>
                <Image
                  src={polfPhoto}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(max-width: 659px) 100vw, 50vw"
                  className={s.featImg}
                />
              </div>
              <div className={s.featBody}>
                <span className={`${s.statusChip} ${isLive(POLF.status) ? s.statusChipLive : ""}`}>
                  {flaggStatus(lang, POLF.status)}
                </span>
                <h2 className={s.featTitle}>POLF</h2>
                <span className={s.featMeta}>{t(lang, POLF.rundeLabel.no, POLF.rundeLabel.en)}</span>
                <p className={s.featCopy}>
                  {t(
                    lang,
                    "Golf møter poker: spill golfrunden fra ditt eget senter, samle sjetonger og avgjør det rundt pokerbordet.",
                    "Golf meets poker: play the round at your venue, earn chips, settle it at the table.",
                  )}
                </p>
                <span className={s.featCta}>
                  {t(lang, "Les mer", "Details")} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Flere turneringer (fra /admin) ============ */}
      {ordered.length > 0 && (
        <section className={`${sub.bg900} ${sub.section}`}>
          <div className="container">
            <div data-st="true">
              <Eyebrow>{t(lang, "Flere turneringer", "More tournaments")}</Eyebrow>
              <h2 className={sub.h2}>{t(lang, "Det skjer mer.", "More going on.")}</h2>
            </div>
            <div className={s.featGrid}>
              {ordered.map((entry) => (
                <Link
                  key={entry.slug}
                  data-st="true"
                  href={langHref(lang, `/turneringer/${entry.slug}`)}
                  className={s.featCard}
                >
                  {entry.hero && (
                    <div className={s.featMedia}>
                      <Image
                        src={entry.hero}
                        alt=""
                        fill
                        sizes="(max-width: 659px) 100vw, 50vw"
                        className={s.featImg}
                      />
                    </div>
                  )}
                  <div className={s.featBody}>
                    <span className={`${s.statusChip} ${isLive(entry.status) ? s.statusChipLive : ""}`}>
                      {innslagStatus(lang, entry.status)}
                    </span>
                    <h3 className={s.featTitle}>{entry.title}</h3>
                    <span className={s.featMeta}>{entry.datoTekst}</span>
                    <p className={s.featCopy}>{entry.description}</p>
                    <span className={s.featCta}>
                      {t(lang, "Les mer", "Details")} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFx />
    </main>
  );
}
