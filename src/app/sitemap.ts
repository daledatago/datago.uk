import type { MetadataRoute } from "next";
import { site } from "@/lib/strings";

const routes = [
  "",
  "/bridgly",
  "/approach",
  "/company",
  "/lab",
  "/privacy",
  "/terms",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date("2026-05-22"),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

