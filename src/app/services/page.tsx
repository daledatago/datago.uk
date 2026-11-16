import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { FieldPoster } from "@/components/immersive/field-poster";
import { ServicesExplorer } from "@/components/immersive/services-explorer";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageHead } from "@/components/page-head";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { services, servicesPage, site, ui } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/services");

export default function ServicesPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/services",
          name: `${servicesPage.eyebrow} | ${site.name}`,
          description: metadata.description as string,
          breadcrumbs: [
            { name: ui.home, path: "/" },
            { name: servicesPage.eyebrow, path: "/services" },
          ],
          about: services.map((service) => service.name),
          mainEntity: { "@id": `${site.url}/#organization` },
        })}
      />

      <PageHead
        body={servicesPage.body}
        crumb={servicesPage.eyebrow}
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
      />

      <ServicesExplorer
        captions={services.map((service) => servicesPage.layerCaption(service.n, service.short))}
        items={services.map(({ slug, n, name, short, layer }) => ({ slug, n, name, short, layer }))}
        navLabel={servicesPage.navLabel}
        poster={<FieldPoster />}
      >
        {services.map((service, index) => (
          <section
            aria-labelledby={`${service.slug}-h`}
            className="panel"
            id={service.slug}
            key={service.slug}
          >
            <h2
              className="panel__kicker"
              data-reveal={index === 0 ? undefined : ""}
              id={`${service.slug}-h`}
            >
              <span>{service.n}</span>
              {service.name}
            </h2>
            <p className="panel__outcome" data-reveal={index === 0 ? undefined : ""}>
              {service.outcome}
            </p>
            <div className="panel__grid" data-reveal={index === 0 ? undefined : ""}>
              <div>
                <h3 className="label">{servicesPage.labels.problem}</h3>
                <p>{service.problem}</p>
              </div>
              <div>
                <h3 className="label">{servicesPage.labels.changes}</h3>
                <ul className="ticks">
                  {service.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="label">{servicesPage.labels.how}</h3>
                <p>{service.how}</p>
              </div>
            </div>
          </section>
        ))}
      </ServicesExplorer>

      <section aria-labelledby="cta-h" className="section section--alt band">
        <div className="shell cta-band" data-reveal="">
          <h2 className="headline" id="cta-h">
            {servicesPage.cta.title}
          </h2>
          <p className="lede">{servicesPage.cta.lede}</p>
          <div className="hero__cta">
            <Link className="btn" href="/contact">
              {ui.cta} <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
