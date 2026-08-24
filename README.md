# Oney Erge

Source for [oneyerge.com](https://oneyerge.com), the personal site and selected work of Oney Erge.

The site is a static Next.js export deployed to GitHub Pages from the `master` branch. Project descriptions and media are based on the corresponding public repositories under [github.com/oney-erge](https://github.com/oney-erge).

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` writes the static site to `out/`. The GitHub Pages workflow publishes that directory and preserves the custom domain through `public/CNAME`.

## Search indexing

The site emits canonical URLs, crawl directives, a root sitemap with image entries, profile and project structured data, descriptive social previews, and static HTML for every project case study.

After the first deployment:

1. Verify `oneyerge.com` as a Domain property in Google Search Console using the DNS record Google provides.
2. Submit `https://oneyerge.com/sitemap.xml` in the Sitemaps report.
3. Inspect `https://oneyerge.com/` and request indexing after substantial releases.
4. Set the repository Actions variable `GOOGLE_SITE_VERIFICATION` only if Search Console gives you an HTML-tag verification token. The workflow exposes it as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` during the static build.

Technical SEO makes the site crawlable and understandable. Search growth still depends on publishing useful, link-worthy pages and earning relevant references from GitHub, LinkedIn, talks, papers, and other sites.
