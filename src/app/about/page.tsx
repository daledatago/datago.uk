import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { Confirms } from "@/components/confirm";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageHead } from "@/components/page-head";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { aboutPage, site, ui } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/about");

export default function AboutPage() {
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

      <section className="section section--alt">
        <div className="shell">
          <dl className="facts" data-reveal="">
            {aboutPage.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="two-h" className="section">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <h2 id="two-h">{aboutPage.twoWays.title}</h2>
          </div>
          <div className="duo">
            {aboutPage.twoWays.items.map((item) => (
              <div className="tile tile--fact" data-reveal="" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <p>
                  <Link className="textlink" href={item.link.href}>
                    {item.link.label}&nbsp;<Arrow />
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="people-h" className="section section--alt">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <h2 id="people-h">{aboutPage.people.title}</h2>
          </div>
          <ul className="trust">
            {aboutPage.people.tiles.map((tile) => (
              <li className="tile tile--todo" data-reveal="" key={tile.title}>
                <h3>{tile.title}</h3>
                {tile.body ? <p>{tile.body}</p> : null}
                <p>
                  <Confirms items={tile.confirms} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="approach-h" className="section">
        <div className="shell cta-band" data-reveal="">
          <h2 id="approach-h">{aboutPage.approach.title}</h2>
          <p className="lede">{aboutPage.approach.body}</p>
          <div className="hero__cta">
            <Link className="btn btn--ghost" href={aboutPage.approach.link.href}>
              {aboutPage.approach.link.label}
            </Link>
            <Link className="btn" href="/#contact">
              {ui.cta} <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
