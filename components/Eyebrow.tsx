import type { CSSProperties, ReactNode } from "react";
import styles from "./eyebrow.module.css";

/**
 * Section kicker: short rule + letterspaced uppercase label.
 * `hero` renders the white-on-photo variant used in the landing hero.
 * `barColor` overrides the rule color (e.g. #D6936D on the ÅGF section).
 */
export default function Eyebrow({
  children,
  hero = false,
  barColor,
}: {
  children: ReactNode;
  hero?: boolean;
  barColor?: string;
}) {
  const barStyle: CSSProperties | undefined = barColor ? { background: barColor } : undefined;
  return (
    <div className={`${styles.row} ${hero ? styles.hero : ""}`}>
      <span className={styles.bar} style={barStyle} />
      <span className={styles.label}>{children}</span>
    </div>
  );
}
