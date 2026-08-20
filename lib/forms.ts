"use client";

import { useState } from "react";
import { mailBody, mailtoHref } from "./site";

/** Machine names for the site's forms — sent along so a failure can be
    traced to the form it came from in the server log. */
export type FormName = "bedrift" | "bursdag" | "vtg" | "polf" | "vinter" | "nyhetsbrev";

export type FormRows = [string, FormDataEntryValue | null][];

export type SendStatus = "idle" | "sending" | "sent" | "error";

/**
 * Submissions go to our own /api/skjema route, which sends them on via Resend
 * to the address in content/kontakt.json. The Resend key is a real secret and
 * lives only on the server — nothing about the mail backend is exposed here.
 */
const ENDPOINT = "/api/skjema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function postForm(payload: {
  form: FormName;
  subject: string;
  message: string;
  replyto?: string;
}): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      // replyto makes «Svar» in the inbox go straight to the visitor.
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    const json: unknown = await res.json().catch(() => null);
    return res.ok && typeof json === "object" && json !== null && (json as { ok?: unknown }).ok === true;
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

    setStatus("sending");
    const replyto =
      typeof opts?.replyto === "string" && EMAIL_RE.test(opts.replyto.trim()) ? opts.replyto.trim() : undefined;
    const ok = await postForm({ form, subject, message, ...(replyto ? { replyto } : {}) });
    if (ok) {
      setStatus("sent");
    } else {
      setFallbackHref(mailtoHref(subject, message));
      setStatus("error");
    }
  }

  return { status, fallbackHref, send };
}
