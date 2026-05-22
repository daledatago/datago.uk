import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { InfoCard } from "@/components/info-card";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { pageMetadata } from "@/lib/metadata";
import { bridglyPage, site } from "@/lib/strings";

export const metadata: Metadata = pageMetadata({
  title: "Bridgly",
  description:
    "Bridgly is Datago's governed organisational intelligence platform.",
  path: "/bridgly",
});

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
          <SectionHeading title="Learn. Connect. Evolve." />
          <div className="card-grid card-grid--three">
            {bridglyPage.spine.map((item) => (
              <InfoCard body={item.body} key={item.title} title={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell two-column">
          <SectionHeading
            title={bridglyPage.relationship.title}
            body={bridglyPage.relationship.body}
          />
          <div className="identity-stack">
            <p>Datago</p>
            <span>Company</span>
            <p>Bridgly</p>
            <span>Flagship product</span>
          </div>
        </div>
      </section>
    </>
  );
}

