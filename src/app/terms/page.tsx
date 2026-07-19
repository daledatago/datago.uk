import type { Metadata } from "next";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageIntro } from "@/components/page-intro";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { site, termsPage } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/terms");

export default function TermsPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/terms",
          name: "DataGo website terms of use",
          description: metadata.description as string,
          type: "WebPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Terms", path: "/terms" },
          ],
          about: ["DataGo Ltd", "corporate website terms", "Bridgly"],
          mainEntity: {
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
          },
        })}
      />

      <PageIntro
        eyebrow={termsPage.eyebrow}
        title={termsPage.title}
        body={termsPage.body}
      />

      <section className="content-band content-band--light">
        <div className="site-shell">
          <p className="eyebrow">Updated {termsPage.updated}</p>
          <p>{termsPage.bridglyNotice}</p>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell">
          {termsPage.sections.map((section) => (
            <article className="content-band" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell">
          <h2>Related legal pages</h2>
          <ul className="plain-list">
            {termsPage.relatedLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
