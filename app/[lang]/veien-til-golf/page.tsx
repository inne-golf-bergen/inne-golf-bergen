import type { Metadata } from "next";
import Image from "next/image";
import veienTilGolfHero from "@/public/assets/photos/veien-til-golf-hero.jpg";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { asLang, type Lang, langAlternates, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import sub from "../subpage.module.css";
import VtgForm from "./VtgForm";
import s from "./vtg.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: "Veien til Golf — INNE Golf Bergen",
    description: t(
      lang,
      "Lær golf i vinter, spill ute til våren. Nybegynnerkurs hos INNE Golf Bergen i samarbeid med Hardanger GK og Voss GK — teori, slagtrening og nasjonal spillerett.",
      "Learn golf in winter, play out in spring. Beginner course at INNE with Hardanger GK and Voss GK — theory, swing training, national playing rights.",
    ),
    alternates: langAlternates("/veien-til-golf"),
  };
}

const steg = (lang: Lang): { kicker: string; title: string; copy: string; featured?: boolean }[] => [
  {
    kicker: t(lang, "Steg 01", "Step 01"),
    title: t(lang, "Teori", "Theory"),
    copy: t(
      lang,
      "VTG e-læring før slagtreningen. Du lærer grunnlaget hjemmefra, i ditt eget tempo.",
      "VTG e-learning before the range. Learn the basics at home, at your own pace.",
    ),
  },
  {
    kicker: t(lang, "Steg 02", "Step 02"),
    title: t(lang, "Slagtrening", "Swing work"),
    copy: t(
      lang,
      "8 timer slagtrening, putting og etikette med instruktør i simulator.",
      "8 hours of swings, putting and etiquette with an instructor.",
    ),
  },
  {
    kicker: t(lang, "Steg 03", "Step 03"),
    title: t(lang, "Fire kursdager", "Four sessions"),
    copy: t(
      lang,
      "Alt gjennomføres over 4 kursdager. Passer ikke en dato, ordner vi det.",
      "Everything runs over 4 course days. Date clash? We’ll sort it.",
    ),
  },
  {
    kicker: t(lang, "Steg 04", "Step 04"),
    title: t(lang, "Oppspill", "The test"),
    copy: t(
      lang,
      "Oppspill når banene åpner hos Hardanger GK eller Voss GK — så har du nasjonal spillerett og kan spille i hele Norge og utlandet.",
      "Your test round when courses open at Hardanger GK or Voss GK — then you hold national playing rights for Norway and abroad.",
    ),
    featured: true,
  },
];

