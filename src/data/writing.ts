export type WritingSeries = {
  id: string;
  title: string;
  /** Short label shown above the collection title. */
  collectionLabel: string;
  /** Name used with the part number in navigation. */
  itemLabel: string;
  description: string;
  /** Short narrated video, linked from the home page. */
  trailer?: {
    src: string;
    title: string;
  };
};

export type WritingPost = {
  slug: string;
  href: string;
  title: string;
  /** Page title for search results and link previews, when the visible title uses a label people do not search for. */
  searchTitle?: string;
  /** One line used in series lists. */
  hook: string;
  description: string;
  seriesId: string;
  part: number;
  /** "upcoming" parts are listed in their series but not linked, indexed, or added to the feed. */
  status: "published" | "upcoming";
  datePublished: string;
  dateModified: string;
  dateLabel: string;
  readingTime: string;
  tags: string[];
  /** Figure shown on the post's share card (share.png in its folder). */
  cover: {
    label: string;
    metric: string;
    caption: string;
    note: string;
  };
  /** The narrated video embedded in article.html, described to search engines as a VideoObject. */
  video?: {
    name: string;
    description: string;
    src: string;
    poster: string;
    /** ISO 8601 duration, e.g. "PT3M". */
    duration: string;
    uploadDate: string;
  };
};

export const WRITING_DESCRIPTION =
  "Technical articles by Oney Erge on running large language models with limited GPU memory: memory budgets, context length, streamed inference, weight placement, and speculative decoding.";

export const writingSeries: WritingSeries[] = [
  {
    id: "small-gpus",
    title: "Large Language Models on Limited GPUs",
    collectionLabel: "LLM inference",
    itemLabel: "Article",
    description:
      "Four articles on fitting a model, reserving context memory, moving weights, and choosing their placement.",
    trailer: {
      src: "/media/h65-explainer-3min.mp4",
      title: "Video overview · 3 min",
    },
  },
  {
    id: "speculative-decoding",
    title: "Speculative Decoding for Streamed LLM Inference",
    collectionLabel: "Speculative decoding",
    itemLabel: "Article",
    description:
      "Two articles on using draft models to reduce expensive target-model passes.",
  },
];

