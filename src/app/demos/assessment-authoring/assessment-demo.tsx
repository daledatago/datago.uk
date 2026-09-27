"use client";

import { useMemo, useState } from "react";
import styles from "../prototype.module.css";

type View = "overview" | "create" | "bank" | "review" | "reporting";
type Status = "Draft" | "Needs review" | "Returned" | "Approved for pre-test" | "Analysed" | "Retired";

type QuestionItem = {
  id: string;
  code: string;
  title: string;
  topic: string;
  status: Status;
  difficulty: "Foundation" | "Standard" | "Advanced";
  source: string;
  owner: string;
  updated: string;
  passRate?: number;
};

const startingItems: QuestionItem[] = [
  { id: "q-001", code: "WAH-001", title: "Why should someone avoid stepping onto a fragile roof surface?", topic: "Fragile surfaces", status: "Needs review", difficulty: "Foundation", source: "HSE GEIS5, p1", owner: "A. Patel", updated: "Today" },
  { id: "q-002", code: "WAH-002", title: "Which feature can indicate that a roof surface may be fragile?", topic: "Fragile surfaces", status: "Approved for pre-test", difficulty: "Standard", source: "HSE GEIS5, p1", owner: "J. Morgan", updated: "Yesterday" },
  { id: "q-003", code: "WAH-003", title: "What should be considered before work starts near a fragile surface?", topic: "Planning work", status: "Returned", difficulty: "Standard", source: "INDG401, p4", owner: "A. Patel", updated: "Yesterday" },
  { id: "q-004", code: "WAH-004", title: "When should warning notices be used around fragile surfaces?", topic: "Warning controls", status: "Draft", difficulty: "Foundation", source: "WAH Reg 9", owner: "Unassigned", updated: "2 days ago" },
  { id: "q-005", code: "WAH-005", title: "Which control best reduces the need to step onto a fragile roof?", topic: "Access controls", status: "Needs review", difficulty: "Advanced", source: "HSE GEIS5, p2", owner: "J. Morgan", updated: "2 days ago" },
  { id: "q-006", code: "WAH-006", title: "What is the first action when a roof's condition is uncertain?", topic: "Roof assessment", status: "Analysed", difficulty: "Standard", source: "INDG401, p3", owner: "S. Lewis", updated: "4 days ago", passRate: 71 },
  { id: "q-007", code: "WAH-007", title: "Which protection is appropriate where fragile material cannot be avoided?", topic: "Fall protection", status: "Approved for pre-test", difficulty: "Advanced", source: "HSE GEIS5, p3", owner: "S. Lewis", updated: "5 days ago" },
  { id: "q-008", code: "WAH-008", title: "What information should be included in the work plan?", topic: "Planning work", status: "Analysed", difficulty: "Standard", source: "INDG401, p5", owner: "A. Patel", updated: "1 week ago", passRate: 64 },
  { id: "q-009", code: "WAH-009", title: "Who should confirm that a working platform is suitable?", topic: "Competence", status: "Needs review", difficulty: "Foundation", source: "HSE GEIS5, p2", owner: "J. Morgan", updated: "1 week ago" },
  { id: "q-010", code: "WAH-010", title: "Which record should be retained after the roof assessment?", topic: "Evidence", status: "Draft", difficulty: "Foundation", source: "INDG401, p3", owner: "Unassigned", updated: "1 week ago" },
  { id: "q-011", code: "WAH-011", title: "When must fragile material be protected by suitable platforms or coverings?", topic: "Legal duties", status: "Analysed", difficulty: "Advanced", source: "WAH Reg 9", owner: "S. Lewis", updated: "2 weeks ago", passRate: 58 },
  { id: "q-012", code: "WAH-012", title: "Why must access equipment be checked before use?", topic: "Access controls", status: "Retired", difficulty: "Foundation", source: "INDG401, p6", owner: "A. Patel", updated: "3 weeks ago", passRate: 92 },
];

