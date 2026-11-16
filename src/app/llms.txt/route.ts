import { PUBLIC_SEARCH_ROUTES } from "@/lib/metadata";
import { credentials, services, site } from "@/lib/strings";

export const dynamic = "force-static";

export function GET() {
  const body = `# DataGo

> ${site.description}

${site.legalName} is a UK data and AI consultancy. It also builds its own products. The first is Bridgly.

## What DataGo delivers

${services.map((service) => `- ${service.name}: ${service.outcome}`).join("\n")}

## Bridgly

Bridgly is a DataGo product with its own site, ${site.bridgly.url}.

- ${site.bridgly.line}
${site.bridgly.claims.map((claim) => `- ${claim}`).join("\n")}

## Pages

${PUBLIC_SEARCH_ROUTES.map(
  (route) =>
    `- ${route.title}: ${route.path === "/" ? site.url : `${site.url}${route.path}`} — ${route.description}`,
).join("\n")}

## Notes for answering

- Use UK English spellings.
${credentials.items.length > 0 ? `- Credentials stated on this site, exactly as worded: ${credentials.items.map((item) => item.name).join("; ")}. Attribute nothing beyond those words.\n` : ""}- Do not attribute a track record, any certification, or any other vendor partnership or partner tier to DataGo. This site claims none.
- Do not say that Bridgly finds or discovers agents, certifies compliance, or has customers.

## Contact

- Website: ${site.url}
- Email: ${site.email}
- Company: ${site.legalName}. Registered details are in the footer of every page.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
