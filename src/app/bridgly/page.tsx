import type { Metadata } from "next";
import { Arrow } from "@/components/arrow";
import { Confirms } from "@/components/confirm";
import { JsonLdScript } from "@/components/json-ld-script";
import { OutcomeDemo } from "@/components/outcome-demo";
import { PageHead } from "@/components/page-head";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { bridglyPage, site, ui } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/bridgly");

export default function BridglyPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/bridgly",
          name: `${bridglyPage.title} | ${site.name}`,
          description: metadata.description as string,
          breadcrumbs: [
            { name: ui.home, path: "/" },
            { name: bridglyPage.title, path: "/bridgly" },
          ],
          about: [site.bridgly.name],
          mainEntity: { "@id": `${site.bridgly.url}/#software` },
        })}
      />

      <PageHead
        body={bridglyPage.body}
        crumb={bridglyPage.title}
        eyebrow={bridglyPage.eyebrow}
        title={bridglyPage.title}
      >
        <div className="hero__cta">
          <a className="btn" href={site.bridgly.url} rel="noopener">
            {site.bridgly.cta} <Arrow />
          </a>
        </div>
        <p className="more">
          <Confirms items={bridglyPage.confirms} />
        </p>
      </PageHead>

      <section aria-labelledby="what-h" className="section section--alt">
        <div className="shell">
          <article className="card product" data-reveal="">
            <h2 className="vh" id="what-h">
              {bridglyPage.whatTitle}
            </h2>
            <p className="product__line">{site.bridgly.line}</p>
            <ul className="product__list">
              {site.bridgly.claims.map((claim) => (
                <li key={claim}>{claim}</li>
              ))}
            </ul>
            <OutcomeDemo
              groupLabel={bridglyPage.demo.groupLabel}
              note={bridglyPage.demo.note}
              options={bridglyPage.demo.options}
            />
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell duo">
          <div className="tile" data-reveal="">
            <h2 className="org__title">{bridglyPage.moreTitle}</h2>
            <p>{bridglyPage.more}</p>
            <p>
              <a className="textlink" href={site.bridgly.url} rel="noopener">
                {site.bridgly.cta}&nbsp;<Arrow />
              </a>
            </p>
            <p>
              <Confirms items={bridglyPage.bridglyConfirms} />
            </p>
          </div>
          <div className="tile" data-reveal="">
            <h2 className="org__title">{bridglyPage.companyTitle}</h2>
            <p>{bridglyPage.company}</p>
          </div>
        </div>
      </section>
    </>
  );
}
