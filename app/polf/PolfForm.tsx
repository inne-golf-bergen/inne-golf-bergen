"use client";

import { useState } from "react";
import { mailBody, mailtoHref } from "@/lib/site";
import sub from "../subpage.module.css";

export default function PolfForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={sub.sentCard}>
        <span className={sub.sentKicker}>Nesten i mål</span>
        <h3 className={sub.sentTitle}>Slik fullfører du</h3>
        <p className={sub.sentBody}>
          Betal avgiften på <strong className={sub.accent}>600 kr</strong> til Vipps{" "}
          <strong className={sub.accent}>#963257</strong>. Når avgiften er betalt, er du registrert.
        </p>
        <p className={sub.sentSub}>
          Spill den obligatoriske golfrunden i turneringsmodul på ditt senter innen 4. des, så samler du sjetonger til
          pokerbordet 5. des kl. 19:00. Spørsmål? post@innegolfbergen.no.
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
            ["E-post", f.get("epost")],
            ["TrackMan-bruker", f.get("trackman")],
            ["Senter", f.get("senter")],
          ],
          "Påmelding POLF",
          "Avgift 600 kr til Vipps #963257.",
        );
        window.location.href = mailtoHref("Påmelding POLF", body);
        setSent(true);
      }}
    >
      <label>
        <span className="fieldLabel">Navn</span>
        <input required type="text" name="navn" placeholder="Fullt navn" className="fieldInput" />
      </label>
      <div className={sub.formGrid200}>
        <label>
          <span className="fieldLabel">E-post</span>
          <input required type="email" name="epost" placeholder="din@epost.no" className="fieldInput" />
        </label>
        <label>
          <span className="fieldLabel">TrackMan-brukerens e-post</span>
          <input required type="email" name="trackman" placeholder="trackman@epost.no" className="fieldInput" />
        </label>
      </div>
      <label>
        <span className="fieldLabel">Ditt senter</span>
        <select required name="senter" defaultValue="" className="fieldInput">
          <option value="" disabled>
            Velg senter
          </option>
          <option value="Åsane">Åsane</option>
          <option value="Sandviken">Sandviken</option>
          <option value="Annet senter">Annet golfsenter</option>
        </select>
      </label>
      <button type="submit" className="formSubmit">
        Meld deg på
      </button>
      <p className={sub.formFoot}>Påmeldingen sendes til post@innegolfbergen.no.</p>
    </form>
  );
}
