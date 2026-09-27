"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import styles from "../prototype.module.css";

type View = "overview" | "case" | "evidence" | "review" | "insights";
type Role = "owner" | "adviser" | "sponsor";
type Model = { recovered: number; linear: number; circular: number; annualValue: number; threeYearValue: number; evidenceCoverage: number };

const money = (value: number) => new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
}).format(value);

const nav: { id: View; label: string; short: string }[] = [
  { id: "overview", label: "Opportunity", short: "Home" },
  { id: "case", label: "Case builder", short: "Case" },
  { id: "evidence", label: "Evidence", short: "Proof" },
  { id: "review", label: "Review and share", short: "Review" },
  { id: "insights", label: "Programme insights", short: "Insights" },
];

const roleLabels: Record<Role, string> = {
  owner: "Business owner",
  adviser: "Business adviser",
  sponsor: "ZWS analyst",
};

const evidenceRows = [
  { source: "Purchase ledger", use: "Virgin material cost baseline", owner: "Finance", confidence: "High", status: "Connected" },
  { source: "Returns pilot", use: "Recoverable unit rate", owner: "Operations", confidence: "Medium", status: "Needs 8 weeks" },
  { source: "Customer interviews", use: "Retention and service value", owner: "Commercial", confidence: "Low", status: "6 of 12 complete" },
  { source: "Market price index", use: "Material cost volatility", owner: "Adviser", confidence: "Medium", status: "External source" },
];

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "good" | "warn" | "neutral" | "blue" }) {
  return <span className={`${styles.circularBadge} ${styles[`circularBadge${tone}`]}`}>{children}</span>;
}

export function CircularDemo() {
  const [view, setView] = useState<View>("overview");
  const [role, setRole] = useState<Role>("owner");
  const [units, setUnits] = useState(1000);
  const [recovery, setRecovery] = useState(40);
  const [refurbishment, setRefurbishment] = useState(36);
  const [materialCost, setMaterialCost] = useState(70);
  const [uplift, setUplift] = useState(15);

  const model = useMemo(() => {
    const recovered = Math.round(units * recovery / 100);
    const linear = units * materialCost * (1 + uplift / 100);
    const circularMaterials = (units - recovered) * materialCost * (1 + uplift / 100);
    const refurbishmentTotal = recovered * refurbishment;
    const annualValue = linear - circularMaterials - refurbishmentTotal;
    return {
      recovered,
      linear,
      circular: circularMaterials + refurbishmentTotal,
      annualValue,
      threeYearValue: annualValue * 3,
      evidenceCoverage: 68,
    };
  }, [units, recovery, refurbishment, materialCost, uplift]);

  const selectRole = (nextRole: Role) => {
    setRole(nextRole);
    if (nextRole === "sponsor") setView("insights");
    if (nextRole !== "sponsor" && view === "insights") setView("overview");
  };

  return (
    <main className={styles.circularPage}>
      <header className={styles.circularIntro}>
        <div>
          <span className={styles.eyebrow}>Zero Waste Scotland · CivTech 12.3</span>
          <h1>Build a commercial case for circular change</h1>
          <p>A clickable product hypothesis showing how a Scottish business could test an opportunity, strengthen its evidence and prepare an investment case.</p>
        </div>
        <div className={styles.prototypeNote}>
          <strong>Illustrative non-production workspace</strong>
          <span>Mock company, sources and programme data. Controls demonstrate intended journeys, not completed production capability.</span>
        </div>
      </header>

      <section className={styles.circularWorkbench} aria-label="Circular commercial case workspace">
        <aside className={styles.circularSidebar}>
          <div className={styles.workspaceIdentity}>
            <span className={styles.workspaceMark}>NP</span>
            <div><strong>Northshore Products</strong><small>Repair and reuse case</small></div>
          </div>
          <nav className={styles.circularNav} aria-label="Prototype sections">
            {nav.map((item, index) => {
              const unavailable = role === "sponsor" ? item.id !== "insights" : item.id === "insights";
              return (
                <button key={item.id} disabled={unavailable} className={view === item.id ? styles.circularNavActive : ""} onClick={() => setView(item.id)}>
                  <b>0{index + 1}</b><span>{item.label}</span><small>{item.short}</small>
                </button>
              );
            })}
          </nav>
          <div className={styles.circularPrivacy}>
            <span>Data boundary</span>
            <strong>{role === "sponsor" ? "Aggregated programme data" : "Northshore private workspace"}</strong>
            <small>{role === "sponsor" ? "No named company records visible" : "Named records stay with the business and permitted advisers"}</small>
          </div>
        </aside>

        <div className={styles.circularMain}>
          <div className={styles.circularTopbar}>
            <div><span className={styles.liveDot} />Prototype role preview</div>
            <label>
              <span>Viewing as</span>
              <select value={role} onChange={event => selectRole(event.target.value as Role)}>
                {(Object.keys(roleLabels) as Role[]).map(key => <option key={key} value={key}>{roleLabels[key]}</option>)}
              </select>
            </label>
          </div>

          <div className={styles.circularContent}>
            {view === "overview" && <Overview model={model} onOpenCase={() => setView("case")} onOpenEvidence={() => setView("evidence")} />}
            {view === "case" && <CaseBuilder values={{ units, recovery, refurbishment, materialCost, uplift }} setters={{ setUnits, setRecovery, setRefurbishment, setMaterialCost, setUplift }} model={model} />}
            {view === "evidence" && <Evidence role={role} />}
            {view === "review" && <Review model={model} role={role} />}
            {view === "insights" && <Insights />}
          </div>
        </div>
      </section>

      <footer className={styles.circularFootnote}>
        <strong>What the funded stages would prove</strong>
        <p>Exploration would test the commercial methodology, data availability, user needs and sponsor governance. The Accelerator would build and validate an MVP. Production architecture, integrations and operating support would be agreed only after those assumptions are tested.</p>
      </footer>
    </main>
  );
}

