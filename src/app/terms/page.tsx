import type { Metadata } from "next";
import { JsonLdScript } from "@/components/json-ld-script";
import { LegalPage } from "@/components/legal-page";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { termsPage, site, ui } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/terms");

export default function TermsPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/terms",
          name: `${termsPage.title} | ${site.name}`,
          description: metadata.description as string,
          breadcrumbs: [
            { name: ui.home, path: "/" },
            { name: termsPage.eyebrow, path: "/terms" },
          ],
          mainEntity: { "@id": `${site.url}/#organization` },
        })}
      />
      <LegalPage page={termsPage} />
    </>
  );
}
