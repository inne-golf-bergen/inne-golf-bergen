import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* NEXT_DIST_DIR lets a second dev server run alongside the default one
     (Next locks .next/dev per dist dir). */
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
