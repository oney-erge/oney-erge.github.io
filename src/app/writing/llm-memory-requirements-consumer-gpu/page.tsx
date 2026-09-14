/* eslint-disable @next/next/no-html-link-for-pages -- static GitHub Pages navigation */
import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { SITE, SITE_YEAR } from "@/data/site";
import { getWritingPost } from "@/data/writing";
import { PostFigures } from "./post-figures";
import "./article.css";
import styles from "./page.module.css";

const SLUG = "llm-memory-requirements-consumer-gpu";
const POST = getWritingPost(SLUG);
const PATH = POST.href;
const TITLE = POST.title;
const DESCRIPTION = POST.description;

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
    publishedTime: POST.datePublished,
    modifiedTime: POST.dateModified,
    authors: [`${SITE}/`],
    tags: POST.tags,
    images: [{ url: POST.socialImage, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [POST.socialImage],
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
    image: `${SITE}${POST.socialImage}`,
    datePublished: POST.datePublished,
    dateModified: POST.dateModified,
    author: { "@id": `${SITE}/#person` },
    mainEntityOfPage: canonical,
    isPartOf: { "@id": `${SITE}/writing/#blog` },
    keywords: POST.tags,
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
