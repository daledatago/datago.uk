import { DemoNavigation } from "./demo-navigation";
import styles from "./demo-shell.module.css";

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.site}>
      <DemoNavigation />
      {children}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>DataGo working demonstrations</span>
          <span>Illustrative content for buyer review</span>
        </div>
      </footer>
    </div>
  );
}
