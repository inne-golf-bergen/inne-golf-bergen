"use client";

import { useState } from "react";
import { type Lang, t } from "@/lib/i18n";
import { mailBody, mailtoHref } from "@/lib/site";
import sub from "../subpage.module.css";

export default function VtgForm({ lang }: { lang: Lang }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={sub.sentCard}>
        <span className={sub.sentKicker}>{t(lang, "Sendt", "Sent")}</span>
        <h3 className={sub.sentTitle}>{t(lang, "Takk!", "Done!")}</h3>
        <p className={sub.sentBody}>
          {t(
            lang,
            "Vi tar kontakt med kursdatoer som passer deg. Har du det travelt, ring/SMS Kjetil på 913 30 248.",
            "We'll reach out with course dates that fit. In a hurry? Call/text Kjetil on 913 30 248.",
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
            [t(lang, "Alder", "Age"), f.get("alder")],
            [t(lang, "Ønsket måned", "Ideal month"), f.get("maaned")],
            [t(lang, "Kontakt", "Contact"), f.get("kontakt")],
          ],
          t(lang, "Interesse Veien til Golf", "Veien til Golf interest"),
        );
        window.location.href = mailtoHref(t(lang, "Interesse — Veien til Golf", "Interest — Veien til Golf"), body);
        setSent(true);
      }}
    >
      <label>
        <span className="fieldLabel">{t(lang, "Navn", "Name")}</span>
        <input required type="text" name="navn" placeholder={t(lang, "Fullt navn", "Full name")} className="fieldInput" />
      </label>
      <div className={sub.formGrid160}>
        <label>
          <span className="fieldLabel">{t(lang, "Alder", "Age")}</span>
          <input required type="number" name="alder" min={1} placeholder={t(lang, "År", "Yr")} className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">{t(lang, "Ønsket måned", "Ideal month")}</span>
          <input
            required
            type="text"
            name="maaned"
            placeholder={t(lang, "F.eks. januar", "E.g. January")}
            className="fieldInput"
          />
        </label>
      </div>
      <label>
        <span className="fieldLabel">{t(lang, "Telefon / e-post", "Phone / email")}</span>
        <input
          required
          type="text"
          name="kontakt"
          placeholder={t(lang, "Telefon eller e-post", "Phone or email")}
          className="fieldInput"
        />
      </label>
      <button type="submit" className="formSubmit">
        {t(lang, "Meld interesse", "I'm interested")}
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
