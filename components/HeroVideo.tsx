"use client";

import { useEffect, useRef } from "react";

/**
 * Landing hero background video. Starts muted/looping once it can play and
 * fades in. Skipped entirely for prefers-reduced-motion and data-saver users
 * (the hero then keeps its dark gradient backdrop, as in the design).
 * When `mobileSrc` is set, viewports ≤768px load that file instead.
 */
export default function HeroVideo({
  src,
  mobileSrc,
  className,
}: {
  src: string;
  mobileSrc?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (rm || conn?.saveData) return;

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const activeSrc = mobile && mobileSrc ? mobileSrc : src;

    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    const onPlaying = () => {
      v.style.opacity = "1";
    };
    const onCanPlay = () => {
      v.play().catch(() => {});
    };
    v.addEventListener("playing", onPlaying);
    v.addEventListener("canplay", onCanPlay);
    if (!v.src) {
      v.src = activeSrc;
      v.load();
    } else if (v.readyState >= 3) {
      onCanPlay();
    }
    return () => {
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("canplay", onCanPlay);
    };
  }, [src, mobileSrc]);

  return <video ref={ref} id="hero-video" preload="none" className={className} />;
}
