"use client";

import { useEffect, useRef, type ReactNode } from "react";
import sub from "@/app/[lang]/subpage.module.css";

/**
 * Post-submit confirmation card. Focuses itself on mount and announces as a
 * status region, so the form→card swap is never silent for keyboard or
 * screen-reader users. The forms only compose a mailto: draft — copy inside
 * must say "send the email", never claim the message was received.
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
