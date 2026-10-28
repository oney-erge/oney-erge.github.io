import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const OUTPUT_DIR = path.resolve("out");
const SITE_ORIGIN = "https://oneyerge.com";
const SITE_HOSTNAMES = new Set([
  "oneyerge.com",
  "www.oneyerge.com",
  "oney-erge.github.io",
]);
const ISO_DATETIME =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|([+-])(\d{2}):(\d{2}))$/;
const META_REFRESH =
  /<meta\b[^>]*\bhttp-equiv="refresh"[^>]*\bcontent="([^"]+)"[^>]*>/i;
/** A path ending in an extension is a file (feed.xml), not a page directory. */
const FILE_PATH = /\.[a-z0-9]+$/i;
const errors = [];

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function isValidIsoDatetime(value) {
  const match = ISO_DATETIME.exec(value);
  if (!match) return false;

  const [, year, month, day, hour, minute, second, , offsetHour, offsetMinute] =
    match;
  const numbers = [year, month, day, hour, minute, second].map(Number);
  const [yearNumber, monthNumber, dayNumber, hourNumber, minuteNumber, secondNumber] =
    numbers;
  const daysInMonth = new Date(
    Date.UTC(yearNumber, monthNumber, 0),
  ).getUTCDate();

  return (
    monthNumber >= 1 &&
    monthNumber <= 12 &&
    dayNumber >= 1 &&
    dayNumber <= daysInMonth &&
    hourNumber <= 23 &&
    minuteNumber <= 59 &&
    secondNumber <= 59 &&
    (offsetHour === undefined ||
      (Number(offsetHour) <= 23 && Number(offsetMinute) <= 59)) &&
    Number.isFinite(Date.parse(value))
  );
}

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listHtmlFiles(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryPath);
    }
  }

  return files;
}

function publicUrlForHtml(file) {
  const relative = path.relative(OUTPUT_DIR, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return `${SITE_ORIGIN}/`;
  if (!relative.endsWith("/index.html")) return null;

  return `${SITE_ORIGIN}/${relative.slice(0, -"index.html".length)}`;
}

function isGeneratedErrorPage(file) {
  const relative = path.relative(OUTPUT_DIR, file).replaceAll(path.sep, "/");
  return (
    relative === "404.html" ||
    relative === "404/index.html" ||
    relative.startsWith("_not-found/")
  );
}

function inspectStructuredData(value, source) {
  if (Array.isArray(value)) {
    value.forEach((item) => inspectStructuredData(item, source));
    return;
  }
  if (!value || typeof value !== "object") return;

  const schemaTypes = Array.isArray(value["@type"])
    ? value["@type"]
    : [value["@type"]];
  if (schemaTypes.includes("ProfilePage") && !("dateModified" in value)) {
    errors.push(`${source}: ProfilePage JSON-LD is missing dateModified.`);
  }
  if (schemaTypes.includes("TechArticle")) {
    for (const property of ["datePublished", "dateModified"]) {
      if (!(property in value)) {
        errors.push(`${source}: TechArticle JSON-LD is missing ${property}.`);
      }
    }
  }

  for (const [key, child] of Object.entries(value)) {
    if (["dateCreated", "dateModified", "datePublished", "uploadDate"].includes(key)) {
      if (typeof child !== "string" || !isValidIsoDatetime(child)) {
        errors.push(`${source}: ${key} must be a full, valid ISO 8601 datetime.`);
      }
    }
    inspectStructuredData(child, source);
  }
}

function localOutputPath(url) {
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "." || segment === "..")) {
    return null;
  }

  return FILE_PATH.test(pathname)
    ? path.join(OUTPUT_DIR, ...segments)
    : path.join(OUTPUT_DIR, ...segments, "index.html");
}

function parseInternalPageUrl(rawValue, sourceUrl) {
  const value = decodeHtml(rawValue.trim());
  if (!value || value.startsWith("#")) return null;

  let url;
  try {
    url = new URL(value, sourceUrl);
  } catch {
    errors.push(`${sourceUrl}: invalid link URL ${JSON.stringify(value)}.`);
    return null;
  }

  if (!SITE_HOSTNAMES.has(url.hostname)) return null;
  if (url.origin !== SITE_ORIGIN) {
    errors.push(
      `${sourceUrl}: internal link must use the canonical origin, not ${url.origin}.`,
    );
    return null;
  }
  if (url.search) {
    errors.push(`${sourceUrl}: internal page link must not contain a query string.`);
  }
  if (
    url.pathname !== "/" &&
    !url.pathname.endsWith("/") &&
    !FILE_PATH.test(url.pathname)
  ) {
    errors.push(
      `${sourceUrl}: internal page link ${url.pathname} must include its trailing slash.`,
    );
  }

  url.hash = "";
  url.search = "";
  return url;
}

