import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/contact-section";
import { JsonLdScript } from "@/components/json-ld-script";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { contact, site, ui } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/contact",
          name: `${contact.title} | ${site.name}`,
          description: metadata.description as string,
          type: "ContactPage",
          breadcrumbs: [
            { name: ui.home, path: "/" },
            { name: contact.pageEyebrow, path: "/contact" },
          ],
          mainEntity: {
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "sales",
                email: site.email,
                availableLanguage: ["en-GB", "en"],
              },
            ],
          },
        })}
      />
      <section aria-labelledby="contact-h" className="page-head" id="contact">
        <div className="shell">
          <nav aria-label={ui.breadcrumb} className="crumbs">
            <Link href="/">{ui.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{contact.pageEyebrow}</span>
          </nav>
        </div>
        <ContactSection eyebrow={contact.pageEyebrow} heading="h1" />
      </section>
    </>
  );
}
