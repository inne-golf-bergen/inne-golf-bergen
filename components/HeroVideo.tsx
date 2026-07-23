"use client";

import { useEffect, useRef } from "react";

export type HeroVideoSources = {
  /** AV1 in mp4 — smallest at equal quality (Chrome/Firefox/Edge, newer Safari). */
  av1: string;
  /** VP9 webm fallback for browsers without AV1 decode. */
  vp9: string;
  /** H.264 mp4 — universal fallback, plays everywhere. */
  h264: string;
  /** Still of the first frame; paints immediately while the video buffers. */
  poster: string;
};

const MOBILE_MQ = "(max-width: 768px)";

/**
 * Runs twice by design, guarded by `data-init`:
 * 1. Serialized with toString() into the inline <script> below, so it executes
 *    at HTML-parse time — the video fetch starts before hydration.
 * 2. From the effect, as the real init after client-side navigations (inline
 *    scripts don't re-execute there) and as a no-op backstop otherwise.
 * Must stay fully self-contained: no references to module scope.
 */
function initHeroVideo(
  v: HTMLVideoElement | null,
  desk: HeroVideoSources,
  mob: HeroVideoSources,
) {
  if (!v || v.dataset.init) return;
  v.dataset.init = "1";
  let mobile = false;
  try {
    // React doesn't serialize the muted attribute in SSR HTML, so set it
    // before a src exists — otherwise autoplay is blocked.
    v.muted = true;
    v.defaultMuted = true;
    mobile = matchMedia("(max-width: 768px)").matches;
    v.poster = (mobile ? mob : desk).poster;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn && conn.saveData) return;
  } catch {
    return; // no matchMedia: keep the gradient backdrop only
  }
  const s = mobile ? mob : desk;
  const src = v.canPlayType('video/mp4; codecs="av01.0.08M.10"')
    ? s.av1
    : v.canPlayType('video/webm; codecs="vp9"')
      ? s.vp9
      : s.h264;
  v.src = src;
  v.load();
  v.addEventListener(
    "canplay",
    () => {
      v.play().catch(() => {});
    },
    { once: true },
  );
}

/**
 * Landing hero background video. The poster (preloaded, high priority) makes
 * the hero paint instantly; playback fades in on top once buffered — the
 * poster is frame 1, so the transition is seamless. prefers-reduced-motion
 * and data-saver users keep the still poster and never fetch the video.
 */
export default function HeroVideo({
  desktop,
  mobile,
  className,
}: {
  desktop: HeroVideoSources;
  mobile: HeroVideoSources;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initHeroVideo(ref.current, desktop, mobile);
  }, [desktop, mobile]);

  const script = `(${initHeroVideo.toString()})(document.getElementById("hero-video"),${JSON.stringify(
    desktop,
  )},${JSON.stringify(mobile)})`;

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={mobile.poster}
        media={MOBILE_MQ}
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={desktop.poster}
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      {/* The inline script sets muted/poster/src before hydration; those
          attribute "mismatches" are expected. */}
      <video
        ref={ref}
        id="hero-video"
        className={className}
        preload="auto"
        autoPlay
        loop
        playsInline
        suppressHydrationWarning
      />
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
