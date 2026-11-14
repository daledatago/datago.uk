import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/metadata";
import { services } from "@/lib/consultancy";
export const metadata = pageMetadata({
  title: "Services",
  description: "Data platforms, analytics, AI and secure operations for public-sector and regulated organisations.",
  path: "/services",
});

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="DataGo" title="Services" body="Data platforms, analytics, AI and secure operations for public-sector and regulated organisations." />
      <section className="content-band content-band--light">
        <div className="site-shell consultancy-copy">
          {services.map(({ title, body }) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
