"use client";

import { useEffect } from "react";

const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/**
 * Landing-page effects (port of the landing component's initFx):
 * hero line reveals, fades, scroll reveals, sim-photo parallax,
 * membership count-up, magnetic buttons and the cursor glow.
 * Everything is scoped in a gsap.context and reverted on unmount.
 */
export default function LandingFx() {
  useEffect(() => {
    let killed = false;
    let ctx: { revert: () => void } | undefined;
    const cleanup: (() => void)[] = [];

    (async () => {
      const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (rm) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (killed) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from("[data-reveal]", {
          yPercent: 118,
          duration: 1.05,
          ease: "expo.out",
          stagger: 0.13,
          delay: 0.18,
          clearProps: "transform",
        });
        gsap.fromTo(
          "[data-fade]",
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power4.out", stagger: 0.09, delay: 0.6, clearProps: "transform" },
        );

        document.querySelectorAll("[data-st]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power4.out",
              clearProps: "transform",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        const pImg = document.getElementById("sim-photo");
        if (pImg) {
          gsap.fromTo(
            pImg,
            { yPercent: 5, scale: 1.12 },
            {
              yPercent: -5,
              scale: 1.12,
              ease: "none",
              scrollTrigger: { trigger: "#simulatorene", start: "top bottom", end: "bottom top", scrub: 0.6 },
            },
          );
        }

        document.querySelectorAll<HTMLElement>("#medlem-tall [data-count]").forEach((el) => {
          const target = parseInt(el.getAttribute("data-count") ?? "0", 10);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = fmt(obj.v);
            },
            onComplete: () => {
              el.textContent = fmt(target);
            },
            scrollTrigger: { trigger: "#medlem-tall", start: "top 82%", once: true },
          });
        });
      });

      if (fine) {
        // magnetic CTAs
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.45, ease: "power4.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.45, ease: "power4.out" });
          const move = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.3);
            yTo((e.clientY - r.top - r.height / 2) * 0.36);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          btn.addEventListener("mousemove", move);
          btn.addEventListener("mouseleave", leave);
          cleanup.push(() => {
            btn.removeEventListener("mousemove", move);
            btn.removeEventListener("mouseleave", leave);
            gsap.set(btn, { clearProps: "x,y" });
          });
        });

        // cursor glow
        const glow = document.getElementById("inne-glow");
        if (glow) {
          const gx = gsap.quickTo(glow, "x", { duration: 0.7, ease: "power3.out" });
          const gy = gsap.quickTo(glow, "y", { duration: 0.7, ease: "power3.out" });
          const mm = (e: MouseEvent) => {
            if (glow.style.opacity !== "1") glow.style.opacity = "1";
            gx(e.clientX);
            gy(e.clientY);
          };
          window.addEventListener("mousemove", mm, { passive: true });
          cleanup.push(() => window.removeEventListener("mousemove", mm));
        }
      }
    })();

    return () => {
      killed = true;
      cleanup.forEach((fn) => fn());
      ctx?.revert();
    };
  }, []);

  return null;
}
