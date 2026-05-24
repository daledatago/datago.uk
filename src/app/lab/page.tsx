import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { routeMetadata } from "@/lib/metadata";
import { labPage } from "@/lib/strings";

export const metadata: Metadata = routeMetadata("/lab");

export default function LabPage() {
  return (
    <>
      <PageIntro
        eyebrow={labPage.eyebrow}
        title={labPage.title}
        body={labPage.body}
      />

      <section className="content-band content-band--light">
        <div className="site-shell">
          <ul className="plain-list">
            {labPage.options.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
