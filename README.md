# INNE Golf Bergen — nettside

Produksjonsimplementasjon av Claude Design-håndoffen «INNE Golf Bergen hero section»
(12 sider, norsk bokmål, «Kobber & eik»-designspråket).

## Stack

- **Next.js 16** (App Router, statisk prerendret) + **React 19** + TypeScript
- **CSS Modules** + designtokens i [app/globals.css](app/globals.css) (fargepalett, knapper, skjema, keyframes)
- **Syne + Schibsted Grotesk** selvhostet via `next/font` (ingen Google-CDN i produksjon)
- **GSAP + ScrollTrigger** for scroll-avsløringer, parallax, tall-opptelling, magnetiske knapper
  (all animasjon hopper over `prefers-reduced-motion`, innhold er synlig uten JS)

## Kjør lokalt

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # produksjonsbygg (alle sider statiske)
```

## Sider

| Rute | Innhold |
| --- | --- |
| `/` | Landing: hero med video, sentre, priser, medlemskap, TrackMan, «ekte vs. simulator»-slider, selskap, turneringer, gavekort, FAQ |
| `/medlemskap` | Priser, medlemskapstige (1 kr / 1 800 kr), partnerfordeler, FAQ |
| `/gavekort` | Verdikort med sentervelger |
| `/vip-losjen` `/bursdag` `/bedrift` | Selskapssider (skjemaer på bursdag/bedrift) |
| `/vinterturnering` `/polf` `/veien-til-golf` | Turneringer & kurs med påmeldingsskjemaer |
| `/praktisk` | Parkering, adgang, kontakt |
| `/vilkar` `/personvern` | Juridiske sider (plassholder-slots) |

Delte komponenter ligger i [components/](components/) (SiteNav med bookingark,
SiteFooter, Button fra designsystemet, GSAP-effekter, compare-slider, herovideo).
Konstanter (e-post, telefoner, booking-URL-er, JSON-LD) i [lib/site.ts](lib/site.ts).

## Bevisste plassholdere fra designet

Disse venter på innhold/avklaring fra INNE og er markert i UI-et:

- Avbestillingsregler (FAQ på landingssiden)
- Verdikortets gyldighet (`/gavekort`, `/medlemskap`)
- Oppsigelse/fornyelse (`/medlemskap`)
- Kjøpsvilkår + booking/avbestilling (`/vilkar` — limes inn ordrett)
- Hele personvernerklæringen (`/personvern` — krever juridisk gjennomgang)
- Facebook-gruppelenken på `/vinterturnering` peker på facebook.com
- Booking-URL-ene (`innegolfbergen.no/book/*`) og verdikort-kjøp antas å gå til
  eksisterende bookingløsning (Alba) — bytt i [lib/site.ts](lib/site.ts)

Skjemaene sender via `mailto:` til post@innegolfbergen.no (som i prototypen) —
bytt til et API/e-posttjeneste før lansering om ønskelig.
