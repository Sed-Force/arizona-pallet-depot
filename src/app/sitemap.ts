import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/calculator`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
