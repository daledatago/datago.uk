import { DemoNavigation } from "./demo-navigation";
import styles from "./demo-shell.module.css";

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.site}>
      <DemoNavigation />
      {children}
    </div>
  );
}
