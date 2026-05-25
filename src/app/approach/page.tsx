import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { InfoCard } from "@/components/info-card";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { faqJsonLd, pageJsonLd, routeMetadata } from "@/lib/metadata";
import { approachPage } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/approach");

export default function ApproachPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/approach",
          name: "DataGo approach to governed AI transformation",
          description: metadata.description as string,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Approach", path: "/approach" },
          ],
          about: [
            "governed AI systems",
            "enterprise AI readiness",
            "AI governance",
            "AI transformation",
            "measurable AI outcomes",
          ],
        })}
      />
      <JsonLdScript data={faqJsonLd(approachPage.answers)} />

      <PageIntro
        eyebrow={approachPage.eyebrow}
        title={approachPage.title}
        body={approachPage.body}
      />

      <section className="content-band content-band--light">
        <div className="site-shell">
          <SectionHeading title="The operating layer" />
          <div className="card-grid card-grid--four">
            {approachPage.pillars.map((item) => (
              <InfoCard body={item.body} key={item.title} title={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell two-column">
          <SectionHeading
            title="Recursive learning loop"
            body="The product layer should sense what is happening, understand it in context, recommend useful action, act through governed workflows, measure the result, and learn from the evidence."
          />
          <ol className="loop-list">
            {approachPage.loop.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Product route"
            title={approachPage.route.title}
            body={approachPage.route.body}
          />
          <div className="card-grid card-grid--two">
            {approachPage.route.actions.map((item) => (
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
        <div className="site-shell">
          <SectionHeading
            eyebrow="Answer-ready summary"
            title="Quick answers about the DataGo approach"
            body="These plain-language answers give search and answer engines a concise framing for readiness, governance, and impact measurement."
          />
          <div className="card-grid card-grid--three">
            {approachPage.answers.map((item) => (
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
