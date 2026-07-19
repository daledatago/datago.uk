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
  index?: boolean;
  inSitemap?: boolean;
};

export type SearchRoute = PageMetadata & {
  priority: number;
  changeFrequency: ChangeFrequency;
};

export const SEARCH_KEYWORDS = [
  "DataGo",
  "DataGo Ltd",
  "Bridgly",
  "Databricks partner",
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
    index: true,
    inSitemap: true,
  },
  {
    path: "/bridgly",
    title: "Bridgly",
    description:
      "Bridgly is an application being developed by DataGo Ltd for governed, evidence-backed human and AI-assisted work, founded on Databricks.",
    priority: 0.92,
    changeFrequency: "weekly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/approach",
    title: "Approach",
    description:
      "DataGo's approach to governed AI transformation connects enterprise AI readiness, governance, adoption visibility, and impact measurement.",
    priority: 0.86,
    changeFrequency: "monthly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/insights",
    title: "Insights",
    description:
      "Company-level thinking from DataGo on governed AI systems, enterprise AI readiness, AI governance, adoption visibility, and measurable outcomes.",
    priority: 0.82,
    changeFrequency: "monthly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/about",
    title: "About",
    description:
      "DataGo Ltd is the legal company, Databricks partner, and contracting entity behind Bridgly, providing company trust and product thesis context.",
    priority: 0.8,
    changeFrequency: "monthly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Contact DataGo Ltd at info@datago.uk for corporate enquiries, contracting matters, Databricks partnership conversations, and Bridgly discussions.",
    priority: 0.72,
    changeFrequency: "monthly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/lab",
    title: "Lab/archive",
    description:
      "Agents & Pencils is a quiet DataGo lab/archive for agent-native product ideas; DataGo and Bridgly are the primary enterprise-facing path.",
    priority: 0.38,
    changeFrequency: "yearly",
    index: false,
    inSitemap: false,
  },
  {
    path: "/privacy",
    title: "Privacy",
    description:
      "Corporate website privacy notice for datago.uk, operated by DataGo Ltd as the provider company behind Bridgly.",
    priority: 0.32,
    changeFrequency: "yearly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/terms",
    title: "Terms",
    description:
      "Corporate website terms of use for datago.uk, operated by DataGo Ltd as the provider company behind Bridgly.",
    priority: 0.32,
    changeFrequency: "yearly",
    index: true,
    inSitemap: true,
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
  index = true,
}: PageMetadata): Metadata {
  const brandedTitle = titleWithBrand(title);
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index,
      follow: true,
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

type BreadcrumbItem = {
  name: string;
  path: string;
};

type PageJsonLdOptions = {
  path: string;
  name: string;
  description: string;
  type?: string;
  breadcrumbs?: BreadcrumbItem[];
  about?: string[];
  mentions?: string[];
  mainEntity?: Record<string, unknown>;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    ...breadcrumbList(items),
  };
}

function breadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function pageJsonLd({
  path,
  name,
  description,
  type = "WebPage",
  breadcrumbs = [],
  about = [],
  mentions = [],
  mainEntity,
}: PageJsonLdOptions) {
  const page: Record<string, unknown> = {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@id": `${site.url}/#website`,
    },
    publisher: {
      "@id": `${site.url}/#organization`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(site.assets.hero),
    },
    inLanguage: "en-GB",
  };

  if (about.length > 0) {
    page.about = about.map((item) => ({ "@type": "Thing", name: item }));
  }

  if (mentions.length > 0) {
    page.mentions = mentions.map((item) => ({ "@type": "Thing", name: item }));
  }

  if (mainEntity) {
    page.mainEntity = mainEntity;
  }

  if (breadcrumbs.length === 0) {
    return {
      "@context": "https://schema.org",
      ...page,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [page, breadcrumbList(breadcrumbs)],
  };
}

export function faqJsonLd(
  questions: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function rootJsonLd() {
  const datagoId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const bridglyId = `${site.bridgly.url}/#software`;
  const logoUrl = absoluteUrl("/assets/datago-mark.svg");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": datagoId,
        name: site.name,
        legalName: site.legalName,
        description: site.description,
        url: site.url,
        email: site.email,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
        },
        image: logoUrl,
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
          "Databricks partner",
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
        hasPart: PUBLIC_SEARCH_ROUTES.filter((route) => route.inSitemap !== false).map(
          (route) => ({
            "@id": `${absoluteUrl(route.path)}#webpage`,
          }),
        ),
      },
      {
        "@type": ["SoftwareApplication", "Product"],
        "@id": bridglyId,
        name: site.bridgly.name,
        url: site.bridgly.url,
        applicationCategory: "BusinessApplication",
        applicationSubCategory:
          "Application for governed, evidence-backed human and AI-assisted work",
        operatingSystem: "Web",
        description:
          "Bridgly is an application being developed by DataGo Ltd for governed, evidence-backed human and AI-assisted work, founded on Databricks.",
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