const navItems: Array<{ id: View; label: string; short: string }> = [
  { id: "overview", label: "Overview", short: "Home" },
  { id: "create", label: "Create questions", short: "Create" },
  { id: "bank", label: "Question bank", short: "Bank" },
  { id: "review", label: "Review queue", short: "Review" },
  { id: "reporting", label: "Reporting", short: "Reports" },
];

const statusClass: Record<Status, string> = {
  Draft: styles.statusDraft,
  "Needs review": styles.statusReview,
  Returned: styles.statusReturned,
  "Approved for pre-test": styles.statusApproved,
  Analysed: styles.statusAnalysed,
  Retired: styles.statusRetired,
};

function Icon({ name }: { name: View }) {
  const paths: Record<View, React.ReactNode> = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    create: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></>,
    bank: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></>,
    review: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>,
    reporting: <><path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-7"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function StatusBadge({ status }: { status: Status }) {
  return <span className={`${styles.statusBadge} ${statusClass[status]}`}>{status}</span>;
}

export function AssessmentDemo() {
  const [view, setView] = useState<View>("overview");
  const [items, setItems] = useState<QuestionItem[]>(startingItems);
  const [selectedId, setSelectedId] = useState("q-001");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [generated, setGenerated] = useState(false);
  const [notice, setNotice] = useState("");
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  const counts = useMemo(() => ({
    all: items.length,
    review: items.filter((item) => item.status === "Needs review").length,
    approved: items.filter((item) => item.status === "Approved for pre-test").length,
    analysed: items.filter((item) => item.status === "Analysed").length,
  }), [items]);

  const filteredItems = useMemo(() => items.filter((item) => {
    const textMatch = `${item.code} ${item.title} ${item.topic} ${item.source}`.toLowerCase().includes(query.toLowerCase());
    return textMatch && (statusFilter === "All" || item.status === statusFilter);
  }), [items, query, statusFilter]);

  function selectQuestion(id: string) {
    setSelectedId(id);
    setView("review");
    setNotice("");
  }

  function generateDraftSet() {
    if (!generated) {
      const generatedItems: QuestionItem[] = [
        { id: "q-013", code: "WAH-013", title: "Which action should be taken when fragile roof lights are identified?", topic: "Fragile surfaces", status: "Draft", difficulty: "Standard", source: "HSE GEIS5, p1", owner: "Unassigned", updated: "Just now" },
        { id: "q-014", code: "WAH-014", title: "What should a worker do if the agreed access route changes?", topic: "Planning work", status: "Draft", difficulty: "Standard", source: "INDG401, p4", owner: "Unassigned", updated: "Just now" },
        { id: "q-015", code: "WAH-015", title: "Why should fragile areas be clearly marked before work begins?", topic: "Warning controls", status: "Draft", difficulty: "Foundation", source: "WAH Reg 9", owner: "Unassigned", updated: "Just now" },
      ];
      setItems((current) => [...generatedItems, ...current]);
      setGenerated(true);
    }
    setStatusFilter("Draft");
    setView("bank");
    setNotice("Three provisional questions were added to the draft queue.");
  }

  function updateDecision(status: Status, message: string) {
    setItems((current) => current.map((item) => item.id === selected.id ? { ...item, status, updated: "Just now" } : item));
    setNotice(message);
  }

  return (
    <main className={styles.assessmentPage}>
      <section className={styles.assessmentIntro}>
        <div>
          <span className={styles.eyebrow}>Interactive prototype · illustrative content</span>
          <h1>Assessment Studio</h1>
          <p>A working view of how CITB could create, review, manage and measure assessment questions while keeping every source and decision traceable.</p>
        </div>
        <div className={styles.prototypeNote}>
          <strong>Prototype boundary</strong>
          <span>No candidate data, live publishing or production integration.</span>
        </div>
      </section>

      <section className={styles.workbench} aria-label="Assessment Studio prototype">
        <aside className={styles.workbenchSidebar}>
          <div className={styles.workspaceIdentity}>
            <span className={styles.workspaceMark}>AS</span>
            <div><strong>Assessment Studio</strong><small>Operatives prototype</small></div>
          </div>
          <nav aria-label="Assessment Studio sections" className={styles.workbenchNav}>
            {navItems.map((item) => <button type="button" key={item.id} className={view === item.id ? styles.workbenchNavActive : ""} onClick={() => { setView(item.id); setNotice(""); }}><Icon name={item.id}/><span>{item.label}</span><small>{item.short}</small>{item.id === "review" && counts.review > 0 ? <b>{counts.review}</b> : null}</button>)}
          </nav>
          <div className={styles.sidebarFoot}><span className={styles.secureDot}/><div><strong>CITB controlled</strong><small>Illustrative tenant</small></div></div>
        </aside>

        <div className={styles.workbenchMain}>
          <header className={styles.workbenchTopbar}>
            <div><span>Work at height</span><b>/</b><strong>{navItems.find((item) => item.id === view)?.label}</strong></div>
            <div className={styles.userChip}><span>DH</span><div><strong>Demo reviewer</strong><small>Assessment author</small></div></div>
          </header>

          {notice ? <div className={styles.notice} role="status"><span>✓</span>{notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}>×</button></div> : null}

          <div className={styles.workbenchContent}>
            {view === "overview" ? <Overview counts={counts} items={items} onNavigate={setView} onSelect={selectQuestion}/> : null}
            {view === "create" ? <CreateQuestions onGenerate={generateDraftSet}/> : null}
            {view === "bank" ? <QuestionBank items={filteredItems} query={query} statusFilter={statusFilter} onQuery={setQuery} onStatus={setStatusFilter} onSelect={selectQuestion}/> : null}
            {view === "review" ? <ReviewQuestion item={selected} onDecision={updateDecision} onChoose={() => setView("bank")}/> : null}
            {view === "reporting" ? <Reporting items={items}/> : null}
          </div>
        </div>
      </section>

      <section className={styles.assessmentFootnote}>
        <strong>What this prototype is intended to test</strong>
        <p>Whether source-linked drafting, repeatable checks, human approval and clear reporting reduce the effort needed to produce a defensible assessment item. The figures and reviewer names shown here are mock data.</p>
      </section>
    </main>
  );
}

