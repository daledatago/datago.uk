import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { routeMetadata } from "@/lib/metadata";
import { termsPage } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/terms");

export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow={termsPage.eyebrow}
        title={termsPage.title}
        body={termsPage.body}
      />

      <section className="content-band content-band--light">
        <div className="site-shell">
          <ul className="plain-list">
            {termsPage.points.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
