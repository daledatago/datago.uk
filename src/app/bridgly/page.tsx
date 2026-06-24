import type { Metadata } from "next";
import { BridglyFlagshipShowcase } from "@/components/bridgly-flagship-showcase";
import { ButtonLink } from "@/components/button-link";
import { InfoCard } from "@/components/info-card";
import { JsonLdScript } from "@/components/json-ld-script";
import { SectionHeading } from "@/components/section-heading";
import { faqJsonLd, pageJsonLd, routeMetadata } from "@/lib/metadata";
import { bridglyPage, site } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/bridgly");

export default function BridglyPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/bridgly",
          name: "Bridgly | DataGo",
          description: metadata.description as string,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Bridgly", path: "/bridgly" },
          ],
          about: [
            "Bridgly",
            "AI adoption visibility",
            "AI governance",
            "AI impact measurement",
            "organisational intelligence",
          ],
          mainEntity: {
            "@id": `${site.bridgly.url}/#software`,
          },
        })}
      />
      <JsonLdScript data={faqJsonLd(bridglyPage.answers)} />

      <BridglyFlagshipShowcase
        hero={{
          eyebrow: bridglyPage.eyebrow,
          title: bridglyPage.title,
          accent: bridglyPage.titleAccent,
          body: bridglyPage.body,
          note: bridglyPage.note,
          primaryCta: bridglyPage.cta,
          secondaryCta: bridglyPage.secondaryCta,
        }}
        loop={bridglyPage.loop}
        loopLabel={bridglyPage.loopLabel}
        promise={bridglyPage.promise}
        supporting={bridglyPage.supporting}
      />

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

      <section className="content-band content-band--light">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Answer-ready summary"
            title="Quick answers about Bridgly"
            body="These concise answers reinforce what Bridgly is, how it supports enterprise AI readiness, and where buyers should go next."
          />
          <div className="card-grid card-grid--three">
            {bridglyPage.answers.map((item) => (
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
