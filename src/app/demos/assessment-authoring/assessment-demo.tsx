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
  decisions?: Array<{ status: Status; note: string; at: string }>;
};

const startingItems: QuestionItem[] = [
  { id: "q-001", code: "WAH-001", title: "Why should someone avoid stepping onto a fragile roof surface?", topic: "Fragile surfaces", status: "Needs review", difficulty: "Foundation", source: "HSE GEIS5, p1", owner: "A. Patel", updated: "Today" },
  { id: "q-002", code: "WAH-002", title: "A roof has older fibre cement sheets. No safe assessment has been completed. How should you treat the sheets when planning the work?", topic: "Roof assessment", status: "Needs review", difficulty: "Standard", source: "HSE GEIS5, p1–2", owner: "A. Patel", updated: "1 Oct 2026" },
  { id: "q-003", code: "WAH-003", title: "What should be considered before work starts near a fragile surface?", topic: "Planning work", status: "Returned", difficulty: "Standard", source: "INDG401, p2–3", owner: "A. Patel", updated: "Yesterday" },
  { id: "q-004", code: "WAH-004", title: "An access route crosses roof tiles and old roof lights. Their strength has not been assessed. Which surfaces should be treated as potentially fragile?", topic: "Roof assessment", status: "Needs review", difficulty: "Standard", source: "HSE GEIS5, p1–2", owner: "A. Patel", updated: "1 Oct 2026" },
  { id: "q-005", code: "WAH-005", title: "Which control best reduces the need to step onto a fragile roof?", topic: "Access controls", status: "Needs review", difficulty: "Advanced", source: "HSE GEIS5, p2", owner: "J. Morgan", updated: "2 days ago" },
  { id: "q-006", code: "WAH-006", title: "What is the first action when a roof's condition is uncertain?", topic: "Roof assessment", status: "Analysed", difficulty: "Standard", source: "INDG401, p3", owner: "S. Lewis", updated: "4 days ago", passRate: 71 },
  { id: "q-007", code: "WAH-007", title: "Which protection is appropriate where fragile material cannot be avoided?", topic: "Fall protection", status: "Approved for pre-test", difficulty: "Advanced", source: "HSE GEIS5, p2", owner: "S. Lewis", updated: "5 days ago" },
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
  const [selectedId, setSelectedId] = useState("q-002");
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
        { id: "q-014", code: "WAH-014", title: "What should a worker do if the agreed access route changes?", topic: "Planning work", status: "Draft", difficulty: "Standard", source: "INDG401, p2–3", owner: "Unassigned", updated: "Just now" },
        { id: "q-015", code: "WAH-015", title: "What should a warning notice at the approach to a fragile roof surface make clear?", topic: "Warning controls", status: "Draft", difficulty: "Foundation", source: "WAH Reg 9", owner: "Unassigned", updated: "Just now" },
      ];
      setItems((current) => [...generatedItems, ...current]);
      setGenerated(true);
    }
    setStatusFilter("Draft");
    setView("bank");
    setNotice(generated ? "The fixed sample set is already in this session’s bank. No duplicate records were added." : "Three provisional questions were added to the draft queue.");
  }

  function updateDecision(status: Status, note: string) {
    if (!note.trim()) return;
    const at = new Date().toISOString();
    setItems((current) => current.map((item) => item.id === selected.id ? { ...item, status, updated: "Just now", decisions: [...(item.decisions ?? []), { status, note: note.trim(), at }] } : item));
    setNotice(`${selected.code}: ${status}. Demo reviewer note saved for this browser session. No live publication took place.`);
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
          <span>Fixed content, no model calls. Illustrative reviews and counts reset on reload.</span>
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
            {view === "review" ? <ReviewQuestion key={selected.id} item={selected} onDecision={updateDecision} onChoose={() => setView("bank")}/> : null}
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
  const sourceCount = items.filter((item) => Boolean(item.source)).length;
  const ownerCount = items.filter((item) => item.owner !== "Unassigned").length;
  const recent = items.filter((item) => item.status === "Needs review" || item.status === "Returned").slice(0, 4);
  return <>
    <div className={styles.viewHeading}><div><span className={styles.viewEyebrow}>Workspace overview</span><h2>Good morning, Dale</h2><p>Here is the current position across the prototype question bank.</p></div><button type="button" className={styles.appPrimary} onClick={() => onNavigate("create")}>＋ Create question set</button></div>
    <div className={styles.statGrid}>
      <button type="button" onClick={() => onNavigate("bank")}><span>Question records</span><strong>{counts.all}</strong><small>Across {new Set(items.map((item) => item.topic)).size} topics</small></button>
      <button type="button" onClick={() => onNavigate("review")}><span>Awaiting review</span><strong>{counts.review}</strong><small>Illustrative reviewer queue</small></button>
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
        <div className={styles.coverageRing}><div><strong>{Math.round(sourceCount / Math.max(items.length, 1) * 100)}%</strong><span>source linked</span></div></div>
        <ul className={styles.coverageList}><li><span className={styles.dotGreen}/>Sources attached <b>{sourceCount} / {items.length}</b></li><li><span className={styles.dotBlue}/>Review owner assigned <b>{ownerCount} / {items.length}</b></li><li><span className={styles.dotAmber}/>Mock test evidence <b>{counts.analysed} / {items.length}</b></li></ul>
      </section>
    </div>
    <section className={styles.processStrip}>
      <div><span>1</span><strong>Approved sources</strong><small>Choose the evidence</small></div><i>→</i><div><span>2</span><strong>Draft and check</strong><small>AI or human authored</small></div><i>→</i><div><span>3</span><strong>Human decision</strong><small>Specialists remain accountable</small></div><i>→</i><div><span>4</span><strong>Pre-test and learn</strong><small>Results return to the record</small></div>
    </section>
  </>;
}