function Overview({ counts, items, onNavigate, onSelect }: { counts: { all: number; review: number; approved: number; analysed: number }; items: QuestionItem[]; onNavigate: (view: View) => void; onSelect: (id: string) => void }) {
  const recent = items.filter((item) => item.status === "Needs review" || item.status === "Returned").slice(0, 4);
  return <>
    <div className={styles.viewHeading}><div><span className={styles.viewEyebrow}>Workspace overview</span><h2>Good morning, Dale</h2><p>Here is the current position across the prototype question bank.</p></div><button type="button" className={styles.appPrimary} onClick={() => onNavigate("create")}>＋ Create question set</button></div>
    <div className={styles.statGrid}>
      <button type="button" onClick={() => onNavigate("bank")}><span>Question records</span><strong>{counts.all}</strong><small>Across 7 topics</small></button>
      <button type="button" onClick={() => onNavigate("review")}><span>Awaiting review</span><strong>{counts.review}</strong><small>2 assigned today</small></button>
      <button type="button" onClick={() => onNavigate("bank")}><span>Ready for pre-test</span><strong>{counts.approved}</strong><small>Human approved</small></button>
      <button type="button" onClick={() => onNavigate("reporting")}><span>With test evidence</span><strong>{counts.analysed}</strong><small>Linked to results</small></button>
    </div>
    <div className={styles.dashboardGrid}>
      <section className={styles.appCard}>
        <div className={styles.cardHeading}><div><span>Review queue</span><h3>Items needing attention</h3></div><button type="button" onClick={() => onNavigate("review")}>Open queue</button></div>
        <div className={styles.queueList}>{recent.map((item) => <button type="button" key={item.id} onClick={() => onSelect(item.id)}><span className={styles.questionCode}>{item.code}</span><div><strong>{item.title}</strong><small>{item.topic} · {item.owner}</small></div><StatusBadge status={item.status}/><span className={styles.chevron}>›</span></button>)}</div>
      </section>
      <section className={styles.appCard}>
        <div className={styles.cardHeading}><div><span>Lifecycle</span><h3>Question record coverage</h3></div></div>
        <div className={styles.coverageRing}><div><strong>83%</strong><span>complete</span></div></div>
        <ul className={styles.coverageList}><li><span className={styles.dotGreen}/>Sources attached <b>15 / 15</b></li><li><span className={styles.dotBlue}/>Review owner assigned <b>13 / 15</b></li><li><span className={styles.dotAmber}/>Test evidence linked <b>3 / 15</b></li></ul>
      </section>
    </div>
    <section className={styles.processStrip}>
      <div><span>1</span><strong>Approved sources</strong><small>Choose the evidence</small></div><i>→</i><div><span>2</span><strong>Draft and check</strong><small>AI or human authored</small></div><i>→</i><div><span>3</span><strong>Human decision</strong><small>Specialists remain accountable</small></div><i>→</i><div><span>4</span><strong>Pre-test and learn</strong><small>Results return to the record</small></div>
    </section>
  </>;
}

