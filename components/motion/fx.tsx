"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE_OUT, LINE_SPRING, REVEAL_SPRING } from "./tokens";

/**
 * Landing-page motion primitives (Framer Motion port of LandingFx).
 * Spring/easing values live in ./tokens. Every component degrades to
 * static markup under prefers-reduced-motion.
 */
/* fires when the element’s top clears the bottom 12% of the viewport (≈ GSAP "top 88%") */
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/* ---------- scroll / mount reveals ---------- */

export function FadeUp({
  children,
  className,
  delay = 0,
  y = 28,
  mode = "inview",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  mode?: "inview" | "mount";
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const visible = { opacity: 1, y: 0, transition: { ...REVEAL_SPRING, delay } };
  if (mode === "mount") {
    return (
      <motion.div className={className} initial={{ opacity: 0, y }} animate={visible}>
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={visible} viewport={VIEWPORT}>
      {children}
    </motion.div>
  );
}

/** Layout wrapper for a staggered grid; items self-trigger via CascadeItem. */
export function Cascade({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

/**
 * Grid-cell reveal. Each item triggers on its own viewport entry with an
 * index-based delay: side-by-side items (desktop) enter together and read
 * as a stagger; stacked items (mobile) each reveal as they scroll in.
 */
export function CascadeItem({
  children,
  className,
  id,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  index?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { ...REVEAL_SPRING, delay: index * 0.08 } }}
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/* ---------- hero entrance sequence ---------- */

export function HeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { delayChildren: 0.15, staggerChildren: 0.11 } } }}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 26 },
        visible: { opacity: 1, y: 0, transition: REVEAL_SPRING },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Masked headline line — rises out of its overflow-hidden parent. */
export function HeroLine({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span
      className={className}
      variants={{
        hidden: { y: "118%" },
        visible: { y: "0%", transition: LINE_SPRING },
      }}
    >
      {children}
    </motion.span>
  );
}

/* ---------- scroll-linked parallax ---------- */

export function ParallaxY({
  children,
  className,
  from = 5,
  to = -5,
  scale = 1.12,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${from}%`, `${to}%`]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y, scale, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

/* ---------- membership count-up ---------- */

const fmtNum = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -18% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduce || !el) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = fmtNum(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  /* SSR renders the final value — no-JS and crawlers never see the animation */
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {fmtNum(value)}
    </span>
  );
}

/* ---------- pointer-driven ---------- */

/** Magnetic CTA wrapper — springs toward the cursor, springs home on leave. */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const fine = useRef(false);
  /* rect cached on enter: reading it per-move would measure the already-
     translated element and feed the offset back into itself */
  const rect = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 20, mass: 0.5 });

  useEffect(() => {
    fine.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rect.current = e.currentTarget.getBoundingClientRect();
  };
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !fine.current) return;
    const r = rect.current ?? e.currentTarget.getBoundingClientRect();
    /* clamp so wide fullWidth CTAs shift subtly instead of chasing the cursor */
    x.set(Math.max(-14, Math.min(14, (e.clientX - r.left - r.width / 2) * strength)));
    y.set(Math.max(-10, Math.min(10, (e.clientY - r.top - r.height / 2) * strength * 1.2)));
  };
  const onLeave = () => {
    rect.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/** Ambient cursor glow — spring-smoothed, fine pointers only. */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const seenRef = useRef(false);
  const [seen, setSeen] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 100, damping: 26, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 100, damping: 26, mass: 0.7 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const mm = (e: MouseEvent) => {
      if (!seenRef.current) {
        seenRef.current = true;
        setSeen(true);
      }
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", mm, { passive: true });
    return () => window.removeEventListener("mousemove", mm);
  }, [reduce, x, y]);

  if (reduce) return null;
  return (
    <motion.div
      id="inne-glow"
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      animate={{ opacity: seen ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    />
  );
}
