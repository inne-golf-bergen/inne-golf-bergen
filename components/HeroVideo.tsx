"use client";

import { useEffect, useRef } from "react";

export type HeroVideoSources = {
  /** AV1 in mp4 — smallest at equal quality (Chrome/Firefox/Edge, newer Safari). */
  av1: string;
  /** VP9 webm fallback for browsers without AV1 decode. */
  vp9: string;
  /** H.264 mp4 — universal fallback, plays everywhere. */
  h264: string;
  /** Still of the first frame; the always-on backdrop the video fades over. */
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
function initHeroVideo(v: HTMLVideoElement | null) {
  if (!v || v.dataset.init) return;
  v.dataset.init = "1";
  let mobile = false;
  try {
    // React doesn't serialize the muted attribute in SSR HTML, so set it
    // before a src exists — otherwise autoplay is blocked.
    v.muted = true;
    v.defaultMuted = true;
    mobile = matchMedia("(max-width: 768px)").matches;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn && conn.saveData) return;
  } catch {
    return; // no matchMedia: keep the poster backdrop only
  }
  const sources = JSON.parse(v.dataset[mobile ? "mob" : "desk"] as string) as {
    av1: string;
    vp9: string;
    h264: string;
  };

  const start = (src: string) => {
    v.src = src;
    v.load();

    /* The user must NEVER see a frozen video frame. The poster <picture>
       behind the element is pixel-identical to frame 1, and the video is
       transparent until frames are verifiably painting (requestVideoFrame-
       Callback), so every stall state — first load still buffering, tab
       hidden, decoder suspended, autoplay refused (iOS Low Power Mode) —
       shows the clean still instead of a stuck frame or a play glyph.

       On hide we deliberately pause and cover; on return we rewind to 0 and
       play. Resuming MID-loop is what froze Safari for seconds (it must
       re-decode from the previous keyframe up to the paused position);
       frame 1 IS a keyframe, so from-the-top restarts instantly, and under
       the poster the rewind is invisible. */
    const rvfc =
      "requestVideoFrameCallback" in v
        ? (
            v as HTMLVideoElement & {
              requestVideoFrameCallback: (cb: () => void) => number;
            }
          ).requestVideoFrameCallback.bind(v)
        : null;
    let gen = 0;

    const onFrame = (cb: () => void) => {
      if (rvfc) rvfc(cb);
      else {
        const h = () => {
          v.removeEventListener("timeupdate", h);
          cb();
        };
        v.addEventListener("timeupdate", h);
      }
    };

    const fadeInOnFrame = () => {
      const g = ++gen;
      const show = (): void => {
        if (g !== gen || !v.isConnected) return;
        // A frame presented while hidden can't be trusted as "visibly
        // moving" — re-arm and reveal on the first frame the user can see.
        if (document.hidden) return onFrame(show);
        v.style.opacity = "1";
      };
      onFrame(show);
    };

    const cover = () => {
      gen++; // cancel any pending reveal
      v.style.opacity = "0";
    };

    const sleep = () => {
      cover();
      v.pause();
    };

    const wake = () => {
      if (!v.isConnected) {
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("pagehide", sleep);
        window.removeEventListener("pageshow", wake);
        window.removeEventListener("focus", wake);
        window.removeEventListener("pointerdown", wake);
        window.removeEventListener("keydown", wake);
        v.removeEventListener("pause", wake);
        return;
      }
      if (document.hidden || !v.paused) return;
      try {
        if (v.currentTime > 0.05) v.currentTime = 0;
      } catch {}
      // Synchronous play(): from pointerdown/keydown it inherits the user
      // activation iOS Low Power Mode requires.
      v.play().catch(() => {});
    };

    const onVis = () => (document.hidden ? sleep() : wake());

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", sleep);
    window.addEventListener("pageshow", wake);
    window.addEventListener("focus", wake);
    window.addEventListener("pointerdown", wake, { passive: true });
    window.addEventListener("keydown", wake, { passive: true });
    // Browser-initiated pause while visible (memory pressure, power events):
    // wake immediately. Our own sleep() pause is filtered by document.hidden.
    v.addEventListener("pause", wake);
    // Playback (re)starting is the ONLY reveal path, and starvation or a
    // decode fault drops back to the poster — never a stalled frame.
    v.addEventListener("playing", fadeInOnFrame);
    v.addEventListener("waiting", cover);
    v.addEventListener("error", cover);

    v.play().catch(() => {}); // start ASAP; the poster covers the buffering
  };

  /* Codec by decode hardware, not by "can play at all": a software-decoded
     AV1/VP9 loop saves bytes but burns a core and janks scrolling — H.264
     decodes in hardware everywhere. powerEfficient is the hardware signal. */
  const mc = navigator.mediaCapabilities;
  if (!mc || !mc.decodingInfo) {
    start(
      v.canPlayType('video/mp4; codecs="av01.0.08M.10"') === "probably"
        ? sources.av1
        : v.canPlayType('video/webm; codecs="vp9"') === "probably"
          ? sources.vp9
          : sources.h264,
    );
    return;
  }
  const frame = { width: 1920, height: 1080, framerate: 30, bitrate: 2400000 };
  Promise.all([
    mc
      .decodingInfo({ type: "file", video: { contentType: 'video/mp4; codecs="av01.0.08M.10"', ...frame } })
      .catch(() => null),
    mc
      .decodingInfo({ type: "file", video: { contentType: 'video/webm; codecs="vp09.00.41.08"', ...frame } })
      .catch(() => null),
  ])
    .then(([av1, vp9]) => {
      if (av1 && av1.supported && av1.powerEfficient) start(sources.av1);
      else if (vp9 && vp9.supported && vp9.powerEfficient) start(sources.vp9);
      else start(sources.h264);
    })
    .catch(() => start(sources.h264));
}

/**
 * Landing hero background video. A <picture> of the first frame renders
 * underneath and paints instantly (preloaded, high priority); the video is
 * transparent until frames are verifiably painting, then fades in on top —
 * pixel-identical layers, so the handoff is invisible. Any playback
 * interruption drops back to the poster, never to a frozen frame.
 * prefers-reduced-motion and data-saver users keep the still and never
 * fetch the video.
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
    initHeroVideo(ref.current);
  }, [desktop, mobile]);

  const script = `(${initHeroVideo.toString()})(document.getElementById("hero-video"))`;

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
      <picture>
        <source media={MOBILE_MQ} srcSet={mobile.poster} />
        <img className={className} src={desktop.poster} alt="" />
      </picture>
      {/* The inline script sets muted/src before hydration; those attribute
          "mismatches" are expected. */}
      <video
        ref={ref}
        id="hero-video"
        className={className}
        style={{ opacity: 0 }}
        data-desk={JSON.stringify({ av1: desktop.av1, vp9: desktop.vp9, h264: desktop.h264 })}
        data-mob={JSON.stringify({ av1: mobile.av1, vp9: mobile.vp9, h264: mobile.h264 })}
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
