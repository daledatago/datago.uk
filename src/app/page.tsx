import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { InfoCard } from "@/components/info-card";
import { SectionHeading } from "@/components/section-heading";
import { home, site } from "@/lib/strings";

export default function Home() {
  return (
    <>
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
          </div>
          <div className="home-hero__visual" aria-label="Datago operating intelligence visual">
            <Image
              src={site.assets.hero}
              alt="Abstract network of enterprise systems and decision paths."
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell two-column">
          <SectionHeading
            eyebrow={home.thesis.eyebrow}
            title={home.thesis.title}
            body={home.thesis.body}
          />
          <div className="statement-panel">
            <p>Buyer -&gt; Datago -&gt; Bridgly</p>
            <span>Clear corporate path</span>
          </div>
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
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell">
          <SectionHeading
            eyebrow={home.support.eyebrow}
            title={home.support.title}
          />
          <div className="card-grid card-grid--four">
            {home.support.items.map((item) => (
              <InfoCard body={item.body} key={item.title} title={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell two-column two-column--center">
          <SectionHeading
            eyebrow={home.lab.eyebrow}
            title={home.lab.title}
            body={home.lab.body}
          />
          <ButtonLink href="/lab" variant="secondary">
            Read the lab note
          </ButtonLink>
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
