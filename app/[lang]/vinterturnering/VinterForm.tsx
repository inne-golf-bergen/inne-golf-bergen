"use client";

import { useState } from "react";
import SentCard from "@/components/SentCard";
import { type Lang, t } from "@/lib/i18n";
import { mailBody, mailtoHref } from "@/lib/site";
import sub from "../subpage.module.css";

const NNBSP = " ";

export default function VinterForm({ lang }: { lang: Lang }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <SentCard kicker={t(lang, "Nesten i mål", "Almost there")} title={t(lang, "Slik fullfører du", "How to finish")}>
        <p className={sub.sentBody}>
          {t(lang, "Send e-posten som åpnet seg, og betal deltakeravgiften på", "Send the email that opened, then pay")}{" "}
          <strong className={sub.accent}>
            {t(lang, `500 kr per spiller (1${NNBSP}000 kr for laget)`, `500 kr per player (1${NNBSP}000 kr per team)`)}
          </strong>{" "}
          {t(lang, "til Vipps", "via Vipps")} <strong className={sub.accent}>#946014</strong>
          {t(
            lang,
            ". Laget er påmeldt når begge deler er gjort.",
            ". You’re in once both are done.",
          )}
        </p>
        <p className={sub.sentSub}>
          {t(
            lang,
            "Puljer og lagoppsett publiseres i vår Facebook-gruppe. Spørsmål? post@innegolfbergen.no.",
            "Groups and pairings are posted in our Facebook group. Questions? post@innegolfbergen.no.",
          )}
        </p>
      </SentCard>
    );
  }

  return (
    <form
      className={`${sub.form} ${sub.fields950}`}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const body = mailBody(
          [
            [t(lang, "Lagnavn", "Team"), f.get("lagnavn")],
            [t(lang, "Spiller 1", "Player 1"), `${f.get("s1navn") ?? ""} — ${f.get("s1epost") ?? ""}`],
            [t(lang, "Spiller 2", "Player 2"), `${f.get("s2navn") ?? ""} — ${f.get("s2epost") ?? ""}`],
            [t(lang, "Telefon", "Phone"), f.get("telefon")],
          ],
          t(lang, "Påmelding Vinterturneringen", "Winter Cup entry"),
          t(
            lang,
            "Deltakeravgift 500 kr per spiller til Vipps #946014.",
            "Entry fee 500 kr per player via Vipps #946014.",
          ),
        );
        window.location.href = mailtoHref(t(lang, "Påmelding Vinterturneringen", "Winter Cup entry"), body);
        setSent(true);
      }}
    >
      <label>
        <span className="fieldLabel">{t(lang, "Lagnavn", "Team")}</span>
        <input
          required
          type="text"
          name="lagnavn"
          placeholder={t(lang, "Navn på laget", "Team name")}
          className="fieldInput"
        />
      </label>
      <div className={sub.formGrid200}>
        <label>
          <span className="fieldLabel">{t(lang, "Spiller 1 — navn", "Player 1 — name")}</span>
          <input required type="text" name="s1navn" placeholder={t(lang, "Fullt navn", "Full name")} className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">{t(lang, "Spiller 1 — e-post", "Player 1 — email")}</span>
          <input
            required
            type="email"
            name="s1epost"
            placeholder={t(lang, "din@epost.no", "you@mail.com")}
            className="fieldInput"
          />
        </label>
        <label>
          <span className="fieldLabel">{t(lang, "Spiller 2 — navn", "Player 2 — name")}</span>
          <input required type="text" name="s2navn" placeholder={t(lang, "Fullt navn", "Full name")} className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">{t(lang, "Spiller 2 — e-post", "Player 2 — email")}</span>
          <input
            required
            type="email"
            name="s2epost"
            placeholder={t(lang, "din@epost.no", "you@mail.com")}
            className="fieldInput"
          />
        </label>
      </div>
      <label>
        <span className="fieldLabel">{t(lang, "Telefon", "Phone")}</span>
        <input
          required
          type="tel"
          name="telefon"
          autoComplete="tel"
          placeholder={t(lang, "Kontakttelefon", "Contact phone")}
          className="fieldInput"
        />
      </label>
      <button type="submit" className="formSubmit">
        {t(lang, "Meld på laget", "Register team")}
      </button>
      <p className={sub.formFoot}>
        {t(lang, "Påmeldingen sendes til post@innegolfbergen.no.", "The entry goes to post@innegolfbergen.no.")}
      </p>
    </form>
  );
}