function ViewHeading({ eyebrow, title, body, action }: { eyebrow: string; title: string; body: string; action?: ReactNode }) {
  return <div className={styles.circularViewHeading}><div><span>{eyebrow}</span><h2>{title}</h2><p>{body}</p></div>{action}</div>;
}

function Overview({ model, onOpenCase, onOpenEvidence }: { model: Model; onOpenCase: () => void; onOpenEvidence: () => void }) {
  return <>
    <ViewHeading eyebrow="Opportunity 01" title="Repair and reuse commercial case" body="A working view of value, resilience and the evidence needed before Northshore asks for investment." action={<button className={styles.circularPrimary} onClick={onOpenCase}>Continue case</button>} />
    <div className={styles.circularStats}>
      <article><span>3-year modelled value</span><strong>{model.threeYearValue > 0 ? "+" : ""}{money(model.threeYearValue)}</strong><small>Selected assumptions</small></article>
      <article><span>New units avoided</span><strong>{model.recovered.toLocaleString("en-GB")}</strong><small>Each modelled year</small></article>
      <article><span>Evidence coverage</span><strong>{model.evidenceCoverage}%</strong><small>2 material gaps remain</small></article>
      <article><span>Decision status</span><strong className={styles.decisionText}>Needs evidence</strong><small>Owner review due 14 Oct</small></article>
    </div>
    <div className={styles.circularDashboardGrid}>
      <article className={styles.circularCard}>
        <div className={styles.circularCardHead}><div><span>Value bridge</span><h3>What makes the case commercially useful?</h3></div><Badge tone="warn">2 assumptions to validate</Badge></div>
        <div className={styles.valueBridge}>
          <div><span>Current material spend</span><b>{money(model.linear)}</b></div><i>−</i>
          <div><span>Reuse route</span><b>{money(model.circular)}</b></div><i>=</i>
          <div className={styles.valueBridgeResult}><span>Annual difference</span><b>{model.annualValue > 0 ? "+" : ""}{money(model.annualValue)}</b></div>
        </div>
        <p className={styles.circularExplanation}>The financial result is only one part of the decision. The case also records exposure to future material prices, service continuity and customer retention, with confidence shown for each claim.</p>
      </article>
      <article className={styles.circularCard}>
        <div className={styles.circularCardHead}><div><span>Readiness</span><h3>Investment case</h3></div></div>
        <div className={styles.readinessRing}><div><strong>62</strong><span>of 100</span></div></div>
        <ul className={styles.readinessList}><li><span className={styles.dotGood}/>Financial model <b>Ready</b></li><li><span className={styles.dotWarn}/>Customer evidence <b>Partial</b></li><li><span className={styles.dotWarn}/>Operating pilot <b>Planned</b></li></ul>
      </article>
    </div>
    <article className={styles.circularCard}>
      <div className={styles.circularCardHead}><div><span>Next best actions</span><h3>Turn assumptions into an investable case</h3></div><button className={styles.circularTextButton} onClick={onOpenEvidence}>Open evidence register</button></div>
      <div className={styles.actionTimeline}><div><b>1</b><span><strong>Run returns pilot</strong><small>Measure usable recovery and true reverse-logistics cost.</small></span></div><i>→</i><div><b>2</b><span><strong>Test customer value</strong><small>Complete six remaining interviews and record the findings.</small></span></div><i>→</i><div><b>3</b><span><strong>Request review</strong><small>Share a permission-controlled pack with an adviser.</small></span></div></div>
    </article>
  </>;
}