function CreateQuestions({ onGenerate }: { onGenerate: () => void }) {
  return <>
    <div className={styles.viewHeading}><div><span className={styles.viewEyebrow}>Guided authoring</span><h2>Create a question set</h2><p>Define the evidence and assessment intent before any provisional questions are drafted.</p></div></div>
    <div className={styles.authoringLayout}>
      <section className={styles.appCard}>
        <div className={styles.formSection}><span className={styles.formNumber}>1</span><div><h3>Choose approved evidence</h3><p>Only sources in the controlled set are available to the drafting method.</p></div></div>
        <div className={styles.sourcePicker}><label><input type="checkbox" defaultChecked/><span><b>HSE GEIS5</b><small>Fragile roofs · version 11/2012</small></span><em>Approved</em></label><label><input type="checkbox" defaultChecked/><span><b>HSE INDG401</b><small>Working at height · version 01/2024</small></span><em>Approved</em></label><label><input type="checkbox" defaultChecked/><span><b>Work at Height Regulations 2005</b><small>Regulation 9 · current source</small></span><em>Approved</em></label></div>
        <div className={styles.formSection}><span className={styles.formNumber}>2</span><div><h3>Set the assessment intent</h3><p>These fields travel with every resulting question record.</p></div></div>
        <div className={styles.formGrid}><label><span>Learning objective</span><select defaultValue="fragile"><option value="fragile">Identify fragile surfaces and suitable controls</option><option>Plan work at height safely</option><option>Select suitable access equipment</option></select></label><label><span>Target audience</span><select><option>Operatives</option><option>Specialists</option><option>Managers and professionals</option></select></label><label><span>Questions required</span><select defaultValue="3"><option value="3">3 questions</option><option>5 questions</option><option>10 questions</option></select></label><label><span>Difficulty mix</span><select><option>Balanced</option><option>Foundation</option><option>Advanced</option></select></label></div>
        <div className={styles.formSection}><span className={styles.formNumber}>3</span><div><h3>Apply authoring rules</h3><p>The system checks the structure. Named specialists still decide whether the content is valid.</p></div></div>
        <div className={styles.ruleGrid}><span>✓ Four options with one proposed key</span><span>✓ Rationale for every option</span><span>✓ Precise source reference</span><span>✓ Plain-English wording check</span><span>✓ Duplicate and similarity check</span><span>✓ Human review required</span></div>
        <div className={styles.generateBar}><div><strong>Ready to prepare 3 provisional questions</strong><small>Estimated processing time: under one minute for this demonstration</small></div><button type="button" className={styles.appPrimary} onClick={onGenerate}>Prepare draft set</button></div>
      </section>
      <aside className={styles.contextPanel}><span className={styles.contextIcon}>i</span><h3>What happens next?</h3><ol><li>The drafting method uses only the selected sources.</li><li>Structural checks run against each question.</li><li>Drafts enter the bank with full source links.</li><li>Named reviewers accept, amend or return them.</li></ol><div><strong>AI does not approve content</strong><p>The model, rules and configuration used are recorded with each draft.</p></div></aside>
    </div>
  </>;
}