export default async function VeienTilGolfPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.hero} ${s.hero}`}>
        <div aria-hidden="true" className={sub.heroBg}>
          <Image
            src={veienTilGolfHero}
            alt=""
            fill
            preload
            placeholder="blur"
            sizes="(max-width: 768px) 300vw, 150vw"
            quality={85}
            className={`${sub.heroImg} ${s.heroImg}`}
          />
          <div className={s.gradV} />
          <div className={s.gradH} />
        </div>
        <div className={sub.heroContent}>
          <div data-fade="true">
            <Eyebrow>{t(lang, "Veien til Golf · Nybegynnerkurs", "Veien til Golf · Beginners")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={`${sub.h1} ${s.heroH1}`}>
            {t(lang, "Lær golf i vinter.", "Learn in winter.")}{" "}
            <span className={s.heroAccent}>{t(lang, "Spill ute til våren.", "Play out in spring.")}</span>
          </h1>
          <p data-fade="true" className={sub.heroLead}>
            {t(
              lang,
              "I samarbeid med Hardanger GK og Voss GK gjør vi golf tilgjengelig — hele året.",
              "With Hardanger GK and Voss GK, we make golf accessible — all year.",
            )}
          </p>
          <div data-fade="true" className={sub.heroCtaWrap}>
            <Button as="a" href="#pameld" size="lg">
              {t(lang, "MELD INTERESSE", "I’M INTERESTED")}
            </Button>
          </div>
        </div>
      </section>

      {/* ============ Kursløp ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>{t(lang, "Slik lærer du", "How you learn")}</Eyebrow>
            <h2 className={sub.h2}>{t(lang, "Fire steg til spillerett.", "Four steps. Full rights.")}</h2>
          </div>
          <div className={s.stegGrid}>
            {steg(lang).map((item) => (
              <div key={item.kicker} data-st="true" className={`${s.stegCard} ${item.featured ? s.stegCardFeatured : ""}`}>
                <span className={`${s.stegKicker} ${item.featured ? s.stegKickerFeatured : ""}`}>{item.kicker}</span>
                <h3 className={s.stegTitle}>{item.title}</h3>
                <p className={`${s.stegCopy} ${item.featured ? s.stegCopyFeatured : ""}`}>{item.copy}</p>
              </div>
            ))}
          </div>
          <p data-st="true" className={s.stegFoot}>
            {t(lang, "Gratis lånekøller ved undervisning.", "Free loaner clubs during lessons.")}
          </p>
        </div>
      </section>

      {/* ============ Priser ============ */}
      <section className={`${sub.bg900} ${sub.section}`}>
        <div className="container">
          <div data-st="true">
            <Eyebrow>{t(lang, "Priser", "Prices")}</Eyebrow>
            <h2 className={sub.h2}>{t(lang, "Velg kurs.", "Pick one.")}</h2>
          </div>
          <div className={s.kursGrid}>
            <div data-st="true" className={s.kursCard}>
              <div className={s.kursHead}>
                <h3 className={s.kursTitle}>Junior</h3>
                <span className={s.kursAge}>{t(lang, "T.o.m. 23 år", "Up to age 23")}</span>
              </div>
              <div className={s.kursPriceRow}>
                <span className={s.kursPrice}>{"3 000 kr"}</span>
                <span className={s.kursPriceNote}>{t(lang, "totalpris", "all-in")}</span>
              </div>
              <div className={s.kursDeposit}>
                <span className={s.kursDepositLabel}>{t(lang, "Ved påmelding", "At sign-up")}</span>
                <span className={s.kursDepositValue}>{"2 000 kr"}</span>
              </div>
              <p className={s.kursNote}>
                {t(
                  lang,
                  "Inkluderer gratis innmelding i Åsane Golf Forening — som gir 20 % på simulatorspill hos oss.",
                  "Includes free entry to Åsane Golf Forening — giving 20 % off simulator play with us.",
                )}
              </p>
            </div>
            <div data-st="true" className={s.kursCard}>
              <div className={s.kursHead}>
                <h3 className={s.kursTitle}>{t(lang, "Voksen", "Adult")}</h3>
                <span className={s.kursAge}>{t(lang, "Fra 24 år", "Age 24+")}</span>
              </div>
              <div className={s.kursPriceRow}>
                <span className={s.kursPrice}>{"3 500 kr"}</span>
                <span className={s.kursPriceNote}>{t(lang, "totalpris", "all-in")}</span>
              </div>
              <div className={s.kursDeposit}>
                <span className={s.kursDepositLabel}>{t(lang, "Ved påmelding", "At sign-up")}</span>
                <span className={s.kursDepositValue}>{"2 000 kr"}</span>
              </div>
              <p className={s.kursNote}>
                {t(
                  lang,
                  "Inkluderer gratis innmelding i Åsane Golf Forening — som gir 20 % på simulatorspill hos oss.",
                  "Includes free entry to Åsane Golf Forening — giving 20 % off simulator play with us.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Kontakt og påmelding ============ */}
      <section id="pameld" className={`${sub.bg950} ${sub.section}`} style={{ scrollMarginTop: 80 }}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true" className={s.kontaktCol}>
            <div>
              <Eyebrow>{t(lang, "Meld interesse", "Register")}</Eyebrow>
              <h2 className={`${sub.h2} ${s.kontaktH2}`}>{t(lang, "Start her.", "Start now.")}</h2>
            </div>
            <div className={s.kontaktCard}>
              <span className={s.kontaktKicker}>{t(lang, "Direkte kontakt", "Direct contact")}</span>
              <span className={s.kontaktText}>
                {t(
                  lang,
                  "Spørsmål, eller ønsker du kurs i april/mai? Ring/SMS Kjetil.",
                  "Questions, or want an April/May course? Call/text Kjetil.",
                )}
              </span>
              <a href="tel:+4791330248" className={s.kontaktPhone}>
                913 30 248
              </a>
              <a href={`mailto:${SITE.email}`} className={s.kontaktMail}>
                {SITE.email}
              </a>
            </div>
            <p className={s.kontaktNote}>
              {t(lang, "Tilpasset VTG-kurs for grupper? Vi skreddersyr.", "Custom VTG course for a group? We tailor it.")}
            </p>
          </div>
          <div data-st="true">
            <VtgForm lang={lang} />
          </div>
        </div>
      </section>

      {/* ============ Åsane Golf Forening ============ */}
      <section className={s.agf}>
        <div className={`container ${sub.splitGrid}`}>
          <div data-st="true">
            <Eyebrow barColor="var(--orange-400)">Åsane Golf Forening</Eyebrow>
            <h2 className={s.agfH2}>{t(lang, "Golf for alle.", "Golf for all.")}</h2>
            <div className={s.agfGoal}>
              <span className={s.agfGoalLabel}>{t(lang, "Mål 2026", "Aim 2026")}</span>
              <p className={s.agfGoalText}>
                {t(
                  lang,
                  "Felles treninger for barn og ungdom, og åpne dager der barn og ungdom kan prøve golf for første gang — et lavterskeltilbud der foreningen stiller med utstyr.",
                  "Shared practice for kids and teens, and open days where they can try golf for the first time — low threshold, with gear provided by the club.",
                )}
              </p>
            </div>
          </div>
          <div data-st="true" className={s.agfCol}>
            <p className={s.agfLead}>
              {t(
                lang,
                "En forening med et tydelig mål — å skape et inkluderende og sosialt miljø der barn og ungdom får trene og utvikle seg innen golf. Gjennom samarbeid, frivillig innsats og fellesskap gir vi flere tilgang til aktivitet og idrettsglede, uavhengig av erfaring og bakgrunn.",
                "A club with a clear goal — an inclusive, social place where kids and teens train and grow in golf. Through teamwork, volunteering and community, we open activity and joy of sport to more, whatever the background.",
              )}
            </p>
            <p className={s.agfBody}>
              {t(
                lang,
                "Som medlem støtter du et lokalt initiativ for treningstider, samhold og mestring. Langsiktig mål: åpne dager og faste treninger hos INNE Golf Bergen i Åsane.",
                "As a member you back a local push for practice time, community and mastery. Long term: open days and regular practice at INNE Golf Bergen in Åsane.",
              )}
            </p>
          </div>
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
