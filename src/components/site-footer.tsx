import Link from "next/link";
import { Confirms } from "@/components/confirm";
import { DatagoMark } from "@/components/datago-mark";
import { footer, site, ui } from "@/lib/strings";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <Link aria-label={ui.homeLabel} className="logo" href="/">
              <DatagoMark size={28} />
              {ui.wordmark}
            </Link>
            <p>{site.tagline}</p>
          </div>
          {footer.columns.map((column) => (
            <nav aria-label={column.label} key={column.title}>
              <h2 className="footer__title">{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer__legal">
          <p>
            {footer.legalLine(year)} <Confirms items={site.legal.confirms} />
          </p>
          <p>
            {footer.productLine}{" "}
            <a href={site.bridgly.url} rel="noopener">
              {site.bridgly.urlLabel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