function QuestionBank({ items, query, statusFilter, onQuery, onStatus, onSelect }: { items: QuestionItem[]; query: string; statusFilter: Status | "All"; onQuery: (value: string) => void; onStatus: (value: Status | "All") => void; onSelect: (id: string) => void }) {
  return <>
    <div className={styles.viewHeading}><div><span className={styles.viewEyebrow}>Controlled content</span><h2>Question bank</h2><p>Search, filter and inspect every versioned question record.</p></div><button type="button" className={styles.appSecondary}>Export view</button></div>
    <section className={styles.appCard}>
      <div className={styles.bankToolbar}><label className={styles.searchBox}><span>⌕</span><input aria-label="Search question bank" value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Search questions, topics or sources"/></label><label><span className={styles.srOnly}>Filter by status</span><select value={statusFilter} onChange={(event) => onStatus(event.target.value as Status | "All")}><option>All</option><option>Draft</option><option>Needs review</option><option>Returned</option><option>Approved for pre-test</option><option>Analysed</option><option>Retired</option></select></label></div>
      <div className={styles.questionTable} role="table" aria-label="Question bank">
        <div className={styles.questionTableHead} role="row"><span role="columnheader">Question</span><span role="columnheader">Topic</span><span role="columnheader">Status</span><span role="columnheader">Owner</span><span role="columnheader">Updated</span><span/></div>
        {items.map((item) => <button type="button" className={styles.questionTableRow} role="row" key={item.id} onClick={() => onSelect(item.id)}><span role="cell" data-label="Question"><b>{item.code}</b><strong>{item.title}</strong><small>{item.source} · {item.difficulty}</small></span><span role="cell" data-label="Topic">{item.topic}</span><span role="cell" data-label="Status"><StatusBadge status={item.status}/></span><span role="cell" data-label="Owner">{item.owner}</span><span role="cell" data-label="Updated">{item.updated}</span><span aria-hidden="true">›</span></button>)}
        {items.length === 0 ? <div className={styles.emptyState}><strong>No questions match this view</strong><span>Clear the search or select another status.</span></div> : null}
      </div>
    </section>
  </>;
}