function CreateQuestions({ onGenerate }: { onGenerate: () => void }) {
  return <>
    <div className={styles.viewHeading}><div><span className={styles.viewEyebrow}>Guided authoring</span><h2>Create a question set</h2><p>This walkthrough uses three fixed sample drafts and a fixed source set. A future service would let CITB configure the assessment brief.</p></div></div>
    <div className={styles.authoringLayout}>
      <section className={styles.appCard}>
        <div className={styles.formSection}><span className={styles.formNumber}>1</span><div><h3>Choose approved evidence</h3><p>The fixed samples use these public sources. Approval labels illustrate the future CITB source control.</p></div></div>
        <div className={styles.sourcePicker}><label><input type="checkbox" checked readOnly disabled/><span><b>HSE GEIS5</b><small>Fragile roofs · version 11/2012</small></span><em>Approved</em></label><label><input type="checkbox" checked readOnly disabled/><span><b>HSE INDG401</b><small>Working at height · version 01/2014</small></span><em>Approved</em></label><label><input type="checkbox" checked readOnly disabled/><span><b>Work at Height Regulations 2005</b><small>Regulation 9 · current source</small></span><em>Approved</em></label></div>
        <div className={styles.formSection}><span className={styles.formNumber}>2</span><div><h3>Set the assessment intent</h3><p>These fields travel with every resulting question record.</p></div></div>
        <div className={styles.formGrid}><label><span>Learning objective</span><select disabled defaultValue="fragile"><option value="fragile">Identify fragile surfaces and suitable controls</option><option>Plan work at height safely</option><option>Select suitable access equipment</option></select></label><label><span>Target audience</span><select disabled><option>Operatives</option><option>Specialists</option><option>Managers and professionals</option></select></label><label><span>Questions required</span><select disabled defaultValue="3"><option value="3">3 questions</option><option>5 questions</option><option>10 questions</option></select></label><label><span>Difficulty mix</span><select disabled><option>Balanced</option><option>Foundation</option><option>Advanced</option></select></label></div>
        <div className={styles.formSection}><span className={styles.formNumber}>3</span><div><h3>Apply authoring rules</h3><p>These are proposed checks for a future service. This demo does not run content, readability or similarity validation.</p></div></div>
        <div className={styles.ruleGrid}><span>✓ Four options with one proposed key</span><span>✓ Rationale for every option</span><span>✓ Precise source reference</span><span>✓ Plain-English wording check</span><span>✓ Duplicate and similarity check</span><span>✓ Human review required</span></div>
        <div className={styles.generateBar}><div><strong>Ready to prepare 3 provisional questions</strong><small>Loads fixed sample records. No AI generation takes place.</small></div><button type="button" className={styles.appPrimary} onClick={onGenerate}>Prepare draft set</button></div>
      </section>
      <aside className={styles.contextPanel}><span className={styles.contextIcon}>i</span><h3>What happens next?</h3><ol><li>The demonstration loads the fixed sample source references.</li><li>The check panel explains proposed controls, with human review still required.</li><li>Three fixed drafts enter the bank with source links and a rationale for every option.</li><li>Named reviewers accept, amend or return them.</li></ol><div><strong>AI does not approve content</strong><p>This demonstration uses authored fixtures. Model and configuration records would be added in the prototype engagement.</p></div></aside>
    </div>
  </>;
}

