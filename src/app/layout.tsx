import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLdScript } from "@/components/json-ld-script";
import { SiteChrome } from "@/components/site-chrome";
import { rootJsonLd, SEARCH_KEYWORDS } from "@/lib/metadata";
import { site } from "@/lib/strings";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  title: {
    default: `${site.name} | UK data and AI consultancy`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: SEARCH_KEYWORDS,
  alternates: {
    canonical: site.url,
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Data and AI consultancy`,
    description: site.description,
    images: [
      {
        url: "/assets/datago-social.png",
        width: 1200,
        height: 630,
        alt: "DataGo company logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Data and AI consultancy`,
    description: site.description,
    images: ["/assets/datago-social.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <JsonLdScript data={rootJsonLd()} />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
