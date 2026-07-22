"use client";

import { useState } from "react";
import { mailBody, mailtoHref } from "@/lib/site";
import sub from "../subpage.module.css";

export default function BedriftForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={sub.sentCard}>
        <span className={sub.sentKicker}>Sendt</span>
        <h3 className={sub.sentTitle}>Takk!</h3>
        <p className={sub.sentBody}>Svar innen én arbeidsdag.</p>
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
          ["Bedrift", f.get("bedrift")],
          ["Antall", f.get("antall")],
          ["Ønsket dato", f.get("dato")],
          ["Senter", f.get("senter")],
          ["Kontakt", f.get("kontakt")],
          ["Om kvelden", f.get("notat")],
        ]);
        window.location.href = mailtoHref("Bedriftsforespørsel", body);
        setSent(true);
      }}
    >
      <label>
        <span className="fieldLabel">Bedrift</span>
        <input required type="text" name="bedrift" placeholder="Firmanavn" className="fieldInput" />
      </label>
      <div className={sub.formGrid180}>
        <label>
          <span className="fieldLabel">Antall</span>
          <input required type="number" name="antall" min={1} placeholder="Antall personer" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">Ønsket dato</span>
          <input type="date" name="dato" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">Senter</span>
          <select required name="senter" className="fieldInput">
            <option value="Åsane">Åsane</option>
            <option value="Sandviken">Sandviken</option>
            <option value="Vet ikke ennå">Vet ikke ennå</option>
          </select>
        </label>
      </div>
      <label>
        <span className="fieldLabel">Kontakt</span>
        <input required type="text" name="kontakt" placeholder="Navn, e-post og telefon" className="fieldInput" />
      </label>
      <label>
        <span className="fieldLabel">Om kvelden (valgfritt)</span>
        <textarea name="notat" rows={3} placeholder="Ønsker, format, budsjett" className="fieldInput" />
      </label>
      <button type="submit" className="formSubmit">
        Be om tilbud
      </button>
      <p className={sub.formFoot}>Forespørselen sendes til post@innegolfbergen.no.</p>
    </form>
  );
}
