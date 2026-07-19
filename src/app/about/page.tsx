import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { InfoCard } from "@/components/info-card";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { faqJsonLd, pageJsonLd, routeMetadata } from "@/lib/metadata";
import { aboutPage, site } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/about");

export default function AboutPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/about",
          name: "About DataGo",
          description: metadata.description as string,
          type: "AboutPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ],
          about: [
            "DataGo Ltd",
            "Databricks partner",
            "Bridgly",
            "governed AI systems",
            "enterprise AI readiness",
          ],
          mainEntity: {
            "@id": `${site.url}/#organization`,
          },
        })}
      />
      <JsonLdScript data={faqJsonLd(aboutPage.answers)} />

      <PageIntro
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        body={aboutPage.body}
      />

      <section className="content-band content-band--light">
        <div className="site-shell facts-grid">
          {aboutPage.facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell">
          <SectionHeading title="Brand architecture" />
          <div className="card-grid card-grid--three">
            {aboutPage.architecture.map((item) => (
              <InfoCard body={item.body} key={item.title} title={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell note-band">
          <p>{aboutPage.founderNote}</p>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell two-column two-column--center">
          <SectionHeading
            eyebrow="Product route"
            title={aboutPage.route.title}
            body={aboutPage.route.body}
          />
          <ButtonLink href={site.bridgly.url} variant="dark">
            {aboutPage.route.cta}
          </ButtonLink>
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Answer-ready summary"
            title="Quick answers about DataGo"
            body="These short answers help search engines, answer engines, and buyers understand the company-to-product relationship."
          />
          <div className="card-grid card-grid--three">
            {aboutPage.answers.map((item) => (
              <InfoCard
                body={item.answer}
                key={item.question}
                title={item.question}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
