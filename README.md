# Oney Erge

Source for [oneyerge.com](https://oneyerge.com), the personal site and selected work of Oney Erge.

The site is a static Next.js export deployed to GitHub Pages from the `main` branch. Project descriptions and media are based on the corresponding public repositories under [github.com/oney-erge](https://github.com/oney-erge).

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
npm run check:seo
```

`npm run build` writes the static site to `out/`. Run `npm run check:seo` after it to verify the generated canonical URLs, internal links, redirect stubs, sitemap, robots file, RSS feed, and structured-data datetimes. The GitHub Pages workflow runs the same gate before publishing that directory and preserves the custom domain through `public/CNAME`.

Before building, `npm run check:writing` checks the article fragments for mismatched HTML tags and missing mobile table labels. It also runs automatically as the build's precheck.

## Projects

Each project card on the homepage links straight to its GitHub repository. The card text lives in `src/data/projects.ts`.

The earlier `/work/<slug>/` case-study pages are retired. GitHub Pages cannot send HTTP redirects, so each of those addresses remains as a small stub that forwards to the matching card on the homepage (`/#project-<slug>`). Keep a project's `slug` unchanged so those links keep working.

## Search indexing

The site emits canonical URLs, crawl directives, a root sitemap with image entries, profile and article structured data, descriptive social previews, and an RSS feed for the writing at `/feed.xml`.

Each article has its own social preview image at `/writing/<slug>/share.png`. Its `share.png/route.tsx` draws the card at build time from the post's title and `cover` figure in `src/data/writing.ts` (see `src/app/writing/_shared/share-card.tsx`; the Geist font files and their OFL license are in `_shared/fonts`). A new article needs the same one-line route.

After the first deployment:

1. Verify `oneyerge.com` as a Domain property in Google Search Console using the DNS record Google provides.
2. Submit `https://oneyerge.com/sitemap.xml` in the Sitemaps report.
3. Inspect `https://oneyerge.com/` and request indexing after substantial releases.
4. Set the repository Actions variable `GOOGLE_SITE_VERIFICATION` only if Search Console gives you an HTML-tag verification token. The workflow exposes it as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` during the static build.

Deployments also submit the sitemap URLs to IndexNow after GitHub Pages finishes. The public key is stored at the site root and the submission script is available as `npm run indexnow`.

## Analytics

The site includes a Google Analytics 4 integration that is disabled until a valid measurement ID is configured. Create a GA4 web data stream for `https://oneyerge.com`, then add its `G-...` measurement ID as the repository Actions variable `GOOGLE_ANALYTICS_ID`. The next deployment will include the Google tag. No placeholder ID or third-party analytics account is committed to the repository.

GA4's enhanced measurement records a click on a project card as an outbound `click` event with the repository URL, so the site needs no extra tracking code for that. Emailed summaries are set up inside GA4 (Share, then Schedule email, on any report).

Technical SEO makes the site crawlable and understandable. Search growth still depends on publishing useful, link-worthy pages and earning relevant references from GitHub, LinkedIn, talks, papers, and other sites.

## License

The site's source code is under the [MIT license](LICENSE). The writing, images, video and
other media (the posts and pages in `src/` and the files in `public/media/` and
`public/brands/`) are © Oney Erge, all rights reserved.
