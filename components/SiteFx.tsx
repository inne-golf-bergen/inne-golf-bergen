"use client";

import { useEffect } from "react";

/**
 * Shared GSAP reveals for subpages (port of site-fx.js).
 * [data-fade] — intro fade/rise; [data-st] — scroll-triggered reveal.
 * Respects prefers-reduced-motion (content is visible by default; animations
 * only set initial states when they actually run). All tweens are scoped in a
 * gsap.context so unmounting one page never touches another page's triggers.
 */
export default function SiteFx() {
  useEffect(() => {
    let killed = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (killed) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (document.querySelector("[data-fade]")) {
          gsap.fromTo(
            "[data-fade]",
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.08, delay: 0.15, clearProps: "transform" },
          );
        }
        document.querySelectorAll("[data-st]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power4.out",
              clearProps: "transform",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });
      });
    })();

    return () => {
      killed = true;
      ctx?.revert();
    };
  }, []);

  return null;
}
