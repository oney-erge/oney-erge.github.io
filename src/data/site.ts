export const SITE = "https://oneyerge.com";

export const FEED_PATH = "/feed.xml";
export const FEED_TITLE = "Writing by Oney Erge";

/**
 * Feed autodiscovery for `metadata.alternates`. Next.js merges metadata
 * shallowly, so a page that sets its own canonical must spread this in again
 * or it drops the feed link the root layout declares.
 */
export const FEED_ALTERNATES = {
  types: { "application/rss+xml": [{ url: FEED_PATH, title: FEED_TITLE }] },
};

/**
 * Full ISO 8601 timestamps, including the timezone offset. Google types
 * ProfilePage dateCreated/dateModified as DateTime, so a date-only value is
 * rejected as an invalid datetime. Update these when the content changes.
 */
export const SITE_PUBLISHED = "2026-08-24T20:58:54-05:00";
export const SITE_MODIFIED = "2026-10-13T21:55:00-05:00";

/**
 * Footer copyright year, derived from SITE_MODIFIED instead of the build
 * clock. `output: "export"` bakes `new Date()` in at build time, so it goes
 * stale the moment a year turns without a rebuild; this stays correct as
 * long as SITE_MODIFIED is kept current.
 */
export const SITE_YEAR = new Date(SITE_MODIFIED).getUTCFullYear();
