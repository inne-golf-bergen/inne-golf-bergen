"use client";

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
        {pay} <CountUp value={1800} />.
      </span>{" "}
      <span className={lineClass}>
        {get} <CountUp value={2800} className={accentClass} />.
      </span>
    </span>
  );
}
