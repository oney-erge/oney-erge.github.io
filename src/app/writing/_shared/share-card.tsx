import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getSeries, getWritingPost } from "@/data/writing";

/* The social preview card for one article (og:image), drawn at build time from the
   post's title and its cover figure in src/data/writing.ts. Geist is the site's own
   typeface; the TTFs and their OFL license sit in ./fonts. */

export const shareCardSize = { width: 1200, height: 630 };

const fontDir = path.join(process.cwd(), "src/app/writing/_shared/fonts");
const geistRegular = readFileSync(path.join(fontDir, "Geist-Regular.ttf"));
const geistSemiBold = readFileSync(path.join(fontDir, "Geist-SemiBold.ttf"));

const colors = {
  page: "#f7f7f4",
  ink: "#15161a",
  muted: "#626771",
  line: "#deded8",
  accent: "#3158c8",
  panel: "#0d1d3d",
  panelLabel: "#9fb7ec",
  panelText: "#d7e2f8",
};

export function renderShareCard(slug: string) {
  const post = getWritingPost(slug);
  const series = getSeries(post.seriesId);
  const kicker = `${series.collectionLabel} · ${series.itemLabel} ${post.part}`;
  const titleSize = post.title.length > 48 ? 58 : 66;
  // The cover figure must stay on one line; shrink long ones (e.g. "2.3 GB/s", "3 choices") to fit the panel.
  const metric = post.cover.metric;
  const metricSize = metric.length <= 4 ? 96 : metric.length <= 6 ? 80 : metric.length <= 8 ? 66 : 58;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "64px 72px 52px",
          background: colors.page,
          fontFamily: "Geist",
          color: colors.ink,
        }}
      >
        <div style={{ display: "flex", flex: 1, gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                color: colors.accent,
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 34,
                fontSize: titleSize,
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: -2,
              }}
            >
              {post.title}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: 410,
              padding: "36px 36px 34px",
              background: colors.panel,
              borderRadius: 28,
              color: "#ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                color: colors.panelLabel,
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 2.5,
                textTransform: "uppercase",
              }}
            >
              {post.cover.label}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: metricSize,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: -2,
                whiteSpace: "nowrap",
              }}
            >
              {metric}
            </div>
            <div style={{ display: "flex", marginTop: 18, color: colors.panelText, fontSize: 24, lineHeight: 1.3 }}>
              {post.cover.caption}
            </div>
            <div style={{ display: "flex", marginTop: 6, color: colors.panelLabel, fontSize: 20, lineHeight: 1.3 }}>
              {post.cover.note}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 44,
            paddingTop: 26,
            borderTop: `2px solid ${colors.line}`,
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", fontWeight: 600 }}>Oney Erge</div>
          <div style={{ display: "flex", color: colors.muted }}>oneyerge.com</div>
        </div>
      </div>
    ),
    {
      ...shareCardSize,
      fonts: [
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
        { name: "Geist", data: geistSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
