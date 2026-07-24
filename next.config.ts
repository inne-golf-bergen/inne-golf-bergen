import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* NEXT_DIST_DIR lets a second dev server run alongside the default one
     (Next locks .next/dev per dist dir). */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    /* Route types get wired through next-env.d.ts (current dist dir only)
       instead of Next appending every dist dir's types/ glob to tsconfig
       "include" — stale .next-* siblings would break tsc/next build once
       the route tree changed. Slated to become the Next default. */
    strictRouteTypes: true,
  },
  images: {
    // Next 16 clamps <Image quality> to this list (default [75]); the tall
    // mobile crops re-encode already-lossy webp sources, so allow higher.
    qualities: [75, 85, 90],
    // AVIF first: ~20% smaller than webp at the same visual quality.
    formats: ["image/avif", "image/webp"],
    // Sources are effectively versioned (hashed static imports), so cached
    // optimizer output can live long without staleness risk.
    minimumCacheTTL: 2678400, // 31 days
  },
  async headers() {
    return [
      {
        // Hero videos + posters carry a version suffix in the filename, so
        // they can be cached forever; a new version means a new URL.
        source: "/uploads/:file(.*_v\\d+.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
