"use client";

import { PRISER } from "@/lib/prices";
import { CountUp } from "./fx";

export default function MedlemTall({
  pay,
  get,
  lineClass,
  accentClass,
}: {
  pay: string;
  get: string;
  lineClass?: string;
  accentClass?: string;
}) {
  return (
    <span style={{ position: "relative", display: "block" }}>
      <span className={lineClass}>
        {pay} <CountUp value={PRISER.medlemskap.aarspris} />.
      </span>{" "}
      <span className={lineClass}>
        {get} <CountUp value={PRISER.medlemskap.verdikort} className={accentClass} />.
      </span>
    </span>
  );
}
