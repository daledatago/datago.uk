"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DatagoMark } from "@/components/datago-mark";
import styles from "./demo-shell.module.css";

const demoLinks = [
  { href: "/demos", label: "Overview" },
  { href: "/demos/citb-assessment", label: "CITB assessment" },
  { href: "/demos/circular-economy", label: "Circular economy" },
  { href: "/demos/enterprise-delivery", label: "Enterprise delivery" },
];

export function DemoNavigation() {
  const pathname = usePathname();
  const isAssessmentWorkspace = pathname.startsWith("/demos/citb-assessment") || pathname.startsWith("/demos/assessment-authoring");
  const isCircularWorkspace = pathname.startsWith("/demos/circular-economy") || pathname.startsWith("/demos/circular-value");

  if (isAssessmentWorkspace) {
    return (
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link aria-label="CITB Assessment Studio prototype" className={styles.brand} href="/demos/citb-assessment">
            <DatagoMark size={34} />
            <span className={styles.brandName}>datago</span>
            <span className={styles.brandSection}>CITB assessment prototype</span>
          </Link>
          <div className={styles.prototypeStatus}><span />Illustrative, non-production workspace</div>
        </div>
      </header>
    );
  }

  if (isCircularWorkspace) {
    return (
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link aria-label="Circular economy prototype" className={styles.brand} href="/demos/circular-economy">
            <DatagoMark size={34} />
            <span className={styles.brandName}>datago</span>
            <span className={styles.brandSection}>Circular economy prototype</span>
          </Link>
          <div className={styles.prototypeStatus}><span />Illustrative, non-production workspace</div>
        </div>
      </header>
    );
  }

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
