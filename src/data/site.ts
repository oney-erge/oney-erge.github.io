export const SITE = "https://oneyerge.com";

/**
 * Full ISO 8601 timestamps, including the timezone offset. Google types
 * ProfilePage dateCreated/dateModified as DateTime, so a date-only value is
 * rejected as an invalid datetime. Update these when the content changes.
 */
export const SITE_PUBLISHED = "2026-08-24T20:58:54-05:00";
export const SITE_MODIFIED = "2026-08-24T23:49:16-05:00";

/**
 * Footer copyright year, derived from SITE_MODIFIED instead of the build
 * clock. `output: "export"` bakes `new Date()` in at build time, so it goes
 * stale the moment a year turns without a rebuild; this stays correct as
 * long as SITE_MODIFIED is kept current.
 */
export const SITE_YEAR = new Date(SITE_MODIFIED).getUTCFullYear();