function CaseBuilder({ values, setters, model }: {
  values: { units: number; recovery: number; refurbishment: number; materialCost: number; uplift: number };
  setters: { setUnits: (n: number) => void; setRecovery: (n: number) => void; setRefurbishment: (n: number) => void; setMaterialCost: (n: number) => void; setUplift: (n: number) => void };
  model: Model;
}) {
  const controls = [
    { label: "Units supplied each year", value: values.units, display: values.units.toLocaleString("en-GB"), min: 100, max: 5000, step: 100, set: setters.setUnits },
    { label: "Usable units recovered", value: values.recovery, display: `${values.recovery}%`, min: 0, max: 80, step: 5, set: setters.setRecovery },
    { label: "Refurbishment per unit", value: values.refurbishment, display: money(values.refurbishment), min: 10, max: 120, step: 2, set: setters.setRefurbishment },
    { label: "New material per unit", value: values.materialCost, display: money(values.materialCost), min: 30, max: 150, step: 5, set: setters.setMaterialCost },
    { label: "Material price increase", value: values.uplift, display: `${values.uplift}%`, min: 0, max: 50, step: 5, set: setters.setUplift },
  ];
  return <>
    <ViewHeading eyebrow="Case builder" title="Test the opportunity before making the claim" body="Adjust the business assumptions. Every figure has an owner, source and confidence level in the evidence register." action={<Badge tone="blue">Scenario v3</Badge>} />
    <div className={styles.circularBuilderGrid}>
      <article className={styles.circularCard}>
        <div className={styles.circularCardHead}><div><span>Commercial inputs</span><h3>Repair and reuse scenario</h3></div><Badge>GBP · annual</Badge></div>
        <div className={styles.circularControls}>{controls.map(control => <label key={control.label}><span>{control.label}</span><strong>{control.display}</strong><input type="range" min={control.min} max={control.max} step={control.step} value={control.value} onChange={event => control.set(Number(event.target.value))}/></label>)}</div>
      </article>
      <div className={styles.circularBuilderSide}>
        <article className={`${styles.circularCard} ${styles.circularResultCard}`}><span>Modelled annual difference</span><strong>{model.annualValue > 0 ? "+" : ""}{money(model.annualValue)}</strong><small>{model.annualValue >= 0 ? "Potential lower cost with reuse" : "Reuse route currently costs more"}</small></article>
        <article className={styles.circularCard}><div className={styles.circularCardHead}><div><span>Wider commercial value</span><h3>Recorded separately</h3></div></div><ul className={styles.factorList}><li><span>Supply continuity</span><Badge tone="warn">Hypothesis</Badge></li><li><span>Material price exposure</span><Badge tone="good">Modelled</Badge></li><li><span>Customer retention</span><Badge tone="warn">Researching</Badge></li><li><span>Service revenue</span><Badge>Not included</Badge></li></ul></article>
      </div>
    </div>
  </>;
}

