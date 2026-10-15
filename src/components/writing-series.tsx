import Link from "next/link";
import { WritingPartCard } from "@/components/writing-card";
import type { WritingPost, WritingSeries } from "@/data/writing";
import styles from "./writing-series.module.css";

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

/** A series on the home page: its introduction, optional narrated trailer, and every part in order. */
export function WritingSeriesFeature({ series, parts }: { series: WritingSeries; parts: WritingPost[] }) {
  const first = parts.find((post) => post.status === "published");
  const published = parts.filter((post) => post.status === "published").length;
  const headingId = `series-${series.id}`;

  const cards = (
    <ol className={styles.parts} data-count={parts.length}>
      {parts.map((post) => (
        <li key={post.slug}>
          <WritingPartCard post={post} />
        </li>
      ))}
    </ol>
  );

  return (
    <div className={styles.series} aria-labelledby={headingId} role="group">
      <div className={`${styles.intro} ${series.trailer ? "" : styles.introCards}`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            Series · {parts.length} parts{published < parts.length ? ` · ${published} published` : ""}
          </p>
          <h3 id={headingId}>{series.title}</h3>
          <p className={styles.description}>{series.description}</p>
          {first && (
            <Link className={styles.start} href={first.href}>
              Start with Part {first.part} <Arrow />
            </Link>
          )}
        </div>
        {series.trailer ? (
          <figure className={styles.trailer}>
            <video controls preload="none" playsInline poster={series.trailer.poster}>
              <source src={series.trailer.src} type="video/mp4" />
              <a href={series.trailer.src}>Download the video (MP4)</a>
            </video>
            <figcaption>{series.trailer.title} · narrated, with captions</figcaption>
          </figure>
        ) : (
          cards
        )}
      </div>
      {series.trailer && cards}
    </div>
  );
}
