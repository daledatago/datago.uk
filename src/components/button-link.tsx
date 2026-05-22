import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "dark";
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
}: ButtonLinkProps) {
  const className = `button-link button-link--${variant}`;
  const isHttpExternal = href.startsWith("http");
  const isNativeLink = href.startsWith("mailto:") || href.startsWith("tel:");

  if (isHttpExternal) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        <span>{children}</span>
        <span aria-hidden="true">-&gt;</span>
      </a>
    );
  }

  if (isNativeLink) {
    return (
      <a className={className} href={href}>
        <span>{children}</span>
        <span aria-hidden="true">-&gt;</span>
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">-&gt;</span>
    </Link>
  );
}
