"use client";

import { useState } from "react";
import SentCard from "@/components/SentCard";
import { type Lang, t } from "@/lib/i18n";
import { mailBody, mailtoHref, mailtoSubject, SITE } from "@/lib/site";
import sub from "../subpage.module.css";

export default function BursdagForm({ lang }: { lang: Lang }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <SentCard
        kicker={t(lang, "Nesten i mål", "Almost there")}
        title={t(lang, "Send e-posten.", "Hit send.")}
        className={sub.formTop}
      >
        <p className={sub.sentBody}>
          {t(
            lang,
            "Vi har gjort klar en e-post i e-postprogrammet ditt — trykk send der, så svarer vi innen én arbeidsdag.",
            "We’ve drafted an email in your mail app — hit send there and we’ll reply within one workday.",
          )}
        </p>
        <p className={sub.sentSub}>
          {t(lang, "Åpnet det ikke noe? Send detaljene til", "Nothing opened? Send the details to")}{" "}
          <a data-sweep="true" href={mailtoSubject(t(lang, "Bursdag hos INNE", "Birthday at INNE"))}>
            {SITE.email}
          </a>
          .
        </p>
      </SentCard>
    );
  }

  return (
    <form
      className={`${sub.form} ${sub.formTop} ${sub.fields900}`}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const body = mailBody([
          [t(lang, "Dato", "Date"), f.get("dato")],
          [t(lang, "Antall barn", "Kids"), f.get("antall")],
          [t(lang, "Alder", "Ages"), f.get("alder")],
          [t(lang, "Senter", "Venue"), f.get("senter")],
          [t(lang, "Navn", "Name"), f.get("navn")],
          [t(lang, "Telefon", "Phone"), f.get("telefon")],
          [t(lang, "E-post", "Email"), f.get("epost")],
          [t(lang, "Notat", "Note"), f.get("notat")],
        ]);
        window.location.href = mailtoHref(t(lang, "Bursdag hos INNE", "Birthday at INNE"), body);
        setSent(true);
      }}
    >
      {/* 2×2 at the form-column width — formGrid180 left "Senter" orphaned on
          its own row next to two empty tracks */}
      <div className={sub.formGrid240}>
        <label>
          <span className="fieldLabel">{t(lang, "Dato", "Date")}</span>
          <input required type="date" name="dato" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">{t(lang, "Antall barn", "Kids")}</span>
          <input required type="number" name="antall" min={6} placeholder={t(lang, "min. 6", "min. 6")} className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">{t(lang, "Alder", "Ages")}</span>
          <input required type="text" name="alder" placeholder={t(lang, "f.eks. 8 år", "e.g. 8")} className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">{t(lang, "Senter", "Venue")}</span>
          <select required name="senter" className="fieldInput">
            <option value="Åsane">Åsane</option>
            <option value="Sandviken">Sandviken</option>
          </select>
        </label>
      </div>
      <label>
        <span className="fieldLabel">{t(lang, "Navn", "Name")}</span>
        <input
          required
          type="text"
          name="navn"
          autoComplete="name"
          placeholder={t(lang, "Ditt navn", "Your name")}
          className="fieldInput"
        />
      </label>
      <div className={sub.formGrid180}>
        <label>
          <span className="fieldLabel">{t(lang, "Telefon", "Phone")}</span>
          <input
            required
            type="tel"
            name="telefon"
            autoComplete="tel"
            placeholder={t(lang, "Telefonnummer", "Phone number")}
            className="fieldInput"
          />
        </label>
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
      </div>
      <label>
        <span className="fieldLabel">{t(lang, "Allergier eller ønsker (valgfritt)", "Allergies or wishes (optional)")}</span>
        <textarea
          name="notat"
          rows={3}
          placeholder={t(lang, "Gi beskjed om allergier her", "Note any allergies here")}
          className="fieldInput"
        />
      </label>
      <button type="submit" className="formSubmit">
        {t(lang, "Send forespørsel", "Send request")}
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
