import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { InfoCard } from "@/components/info-card";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { routeMetadata } from "@/lib/metadata";
import { bridglyPage, site } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/bridgly");

export default function BridglyPage() {
  return (
    <>
      <PageIntro
        eyebrow={bridglyPage.eyebrow}
        title={bridglyPage.title}
        body={bridglyPage.body}
      >
        <ButtonLink href={site.bridgly.url}>{bridglyPage.cta}</ButtonLink>
      </PageIntro>

      <section className="content-band content-band--light">
        <div className="site-shell promise-band">
          <p>{bridglyPage.promise}</p>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell">
          <SectionHeading title="Visibility. Governance. Measurable outcomes." />
          <div className="card-grid card-grid--three">
            {bridglyPage.spine.map((item) => (
              <InfoCard body={item.body} key={item.title} title={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Product detail lives on Bridgly"
            title="Route product intent to bridgly.ai."
            body="This page keeps the DataGo-to-Bridgly relationship clear. Detailed feature, connector, governance, impact, and demo content belongs on Bridgly."
          />
          <div className="card-grid card-grid--three">
            {bridglyPage.routes.map((item) => (
              <article className="info-card info-card--linked" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ButtonLink href={item.href} variant="secondary">
                  Open on Bridgly
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell two-column">
          <SectionHeading
            title={bridglyPage.relationship.title}
            body={bridglyPage.relationship.body}
          />
          <div className="identity-stack">
            <p>DataGo</p>
            <span>Company</span>
            <p>Bridgly</p>
            <span>Flagship product</span>
          </div>
        </div>
      </section>
    </>
  );
}
