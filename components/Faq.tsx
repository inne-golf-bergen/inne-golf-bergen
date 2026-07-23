"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import s from "@/app/[lang]/page.module.css";

const ICON_SPRING = { type: "spring", stiffness: 260, damping: 22 } as const;
/* iOS drawer curve — decisive open, no dead time */
const HEIGHT_EASE = [0.32, 0.72, 0, 1] as const;

/**
 * FAQ accordion. Controlled buttons instead of native <details> so the
 * answer can animate open/closed via AnimatePresence; several items can
 * be open at once, matching the old behavior.
 */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const reduce = useReducedMotion();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={s.faqList}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item.q} className={`${s.faqItem} ${i === items.length - 1 ? s.faqItemLast : ""}`}>
            <button
              type="button"
              id={`faq-q-${i}`}
              className={s.faqSummary}
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              onClick={() => toggle(i)}
            >
              <span className={s.faqQ}>{item.q}</span>
              <motion.span
                className={s.faqX}
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={reduce ? { duration: 0 } : ICON_SPRING}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    /* exit snappier than enter — the system responding, not content arriving */
                    transition: reduce
                      ? { duration: 0 }
                      : {
                          height: { duration: 0.24, ease: HEIGHT_EASE },
                          opacity: { duration: 0.14, ease: "easeOut" },
                        },
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          height: { duration: 0.32, ease: HEIGHT_EASE },
                          opacity: { duration: 0.22, ease: "easeOut" },
                        }
                  }
                  style={{ overflow: "hidden" }}
                >
                  <p className={s.faqA}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
