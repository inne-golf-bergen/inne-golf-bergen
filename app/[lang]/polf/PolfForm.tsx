"use client";

import BotField from "@/components/BotField";
import SendFailed from "@/components/SendFailed";
import SentCard from "@/components/SentCard";
import { fmt } from "@/lib/format";
import { useSendForm } from "@/lib/forms";
import { type Lang, t } from "@/lib/i18n";
import sub from "../subpage.module.css";

/* Fee, Vipps number and event dates come from content/turnering-polf.json via
   the page, so the owner's edits in /admin reach the form copy too. */
export default function PolfForm({
  lang,
  avgift,
  vipps,
  golfvindu,
  pokerkveld,
}: {
  lang: Lang;
  avgift: number;
  vipps: string;
  golfvindu: string;
  pokerkveld: string;
}) {
  const { status, fallbackHref, send } = useSendForm("polf", t(lang, "Påmelding POLF", "POLF entry"));
  const AVG = fmt(avgift); // 600

  if (status === "sent") {
    return (
      <SentCard kicker={t(lang, "Nesten i mål", "Almost there")} title={t(lang, "Slik fullfører du", "How to finish")}>
        <p className={sub.sentBody}>
          {t(lang, "Påmeldingen er sendt. Betal avgiften på", "Your entry is sent. Pay the")}{" "}
          <strong className={sub.accent}>{`${AVG} kr`}</strong> {t(lang, "til Vipps", "via Vipps")}{" "}
          <strong className={sub.accent}>#{vipps}</strong>
          {t(lang, " — du er registrert når betalingen er inne.", " — you’re in once the payment lands.")}
        </p>
        <p className={sub.sentSub}>
          {t(
            lang,
            `Spill den obligatoriske golfrunden i turneringsmodul på ditt senter (${golfvindu}), så samler du sjetonger til pokerkvelden (${pokerkveld}). Spørsmål? post@innegolfbergen.no.`,
            `Play the mandatory round in tournament mode at your venue (${golfvindu}) to earn chips for poker night (${pokerkveld}). Questions? post@innegolfbergen.no.`,
          )}
        </p>
      </SentCard>
    );
  }

  return (
    <form
      className={`${sub.form} ${sub.fields900}`}
      aria-busy={status === "sending"}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        void send(
          f,
          [
            [t(lang, "Navn", "Name"), f.get("navn")],
            [t(lang, "E-post", "Email"), f.get("epost")],
            [t(lang, "TrackMan-bruker", "TrackMan user"), f.get("trackman")],
            [t(lang, "Senter", "Venue"), f.get("senter")],
          ],
          {
            replyto: f.get("epost"),
            intro: t(lang, "Påmelding POLF", "POLF entry"),
            outro: t(lang, `Avgift ${AVG} kr til Vipps #${vipps}.`, `${AVG} kr fee via Vipps #${vipps}.`),
          },
        );
      }}
    >
      <BotField />
      <label>
        <span className="fieldLabel">{t(lang, "Navn", "Name")}</span>
        <input
          required
          type="text"
          name="navn"
          autoComplete="name"
          placeholder={t(lang, "Fullt navn", "Full name")}
          className="fieldInput"
        />
      </label>
      <div className={sub.formGrid200}>
        <label>
          <span className="fieldLabel">{t(lang, "E-post", "Email")}</span>
          <input
            required
            type="email"
            name="epost"
            autoComplete="email"
            placeholder={t(lang, "din@epost.no", "you@mail.com")}
            className="fieldInput"
          />
        </label>
        <label>
          <span className="fieldLabel">{t(lang, "TrackMan-brukerens e-post", "TrackMan account email")}</span>
          <input
            required
            type="email"
            name="trackman"
            placeholder={t(lang, "trackman@epost.no", "trackman@mail.com")}
            className="fieldInput"
          />
        </label>
      </div>
      <label>
        <span className="fieldLabel">{t(lang, "Ditt senter", "Your venue")}</span>
        <select required name="senter" defaultValue="" className="fieldInput">
          <option value="" disabled>
            {t(lang, "Velg senter", "Pick venue")}
          </option>
          <option value="Åsane">Åsane</option>
          <option value="Sandviken">Sandviken</option>
          <option value={t(lang, "Annet senter", "Other venue")}>
            {t(lang, "Annet golfsenter", "Other golf venue")}
          </option>
        </select>
      </label>
      <button type="submit" className="formSubmit" disabled={status === "sending"}>
        {status === "sending" ? t(lang, "Sender…", "Sending…") : t(lang, "Meld deg på", "Sign up")}
      </button>
      {status === "error" && <SendFailed lang={lang} mailtoHref={fallbackHref} />}
      <p className={sub.formFoot}>
        {t(lang, "Påmeldingen sendes til post@innegolfbergen.no.", "The entry goes to post@innegolfbergen.no.")}
      </p>
    </form>
  );
}
