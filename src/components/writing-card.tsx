import Link from "next/link";
import type { WritingPost } from "@/data/writing";
import styles from "./writing-card.module.css";

type Props = {
  post: WritingPost;
  position: number;
  layout?: "standard" | "spotlight";
};

type CoverProps = {
  post: WritingPost;
  position: number;
  compact?: boolean;
};

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function WritingCover({ post, position, compact = false }: CoverProps) {
  const number = String(position + 1).padStart(2, "0");

  return (
    <div className={`${styles.cover} ${compact ? styles.coverCompact : ""}`} aria-hidden="true">
      <div className={styles.coverTop}>
        <span>Field note / {number}</span>
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

export function WritingCard({ post, position, layout = "standard" }: Props) {
  return (
    <article className={`${styles.card} ${layout === "spotlight" ? styles.spotlight : ""}`}>
      <Link className={styles.cardLink} href={post.href} aria-label={`Read ${post.title}`}>
        <WritingCover post={post} position={position} />

        <div className={styles.content}>
          <div className={styles.meta}>
            <span>{post.series}</span>
            <time dateTime={post.datePublished}>{post.dateLabel}</time>
            <span>{post.readingTime}</span>
          </div>
          <h3>{post.title}</h3>
          <p className={styles.description}>{post.description}</p>
          <ul className={styles.tags} aria-label="Topics">
            {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <span className={styles.readLink}>Read the essay <Arrow /></span>
        </div>
      </Link>
    </article>
  );
}
