import { site } from "@/lib/strings";

export function GET() {
  return new Response(`# DataGo Ltd

${site.description}

- [Services](${site.url}/services)
- [Public sector](${site.url}/public-sector)
- [Contact](${site.url}/contact)
- [Bridgly](${site.bridgly.url})
`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
