import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/button-link";
import { site } from "@/lib/strings";
import { bridglyLine } from "@/lib/consultancy";
export const metadata = pageMetadata({
  title: "Bridgly",
  description: "Bridgly is DataGo’s governance control plane for AI agents.",
  path: "/bridgly",
});

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="DataGo" title="Bridgly" body="Bridgly is DataGo’s governance control plane for AI agents." />
      <section className="content-band content-band--light">
        <div className="site-shell consultancy-copy">
          <h2>{bridglyLine}</h2>
          <p>Bridgly turns your standards into rules that a named person signs. The person who drafts a version needs someone else to sign it.</p>
          <p>At each enforcement point you connect, an agent’s action goes ahead, is held for a person, or is stopped.</p>
          <p>The decision record shows the rule, the clauses it serves, the version in force and who signed it.</p>
          <ButtonLink href={site.bridgly.url} variant="dark">Visit bridgly.ai</ButtonLink>
        </div>
      </section>
    </>
  );
}
