# INNE Golf Bergen — Design & Motion Audit

**Date:** 2026-07-23 · **Method:** 9 parallel skill-backed auditors (visual core, motion, animation opportunities, taste, states/a11y, 3× subpage groups, content) + adversarial verification of every finding (18 agents, 137 raw findings, 135 verified) + independent hands-on read-through and live checks against the booking provider.

---

## 1. How the site is built

Next.js 16 App Router with a `[lang]` segment (NO unprefixed, EN under `/en`; `t(lang, no, en)` per string; EN ≤ NO length enforced by `scripts/check-i18n-lengths.mjs`). Styling is CSS Modules over a real token layer in `app/[lang]/globals.css` — the **«Kobber & eik»** language: warm charcoal ink scale (`--ink-950…500`), warm off-white `#f4ede6`, a single copper accent family (`--orange-300…700`), warm-white alpha hairlines (`--line-8…18`), Syne 600–800 uppercase display + Schibsted Grotesk body, sharp corners, dark only.

Motion is two engines + a CSS layer:

- **framer-motion** on the landing (`components/motion/fx.tsx`): critically damped spring reveals (REVEAL 150/26, LINE 84/22 — documented "no overshoot" policy), masked hero line-rises, parallax, CountUp, magnetic CTAs, cursor glow. Every primitive degrades to static markup under `prefers-reduced-motion`.
- **GSAP** on subpages (`components/SiteFx.tsx`): `[data-fade]` intro + `[data-st]` scroll reveals, `power4.out` 0.8 s, RM-gated before the library even loads, `gsap.context` cleanup.
- **CSS transitions** in each module: coherent at the macro level, fragmented at the micro level (~9 durations from 120 ms to 900 ms, three beziers plus default `ease`, applied ad hoc).

## 2. Awwwards rubric — current state

| Axis | Score | Why |
|---|---|---|
| Design (40) | **33** | A real, disciplined identity: hairline ledgers, copper-as-data, optical tracking progression, jury-grade microtypography (NNBSP, true minus, THIN before %). Loses points to micro-label fragmentation (~8 sizes / 11 trackings), 11 ad-hoc muted-text alphas, three CTA clones drifting off the button spec, three whites in the hero, and copper doing decorative duty in places. |
| Usability (30) | **21** | Touch targets, reduced motion, and the compare slider are genuinely senior. But: focus-visible ring exists on only 4 of ~20 interactive patterns, dialogs (`aria-modal`) have zero focus management, forms overclaim success on a `mailto:` handoff, the gavekort venue toggle is a dead control, the mobile compare section is an unlabeled photo, and there's no branded 404. |
| Creativity (20) | **15.5** | The masked hero rise, count-up duel, compare slider, and copper prize band are memorable and owned. Missing: the ambience (grain + glow) switches off outside the landing; exits are hard cuts everywhere; no single signature "risk" moment. |
| Content (10) | **5.5** | The voice is excellent and bilingual craft is real — but production placeholders (`[Gyldighet/utløp bekreftes]`, `[DATO]`, `[Lim inn kjøpsvilkår]`, bare `facebook.com`), two finished events still selling entries, and a newsletter form that fabricates success are integrity breaks, weighted heavily. |
| **Total** | **75 / 100** | Strong bones, seams showing. Target after fixes: ~87. |

## 3. Protected strengths — do not touch

- Hero: two masked Syne lines + 0.11 s stagger + ticker held to 1.05 s; the H1 `min(clamp…)` sizing formula and Å-ring mask compensation.
- «Betal 1 800. Få 2 800.» count-up duel; CountUp used exactly twice, SSR-rendering final values.
- Hairline-ledger pattern everywhere; copper reserved for data/intent; full-bleed copper bands as palette inversions.
- `Faq.tsx` — the house reference accordion (iOS drawer curve, asymmetric exit, spring icon, RM-gated).
- Reduced-motion discipline at every layer; `SiteFx` engineering (visible-by-default, RM before load, context cleanup).
- CompareSlider (pointer capture, rAF batching, keyboard slider semantics, one-time teach nudge).
- Grain 0.055 / glow 0.11 values exactly as they are (spread them, never intensify).
- Touch-target technique (padding-block + negative margin); zero `transition: all` in the codebase.
- Bilingual microtypography and the clipped two-beat voice.

## 4. Tier 1 — feel-breaking

