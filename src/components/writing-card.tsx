import Link from "next/link";
import type { WritingPost } from "@/data/writing";
import styles from "./writing-card.module.css";

type CoverProps = {
  post: WritingPost;
  compact?: boolean;
};

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function WritingCover({ post, compact = false }: CoverProps) {
  return (
    <div className={`${styles.cover} ${compact ? styles.coverCompact : ""}`} aria-hidden="true">
      <div className={styles.coverTop}>
        <span>Part {String(post.part).padStart(2, "0")}</span>
        <span>{post.cover.label}</span>
      </div>
      <div className={styles.coverCore}>
        <p>{post.cover.caption}</p>
        <strong>{post.cover.metric}</strong>
        <div className={styles.memoryBar}>
          <span /><span /><span /><span /><span />
          <i />
        </div>
        <small>{post.cover.note}</small>
      </div>
      <div className={styles.coverBottom}>
        <span>Oney Erge</span>
        <span>Applied AI + systems</span>
      </div>
    </div>
  );
}

/** One part of a series. Upcoming parts are shown but not linked. */
export function WritingPartCard({ post }: { post: WritingPost }) {
  const published = post.status === "published";
  const body = (
    <>
      <WritingCover post={post} compact />
      <div className={styles.content}>
        <p className={styles.meta}>{published ? post.readingTime : "Coming soon"}</p>
        <h4>{post.title}</h4>
        <p className={styles.hook}>{post.hook}</p>
        {published && <span className={styles.readLink}>Read Part {post.part} <Arrow /></span>}
      </div>
    </>
  );

  return (
    <article className={`${styles.card} ${published ? "" : styles.upcoming}`}>
      {published ? (
        <Link className={styles.cardLink} href={post.href} aria-label={`Read Part ${post.part}: ${post.title}`}>
          {body}
        </Link>
      ) : (
        <div className={styles.cardLink}>{body}</div>
      )}
    </article>
  );
}