function Evidence({ role }: { role: Role }) {
  return <>
    <ViewHeading eyebrow="Evidence register" title="Show where every material claim comes from" body="The business and its permitted adviser can inspect sources, owners, confidence and outstanding validation work." action={<button className={styles.circularPrimary}>Add evidence</button>} />
    <article className={styles.circularCard}>
      <div className={styles.evidenceSummary}><div><span>4</span><small>sources linked</small></div><div><span>2</span><small>require validation</small></div><div><span>1</span><small>external benchmark</small></div><div><span>0</span><small>overdue reviews</small></div></div>
      <div className={styles.circularTable} role="table" aria-label="Evidence sources">
        <div className={styles.circularTableHead} role="row"><span>Source</span><span>Used for</span><span>Owner</span><span>Confidence</span><span>Status</span></div>
        {evidenceRows.map(row => <div className={styles.circularTableRow} role="row" key={row.source}><span><strong>{row.source}</strong><small>{row.source === "Market price index" ? "Public benchmark · Sep 2026" : "Northshore private record"}</small></span><span>{row.use}</span><span>{row.owner}</span><span><Badge tone={row.confidence === "High" ? "good" : row.confidence === "Low" ? "warn" : "blue"}>{row.confidence}</Badge></span><span>{row.status}</span></div>)}
      </div>
    </article>
    <div className={styles.circularDashboardGrid}>
      <article className={styles.circularCard}><div className={styles.circularCardHead}><div><span>External sources</span><h3>Evidence can be refreshed, not copied once</h3></div></div><p className={styles.circularExplanation}>A production service could connect agreed market, sector and policy sources. Each derived value would retain its source, version, retrieval date and calculation method.</p><div className={styles.sourceChips}><Badge tone="blue">Commodity index</Badge><Badge>Sector benchmarks</Badge><Badge>Business records</Badge><Badge>Research interviews</Badge></div></article>
      <article className={styles.circularCard}><div className={styles.circularCardHead}><div><span>Access</span><h3>{roleLabels[role]}</h3></div><Badge tone="good">Permitted</Badge></div><dl className={styles.permissionList}><div><dt>Named financial records</dt><dd>View</dd></div><div><dt>Edit assumptions</dt><dd>{role === "owner" ? "Allowed" : "Comment only"}</dd></div><div><dt>Share outside workspace</dt><dd>Owner approval</dd></div></dl></article>
    </div>
  </>;
}

