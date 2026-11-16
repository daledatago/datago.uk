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
  "UK data and AI consultancy",
  "practical AI applications",
  "analytics and decision support",
  "data governance and assurance",
  "data platforms and integration",
  "secure production delivery",
  "Bridgly",
];

const HOME_TITLE = "AI, built on trusted data.";

export const PUBLIC_SEARCH_ROUTES: readonly SearchRoute[] = [
  {
    path: "/",
    title: HOME_TITLE,
    description: site.description,
    priority: 1,
    changeFrequency: "weekly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/services",
    title: "What we do",
    description:
      "Five kinds of work: practical AI applications, analytics and decision support, governance and assurance, data platforms and integration, and secure production delivery.",
    priority: 0.9,
    changeFrequency: "monthly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/about",
    title: "About",
    description:
      "DataGo Ltd is a UK data and AI consultancy. It also builds Bridgly.",
    priority: 0.7,
    changeFrequency: "monthly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Bring DataGo the problem you are trying to solve. A few lines is enough.",
    priority: 0.7,
    changeFrequency: "monthly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/accessibility",
    title: "Accessibility statement",
    description:
      "How accessible datago.uk is, how it was tested, what has not yet been tested and how to tell us about a problem.",
    priority: 0.3,
    changeFrequency: "yearly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/privacy",
    title: "Privacy",
    description:
      "How DataGo Ltd handles personal data on datago.uk, including the contact form.",
    priority: 0.3,
    changeFrequency: "yearly",
    index: true,
    inSitemap: true,
  },
  {
    path: "/terms",
    title: "Terms",
    description: "Terms of use for the datago.uk website, run by DataGo Ltd.",
    priority: 0.3,
    changeFrequency: "yearly",
    index: true,
    inSitemap: true,
  },
];

export function absoluteUrl(path = "/") {
  if (path === "/") {
    return site.url;
  }

  return `${site.url}${path}`;
}

function titleWithBrand(title: string) {
  return title === HOME_TITLE
    ? `${site.name} | ${HOME_TITLE}`
    : `${title} | ${site.name}`;
}

export const homeTitle = `${site.name} | ${HOME_TITLE}`;

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
          alt: "DataGo",
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
        vatID: site.legal.vatNumber.replace(/\s/g, ""),
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
          "practical AI applications",
          "analytics and decision support",
          "data governance and assurance",
          "data platforms and integration",
          "secure production delivery",
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
        operatingSystem: "Web",
        description: site.bridgly.line,
        creator: {
          "@id": datagoId,
        },
        publisher: {
          "@id": datagoId,
        },
        mainEntityOfPage: site.bridgly.url,
      },
    ],
  };
}
