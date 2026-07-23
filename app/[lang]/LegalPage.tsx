import type { ReactNode } from "react";
import Eyebrow from "@/components/Eyebrow";
import { type Lang, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import s from "./legal.module.css";

/** A run of body text where some spans are links (e.g. a contact clause). */
export type Segment = string | { text: string; href: string };

export type Block =
  | { kind: "p"; no: string; en: string }
  | { kind: "sub"; no: string; en: string }
  | { kind: "ul"; no: string[]; en: string[] }
  | { kind: "links"; no: Segment[]; en: Segment[] }
  | { kind: "org" };

export type LegalSection = {
  id: string;
  num: string;
  /** Full heading, rendered as the section <h2>. */
  title: { no: string; en: string };
  /** Short label for the table of contents. */
  toc: { no: string; en: string };
  blocks: Block[];
};

function renderSegments(segments: Segment[]): ReactNode[] {
  return segments.map((segment, i) =>
    typeof segment === "string" ? (
      segment
    ) : (
      <a
        key={i}
        className={s.inlineLink}
        href={segment.href}
        {...(segment.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {segment.text}
      </a>
    ),
  );
}

function renderBlock(lang: Lang, block: Block, i: number): ReactNode {
  switch (block.kind) {
    case "p":
      return (
        <p key={i} className={s.sectionText}>
          {t(lang, block.no, block.en)}
        </p>
      );
    case "sub":
      return (
        <h3 key={i} className={s.subHead}>
          {t(lang, block.no, block.en)}
        </h3>
      );
    case "ul":
      return (
        <ul key={i} className={s.list}>
          {t(lang, block.no, block.en).map((item, j) => (
            <li key={j} className={s.listItem}>
              {item}
            </li>
          ))}
        </ul>
      );
    case "links":
      return (
        <p key={i} className={s.sectionText}>
          {renderSegments(t(lang, block.no, block.en))}
        </p>
      );
    case "org":
      return (
        <div key={i} className={s.orgCard}>
          <span className={s.orgName}>{SITE.legalName}</span>
          <span className={s.orgMeta}>
            Org.nr. {SITE.orgNr} · {SITE.email}
          </span>
        </div>
      );
  }
}

/**
 * Shared shell for the legal pages (kjøpsvilkår / personvern): dark hero,
 * sticky table of contents, and a numbered list of sections. Body copy is
 * passed in as data so the pages stay pure content.
 */
export function LegalPage({
  lang,
  eyebrow,
  title,
  lead,
  sections,
  footNote,
  contactTocHref,
}: {
  lang: Lang;
  eyebrow: { no: string; en: string };
  title: { no: string; en: string };
  lead: ReactNode;
  sections: LegalSection[];
  /** Optional closing note under the content (used by kjøpsvilkår). */
  footNote?: ReactNode;
  /** Optional trailing "Kontakt" TOC link (used when contact is not a section). */
  contactTocHref?: string;
}) {
  return (
    <main>
      <section className={s.hero}>
        <div className={s.narrow}>
          <Eyebrow>{t(lang, eyebrow.no, eyebrow.en)}</Eyebrow>
          <h1 className={s.h1}>{t(lang, title.no, title.en)}</h1>
          <p className={s.heroLead}>{lead}</p>
        </div>
      </section>

      <section className={s.body}>
        <div className={s.narrow}>
          <div className={`legal-grid ${s.grid}`}>
            <nav aria-label={t(lang, "Innhold", "Content")} className={`legal-toc ${s.toc}`}>
              <span className={s.tocLabel}>{t(lang, "Innhold", "Content")}</span>
              {sections.map((section, i) => {
                const last = !contactTocHref && i === sections.length - 1;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={last ? `${s.tocLink} ${s.tocLinkLast}` : s.tocLink}
                  >
                    {section.num} · {t(lang, section.toc.no, section.toc.en)}
                  </a>
                );
              })}
              {contactTocHref && (
                <a href={contactTocHref} className={`${s.tocLink} ${s.tocLinkLast}`}>
                  {t(lang, "Kontakt", "Contact")}
                </a>
              )}
            </nav>

            <div className={`${s.content} ${s.contentTight}`}>
              {sections.map((section) => (
                <section key={section.id} id={section.id} className={s.sectionAnchor}>
                  <div className={s.sectionHead}>
                    <span className={s.sectionNum}>{section.num}</span>
                    <h2 className={s.sectionH2}>{t(lang, section.title.no, section.title.en)}</h2>
                  </div>
                  <div className={s.sectionBody}>
                    {section.blocks.map((block, i) => renderBlock(lang, block, i))}
                  </div>
                </section>
              ))}

              {footNote && <p className={s.footNote}>{footNote}</p>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
