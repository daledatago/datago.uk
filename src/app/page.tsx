import { ButtonLink } from "@/components/button-link";
import { InfoCard } from "@/components/info-card";
import { PageIntro } from "@/components/page-intro";
import { bridglyLine, services } from "@/lib/consultancy";
import { routeMetadata } from "@/lib/metadata";

export const metadata = routeMetadata("/");

export default function Home() {
  return (
    <>
      <PageIntro eyebrow="DataGo Ltd" title="Data and AI consultancy for public-sector and regulated organisations" body="We build data platforms on Databricks and Microsoft Fabric, develop analytics and AI, and help teams run them securely. We also build Bridgly, our product for governing AI agents.">
        <ButtonLink href="/services">Explore our services</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">Contact DataGo</ButtonLink>
      </PageIntro>
      <section className="content-band content-band--light">
        <div className="site-shell consultancy-copy">
          <h2>What we do</h2>
          <div className="consultancy-grid">
            {services.map((service) => <InfoCard key={service.title} {...service} />)}
          </div>
          <h2>How we work</h2>
          <p>We start with the service you need to improve. We agree what success looks like, build in stages and hand over with the checks and documentation your team needs to run it.</p>
          <ButtonLink href="/public-sector" variant="dark">Working with the public sector</ButtonLink>
        </div>
      </section>
      <section className="content-band">
        <div className="site-shell consultancy-copy">
          <h2>Bridgly</h2>
          <p>{bridglyLine}</p>
          <ButtonLink href="/bridgly" variant="dark">See how Bridgly works</ButtonLink>
        </div>
      </section>
      <section className="content-band content-band--light">
        <div className="site-shell consultancy-copy">
          <h2>Tell us what you need to deliver</h2>
          <ButtonLink href="/contact" variant="dark">Contact DataGo</ButtonLink>
        </div>
      </section>
    </>
  );
}
