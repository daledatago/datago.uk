"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DatagoMark } from "@/components/datago-mark";
import styles from "./demo-shell.module.css";

const demoLinks = [
  { href: "/demos", label: "Overview" },
  { href: "/demos/assessment-authoring", label: "Assessment authoring" },
  { href: "/demos/circular-economy", label: "Circular economy" },
  { href: "/demos/enterprise-delivery", label: "Enterprise delivery" },
];

export function DemoNavigation() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link aria-label="DataGo demonstrations overview" className={styles.brand} href="/demos">
          <DatagoMark size={34} />
          <span className={styles.brandName}>datago</span>
          <span className={styles.brandSection}>Working demonstrations</span>
        </Link>
        <nav aria-label="Demonstration navigation" className={styles.nav}>
          {demoLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={isActive ? styles.activeLink : undefined}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
