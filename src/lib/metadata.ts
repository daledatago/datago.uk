import type { Metadata } from "next";
import { site } from "@/lib/strings";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export type SearchRoute = PageMetadata & {
  priority: number;
  changeFrequency: ChangeFrequency;
};

export const SEARCH_KEYWORDS = [
  "DataGo",
  "DataGo Solutions Ltd",
  "Datago Ltd",
  "Bridgly",
  "governed AI systems",
  "enterprise AI readiness",
  "AI impact measurement",
  "organisational intelligence",
  "AI governance",
  "AI transformation",
  "AI adoption visibility",
  "measurable AI outcomes",
  "product-led AI transformation",
];

export const PUBLIC_SEARCH_ROUTES = [
  {
    path: "/",
    title: "Governed AI Systems",
    description: site.description,
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/bridgly",
    title: "Bridgly",
    description:
      "Bridgly is DataGo's flagship organisational intelligence platform for AI adoption visibility, governance, connectors, and measurable AI outcomes.",
    priority: 0.92,
    changeFrequency: "weekly",
  },
  {
    path: "/approach",
    title: "Approach",
    description:
      "DataGo's approach to governed AI transformation connects enterprise AI readiness, governance, adoption visibility, and impact measurement.",
    priority: 0.86,
    changeFrequency: "monthly",
  },
  {
    path: "/insights",
    title: "Insights",
    description:
      "Company-level thinking from DataGo on governed AI systems, enterprise AI readiness, AI governance, adoption visibility, and measurable outcomes.",
    priority: 0.82,
    changeFrequency: "monthly",
  },
  {
    path: "/about",
    title: "About",
    description:
      "DataGo is the UK company behind Bridgly, providing company trust, product thesis, and governed AI product studio context.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Contact DataGo at info@datago.uk for corporate enquiries, Bridgly adoption, enterprise partnerships, and governed AI product conversations.",
    priority: 0.72,
    changeFrequency: "monthly",
  },
  {
    path: "/lab",
    title: "Lab/archive",
    description:
      "Agents & Pencils is a quiet DataGo lab/archive for agent-native product ideas; DataGo and Bridgly are the primary enterprise-facing path.",
    priority: 0.38,
    changeFrequency: "yearly",
  },
  {
    path: "/privacy",
    title: "Privacy",
    description:
      "Privacy notice for datago.uk, the public company website for DataGo, including contact information and current mailto-first handling.",
    priority: 0.32,
    changeFrequency: "yearly",
  },
  {
    path: "/terms",
    title: "Terms",
    description:
      "Legal notice for datago.uk, including the DataGo company contact route, registered legal identity, company number, and registered office.",
    priority: 0.32,
    changeFrequency: "yearly",
  },
] as const satisfies readonly SearchRoute[];

export function absoluteUrl(path = "/") {
  if (path === "/") {
    return site.url;
  }

  return `${site.url}${path}`;
}

function titleWithBrand(title: string) {
  return title === "Governed AI Systems"
    ? `${site.name} | Governed AI systems for organisations`
    : `${title} | ${site.name}`;
}

export function pageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  const brandedTitle = titleWithBrand(title);
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: brandedTitle,
      description,
      url,
      siteName: site.name,
      images: [
        {
          url: site.assets.hero,
          width: 1672,
          height: 941,
          alt: "Abstract operating intelligence network for DataGo.",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [site.assets.hero],
    },
  };
}

export function routeMetadata(path: string): Metadata {
  const route = PUBLIC_SEARCH_ROUTES.find((item) => item.path === path);

  if (!route) {
    throw new Error(`No public search route configured for ${path}`);
  }

  return pageMetadata(route);
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function rootJsonLd() {
  const datagoId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const bridglyId = `${site.bridgly.url}/#software`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": datagoId,
        name: site.name,
        legalName: site.legalName,
        alternateName: [site.searchAlias, "DataGo Solutions", "Datago"],
        url: site.url,
        email: site.email,
        foundingLocation: "United Kingdom",
        identifier: {
          "@type": "PropertyValue",
          propertyID: "UK Companies House",
          value: site.legal.companyNumber,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "2 Old Bath Road",
          addressLocality: "Newbury",
          addressRegion: "Berkshire",
          postalCode: "RG14 1QL",
          addressCountry: "GB",
        },
        knowsAbout: [
          "governed AI systems",
          "enterprise AI readiness",
          "AI impact measurement",
          "organisational intelligence",
          "AI governance",
          "AI transformation",
          "AI adoption visibility",
          "measurable AI outcomes",
        ],
        brand: {
          "@id": bridglyId,
        },
        makesOffer: {
          "@id": bridglyId,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        url: site.url,
        inLanguage: "en-GB",
        description: site.description,
        publisher: {
          "@id": datagoId,
        },
        about: {
          "@id": datagoId,
        },
        mentions: {
          "@id": bridglyId,
        },
      },
      {
        "@type": ["SoftwareApplication", "Product"],
        "@id": bridglyId,
        name: site.bridgly.name,
        url: site.bridgly.url,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Governed organisational intelligence platform",
        operatingSystem: "Web",
        description:
          "Bridgly is DataGo's flagship platform for governed organisational intelligence, AI adoption visibility, AI governance, and measurable AI outcomes.",
        creator: {
          "@id": datagoId,
        },
        publisher: {
          "@id": datagoId,
        },
        featureList: [
          "AI adoption visibility",
          "AI impact measurement",
          "Enterprise AI governance",
          "Connectors for work and AI systems",
          "Permission-aware organisational context",
          "Measurable improvement loops",
        ],
        mainEntityOfPage: site.bridgly.url,
      },
    ],
  };
}
