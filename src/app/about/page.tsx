import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/strings";
export const metadata = pageMetadata({
  title: "About DataGo",
  description: "We are a UK data and AI consultancy and the company behind Bridgly.",
  path: "/about",
});

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="DataGo" title="About DataGo" body="We are a UK data and AI consultancy and the company behind Bridgly." />
      <section className="content-band content-band--light">
        <div className="site-shell consultancy-copy">
          <h2>Dale Harrison, founder</h2>
          <p>Dale founded DataGo Ltd. We work with public-sector and regulated organisations on data platforms, analytics, AI and secure operations.</p>
          <h2>Company details</h2>
          <p>DataGo Ltd is registered in England and Wales under company number {site.legal.companyNumber}. Our registered office is {site.legal.registeredOffice}.</p>
        </div>
      </section>
    </>
  );
}
