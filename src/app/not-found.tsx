/* eslint-disable @next/next/no-html-link-for-pages -- GitHub Pages uses full-document navigation without RSC prefetch dependencies. */
import type { Metadata } from "next";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has moved.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>404</p>
      <h1>This page doesn&apos;t exist.</h1>
      <p>The link may be out of date, or the page may have moved. Here are some places to go instead.</p>
      <nav className={styles.actions} aria-label="Suggested pages">
        <a href="/">Home <Arrow /></a>
        <a href="/#work">Selected work <Arrow /></a>
        <a href="/#contact">Contact <Arrow /></a>
      </nav>
    </main>
  );
}
