import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Syne } from "next/font/google";
import { CursorGlow } from "@/components/motion/fx";
import MotionProvider from "@/components/motion/lazy";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { asLang, LANGS, langAlternates, t } from "@/lib/i18n";
import { locationsJsonld } from "@/lib/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

/* Only /no and /en exist. Without this, any single-segment URL that dodges
   the rewrites (e.g. /wp-login.php) would render on demand with that path as
   [lang] — a soft-200 duplicate of the homepage, one function invocation per
   bot probe. With it, unknown params 404 via the static fallback instead. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    metadataBase: new URL("https://innegolfbergen.no"),
    title: t(lang, "INNE Golf Bergen — Golf. Hele året.", "INNE Golf Bergen — Golf. All year."),
    description: t(
      lang,
      "Innendørs golf i Bergen — TrackMan iO-simulatorer i Åsane og Sandviken. Selvbetjent og åpent hele døgnet. Book bay fra 100 kr per halvtime.",
      "Indoor golf in Bergen — TrackMan iO simulators in Åsane and Sandviken. Self-serve, open 24/7. Book a bay from 100 kr per 30 min.",
    ),
    alternates: langAlternates("/"),
    /* shares into Slack/iMessage/Facebook get the strongest asset: the venue */
    openGraph: {
      siteName: "INNE Golf Bergen",
      type: "website",
      locale: lang === "no" ? "nb_NO" : "en_US",
      images: [{ url: "/assets/photos/bays-wide.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171310",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const lang = asLang((await params).lang);
  return (
    <html lang={lang} className={`${syne.variable} ${schibsted.variable}`}>
      <body>
        {/* header glass must react to scroll before hydration too (anchor
            landings, restored scroll) — a class beats a React-only state */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var f=function(){document.body.classList.toggle('inne-scrolled',window.scrollY>24)};addEventListener('scroll',f,{passive:true});f()})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsJsonld(lang)) }}
        />
        <MotionProvider>
          <SiteNav lang={lang} />
          {children}
          <SiteFooter lang={lang} />
          {/* site-wide ambience — the kobber & eik "room tone". Both self-disable
              for reduced motion; the glow additionally needs a fine pointer. */}
          <CursorGlow />
        </MotionProvider>
        <div id="inne-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
