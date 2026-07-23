import { notFound } from "next/navigation";

/**
 * Catch-all: any URL that matches no real page under [lang] throws into
 * app/[lang]/not-found.tsx — without this, unmatched paths fall through to
 * Next's unbranded built-in 404 (the root layout lives inside the dynamic
 * [lang] segment, so a root not-found.js can never render inside it).
 */
export default function CatchAll(): never {
  notFound();
}
