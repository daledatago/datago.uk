import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/button-link";
export const metadata = pageMetadata({
  title: "Work",
  description: "Discuss the experience and delivery evidence you need for your project.",
  path: "/work",
});

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="DataGo" title="Work" body="Discuss the experience and delivery evidence you need for your project." />
      <section className="content-band content-band--light">
        <div className="site-shell consultancy-copy">
          <h2>Ask about relevant work</h2>
          <p>Tell us what you need to deliver and what evidence would help you assess our fit.</p>
          <ButtonLink href="/contact" variant="dark">Contact DataGo</ButtonLink>
        </div>
      </section>
    </>
  );
}
