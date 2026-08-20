# Innhold og admin — slik henger det sammen

Alt i denne mappen kan redigeres i **adminpanelet på [innegolfbergen.no/admin](https://innegolfbergen.no/admin)**
(lenken «Admin» ligger også nederst på nettsiden).

**Ingenting du lagrer går rett ut på nettsiden.** Alt havner først på en
*forhåndsvisning* — en komplett kopi av nettsiden med endringene dine. Der ser
du nøyaktig hvordan det blir. Når du er fornøyd, publiserer du.

## Slik jobber du

1. **Endre** det du vil i panelet og trykk *Save*.
2. **Se på det**: åpne forhåndsvisnings-lenken (spør utvikleren om URL-en
   første gang — legg den som bokmerke). Vent ca. 2 minutter etter lagring, og
   last siden på nytt.
3. **Publiser**: gå til **Publisering** øverst i panelet, skru på
   *«Publiser endringene nå»* og trykk *Save*. Etter ca. 2 minutter er det
   live på innegolfbergen.no. Bryteren slår seg av igjen automatisk, og
   «Sist publisert» viser tidspunktet.

Du kan gjøre mange endringer og publisere alt samlet — du trenger ikke
publisere etter hver eneste lagring.

## For redaktøren (eieren)

| I panelet | Endrer | Vises |
|---|---|---|
| **Publisering** | sender forhåndsvisningen live (`publisering.json`) | hele nettsiden |
| **Aktuelt** | nyhetssaker (`content/aktuelt/`) | /aktuelt + forsiden av Google |
| **Turneringer (egne sider)** | nye turneringssider (`content/turneringer/`) | /turneringer |
| **Priser og innstillinger → Priser** | alle priser på hele siden (`priser.json`) | medlemskap, forside, verdikort, bursdag, Veien til Golf |
| **Priser og innstillinger → Kontakt og lenker** | e-post, telefoner, bookinglenker (`kontakt.json`) | bunntekst, praktisk-siden, alle BOOK-knapper |
| **Priser og innstillinger → Vinterturneringen** | sesongstatus, datoer, avgift, premier (`turnering-vinter.json`) | /vinterturnering (+ forsiden) |
| **Priser og innstillinger → POLF** | rundestatus, datoer, avgifter, pott (`turnering-polf.json`) | /polf (+ forsiden) |

Verdt å vite:

- **Kladd**: en sak med «Kladd» på vises ikke på nettsiden i det hele tatt —
  heller ikke på forhåndsvisningen.
- **Forhåndsvisningen er ikke hemmelig, men den er usynlig for Google** (den
  havner aldri i søkeresultater). Del gjerne lenken internt.
- **Engelsk er valgfritt**: skriver du bare norsk, viser den engelske siden
  norsk tekst med en liten merknad. Engelsk kan legges til senere per sak.
- **Status styrer påmelding**: På Vinterturneringen og POLF bytter «Status»
  hele påmeldingsdelen — «Påmelding åpen» viser skjemaet, «Ferdigspilt» viser
  arkivteksten. Ingen andre felt må endres for å åpne/stenge påmelding.
- **Bilder**: last opp via panelet (de havner i `public/media/`). Bruk gjerne
  liggende bilder (16:9). Last opp en **ny fil** i stedet for å overskrive en
  gammel med samme navn — ellers kan et gammelt bilde henge igjen i opptil en
  måned hos noen besøkende.
- **Tall skrives uten mellomrom** (1800, ikke 1 800) — nettsiden formaterer
  selv med riktig tusenskille.
- Ser du ikke endringen etter et par minutter: last siden på nytt med
  Cmd/Ctrl+Shift+R. Husk at endringer vises på **forhåndsvisningen** først —
  den ekte nettsiden endres bare når du har publisert. Er den fortsatt borte,
  si fra til utvikleren — da har byggingen feilet og forrige versjon vises
  fortsatt (nettsiden går aldri ned av en feil lagring).

## For utvikleren

- **Arkitektur**: git-basert CMS (Sveltia). Panelet er to statiske filer i
  `public/admin/` — null serverless-funksjoner, gratis hosting består.
  Innholdet leses ved byggetid via `lib/content.ts` (markdown) og
  `lib/prices.ts` (priser); typene der er skjemavakten — en ødelagt commit
  feiler bygget og forrige deploy blir stående.
- **Grener**: CMS-en skriver til **`preview`**, aldri til `main`. Vercel bygger
  `preview` som en preview-deployment (stabil URL per gren, automatisk
  `X-Robots-Tag: noindex`). To workflows styrer resten:
  `.github/workflows/publiser.yml` (flagget i `content/publisering.json` → merger
  `preview` inn i `main`, nullstiller flagget, stempler tidspunkt) og
  `.github/workflows/synk-preview.yml` (hver push til `main` merges inn i
  `preview`, så forhåndsvisningen har nyeste kode). Pushes fra `GITHUB_TOKEN`
  trigger ikke nye workflow-kjøringer, så det kan ikke gå i loop — men Vercel
  bygger likevel, siden den lytter på push-webhooks.
- **Førstegangsoppsett av grenen**: `preview` finnes ikke før første push til
  `main` etter at disse workflowene er lagt inn — «Synk preview» oppretter den.
  Panelet kan ikke logge inn før grenen finnes. Hent forhåndsvisnings-URL-en i
  Vercel-dashbordet (formen er `<prosjekt>-git-preview-<konto>.vercel.app`) og
  gi den til eieren.
- **Merge-konflikt** mellom `preview` og `main` (sjelden — eieren rører bare
  `content/`, du rører bare kode) stopper publiseringen og sender deg en
  e-post fra GitHub Actions. Eieren ser bare at siden ikke oppdateres.
- **Innlogging**: «Sign in with GitHub» krever `sveltia-cms-auth` på en gratis
  Cloudflare Worker:
  1. `git clone https://github.com/sveltia/sveltia-cms-auth && cd sveltia-cms-auth && npx wrangler deploy`
  2. GitHub-org → Settings → Developer settings → OAuth Apps → New:
     callback `https://<worker>.workers.dev/callback`
  3. `npx wrangler secret put` for `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
     og `ALLOWED_DOMAINS` (`innegolfbergen.no,*.vercel.app`)
  4. Sett worker-URLen som `base_url` i `public/admin/config.yml`
  Frem til det: «Sign In Using Access Token» (fint for utviklere) eller
  «Work with Local Repository» lokalt (krever Chromium).
- **Eiertilgang**: eieren trenger en gratis GitHub-konto med **Write** på
  dette repoet. Panelet gjør resten.
- **Sveltia er låst til én versjon** i `public/admin/index.html` (pre-1.0).
  Oppgrader bevisst: bump versjonen i script-URLen, test /admin, commit.
- **Nye felt/samlinger**: utvid `public/admin/config.yml` + typene/loaderne i
  `lib/content.ts` (+ `lib/prices.ts` for tall). Kjør `npm run typecheck`.
