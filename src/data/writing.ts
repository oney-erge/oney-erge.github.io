export type WritingSeries = {
  id: string;
  title: string;
  description: string;
  /** Short narrated video that introduces the whole series. */
  trailer?: {
    src: string;
    poster: string;
    title: string;
  };
};

export type WritingPost = {
  slug: string;
  href: string;
  title: string;
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
  "Long-form technical writing by Oney Erge about language models, local AI, inference systems, agents, simulation, and the measurements behind the work.";

export const writingSeries: WritingSeries[] = [
  {
    id: "small-gpus",
    title: "Running large language models on small GPUs",
    description:
      "Four short parts, from what fills GPU memory to the schedule-aware weight placement in my paper, using exact weights throughout.",
    trailer: {
      src: "/media/h65-explainer-1min.mp4",
      poster: "/media/h65-explainer-1min-poster.jpg",
      title: "The series in one minute",
    },
  },
];

/** Every post, published or upcoming, in series order. */
const allPosts: WritingPost[] = [
  {
    slug: "llm-memory-requirements-consumer-gpu",
    href: "/writing/llm-memory-requirements-consumer-gpu/",
    title: "Memory requirements of language model inference on a consumer GPU",
    hook: "What has to fit in GPU memory, and why a 14B model's weights do not.",
    description:
      "What occupies GPU memory while a language model runs, calculated for Qwen3-14B on an 8 GB laptop GPU: system use, number formats, and the weights of each model part.",
    seriesId: "small-gpus",
    part: 1,
    status: "published",
    datePublished: "2026-09-13T12:00:00-05:00",
    dateModified: "2026-10-14T18:00:00-05:00",
    dateLabel: "September 13, 2026",
    readingTime: "8 min read",
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
    title: "KV cache memory and streamed inference on a consumer GPU",
    hook: "The memory that grows with the conversation, and running the model one part at a time.",
    description:
      "The KV cache of Qwen3-14B calculated token by token, the total memory on an 8 GB laptop GPU, and measured streamed execution that runs the 29.5 GB model in under 2 GB.",
    seriesId: "small-gpus",
    part: 2,
    status: "published",
    datePublished: "2026-10-14T18:00:00-05:00",
    dateModified: "2026-10-14T18:00:00-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "9 min read",
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
    title: "Moving weights from storage to the GPU during streamed inference",
    hook: "Where the 27 seconds per token go: read, unpack, copy, and waiting.",
    description:
      "One weight's trip from SSD to GPU memory on a laptop: read, unpack, and copy times, what lossless compression saves and costs, and when loading makes the GPU wait.",
    seriesId: "small-gpus",
    part: 3,
    status: "published",
    datePublished: "2026-10-14T18:00:00-05:00",
    dateModified: "2026-10-14T18:00:00-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "7 min read",
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
    title: "Schedule-aware exact weight placement for language models with limited GPU memory",
    hook: "My paper: choosing which weights stay close by replaying a recorded request.",
    description:
      "A summary of my H6.5 paper with a 3-minute video: the placement decision, why bytes are the wrong guide, replaying a recorded request, and the measured results.",
    seriesId: "small-gpus",
    part: 4,
    status: "published",
    datePublished: "2026-10-14T18:00:00-05:00",
    dateModified: "2026-10-14T18:00:00-05:00",
    dateLabel: "October 14, 2026",
    readingTime: "8 min read",
    tags: ["Weight placement", "H6.5", "Paper"],
    socialImage: "/media/afterimage-social.png",
    cover: {
      label: "H6.5 result",
      metric: "−23%",
      caption: "Peak GPU memory · Llama-3.3-70B",
      note: "Lower in all 20 matched requests",
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
