import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Syne } from "next/font/google";
import { CursorGlow } from "@/components/motion/fx";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsJsonld(lang)) }}
        />
        <SiteNav lang={lang} />
        {children}
        <SiteFooter lang={lang} />
        {/* site-wide ambience — the kobber & eik "room tone". Both self-disable
            for reduced motion; the glow additionally needs a fine pointer. */}
        <CursorGlow />
        <div id="inne-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
