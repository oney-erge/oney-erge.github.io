import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("src/app/writing");
const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const blockTags = new Set(["article", "div", "dl", "figure", "footer", "h1", "h2", "h3", "header", "nav", "ol", "p", "section", "table", "ul"]);
const errors = [];
let articles = 0;
let tables = 0;

// The article fragments use explicit end tags and inline SVG/MathML. Check their
// nesting before export: browser repair of a mismatched tag breaks hydration.
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
  const file = path.join(root, entry.name, "article.html");
  const html = await readFile(file, "utf8").catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (html === null) continue;
  articles += 1;
  const stack = [];
  // Attribute values can contain >; comments can contain tag-like examples.
  const tokens = /<!--[\s\S]*?-->|<\/?([a-z][\w:-]*)\b(?:[^<>"']|"[^"]*"|'[^']*')*>/gi;
  for (const match of html.matchAll(tokens)) {
    if (!match[1]) continue;
    const tag = match[1].toLowerCase();
    const token = match[0];
    const line = html.slice(0, match.index).split("\n").length;
    const location = `${entry.name}/article.html:${line}`;
    if (token.startsWith("</")) {
      const open = stack.pop();
      if (open?.tag !== tag) {
        errors.push(`${location}: found </${tag}>, expected ${open ? `</${open.tag}> (opened on line ${open.line})` : "no closing tag"}.`);
      }
      continue;
    }
    if (blockTags.has(tag) && stack.some((open) => open.tag === "p")) {
      errors.push(`${location}: <${tag}> cannot be nested inside a paragraph.`);
    }
    if (tag === "table") {
      tables += 1;
      if (!/\bclass="[^"]*\bresponsive-table\b/.test(token)) {
        errors.push(`${location}: tables must use the shared responsive-table layout.`);
      }
    }
    if (tag === "td" && !/\bdata-label="[^"]+"/.test(token)) {
      errors.push(`${location}: table values need a data-label for the mobile layout.`);
    }
    if (!voidTags.has(tag) && !/\/\s*>$/.test(token)) stack.push({ tag, line });
  }
  for (const open of stack) {
    errors.push(`${entry.name}/article.html:${open.line}: unclosed <${open.tag}>.`);
  }
}

if (errors.length) {
  errors.forEach((error) => console.error(error));
  process.exit(1);
}
console.log(`Writing check passed: ${articles} article fragments have balanced tags and ${tables} responsive tables have mobile labels.`);