function QuestionBank({ items, query, statusFilter, onQuery, onStatus, onSelect }: { items: QuestionItem[]; query: string; statusFilter: Status | "All"; onQuery: (value: string) => void; onStatus: (value: Status | "All") => void; onSelect: (id: string) => void }) {
  return <>
    <div className={styles.viewHeading}><div><span className={styles.viewEyebrow}>Controlled content</span><h2>Question bank</h2><p>Search, filter and inspect every versioned question record.</p></div><span className={styles.prototypeNote}>Export planned for the prototype engagement</span></div>
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

function ReviewQuestion({ item, onDecision, onChoose }: { item: QuestionItem; onDecision: (status: Status, note: string) => void; onChoose: () => void }) {
  const [reviewNote, setReviewNote] = useState("");
  const variants: Record<string, { options: string[]; key: number; rationale: string; extract: string; rationales: string[]; version: string }> = {
    "WAH-001": {
        "options": [
            "The surface is safe if the task is brief",
            "The surface may break under a person's weight",
            "The surface is safe when it looks dry",
            "The surface is safe if only one person crosses it"
        ],
        "key": 1,
        "rationale": "Fragile material may fail without warning. Neither the task duration nor its appearance establishes that it can support a person.",
        "extract": "GEIS5 identifies several common roof surfaces that may be fragile, including roof lights, non-reinforced fibre cement, corroded metal, slates and tiles.",
        "rationales": [
            "A brief task does not establish load-bearing capacity.",
            "A fragile surface may not support a person. This is the proposed key.",
            "Dry appearance does not establish the strength of the surface.",
            "Restricting numbers does not establish that the surface is safe."
        ],
        "version": "0.2"
    },
    "WAH-013": {
        "options": [
            "Continue if the roof light is clearly visible",
            "Stop and make sure the identified area is controlled in the work plan",
            "Step around the roof light without changing the plan",
            "Cover the roof light with any loose material available"
        ],
        "key": 1,
        "rationale": "Identifying a fragile roof light changes the known risk. The work plan and controls need to address the area before work continues.",
        "extract": "GEIS5 identifies old roof lights as likely to be fragile and calls for a safe system of work and competent assessment.",
        "rationales": [
            "Visibility does not remove the risk of falling through the roof light.",
            "The identified risk must be addressed in the work plan. This is the proposed key.",
            "An improvised route does not replace a reviewed safe system of work.",
            "Loose covering is not evidence of a suitable load-bearing or protective control."
        ],
        "version": "0.2"
    },
    "WAH-014": {
        "options": [
            "Use the new route if it looks shorter",
            "Pause and have the changed route assessed before using it",
            "Follow another worker who has crossed it",
            "Keep the original plan but use the new route"
        ],
        "key": 1,
        "rationale": "A changed access route may introduce different risks. Review its suitability and the safe working arrangements before use.",
        "extract": "INDG401 explains planning, competence and checking that each place of work at height is safe whenever it is used.",
        "rationales": [
            "A shorter route is not evidence of safe access.",
            "The changed route needs a suitable assessment before use. This is the proposed key.",
            "Following another person does not establish that the route is safe.",
            "A plan that does not reflect the route cannot demonstrate how its risks are controlled."
        ],
        "version": "0.2"
    },
    "WAH-015": {
        "options": [
            "That crossing is permitted if the task is brief",
            "That the area contains a fragile surface hazard",
            "That no other precautions are needed",
            "That a previous inspection makes the roof permanently safe"
        ],
        "key": 1,
        "rationale": "Regulation 9 includes prominent warning notices at an approach to a fragile surface where reasonably practicable. A warning does not replace the other required controls.",
        "extract": "Regulation 9(3) addresses warning notices at approaches to fragile surfaces, or other means of making people aware where notices are not reasonably practicable.",
        "rationales": [
            "The length of the task does not remove the hazard.",
            "The notice communicates the fragile-surface hazard. This is the proposed key.",
            "Warning notices do not replace the other controls for fragile surfaces.",
            "An earlier inspection cannot establish permanent safety."
        ],
        "version": "0.2"
    },
    "WAH-002": {
        "options": [
            "Use the sheets where they have no visible cracks.",
            "Use the sheets if they are dry and the task is brief.",
            "Treat the sheets as fragile until a competent person confirms otherwise.",
            "Use the same route that a worker crossed on an earlier visit."
        ],
        "key": 2,
        "rationale": "C is the proposed answer. Non-reinforced fibre cement sheets are among the surfaces HSE identifies as likely to be fragile. A competent assessment is needed before treating the roof as non-fragile. Appearance, weather and previous access do not establish that it is safe.",
        "extract": "GEIS5 pages 1 and 2 describe likely fragile roof materials and competent assessment. INDG401 revision 2, January 2014, page 3 explains checking each place before use.",
        "rationales": [
            "An absence of visible cracks does not establish load-bearing capacity.",
            "Dry weather and a short task do not establish that a sheet is non-fragile.",
            "Proposed key. C is the proposed answer. Non-reinforced fibre cement sheets are among the surfaces HSE identifies as likely to be fragile. A competent assessment is needed before treating the roof as non-fragile. Appearance, weather and previous access do not establish that it is safe.",
            "An earlier crossing does not establish the current condition or safety of the roof."
        ],
        "version": "0.3"
    },
    "WAH-004": {
        "options": [
            "Roof lights only, because the tiles look intact.",
            "Tiles only, because the roof lights look intact.",
            "Visibly damaged areas only, because the route has been used before.",
            "Both the tiles and roof lights, unless a competent person confirms otherwise."
        ],
        "key": 3,
        "rationale": "D is the proposed answer. HSE lists roof lights and slates or tiles among surfaces likely to be fragile. Both need to be considered in the assessment. Their appearance and previous use of the route do not establish that either is safe.",
        "extract": "GEIS5 pages 1 and 2 describe likely fragile roof materials and competent assessment. INDG401 revision 2, January 2014, page 3 explains checking each place before use.",
        "rationales": [
            "This excludes tiles without evidence of their strength.",
            "This excludes roof lights without evidence of their strength.",
            "Visible damage and previous use are insufficient tests of fragility.",
            "Proposed key. D is the proposed answer. HSE lists roof lights and slates or tiles among surfaces likely to be fragile. Both need to be considered in the assessment. Their appearance and previous use of the route do not establish that either is safe."
        ],
        "version": "0.3"
    }
};
  const review = variants[item.code];
  const sourceUrl = item.source.includes("INDG401") ? "https://www.hse.gov.uk/pubns/indg401.pdf" : item.source.includes("Reg") ? "https://www.legislation.gov.uk/uksi/2005/735/regulation/9" : "https://www.hse.gov.uk/pubns/geis5.pdf";
  return <>
    <div className={styles.viewHeading}><div><span className={styles.viewEyebrow}>Human review</span><h2>Review question</h2><p>Check the source, wording, answer and evidence before recording a decision.</p></div><button type="button" className={styles.appSecondary} onClick={onChoose}>Choose another question</button></div>
    <div className={styles.reviewLayout}>
      <section className={styles.appCard}>
        <div className={styles.itemHeader}><div><span className={styles.questionCode}>{item.code}</span><StatusBadge status={item.status}/></div><small>Version {review?.version ?? "0.2"} · updated {item.updated}</small></div>
        <h3 className={styles.reviewQuestion}>{item.title}</h3>
        {review ? <><div className={styles.reviewOptions}>{review.options.map((option, index) => <div key={option} className={index === review.key ? styles.proposedAnswer : undefined}><b>{String.fromCharCode(65 + index)}</b><span>{option}</span>{index === review.key ? <em>Proposed key</em> : null}</div>)}</div>
        <div className={styles.rationaleBox}><span>Proposed rationale</span><p>{review.rationale}</p></div><details className={styles.rationaleBox}><summary>Why each option is or is not the proposed answer</summary>{review.rationales.map((reason, index) => <p key={index}><b>{String.fromCharCode(65 + index)}</b>. {reason}</p>)}</details></> : <div className={styles.rationaleBox}><strong>Metadata-only sample</strong><p>This record illustrates the bank lifecycle. Its question options have not been authored in this walkthrough, so it cannot be approved here. Use WAH-002 or WAH-004, or prepare the fixed sample set to try a full review.</p></div>}
        <div className={styles.reviewActions}><label><span>Reviewer note</span><textarea value={reviewNote} onChange={(event) => setReviewNote(event.target.value)} placeholder="Record the evidence checked and your reason for this decision" rows={3}/><small>A reason is required. All decisions are illustrative and reset on reload.</small></label><div><button type="button" className={styles.returnButton} disabled={!review || !reviewNote.trim()} onClick={() => onDecision("Returned", reviewNote)}>Return for revision</button><button type="button" className={styles.approveButton} disabled={!review || !reviewNote.trim()} onClick={() => onDecision("Approved for pre-test", reviewNote)}>Approve for pre-test</button></div></div>
      {item.decisions?.length ? <div className={styles.rationaleBox}><strong>Session decision history</strong>{item.decisions.map((decision, index) => <p key={`${decision.at}-${index}`}><b>{decision.status}</b> · Demo reviewer · {decision.at}<br/>{decision.note}</p>)}</div> : null}
      </section>
      <aside className={styles.reviewEvidence}>
        <section><div className={styles.evidenceHeading}><span>Source evidence</span><b>Review needed</b></div><strong>{item.source}</strong><p><small>Source summary, paraphrased</small></p><p>{review?.extract ?? "Open the linked source to check the precise passage. This metadata-only sample has no checked passage."}</p><p><small>{item.source.includes("INDG401") ? "Revision 2 · January 2014" : item.source.includes("Reg") ? "Work at Height Regulations 2005 · regulation 9" : "GEIS5 · November 2012"}</small></p><a href={sourceUrl} target="_blank" rel="noreferrer">Open public source ↗</a></section>
        <section><div className={styles.evidenceHeading}><span>Proposed checks</span><b>Illustrative</b></div><ul><li><span>i</span>One defensible proposed answer</li><li><span>i</span>Four distinct and plausible options</li><li><span>i</span>Source version and passage</li><li><span>i</span>Reading level and accessibility</li><li><span>!</span>Specialist validation not performed</li></ul></section>
        <section><div className={styles.evidenceHeading}><span>Question passport</span></div><dl><div><dt>Objective</dt><dd>{item.topic}</dd></div><div><dt>Method</dt><dd>Authored demo fixture, no model</dd></div><div><dt>Assessment owner</dt><dd>{item.owner}</dd></div><div><dt>HSE review</dt><dd>Pending</dd></div><div><dt>Publication</dt><dd>Never live</dd></div></dl></section>
      </aside>
    </div>
  </>;
}

function Reporting({ items }: { items: QuestionItem[] }) {
  const statuses: Array<{ label: string; count: number; colour: string }> = [
    { label: "Draft", count: items.filter((item) => item.status === "Draft").length, colour: "var(--report-grey)" },
    { label: "In review", count: items.filter((item) => item.status === "Needs review" || item.status === "Returned").length, colour: "var(--report-amber)" },
    { label: "Pre-test ready", count: items.filter((item) => item.status === "Approved for pre-test").length, colour: "var(--report-blue)" },
    { label: "Retired", count: items.filter((item) => item.status === "Retired").length, colour: "var(--report-grey)" },
    { label: "Analysed", count: items.filter((item) => item.status === "Analysed").length, colour: "var(--report-green)" },
  ];
  const max = Math.max(...statuses.map((status) => status.count), 1);
  return <>
    <div className={styles.viewHeading}><div><span className={styles.viewEyebrow}>Management information</span><h2>Question performance</h2><p>Lifecycle totals use this session’s bank. The trial measures below are a separate illustrative reporting fixture, not measured demo performance.</p></div><span className={styles.prototypeNote}>Illustrative report</span></div>
    <div className={styles.reportStats}><div><span>Time to accepted set</span><strong>5h 40m</strong><small>Mock baseline: 8h 10m</small></div><div><span>Review effort per item</span><strong>18 min</strong><small>Mock: 180 review minutes / 10 accepted</small></div><div><span>First-review acceptance</span><strong>62%</strong><small>8 of 13 reviewed items</small></div><div><span>Evidence completeness</span><strong>100%</strong><small>Mock: 13 complete / 13 reviewed</small></div></div>
    <section className={`${styles.appCard} ${styles.kpiCard}`}>
      <div className={styles.cardHeading}><div><span>Measurement method</span><h3>How the prototype would calculate value</h3></div></div>
      <div className={styles.kpiGrid}>
        <article><strong>Time to accepted set</strong><p>Approved brief to ten human-accepted questions, including every return and revision.</p><small>Workflow timestamps + active-time record</small></article>
        <article><strong>Review effort per item</strong><p>Total Assessment Technical Developer and HSE review minutes divided by accepted items.</p><small>Review events + recorded effort</small></article>
        <article><strong>First-review acceptance</strong><p>Items accepted without return divided by all items completing a first review, multiplied by 100. Report returns and rejections separately.</p><small>Recorded review decisions</small></article>
        <article><strong>Evidence completeness</strong><p>Records with source, version, location, rationale, named reviewer and decision divided by all reviewed records, multiplied by 100.</p><small>Question passport fields</small></article>
        <article><strong>Cost per accepted item</strong><p>People and trial technology cost divided by questions that reach human acceptance.</p><small>Include returns and rejections. No accepted items: report a failed trial without a per-item figure.</small></article>
        <article><strong>Pre-test performance</strong><p>Pearson analysis after 100 responses. Reported separately from authoring productivity.</p><small>Approved item version + test evidence. Timing may extend beyond eight weeks.</small></article>
      </div>
    </section>
    <div className={styles.dashboardGrid}>
      <section className={styles.appCard}><div className={styles.cardHeading}><div><span>Workflow</span><h3>Items by lifecycle stage</h3></div></div><div className={styles.barChart}>{statuses.map((status) => <div key={status.label}><span>{status.label}</span><div><i style={{ width: `${Math.max((status.count / max) * 100, 8)}%`, background: status.colour }}/></div><b>{status.count}</b></div>)}</div></section>
      <section className={styles.appCard}><div className={styles.cardHeading}><div><span>Review reasons</span><h3>Illustrative return reasons</h3></div></div><div className={styles.reasonList}><div><span>Distractor quality</span><b>38%</b></div><div><span>More than one defensible answer</span><b>25%</b></div><div><span>Source precision</span><b>19%</b></div><div><span>Reading level</span><b>12%</b></div><div><span>Other</span><b>6%</b></div></div></section>
    </div>
    <section className={styles.appCard}><div className={styles.cardHeading}><div><span>Item evidence</span><h3>Analysed questions</h3></div><span>Mock item results, no live test data</span></div><div className={styles.performanceTable}><div><b>Question</b><b>Responses</b><b>Pass rate</b><b>Evidence</b><b>Next action</b></div>{items.filter((item) => item.status === "Analysed").map((item) => <div key={item.id}><span><strong>{item.code}</strong><small>{item.topic}</small></span><span>100</span><span>{item.passRate}%</span><span><em>Linked</em></span><span>{"CITB / Pearson interpretation needed"}</span></div>)}</div></section>
    <p className={styles.reportDisclaimer}>All figures on this screen are mock data. A live service would receive approved item-analysis results from CITB&apos;s assessment process.</p>
  </>;
}
