import type { Metadata } from "next";
import { InfoCard } from "@/components/info-card";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { routeMetadata } from "@/lib/metadata";
import { approachPage } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/approach");

export default function ApproachPage() {
  return (
    <>
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
    </>
  );
}