/** Every post, published or upcoming, in series order. */
const allPosts: WritingPost[] = [
  {
    slug: "llm-memory-requirements-consumer-gpu",
    href: "/writing/llm-memory-requirements-consumer-gpu/",
    title: "How to Run a 14B Model on an 8 GB GPU",
    hook: "Qwen3-14B has 29.5 GB of released BF16 weights. This article explains the memory budget and how streamed execution makes the model run on an 8 GB GPU.",
    description:
      "A memory budget and streamed execution for running Qwen3-14B's released BF16 weights when they exceed GPU memory.",
    seriesId: "small-gpus",
    part: 1,
    status: "published",
    datePublished: "2026-09-13T12:00:00-05:00",
    dateModified: "2026-10-22T12:04:43-05:00",
    dateLabel: "September 13, 2026",
    readingTime: "6 min read",
    tags: ["GPU memory", "LLM inference", "BF16"],
    cover: {
      label: "Model memory map",
      metric: "29.5 GB",
      caption: "Qwen3-14B · BF16 weights",
      note: "Measured against an 8 GB laptop GPU",
    },
  },
  {
    slug: "kv-cache-streamed-inference-consumer-gpu",
    href: "/writing/kv-cache-streamed-inference-consumer-gpu/",
    title: "How Context Length Affects GPU Memory",
    hook: "The KV cache grows with context length. This article calculates its cost for Qwen3-14B and shows why model weights are only part of the GPU-memory budget.",
    description:
      "How the KV cache grows with context length and changes the available memory for a streamed Qwen3-14B run.",
    seriesId: "small-gpus",
    part: 2,
    status: "published",
    datePublished: "2026-10-14T18:00:00-05:00",
    dateModified: "2026-10-22T12:04:43-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "5 min read",
    tags: ["KV cache", "LLM inference", "Streaming"],
    cover: {
      label: "KV cache",
      metric: "5.4 GB",
      caption: "Qwen3-14B · 32K tokens",
      note: "On top of the weights",
    },
  },
  {
    slug: "moving-weights-storage-to-gpu",
    href: "/writing/moving-weights-storage-to-gpu/",
    title: "Why Weight Offloading Slows Inference",
    hook: "Each streamed tensor is read, decompressed, and copied to the GPU. The timing shows which steps delay generation.",
    description:
      "Storage reads, decompression, and transfers in streamed LLM inference, with measured bottlenecks.",
    seriesId: "small-gpus",
    part: 3,
    status: "published",
    datePublished: "2026-10-14T18:00:00-05:00",
    dateModified: "2026-10-22T12:04:43-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "5 min read",
    tags: ["Memory hierarchy", "Lossless compression", "Prefetching"],
    cover: {
      label: "Weight transfer",
      metric: "2.3 GB/s",
      caption: "Cold SSD read · laptop",
      note: "The slowest step of the trip",
    },
  },
  {
    slug: "schedule-aware-exact-weight-placement",
    href: "/writing/schedule-aware-exact-weight-placement/",
    title: "How H6.5 Optimizes Weight Placement",
    searchTitle: "Exact Weight Placement for LLMs with Limited GPU Memory (H6.5)",
    hook: "H6.5 chooses where to keep model weights so the GPU spends less time waiting for them.",
    description:
      "How H6.5 decides which LLM weights stay on the GPU, in RAM, or on the SSD, so Llama-3.3-70B on a 32 GB GPU waits less: 23% lower peak GPU memory and about 13% faster requests.",
    seriesId: "small-gpus",
    part: 4,
    status: "published",
    datePublished: "2026-10-14T18:00:00-05:00",
    dateModified: "2026-10-27T20:07:02-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "5 min read",
    tags: ["Weight placement", "H6.5"],
    cover: {
      label: "H6.5 result",
      metric: "−23%",
      caption: "Peak GPU memory · Llama-3.3-70B",
      note: "Lower in all 20 matched requests",
    },
    video: {
      name: "H6.5 explained in 3 minutes: exact weight placement on limited GPU memory",
      description:
        "Why a 141 GB model has to stream its weights to a 32 GB GPU, why that trip makes the GPU wait, and how H6.5 chooses which weights to keep close.",
      src: "/media/h65-explainer-3min.mp4",
      poster: "/media/h65-explainer-poster.jpg",
      duration: "PT3M",
      uploadDate: "2026-10-14T18:00:00-05:00",
    },
  },
  {
    slug: "speculative-decoding-streamed-inference",
    href: "/writing/speculative-decoding-streamed-inference/",
    title: "How Speculative Decoding Speeds Up Inference",
    hook: "A small draft model proposes tokens before the large model verifies them. Qwen3-14B fell from 17.4 to 9.2 seconds per token on an 8 GB GPU.",
    description:
      "How speculative decoding reduces target-model passes, measured with Qwen3-14B on an 8 GB laptop GPU.",
    seriesId: "speculative-decoding",
    part: 1,
    status: "published",
    datePublished: "2026-10-14T19:00:00-05:00",
    dateModified: "2026-10-22T12:04:43-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "6 min read",
    tags: ["Speculative decoding", "LLM inference", "Streaming"],
    cover: {
      label: "Fixed speculation",
      metric: "9.2 s",
      caption: "Per token · Qwen3-14B · 3.8 GB",
      note: "17 s per token without speculation",
    },
  },
  {
    slug: "speculative-decoding-variants",
    href: "/writing/speculative-decoding-variants/",
    title: "Speculative Decoding: Draft Models, Draft Length, and Trees",
    hook: "Draft source, proposed length, and verification shape determine speculative-decoding efficiency. This article compares the main choices and small laptop tests.",
    description:
      "How draft source, draft length, and tree verification affect speculative decoding for streamed models.",
    seriesId: "speculative-decoding",
    part: 2,
    status: "published",
    datePublished: "2026-10-14T19:00:00-05:00",
    dateModified: "2026-10-22T12:04:43-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "4 min read",
    tags: ["Speculative decoding", "Self-speculation", "Token trees"],
    cover: {
      label: "Variants",
      metric: "3 choices",
      caption: "In every speculative decoder",
      note: "Draft source, length, and shape",
    },
  },
];

/** Published posts, newest first. Used by the writing index, feed, and sitemap. */
export const writingPosts: WritingPost[] = allPosts
  .filter((post) => post.status === "published")
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished) || b.part - a.part);

export function getSeries(id: string): WritingSeries {
  const series = writingSeries.find((candidate) => candidate.id === id);
  if (!series) throw new Error(`Unknown writing series: ${id}`);
  return series;
}

/** Every part of a series, published or upcoming, in order. */
export function getSeriesParts(id: string): WritingPost[] {
  return allPosts.filter((post) => post.seriesId === id).sort((a, b) => a.part - b.part);
}

export function seriesLabel(post: WritingPost): string {
  return `${getSeries(post.seriesId).title} · Part ${post.part}`;
}

/** The post's social preview image, drawn at build time by its share.png route. */
export function shareImagePath(post: WritingPost): string {
  return `${post.href}share.png`;
}

export function getWritingPost(slug: string): WritingPost {
  const post = allPosts.find((candidate) => candidate.slug === slug);
  if (!post) throw new Error(`Unknown writing post: ${slug}`);
  return post;
}
