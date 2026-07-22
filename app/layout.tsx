import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Syne } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { LOCATIONS_JSONLD } from "@/lib/site";
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

export const metadata: Metadata = {
  title: "INNE Golf Bergen — Golf. Hele året.",
  description:
    "Innendørs golf i Bergen — TrackMan iO-simulatorer i Åsane og Sandviken. Selvbetjent og åpent hele døgnet. Book bay fra 100 kr per halvtime.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171310",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="no" className={`${syne.variable} ${schibsted.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCATIONS_JSONLD) }}
        />
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
