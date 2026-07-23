"use client";

import { useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import { type Lang, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import s from "./gavekort.module.css";

const NNBSP = " ";

const CARDS: { value: string; pays: string; bonus: string; featured?: boolean }[] = [
  { value: `1${NNBSP}000 kr`, pays: "820 kr", bonus: "+180 kr" },
  { value: `1${NNBSP}500 kr`, pays: `1${NNBSP}200 kr`, bonus: "+300 kr" },
  { value: `3${NNBSP}000 kr`, pays: `2${NNBSP}310 kr`, bonus: "+690 kr", featured: true },
  { value: `5${NNBSP}000 kr`, pays: `3${NNBSP}750 kr`, bonus: `+1${NNBSP}250 kr` },
  { value: `7${NNBSP}500 kr`, pays: `5${NNBSP}250 kr`, bonus: `+2${NNBSP}250 kr` },
];

export default function GavekortVelger({ lang }: { lang: Lang }) {
  const [centre, setCentre] = useState<"asane" | "sandviken">("asane");
  const centreLabel = centre === "asane" ? "Åsane" : "Sandviken";
  const kjopHref = SITE.gavekortBase;

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
