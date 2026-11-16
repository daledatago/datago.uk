import Link from "next/link";
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
                    {link.external ? (
                      <a href={link.href} rel="noopener noreferrer" target="_blank">
                        {link.label}
                        <span className="vh"> {ui.newTab}</span>
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer__legal">
          <p>{footer.legalLine(year)}</p>
          <p>
            {footer.productLine}{" "}
            <a href={site.bridgly.url} rel="noopener noreferrer" target="_blank">
              {site.bridgly.urlLabel}
              <span className="vh"> {ui.newTab}</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
