import { Geist } from "next/font/google";
import { DemoNavigation } from "./demo-navigation";
import styles from "./demo-shell.module.css";

/* The demonstrations keep the typeface they were built with. */
const geist = Geist({ subsets: ["latin"] });

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.site} ${geist.className}`}>
      <DemoNavigation />
      {children}
    </div>
  );
}
