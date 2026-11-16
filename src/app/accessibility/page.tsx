import type { Metadata } from "next";
import { JsonLdScript } from "@/components/json-ld-script";
import { LegalPage } from "@/components/legal-page";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { accessibilityPage, site, ui } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/accessibility");

export default function AccessibilityPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/accessibility",
          name: `${accessibilityPage.title} | ${site.name}`,
          description: metadata.description as string,
          breadcrumbs: [
            { name: ui.home, path: "/" },
            { name: accessibilityPage.eyebrow, path: "/accessibility" },
          ],
          mainEntity: { "@id": `${site.url}/#organization` },
        })}
      />
      <LegalPage page={accessibilityPage} />
    </>
  );
}
