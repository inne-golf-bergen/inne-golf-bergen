"use client";

import { useState } from "react";
import { mailBody, mailtoHref } from "@/lib/site";
import sub from "../subpage.module.css";

export default function BursdagForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={`${sub.sentCard} ${sub.formTop}`}>
        <span className={sub.sentKicker}>Sendt</span>
        <h3 className={sub.sentTitle}>Takk!</h3>
        <p className={sub.sentBody}>Vi svarer innen én arbeidsdag.</p>
      </div>
    );
  }

  return (
    <form
      className={`${sub.form} ${sub.formTop} ${sub.fields900}`}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const body = mailBody([
          ["Dato", f.get("dato")],
          ["Antall barn", f.get("antall")],
          ["Alder", f.get("alder")],
          ["Senter", f.get("senter")],
          ["Navn", f.get("navn")],
          ["Telefon", f.get("telefon")],
          ["E-post", f.get("epost")],
          ["Notat", f.get("notat")],
        ]);
        window.location.href = mailtoHref("Bursdag hos INNE", body);
        setSent(true);
      }}
    >
      <div className={sub.formGrid180}>
        <label>
          <span className="fieldLabel">Dato</span>
          <input required type="date" name="dato" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">Antall barn</span>
          <input required type="number" name="antall" min={6} placeholder="min. 6" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">Alder</span>
          <input required type="text" name="alder" placeholder="f.eks. 8 år" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">Senter</span>
          <select required name="senter" className="fieldInput">
            <option value="Åsane">Åsane</option>
            <option value="Sandviken">Sandviken</option>
          </select>
        </label>
      </div>
      <label>
        <span className="fieldLabel">Navn</span>
        <input required type="text" name="navn" placeholder="Ditt navn" className="fieldInput" />
      </label>
      <div className={sub.formGrid180}>
        <label>
          <span className="fieldLabel">Telefon</span>
          <input required type="tel" name="telefon" placeholder="Telefonnummer" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">E-post</span>
          <input required type="email" name="epost" placeholder="din@epost.no" className="fieldInput" />
        </label>
      </div>
      <label>
        <span className="fieldLabel">Allergier eller ønsker (valgfritt)</span>
        <textarea name="notat" rows={3} placeholder="Gi beskjed om allergier her" className="fieldInput" />
      </label>
      <button type="submit" className="formSubmit">
        Send forespørsel
      </button>
      <p className={sub.formFoot}>Forespørselen sendes til post@innegolfbergen.no.</p>
    </form>
  );
}
