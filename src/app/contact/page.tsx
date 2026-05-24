import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { routeMetadata } from "@/lib/metadata";
import { contactPage, site } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        body={contactPage.body}
      >
        <ButtonLink href={`mailto:${site.email}`}>{contactPage.primary}</ButtonLink>
      </PageIntro>

      <section className="content-band content-band--light">
        <div className="site-shell contact-panel">
          <div>
            <span>Corporate email</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <p>{contactPage.note}</p>
        </div>
      </section>
    </>
  );
}
