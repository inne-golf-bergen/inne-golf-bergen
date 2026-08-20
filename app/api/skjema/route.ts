import { SITE } from "@/lib/site";

/**
 * Form delivery endpoint. Every form on the site POSTs here; this handler
 * sends the submission to the address in content/kontakt.json via Resend.
 *
 * Why a server route at all: Resend authenticates with a secret API key, which
 * can never reach the browser. This is the site's ONLY serverless function —
 * every page is still prerendered and served from the CDN (see next.config.ts).
 * It runs on form submissions only, so the zero-compute property still holds
 * for ordinary traffic.
 */

/** Where submissions land — owner-editable in /admin. */
const TO = SITE.email;

/**
 * Verified sender. Resend refuses any `from` outside a domain verified in the
 * account, so this must stay in sync with the domain added there.
 */
const FROM = process.env.RESEND_FROM ?? `INNE Golf Bergen <skjema@innegolfbergen.no>`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Hosts allowed to post here — blocks the endpoint being used as a relay. */
const ALLOWED_HOSTS = [
  /^inne-golf-bergen\.vercel\.app$/,
  /^inne-golf-bergen-.+\.vercel\.app$/,
  /^(www\.)?innegolfbergen\.no$/,
  /^localhost(:\d+)?$/,
];

const bad = (status: number, error: string) =>
  Response.json({ ok: false, error }, { status });

export async function POST(request: Request): Promise<Response> {
  // Same-origin only. A browser always sends Origin on a cross-origin POST;
  // curl and bots that omit it are refused rather than trusted.
  const origin = request.headers.get("origin");
  if (!origin) return bad(403, "forbidden");
  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    return bad(403, "forbidden");
  }
  if (!ALLOWED_HOSTS.some((re) => re.test(host))) return bad(403, "forbidden");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad(400, "invalid json");
  }
  if (typeof body !== "object" || body === null) return bad(400, "invalid body");

  const { form, subject, message, replyto, botcheck } = body as Record<string, unknown>;
  const label = typeof form === "string" && /^[a-z]{1,20}$/.test(form) ? form : "ukjent";

  // Honeypot (see <BotField>): answer 200 so the bot believes it succeeded,
  // but send nothing.
  if (typeof botcheck === "string" && botcheck !== "") {
    return Response.json({ ok: true });
  }

  if (typeof subject !== "string" || !subject.trim() || subject.length > 200) {
    return bad(400, "invalid subject");
  }
  if (typeof message !== "string" || !message.trim() || message.length > 10_000) {
    return bad(400, "invalid message");
  }

  const replyTo =
    typeof replyto === "string" && EMAIL_RE.test(replyto.trim()) ? replyto.trim() : undefined;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Missing config must not look like success: the client falls back to a
    // prefilled mailto: draft, so the visitor's text is never lost.
    console.error(`[skjema:${label}] RESEND_API_KEY is not set — cannot send`);
    return bad(503, "not configured");
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject,
        text: message,
        ...(replyTo ? { reply_to: [replyTo] } : {}),
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      // Log the reason server-side; never echo it to the browser.
      console.error(`[skjema:${label}] resend rejected`, res.status, await res.text().catch(() => ""));
      return bad(502, "send failed");
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error(`[skjema:${label}] resend request failed`, err);
    return bad(502, "send failed");
  }
}
