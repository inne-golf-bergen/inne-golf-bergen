import priserJson from "@/content/priser.json";

/**
 * Every price on the site, sourced from content/priser.json — the file the
 * owner edits in /admin. The explicit `Priser` annotation on the export is
 * the schema guard: a CMS commit that breaks the shape fails `tsc` inside
 * `next build`, so Vercel keeps the last good deploy serving.
 *
 * Client-safe (plain JSON import, no fs) — client components may import this.
 */
export type Priser = {
  sim: { halvtimeMin: number; halvtimeMax: number; timeMin: number; timeMax: number };
  medlemskap: { aarspris: number; verdikort: number; klubbPris: number; rabattProsent: number };
  gavekort: { cards: { value: number; pays: number; featured: boolean }[] };
  bursdag: { prisPerBarn: number; minBarn: number };
  vtg: { junior: number; voksen: number; depositum: number };
};

export const PRISER: Priser = priserJson;

/* Derived values — computed, never stored, so one edit can't leave a stale
   sibling number somewhere on the site. */

/** Cheapest voucher price ("Verdikort fra 820 kr"). */
export const gavekortMinPris = Math.min(...PRISER.gavekort.cards.map((c) => c.pays));

/** Best bonus percentage across the voucher cards ("opptil 43 %"). */
export const gavekortMaksBonusPct = Math.max(
  ...PRISER.gavekort.cards.map((c) => Math.round(((c.value - c.pays) / c.pays) * 100)),
);

/** Annual membership as a monthly figure ("150 kr i måneden"). */
export const medlemPrMnd = Math.round(PRISER.medlemskap.aarspris / 12);

/** Voucher value in simulator hours at the standard hourly rate ("ca. 7 timer"). */
export const medlemTimerOrdinaer = Math.round(PRISER.medlemskap.verdikort / PRISER.sim.timeMax);

/** …and at the cheapest rate with the member discount applied ("opptil 17,5 timer"),
    rounded to the nearest half hour. */
export const medlemTimerBillig =
  Math.round(
    (PRISER.medlemskap.verdikort /
      (PRISER.sim.halvtimeMin * 2 * (1 - PRISER.medlemskap.rabattProsent / 100))) *
      2,
  ) / 2;
