"use client";

import { useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import { type Lang, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import s from "./gavekort.module.css";

/* U+202F narrow no-break space (thousands groups) and U+00A0 no-break space
   (before the unit) — a price can never line-break internally. Escape form on
   purpose so an editor can't silently swap them for plain spaces. */
const NNBSP = "\u202f";
const NBSP = "\u00a0";
const kr = (num: string) => `${num}${NBSP}kr`;

const CARDS: { value: string; pays: string; bonus: string; featured?: boolean }[] = [
  { value: kr(`1${NNBSP}000`), pays: kr("820"), bonus: `+${kr("180")}` },
  { value: kr(`1${NNBSP}500`), pays: kr(`1${NNBSP}200`), bonus: `+${kr("300")}` },
  { value: kr(`3${NNBSP}000`), pays: kr(`2${NNBSP}310`), bonus: `+${kr("690")}`, featured: true },
  { value: kr(`5${NNBSP}000`), pays: kr(`3${NNBSP}750`), bonus: `+${kr(`1${NNBSP}250`)}` },
  { value: kr(`7${NNBSP}500`), pays: kr(`5${NNBSP}250`), bonus: `+${kr(`2${NNBSP}250`)}` },
];

export default function GavekortVelger({ lang }: { lang: Lang }) {
  const [centre, setCentre] = useState<"asane" | "sandviken">("asane");
  const centreLabel = centre === "asane" ? "Åsane" : "Sandviken";
  const kjopHref = centre === "asane" ? SITE.gavekortBase : SITE.gavekortSandviken;

  return (
    <>
      <div data-st="true" className={s.topRow}>
        <Eyebrow>{t(lang, "Velg verdi", "Pick value")}</Eyebrow>
        <div role="group" aria-label={t(lang, "Velg senter", "Pick venue")} className={s.toggleGroup}>
          <button
            type="button"
            onClick={() => setCentre("asane")}
            aria-pressed={centre === "asane"}
            className={`${s.toggleBtn} ${centre === "asane" ? s.toggleBtnActive : ""}`}
          >
            Åsane
          </button>
          <button
            type="button"
            onClick={() => setCentre("sandviken")}
            aria-pressed={centre === "sandviken"}
            className={`${s.toggleBtn} ${centre === "sandviken" ? s.toggleBtnActive : ""}`}
          >
            Sandviken
          </button>
        </div>
      </div>

      <div className={s.cardGrid}>
        {CARDS.map((card) => (
          <div key={card.value} data-st="true" className={`${s.card} ${card.featured ? s.cardFeatured : ""}`}>
            <span aria-hidden="true" className={`${s.cardGlow} ${card.featured ? s.cardGlowFeatured : ""}`} />
            <div className={s.cardHead}>
              <span className={`${s.cardKicker} ${card.featured ? s.cardKickerFeatured : ""}`}>
                {card.featured ? t(lang, "Mest kjøpt", "Bestseller") : t(lang, "Verdikort", "Voucher")}
              </span>
              <span className={`${s.bonusPill} ${card.featured ? s.bonusPillFeatured : ""}`}>{card.bonus}</span>
            </div>
            <div className={s.valueWrap}>
              <span className={s.valueLabel}>{t(lang, "Verdi", "Value")}</span>
              <span className={s.valueNum}>{card.value}</span>
            </div>
            <div className={s.payRow}>
              <span className={s.payLabel}>{t(lang, "Du betaler", "You pay")}</span>
              <span className={s.payValue}>{card.pays}</span>
            </div>
            <a href={kjopHref} className={s.buyBtn}>
              {t(lang, "Kjøp", "Buy")} — {centreLabel}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
