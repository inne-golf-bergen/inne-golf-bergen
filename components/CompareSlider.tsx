"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { type Lang, t } from "@/lib/i18n";
import styles from "./compare.module.css";

/**
 * «Så ekte er det» — draggable before/after between a drone photo of
 * Lofoten Links and the same hole in Virtual Golf 3. Pointer drag,
 * arrow-key support and a one-time intro nudge when scrolled into view.
 */
export default function CompareSlider({ lang }: { lang: Lang }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const clip = clipRef.current;
    const line = lineRef.current;
    if (!wrap || !clip || !line) return;

    let p = 47;
    let raf = 0;
    let down = false;
    let nudge: { kill: () => void } | undefined;
    const cleanup: (() => void)[] = [];

    const apply = () => {
      raf = 0;
      clip.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
      line.style.left = `${p}%`;
      line.setAttribute("aria-valuenow", String(Math.round(p)));
    };
    const set = (x: number) => {
      const r = wrap.getBoundingClientRect();
      p = Math.min(96, Math.max(4, ((x - r.left) / r.width) * 100));
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const pd = (e: PointerEvent) => {
      e.preventDefault();
      /* the user has the wheel — the intro nudge must never fight the grab */
      nudge?.kill();
      down = true;
      try {
        wrap.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      set(e.clientX);
    };
    const pm = (e: PointerEvent) => {
      if (down) set(e.clientX);
    };
    const pu = () => {
      down = false;
    };
    wrap.addEventListener("pointerdown", pd);
    wrap.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);
    cleanup.push(() => {
      wrap.removeEventListener("pointerdown", pd);
      wrap.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
    });

    const kd = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      nudge?.kill();
      p = Math.min(96, Math.max(4, p + (e.key === "ArrowLeft" ? -3 : 3)));
      apply();
    };
    line.addEventListener("keydown", kd);
    cleanup.push(() => line.removeEventListener("keydown", kd));

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!rm && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((x) => x.isIntersecting)) return;
          io.disconnect();
          import("gsap").then(({ gsap }) => {
            const o = { v: 47 };
            nudge = gsap.to(o, {
              v: 60,
              duration: 0.95,
              ease: "power2.inOut",
              yoyo: true,
              repeat: 1,
              delay: 0.25,
              onUpdate: () => {
                if (!down) {
                  p = o.v;
                  apply();
                }
              },
            });
          });
        },
        { threshold: 0.5 },
      );
      io.observe(wrap);
      cleanup.push(() => io.disconnect());
    }

    return () => {
      cleanup.forEach((fn) => fn());
      nudge?.kill();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* ≤768px: the in-image overlay is hidden, so the framing moves above
          the slider instead of disappearing */}
      <div className={styles.mobileHead}>
        <h2 className={styles.title}>{t(lang, "Så ekte er det.", "It’s this real.")}</h2>
        <p className={styles.copy}>
          {t(
            lang,
            "Dra i skillelinjen — dronefoto mot Virtual Golf 3.",
            "Drag the line — drone photo vs Virtual Golf 3.",
          )}
        </p>
      </div>
      <div ref={wrapRef} id="vg3-compare" className={styles.wrap}>
      {/* 250vw on mobile: the 440px-min portrait crop is height-constrained, so
          width-based srcset selection (100vw) would serve a ~750px file and
          upscale it ~2.5×. Over-declaring fetches the full-width original. */}
      <Image
        src="/assets/vg3-lofoten-render.webp"
        alt={t(lang, "Samme hull gjengitt i Virtual Golf 3", "The same hole in Virtual Golf 3")}
        fill
        sizes="(max-width: 768px) 250vw, 100vw"
        quality={90}
        draggable={false}
        className={styles.img}
      />
      <div ref={clipRef} id="vg3-clip" className={styles.clip}>
        <Image
          src="/assets/vg3-lofoten-foto.webp"
          alt={t(lang, "Dronefoto av Lofoten Links", "Lofoten Links from a drone")}
          fill
          sizes="(max-width: 768px) 250vw, 100vw"
          quality={90}
          draggable={false}
          className={styles.img}
        />
      </div>
      <div className={styles.overlay}>
        <div className={styles.overlayText}>
          <h2 className={styles.title}>{t(lang, "Så ekte er det.", "It’s this real.")}</h2>
          <p className={styles.copy}>
            {t(
              lang,
              "TrackMans nyeste grafikkmotor, som du spiller på i alle våre bayer.",
              "TrackMan’s latest graphics engine, on every bay in both venues.",
            )}
          </p>
        </div>
      </div>
      <div
        ref={lineRef}
        id="vg3-line"
        role="slider"
        tabIndex={0}
        aria-label={t(lang, "Sammenlign dronefoto og Virtual Golf 3", "Compare drone photo and Virtual Golf 3")}
        /* the position is clamped to 4–96 — announce the range we actually allow */
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={47}
        className={styles.line}
      >
        <span aria-hidden="true" className={styles.hairline} />
        <span aria-hidden="true" className={styles.knob}>
          ‹<span className={styles.knobDivider} />›
        </span>
      </div>
    </div>
    </>
  );
}
