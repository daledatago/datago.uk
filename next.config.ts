import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/*
 * Content-Security-Policy. The only third party is Cloudflare Turnstile, the
 * security check on the contact form. Fonts are self-hosted by next/font.
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
      // The Approach page became "How we deliver" on the home page.
      { source: "/approach", destination: "/#delivery", permanent: false },
      // Insights and Lab described Bridgly in retired terms and were retired.
      { source: "/insights", destination: "/", permanent: false },
      { source: "/lab", destination: "/", permanent: false },
      // Bridgly has its own site. The short page that stood here is retired.
      { source: "/bridgly", destination: "https://bridgly.ai", permanent: true },
    ];
  },
};

export default nextConfig;
