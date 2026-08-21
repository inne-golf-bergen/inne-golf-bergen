import { type Lang, t } from "@/lib/i18n";
import s from "./coming-soon.module.css";

/**
 * Poster tile that stands in for a venue photo until Laksevåg opens.
 * Purely decorative (aria-hidden): the opening date always lives in the
 * text beside it, so screen readers hear it exactly once.
 */
export default function ComingSoonTile({ lang }: { lang: Lang }) {
  return (
    <div aria-hidden="true" className={s.tile}>
      <span className={s.ghost}>{t(lang, "Snart", "Soon")}</span>
      <div className={s.lockup}>
        <span className={s.kicker}>
          <span className={s.dot} />
          {t(lang, "Åpner snart", "Coming soon")}
        </span>
        <span className={s.date}>{t(lang, "1. oktober", "October 1")}</span>
      </div>
    </div>
  );
}
