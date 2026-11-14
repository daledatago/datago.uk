import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/button-link";
export const metadata = pageMetadata({
  title: "Public sector",
  description: "We help UK public-sector teams build and run data platforms, reporting and AI services.",
  path: "/public-sector",
});

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="DataGo" title="Public sector" body="We help UK public-sector teams build and run data platforms, reporting and AI services." />
      <section className="content-band content-band--light">
        <div className="site-shell consultancy-copy">
          <h2>Working together</h2>
          <p>We start with the service need, the data you can use and the constraints your team works within. We agree what to deliver, who will own it and how the team will test and support it.</p>
          <h2>Security and data protection</h2>
          <p>We agree access, data handling and security checks with your team before delivery starts. Contact us to discuss the evidence your procurement requires.</p>
          <h2>Accessibility and social value</h2>
          <p>We agree accessibility requirements at the start of a project and include them in acceptance checks. Tell us which social value outcomes form part of your procurement.</p>
          <h2>How to buy</h2>
          <p>Send us your scope, timetable and proposed route to market. We can discuss fit and provide supplier details for your checks.</p>
          <ButtonLink href="/contact" variant="dark">Contact DataGo</ButtonLink>
        </div>
      </section>
    </>
  );
}
