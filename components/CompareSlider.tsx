"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./compare.module.css";

/**
 * «Så ekte er det» — draggable before/after between a drone photo of
 * Lofoten Links and the same hole in Virtual Golf 3. Pointer drag,
 * arrow-key support and a one-time intro nudge when scrolled into view.
 */
export default function CompareSlider() {
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
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
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
            gsap.to(o, {
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
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} id="vg3-compare" data-st="true" className={styles.wrap}>
      <Image
        src="/assets/vg3-lofoten-render.webp"
        alt="Samme hull gjengitt i Virtual Golf 3"
        fill
        sizes="100vw"
        draggable={false}
        className={styles.img}
      />
      <div ref={clipRef} id="vg3-clip" className={styles.clip}>
        <Image
          src="/assets/vg3-lofoten-foto.webp"
          alt="Dronefoto av Lofoten Links"
          fill
          sizes="100vw"
          draggable={false}
          className={styles.img}
        />
      </div>
      <div className={styles.overlay}>
        <div data-st="true" className={styles.overlayText}>
          <h2 className={styles.title}>Så ekte er det.</h2>
          <p className={styles.copy}>
            Til venstre: ekte Lofoten Links. Til høyre: samme hull i Virtual Golf 3 — TrackMans nyeste grafikkmotor,
            som du spiller på i alle våre bayer.
          </p>
        </div>
      </div>
      <span className={`${styles.cornerLabel} ${styles.cornerLeft}`}>Dronefoto</span>
      <span className={`${styles.cornerLabel} ${styles.cornerRight}`}>Virtual Golf 3</span>
      <div
        ref={lineRef}
        id="vg3-line"
        role="slider"
        tabIndex={0}
        aria-label="Sammenlign dronefoto og Virtual Golf 3"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={47}
        className={styles.line}
      >
        <span aria-hidden="true" className={styles.hairline} />
        <span aria-hidden="true" className={styles.knob}>
          ‹<span className={styles.knobDivider} />›
        </span>
      </div>
    </div>
  );
}
