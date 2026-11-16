import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { AudienceSwitcher } from "@/components/audience-switcher";
import { Confirms } from "@/components/confirm";
import { ContactSection } from "@/components/contact-section";
import { DatagoMark } from "@/components/datago-mark";
import { JsonLdScript } from "@/components/json-ld-script";
import { OutcomeDemo } from "@/components/outcome-demo";
import { StructureMap } from "@/components/structure-map";
import { pageJsonLd } from "@/lib/metadata";
import { bridglyPage, contact, home, services, site, ui } from "@/lib/strings";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const stagger = (index: number) => delay((index % 3) * 80);

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
            pause={home.map.pause}
            play={home.map.play}
            root={home.map.root}
          />
        </div>
      </section>

      <section aria-labelledby="roles-h" className="roles-band" id="roles">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.roles.eyebrow}</p>
            <h2 id="roles-h">{home.roles.title}</h2>
          </div>
          <AudienceSwitcher
            listLabel={home.roles.listLabel}
            roles={home.roles.items}
            startWith={home.roles.startWith}
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
            <ul className="chips">
              {home.work.tech.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
            <p>
              <Confirms items={home.work.tech.confirms} />
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="acc-h" className="section" id="accelerators">
        <div className="shell split">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.accelerators.eyebrow}</p>
            <h2 id="acc-h">{home.accelerators.title}</h2>
            <p className="lede">{home.accelerators.lede}</p>
            <p>
              {home.accelerators.proven}{" "}
              <Confirms items={home.accelerators.provenConfirms} />
            </p>
            {home.accelerators.confirms.map((item) => (
              <p key={item}>
                <Confirms items={[item]} />
              </p>
            ))}
          </div>
          <div className="compare" data-reveal="" style={delay(120)}>
            <p className="label">{home.accelerators.compare.label}</p>
            <div className="compare__row">
              <h3>{home.accelerators.compare.scratch.title}</h3>
              <div aria-hidden="true" className="bar">
                <i style={{ width: "62%" }} />
              </div>
              <p className="bar__key">{home.accelerators.compare.scratch.key}</p>
            </div>
            <div className="compare__row compare__row--on">
              <h3>{home.accelerators.compare.accelerator.title}</h3>
              <div aria-hidden="true" className="bar">
                <i style={{ width: "22%" }} />
                <i style={{ left: "22%", width: "78%" }} />
              </div>
              <p className="bar__key">{home.accelerators.compare.accelerator.key}</p>
            </div>
            <p className="note">{home.accelerators.compare.note}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="delivery-h" className="section section--alt" id="delivery">
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

          <div className="org" data-reveal="">
            <h3 className="org__title">{home.delivery.who.title}</h3>
            <ul className="org__grid">
              {home.delivery.who.items.map((item) => (
                <li className="tile tile--todo" key={item.title}>
                  <h4>{item.title}</h4>
                  {item.body ? <p>{item.body}</p> : null}
                  <p>
                    <Confirms items={item.confirms} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="sectors-h" className="section" id="sectors">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.sectors.eyebrow}</p>
            <h2 id="sectors-h">{home.sectors.title}</h2>
            <p className="lede">{home.sectors.lede}</p>
            <p className="note">
              <strong>{home.sectors.noteTitle}</strong> {home.sectors.note}
            </p>
          </div>
          <ul className="sectors">
            {home.sectors.items.map((item, index) => (
              <li className="sector" data-reveal="" key={item.title} style={stagger(index)}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="need">
                  <span className="label">{item.needLabel}</span>
                  <p>{item.need}</p>
                </div>
              </li>
            ))}
            <li className="sector sector--plain" data-reveal="" style={delay(160)}>
              <h3>{home.sectors.commercial.title}</h3>
              <p>{home.sectors.commercial.body}</p>
              <p>
                <Confirms items={home.sectors.commercial.confirms} />
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="products-h" className="section section--alt" id="products">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.products.eyebrow}</p>
            <h2 id="products-h">{home.products.title}</h2>
            <p className="lede">{home.products.lede}</p>
          </div>
          <div className="products">
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
                groupLabel={bridglyPage.demo.groupLabel}
                note={bridglyPage.demo.note}
                options={bridglyPage.demo.options}
              />
              <div className="btn-row">
                <a className="btn btn--ghost" href={site.bridgly.url} rel="noopener">
                  {site.bridgly.cta} <Arrow />
                </a>
                <Link className="textlink" href={home.products.more.href}>
                  {home.products.more.label}
                </Link>
              </div>
              <p>
                <Confirms items={home.products.bridglyConfirms} />
              </p>
            </article>
            <article className="card next" data-reveal="" style={delay(120)}>
              <p className="product__tag">{home.products.next.tag}</p>
              <h3>{home.products.next.title}</h3>
              <p>{home.products.next.body}</p>
              <p>
                <Confirms items={home.products.next.confirms} />
              </p>
              <p>
                <Link className="btn btn--ghost btn--sm" href={home.products.next.cta.href}>
                  {home.products.next.cta.label}
                </Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="ps-h" className="section" id="public-sector">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.publicSector.eyebrow}</p>
            <h2 id="ps-h">{home.publicSector.title}</h2>
            <p className="lede">{home.publicSector.lede}</p>
          </div>

          <h3 className="sub" data-reveal="">
            {home.publicSector.routesTitle}
          </h3>
          <ul className="trust">
            {home.publicSector.routes.map((route, index) => (
              <li className="tile tile--todo" data-reveal="" key={route.title} style={stagger(index)}>
                <h4>{route.title}</h4>
                <p>{route.body}</p>
                <p>
                  <Confirms items={route.confirms} />
                </p>
              </li>
            ))}
            <li className="tile tile--fact" data-reveal="">
              <h4>{home.publicSector.direct.title}</h4>
              <p>
                {home.publicSector.direct.before}
                <Link href={home.publicSector.direct.link.href}>
                  {home.publicSector.direct.link.label}
                </Link>
                {home.publicSector.direct.after}
              </p>
            </li>
            <li className="tile tile--todo" data-reveal="" style={delay(80)}>
              <h4>{home.publicSector.other.title}</h4>
              <p>
                <Confirms items={home.publicSector.other.confirms} />
              </p>
            </li>
          </ul>

          <h3 className="sub" data-reveal="" id="ps-check">
            {home.publicSector.checkTitle}
          </h3>
          <ul className="trust">
            {home.publicSector.checks.map((check, index) => (
              <li className="tile tile--todo" data-reveal="" key={check.title} style={stagger(index)}>
                <h4>{check.title}</h4>
                {check.body ? <p>{check.body}</p> : null}
                <p>
                  <Confirms items={check.confirms} />
                </p>
                {check.link ? (
                  <p>
                    <Link href={check.link.href}>{check.link.label}</Link>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="trust-h" className="section section--alt" id="trust">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.trust.eyebrow}</p>
            <h2 id="trust-h">{home.trust.title}</h2>
            <p className="lede">{home.trust.lede}</p>
          </div>

          <h3 className="sub" data-reveal="">
            {home.trust.evidenceTitle}
          </h3>
          <ul className="trust">
            {home.trust.evidence.map((item, index) => (
              <li className="tile tile--todo" data-reveal="" key={item.title} style={stagger(index)}>
                <h4>{item.title}</h4>
                {item.body ? <p>{item.body}</p> : null}
                <p>
                  <Confirms clearance={item.clearance} items={item.confirms} />
                </p>
              </li>
            ))}
          </ul>

          <h3 className="sub" data-reveal="">
            {home.trust.credentialsTitle}
          </h3>
          <ul className="trust">
            {home.trust.credentials.map((item, index) => (
              <li
                className={item.fact ? "tile tile--fact" : "tile tile--todo"}
                data-reveal=""
                key={item.title}
                style={stagger(index)}
              >
                <h4>{item.title}</h4>
                {item.body ? <p>{item.body}</p> : null}
                <p>
                  <Confirms items={item.confirms} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="contact-h" className="section" id="contact">
        <ContactSection eyebrow={contact.eyebrow} heading="h2" />
      </section>
    </>
  );
}
