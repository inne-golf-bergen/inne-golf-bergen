"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { type Lang, langHref, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import styles from "./footer.module.css";

export default function SiteFooter({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const homePath = langHref(lang, "/");
  const home = pathname === homePath ? "" : homePath;
  const [subscribed, setSubscribed] = useState(false);

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
            <Link data-sweep="true" href={`${home}#book-asane`} className={styles.bookLink}>
              Book Åsane →
            </Link>
          </div>

          <div className={styles.col}>
            <span className={styles.colLabel}>Sandviken</span>
            <span className={styles.colText}>
              Sandviksbodene 9
              <br />
              TrackMan iO · 5 m widescreen
              <br />
              {t(lang, "Buss 40 m unna", "Bus 40 m away")}
              <br />
              {t(lang, "Åpent hele døgnet", "Open 24/7")}
            </span>
            <Link data-sweep="true" href={`${home}#book-sandviken`} className={styles.bookLink}>
              Book Sandviken →
            </Link>
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
              {subscribed ? (
                <span className={styles.newsletterThanks}>
                  {t(lang, "Takk! Du står på lista.", "You're on the list.")}
                </span>
              ) : (
                <form
                  className={styles.newsletterForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                >
                  <input
                    required
                    type="email"
                    name="epost"
                    placeholder={t(lang, "din@epost.no", "you@mail.com")}
                    aria-label={t(lang, "E-postadresse", "Email address")}
                    className={styles.newsletterInput}
                  />
                  <button type="submit" className={styles.newsletterBtn}>
                    {t(lang, "Meld på", "Sign up")}
                  </button>
                </form>
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
