import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { getAktueltPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { asLang, langAlternates, langHref, t } from "@/lib/i18n";
import sub from "../subpage.module.css";
import s from "./aktuelt.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    title: t(lang, "Aktuelt — INNE Golf Bergen", "News — INNE Golf Bergen"),
    description: t(
      lang,
      "Siste nytt fra INNE Golf Bergen — turneringer, tilbud og oppdateringer fra sentrene i Åsane og Sandviken.",
      "News from INNE Golf Bergen — tournaments, offers and updates from our venues.",
    ),
    alternates: langAlternates("/aktuelt"),
  };
}

export default async function AktueltPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const posts = getAktueltPosts(lang);

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.bg900} ${sub.textHero} ${sub.textHeroShort}`}>
        <div className="container">
          <div data-fade="true">
            <Eyebrow>{t(lang, "Aktuelt", "News")}</Eyebrow>
          </div>
          <h1 data-fade="true" className={s.heroH1}>
            {t(lang, "Siste nytt fra INNE.", "News from INNE.")}
          </h1>
          <p data-fade="true" className={s.heroLead}>
            {t(
              lang,
              "Turneringer, tilbud og små og store nyheter fra sentrene våre.",
              "Tournaments, offers and updates from our venues.",
            )}
          </p>
        </div>
      </section>

      {/* ============ Saker ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className="container">
          {posts.length === 0 ? (
            <div data-st="true" className={sub.infoCard}>
              <span className={sub.infoCardKicker}>{t(lang, "Aktuelt", "News")}</span>
              <span className={sub.infoCardValue}>{t(lang, "Ingen saker ennå", "Nothing here yet")}</span>
              <span className={sub.infoCardText}>
                {t(
                  lang,
                  "Følg oss på Facebook og Instagram i mellomtiden.",
                  "Meanwhile, find us on Facebook and Instagram.",
                )}
              </span>
            </div>
          ) : (
            <div className={s.grid}>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  data-st="true"
                  href={langHref(lang, `/aktuelt/${post.slug}`)}
                  className={s.card}
                >
                  {post.hero && (
                    <div className={s.cardMedia}>
                      <Image
                        src={post.hero}
                        alt=""
                        fill
                        sizes="(max-width: 659px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className={s.cardImg}
                      />
                    </div>
                  )}
                  <div className={s.cardBody}>
                    <span className={s.cardDate}>{formatDate(lang, post.date)}</span>
                    <h2 className={s.cardTitle}>{post.title}</h2>
                    <p className={s.cardCopy}>{post.description}</p>
                    <span className={s.cardCta}>
                      {t(lang, "Les mer", "Read")} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
