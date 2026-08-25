import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_MODIFIED } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = SITE_MODIFIED;

  return [
    {
      url: "https://oneyerge.com/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        "https://oneyerge.com/media/oney-erge-portrait.webp",
        "https://oneyerge.com/media/oney-erge-social.png",
      ],
    },
    ...projects.map((project) => ({
      url: `https://oneyerge.com/work/${project.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [
        `https://oneyerge.com${project.image}`,
        `https://oneyerge.com${project.socialImage}`,
      ],
    })),
  ];
}
