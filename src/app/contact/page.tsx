import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { contactPage, site } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/contact",
          name: "Contact DataGo",
          description: metadata.description as string,
          type: "ContactPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ],
          about: ["DataGo", "Bridgly"],
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

      <PageIntro
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        body="Contact us about data and AI consultancy, supplier queries or Bridgly."
      >
        <ButtonLink href={`mailto:${site.email}`}>{contactPage.primary}</ButtonLink>
      </PageIntro>

      <section className="content-band content-band--light">
        <div className="site-shell contact-panel">
          <div>
            <span>Corporate email</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <p>DataGo Ltd, company number {site.legal.companyNumber}. Registered office: {site.legal.registeredOffice}.</p>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell two-column two-column--center">
          <SectionHeading
            eyebrow="Product route"
            title="Bridgly enquiries"
            body="Visit bridgly.ai for product details and demos."
          />
          <ButtonLink href={contactPage.route.href} variant="dark">
            {contactPage.route.cta}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
