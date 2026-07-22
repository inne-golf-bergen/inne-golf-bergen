"use client";

import { useState } from "react";
import { mailBody, mailtoHref } from "@/lib/site";
import sub from "../subpage.module.css";

export default function VtgForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={sub.sentCard}>
        <span className={sub.sentKicker}>Sendt</span>
        <h3 className={sub.sentTitle}>Takk!</h3>
        <p className={sub.sentBody}>
          Vi tar kontakt med kursdatoer som passer deg. Har du det travelt, ring/SMS Kjetil på 913 30 248.
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
            ["Navn", f.get("navn")],
            ["Alder", f.get("alder")],
            ["Ønsket måned", f.get("maaned")],
            ["Kontakt", f.get("kontakt")],
          ],
          "Interesse Veien til Golf",
        );
        window.location.href = mailtoHref("Interesse — Veien til Golf", body);
        setSent(true);
      }}
    >
      <label>
        <span className="fieldLabel">Navn</span>
        <input required type="text" name="navn" placeholder="Fullt navn" className="fieldInput" />
      </label>
      <div className={sub.formGrid160}>
        <label>
          <span className="fieldLabel">Alder</span>
          <input required type="number" name="alder" min={1} placeholder="År" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">Ønsket måned</span>
          <input required type="text" name="maaned" placeholder="F.eks. januar" className="fieldInput" />
        </label>
      </div>
      <label>
        <span className="fieldLabel">Telefon / e-post</span>
        <input required type="text" name="kontakt" placeholder="Telefon eller e-post" className="fieldInput" />
      </label>
      <button type="submit" className="formSubmit">
        Meld interesse
      </button>
      <p className={sub.formFoot}>Forespørselen sendes til post@innegolfbergen.no.</p>
    </form>
  );
}
