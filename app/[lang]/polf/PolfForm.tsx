"use client";

import { useState } from "react";
import { type Lang, t } from "@/lib/i18n";
import { mailBody, mailtoHref } from "@/lib/site";
import sub from "../subpage.module.css";

export default function PolfForm({ lang }: { lang: Lang }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={sub.sentCard}>
        <span className={sub.sentKicker}>{t(lang, "Nesten i mål", "Almost there")}</span>
        <h3 className={sub.sentTitle}>{t(lang, "Slik fullfører du", "How to finish")}</h3>
        <p className={sub.sentBody}>
          {t(lang, "Betal avgiften på", "Pay the fee of")} <strong className={sub.accent}>600 kr</strong>{" "}
          {t(lang, "til Vipps", "via Vipps")} <strong className={sub.accent}>#963257</strong>
          {t(lang, ". Når avgiften er betalt, er du registrert.", ". Once it's paid, you're registered.")}
        </p>
        <p className={sub.sentSub}>
          {t(
            lang,
            "Spill den obligatoriske golfrunden i turneringsmodul på ditt senter innen 4. des, så samler du sjetonger til pokerbordet 5. des kl. 19:00. Spørsmål? post@innegolfbergen.no.",
            "Play the mandatory round in tournament mode at your venue by 4 Dec to earn chips for the poker table on 5 Dec at 19:00. Questions? post@innegolfbergen.no.",
          )}
        </p>
      </div>
    );
  }

  return (
    <form
      className={`${sub.form} ${sub.fields900}`}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const body = mailBody(
          [
            [t(lang, "Navn", "Name"), f.get("navn")],
            [t(lang, "E-post", "Email"), f.get("epost")],
            [t(lang, "TrackMan-bruker", "TrackMan user"), f.get("trackman")],
            [t(lang, "Senter", "Venue"), f.get("senter")],
          ],
          t(lang, "Påmelding POLF", "POLF entry"),
          t(lang, "Avgift 600 kr til Vipps #963257.", "600 kr fee via Vipps #963257."),
        );
        window.location.href = mailtoHref(t(lang, "Påmelding POLF", "POLF entry"), body);
        setSent(true);
      }}
    >
      <label>
        <span className="fieldLabel">{t(lang, "Navn", "Name")}</span>
        <input required type="text" name="navn" placeholder={t(lang, "Fullt navn", "Full name")} className="fieldInput" />
      </label>
      <div className={sub.formGrid200}>
        <label>
          <span className="fieldLabel">{t(lang, "E-post", "Email")}</span>
          <input
            required
            type="email"
            name="epost"
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
      <button type="submit" className="formSubmit">
        {t(lang, "Meld deg på", "Sign up")}
      </button>
      <p className={sub.formFoot}>
        {t(lang, "Påmeldingen sendes til post@innegolfbergen.no.", "The entry goes to post@innegolfbergen.no.")}
      </p>
    </form>
  );
}
