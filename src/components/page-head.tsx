import Link from "next/link";
import type { ReactNode } from "react";
import { ui } from "@/lib/strings";

type PageHeadProps = {
  eyebrow: string;
  title: string;
  body: string;
  crumb: string;
  children?: ReactNode;
};

export function PageHead({ eyebrow, title, body, crumb, children }: PageHeadProps) {
  return (
    <section className="page-head">
      <div className="shell">
        <nav aria-label={ui.breadcrumb} className="crumbs">
          <Link href="/">{ui.home}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero__body">{body}</p>
        {children}
      </div>
    </section>
  );
}
