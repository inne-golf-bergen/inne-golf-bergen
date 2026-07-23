"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { type Lang, langHref, t } from "@/lib/i18n";
import Button from "./Button";
import { DUR, EASE_OUT } from "./motion/tokens";
import styles from "./nav.module.css";

type MenuId = "sentre" | "selskap" | "turn";

function Lockup() {
  return (
    <>
      <Image src="/assets/logo-ball.png" alt="" width={51} height={46} className={styles.logoImg} />
      <span className={styles.logoText}>
        <span className={styles.logoName}>INNE</span>
        <span className={styles.logoSub}>GOLF BERGEN</span>
      </span>
    </>
  );
}

export default function SiteNav({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const homePath = langHref(lang, "/");
  const home = pathname === homePath ? "" : homePath;
  const logoHref = home === "" ? "#top" : homePath;
  const asaneHref = `${home}#asane`;
  const sandvikenHref = `${home}#sandviken`;
  const bookAsaneHref = `${home}#book-asane`;
  const bookSandvikenHref = `${home}#book-sandviken`;

  // The same page in the other language, for the NO/EN switch.
  const stripped = pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
  const noHref = stripped;
  const enHref = stripped === "/" ? "/en" : `/en${stripped}`;
  const otherHref = lang === "no" ? enHref : noHref;

  const reduce = useReducedMotion();
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [glass, setGlass] = useState(false);
  const hoverRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // close menus when navigating (adjust state during render, not in an effect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenu(null);
    setMobileOpen(false);
    setSheetOpen(false);
  }

  const openHover = (id: MenuId) => {
    if (!hoverRef.current) return;
    clearTimeout(timerRef.current);
    setMenu(id);
  };
  const toggle = (id: MenuId) => {
    clearTimeout(timerRef.current);
    setMenu((m) => (m === id ? null : id));
  };
  const leaveMenus = () => {
    if (!hoverRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMenu(null), 130);
  };
  const closeAllNav = () => {
    setMenu(null);
    setMobileOpen(false);
    setSheetOpen(false);
  };

  useEffect(() => {
    hoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onScroll = () => setGlass(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    const raf = requestAnimationFrame(onScroll);

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllNav();
    };
    window.addEventListener("keydown", esc);

    const openBook = () => {
      setSheetOpen(true);
      setMobileOpen(false);
    };
    window.addEventListener("inne-open-book", openBook);

    const outside = (e: PointerEvent) => {
      if (!(e.target as Element | null)?.closest("#site-nav")) setMenu(null);
    };
    document.addEventListener("pointerdown", outside);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", esc);
      window.removeEventListener("inne-open-book", openBook);
      document.removeEventListener("pointerdown", outside);
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, sheetOpen]);

  const openSheet = () => {
    setSheetOpen(true);
    setMobileOpen(false);
  };

  const homeLabel = t(lang, "INNE Golf Bergen — hjem", "INNE Golf Bergen — home");

  const langSwitch = (
    <div role="group" aria-label={t(lang, "Språkvalg", "Language")} className={styles.langSwitch}>
      <Link
        href={noHref}
        aria-current={lang === "no" ? "true" : undefined}
        className={`${styles.langBtn} ${lang === "no" ? styles.langBtnActive : ""}`}
      >
        NO
      </Link>
      <span aria-hidden="true" className={styles.langDivider} />
      <Link
        href={enHref}
        aria-current={lang === "en" ? "true" : undefined}
        className={`${styles.langBtn} ${lang === "en" ? styles.langBtnActive : ""}`}
      >
        EN
      </Link>
    </div>
  );

  const dropdown = (id: MenuId, label: string, wide: boolean, items: ReactNode) => (
    <div className={styles.menuWrap} onMouseEnter={() => openHover(id)} onMouseLeave={leaveMenus}>
      <button
        type="button"
        onClick={() => toggle(id)}
        aria-expanded={menu === id}
        aria-haspopup="true"
        className={styles.menuTrigger}
      >
        {label}{" "}
        <span aria-hidden="true" className={styles.caret}>
          ▾
        </span>
      </button>
      <AnimatePresence>
        {menu === id && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: reduce ? 0 : 0.12, ease: "easeOut" } }}
            transition={{ duration: reduce ? 0 : 0.18, ease: EASE_OUT }}
            style={{ transformOrigin: "top left" }}
            className={`${styles.dropdown} ${wide ? styles.dropdownWide : ""}`}
          >
            {items}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <header id="site-nav" className={`${styles.header} ${glass ? styles.headerGlass : ""}`}>
        <div className={styles.inner}>
          <Link href={logoHref} aria-label={homeLabel} className={styles.logo}>
            <Lockup />
          </Link>

          <nav className={`nav-d ${styles.desktopNav}`} aria-label={t(lang, "Hovedmeny", "Main menu")}>
            {dropdown(
              "sentre",
              t(lang, "Sentre", "Venues"),
              true,
              <>
                <Link data-sweep-in="true" href={asaneHref} className={styles.dropdownItem} onClick={closeAllNav}>
                  Åsane
                </Link>
                <Link data-sweep-in="true" href={sandvikenHref} className={styles.dropdownItem} onClick={closeAllNav}>
                  Sandviken
                </Link>
                <Link
                  data-sweep-in="true"
                  href={langHref(lang, "/praktisk")}
                  className={styles.dropdownItem}
                  onClick={closeAllNav}
                >
                  {t(lang, <>Parkering &amp; adgang</>, <>Parking &amp; access</>)}
                </Link>
              </>,
            )}

            <Link data-sweep="true" href={langHref(lang, "/medlemskap")} className={styles.topLink}>
              {t(lang, <>Priser &amp; medlemskap</>, <>Prices &amp; membership</>)}
            </Link>

            {dropdown(
              "selskap",
              t(lang, "Selskap", "Events"),
              false,
              <>
                <Link
                  data-sweep-in="true"
                  href={langHref(lang, "/vip-losjen")}
                  className={styles.dropdownItem}
                  onClick={closeAllNav}
                >
                  {t(lang, "VIP-losjen", "VIP Box")}
                </Link>
                <Link
                  data-sweep-in="true"
                  href={langHref(lang, "/bursdag")}
                  className={styles.dropdownItem}
                  onClick={closeAllNav}
                >
                  {t(lang, "Bursdag", "Birthday")}
                </Link>
                <Link
                  data-sweep-in="true"
                  href={langHref(lang, "/bedrift")}
                  className={styles.dropdownItem}
                  onClick={closeAllNav}
                >
                  {t(lang, "Bedrift", "Company")}
                </Link>
              </>,
            )}

            {dropdown(
              "turn",
              t(lang, "Turneringer", "Tournaments"),
              false,
              <>
                <Link
                  data-sweep-in="true"
                  href={langHref(lang, "/vinterturnering")}
                  className={styles.dropdownItem}
                  onClick={closeAllNav}
                >
                  {t(lang, "Vinterturnering", "Winter Cup")}
                </Link>
                <Link
                  data-sweep-in="true"
                  href={langHref(lang, "/polf")}
                  className={styles.dropdownItem}
                  onClick={closeAllNav}
                >
                  POLF
                </Link>
                <Link
                  data-sweep-in="true"
                  href={langHref(lang, "/veien-til-golf")}
                  className={styles.dropdownItem}
                  onClick={closeAllNav}
                >
                  {t(lang, "Veien til Golf", "Learn golf")}
                </Link>
              </>,
            )}

            <Link data-sweep="true" href={langHref(lang, "/gavekort")} className={styles.topLink}>
              {t(lang, "Verdikort", "Vouchers")}
            </Link>

            {langSwitch}

            <Button size="md" onClick={openSheet}>
              {t(lang, "BOOK NÅ", "BOOK")}
            </Button>
          </nav>

          <div className={`nav-m ${styles.mobileControls}`}>
            <Link
              href={otherHref}
              aria-label={t(lang, "Switch to English", "Bytt til norsk")}
              className={`${styles.iconBtn} ${styles.langMobile}`}
            >
              {t(lang, "EN", "NO")}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t(lang, "Åpne meny", "Open menu")}
              className={`${styles.iconBtn} ${styles.burger}`}
            >
              <span className={styles.burgerBar} />
              <span className={styles.burgerBar} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
      {mobileOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t(lang, "Meny", "Menu")}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduce ? 0 : DUR.micro, ease: "easeOut" } }}
          transition={{ duration: reduce ? 0 : DUR.base, ease: EASE_OUT }}
          className={styles.mobileMenu}
        >
          <div className={styles.mobileMenuBar}>
            <Link href={logoHref} onClick={closeAllNav} aria-label={homeLabel} className={styles.logo}>
              <Lockup />
            </Link>
            <div className={styles.mobileMenuActions}>
              <Link
                href={otherHref}
                aria-label={t(lang, "Switch to English", "Bytt til norsk")}
                className={`${styles.iconBtn} ${styles.langMobile}`}
              >
                {t(lang, "EN", "NO")}
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t(lang, "Lukk menyen", "Close menu")}
                className={styles.iconBtn}
              >
                ✕
              </button>
            </div>
          </div>
          <nav aria-label={t(lang, "Mobilmeny", "Menu")} className={styles.mobileNav}>
            <span className={`${styles.mobileGroup} ${styles.mobileGroupFirst}`}>{t(lang, "Sentre", "Venues")}</span>
            <Link href={asaneHref} onClick={closeAllNav} className={styles.mobileLink}>
              Åsane
            </Link>
            <Link href={sandvikenHref} onClick={closeAllNav} className={styles.mobileLink}>
              Sandviken
            </Link>
            <Link href={langHref(lang, "/praktisk")} onClick={closeAllNav} className={styles.mobileLink}>
              {t(lang, <>Parkering &amp; adgang</>, <>Parking &amp; access</>)}
            </Link>
            <span className={styles.mobileGroup}>{t(lang, "Priser", "Prices")}</span>
            <Link href={langHref(lang, "/medlemskap")} onClick={closeAllNav} className={styles.mobileLink}>
              {t(lang, <>Priser &amp; medlemskap</>, <>Prices &amp; membership</>)}
            </Link>
            <span className={styles.mobileGroup}>{t(lang, "Selskap", "Events")}</span>
            <Link href={langHref(lang, "/vip-losjen")} onClick={closeAllNav} className={styles.mobileLink}>
              {t(lang, "VIP-losjen", "VIP Box")}
            </Link>
            <Link href={langHref(lang, "/bursdag")} onClick={closeAllNav} className={styles.mobileLink}>
              {t(lang, "Bursdag", "Birthday")}
            </Link>
            <Link href={langHref(lang, "/bedrift")} onClick={closeAllNav} className={styles.mobileLink}>
              {t(lang, "Bedrift", "Company")}
            </Link>
            <span className={styles.mobileGroup}>{t(lang, "Turneringer", "Tournaments")}</span>
            <Link href={langHref(lang, "/vinterturnering")} onClick={closeAllNav} className={styles.mobileLink}>
              {t(lang, "Vinterturnering", "Winter Cup")}
            </Link>
            <Link href={langHref(lang, "/polf")} onClick={closeAllNav} className={styles.mobileLink}>
              POLF
            </Link>
            <Link href={langHref(lang, "/veien-til-golf")} onClick={closeAllNav} className={styles.mobileLink}>
              {t(lang, "Veien til Golf", "Learn golf")}
            </Link>
            <span className={styles.mobileGroup}>{t(lang, "Verdikort", "Vouchers")}</span>
            <Link href={langHref(lang, "/gavekort")} onClick={closeAllNav} className={styles.mobileLink}>
              {t(lang, "Kjøp gavekort", "Buy vouchers")}
            </Link>
            <div className={styles.mobileCta}>
              <Button size="lg" fullWidth onClick={openSheet}>
                {t(lang, "BOOK NÅ", "BOOK")}
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
      {sheetOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t(lang, "Velg senter", "Pick venue")}
          className={styles.sheet}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: reduce ? 0 : DUR.micro, ease: "easeOut" } }}
            transition={{ duration: reduce ? 0 : DUR.base, ease: EASE_OUT }}
            className={styles.sheetBackdrop}
            onClick={() => setSheetOpen(false)}
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12, transition: { duration: reduce ? 0 : 0.18, ease: "easeOut" } }}
            /* entrance choreography, deliberately longer than --dur-enter */
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE_OUT }}
            className={styles.sheetPanel}
          >
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label={t(lang, "Lukk", "Close")}
              className={`${styles.iconBtn} ${styles.sheetClose}`}
            >
              ✕
            </button>
            <div className={styles.sheetKicker}>{t(lang, "Book på 60 sekunder", "Book in 60 seconds")}</div>
            <h2 className={styles.sheetTitle}>{t(lang, "Velg senter", "Pick venue")}</h2>
            <div className={styles.sheetGrid}>
              <Link href={bookAsaneHref} onClick={closeAllNav} className={styles.sheetCard}>
                <div className={styles.sheetCardTop}>
                  <span className={styles.sheetCardKicker}>3 × TrackMan iO</span>
                  <span className={styles.sheetCardName}>Åsane</span>
                </div>
                <span className={styles.sheetCardFoot}>
                  Book Åsane <span aria-hidden="true">→</span>
                </span>
              </Link>
              <Link href={bookSandvikenHref} onClick={closeAllNav} className={styles.sheetCard}>
                <div className={styles.sheetCardTop}>
                  <span className={styles.sheetCardKicker}>5 m widescreen</span>
                  <span className={styles.sheetCardName}>Sandviken</span>
                </div>
                <span className={styles.sheetCardFoot}>
                  Book Sandviken <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
            <p className={styles.sheetNote}>
              {t(
                lang,
                "Gratis lånekøller til herrer, damer og juniorer.",
                "Free loaner clubs for men, women and juniors.",
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <div className={`m-only ${styles.bookBar}`}>
        <Button size="lg" fullWidth onClick={openSheet}>
          {t(lang, "BOOK NÅ", "BOOK")}
        </Button>
      </div>
    </>
  );
}
