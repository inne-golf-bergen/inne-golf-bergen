"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Button from "./Button";
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

export default function SiteNav() {
  const pathname = usePathname();
  const home = pathname === "/" ? "" : "/";
  const logoHref = home === "" ? "#top" : "/";
  const asaneHref = `${home}#asane`;
  const sandvikenHref = `${home}#sandviken`;
  const bookAsaneHref = `${home}#book-asane`;
  const bookSandvikenHref = `${home}#book-sandviken`;

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
      {menu === id && <div className={`${styles.dropdown} ${wide ? styles.dropdownWide : ""}`}>{items}</div>}
    </div>
  );

  return (
    <>
      <header id="site-nav" className={`${styles.header} ${glass ? styles.headerGlass : ""}`}>
        <div className={styles.inner}>
          <Link href={logoHref} aria-label="INNE Golf Bergen — hjem" className={styles.logo}>
            <Lockup />
          </Link>

          <nav className={`nav-d ${styles.desktopNav}`} aria-label="Hovedmeny">
            {dropdown(
              "sentre",
              "Sentre",
              true,
              <>
                <Link data-sweep-in="true" href={asaneHref} className={styles.dropdownItem} onClick={closeAllNav}>
                  Åsane
                </Link>
                <Link data-sweep-in="true" href={sandvikenHref} className={styles.dropdownItem} onClick={closeAllNav}>
                  Sandviken
                </Link>
                <Link data-sweep-in="true" href="/praktisk" className={styles.dropdownItem} onClick={closeAllNav}>
                  Parkering &amp; adgang
                </Link>
              </>,
            )}

            <Link data-sweep="true" href="/medlemskap" className={styles.topLink}>
              Priser &amp; medlemskap
            </Link>

            {dropdown(
              "selskap",
              "Selskap",
              false,
              <>
                <Link data-sweep-in="true" href="/vip-losjen" className={styles.dropdownItem} onClick={closeAllNav}>
                  VIP-losjen
                </Link>
                <Link data-sweep-in="true" href="/bursdag" className={styles.dropdownItem} onClick={closeAllNav}>
                  Bursdag
                </Link>
                <Link data-sweep-in="true" href="/bedrift" className={styles.dropdownItem} onClick={closeAllNav}>
                  Bedrift
                </Link>
              </>,
            )}

            {dropdown(
              "turn",
              "Turneringer",
              false,
              <>
                <Link data-sweep-in="true" href="/vinterturnering" className={styles.dropdownItem} onClick={closeAllNav}>
                  Vinterturnering
                </Link>
                <Link data-sweep-in="true" href="/polf" className={styles.dropdownItem} onClick={closeAllNav}>
                  POLF
                </Link>
                <Link data-sweep-in="true" href="/veien-til-golf" className={styles.dropdownItem} onClick={closeAllNav}>
                  Veien til Golf
                </Link>
              </>,
            )}

            <Link data-sweep="true" href="/gavekort" className={styles.topLink}>
              Verdikort
            </Link>

            <Button size="md" onClick={openSheet}>
              BOOK NÅ
            </Button>
          </nav>

          <div className={`nav-m ${styles.mobileControls}`}>
            <Button size="sm" onClick={openSheet}>
              BOOK NÅ
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Åpne meny"
              className={`${styles.iconBtn} ${styles.burger}`}
            >
              <span className={styles.burgerBar} />
              <span className={styles.burgerBar} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div role="dialog" aria-modal="true" aria-label="Meny" className={styles.mobileMenu}>
          <div className={styles.mobileMenuBar}>
            <Link href={logoHref} onClick={closeAllNav} aria-label="INNE Golf Bergen — hjem" className={styles.logo}>
              <Lockup />
            </Link>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Lukk meny" className={styles.iconBtn}>
              ✕
            </button>
          </div>
          <nav aria-label="Mobilmeny" className={styles.mobileNav}>
            <span className={`${styles.mobileGroup} ${styles.mobileGroupFirst}`}>Sentre</span>
            <Link href={asaneHref} onClick={closeAllNav} className={styles.mobileLink}>
              Åsane
            </Link>
            <Link href={sandvikenHref} onClick={closeAllNav} className={styles.mobileLink}>
              Sandviken
            </Link>
            <Link href="/praktisk" onClick={closeAllNav} className={styles.mobileLink}>
              Parkering &amp; adgang
            </Link>
            <span className={styles.mobileGroup}>Priser</span>
            <Link href="/medlemskap" onClick={closeAllNav} className={styles.mobileLink}>
              Priser &amp; medlemskap
            </Link>
            <span className={styles.mobileGroup}>Selskap</span>
            <Link href="/vip-losjen" onClick={closeAllNav} className={styles.mobileLink}>
              VIP-losjen
            </Link>
            <Link href="/bursdag" onClick={closeAllNav} className={styles.mobileLink}>
              Bursdag
            </Link>
            <Link href="/bedrift" onClick={closeAllNav} className={styles.mobileLink}>
              Bedrift
            </Link>
            <span className={styles.mobileGroup}>Turneringer</span>
            <Link href="/vinterturnering" onClick={closeAllNav} className={styles.mobileLink}>
              Vinterturnering
            </Link>
            <Link href="/polf" onClick={closeAllNav} className={styles.mobileLink}>
              POLF
            </Link>
            <Link href="/veien-til-golf" onClick={closeAllNav} className={styles.mobileLink}>
              Veien til Golf
            </Link>
            <span className={styles.mobileGroup}>Verdikort</span>
            <Link href="/gavekort" onClick={closeAllNav} className={styles.mobileLink}>
              Kjøp gavekort
            </Link>
            <div className={styles.mobileCta}>
              <Button size="lg" fullWidth onClick={openSheet}>
                BOOK NÅ
              </Button>
            </div>
          </nav>
        </div>
      )}

      {sheetOpen && (
        <div role="dialog" aria-modal="true" aria-label="Velg senter" className={styles.sheet}>
          <div className={styles.sheetBackdrop} onClick={() => setSheetOpen(false)} />
          <div className={styles.sheetPanel}>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label="Lukk"
              className={`${styles.iconBtn} ${styles.sheetClose}`}
            >
              ✕
            </button>
            <div className={styles.sheetKicker}>Book på 60 sekunder</div>
            <h2 className={styles.sheetTitle}>Velg senter</h2>
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
              Betal med kort eller Vipps. Gratis lånekøller til herrer, damer og juniorer.
            </p>
          </div>
        </div>
      )}

      <div className={`m-only ${styles.bookBar}`}>
        <Button size="lg" fullWidth onClick={openSheet}>
          BOOK NÅ
        </Button>
      </div>
    </>
  );
}
