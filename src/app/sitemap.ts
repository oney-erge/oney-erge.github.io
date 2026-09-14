import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE, SITE_MODIFIED } from "@/data/site";
import { writingPosts } from "@/data/writing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = SITE_MODIFIED;

  return [
    {
      url: `${SITE}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE}/media/oney-erge-portrait.webp`,
        `${SITE}/media/oney-erge-social.png`,
      ],
    },
    {
      url: `${SITE}/writing/`,
      lastModified: writingPosts[0]?.dateModified ?? lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...writingPosts.map((post) => ({
      url: `${SITE}${post.href}`,
      lastModified: post.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [`${SITE}${post.socialImage}`],
    })),
    ...projects.map((project) => ({
      url: `${SITE}/work/${project.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [
        `${SITE}${project.image}`,
        `${SITE}${project.socialImage}`,
      ],
    })),
  ];
}
