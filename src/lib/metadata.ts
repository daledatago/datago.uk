import type { Metadata } from "next";
import { site } from "@/lib/strings";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      images: [
        {
          url: site.assets.hero,
          width: 1672,
          height: 941,
          alt: "Abstract operating intelligence network for Datago.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [site.assets.hero],
    },
  };
}

