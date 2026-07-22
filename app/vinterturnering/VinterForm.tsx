"use client";

import { useState } from "react";
import { mailBody, mailtoHref } from "@/lib/site";
import sub from "../subpage.module.css";

const NNBSP = "\u202F";

export default function VinterForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={sub.sentCard}>
        <span className={sub.sentKicker}>Påmelding mottatt</span>
        <h3 className={sub.sentTitle}>Takk — laget er registrert!</h3>
        <p className={sub.sentBody}>
          Betal deltakeravgiften på <strong className={sub.accent}>{`500 kr per spiller (1${NNBSP}000 kr for laget)`}</strong> til
          Vipps <strong className={sub.accent}>#946014</strong>. Påmeldingen er bekreftet så snart avgiften er
          registrert.
        </p>
        <p className={sub.sentSub}>
          Puljer og lagoppsett publiseres i vår Facebook-gruppe. Spørsmål? post@innegolfbergen.no.
        </p>
      </div>
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
            ["Lagnavn", f.get("lagnavn")],
            ["Spiller 1", `${f.get("s1navn") ?? ""} — ${f.get("s1epost") ?? ""}`],
            ["Spiller 2", `${f.get("s2navn") ?? ""} — ${f.get("s2epost") ?? ""}`],
            ["Telefon", f.get("telefon")],
          ],
          "Påmelding Vinterturneringen",
          "Deltakeravgift 500 kr per spiller til Vipps #946014.",
        );
        window.location.href = mailtoHref("Påmelding Vinterturneringen", body);
        setSent(true);
      }}
    >
      <label>
        <span className="fieldLabel">Lagnavn</span>
        <input required type="text" name="lagnavn" placeholder="Navn på laget" className="fieldInput" />
      </label>
      <div className={sub.formGrid200}>
        <label>
          <span className="fieldLabel">Spiller 1 — navn</span>
          <input required type="text" name="s1navn" placeholder="Fullt navn" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">Spiller 1 — e-post</span>
          <input required type="email" name="s1epost" placeholder="din@epost.no" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">Spiller 2 — navn</span>
          <input required type="text" name="s2navn" placeholder="Fullt navn" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">Spiller 2 — e-post</span>
          <input required type="email" name="s2epost" placeholder="din@epost.no" className="fieldInput" />
        </label>
      </div>
      <label>
        <span className="fieldLabel">Telefon</span>
        <input required type="tel" name="telefon" placeholder="Kontakttelefon" className="fieldInput" />
      </label>
      <button type="submit" className="formSubmit">
        Meld på laget
      </button>
      <p className={sub.formFoot}>Påmeldingen sendes til post@innegolfbergen.no.</p>
    </form>
  );
}
