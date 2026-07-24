"use client";

/**
 * Executable inline script without React's dev warnings, per the Next guide
 * "preventing-flash-before-hydration": the server render emits an executable
 * script (runs during HTML parsing, before paint), the client render emits
 * text/plain so hydration never sees an executable <script>, and
 * suppressHydrationWarning swallows the deliberate type diff.
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
