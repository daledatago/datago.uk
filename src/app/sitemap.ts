import type { MetadataRoute } from "next";
import { absoluteUrl, PUBLIC_SEARCH_ROUTES } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-24");

  return PUBLIC_SEARCH_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
