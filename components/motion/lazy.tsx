"use client";

import { domAnimation, LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide LazyMotion boundary. Components render the slim <m.*> elements,
 * so framer-motion's full-featured motion.* proxy stays out of the bundle;
 * domAnimation (statically imported — feature flash on the hero intro is not
 * acceptable) carries exactly the feature set the site uses: animations,
 * variants, exit, hover/tap, inView. Drag and layout projection are unused.
 * strict throws if a full motion.* component ever sneaks back in.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