1. **Forms claim success on a `mailto:` handoff** — `BedriftForm`, `BursdagForm`, `VinterForm`, `VtgForm` flip to "Sendt/Takk!" (VinterForm: "laget er registrert!") after only `window.location.href = mailto…`. No mail client ⇒ silent data loss while UI confirms. `PolfForm`'s "Nesten i mål / Slik fullfører du" is the honest house pattern — port it to all four, keep a visible `post@` fallback, add `aria-live`/focus handling (SR users currently get silence).
2. **Fake newsletter subscription** — `SiteFooter.tsx:95` discards the address and prints "Du står på lista." Rewire as a `mailto:` signup (keeps the no-backend constraint) with honest copy.
3. **Production placeholders public** — `gavekort/page.tsx:74` "[Gyldighet/utløp bekreftes]"; `vilkar/page.tsx` "[DATO]", "[Lim inn kjøpsvilkår]", "[Settes inn]" + agency instructions in rendered JSX; `personvern/page.tsx` "Utkast…" + "[Juridisk gjennomgang kreves]" tags. Live check: current Alba vouchers are campaign-priced with expiry 2026-08-31 / one-year variants ⇒ honest durable line is "Gyldighet vises ved kjøp." Legal pages get honest interim copy; scaffolding moves to comments.
4. **Dead venue toggle on gavekort** — `GavekortVelger.tsx:22` hardcodes the Åsane URL for both venues. Live check: `…/inne-golf-bergen-avd-sandviken/offers/vouchers` exists with the same 5 tiers ⇒ add `gavekortSandviken` to `SITE` and switch per state.
5. **Bare `facebook.com` as the tournament group link** — `vinterturnering/page.tsx:157`. Interim: `SITE.facebook` (real page) until the group URL is supplied.
6. **Finished events still selling entries** — POLF (golf window ended 4 Dec 2025; poker night dated "Fredag 5. des") and Winter Cup 2025/26 (ended 30 Apr) both show live sign-up CTAs + Vipps payment. Flip to archive state: keep format content, swap CTA to "next season" notice, disable payment instructions, soften the homepage cards.
7. **VinterFaser accordion jump-cuts** — `VinterFaser.tsx:145` mounts/unmounts the detail grid with zero motion beside an animated `+`; the page copy explicitly invites clicking. Port the `Faq.tsx` recipe (AnimatePresence height/opacity, spring icon) + its aria wiring.
8. **Booking sheet (primary conversion surface) exits in 0 frames** after a 0.5 s theatrical enter; same for mobile menu and dropdowns. AnimatePresence exits ≤150–200 ms, ease-out, interruptible.
9. **Bedrift mobile hero hyphenates mid-word** ("FIRMA-/KVELDEN…") — bursdag already got the fix pattern (hyphens:none + shorter mobile copy + smaller size); mirror it with sizes that actually fit (FIRMAKVELDEN ≈ 539 px @40 px ⇒ needs ≤ ~25 px, or a shortened mobile headline).

## 5. Tier 2 — polish

**Motion system (Pass 1 foundation):**
- Tokenize: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (= GSAP power4.out — unifies CSS with the subpage engine), `--dur-micro: 150ms`, `--dur-base: 200ms`, `--dur-enter: 300ms`, `--dur-slow: 350ms` (header glass). Shared TS tokens (`components/motion/tokens.ts`) exporting the ease array, durations, and the three spring presets for framer call sites.
- Sweep every module transition onto tokens; kill remaining default-`ease`/`ease-in-out` on UI (hero video fade, `#sim-scrim-mobile`, CursorGlow first fade, `.phasePlus`).
- `html { scroll-behavior: smooth }` must be gated by `prefers-reduced-motion: no-preference` (the one RM gap).
- Link sweep 0.45 s → 300 ms; field focus border 150 ms; caret rotate on open dropdowns; sentCard/newsletterThanks get the house `inne-rise` enter.
- CompareSlider: kill the intro nudge tween on pointerdown/keydown (interruptibility).
- Magnetic: cache rect on enter; clamp offset (±16/±10) or halve strength for fullWidth CTAs.
- Native `<details>` FAQs (medlemskap, bursdag): land the landing FAQ feel — `+` rotation, cursor, focus ring, marker suppression (Safari), and where cheap, the height animation via a shared Disclosure.
- Delete `.heroBlob` (invisible over video; permanently compositing blurred vw-scale layer). Move grain + CursorGlow into the layout so the ambience follows the visitor.

**Typography & color tokens:**
- Three text-emphasis tokens (`--text-strong/.88, --text-mid/.72, --text-dim/.55`) replacing 11 ad-hoc alphas.
- Micro-label scale collapsed to 3 stops (+ button tracking as 4th).
- One white: `--white` (hero copy keeps its shadows, drops `#fff/#fff6ec`); on-copper ink tokens (`#1a100a` + alphas) named.
- `simH2` tracking outlier (-0.01 → -0.02); subpage h2 tracking matches landing (-0.015).
- Buttons: `.formSubmit`, `.darkCta`, `.newsletterBtn`, `.buyBtn` align to `.btn` metrics (600 / 0.08em / 2 px radius / heights) + `:active` scale + focus ring — press feedback currently missing on exactly the money buttons.

