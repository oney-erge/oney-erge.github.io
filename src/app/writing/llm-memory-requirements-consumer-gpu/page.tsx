/* eslint-disable @next/next/no-html-link-for-pages -- static GitHub Pages navigation */
import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { SITE, SITE_YEAR } from "@/data/site";
import { PostFigures } from "./post-figures";
import "./article.css";
import styles from "./page.module.css";

const SLUG = "llm-memory-requirements-consumer-gpu";
const PATH = `/writing/${SLUG}/`;
const TITLE = "Memory requirements of language model inference on a consumer GPU";
const DESCRIPTION =
  "What occupies GPU memory while a language model runs, calculated for Qwen3-14B on an 8 GB laptop GPU: system use, number formats, model parts, and the KV cache.";

/* The article body is shared with the standalone artifact build; edit article.html, not this file.
   Read per render so `next dev` picks up edits; the static export reads it once at build time. */
function readArticle() {
  return readFileSync(path.join(process.cwd(), "src/app/writing", SLUG, "article.html"), "utf8");
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: ["LLM GPU memory", "KV cache", "BF16", "quantization", "embedding table", "Qwen3-14B", "Afterimage"],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: PATH,
    siteName: "Oney Erge",
    images: [{ url: "/media/afterimage-social.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/media/afterimage-social.png"],
  },
};

export default function MemoryRequirementsArticle() {
  const canonical = `${SITE}${PATH}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonical}#article`,
    headline: TITLE,
    description: DESCRIPTION,
    url: canonical,
    image: `${SITE}/media/afterimage-social.png`,
    datePublished: "2026-09-13T12:00:00-05:00",
    dateModified: "2026-09-13T12:00:00-05:00",
    author: { "@id": `${SITE}/#person` },
    about: ["GPU memory", "KV cache", "large language model inference"],
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
            <a href="/#work">Projects</a>
            <a href="/#research">Research</a>
            <a href="/#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><span>Writing</span>
        </nav>
        <div dangerouslySetInnerHTML={{ __html: readArticle() }} />
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
