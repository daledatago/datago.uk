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

export const SEARCH_KEYWORDS = ["DataGo", "Databricks", "Microsoft Fabric", "Data consultancy", "AI governance", "Bridgly"];

export const PUBLIC_SEARCH_ROUTES = [
  {
    path: "/",
    title: "DataGo Ltd, UK data and AI consultancy",
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
      "Bridgly is DataGo’s governance control plane for AI agents.",
    priority: 0.92,
    changeFrequency: "weekly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/about",
    title: "About",
    description:
      "Meet Dale Harrison, founder of DataGo Ltd, and find our company details.",
    priority: 0.8,
    changeFrequency: "monthly",
    index: true,
    inSitemap: true,
  },
  { path: "/services", title: "Services", description: "DataGo consultancy services.", priority: 0.7, changeFrequency: "monthly" },
  { path: "/public-sector", title: "Public sector", description: "Working with DataGo in the public sector.", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work", title: "Work", description: "Ask DataGo about relevant experience.", priority: 0.7, changeFrequency: "monthly" },
  { path: "/accessibility", title: "Accessibility statement", description: "Accessibility and reporting problems on datago.uk.", priority: 0.7, changeFrequency: "monthly" },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Contact DataGo Ltd about data and AI consultancy, procurement or Bridgly.",
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
] satisfies readonly SearchRoute[];

export function absoluteUrl(path = "/") {
  if (path === "/") {
    return site.url;
  }

  return `${site.url}${path}`;
}

function titleWithBrand(title: string) {
  return title.startsWith("DataGo Ltd") ? title : `${title} | ${site.name}`;
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
    title: path === "/" ? { absolute: brandedTitle } : title,
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
          url: "/assets/datago-social.png",
          width: 1200,
          height: 630,
          alt: "DataGo company logo",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: ["/assets/datago-social.png"],
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
      url: absoluteUrl("/assets/datago-social.png"),
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
  const logoUrl = absoluteUrl("/assets/datago-wordmark.png");

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
        sameAs: ["https://www.linkedin.com/company/datago-uk/"],
        foundingLocation: "United Kingdom",
        founder: { "@type": "Person", name: "Dale Harrison" },
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
        knowsAbout: SEARCH_KEYWORDS,
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
          "Governance control plane for AI agents",
        operatingSystem: "Web",
        description:
          "Bridgly is DataGo’s governance control plane for AI agents.",
        creator: {
          "@id": datagoId,
        },
        publisher: {
          "@id": datagoId,
        },
        featureList: ["Signed rules", "Enforcement at connected points", "Decision records"],
        mainEntityOfPage: site.bridgly.url,
      },
    ],
  };
}
