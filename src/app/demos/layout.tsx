import localFont from "next/font/local";
import { DemoNavigation } from "./demo-navigation";
import styles from "./demo-shell.module.css";

/* The demonstrations keep the typeface they were built with. */
const geist = localFont({
  src: "../../fonts/geist-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.site} ${geist.className}`}>
      <DemoNavigation />
      {children}
    </div>
  );
}
