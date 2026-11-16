import Link from "next/link";
import { Confirms } from "@/components/confirm";
import { PageHead } from "@/components/page-head";
import { legalPages } from "@/lib/strings";

type LegalPageProps = {
  page: {
    eyebrow: string;
    title: string;
    body: string;
    updated: string;
    bridglyNotice?: string;
    confirms?: string[];
    sections: {
      title: string;
      paragraphs: string[];
      bullets?: string[];
      confirms?: string[];
    }[];
    relatedLinks?: { label: string; href: string }[];
  };
};

/** Privacy notice, terms and accessibility statement share this layout. */
export function LegalPage({ page }: LegalPageProps) {
  return (
    <>
      <PageHead body={page.body} crumb={page.eyebrow} eyebrow={page.eyebrow} title={page.title} />
      <section className="section section--alt">
        <div className="shell">
          <div className="prose">
            <article>
              <p className="label">{`${legalPages.updatedLabel} ${page.updated}`}</p>
              {page.bridglyNotice ? <p>{page.bridglyNotice}</p> : null}
              {page.confirms ? (
                <p>
                  <Confirms items={page.confirms} />
                </p>
              ) : null}
            </article>
            {page.sections.map((section) => (
              <article key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.confirms ? (
                  <p>
                    <Confirms items={section.confirms} />
                  </p>
                ) : null}
              </article>
            ))}
            {page.relatedLinks ? (
              <article>
                <h2>{legalPages.relatedTitle}</h2>
                <div className="related">
                  {page.relatedLinks.map((item) =>
                    item.href.startsWith("http") ? (
                      <a href={item.href} key={item.href} rel="noopener">
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} key={item.href}>
                        {item.label}
                      </Link>
                    ),
                  )}
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
