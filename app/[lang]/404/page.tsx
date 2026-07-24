import { notFound } from "next/navigation";

/**
 * Prerendered branded 404, one per language (/no/404 and /en/404).
 *
 * notFound() at build time renders app/[lang]/not-found.tsx inside the full
 * [lang] layout and stamps the prerender with HTTP status 404. The fallback
 * rewrites in next.config.ts point every URL that matches nothing at these
 * two documents, so junk and bot traffic is answered straight from the CDN —
 * the branded 404 never costs a function invocation.
 *
 * (A [...rest] catch-all can't do this: even with dynamicParams=false it
 * claims every path at the dynamic-route phase and serves Next's unbranded
 * default 404, and fallback rewrites never run.)
 */
export default function NotFoundPage(): never {
  notFound();
}
