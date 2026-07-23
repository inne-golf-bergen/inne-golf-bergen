"use client";

import { useEffect, useRef, type ReactNode } from "react";
import sub from "@/app/[lang]/subpage.module.css";

/**
 * Post-submit confirmation card. Focuses itself on mount and announces as a
 * status region, so the form→card swap is never silent for keyboard or
 * screen-reader users. Shown only after lib/forms.ts got an ok from the form
 * backend, so copy may claim receipt — but where a second step remains
 * (Vipps payment), it must keep saying "how to finish".
 */
export default function SentCard({
  kicker,
  title,
  className = "",
  children,
}: {
  kicker: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className={`${sub.sentCard} ${className}`}>
      <span className={sub.sentKicker}>{kicker}</span>
      <h3 className={sub.sentTitle}>{title}</h3>
      {children}
    </div>
  );
}
