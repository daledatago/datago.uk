import type { MetadataRoute } from "next";
import { absoluteUrl, PUBLIC_SEARCH_ROUTES } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-19T00:00:00.000Z");

  return PUBLIC_SEARCH_ROUTES.filter((route) => route.inSitemap !== false).map(
    (route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }),
  );
}
