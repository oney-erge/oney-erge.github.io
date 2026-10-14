import { FEED_PATH, FEED_TITLE, SITE, SITE_MODIFIED } from "@/data/site";
import { WRITING_DESCRIPTION, writingPosts } from "@/data/writing";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 requires RFC 822 dates, which is what toUTCString() produces. */
function rssDate(isoDatetime: string) {
  return new Date(isoDatetime).toUTCString();
}

export function GET() {
  const items = writingPosts.map((post) => {
    const url = `${SITE}${post.href}`;

    return [
      "    <item>",
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${rssDate(post.datePublished)}</pubDate>`,
      `      <description>${escapeXml(post.description)}</description>`,
      ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      "    </item>",
    ].join("\n");
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${SITE}/writing/</link>`,
    `    <description>${escapeXml(WRITING_DESCRIPTION)}</description>`,
    "    <language>en-us</language>",
    `    <lastBuildDate>${rssDate(writingPosts[0]?.dateModified ?? SITE_MODIFIED)}</lastBuildDate>`,
    `    <atom:link href="${SITE}${FEED_PATH}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
