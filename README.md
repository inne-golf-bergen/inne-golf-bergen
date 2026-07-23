# INNE Golf Bergen — nettside

Produksjonsimplementasjon av Claude Design-håndoffen «INNE Golf Bergen hero section»
(12 sider, norsk bokmål, «Kobber & eik»-designspråket).

**Live:** <https://inne-golf-bergen.vercel.app> — auto-deploy fra `main` via Vercel.
(Domenet innegolfbergen.no peker fortsatt på den gamle løsningen hos en annen
leverandør; flyttes til Vercel som et eget steg senere.)

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

## Skjema-backend

Alle seks skjemaene (bedrift, bursdag, veien-til-golf, POLF, vinterturnering og
nyhetsbrevet i footeren) sender via [Web3Forms](https://web3forms.com) — gratis
inntil 250 innsendinger/mnd — og leveres som e-post til adressen
tilgangsnøkkelen er utstedt for. Delt flyt i [lib/forms.ts](lib/forms.ts):

- **Nøkkel:** `NEXT_PUBLIC_FORMS_KEY` i `.env.local` (lokalt) og i Vercel →
  Settings → Environment Variables. Nøkkelen er offentlig med vilje — den er
  bare et alias for mottakeradressen, aldri en hemmelighet. Ny nøkkel (eller
  ny mottaker): web3forms.com → «Create Access Key» → nøkkelen sendes til
  mottaker-innboksen.
- **Spam:** honeypot-felt ([components/BotField.tsx](components/BotField.tsx));
  treff vises et falskt suksesskort og bruker aldri kvote.
- **Feil:** ved nedetid/blokkering viser skjemaet en feilmelding
  ([components/SendFailed.tsx](components/SendFailed.tsx)) med et ferdig
  utfylt `mailto:`-utkast som reserve — svarene i skjemaet beholdes, og ingen
  henvendelse går tapt stille.
- **Dev uten nøkkel:** vellykket sending simuleres og innholdet logges i
  nettleserkonsollen.
