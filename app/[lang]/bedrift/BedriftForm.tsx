"use client";

import BotField from "@/components/BotField";
import SendFailed from "@/components/SendFailed";
import SentCard from "@/components/SentCard";
import { useSendForm } from "@/lib/forms";
import { type Lang, t } from "@/lib/i18n";
import { mailtoSubject, SITE } from "@/lib/site";
import sub from "../subpage.module.css";

export default function BedriftForm({ lang }: { lang: Lang }) {
  const subject = t(lang, "Bedriftsforespørsel", "Company inquiry");
  const { status, fallbackHref, send } = useSendForm("bedrift", subject);

  if (status === "sent") {
    return (
      <SentCard kicker={t(lang, "Sendt", "Sent")} title={t(lang, "Takk for forespørselen.", "Request received.")}>
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
      className={`${sub.form} ${sub.fields950}`}
      aria-busy={status === "sending"}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        void send(
          f,
          [
            [t(lang, "Bedrift", "Company"), f.get("bedrift")],
            [t(lang, "Antall", "People"), f.get("antall")],
            [t(lang, "Ønsket dato", "Date"), f.get("dato")],
            [t(lang, "Senter", "Venue"), f.get("senter")],
            [t(lang, "Navn", "Name"), f.get("navn")],
            [t(lang, "Telefon", "Phone"), f.get("telefon")],
            [t(lang, "E-post", "Email"), f.get("epost")],
            [t(lang, "Om kvelden", "The night"), f.get("notat")],
          ],
          { replyto: f.get("epost") },
        );
      }}
    >
      <BotField />
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
        <span className="fieldLabel">{t(lang, "Om kvelden (valgfritt)", "The night (optional)")}</span>
        <textarea
          name="notat"
          rows={3}
          placeholder={t(lang, "Ønsker, format, budsjett", "Wishes, format, budget")}
          className="fieldInput"
        />
      </label>
      <button type="submit" className="formSubmit" disabled={status === "sending"}>
        {status === "sending" ? t(lang, "Sender…", "Sending…") : t(lang, "Be om tilbud", "Get a quote")}
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
