"use client";

import type { ReactNode } from "react";
import Button from "./Button";

/** CTA that opens the «Velg senter» booking sheet in SiteNav. */
export default function OpenBookButton({
  size = "lg",
  fullWidth = false,
  magnetic = false,
  children,
}: {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  magnetic?: boolean;
  children: ReactNode;
}) {
  return (
    <Button
      size={size}
      fullWidth={fullWidth}
      magnetic={magnetic}
      onClick={() => window.dispatchEvent(new CustomEvent("inne-open-book"))}
    >
      {children}
    </Button>
  );
}
