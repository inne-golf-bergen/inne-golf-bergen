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
  poweredByHeader: false,
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
  /**
   * Language routing, fully declarative (see
   * node_modules/next/dist/docs/01-app/02-guides/internationalization.md and
   * 03-api-reference/05-config/01-next-config-js/rewrites.md): every page
   * lives under app/[lang]/. Norwegian keeps its historic unprefixed URLs,
   * English is served publicly under /en/*. Expressed as config routes (not
   * proxy.ts) so the CDN's router handles every request — no function runs,
   * which keeps TTFB flat under traffic spikes and compute cost at zero.
   */
  async redirects() {
    return [
      // Direct hits on /no/* go to the canonical unprefixed URL, so each page
      // has exactly one address per language. permanent → 308, like proxy.ts had.
      { source: "/no", destination: "/", permanent: true },
      { source: "/no/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // The admin (Sveltia CMS) lives as static files in public/admin/.
        // Next serves public/ files by exact path only, so bare /admin would
        // fall through to the afterFiles rewrite (→ /no/admin → 404).
        // beforeFiles runs ahead of the filesystem phase; the rewritten path
        // then serves public/admin/index.html from it. Still zero functions.
        { source: "/admin", destination: "/admin/index.html" },
      ],
      // After real files/pages miss: unprefixed URLs are Norwegian. The regex
      // keeps /en/* (and any stray /no/*) out so English URLs stay in their
      // own tree — segment-exact, so /english-course still rewrites.
      afterFiles: [
        {
          source: "/:path((?!en(?:/|$))(?!no(?:/|$)).*)",
          destination: "/no/:path",
        },
      ],
      // Nothing matched at all → serve the prerendered branded 404
      // (app/[lang]/404 builds /no/404 and /en/404 as static 404-status
      // documents). Bot probes and junk URLs never invoke a function.
      fallback: [
        { source: "/en/:path*", destination: "/en/404" },
        { source: "/:path*", destination: "/no/404" },
      ],
    };
  },
  async headers() {
    return [
      {
        // Belt and braces on top of the meta robots tag in the admin shell
        // and the robots.txt disallow — the CMS never belongs in an index.
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        // Hero videos + posters carry a version suffix in the filename, so
        // they can be cached forever; a new version means a new URL.
        source: "/uploads/:file(.*_v\\d+.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // OG share cards are versioned the same way (see scripts/og-cards).
        source: "/assets/og/:file(.*_v\\d+.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
