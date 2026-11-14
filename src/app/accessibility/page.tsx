import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/strings";
export const metadata = pageMetadata({
  title: "Accessibility statement",
  description: "This statement applies to the DataGo company website at datago.uk.",
  path: "/accessibility",
});

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="DataGo" title="Accessibility statement" body="This statement applies to the DataGo company website at datago.uk." />
      <section className="content-band content-band--light">
        <div className="site-shell consultancy-copy">
          <h2>Using this website</h2>
          <p>We aim to meet WCAG 2.2 AA. We design the site so you can navigate with a keyboard, zoom in and read it on a phone.</p>
          <h2>Assessment status</h2>
          <p>We are reviewing the site against WCAG 2.2 AA. A full assessment is pending.</p>
          <h2>Report a problem</h2>
          <p>If you have trouble using any page or need information in a different format, email <a href={`mailto:${site.email}`}>{site.email}</a>. Include the page address and tell us what would help.</p>
        </div>
      </section>
    </>
  );
}
