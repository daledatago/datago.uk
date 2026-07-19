import type { Metadata } from "next";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageIntro } from "@/components/page-intro";
import { pageJsonLd, routeMetadata } from "@/lib/metadata";
import { privacyPage, site } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <>
      <JsonLdScript
        data={pageJsonLd({
          path: "/privacy",
          name: "DataGo privacy notice",
          description: metadata.description as string,
          type: "WebPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Privacy", path: "/privacy" },
          ],
          about: ["DataGo Ltd", "corporate website privacy", "Bridgly"],
          mainEntity: {
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
          },
        })}
      />

      <PageIntro
        eyebrow={privacyPage.eyebrow}
        title={privacyPage.title}
        body={privacyPage.body}
      />

      <section className="content-band content-band--light">
        <div className="site-shell">
          <p className="eyebrow">Updated {privacyPage.updated}</p>
          <p>{privacyPage.bridglyNotice}</p>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell">
          {privacyPage.sections.map((section) => (
            <article className="content-band" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul className="plain-list">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell">
          <h2>Related legal pages</h2>
          <ul className="plain-list">
            {privacyPage.relatedLinks.map((item) => (
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
