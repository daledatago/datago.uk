import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/metadata";
import { privacyPage } from "@/lib/strings";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "Privacy notice for Datago.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow={privacyPage.eyebrow}
        title={privacyPage.title}
        body={privacyPage.body}
      />

      <section className="content-band content-band--light">
        <div className="site-shell">
          <ul className="plain-list">
            {privacyPage.points.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

