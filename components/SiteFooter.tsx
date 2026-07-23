"use client";

import Image from "next/image";
import Link from "next/link";
import BotField from "@/components/BotField";
import { useSendForm } from "@/lib/forms";
import { type Lang, langHref, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import styles from "./footer.module.css";

export default function SiteFooter({ lang }: { lang: Lang }) {
  const { status, fallbackHref, send } = useSendForm("nyhetsbrev", t(lang, "Nyhetsbrev — påmelding", "Newsletter signup"));

  return (
    <footer id="site-footer" className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <Image src="/assets/logo-ball.png" alt="INNE Golf Bergen" width={51} height={46} className={styles.logoImg} />
              <span className={styles.logoText}>
                <span className={styles.logoName}>INNE</span>
                <span className={styles.logoSub}>GOLF BERGEN</span>
              </span>
            </div>
            <p className={styles.brandText}>
              {t(
                lang,
                "Golf. Hele året. To selvbetjente TrackMan-sentre i Bergen — åpne hele døgnet.",
                "Golf. All year. Two self-serve TrackMan venues in Bergen — open 24/7.",
              )}
            </p>
          </div>

          <div className={styles.col}>
            <span className={styles.colLabel}>Åsane</span>
            <span className={styles.colText}>
              Haukedalen 1, 5121 Ulset
              <br />
              {t(lang, "3 × TrackMan iO · VIP-losje", "3 × TrackMan iO · VIP box")}
              <br />
              {t(lang, "Gratis parkering", "Free parking")}
              <br />
              {t(lang, "Åpent hele døgnet", "Open 24/7")}
            </span>
            <a data-sweep="true" href={SITE.bookAsane} className={styles.bookLink}>
              Book Åsane →
            </a>
          </div>

          <div className={styles.col}>
            <span className={styles.colLabel}>Sandviken</span>
            <span className={styles.colText}>
              Sandviksbodene 9, 5035 Bergen
              <br />
              TrackMan iO · 5 m widescreen
              <br />
              {t(lang, "Buss 40 m unna", "Bus 40 m away")}
              <br />
              {t(lang, "Åpent hele døgnet", "Open 24/7")}
            </span>
            <a data-sweep="true" href={SITE.bookSandviken} className={styles.bookLink}>
              Book Sandviken →
            </a>
          </div>

          <div className={styles.col}>
            <span className={styles.colLabel}>{t(lang, "Kontakt", "Contact")}</span>
            <a data-sweep="true" href={`mailto:${SITE.email}`} className={styles.contactLink}>
              {SITE.email}
            </a>
            <a data-sweep="true" href={`tel:${SITE.phoneHrefs[0]}`} className={styles.contactLink}>
              {SITE.phones[0]}
            </a>
            <a data-sweep="true" href={SITE.instagram} target="_blank" rel="noopener" className={styles.contactLink}>
              Instagram
            </a>
            <a data-sweep="true" href={SITE.facebook} target="_blank" rel="noopener" className={styles.contactLink}>
              Facebook
            </a>
            <div className={styles.newsletter}>
              <span className={styles.newsletterLabel}>
                {t(lang, "Få turneringsdatoer og medlemstilbud", "Tournament dates & member offers")}
              </span>
              {status === "sent" ? (
                <span role="status" className={styles.newsletterThanks}>
                  {t(lang, "Takk! Du er på lista.", "Thanks! You’re in.")}
                </span>
              ) : (
                <form
                  className={styles.newsletterForm}
                  aria-busy={status === "sending"}
                  onSubmit={(e) => {
                    e.preventDefault();
                    /* no list tool — the signup lands in the post@ inbox like
                       every other form; the list itself is curated by hand */
                    const f = new FormData(e.currentTarget);
                    void send(f, [[t(lang, "E-post", "Email"), f.get("epost")]], { replyto: f.get("epost") });
                  }}
                >
                  <BotField />
                  <input
                    required
                    type="email"
                    name="epost"
                    placeholder={t(lang, "din@epost.no", "you@mail.com")}
                    aria-label={t(lang, "E-postadresse", "Email address")}
                    className={styles.newsletterInput}
                  />
                  <button type="submit" className={styles.newsletterBtn} disabled={status === "sending"}>
                    {status === "sending" ? t(lang, "Sender…", "Sending…") : t(lang, "Meld på", "Sign up")}
                  </button>
                </form>
              )}
              {status === "error" && (
                <span role="alert" className={styles.newsletterFailed}>
                  {t(lang, "Feilet — prøv igjen, eller", "Failed — try again, or")}{" "}
                  <a data-sweep="true" href={fallbackHref}>
                    {t(lang, "meld på via e-post", "sign up by email")}
                  </a>
                  .
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>© 2026 INNE Golf Bergen · Org.nr. {SITE.orgNr}</span>
          <span className={styles.legalLinks}>
            <Link data-sweep="true" href={langHref(lang, "/vilkar")} className={styles.legalLink}>
              {t(lang, "Kjøpsvilkår", "Terms")}
            </Link>
            <span aria-hidden="true" className={styles.legalDivider} />
            <Link data-sweep="true" href={langHref(lang, "/personvern")} className={styles.legalLink}>
              {t(lang, "Personvern", "Privacy")}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
