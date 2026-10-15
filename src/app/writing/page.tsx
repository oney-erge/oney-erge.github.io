import type { Metadata } from "next";
import Link from "next/link";
import { WritingCover } from "@/components/writing-card";
import { FEED_ALTERNATES, FEED_PATH, SITE, SITE_YEAR } from "@/data/site";
import { WRITING_DESCRIPTION as DESCRIPTION, getSeriesParts, writingPosts, writingSeries } from "@/data/writing";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description: DESCRIPTION,
  alternates: { canonical: "/writing/", ...FEED_ALTERNATES },
  openGraph: {
    title: "Writing | Oney Erge",
    description: DESCRIPTION,
    type: "website",
    url: "/writing/",
    images: ["/media/oney-erge-social.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Oney Erge",
    description: DESCRIPTION,
    images: ["/media/oney-erge-social.png"],
  },
};

export default function WritingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE}/writing/#blog`,
    name: "Writing by Oney Erge",
    description: DESCRIPTION,
    url: `${SITE}/writing/`,
    author: { "@id": `${SITE}/#person` },
    blogPost: writingPosts.map((post) => ({
      "@type": "TechArticle",
      "@id": `${SITE}${post.href}#article`,
      position: post.part,
      headline: post.title,
      description: post.description,
      url: `${SITE}${post.href}`,
      image: `${SITE}${post.socialImage}`,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      keywords: post.tags,
      author: { "@id": `${SITE}/#person` },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <a className={styles.skipLink} href="#all-writing">Skip to all writing</a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link className={styles.brand} href="/">Oney Erge</Link>
          <nav aria-label="Primary navigation">
            <Link className={styles.active} href="/writing/" aria-current="page">Writing</Link>
            <Link href="/#work">Projects</Link>
            <Link href="/#research">Research</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main className={styles.page}>
        <header className={styles.hero}>
          <h1>Writing</h1>
          <p><strong>{String(writingPosts.length).padStart(2, "0")}</strong> published {writingPosts.length === 1 ? "essay" : "essays"}</p>
        </header>

        <div id="all-writing">
          {writingSeries.map((series) => {
            const parts = getSeriesParts(series.id).filter((post) => post.status === "published");
            if (parts.length === 0) return null;
            const headingId = `${series.id}-heading`;
            return (
              <section className={styles.archive} id={`series-${series.id}`} key={series.id} aria-labelledby={headingId}>
                <header className={styles.sectionHeader}>
                  <h2 id={headingId}>{series.title}</h2>
                  <p>Series · {String(parts.length).padStart(2, "0")} parts · <a href={FEED_PATH}>RSS feed</a></p>
                </header>
                <p className={styles.seriesDescription}>{series.description}</p>
                <ol className={styles.archiveList}>
                  {parts.map((post) => (
                    <li key={post.slug}>
                      <Link href={post.href} aria-label={`Read Part ${post.part}: ${post.title}`}>
                        <span className={styles.archiveNumber}>{String(post.part).padStart(2, "0")}</span>
                        <div className={styles.archiveCopy}>
                          <div className={styles.archiveMeta}>
                            <span>Part {post.part}</span>
                            <time dateTime={post.datePublished}>{post.dateLabel}</time>
                            <span>{post.readingTime}</span>
                          </div>
                          <h3>{post.title}</h3>
                          <p className={styles.archiveDescription}>{post.description}</p>
                          <p className={styles.archiveSeries}>{post.tags.join(" · ")}</p>
                        </div>
                        <div className={styles.archivePreview}>
                          <WritingCover post={post} compact />
                        </div>
                        <span className={styles.archiveArrow} aria-hidden="true">
                          <svg viewBox="0 0 16 16"><path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" /></svg>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <Link className={styles.brand} href="/">Oney Erge</Link>
        <p>Applied AI and physics, research and engineering.</p>
        <p>© {SITE_YEAR} Oney Erge</p>
      </footer>
    </>
  );
}