**States & a11y:**
- `--focus-ring` on every interactive element (nav triggers/links/dropdown items, lang switch, iconBtns, mobileLinks, sheetCards, phaseBtn, toggleBtn, buyBtn, newsletter, footer links, cards).
- Dialog focus management: focus in on open, trap, restore on close; scrollbar-width compensation on body lock.
- FAQ row + phaseBtn hover: copper shift (replace phaseBtn's lone opacity-dim).
- Form fields: `autocomplete` attrs, visible invalid state, split bedrift's 3-in-1 "Kontakt" field; bursdag grid orphan fix (2×2).
- Mobile compare slider: render title as a static block ≤768 px instead of `display:none`.
- Branded `not-found.tsx` ("Ute av bane." / "Out of bounds.").
- `openGraph`/`twitter` metadata (og:image from the photo library).
- Praktisk: addresses become maps links; Sandviken gets its postal code.
- Vinter prize grid: pin `repeat(4, minmax(0,1fr))` ≥769 px (auto-fit misaligns at 2×2); polf legal note contrast to ≥4.5:1; premierNote alpha up.
- VIP: chips duplicate the spec list — repurpose (Ta med egen mat / Book hele kvelden / Hele døgnet); passer cells 2×2 on mobile.
- Content fixes: "opptil 30 %" vs real 43 % max (reframe or re-math); "Veien til Golf" filed under "Turneringer" → "Turneringer & kurs"; landing "skjer" cards' fake 01/02/03 → informational kickers; NO/EN price-row parity; "Kjøp gavekort" → "Kjøp verdikort"; "Trening"/"Putting" label parity; typographic apostrophes.

## 6. Tier 3 — nice-to-have

Copper-discipline demotions (chips/labels), dead tokens (`--forest-*`, `--scrim`, `--gray-100/200`) removed, duplicate `*MediaWrap` CSS classes merged, gavekort off-token hexes tokenized, medlemskap "Fra 100 kr." size parity with landing, 320 px medlemskap hero wrap, sheetNote de-bolded, pulseDot box-shadow → transform/opacity loop, CompareSlider `left` → `transform` writes + aria min/max honesty + no forced blur, dropdown `aria-haspopup` semantics, focus-out closes menus, subpage hero parallax parity, field-focus glow, EN "Play out in spring" rephrase, "Sim 3-losjen" naming, VtG duplicate ÅGF sentence, polf 600 kr breakdown, praktisk photo `sizes` parity, legal TOC mailto mixed in anchor list.

## 7. Do NOT animate (explicit)

Language switch (route navigation), mobile sticky book bar (must exist at first paint), price/prize tables (comparison data), mobile menu link cascade & sheet card stagger (conversion path — overlay motion already carries it), GavekortVelger label swap ×5 (text swap = noise), header glass (already right; no hide-on-scroll).

## 8. The signature moment (one justified risk)

**Copper shot-tracer arc over «Betal 1 800. / Få 2 800.»** — TrackMan's own product identity is the orange tracer; drawing one in kobber from the paid numeral to the received numeral compounds the site's existing personality peak, is product-true, costs zero dependencies. `motion.path` pathLength 0→1, `--orange-400` stroke, ~1.2 s house ease after the CountUp triggers; static path under reduced motion; hidden where the stacked layout leaves no arc room. Runners-up considered and rejected: hero period "ball drop" bounce (breaks the no-overshoot policy), scroll-progress hairline (generic).

## Post-implementation status (2026-07-23)

All seven passes landed (see git log `5708af6..ed688e6`). Adversarial re-verification of the diff: **0 motion-rule violations** (4 judgment notes, all sanctioned: idle-only compare nudge, 900 ms ambient photo zoom, 0.5 s sheet entrance, and the compare slider's position-driven `left` writes). One found-and-fixed defect: the branded 404 needed a `[...rest]` catch-all to be reachable. Gates green: `tsc`, `eslint`, `check-i18n-lengths` (737 pairs), `next build` (all routes SSG both languages). Estimated rubric after fixes: Design 36 / Usability 27 / Creativity 17 / Content 9 ≈ **89/100**. Remaining known gaps are listed at the end of the report accompanying this audit (Sandviken Facebook-group URL, real legal copy, VtG duplicate ÅGF sentence, dropdown roving-tabindex semantics).

## 9. Implementation plan (one concern per pass, commit per pass)

1. **Motion foundation** — tokens (CSS + TS), transition sweep, RM scroll gate, exits groundwork.
2. **Content integrity (Tier 1)** — placeholders, archive states, dead toggle, group link, newsletter, honest form states.
3. **Motion Tier 1/2** — sheet/menu/dropdown exits, VinterFaser + details FAQs, nudge kill, Magnetic clamp, blob removal, ambience into layout.
4. **Typography, color & buttons** — emphasis/label/white tokens, button unification, tracking fixes.
5. **States & a11y** — focus rings, dialog focus, hovers, forms, 404, OG meta, per-page layout fixes.
6. **Signature moment** — the tracer arc.
7. **Tier 3 cherry-picks + verify** — build, i18n length check, browser pass at desktop/mobile, re-run motion rules against the diff.
