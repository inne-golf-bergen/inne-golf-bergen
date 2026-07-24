"use client";

import { animate, m, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CountUp } from "./fx";
import { EASE_OUT } from "./tokens";

/**
 * The «Betal 1 800. / Få 2 800.» statement with the site’s one aesthetic
 * risk: a copper shot tracer — TrackMan’s own product mark rendered in
 * kobber — arcing from the paid numeral to the received one as the
 * count-up settles. Measured from the live spans so it survives both
 * languages and every viewport; skipped where the stacked layout leaves
 * no arc room; a static faint path under prefers-reduced-motion.
 */
export default function MedlemTall({
  pay,
  get,
  lineClass,
  accentClass,
}: {
  pay: string;
  get: string;
  lineClass?: string;
  accentClass?: string;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const paidRef = useRef<HTMLSpanElement>(null);
  const gotRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [d, setD] = useState("");
  const totalRef = useRef(0);
  const reduce = useReducedMotion();
  const inView = useInView(wrapRef, { once: true, margin: "0px 0px -18% 0px" });
  const progress = useMotionValue(0);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const a = paidRef.current;
      const b = gotRef.current;
      if (!a || !b) return;
      const w = wrap.getBoundingClientRect();
      if (w.width < 560) {
        setD("");
        return;
      }
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      /* launch off the top-right of "1 800", land on top-center of "2 800" */
      const sx = ra.right - w.left + 10;
      const sy = ra.top - w.top + ra.height * 0.3;
      const ex = rb.left - w.left + rb.width * 0.5;
      const ey = rb.top - w.top - 8;
      const cx = sx + (ex - sx) * 0.55;
      const cy = Math.min(sy, ey) - Math.max(40, (ex - sx) * 0.35);
      setD(`M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  /* the 4px ball leads the stroke tip along the same curve */
  useEffect(() => {
    if (reduce || !inView || !d) return;
    const controls = animate(progress, 1, { duration: 1.1, ease: EASE_OUT, delay: 0.75 });
    /* measure geometry during the idle delay, not on the first animated frame */
    if (pathRef.current) totalRef.current = pathRef.current.getTotalLength();
    const unsub = progress.on("change", (p) => {
      const path = pathRef.current;
      const dot = dotRef.current;
      if (!path || !dot) return;
      if (!totalRef.current) totalRef.current = path.getTotalLength();
      const pt = path.getPointAtLength(totalRef.current * p);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, reduce, d, progress]);

  return (
    <span ref={wrapRef} style={{ position: "relative", display: "block" }}>
      <span className={lineClass}>
        {pay}{" "}
        <span ref={paidRef}>
          <CountUp value={1800} />
        </span>
        .
      </span>
      <span className={lineClass}>
        {get}{" "}
        <span ref={gotRef}>
          <CountUp value={2800} className={accentClass} />
        </span>
        .
      </span>
      {d && (
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
            /* own compositor layer: the stroke draw repaints the svg alone,
               not the giant headline behind it */
            transform: "translateZ(0)",
          }}
        >
          {reduce ? (
            <path d={d} fill="none" stroke="var(--orange-400)" strokeWidth={2} strokeLinecap="round" opacity={0.4} />
          ) : (
            <>
              <m.path
                ref={pathRef}
                d={d}
                fill="none"
                stroke="var(--orange-400)"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={inView ? { pathLength: 1, opacity: 0.55 } : undefined}
                transition={{
                  pathLength: { duration: 1.1, ease: EASE_OUT, delay: 0.75 },
                  /* once drawn, the tracer settles into ambience */
                  opacity: { delay: 2.1, duration: 0.6, ease: "easeOut" },
                }}
              />
              <m.circle
                ref={dotRef}
                r={4}
                fill="var(--orange-300)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 1, 1, 0] } : undefined}
                transition={{ duration: 1.35, delay: 0.75, times: [0, 0.08, 0.85, 1] }}
              />
            </>
          )}
        </svg>
      )}
    </span>
  );
}
