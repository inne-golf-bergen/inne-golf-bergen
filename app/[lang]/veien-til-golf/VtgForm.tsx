"use client";

import BotField from "@/components/BotField";
import SendFailed from "@/components/SendFailed";
import SentCard from "@/components/SentCard";
import { useSendForm } from "@/lib/forms";
import { type Lang, t } from "@/lib/i18n";
import { mailtoSubject, SITE } from "@/lib/site";
import sub from "../subpage.module.css";

export default function VtgForm({ lang }: { lang: Lang }) {
  const subject = t(lang, "Interesse — Veien til Golf", "Interest — Veien til Golf");
  const { status, fallbackHref, send } = useSendForm("vtg", subject);

  if (status === "sent") {
    return (
      <SentCard kicker={t(lang, "Sendt", "Sent")} title={t(lang, "Interessen er registrert.", "You’re on the list.")}>
        <p className={sub.sentBody}>
          {t(
            lang,
            "Vi tar kontakt med kursdatoer som passer. Har du det travelt, ring/SMS Kjetil på 913 30 248.",
            "We’ll suggest course dates that fit. In a hurry? Call/text Kjetil on 913 30 248.",
          )}
        </p>
        <p className={sub.sentSub}>
          {t(lang, "Spørsmål? Skriv til", "Questions? Write to")}{" "}
          <a data-sweep="true" href={mailtoSubject(subject)}>
            {SITE.email}
          </a>
          .
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
            [t(lang, "Alder", "Age"), f.get("alder")],
            [t(lang, "Ønsket måned", "Ideal month"), f.get("maaned")],
            [t(lang, "Kontakt", "Contact"), f.get("kontakt")],
          ],
          { replyto: f.get("kontakt"), intro: t(lang, "Interesse Veien til Golf", "Veien til Golf interest") },
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
      <button type="submit" className="formSubmit" disabled={status === "sending"}>
        {status === "sending" ? t(lang, "Sender…", "Sending…") : t(lang, "Meld interesse", "I’m interested")}
      </button>
      {status === "error" && <SendFailed lang={lang} mailtoHref={fallbackHref} />}
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
