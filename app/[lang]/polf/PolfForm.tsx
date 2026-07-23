"use client";

import { useState } from "react";
import SentCard from "@/components/SentCard";
import { type Lang, t } from "@/lib/i18n";
import { mailBody, mailtoHref } from "@/lib/site";
import sub from "../subpage.module.css";

export default function PolfForm({ lang }: { lang: Lang }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <SentCard kicker={t(lang, "Nesten i mål", "Almost there")} title={t(lang, "Slik fullfører du", "How to finish")}>
        <p className={sub.sentBody}>
          {t(lang, "Send e-posten som åpnet seg, og betal avgiften på", "Send the email that opened, then pay")}{" "}
          <strong className={sub.accent}>600 kr</strong> {t(lang, "til Vipps", "via Vipps")}{" "}
          <strong className={sub.accent}>#963257</strong>
          {t(lang, ". Du er registrert når begge deler er gjort.", ". You’re in once both are done.")}
        </p>
        <p className={sub.sentSub}>
          {t(
            lang,
            "Spill den obligatoriske golfrunden i turneringsmodul på ditt senter innen 4. des, så samler du sjetonger til pokerbordet 5. des kl. 19:00. Spørsmål? post@innegolfbergen.no.",
            "Play the mandatory round in tournament mode at your venue by 4 Dec to earn chips for the poker table on 5 Dec at 19:00. Questions? post@innegolfbergen.no.",
          )}
        </p>
      </SentCard>
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
      <button type="submit" className="formSubmit">
        {t(lang, "Meld deg på", "Sign up")}
      </button>
      <p className={sub.formFoot}>
        {t(lang, "Påmeldingen sendes til post@innegolfbergen.no.", "The entry goes to post@innegolfbergen.no.")}
      </p>
    </form>
  );
}
