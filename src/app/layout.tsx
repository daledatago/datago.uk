import type { Metadata } from "next";
import { Archivo, Public_Sans, Source_Code_Pro } from "next/font/google";
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

/* Self-hosted by next/font: the browser makes no request to Google. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "500"],
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
