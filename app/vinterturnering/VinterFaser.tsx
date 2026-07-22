"use client";

import { useState } from "react";
import s from "./vinter.module.css";

type Cell = [string, string];

const PHASES: { num: string; title: string; meta: string; cells: Cell[]; final?: boolean }[] = [
  {
    num: "01",
    title: "Gruppespill",
    meta: "15. nov – 31. des · Texas Scramble netto",
    cells: [
      ["Format", "Texas Scramble netto slag. Maks 2 forsøk per runde. Rundene kan spilles alene som lag."],
      ["Oppsett", "6 puljer à 4 lag. Alle møter alle én gang. Poeng: 3 / 1 / 0."],
      ["Krav", "6 tellende utslag per spiller."],
      [
        "Handicap",
        "Egen TrackMan-bruker. 100 % av ute-HCP legges inn manuelt, maks 36. Lag-HCP = 35 % av laveste + 15 % av høyeste.",
      ],
    ],
  },
  {
    num: "02",
    title: "16-delsfinale",
    meta: "1. jan – 7. feb · Greensome netto",
    cells: [
      ["Format", "Greensome netto. Kan spilles alene."],
      [
        "Oppsett",
        "Vinner av pulje 1 møter nr. 2 fra pulje 2 osv. Hjemme- og bortekamp (2 runder), best sammenlagt netto videre.",
      ],
      ["Handicap", "100 % ute-HCP. TrackMan beregner 60 % laveste + 40 % høyeste, maks 36."],
      ["Uavgjort", "Ny match avtales mellom lagene."],
    ],
  },
  {
    num: "03",
    title: "Kvartfinale",
    meta: "8. feb – 8. mars · Better Ball netto",
    cells: [
      ["Format", "Better Ball netto. Kan spilles alene."],
      ["Oppsett", "Hjemme/borte (2 runder), best sammenlagt videre."],
      ["Handicap", "50 % av ute-HCP, maks 18."],
      ["Uavgjort", "Ny match."],
    ],
  },
  {
    num: "04",
    title: "Semifinale",
    meta: "10. mars – 10. apr · Texas Scramble netto",
    cells: [
      ["Format", "Texas Scramble netto. 6 utslag hver."],
      ["Oppsett", "Hjemme/borte (2 runder). Spilles sammen, lag mot lag."],
      ["Handicap", "100 %, maks 36."],
      ["Uavgjort", "Ny match."],
    ],
  },
  {
    num: "05",
    title: "Finale",
    meta: "10. – 30. apr · Foursome netto",
    final: true,
    cells: [
      ["Format", "Foursome netto. 1 runde."],
      ["Oppsett", "Spilles sammen, lag mot lag."],
      ["Handicap", "100 %, maks 36."],
      ["Uavgjort", "Ny match."],
    ],
  },
];

export default function VinterFaser() {
  const [open, setOpen] = useState(0);

  return (
    <div className={s.phaseList}>
      {PHASES.map((phase, i) => (
        <div
          key={phase.num}
          data-st="true"
          className={`${s.phase} ${i === PHASES.length - 1 ? s.phaseLast : ""} ${phase.final ? s.phaseFinal : ""}`}
        >
          <button
            type="button"
            onClick={() => setOpen((o) => (o === i ? -1 : i))}
            aria-expanded={open === i}
            className={s.phaseBtn}
          >
            <span className={s.phaseNum}>{phase.num}</span>
            <span className={s.phaseTitleWrap}>
              <span className={s.phaseTitle}>{phase.title}</span>
              <span className={s.phaseMeta}>{phase.meta}</span>
            </span>
            <span
              aria-hidden="true"
              className={s.phasePlus}
              style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              +
            </span>
          </button>
          {open === i && (
            <div className={s.phaseDetail}>
              {phase.cells.map(([label, text]) => (
                <div key={label} className={s.detailCell}>
                  <span className={s.detailLabel}>{label}</span>
                  <span className={s.detailText}>{text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