/**
 * GitHub Pages cannot send HTTP redirects, so a retired URL keeps a stub page
 * whose instant meta refresh forwards to its replacement. A stub is exempt
 * from the self-canonical rule: its canonical must name the redirect target.
 * Returns the target URL, or null when the stub is malformed.
 */
function inspectRedirectStub(rawContent, sourceUrl, canonicals) {
  const content = /^\s*(\d+)\s*;\s*url=(.+)$/i.exec(decodeHtml(rawContent));
  if (!content) {
    errors.push(`${sourceUrl}: meta refresh must have the form "0; url=<target>".`);
    return null;
  }
  if (content[1] !== "0") {
    errors.push(
      `${sourceUrl}: redirect stub must refresh after 0 seconds to count as a permanent redirect.`,
    );
  }

  const target = parseInternalPageUrl(content[2], sourceUrl);
  if (!target) {
    errors.push(`${sourceUrl}: redirect stub must point to a page on this site.`);
    return null;
  }
  if (canonicals.length !== 1 || canonicals[0] !== target.href) {
    errors.push(
      `${sourceUrl}: redirect stub needs exactly one canonical link, pointing to ${target.href}.`,
    );
  }

  return target.href;
}

try {
  await access(OUTPUT_DIR);
} catch {
  console.error("SEO check needs a static export. Run `npm run build` first.");
  process.exit(1);
}

const htmlFiles = await listHtmlFiles(OUTPUT_DIR);
const canonicalPages = new Map();
const redirectStubs = new Map();
let structuredDataDates = 0;
let shareImages = 0;

for (const file of htmlFiles) {
  if (isGeneratedErrorPage(file)) continue;

  const expectedUrl = publicUrlForHtml(file);
  if (!expectedUrl) continue;

  const html = await readFile(file, "utf8");
  const canonicalMatches = [
    ...html.matchAll(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"[^>]*>/gi),
  ];

  const refresh = META_REFRESH.exec(html);
  if (refresh) {
    const target = inspectRedirectStub(
      refresh[1],
      expectedUrl,
      canonicalMatches.map((match) => decodeHtml(match[1])),
    );
    if (target) redirectStubs.set(expectedUrl, target);
    continue;
  }

  if (canonicalMatches.length !== 1) {
    errors.push(
      `${expectedUrl}: expected exactly one canonical link, found ${canonicalMatches.length}.`,
    );
  } else {
    const canonical = decodeHtml(canonicalMatches[0][1]);
    if (canonical !== expectedUrl) {
      errors.push(`${expectedUrl}: canonical points to ${canonical}.`);
    } else {
      canonicalPages.set(canonical, file);
    }
  }

  // Social preview images on this site must exist in the export (they are generated at build time).
  for (const match of html.matchAll(/<meta\b[^>]*\bproperty="og:image"[^>]*\bcontent="([^"]+)"[^>]*>/gi)) {
    let url;
    try {
      url = new URL(decodeHtml(match[1]));
    } catch {
      errors.push(`${expectedUrl}: invalid og:image URL ${match[1]}.`);
      continue;
    }
    if (!SITE_HOSTNAMES.has(url.hostname)) continue;
    try {
      await access(localOutputPath(url));
      shareImages += 1;
    } catch {
      errors.push(`${expectedUrl}: og:image ${url.href} has no generated file.`);
    }
  }

  for (const match of html.matchAll(
    /<script\b[^>]*\btype="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const data = JSON.parse(match[1]);
      const before = errors.length;
      inspectStructuredData(data, expectedUrl);
      if (errors.length === before) {
        const serialized = JSON.stringify(data);
        structuredDataDates += [
          ...serialized.matchAll(/"(?:date(?:Created|Modified|Published)|uploadDate)":/g),
        ].length;
      }
    } catch (error) {
      errors.push(`${expectedUrl}: invalid JSON-LD (${error.message}).`);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/gi)) {
    const url = parseInternalPageUrl(match[1], expectedUrl);
    if (!url) continue;

    const target = localOutputPath(url);
    if (!target) {
      errors.push(`${expectedUrl}: cannot map internal link ${url.href} to output.`);
      continue;
    }
    try {
      await access(target);
    } catch {
      errors.push(
        `${expectedUrl}: internal link ${url.href} has no generated page or file.`,
      );
    }
  }
}

