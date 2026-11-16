import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLdScript } from "@/components/json-ld-script";
import { CursorRing } from "@/components/immersive/cursor-ring";
import { SiteChrome } from "@/components/site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeScript } from "@/components/theme-script";
import { homeTitle, rootJsonLd, SEARCH_KEYWORDS } from "@/lib/metadata";
import { navItems, site, ui } from "@/lib/strings";
import "./globals.css";
import "./immersive.css";

/*
 * The font files are in src/fonts (see its README for source and licence).
 * Neither the build nor the browser makes a request to Google.
 */
const archivo = localFont({
  src: "../fonts/archivo-latin-wght-normal.woff2",
  variable: "--font-archivo",
  weight: "500 700",
  style: "normal",
  display: "swap",
});

const publicSans = localFont({
  src: "../fonts/public-sans-latin-wght-normal.woff2",
  variable: "--font-public-sans",
  weight: "400 600",
  style: "normal",
  display: "swap",
});

const sourceCodePro = localFont({
  src: "../fonts/source-code-pro-latin-wght-normal.woff2",
  variable: "--font-source-code-pro",
  weight: "400 500",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  title: {
    default: homeTitle,
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
    title: homeTitle,
    description: site.description,
    images: [
      {
        url: site.assets.hero,
        width: 1672,
        height: 941,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
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
      className={`${archivo.variable} ${publicSans.variable} ${sourceCodePro.variable} antialiased`}
      lang="en-GB"
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <JsonLdScript data={rootJsonLd()} />
      </head>
      <body>
        <SiteChrome
          footer={<SiteFooter />}
          header={
            <SiteHeader
              ctaHref="/#contact"
              items={navItems}
              labels={{
                home: ui.homeLabel,
                wordmark: ui.wordmark,
                primaryNav: ui.primaryNav,
                mobileNav: ui.mobileNav,
                menu: ui.menu,
                theme: ui.theme,
                cta: ui.cta,
              }}
            />
          }
          skipLabel={ui.skip}
        >
          {children}
        </SiteChrome>
        <CursorRing />
      </body>
    </html>
  );
}