function ReviewQuestion({ item, onDecision, onChoose }: { item: QuestionItem; onDecision: (status: Status, message: string) => void; onChoose: () => void }) {
  const variants: Record<string, { options: string[]; key: number; rationale: string; extract: string }> = {
    "WAH-001": {
      options: ["The surface is safe if the task is brief", "The surface may break under a person's weight", "The surface is safe when it looks dry", "The surface is safe if only one person crosses it"],
      key: 1,
      rationale: "Fragile material may fail without warning and may not support a person's weight. The duration of the task does not make the surface safe.",
      extract: "Roof lights, fibre cement, corroded metal, slates and tiles may all be fragile.",
    },
    "WAH-013": {
      options: ["Continue if the roof light is clearly visible", "Stop and make sure the identified area is controlled in the work plan", "Step around the roof light without changing the plan", "Cover the roof light with any loose material available"],
      key: 1,
      rationale: "Identifying a fragile roof light changes the known risk. The work plan and controls should address the fragile area before work continues.",
      extract: "Roof lights may be difficult to see in certain conditions and should be treated as potentially fragile unless there is clear evidence otherwise.",
    },
  };
  const review = variants[item.code] ?? {
    options: ["Proceed without checking the agreed controls", "Use the approved source and work plan before acting", "Rely only on how the surface looks", "Leave the decision to an unbriefed worker"],
    key: 1,
    rationale: "This is illustrative review content. A subject expert would confirm the precise answer, distractors and source wording before pre-test approval.",
    extract: "The exact approved extract linked to this question would appear here for the reviewer.",
  };
  return <>
    <div className={styles.viewHeading}><div><span className={styles.viewEyebrow}>Human review</span><h2>Review question</h2><p>Check the source, wording, answer and evidence before recording a decision.</p></div><button type="button" className={styles.appSecondary} onClick={onChoose}>Choose another question</button></div>
    <div className={styles.reviewLayout}>
      <section className={styles.appCard}>
        <div className={styles.itemHeader}><div><span className={styles.questionCode}>{item.code}</span><StatusBadge status={item.status}/></div><small>Version 0.2 · updated {item.updated}</small></div>
        <h3 className={styles.reviewQuestion}>{item.title}</h3>
        <div className={styles.reviewOptions}>{review.options.map((option, index) => <div key={option} className={index === review.key ? styles.proposedAnswer : undefined}><b>{String.fromCharCode(65 + index)}</b><span>{option}</span>{index === review.key ? <em>Proposed key</em> : null}</div>)}</div>
        <div className={styles.rationaleBox}><span>Proposed rationale</span><p>{review.rationale}</p></div>
        <div className={styles.reviewActions}><label><span>Reviewer note</span><textarea defaultValue="Source supports the proposed key. Check whether option C is sufficiently plausible for the intended audience." rows={3}/></label><div><button type="button" className={styles.returnButton} onClick={() => onDecision("Returned", `${item.code} was returned with the reviewer note.`)}>Return for revision</button><button type="button" className={styles.approveButton} onClick={() => onDecision("Approved for pre-test", `${item.code} was approved for pre-test. No live publication took place.`)}>Approve for pre-test</button></div></div>
      </section>
      <aside className={styles.reviewEvidence}>
        <section><div className={styles.evidenceHeading}><span>Source evidence</span><b>Matched</b></div><strong>{item.source}</strong><blockquote>{review.extract}</blockquote><a href="https://www.hse.gov.uk/pubns/geis5.pdf" target="_blank" rel="noreferrer">Open public source ↗</a></section>
        <section><div className={styles.evidenceHeading}><span>Automated checks</span><b>5 passed</b></div><ul><li><span>✓</span>One proposed answer</li><li><span>✓</span>Four distinct options</li><li><span>✓</span>Source and page attached</li><li><span>✓</span>Plain-language threshold</li><li><span>!</span>Distractor quality needs review</li></ul></section>
        <section><div className={styles.evidenceHeading}><span>Question passport</span></div><dl><div><dt>Objective</dt><dd>Fragile surfaces</dd></div><div><dt>Method</dt><dd>Approved model route</dd></div><div><dt>Assessment owner</dt><dd>{item.owner}</dd></div><div><dt>HSE review</dt><dd>Pending</dd></div><div><dt>Publication</dt><dd>Never live</dd></div></dl></section>
      </aside>
    </div>
  </>;
}

