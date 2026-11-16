import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { ContactSection } from "@/components/contact-section";
import { CredentialsBand } from "@/components/credentials-band";
import { FieldPoster } from "@/components/immersive/field-poster";
import { HeroStage } from "@/components/immersive/hero-stage";
import { LayerStack } from "@/components/immersive/layer-stack";
import { Tilt } from "@/components/immersive/tilt";
import { JsonLdScript } from "@/components/json-ld-script";
import { OutcomeDemo } from "@/components/outcome-demo";
import { pageJsonLd } from "@/lib/metadata";
import { contact, home, services, site, ui } from "@/lib/strings";

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

      <HeroStage
        chapters={home.story.chapters}
        cue={home.story.cue}
        label={home.story.label}
        poster={<FieldPoster />}
      >
        <p className="eyebrow">{home.hero.eyebrow}</p>
        <h1 className="display">
          {home.hero.titleLines.map((line, index) => (
            <span className="display__line" key={line} style={delay(index * 90)}>
              <span>{line} </span>
            </span>
          ))}
          <span className="display__line" style={delay(home.hero.titleLines.length * 90)}>
            <em>{home.hero.titleEmphasis}</em>
          </span>
        </h1>
        <p className="stage__lede">{home.hero.body}</p>
        <div className="hero__cta">
          <Link className="btn" href="/#contact">
            {ui.cta} <Arrow />
          </Link>
          <Link className="btn btn--ghost" href={home.hero.secondary.href}>
            {home.hero.secondary.label}
          </Link>
        </div>
      </HeroStage>

      <section aria-labelledby="work-h" className="section section--alt band" id="work">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.work.eyebrow}</p>
            <h2 className="headline" id="work-h">
              {home.work.title}
            </h2>
            <p className="lede">{home.work.lede}</p>
          </div>
          <div data-reveal="">
            <LayerStack
              labels={{
                tabs: home.work.tabsLabel,
                outcome: home.work.labels.outcome,
                how: home.work.labels.how,
                more: home.work.more,
              }}
              layers={services.map((service) => ({
                slug: service.slug,
                n: service.n,
                layer: service.layer,
                name: service.name,
                short: service.short,
                outcome: service.outcome,
                how: service.how,
              }))}
            />
          </div>
          <div className="aside-line" data-reveal="">
            <p>
              <b>{home.work.tech.title}</b> {home.work.tech.body}
            </p>
            <Link className="textlink" href={home.work.all.href}>
              {home.work.all.label}&nbsp;<Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-h" className="section band" id="how">
        <div className="shell">
          <div className="section__head" data-reveal="">
            <p className="eyebrow">{home.how.eyebrow}</p>
            <h2 className="headline" id="how-h">
              {home.how.title}
            </h2>
          </div>
          <ol className="path" data-line="">
            {home.how.steps.map((step, index) => (
              <li data-reveal="" key={step.name} style={delay(index * 110)}>
                <span className="path__n">{`0${index + 1}`}</span>
                <h3>{step.name}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CredentialsBand />

      <section aria-labelledby="product-h" className="section section--alt band" id="product">
        <div className="shell">
          <div data-reveal="">
            <Tilt className="bridgly" max={1.5}>
              <div className="bridgly__say">
                <p className="eyebrow">{home.product.eyebrow}</p>
                <h2 id="product-h">{site.bridgly.name}</h2>
                <p className="bridgly__line">{site.bridgly.line}</p>
                <p className="lede">{home.product.lede}</p>
                <a
                  className="btn"
                  href={site.bridgly.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {site.bridgly.cta} <Arrow />
                  <span className="vh"> {ui.newTab}</span>
                </a>
              </div>
              <OutcomeDemo
                groupLabel={home.product.demoLabel}
                note={home.product.demoNote}
                options={home.product.options}
              />
            </Tilt>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-h" className="section band band--contact" id="contact">
        <div aria-hidden="true" className="band__motif">
          <FieldPoster />
        </div>
        <ContactSection eyebrow={contact.eyebrow} heading="h2" />
      </section>
    </>
  );
}