for (const [stub, target] of redirectStubs) {
  if (!canonicalPages.has(target)) {
    errors.push(`${stub}: redirect stub points to ${target}, which is not a canonical page.`);
  }
}

const sitemapPath = path.join(OUTPUT_DIR, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8").catch(() => null);
const sitemapUrls = new Set();
let sitemapLastModifiedDates = 0;

if (sitemap === null) {
  errors.push("The static export is missing sitemap.xml.");
} else {
  for (const match of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
    const location = /<loc>([^<]+)<\/loc>/i.exec(match[1]);
    if (!location) {
      errors.push("sitemap.xml contains a URL entry without a location.");
      continue;
    }

    const value = decodeHtml(location[1].trim());
    let url;
    try {
      url = new URL(value);
    } catch {
      errors.push(`sitemap.xml contains an invalid URL: ${value}.`);
      continue;
    }

    if (
      url.origin !== SITE_ORIGIN ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      errors.push(`sitemap.xml contains a non-canonical URL: ${value}.`);
    }
    if (url.pathname !== "/" && !url.pathname.endsWith("/")) {
      errors.push(`sitemap.xml page URL must include its trailing slash: ${value}.`);
    }
    if (sitemapUrls.has(value)) {
      errors.push(`sitemap.xml contains a duplicate URL: ${value}.`);
    }
    sitemapUrls.add(value);

    if (!canonicalPages.has(value)) {
      errors.push(`sitemap.xml URL has no matching self-canonical HTML page: ${value}.`);
    }

    const lastModified = /<lastmod>([^<]+)<\/lastmod>/i.exec(match[1]);
    if (!lastModified || !isValidIsoDatetime(lastModified[1].trim())) {
      errors.push(`${value}: sitemap lastmod must be a full, valid ISO 8601 datetime.`);
    } else {
      sitemapLastModifiedDates += 1;
    }
  }
}

const robotsPath = path.join(OUTPUT_DIR, "robots.txt");
const robots = await readFile(robotsPath, "utf8").catch(() => null);
if (robots === null) {
  errors.push("The static export is missing robots.txt.");
} else {
  if (!/^User-Agent:\s*\*\s*$/im.test(robots)) {
    errors.push("robots.txt is missing the all-crawlers user-agent rule.");
  }
  if (!/^Allow:\s*\/\s*$/im.test(robots)) {
    errors.push("robots.txt does not allow crawling from the site root.");
  }
  if (!/^Sitemap:\s*https:\/\/oneyerge\.com\/sitemap\.xml\s*$/im.test(robots)) {
    errors.push("robots.txt does not advertise the canonical sitemap URL.");
  }
}

const feedPath = path.join(OUTPUT_DIR, "feed.xml");
const feed = await readFile(feedPath, "utf8").catch(() => null);
let feedItems = 0;
if (feed === null) {
  errors.push("The static export is missing feed.xml.");
} else {
  for (const match of feed.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const link = /<link>([^<]+)<\/link>/i.exec(match[1]);
    const value = link ? decodeHtml(link[1].trim()) : null;
    if (!value || !canonicalPages.has(value)) {
      errors.push(
        `feed.xml item does not link to a self-canonical page: ${value ?? "(no link)"}.`,
      );
    } else {
      feedItems += 1;
    }
  }
}

if (errors.length > 0) {
  console.error(`SEO check failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `SEO check passed: ${canonicalPages.size} self-canonical pages, ` +
    `${redirectStubs.size} redirect stubs, ${sitemapUrls.size} sitemap URLs, ` +
    `${feedItems} feed items, ${shareImages} share images, ${structuredDataDates} structured-data dates, ` +
    `and ${sitemapLastModifiedDates} sitemap dates validated.`,
);
