import Link from "next/link";
import { footerLinks, site } from "@/lib/strings";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell site-footer__grid">
        <div>
          <p className="footer-brand">{site.legalName}</p>
          <p className="footer-muted">Company number: {site.legal.companyNumber}</p>
          <p className="footer-muted">
            Registered office: {site.legal.registeredOffice}
          </p>
          <a className="footer-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <nav aria-label="Footer navigation" className="footer-links">
          {footerLinks.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

