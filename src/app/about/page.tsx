import type { Metadata } from "next";
import { InfoCard } from "@/components/info-card";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { routeMetadata } from "@/lib/metadata";
import { aboutPage } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/about");

export default function AboutPage() {
  return (
    <>
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
    </>
  );
}
