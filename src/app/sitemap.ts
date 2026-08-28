import type { MetadataRoute } from "next";
import {
  COLLECTIONS,
  COLLECTION_NAMES,
  getAllEntries,
  getEntries,
} from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getAllEntries();

  const tags = new Set(
    COLLECTION_NAMES.flatMap((name) =>
      getEntries(name).flatMap((entry) => entry.tags),
    ),
  );

  const staticPages = [
    "",
    ...COLLECTION_NAMES.map((name) => COLLECTIONS[name].basePath),
    "/about",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const entryPages = entries.map((entry) => ({
    url: `${site.url}${entry.href}`,
    lastModified: entry.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagPages = [...tags].map((tag) => ({
    url: `${site.url}/tags/${tag}`,
    changeFrequency: "monthly" as const,
    priority: 0.3,
  }));

  return [...staticPages, ...entryPages, ...tagPages];
}
