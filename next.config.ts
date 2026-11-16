import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/*
 * Content-Security-Policy. The only third party is Cloudflare Turnstile, the
 * security check on the contact form. Fonts are files in src/fonts, served by this site.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const movedServices: Record<string, string> = {
  "practical-ai-applications": "practical-ai",
  "analytics-decision-support": "analytics",
  "governance-assurance": "governance",
  "data-platforms-integration": "data-platforms",
  "secure-production-delivery": "secure-delivery",
};

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // The Approach page became "How we work" on the home page.
      { source: "/approach", destination: "/#how", permanent: false },
      // Each service is now a panel on the one services page.
      ...Object.entries(movedServices).map(([from, to]) => ({
        source: `/services/${from}`,
        destination: `/services#${to}`,
        permanent: true,
      })),
      // Insights and Lab described Bridgly in retired terms and were retired.
      { source: "/insights", destination: "/", permanent: false },
      { source: "/lab", destination: "/", permanent: false },
      // Bridgly has its own site. The short page that stood here is retired.
      { source: "/bridgly", destination: "https://bridgly.ai", permanent: true },
    ];
  },
};

export default nextConfig;
