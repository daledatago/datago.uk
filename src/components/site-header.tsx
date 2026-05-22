import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { navItems } from "@/lib/strings";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <LogoMark />
        <nav aria-label="Primary navigation" className="site-nav">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

