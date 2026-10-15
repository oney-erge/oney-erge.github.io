export type WritingSeries = {
  id: string;
  title: string;
  /** Name of the collection, such as "Guide" or "Speed notes". */
  collectionLabel: string;
  /** Name of one post in it, used with its number: "Guide 3", "Speed note 1". */
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
  /** Few-word title for the one-line part lists on the home page. */
  shortTitle: string;
  /** Optional label shown next to the short title, such as "Paper". */
  badge?: string;
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
  socialImage: string;
  cover: {
    label: string;
    metric: string;
    caption: string;
    note: string;
  };
};

export const WRITING_DESCRIPTION =
  "Practical notes by Oney Erge on running large language models on small GPUs: what must fit, what makes streaming slow, and the measured ways to improve it.";

export const writingSeries: WritingSeries[] = [
  {
    id: "small-gpus",
    title: "Start here: run a model that does not fit",
    collectionLabel: "Guide",
    itemLabel: "Guide",
    description:
      "Four connected notes: why the model does not fit, how streaming works, where time goes, and how H6.5 chooses what stays close to the GPU.",
    trailer: {
      src: "/media/h65-explainer-1min.mp4",
      title: "Watch my paper in one minute",
    },
  },
  {
    id: "speculative-decoding",
    title: "Then make streamed inference faster",
    collectionLabel: "Speed notes",
    itemLabel: "Speed note",
    description:
      "A small draft model can let one slow pass produce several tokens. These notes show the measurement first, then the main variants.",
  },
];

/** Every post, published or upcoming, in series order. */
const allPosts: WritingPost[] = [
  {
    slug: "llm-memory-requirements-consumer-gpu",
    href: "/writing/llm-memory-requirements-consumer-gpu/",
    title: "Why a 14B model does not fit in 8 GB",
    shortTitle: "Why it does not fit",
    hook: "Qwen3-14B needs 29.5 GB for its released BF16 weights. This is where the GPU memory goes.",
    description:
      "A memory map for Qwen3-14B on an 8 GB laptop GPU, using the released BF16 weights.",
    seriesId: "small-gpus",
    part: 1,
    status: "published",
    datePublished: "2026-09-13T12:00:00-05:00",
    dateModified: "2026-10-14T23:40:52-05:00",
    dateLabel: "September 13, 2026",
    readingTime: "7 min read",
    tags: ["GPU memory", "LLM inference", "BF16"],
    socialImage: "/media/afterimage-social.png",
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
    title: "The memory that grows with every token",
    shortTitle: "Memory that grows",
    hook: "The KV cache grows with the conversation. Streaming lets the model run without loading all 29.5 GB at once.",
    description:
      "How the KV cache grows, and a measured streamed run of Qwen3-14B under 2 GB of GPU memory.",
    seriesId: "small-gpus",
    part: 2,
    status: "published",
    datePublished: "2026-10-14T18:00:00-05:00",
    dateModified: "2026-10-14T23:40:52-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "7 min read",
    tags: ["KV cache", "LLM inference", "Streaming"],
    socialImage: "/media/afterimage-social.png",
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
    title: "Why streamed models are slow",
    shortTitle: "Why streaming is slow",
    hook: "A streamed weight must be read, unpacked, and copied. Only late work makes the GPU wait.",
    description:
      "One weight's path from SSD to GPU, the measured bottleneck, and the work worth keeping close.",
    seriesId: "small-gpus",
    part: 3,
    status: "published",
    datePublished: "2026-10-14T18:00:00-05:00",
    dateModified: "2026-10-14T23:40:52-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "6 min read",
    tags: ["Memory hierarchy", "Lossless compression", "Prefetching"],
    socialImage: "/media/afterimage-social.png",
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
    title: "Which weights should stay near the GPU?",
    shortTitle: "Which weights stay close?",
    badge: "Paper",
    hook: "H6.5 replays a recorded request to spend scarce GPU and RAM on work that makes the GPU wait.",
    description:
      "A plain-language summary of the H6.5 paper and its measured exact-weight placement results.",
    seriesId: "small-gpus",
    part: 4,
    status: "published",
    datePublished: "2026-10-14T18:00:00-05:00",
    dateModified: "2026-10-14T23:50:22-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "6 min read",
    tags: ["Weight placement", "H6.5", "Paper"],
    socialImage: "/media/afterimage-social.png",
    cover: {
      label: "H6.5 result",
      metric: "−23%",
      caption: "Peak GPU memory · Llama-3.3-70B",
      note: "Lower in all 20 matched requests",
    },
  },
  {
    slug: "speculative-decoding-streamed-inference",
    href: "/writing/speculative-decoding-streamed-inference/",
    title: "How one slow pass can generate several tokens",
    shortTitle: "Several tokens per pass",
    hook: "A small draft model guesses ahead so the large model can check several tokens in one slow pass.",
    description:
      "Speculative decoding explained with a measured Qwen3-14B run on an 8 GB laptop GPU.",
    seriesId: "speculative-decoding",
    part: 1,
    status: "published",
    datePublished: "2026-10-14T19:00:00-05:00",
    dateModified: "2026-10-14T23:40:52-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "7 min read",
    tags: ["Speculative decoding", "LLM inference", "Streaming"],
    socialImage: "/media/afterimage-social.png",
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
    title: "Three ways to improve speculative decoding",
    shortTitle: "Three ways to improve it",
    hook: "Choose the draft source, its length, and whether the large model checks one guess or a tree.",
    description:
      "A practical comparison of draft source, draft length, and tree checking, with two small laptop measurements.",
    seriesId: "speculative-decoding",
    part: 2,
    status: "published",
    datePublished: "2026-10-14T19:00:00-05:00",
    dateModified: "2026-10-14T23:40:52-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "5 min read",
    tags: ["Speculative decoding", "Self-speculation", "Token trees"],
    socialImage: "/media/afterimage-social.png",
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

export function getWritingPost(slug: string): WritingPost {
  const post = allPosts.find((candidate) => candidate.slug === slug);
  if (!post) throw new Error(`Unknown writing post: ${slug}`);
  return post;
}
