"use client";

import BotField from "@/components/BotField";
import SendFailed from "@/components/SendFailed";
import SentCard from "@/components/SentCard";
import { useSendForm } from "@/lib/forms";
import { type Lang, t } from "@/lib/i18n";
import { mailtoSubject, SITE } from "@/lib/site";
import sub from "../subpage.module.css";

export default function BursdagForm({ lang }: { lang: Lang }) {
  const subject = t(lang, "Bursdag hos INNE", "Birthday at INNE");
  const { status, fallbackHref, send } = useSendForm("bursdag", subject);

  if (status === "sent") {
    return (
      <SentCard
        kicker={t(lang, "Sendt", "Sent")}
        title={t(lang, "Takk for forespørselen.", "Request received.")}
        className={sub.formTop}
      >
        <p className={sub.sentBody}>
          {t(
            lang,
            "Forespørselen er hos oss — vi svarer innen én arbeidsdag.",
            "Your request is with us — we reply within one workday.",
          )}
        </p>
        <p className={sub.sentSub}>
          {t(lang, "Haster det? Skriv direkte til", "In a hurry? Write straight to")}{" "}
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
      className={`${sub.form} ${sub.formTop} ${sub.fields900}`}
      aria-busy={status === "sending"}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        void send(
          f,
          [
            [t(lang, "Dato", "Date"), f.get("dato")],
            [t(lang, "Antall barn", "Kids"), f.get("antall")],
            [t(lang, "Alder", "Ages"), f.get("alder")],
            [t(lang, "Senter", "Venue"), f.get("senter")],
            [t(lang, "Navn", "Name"), f.get("navn")],
            [t(lang, "Telefon", "Phone"), f.get("telefon")],
            [t(lang, "E-post", "Email"), f.get("epost")],
            [t(lang, "Notat", "Note"), f.get("notat")],
          ],
          { replyto: f.get("epost") },
        );
      }}
    >
      <BotField />
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
      <button type="submit" className="formSubmit" disabled={status === "sending"}>
        {status === "sending" ? t(lang, "Sender…", "Sending…") : t(lang, "Send forespørsel", "Send request")}
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
