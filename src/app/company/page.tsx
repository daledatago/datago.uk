import type { Metadata } from "next";
import { InfoCard } from "@/components/info-card";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { pageMetadata } from "@/lib/metadata";
import { companyPage } from "@/lib/strings";

export const metadata: Metadata = pageMetadata({
  title: "Company",
  description: "Datago Ltd is the UK company behind Bridgly.",
  path: "/company",
});

export default function CompanyPage() {
  return (
    <>
      <PageIntro
        eyebrow={companyPage.eyebrow}
        title={companyPage.title}
        body={companyPage.body}
      />

      <section className="content-band content-band--light">
        <div className="site-shell facts-grid">
          {companyPage.facts.map((fact) => (
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
            {companyPage.architecture.map((item) => (
              <InfoCard body={item.body} key={item.title} title={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell note-band">
          <p>{companyPage.founderNote}</p>
        </div>
      </section>
    </>
  );
}

