"use client";

import type { ReactNode } from "react";
import Button from "./Button";

/** CTA that opens the «Velg senter» booking sheet in SiteNav. */
export default function OpenBookButton({
  size = "lg",
  fullWidth = false,
  children,
}: {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
}) {
  return (
    <Button
      size={size}
      fullWidth={fullWidth}
      onClick={() => window.dispatchEvent(new CustomEvent("inne-open-book"))}
    >
      {children}
    </Button>
  );
}
