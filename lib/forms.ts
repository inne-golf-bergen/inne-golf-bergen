"use client";

import { useState } from "react";
import { mailBody, mailtoHref } from "./site";

/** Machine names for the site's forms (used in the keyless-dev log). */
export type FormName = "bedrift" | "bursdag" | "vtg" | "polf" | "vinter" | "nyhetsbrev";

export type FormRows = [string, FormDataEntryValue | null][];

export type SendStatus = "idle" | "sending" | "sent" | "error";

/**
 * Web3Forms delivers each submission as an email to the address its access
 * key was issued for (post@innegolfbergen.no) — see README «Skjema-backend».
 * Their free plan is browser-side by design and the key is public on purpose:
 * it is only an alias for the recipient address, never a secret.
 */
const ENDPOINT = "https://api.web3forms.com/submit";
const KEY = process.env.NEXT_PUBLIC_FORMS_KEY ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function postForm(payload: { subject: string; message: string; replyto?: string }): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      // from_name labels the sender in the inbox; replyto makes «Svar» go
      // straight to the visitor.
      body: JSON.stringify({ access_key: KEY, from_name: "innegolfbergen.no", ...payload }),
      signal: AbortSignal.timeout(15_000),
    });
    const json: unknown = await res.json().catch(() => null);
    return res.ok && typeof json === "object" && json !== null && (json as { success?: unknown }).success === true;
  } catch {
    return false;
  }
}

/**
 * Submit flow shared by every form on the site: compose the same labeled rows
 * the mailto: prototype used, POST them to the form backend, and on failure
 * expose a prefilled mailto: draft (rendered by <SendFailed>) with everything
 * the visitor typed — the form stays on screen, so nothing is lost silently.
 */
export function useSendForm(form: FormName, subject: string) {
  const [status, setStatus] = useState<SendStatus>("idle");
  const [fallbackHref, setFallbackHref] = useState("");

  async function send(
    f: FormData,
    rows: FormRows,
    opts?: { replyto?: FormDataEntryValue | null; intro?: string; outro?: string },
  ): Promise<void> {
    if (status === "sending") return;

    // Honeypot filled in (see <BotField>): show the bot a success and never
    // spend quota on it.
    if (String(f.get("botcheck") ?? "") !== "") {
      setStatus("sent");
      return;
    }

    const message = mailBody(rows, opts?.intro, opts?.outro);

    // Keyless local dev: log instead of posting, so the flow can be exercised.
    if (!KEY && process.env.NODE_ENV === "development") {
      console.log(`[forms] dry run — ${form}: ${subject}\n${message}`);
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const replyto =
      typeof opts?.replyto === "string" && EMAIL_RE.test(opts.replyto.trim()) ? opts.replyto.trim() : undefined;
    const ok = await postForm({ subject, message, ...(replyto ? { replyto } : {}) });
    if (ok) {
      setStatus("sent");
    } else {
      setFallbackHref(mailtoHref(subject, message));
      setStatus("error");
    }
  }

  return { status, fallbackHref, send };
}
