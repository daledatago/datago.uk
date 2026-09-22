import type { Metadata } from "next";
import Link from "next/link";
import styles from "./demos.module.css";

export const metadata: Metadata = {
  title: "Working demonstrations",
  description: "Early DataGo demonstrations for evidence-led decisions and reviewable AI workflows.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/demos" },
};

export default function DemosPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.kicker}>DataGo / working demonstrations</div>
      <h1 className={styles.title}>See the decision, then inspect the evidence.</h1>
      <p className={styles.intro}>These early prototypes show how a small, mixed team can turn a complex problem into a clear decision and a reviewable workflow. They use illustrative data and are open for feedback.</p>
      <div className={styles.cards}>
        <Link className={styles.card} href="/demos/assessment-authoring">
          <span className={styles.cardNumber}>01 / Assessment</span>
          <h2>From source to reviewable question</h2>
          <p>Follow one draft question from approved source material through checks, human review and a recorded decision.</p>
          <span className={styles.cardAction}>Explore the assessment workflow →</span>
        </Link>
        <Link className={styles.card} href="/demos/circular-economy">
          <span className={styles.cardNumber}>02 / Circular value</span>
          <h2>Make a circular decision visible</h2>
          <p>Change a few business assumptions and see what happens to cost, resilience and the strength of the case.</p>
          <span className={styles.cardAction}>Explore the commercial model →</span>
        </Link>
        <Link className={styles.card} href="/demos/enterprise-delivery">
          <span className={styles.cardNumber}>03 / Enterprise delivery</span>
          <h2>Keep the customer in control</h2>
          <p>See how identity, data, evidence and model routing can sit inside the buyer&apos;s approved environment.</p>
          <span className={styles.cardAction}>Explore the architecture →</span>
        </Link>
      </div>
      <p className={styles.note}>Prototype only. Figures, organisations and review decisions are illustrative. No live service, approved assessment content or validated investment advice is represented here.</p>
    </div>
  );
}
