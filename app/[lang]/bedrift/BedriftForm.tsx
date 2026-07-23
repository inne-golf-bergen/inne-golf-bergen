"use client";

import { useState } from "react";
import { type Lang, t } from "@/lib/i18n";
import { mailBody, mailtoHref } from "@/lib/site";
import sub from "../subpage.module.css";

export default function BedriftForm({ lang }: { lang: Lang }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={sub.sentCard}>
        <span className={sub.sentKicker}>{t(lang, "Sendt", "Sent")}</span>
        <h3 className={sub.sentTitle}>{t(lang, "Takk!", "Done!")}</h3>
        <p className={sub.sentBody}>{t(lang, "Svar innen én arbeidsdag.", "Reply within one workday.")}</p>
      </div>
    );
  }

  return (
    <form
      className={`${sub.form} ${sub.fields950}`}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const body = mailBody([
          [t(lang, "Bedrift", "Company"), f.get("bedrift")],
          [t(lang, "Antall", "People"), f.get("antall")],
          [t(lang, "Ønsket dato", "Date"), f.get("dato")],
          [t(lang, "Senter", "Venue"), f.get("senter")],
          [t(lang, "Kontakt", "Contact"), f.get("kontakt")],
          [t(lang, "Om kvelden", "The night"), f.get("notat")],
        ]);
        window.location.href = mailtoHref(t(lang, "Bedriftsforespørsel", "Company inquiry"), body);
        setSent(true);
      }}
    >
      <label>
        <span className="fieldLabel">{t(lang, "Bedrift", "Company")}</span>
        <input required type="text" name="bedrift" placeholder={t(lang, "Firmanavn", "Name")} className="fieldInput" />
      </label>
      <div className={sub.formGrid180}>
        <label>
          <span className="fieldLabel">{t(lang, "Antall", "People")}</span>
          <input
            required
            type="number"
            name="antall"
            min={1}
            placeholder={t(lang, "Antall personer", "How many")}
            className="fieldInput"
          />
        </label>
        <label>
          <span className="fieldLabel">{t(lang, "Ønsket dato", "Date")}</span>
          <input type="date" name="dato" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">{t(lang, "Senter", "Venue")}</span>
          <select required name="senter" className="fieldInput">
            <option value="Åsane">Åsane</option>
            <option value="Sandviken">Sandviken</option>
            <option value={t(lang, "Vet ikke ennå", "Not sure yet")}>{t(lang, "Vet ikke ennå", "Not sure yet")}</option>
          </select>
        </label>
      </div>
      <label>
        <span className="fieldLabel">{t(lang, "Kontakt", "Contact")}</span>
        <input
          required
          type="text"
          name="kontakt"
          placeholder={t(lang, "Navn, e-post og telefon", "Name, email and phone")}
          className="fieldInput"
        />
      </label>
      <label>
        <span className="fieldLabel">{t(lang, "Om kvelden (valgfritt)", "The night (optional)")}</span>
        <textarea
          name="notat"
          rows={3}
          placeholder={t(lang, "Ønsker, format, budsjett", "Wishes, format, budget")}
          className="fieldInput"
        />
      </label>
      <button type="submit" className="formSubmit">
        {t(lang, "Be om tilbud", "Get a quote")}
      </button>
      <p className={sub.formFoot}>
        {t(
          lang,
          "Forespørselen sendes til post@innegolfbergen.no.",
          "The request goes to post@innegolfbergen.no.",
        )}
      </p>
    </form>
  );
}