function Reporting({ items }: { items: QuestionItem[] }) {
  const statuses: Array<{ label: string; count: number; colour: string }> = [
    { label: "Draft", count: items.filter((item) => item.status === "Draft").length, colour: "var(--report-grey)" },
    { label: "In review", count: items.filter((item) => item.status === "Needs review" || item.status === "Returned").length, colour: "var(--report-amber)" },
    { label: "Pre-test ready", count: items.filter((item) => item.status === "Approved for pre-test").length, colour: "var(--report-blue)" },
    { label: "Analysed", count: items.filter((item) => item.status === "Analysed").length, colour: "var(--report-green)" },
  ];
  const max = Math.max(...statuses.map((status) => status.count), 1);
  return <>
    <div className={styles.viewHeading}><div><span className={styles.viewEyebrow}>Management information</span><h2>Question performance</h2><p>Follow workflow health, reviewer effort and item evidence over time.</p></div><button type="button" className={styles.appSecondary}>Download report</button></div>
    <div className={styles.reportStats}><div><span>Time to accepted set</span><strong>5h 40m</strong><small>Mock baseline: 8h 10m</small></div><div><span>Review effort per item</span><strong>18 min</strong><small>Includes returns and revisions</small></div><div><span>First-review acceptance</span><strong>62%</strong><small>8 of 13 reviewed items</small></div><div><span>Evidence completeness</span><strong>100%</strong><small>Required fields present</small></div></div>
    <section className={`${styles.appCard} ${styles.kpiCard}`}>
      <div className={styles.cardHeading}><div><span>Measurement method</span><h3>How the prototype would calculate value</h3></div></div>
      <div className={styles.kpiGrid}>
        <article><strong>Time to accepted set</strong><p>Approved brief to ten human-accepted questions, including every return and revision.</p><small>Workflow timestamps + active-time record</small></article>
        <article><strong>Review effort per item</strong><p>Total Assessment Technical Developer and HSE review minutes divided by accepted items.</p><small>Review events + recorded effort</small></article>
        <article><strong>First-review acceptance</strong><p>Items accepted without return divided by all items receiving a first review.</p><small>Recorded review decisions</small></article>
        <article><strong>Evidence completeness</strong><p>Records with source, version, location, rationale, named reviewer and decision divided by all records.</p><small>Question passport fields</small></article>
        <article><strong>Cost per accepted item</strong><p>People and trial technology cost divided by questions that reach human acceptance.</p><small>Time record + agreed trial costs</small></article>
        <article><strong>Pre-test performance</strong><p>Pearson analysis after 100 responses. Reported separately from authoring productivity.</p><small>Approved item version + test evidence</small></article>
      </div>
    </section>
    <div className={styles.dashboardGrid}>
      <section className={styles.appCard}><div className={styles.cardHeading}><div><span>Workflow</span><h3>Items by lifecycle stage</h3></div></div><div className={styles.barChart}>{statuses.map((status) => <div key={status.label}><span>{status.label}</span><div><i style={{ width: `${Math.max((status.count / max) * 100, 8)}%`, background: status.colour }}/></div><b>{status.count}</b></div>)}</div></section>
      <section className={styles.appCard}><div className={styles.cardHeading}><div><span>Review reasons</span><h3>Why questions are returned</h3></div></div><div className={styles.reasonList}><div><span>Distractor quality</span><b>38%</b></div><div><span>More than one defensible answer</span><b>25%</b></div><div><span>Source precision</span><b>19%</b></div><div><span>Reading level</span><b>12%</b></div><div><span>Other</span><b>6%</b></div></div></section>
    </div>
    <section className={styles.appCard}><div className={styles.cardHeading}><div><span>Item evidence</span><h3>Analysed questions</h3></div><button type="button">View all evidence</button></div><div className={styles.performanceTable}><div><b>Question</b><b>Responses</b><b>Pass rate</b><b>Evidence</b><b>Next action</b></div>{items.filter((item) => item.status === "Analysed").map((item) => <div key={item.id}><span><strong>{item.code}</strong><small>{item.topic}</small></span><span>100</span><span>{item.passRate}%</span><span><em>Linked</em></span><span>{(item.passRate ?? 0) < 60 ? "Specialist review" : "Retain and monitor"}</span></div>)}</div></section>
    <p className={styles.reportDisclaimer}>All figures on this screen are mock data. A live service would receive approved item-analysis results from CITB&apos;s assessment process.</p>
  </>;
}
