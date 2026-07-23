import sub from "@/app/[lang]/subpage.module.css";
import { type Lang, t } from "@/lib/i18n";

/**
 * Failure notice under a form's submit button when /api/forms doesn't answer
 * ok. role="alert" announces it to screen readers on arrival; the mailto:
 * link is the old prototype flow with the visitor's answers prefilled, so the
 * message can still be delivered while the backend is down.
 */
export default function SendFailed({ lang, mailtoHref }: { lang: Lang; mailtoHref: string }) {
  return (
    <p role="alert" className={sub.sendFailed}>
      {t(lang, "Sendingen feilet. Prøv igjen om litt —", "That didn’t send. Try again in a bit —")}{" "}
      <a data-sweep="true" href={mailtoHref}>
        {t(lang, "eller send som ferdig utfylt e-post", "or send it as a prefilled email")}
      </a>
      .
    </p>
  );
}
