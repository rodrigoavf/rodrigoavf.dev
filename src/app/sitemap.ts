import type { MetadataRoute } from "next";
import { getEntries, getTags } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getEntries("posts");
  const projects = getEntries("projects");

  const tags = [
    ...new Set([
      ...getTags("posts").map((t) => t.tag),
      ...getTags("projects").map((t) => t.tag),
    ]),
  ];

  const staticPages = ["", "/writing", "/projects", "/about"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const entryPages = [...posts, ...projects].map((entry) => ({
    url: `${site.url}${entry.href}`,
    lastModified: entry.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagPages = tags.map((tag) => ({
    url: `${site.url}/tags/${tag}`,
    changeFrequency: "monthly" as const,
    priority: 0.3,
  }));

  return [...staticPages, ...entryPages, ...tagPages];
}
