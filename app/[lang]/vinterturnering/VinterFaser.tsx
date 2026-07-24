"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { EASE_DRAWER, ICON_SPRING } from "@/components/motion/tokens";
import { type Lang, t } from "@/lib/i18n";
import s from "./vinter.module.css";

type Cell = [string, string];
type Phase = { num: string; title: string; meta: string; cells: Cell[]; final?: boolean };

const phases = (lang: Lang): Phase[] => [
  {
    num: "01",
    title: t(lang, "Gruppespill", "Group play"),
    meta: t(lang, "15. nov – 31. des · Texas Scramble netto", "15 Nov – 31 Dec · Texas Scramble net"),
    cells: [
      [
        t(lang, "Format", "Format"),
        t(
          lang,
          "Texas Scramble netto slag. Maks 2 forsøk per runde. Rundene kan spilles alene som lag.",
          "Texas Scramble net strokes. Max 2 tries a round. Rounds may be played solo as a team.",
        ),
      ],
      [
        t(lang, "Oppsett", "Setup"),
        t(
          lang,
          "6 puljer à 4 lag. Alle møter alle én gang. Poeng: 3 / 1 / 0.",
          "6 groups of 4. All meet all once. Points: 3 / 1 / 0.",
        ),
      ],
      [t(lang, "Krav", "Rule"), t(lang, "6 tellende utslag per spiller.", "6 tee shots count per player.")],
      [
        "Handicap",
        t(
          lang,
          "Egen TrackMan-bruker. 100 % av ute-HCP legges inn manuelt, maks 36. Lag-HCP = 35 % av laveste + 15 % av høyeste.",
          "Own TrackMan user. 100 % of outdoor HCP set manually, max 36. Team HCP = 35 % of lowest + 15 % of highest.",
        ),
      ],
    ],
  },
  {
    num: "02",
    title: t(lang, "16-delsfinale", "Round of 16"),
    meta: t(lang, "1. jan – 7. feb · Greensome netto", "1 Jan – 7 Feb · Greensome net"),
    cells: [
      [t(lang, "Format", "Format"), t(lang, "Greensome netto. Kan spilles alene.", "Greensome net. Can be played solo.")],
      [
        t(lang, "Oppsett", "Setup"),
        t(
          lang,
          "Vinner av pulje 1 møter nr. 2 fra pulje 2 osv. Hjemme- og bortekamp (2 runder), best sammenlagt netto videre.",
          "Group 1 winner meets group 2 runner-up, etc. Home and away (2 rounds), best combined net advances.",
        ),
      ],
      [
        "Handicap",
        t(
          lang,
          "100 % ute-HCP. TrackMan beregner 60 % laveste + 40 % høyeste, maks 36.",
          "100 % outdoor HCP. TrackMan uses 60 % lowest + 40 % highest, max 36.",
        ),
      ],
      [t(lang, "Uavgjort", "Tie"), t(lang, "Ny match avtales mellom lagene.", "Teams arrange a new match.")],
    ],
  },
  {
    num: "03",
    title: t(lang, "Kvartfinale", "Quarters"),
    meta: t(lang, "8. feb – 8. mars · Better Ball netto", "8 Feb – 8 Mar · Better Ball net"),
    cells: [
      [t(lang, "Format", "Format"), t(lang, "Better Ball netto. Kan spilles alene.", "Better Ball net. Can be played solo.")],
      [
        t(lang, "Oppsett", "Setup"),
        t(lang, "Hjemme/borte (2 runder), best sammenlagt videre.", "Home/away (2 rounds), best combined advances."),
      ],
      ["Handicap", t(lang, "50 % av ute-HCP, maks 18.", "50 % outdoor HCP, max 18.")],
      [t(lang, "Uavgjort", "Tie"), t(lang, "Ny match.", "Replay.")],
    ],
  },
  {
    num: "04",
    title: t(lang, "Semifinale", "Semifinal"),
    meta: t(lang, "10. mars – 10. apr · Texas Scramble netto", "10 Mar – 10 Apr · Texas Scramble net"),
    cells: [
      [t(lang, "Format", "Format"), t(lang, "Texas Scramble netto. 6 utslag hver.", "Texas Scramble net. 6 drives each.")],
      [
        t(lang, "Oppsett", "Setup"),
        t(
          lang,
          "Hjemme/borte (2 runder). Spilles sammen, lag mot lag.",
          "Home/away (2 rounds). Played together, team vs team.",
        ),
      ],
      ["Handicap", t(lang, "100 %, maks 36.", "100 %, max 36.")],
      [t(lang, "Uavgjort", "Tie"), t(lang, "Ny match.", "Replay.")],
    ],
  },
  {
    num: "05",
    title: t(lang, "Finale", "Final"),
    meta: t(lang, "10. – 30. apr · Foursome netto", "10 – 30 Apr · Foursome net"),
    final: true,
    cells: [
      [t(lang, "Format", "Format"), t(lang, "Foursome netto. 1 runde.", "Foursome net. 1 round.")],
      [t(lang, "Oppsett", "Setup"), t(lang, "Spilles sammen, lag mot lag.", "Together, team vs team.")],
      ["Handicap", t(lang, "100 %, maks 36.", "100 %, max 36.")],
      [t(lang, "Uavgjort", "Tie"), t(lang, "Ny match.", "Replay.")],
    ],
  },
];

export default function VinterFaser({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  const list = phases(lang);

  return (
    <div className={s.phaseList}>
      {list.map((phase, i) => {
        const isOpen = open === i;
        return (
          <div
            key={phase.num}
            data-st="true"
            className={`${s.phase} ${i === list.length - 1 ? s.phaseLast : ""} ${phase.final ? s.phaseFinal : ""}`}
          >
            <button
              type="button"
              id={`fase-q-${i}`}
              onClick={() => setOpen((o) => (o === i ? -1 : i))}
              aria-expanded={isOpen}
              aria-controls={`fase-a-${i}`}
              className={s.phaseBtn}
            >
              <span className={s.phaseNum}>{phase.num}</span>
              <span className={s.phaseTitleWrap}>
                <span className={s.phaseTitle}>{phase.title}</span>
                <span className={s.phaseMeta}>{phase.meta}</span>
              </span>
              <m.span
                aria-hidden="true"
                className={s.phasePlus}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={reduce ? { duration: 0 } : ICON_SPRING}
              >
                +
              </m.span>
            </button>
            {/* the Faq.tsx drawer recipe — exit snappier than enter */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  key="detail"
                  id={`fase-a-${i}`}
                  role="region"
                  aria-labelledby={`fase-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: reduce
                      ? { duration: 0 }
                      : {
                          height: { duration: 0.24, ease: EASE_DRAWER },
                          opacity: { duration: 0.14, ease: "easeOut" },
                        },
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          height: { duration: 0.32, ease: EASE_DRAWER },
                          opacity: { duration: 0.22, ease: "easeOut" },
                        }
                  }
                  style={{ overflow: "hidden" }}
                >
                  <div className={s.phaseDetail}>
                    {phase.cells.map(([label, text]) => (
                      <div key={label} className={s.detailCell}>
                        <span className={s.detailLabel}>{label}</span>
                        <span className={s.detailText}>{text}</span>
                      </div>
                    ))}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
