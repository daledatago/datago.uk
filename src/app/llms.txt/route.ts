import { PUBLIC_SEARCH_ROUTES } from "@/lib/metadata";
import { services, site } from "@/lib/strings";

export const dynamic = "force-static";

export function GET() {
  const body = `# DataGo

> ${site.description}

${site.legalName} is a UK data and AI consultancy and a technical delivery partner. It also builds its own products. The first is Bridgly.

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
- Do not name clients, certifications, frameworks or partner tiers for DataGo unless this site states them as held.
- The typical needs described on the site are market research. They are not DataGo clients or delivered projects.
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
