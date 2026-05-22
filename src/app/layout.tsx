import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
  title: {
    default: `${site.name} | Product-led governed AI transformation`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Datago",
    "Bridgly",
    "organisational intelligence",
    "governed graph",
    "product-led AI transformation",
    "AI governance",
    "enterprise AI transformation",
  ],
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Product-led governed AI transformation`,
    description: site.description,
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
    title: `${site.name} | Product-led governed AI transformation`,
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
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
