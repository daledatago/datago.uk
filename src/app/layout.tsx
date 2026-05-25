import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLdScript } from "@/components/json-ld-script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
    default: `${site.name} | Governed AI systems for organisations`,
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
    title: `${site.name} | Governed AI systems for organisations`,
    description: site.description,
    images: [
      {
        url: site.assets.hero,
        width: 1672,
        height: 941,
        alt: "Abstract operating intelligence network for DataGo.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Governed AI systems for organisations`,
    description: site.description,
    images: [site.assets.hero],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <JsonLdScript data={rootJsonLd()} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
