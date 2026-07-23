"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE } from "@/lib/site";
import styles from "./footer.module.css";

export default function SiteFooter() {
  const pathname = usePathname();
  const home = pathname === "/" ? "" : "/";
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
              Golf. Hele året. To selvbetjente TrackMan-sentre i Bergen — åpne hele døgnet.
            </p>
          </div>

          <div className={styles.col}>
            <span className={styles.colLabel}>Åsane</span>
            <span className={styles.colText}>
              Haukedalen 1, 5121 Ulset
              <br />3 × TrackMan iO · VIP-losje
              <br />
              Gratis parkering
              <br />
              Åpent hele døgnet
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
              Buss 40 m unna
              <br />
              Åpent hele døgnet
            </span>
            <Link data-sweep="true" href={`${home}#book-sandviken`} className={styles.bookLink}>
              Book Sandviken →
            </Link>
          </div>

          <div className={styles.col}>
            <span className={styles.colLabel}>Kontakt</span>
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
              <span className={styles.newsletterLabel}>Få turneringsdatoer og medlemstilbud</span>
              {subscribed ? (
                <span className={styles.newsletterThanks}>Takk! Du står på lista.</span>
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
                    placeholder="din@epost.no"
                    aria-label="E-postadresse"
                    className={styles.newsletterInput}
                  />
                  <button type="submit" className={styles.newsletterBtn}>
                    Meld på
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>© 2026 INNE Golf Bergen · Org.nr. {SITE.orgNr}</span>
          <span className={styles.legalLinks}>
            <Link data-sweep="true" href="/vilkar" className={styles.legalLink}>
              Kjøpsvilkår
            </Link>
            <span aria-hidden="true" className={styles.legalDivider} />
            <Link data-sweep="true" href="/personvern" className={styles.legalLink}>
              Personvern
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
