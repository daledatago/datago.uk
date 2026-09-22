import type { Metadata } from "next";
import styles from "../prototype.module.css";

export const metadata: Metadata = {
  title: "Enterprise delivery demonstration",
  description: "A conceptual view of buyer-controlled delivery, data governance and model routing.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/demos/enterprise-delivery" },
};

export default function EnterpriseDeliveryPage() {
  return (
    <div className={styles.page}>
      <div className={styles.topline}>
        <span>03 / Enterprise delivery</span>
      </div>

      <header className={styles.hero}>
        <span className={styles.eyebrow}>Conceptual architecture · decisions still to agree</span>
        <h1>Delivered into the customer&apos;s environment.</h1>
        <p>The experience, identity, data and policies belong to the buyer. DataGo brings the architecture, workflow and integration approach, then works within the services and model routes the buyer approves.</p>
      </header>

      <section className={styles.architecturePanel} aria-labelledby="architecture-title">
        <div className={styles.panelHead}><span>High-level architecture</span><span className={styles.pill}>Buyer controlled</span></div>
        <h2 id="architecture-title">One governed route from user to outcome</h2>
        <div className={styles.architectureFlow}>
          <div className={styles.architectureNode}>
            <small>Customer experience</small>
            <strong>Web application · existing portal · approved assistant</strong>
          </div>
          <div className={styles.flowArrow} aria-hidden="true">↓</div>
          <div className={styles.customerBoundary}>
            <div className={styles.boundaryLabel}>Customer environment</div>
            <div className={styles.architectureRow}>
              <div><small>Access</small><strong>Identity and roles</strong></div>
              <div><small>Decisioning</small><strong>Workflow and rules</strong></div>
              <div><small>Information</small><strong>Customer data and evidence</strong></div>
              <div><small>Assurance</small><strong>Audit and monitoring</strong></div>
            </div>
            <div className={styles.gateway}>Policy gateway selects the approved processing route</div>
            <div className={styles.modelRoutes}>
              <div><small>Route A</small><strong>Managed inference</strong><span>Only for approved data, geography and terms</span></div>
              <div><small>Route B</small><strong>Private or local inference</strong><span>For workloads that must stay under customer control</span></div>
              <div><small>Route C</small><strong>No model required</strong><span>Rules, calculations and human review continue</span></div>
            </div>
          </div>
        </div>
        <p className={styles.architectureNote}>The current demonstrations use public or synthetic information. They do not implement this enterprise architecture or process customer data.</p>
      </section>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Circular value</span><span className={styles.pill}>Potential journey</span></div>
          <h2>A business evaluates its own case</h2>
          <ol className={styles.journeyList}>
            <li><b>1</b><span>Follow a programme link and sign in using the buyer-selected identity approach.</span></li>
            <li><b>2</b><span>Enter a limited set of assumptions inside an isolated organisation workspace.</span></li>
            <li><b>3</b><span>Compare scenarios and see the evidence, confidence and owner behind each assumption.</span></li>
            <li><b>4</b><span>Share an investment case or decide what needs testing in a pilot.</span></li>
            <li><b>5</b><span>Provide only consented, anonymised aggregate insight to the programme sponsor.</span></li>
          </ol>
        </section>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Assessment authoring</span><span className={styles.pill}>Potential journey</span></div>
          <h2>An authorised team controls every item</h2>
          <ol className={styles.journeyList}>
            <li><b>1</b><span>Staff sign in through the organisation&apos;s identity service.</span></li>
            <li><b>2</b><span>Select approved, versioned source material and the assessment specification.</span></li>
            <li><b>3</b><span>Generate structured drafts through the model route approved for that content class.</span></li>
            <li><b>4</b><span>Run checks and require named subject and assessment specialists to review.</span></li>
            <li><b>5</b><span>Export approved content with its evidence and decision history.</span></li>
          </ol>
        </section>
      </div>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Customer control</span><span className={styles.pill}>Design principle</span></div>
          <h2>What stays under buyer policy</h2>
          <ul className={styles.checks}>
            <li>Identity, roles and access approval</li><li>Raw business or assessment data</li><li>Model route and processing geography</li><li>Encryption keys, secrets and retention</li><li>Evidence, decision history and audit records</li>
          </ul>
        </section>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>DataGo role</span><span className={styles.pill}>Delivery partner</span></div>
          <h2>What DataGo brings</h2>
          <ul className={styles.checks}>
            <li>Discovery and target architecture</li><li>Data, workflow and AI engineering</li><li>Integration with the buyer&apos;s existing services</li><li>Testing, measurement and security evidence</li><li>Handover, support and an agreed exit route</li>
          </ul>
        </section>
      </div>

      <section className={styles.endnote}>
        <h2>These choices belong in discovery</h2>
        <p>The briefs do not currently prescribe white-labelling, a DataGo-hosted portal, a particular identity provider or a model provider. We would agree the buyer experience, hosting boundary, data classes, inference location, integrations and operating model before accepting sensitive information.</p>
      </section>
    </div>
  );
}
