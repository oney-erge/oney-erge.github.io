import Link from "next/link";
import type { WritingPost, WritingSeries } from "@/data/writing";
import styles from "./writing-series.module.css";

function Play() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5 3.5v9l7-4.5z" />
    </svg>
  );
}

/** One series on the home page: its title and a numbered list of its parts, one line each. */
export function WritingSeriesList({ series, parts }: { series: WritingSeries; parts: WritingPost[] }) {
  const headingId = `home-series-${series.id}`;

  return (
    <div className={styles.series}>
      <p className={styles.kicker}>{series.collectionLabel}</p>
      <h3 id={headingId}>{series.title}</h3>
      <ol className={styles.parts} aria-labelledby={headingId}>
        {parts.map((post) => {
          const body = (
            <>
              <span className={styles.number}>{post.part}</span>
              <span className={styles.name}>
                {post.shortTitle}
                {post.badge && <span className={styles.badge}>{post.badge}</span>}
              </span>
              <span className={styles.time}>
                {post.status === "published" ? post.readingTime.replace(" read", "") : "Soon"}
              </span>
            </>
          );
          return (
            <li key={post.slug}>
              {post.status === "published" ? (
                <Link className={styles.part} href={post.href} title={post.title}>{body}</Link>
              ) : (
                <span className={`${styles.part} ${styles.upcoming}`}>{body}</span>
              )}
            </li>
          );
        })}
      </ol>
      {series.trailer && (
        <a className={styles.video} href={series.trailer.src}>
          <Play /> {series.trailer.title}
        </a>
      )}
    </div>
  );
}
