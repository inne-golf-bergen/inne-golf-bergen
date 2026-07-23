import Link from "next/link";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import sub from "./subpage.module.css";

/**
 * 404 inside the [lang] segment. The segment param is unavailable in
 * not-found files, so the page is bilingual in one breath — the golf term
 * carries both languages anyway.
 */
export default function NotFound() {
  return (
    <main>
      <section className={`${sub.bg900} ${sub.textHero}`}>
        <div className="container">
          <Eyebrow>404</Eyebrow>
          <h1 className={`${sub.h1} ${sub.h2Large}`} style={{ fontSize: "clamp(44px, 8vw, 130px)" }}>
            Out of bounds.
          </h1>
          <p className={sub.heroLead}>
            Denne siden finnes ikke — men banene gjør det. / This page doesn&rsquo;t exist — the courses do.
          </p>
          <div className={sub.heroCtaWrap}>
            <Button as="a" href="/" size="lg">
              Tilbake til start
            </Button>
          </div>
          <p className={sub.sectionLead}>
            <Link data-sweep="true" href="/en">
              Continue in English
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
