import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/arrow";
import { Confirms } from "@/components/confirm";
import { JsonLdScript } from "@/components/json-ld-script";
import { pageJsonLd, pageMetadata } from "@/lib/metadata";
import { servicePage, services, site, ui } from "@/lib/strings";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

type ServiceProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return pageMetadata({
    title: service.name,
    description: service.page.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServiceProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const { page } = service;
  const path = `/services/${service.slug}`;

  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path,
          name: `${service.name} | ${site.name}`,
          description: page.description,
          breadcrumbs: [
            { name: ui.home, path: "/" },
            { name: service.name, path },
          ],
          about: [service.name],
          mainEntity: { "@id": `${site.url}/#organization` },
        })}
      />

      <section className="hero hero--page" id="top">
        <div className="shell hero__grid">
          <div>
            <nav aria-label={ui.breadcrumb} className="crumbs">
              <Link href="/">{ui.home}</Link>
              <span aria-hidden="true">/</span>
              <Link href={servicePage.parent.href}>{servicePage.parent.label}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{service.name}</span>
            </nav>
            <p className="eyebrow">{servicePage.eyebrow(service.n)}</p>
            <h1>{service.name}</h1>
            <p className="hero__body">{page.summary}</p>
            <div className="hero__cta">
              <Link className="btn" href="/#contact">
                {ui.cta} <Arrow />
              </Link>
              <a className="btn btn--ghost" href="#problems">
                {servicePage.secondaryCta}
              </a>
            </div>
          </div>
          <nav aria-label={servicePage.jump.label} className="jump">
            <p className="label">{servicePage.jump.label}</p>
            <ul>
              {servicePage.jump.items.map((item) => (
                <li key={item.who}>
                  <a href={item.href}>
                    {item.who}
                    <span>{item.what}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section aria-labelledby="problems-h" className="section section--alt" id="problems">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{servicePage.problems.eyebrow}</p>
            <h2 id="problems-h">{page.problemsTitle}</h2>
            <p className="lede">{servicePage.problems.lede}</p>
          </div>
          <ul className="cards3">
            {page.problems.map((problem, index) => (
              <li className="tile" data-reveal="" key={problem.title} style={delay(index * 80)}>
                <h3>{problem.title}</h3>
                <p>{problem.body}</p>
                <p className="label">{servicePage.problems.changeLabel}</p>
                <p>{problem.change}</p>
              </li>
            ))}
          </ul>
          {page.example ? (
            <p className="note more" data-reveal="">
              <strong>{servicePage.problems.exampleLabel}</strong> {page.example}
            </p>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="outcomes-h" className="section" id="outcomes">
        <div className="shell split">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{servicePage.outcomes.eyebrow}</p>
            <h2 id="outcomes-h">{page.outcomesTitle}</h2>
            <p className="lede">{servicePage.outcomes.lede}</p>
          </div>
          <ul className="ticks" data-reveal="" style={delay(120)}>
            {page.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="delivery-h" className="section section--alt" id="delivery">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{servicePage.delivery.eyebrow}</p>
            <h2 id="delivery-h">{servicePage.delivery.title}</h2>
          </div>
          <ol className="steps" data-line="">
            {page.phases.map((phase, index) => (
              <li className="step" data-reveal="" key={phase.name} style={delay(index * 120)}>
                <span className="step__n">{`0${index + 1}`}</span>
                <div>
                  <h3>{phase.name}</h3>
                  <span className="step__plain">{phase.plain}</span>
                  <p>{phase.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="note more" data-reveal="">
            <strong>{servicePage.delivery.acceleratorsLabel}</strong>{" "}
            {servicePage.delivery.accelerators}{" "}
            <Confirms items={servicePage.delivery.acceleratorsConfirms} />
          </p>
        </div>
      </section>

      <section aria-labelledby="technical-h" className="section" id="technical">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{servicePage.technical.eyebrow}</p>
            <h2 id="technical-h">{servicePage.technical.title}</h2>
            <p className="lede">
              {servicePage.technical.lede}{" "}
              <Confirms items={servicePage.technical.confirms} />
            </p>
          </div>
          <dl className="spec" data-reveal="">
            {page.technical.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
          {page.showDataClasses ? (
            <>
              <h3 className="sub" data-reveal="">
                {servicePage.technical.classesTitle}
              </h3>
              <ul className="classes" data-reveal="">
                {servicePage.technical.classes.map((item) => (
                  <li key={item.name}>
                    <b>{item.name}</b>
                    <span>{item.route}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="controls-h" className="section section--alt" id="controls">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{servicePage.controls.eyebrow}</p>
            <h2 id="controls-h">{servicePage.controls.title}</h2>
            <p className="lede">{servicePage.controls.lede}</p>
          </div>
          <ul className="checks" data-reveal="">
            {servicePage.controls.items.map((item) => (
              <li key={item.name}>
                <b>{item.name}</b>
                {item.detail}
              </li>
            ))}
          </ul>
          <div className="tech" data-reveal="">
            <h3>{servicePage.controls.bridgly.title}</h3>
            <p>{servicePage.controls.bridgly.body}</p>
            <p>
              <a className="textlink" href={site.bridgly.url} rel="noopener">
                {site.bridgly.cta}&nbsp;<Arrow />
              </a>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="buying-h" className="section" id="buying">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{servicePage.buying.eyebrow}</p>
            <h2 id="buying-h">{servicePage.buying.title}</h2>
            <p className="lede">{servicePage.buying.lede}</p>
          </div>
          <ul className="trust">
            {servicePage.buying.phases.map((phase, index) => (
              <li className="tile" data-reveal="" key={phase.name} style={delay(index * 80)}>
                <h3>{phase.name}</h3>
                <p className="label">{servicePage.buying.receiveLabel}</p>
                <p>{phase.body}</p>
              </li>
            ))}
            <li className="tile tile--todo" data-reveal="">
              <h3>{servicePage.buying.pricing.title}</h3>
              <p>
                <Confirms items={servicePage.buying.pricing.confirms} />
              </p>
            </li>
            <li className="tile tile--todo" data-reveal="" style={delay(80)}>
              <h3>{servicePage.buying.routes.title}</h3>
              <p>
                {servicePage.buying.routes.before}
                <Link href={servicePage.buying.routes.link.href}>
                  {servicePage.buying.routes.link.label}
                </Link>
                {servicePage.buying.routes.after}
              </p>
              <p>
                <Confirms items={servicePage.buying.routes.confirms} />
              </p>
            </li>
            <li className="tile tile--todo" data-reveal="" style={delay(160)}>
              <h3>{servicePage.buying.evidence.title}</h3>
              <p>
                <Confirms
                  clearance={servicePage.buying.evidence.clearance}
                  items={servicePage.buying.evidence.confirms}
                />
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="cta-h" className="section section--alt">
        <div className="shell cta-band" data-reveal="">
          <p className="eyebrow">{servicePage.cta.eyebrow}</p>
          <h2 id="cta-h">{servicePage.cta.title}</h2>
          <p className="lede">{servicePage.cta.lede}</p>
          <div className="hero__cta">
            <Link className="btn" href="/#contact">
              {ui.cta} <Arrow />
            </Link>
            <Link className="btn btn--ghost" href={servicePage.cta.secondary.href}>
              {servicePage.cta.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
