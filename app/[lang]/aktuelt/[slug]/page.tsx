import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/Eyebrow";
import SiteFx from "@/components/SiteFx";
import { getAktueltPost, getAktueltSlugs } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { asLang, langAlternates, t } from "@/lib/i18n";
import prose from "../../prose.module.css";
import sub from "../../subpage.module.css";
import s from "../aktuelt.module.css";

/* Only slugs that exist at build time may render; anything else must be the
   static branded 404. dynamicParams inheritance from the [lang] layout is
   undocumented, and zero serverless functions is a hard requirement — so it
   is set explicitly on every dynamic segment. */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  /* Runs once per [lang] from the layout's params; slugs are identical in
     both languages (English falls back to Norwegian). Drafts are excluded. */
  return getAktueltSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = asLang(rawLang);
  const post = getAktueltPost(lang, slug);
  if (!post) return {};
  return {
    title: `${post.title} — INNE Golf Bergen`,
    description: post.description,
    alternates: langAlternates(`/aktuelt/${slug}`),
  };
}

export default async function AktueltPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = asLang(rawLang);
  const post = getAktueltPost(lang, slug);
  if (!post) notFound();

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className={`${sub.bg900} ${sub.textHero} ${sub.textHeroShort}`}>
        <div className={`container ${s.artNarrow}`}>
          <div data-fade="true">
            <Eyebrow>
              {t(lang, "Aktuelt", "News")} · {formatDate(lang, post.date)}
            </Eyebrow>
          </div>
          <h1 data-fade="true" className={s.artH1}>
            {post.title}
          </h1>
          <p data-fade="true" className={s.artLead}>
            {post.description}
          </p>
        </div>
      </section>

      {/* ============ Artikkel ============ */}
      <section className={`${sub.bg950} ${sub.section}`}>
        <div className={`container ${s.artNarrow}`}>
          {post.hero && (
            <div data-st="true" className={s.artMedia}>
              <Image src={post.hero} alt="" fill sizes="(max-width: 860px) 100vw, 820px" className={s.cardImg} />
            </div>
          )}
          {lang === "en" && post.fallback && (
            <p data-st="true" className={s.fallbackNote}>
              This article is only available in Norwegian.
            </p>
          )}
          <div data-st="true" className={prose.prose} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </section>

      <SiteFx />
    </main>
  );
}
