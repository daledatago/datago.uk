import { ButtonLink } from "@/components/button-link";
import { BridglyOperatingGraph } from "@/components/bridgly-operating-graph";
import { BuildLoop } from "@/components/build-loop";
import { InfoCard } from "@/components/info-card";
import { JsonLdScript } from "@/components/json-ld-script";
import { PrinciplesShowcase } from "@/components/principles-showcase";
import { SectionHeading } from "@/components/section-heading";
import { faqJsonLd, pageJsonLd } from "@/lib/metadata";
import { home, site } from "@/lib/strings";

export default function Home() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/",
          name: "DataGo | Governed AI systems for organisations",
          description: site.description,
          about: [
            "DataGo Solutions Ltd",
            "Datago Ltd",
            "governed AI systems",
            "enterprise AI readiness",
            "AI governance",
          ],
          mentions: [
            "Bridgly",
            "organisational intelligence",
            "AI impact measurement",
            "AI adoption visibility",
            "measurable AI outcomes",
          ],
          mainEntity: {
            "@id": `${site.url}/#organization`,
          },
        })}
      />
      <JsonLdScript data={faqJsonLd(home.answers)} />

      <section className="home-hero">
        <div className="site-shell home-hero__grid">
          <div className="home-hero__copy">
            <p className="eyebrow">{home.hero.eyebrow}</p>
            <h1>{home.hero.title}</h1>
            <p className="lede">{home.hero.body}</p>
            <div className="button-row">
              <ButtonLink href="/bridgly">{home.hero.primaryCta}</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                {home.hero.secondaryCta}
              </ButtonLink>
            </div>
            <div className="home-hero__meta" aria-label="DataGo company details">
              <span>
                <strong>Company</strong>
                {site.legalName} · {site.legal.companyNumber}
              </span>
              <span>
                <strong>Flagship</strong>
                Bridgly platform
              </span>
            </div>
          </div>
          <div className="home-hero__graph">
            <BridglyOperatingGraph />
          </div>
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell">
          <SectionHeading
            eyebrow={home.thesis.eyebrow}
            title={home.thesis.title}
            body={home.thesis.body}
          />
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell feature-band">
          <div>
            <p className="eyebrow">{home.bridgly.eyebrow}</p>
            <h2>{home.bridgly.title}</h2>
            <p>{home.bridgly.body}</p>
          </div>
          <ButtonLink href={site.bridgly.url} variant="dark">
            {home.bridgly.cta}
          </ButtonLink>
        </div>
        <div className="flagship-path">
          {home.bridgly.path.map((item, index) => (
            <article className="flagship-path__card" key={item.title}>
              <span className="flagship-path__step">{`0${index + 1}`}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell">
          <SectionHeading
            eyebrow={home.buildLoop.eyebrow}
            title={home.buildLoop.title}
            body={home.buildLoop.body}
          />
          <BuildLoop phases={home.buildLoop.phases} />
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell">
          <SectionHeading
            eyebrow={home.principles.eyebrow}
            title={home.principles.title}
            body={home.principles.body}
          />
          <PrinciplesShowcase items={home.principles.items} />
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell">
          <SectionHeading
            eyebrow="At a glance"
            title="The company layer and product layer stay distinct."
            body="DataGo explains the company thesis, trust posture, and why governed AI systems matter. Bridgly carries the detailed product path."
          />
          <div className="card-grid card-grid--three">
            <InfoCard
              title="DataGo"
              body="The UK company context, founder-led thesis, and product studio direction behind governed AI systems."
            />
            <InfoCard
              title="Bridgly"
              body="The flagship platform for organisational intelligence, AI adoption visibility, governance, and measurable improvement."
            />
            <InfoCard
              title="Organisations"
              body="Use the system to see what AI changes, govern the behaviour, and improve from real operating evidence."
            />
          </div>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Answer-ready summary"
            title="Quick answers about DataGo"
            body="These short answers make the company-to-product relationship easier for search engines, answer engines, and buyers to understand."
          />
          <div className="card-grid card-grid--three">
            {home.answers.map((item) => (
              <InfoCard
                body={item.answer}
                key={item.question}
                title={item.question}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="site-shell contact-cta__inner">
          <div>
            <h2>{home.contact.title}</h2>
            <p>{home.contact.body}</p>
          </div>
          <ButtonLink href={`mailto:${site.email}`} variant="dark">
            {home.contact.cta}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