function Review({ model, role }: { model: Model; role: Role }) {
  return <>
    <ViewHeading eyebrow="Human review" title="Prepare a case someone can challenge" body="The output combines the financial result, wider commercial claims, confidence and unresolved work. A named owner decides whether it is ready to share." action={<button className={styles.circularPrimary}>Request owner approval</button>} />
    <div className={styles.circularReviewGrid}>
      <article className={`${styles.circularCard} ${styles.investmentPreview}`}>
        <div className={styles.investmentBrand}><span>Northshore Products</span><Badge tone="warn">Draft for review</Badge></div>
        <h3>Repair and reuse investment case</h3><p>Recover and refurbish selected equipment to reduce reliance on new material purchases and test a service-led customer proposition.</p>
        <div className={styles.investmentNumbers}><div><span>Three-year value</span><strong>{money(model.threeYearValue)}</strong></div><div><span>Evidence coverage</span><strong>{model.evidenceCoverage}%</strong></div><div><span>Case confidence</span><strong>Medium</strong></div></div>
        <h4>Decision requested</h4><p>Approve an eight-week operating pilot, subject to finance confirming the reverse-logistics cost envelope.</p>
        <div className={styles.reviewWarning}><strong>Before external sharing</strong><span>Validate the recoverable-unit rate and complete the remaining customer interviews.</span></div>
      </article>
      <div className={styles.circularReviewSide}>
        <article className={styles.circularCard}><div className={styles.circularCardHead}><div><span>Approval</span><h3>Human-owned decision</h3></div></div><dl className={styles.permissionList}><div><dt>Case owner</dt><dd>Dale Harrison</dd></div><div><dt>Current viewer</dt><dd>{roleLabels[role]}</dd></div><div><dt>Status</dt><dd>Review requested</dd></div><div><dt>External access</dt><dd>Off</dd></div></dl></article>
        <article className={styles.circularCard}><div className={styles.circularCardHead}><div><span>Activity</span><h3>Recent history</h3></div></div><ol className={styles.activityList}><li><b>27 Sep</b><span>Material price scenario changed from 10% to 15%.</span></li><li><b>26 Sep</b><span>Adviser marked recovery rate as requiring a pilot.</span></li><li><b>24 Sep</b><span>Finance source connected by the case owner.</span></li></ol></article>
      </div>
    </div>
  </>;
}

function Insights() {
  return <>
    <ViewHeading eyebrow="Programme view" title="See patterns without exposing company records" body="Illustrative aggregated insight for Zero Waste Scotland. Named businesses, financial records and private evidence are excluded." action={<Badge tone="good">Disclosure threshold met</Badge>} />
    <div className={styles.circularStats}><article><span>Active business cases</span><strong>84</strong><small>Across 7 sectors</small></article><article><span>Cases ready for investment</span><strong>19</strong><small>23% of active cases</small></article><article><span>Most common barrier</span><strong className={styles.decisionText}>Evidence gaps</strong><small>41% of cases</small></article><article><span>Modelled opportunity</span><strong>£4.2m</strong><small>Illustrative annual value</small></article></div>
    <div className={styles.circularDashboardGrid}>
      <article className={styles.circularCard}><div className={styles.circularCardHead}><div><span>Adoption funnel</span><h3>Where businesses need support</h3></div></div><div className={styles.programmeBars}><div><span>Opportunity created</span><i><b style={{width:"100%"}}/></i><strong>84</strong></div><div><span>Evidence in progress</span><i><b style={{width:"74%"}}/></i><strong>62</strong></div><div><span>Owner approved</span><i><b style={{width:"38%"}}/></i><strong>32</strong></div><div><span>Investment ready</span><i><b style={{width:"23%"}}/></i><strong>19</strong></div></div></article>
      <article className={styles.circularCard}><div className={styles.circularCardHead}><div><span>Safeguards</span><h3>What the sponsor can see</h3></div></div><ul className={styles.visibilityList}><li><span>✓</span>Aggregated sector and practice trends</li><li><span>✓</span>Common barriers and support needs</li><li><span>✓</span>Adoption and readiness measures</li><li><span>×</span>Named businesses or private ledgers</li><li><span>×</span>Individual interview responses</li></ul></article>
    </div>
    <article className={styles.circularCard}><div className={styles.circularCardHead}><div><span>Traceability</span><h3>Every published measure retains its definition</h3></div></div><div className={styles.measureStrip}><div><strong>Investment-ready case</strong><span>Owner approved, minimum evidence threshold met and no unresolved high-risk assumption.</span></div><div><strong>Refresh</strong><span>Weekly from consented workspaces</span></div><div><strong>Suppression</strong><span>Groups below five businesses hidden</span></div><div><strong>Version</strong><span>Measure definition 0.3</span></div></div></article>
  </>;
}
