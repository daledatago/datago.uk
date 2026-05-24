import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { routeMetadata } from "@/lib/metadata";
import { insightsPage, site } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/insights");

export default function InsightsPage() {
  return (
    <>
      <PageIntro
        eyebrow={insightsPage.eyebrow}
        title={insightsPage.title}
        body={insightsPage.body}
      >
        <ButtonLink href={site.bridgly.url} variant="secondary">
          Visit Bridgly
        </ButtonLink>
      </PageIntro>

      <section className="content-band content-band--light">
        <div className="site-shell insight-list">
          {insightsPage.briefs.map((brief) => (
            <article className="insight-brief" key={brief.title}>
              <h2>{brief.title}</h2>
              <p>{brief.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell two-column">
          <SectionHeading
            eyebrow="Editorial boundary"
            title="DataGo explains the thesis. Bridgly explains the platform."
            body="This keeps the company site useful for AI search and enterprise due diligence while preserving bridgly.ai as the product destination."
          />
          <ul className="plain-list plain-list--compact">
            {insightsPage.principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
