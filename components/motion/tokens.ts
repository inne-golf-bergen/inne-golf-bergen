/**
 * Shared motion tokens — the TS mirror of the CSS custom properties in
 * globals.css (--ease-out, --dur-micro/base/enter). Framer call sites import
 * from here so the two layers can never drift.
 */

/** = GSAP power4.out = CSS var(--ease-out). The site's one interaction curve. */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** iOS drawer curve — accordion height only (enter/exit both). */
export const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];

/** Seconds; matches --dur-micro/--dur-base/--dur-enter. */
export const DUR = { micro: 0.15, base: 0.2, enter: 0.3 } as const;

/* Springs are critically damped — nothing carries user momentum, so per
   Apple's guidance there is no overshoot anywhere in the system. */

/** Scroll/mount reveals (FadeUp, CascadeItem, HeroItem). */
export const REVEAL_SPRING = { type: "spring", stiffness: 150, damping: 26, mass: 1 } as const;

/** Masked hero line-rise — heavier, more cinematic. */
export const LINE_SPRING = { type: "spring", stiffness: 84, damping: 22, mass: 1 } as const;

/** Small glyph rotations (accordion +, carets). */
export const ICON_SPRING = { type: "spring", stiffness: 260, damping: 22 } as const;
