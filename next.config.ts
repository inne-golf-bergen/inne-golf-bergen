import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* NEXT_DIST_DIR lets a second dev server run alongside the default one
     (Next locks .next/dev per dist dir). */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Next 16 clamps <Image quality> to this list (default [75]); the tall
    // mobile crops re-encode already-lossy webp sources, so allow higher.
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
