import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { getTurnering, getTurneringSlugs, type TurneringEntryStatus } from "@/lib/content";
import { fmt } from "@/lib/format";
import { asLang, type Lang, langAlternates, t } from "@/lib/i18n";
import { mailtoSubject } from "@/lib/site";
import prose from "../../prose.module.css";
import sub from "../../subpage.module.css";
import s from "../turneringer.module.css";

/* Only slugs that exist at build time may render; anything else must be the
   static branded 404. dynamicParams inheritance from the [lang] layout is
   undocumented, and zero serverless functions is a hard requirement — so it
   is set explicitly on every dynamic segment. */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  /* Runs once per [lang] from the layout's params; slugs are identical in
     both languages (English falls back to Norwegian). Drafts are excluded. */
  return getTurneringSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = asLang(rawLang);
  const entry = getTurnering(lang, slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — INNE Golf Bergen`,
    description: entry.description,
    alternates: langAlternates(`/turneringer/${slug}`),
  };
}

function statusLabel(lang: Lang, status: TurneringEntryStatus): string {
  if (status === "kommende") return t(lang, "Kommende", "Upcoming");
  if (status === "pagaende") return t(lang, "Pågår", "Live");
  return t(lang, "Arkivert", "Archived");
}

export default async function TurneringPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = asLang(rawLang);
  const entry = getTurnering(lang, slug);
  if (!entry) notFound();
  const live = entry.status === "kommende" || entry.status === "pagaende";

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.bg900} ${sub.textHero} ${sub.textHeroShort}`}>
        <div className={`container ${s.detNarrow}`}>
          <div data-fade="true">
            <Eyebrow>{t(lang, "Turneringer", "Tournaments")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={s.detH1}>
            {entry.title}
          </h1>
          <p data-fade="true" className={s.detLead}>
            {entry.description}
          </p>
          <div data-fade="true" className={s.detChips}>
            <span className={`${s.statusChip} ${live ? s.statusChipLive : ""}`}>
              {statusLabel(lang, entry.status)}
            </span>
            <span className={s.statusChip}>{entry.datoTekst}</span>
            {entry.prisTekst && <span className={s.statusChip}>{entry.prisTekst}</span>}
          </div>
        </div>
      </section>

      {/* ============ Innhold ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className={`container ${s.detNarrow}`}>
          {entry.hero && (
            <div data-st="true" className={s.detMedia}>
              <Image src={entry.hero} alt="" fill sizes="(max-width: 860px) 100vw, 820px" className={s.featImg} />
            </div>
          )}
          {lang === "en" && entry.fallback && (
            <p data-st="true" className={s.fallbackNote}>
              This page is only available in Norwegian.
            </p>
          )}
          <div data-st="true" className={prose.prose} dangerouslySetInnerHTML={{ __html: entry.html }} />

          {entry.premier.length > 0 && (
            <div data-st="true" className={s.premierBlock}>
              <span className={s.premierLabel}>{t(lang, "Premier", "Prizes")}</span>
              <div className={sub.specList}>
                {entry.premier.map((premie, i) => (
                  <div
                    key={premie.plass}
                    className={`${sub.specRow} ${i === entry.premier.length - 1 ? sub.specRowLast : ""}`}
                  >
                    <span className={sub.specLabel}>{premie.plass}</span>
                    <span className={sub.specValue}>
                      {fmt(premie.belop)} kr
                      {premie.note ? ` — ${premie.note}` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {entry.pameldingApen && (
            <div data-st="true" className={s.ctaWrap}>
              <Button
                as="a"
                href={
                  entry.pameldingUrl ??
                  mailtoSubject(t(lang, `Påmelding — ${entry.title}`, `Entry — ${entry.title}`))
                }
                size="lg"
              >
                {t(lang, "MELD DEG PÅ", "SIGN UP")}
              </Button>
            </div>
          )}
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
