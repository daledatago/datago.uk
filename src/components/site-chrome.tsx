"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { RevealObserver } from "@/components/reveal-observer";

type SiteChromeProps = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  skipLabel: string;
};

export function SiteChrome({ children, header, footer, skipLabel }: SiteChromeProps) {
  const pathname = usePathname();
  const isDemo = pathname === "/demos" || pathname.startsWith("/demos/");

  if (isDemo) {
    return (
      <div className="demo-root" data-theme="light">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="site">
      <a className="skip" href="#main">
        {skipLabel}
      </a>
      {header}
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      {footer}
      <RevealObserver key={pathname} />
    </div>
  );
}
