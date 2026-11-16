import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { ContactSection } from "@/components/contact-section";
import { DatagoMark } from "@/components/datago-mark";
import { JsonLdScript } from "@/components/json-ld-script";
import { OutcomeDemo } from "@/components/outcome-demo";
import { StructureMap } from "@/components/structure-map";
import { pageJsonLd } from "@/lib/metadata";
import { bridglyDemo, contact, home, services, site, ui } from "@/lib/strings";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/",
          name: home.title,
          description: site.description,
          about: services.map((service) => service.name),
          mentions: [site.bridgly.name],
          mainEntity: { "@id": `${site.url}/#organization` },
        })}
      />

      <section className="hero" id="top">
        <div className="shell hero__grid">
          <div>
            <p className="eyebrow">{home.hero.eyebrow}</p>
            <h1>
              {home.hero.titleBefore}
              <em>{home.hero.titleEmphasis}</em>
              {home.hero.titleAfter}
            </h1>
            <p className="hero__body">{home.hero.body}</p>
            <div className="hero__cta">
              <Link className="btn" href="/#contact">
                {ui.cta} <Arrow />
              </Link>
              {home.hero.secondary.map((item) => (
                <Link className="btn btn--ghost" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <StructureMap
            branches={[
              {
                id: "b1",
                label: home.map.consulting.label,
                note: home.map.consulting.note,
                leaves: services.map((service, index) => ({
                  id: `l${index + 1}`,
                  label: service.mapLabel,
                  href: `/#${service.anchor}`,
                  captionTitle: `${service.name}.`,
                  caption: service.mapCaption,
                })),
              },
              {
                id: "b2",
                label: home.map.products.label,
                note: home.map.products.note,
                leaves: home.map.productLeaves,
              },
            ]}
            caption={home.map.caption}
            captionTitle={home.map.captionTitle}
            label={home.map.label}
            newTab={ui.newTab}
            pause={home.map.pause}
            play={home.map.play}
            root={home.map.root}
          />
        </div>
      </section>

      <section aria-labelledby="work-h" className="section section--alt" id="work">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.work.eyebrow}</p>
            <h2 id="work-h">{home.work.title}</h2>
            <p className="lede">{home.work.lede}</p>
          </div>
          <div className="areas">
            {services.map((service) => (
              <article className="area" data-reveal="" id={service.anchor} key={service.slug}>
                <div className="area__head">
                  <span className="area__n">{service.n}</span>
                  <h3>{service.name}</h3>
                  <Link
                    aria-label={`${home.work.more}: ${service.name}`}
                    className="textlink"
                    href={`/services/${service.slug}`}
                  >
                    {home.work.more}&nbsp;<Arrow />
                  </Link>
                </div>
                <div className="area__cell area__cell--problem">
                  <h4 className="label">{home.work.labels.problem}</h4>
                  <p>{service.problem}</p>
                </div>
                <div className="area__cell area__cell--outcome">
                  <h4 className="label">{home.work.labels.outcome}</h4>
                  <p>{service.outcome}</p>
                </div>
                <div className="area__cell area__cell--how">
                  <h4 className="label">{home.work.labels.how}</h4>
                  <p>{service.how}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="tech" data-reveal="">
            <h3>{home.work.tech.title}</h3>
            <p>{home.work.tech.body}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="delivery-h" className="section" id="delivery">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.delivery.eyebrow}</p>
            <h2 id="delivery-h">{home.delivery.title}</h2>
            <p className="lede">{home.delivery.lede}</p>
          </div>
          <ol className="steps" data-line="">
            {home.delivery.phases.map((phase, index) => (
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

          <div className="org" data-reveal="">
            <h3 className="org__title">{home.delivery.settle.title}</h3>
            <ul className="checks">
              {home.delivery.settle.items.map((item) => (
                <li key={item.name}>
                  <b>{item.name}</b>
                  {item.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="products-h" className="section section--alt" id="products">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.products.eyebrow}</p>
            <h2 id="products-h">{home.products.title}</h2>
            <p className="lede">{home.products.lede}</p>
          </div>
          <div className="products products--one">
            <article className="card product" data-reveal="">
              <p className="product__tag">
                <DatagoMark size={16} />
                {site.bridgly.tag}
              </p>
              <h3>{site.bridgly.name}</h3>
              <p className="product__line">{site.bridgly.line}</p>
              <ul className="product__list">
                {site.bridgly.claims.map((claim) => (
                  <li key={claim}>{claim}</li>
                ))}
              </ul>
              <OutcomeDemo
                groupLabel={bridglyDemo.groupLabel}
                note={bridglyDemo.note}
                options={bridglyDemo.options}
              />
              <div className="btn-row">
                <a
                  className="btn btn--ghost"
                  href={site.bridgly.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {site.bridgly.cta} <Arrow />
                  <span className="vh"> {ui.newTab}</span>
                </a>
                <a
                  className="textlink"
                  href={home.products.more.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {home.products.more.label}
                  <span className="vh"> {ui.newTab}</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-h" className="section" id="contact">
        <ContactSection eyebrow={contact.eyebrow} heading="h2" />
      </section>
    </>
  );
}
