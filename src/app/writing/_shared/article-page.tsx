/* eslint-disable @next/next/no-html-link-for-pages -- static GitHub Pages navigation */
import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { FEED_ALTERNATES, SITE, SITE_YEAR } from "@/data/site";
import { getSeries, getSeriesParts, getWritingPost, type WritingPost } from "@/data/writing";
import { PostFigures } from "./post-figures";
import "./article.css";
import styles from "./article-page.module.css";

/* Each post's text lives in its own article.html (shared with the standalone artifact build).
   It is read per render so `next dev` picks up edits; the static export reads it once at build time. */
function readArticle(slug: string) {
  return readFileSync(path.join(process.cwd(), "src/app/writing", slug, "article.html"), "utf8");
}

export function articleMetadata(slug: string, keywords: string[]): Metadata {
  const post = getWritingPost(slug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.href, ...FEED_ALTERNATES },
    keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.href,
      siteName: "Oney Erge",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [`${SITE}/`],
      tags: post.tags,
      images: [{ url: post.socialImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.socialImage],
    },
  };
}

function PartLink({ post, current }: { post: WritingPost; current: boolean }) {
  const label = String(post.part);
  const accessibleLabel = `${getSeries(post.seriesId).itemLabel} ${post.part}: ${post.title}`;
  if (current) return <span className={styles.partCurrent} aria-current="page" aria-label={accessibleLabel}>{label}</span>;
  if (post.status !== "published") return <span className={styles.partUpcoming} title="Coming soon" aria-label={accessibleLabel}>{label}</span>;
  return <a className={styles.partLink} href={post.href} title={post.title} aria-label={accessibleLabel}>{label}</a>;
}

function SeriesBar({ post }: { post: WritingPost }) {
  const series = getSeries(post.seriesId);
  const parts = getSeriesParts(post.seriesId);
  const collection = series.collectionLabel;
  return (
    <nav className={styles.seriesBar} aria-label={`${series.title}, part ${post.part} of ${parts.length}`}>
      <span className={styles.seriesName}>{collection} · {post.part} of {parts.length}</span>
      <span className={styles.seriesParts}>
        {parts.map((part) => <PartLink key={part.slug} post={part} current={part.slug === post.slug} />)}
      </span>
    </nav>
  );
}

function SeriesFooter({ post }: { post: WritingPost }) {
  const parts = getSeriesParts(post.seriesId);
  const index = parts.findIndex((part) => part.slug === post.slug);
  const previous = index > 0 ? parts[index - 1] : undefined;
  const next = index < parts.length - 1 ? parts[index + 1] : undefined;
  const collection = getSeries(post.seriesId).itemLabel;
  const card = (target: WritingPost, direction: "Previous" | "Next") =>
    target.status === "published" ? (
      <a className={styles.seriesCard} href={target.href} data-direction={direction.toLowerCase()}>
        <span>{direction} · {collection} {target.part}</span>
        <strong>{target.title}</strong>
        <small>{target.hook}</small>
      </a>
    ) : (
      <div className={`${styles.seriesCard} ${styles.seriesCardUpcoming}`} data-direction={direction.toLowerCase()}>
        <span>{direction} · {collection} {target.part} · coming soon</span>
        <strong>{target.title}</strong>
        <small>{target.hook}</small>
      </div>
    );

  if (!previous && !next) return null;
  return (
    <nav className={styles.seriesFooter} aria-label="Series navigation">
      {previous ? card(previous, "Previous") : <span />}
      {next ? card(next, "Next") : <span />}
    </nav>
  );
}

export function ArticlePage({ slug, about }: { slug: string; about: string[] }) {
  const post = getWritingPost(slug);
  const series = getSeries(post.seriesId);
  const canonical = `${SITE}${post.href}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.description,
    url: canonical,
    image: `${SITE}${post.socialImage}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@id": `${SITE}/#person` },
    mainEntityOfPage: canonical,
    isPartOf: [
      { "@id": `${SITE}/writing/#blog` },
      { "@type": "CreativeWorkSeries", name: series.title, url: `${SITE}/writing/#series-${series.id}` },
    ],
    position: post.part,
    keywords: post.tags,
    about,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <a className={styles.skipLink} href="#post-root">Skip to article</a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/">Oney Erge</a>
          <nav aria-label="Primary navigation">
            <a href="/writing/">Writing</a>
            <a href="/#work">Projects</a>
            <a href="/#research">Research</a>
            <a href="/#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><a href="/writing/">Writing</a>
        </nav>
        <SeriesBar post={post} />
        <div dangerouslySetInnerHTML={{ __html: readArticle(slug) }} />
        <SeriesFooter post={post} />
        <PostFigures />
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href="/">Oney Erge</a>
        <p>Applied AI and physics, research and engineering.</p>
        <p>© {SITE_YEAR} Oney Erge</p>
      </footer>
    </>
  );
}
