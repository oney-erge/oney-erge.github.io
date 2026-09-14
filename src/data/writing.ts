export type WritingPost = {
  slug: string;
  href: string;
  title: string;
  description: string;
  series: string;
  datePublished: string;
  dateModified: string;
  dateLabel: string;
  readingTime: string;
  tags: string[];
  socialImage: string;
  featured: boolean;
  cover: {
    label: string;
    metric: string;
    caption: string;
    note: string;
  };
};

/** Published posts in reverse chronological order. */
export const writingPosts: WritingPost[] = [
  {
    slug: "llm-memory-requirements-consumer-gpu",
    href: "/writing/llm-memory-requirements-consumer-gpu/",
    title: "Memory requirements of language model inference on a consumer GPU",
    description:
      "What occupies GPU memory while a language model runs, calculated for Qwen3-14B on an 8 GB laptop GPU: system use, number formats, model parts, and the KV cache.",
    series: "Running large language models on small GPUs · Part 1",
    datePublished: "2026-09-13T12:00:00-05:00",
    dateModified: "2026-09-14T11:29:36-05:00",
    dateLabel: "September 13, 2026",
    readingTime: "12 min read",
    tags: ["GPU memory", "LLM inference", "BF16"],
    socialImage: "/media/afterimage-social.png",
    featured: true,
    cover: {
      label: "Model memory map",
      metric: "29.5 GB",
      caption: "Qwen3-14B · BF16 weights",
      note: "Measured against an 8 GB laptop GPU",
    },
  },
];

export function getFeaturedWritingPosts(): WritingPost[] {
  return writingPosts.filter((post) => post.featured).slice(0, 4);
}

export function getWritingPost(slug: string): WritingPost {
  const post = writingPosts.find((candidate) => candidate.slug === slug);
  if (!post) throw new Error(`Unknown writing post: ${slug}`);
  return post;
}
