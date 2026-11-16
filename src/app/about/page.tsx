import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { CredentialsBand } from "@/components/credentials-band";
import { Tilt } from "@/components/immersive/tilt";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageHead } from "@/components/page-head";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { aboutPage, site, ui } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/about");

export default function AboutPage() {
  const { consulting, product } = aboutPage.twoWays;

  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/about",
          name: `${aboutPage.title} | ${site.name}`,
          description: metadata.description as string,
          type: "AboutPage",
          breadcrumbs: [
            { name: ui.home, path: "/" },
            { name: aboutPage.eyebrow, path: "/about" },
          ],
          mainEntity: { "@id": `${site.url}/#organization` },
        })}
      />

      <PageHead
        body={aboutPage.body}
        crumb={aboutPage.eyebrow}
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
      />

      <section className="section section--alt band">
        <div className="shell">
          <p className="belief" data-reveal="">
            {aboutPage.belief}
          </p>
        </div>
      </section>

      <section aria-labelledby="two-h" className="section band">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <h2 className="headline" id="two-h">
              {aboutPage.twoWays.title}
            </h2>
          </div>
          <div className="duo">
            <div data-reveal="">
              <Tilt className="tile">
                <h3>{consulting.title}</h3>
                <p>{consulting.body}</p>
                <p>
                  <Link className="textlink" href={consulting.link.href}>
                    {consulting.link.label}&nbsp;<Arrow />
                  </Link>
                </p>
              </Tilt>
            </div>
            <div data-reveal="" style={{ "--d": "100ms" } as React.CSSProperties}>
              <Tilt className="tile">
                <h3>{product.title}</h3>
                <p>{product.body}</p>
                <p>
                  <a
                    className="textlink"
                    href={site.bridgly.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {site.bridgly.cta}&nbsp;<Arrow />
                    <span className="vh"> {ui.newTab}</span>
                  </a>
                </p>
              </Tilt>
            </div>
          </div>
        </div>
      </section>

      <CredentialsBand />

      <section aria-labelledby="company-h" className="section section--alt band">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <h2 id="company-h">{aboutPage.company.title}</h2>
          </div>
          <dl className="facts" data-reveal="">
            {aboutPage.company.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="hero__cta" data-reveal="">
            <Link className="btn" href="/contact">
              {ui.cta} <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
