import type { Metadata } from "next";
import { JsonLdScript } from "@/components/json-ld-script";
import { LegalPage } from "@/components/legal-page";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { privacyPage, site, ui } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/privacy",
          name: `${privacyPage.title} | ${site.name}`,
          description: metadata.description as string,
          breadcrumbs: [
            { name: ui.home, path: "/" },
            { name: privacyPage.eyebrow, path: "/privacy" },
          ],
          mainEntity: { "@id": `${site.url}/#organization` },
        })}
      />
      <LegalPage page={privacyPage} />
    </>
  );
}
