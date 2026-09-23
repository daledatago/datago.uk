"use client";

import { useState } from "react";
import styles from "../prototype.module.css";

import { bankItems, criterion, exportFields, initialEntry, runDraftChecks, specialistReview, type ReviewEntry } from "./assessment-data";

function RecordFields({ fields }: { fields: ReturnType<typeof exportFields> }) {
  return <dl className={styles.recordFields}>{Object.entries(fields).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}

export function AssessmentDemo() {
  const [history, setHistory] = useState<ReviewEntry[]>([initialEntry(bankItems[0])]);
  const [checks, setChecks] = useState<ReturnType<typeof runDraftChecks> | null>(null);
  const [showChecks, setShowChecks] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [editing, setEditing] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState(bankItems[0].question);
  const [returnReason, setReturnReason] = useState("Distractor C is too easy to dismiss");
  const current = history[history.length - 1];
  const { question, decision } = current;
  const { options } = bankItems[0];
  const records = bankItems.map((item, index) => exportFields(item, index === 0 ? history : [initialEntry(item)], index === 0 ? checks : null));

  function saveEdit() {
    if (!pendingQuestion.trim()) return;
    setEditing(false);
    if (pendingQuestion.trim() === question) return;
    setHistory(entries => [...entries, { revision: entries[entries.length - 1].revision + 1, question: pendingQuestion.trim(), decision: "pending", reason: "Stem revised; previous review and checks require renewal." }]);
    setChecks(null);
    setShowChecks(false);
    setAnswer(null);
  }

  function recordDecision(nextDecision: "returned" | "approved") {
    setHistory(entries => [...entries, { ...entries[entries.length - 1], decision: nextDecision, reason: nextDecision === "returned" ? returnReason : "Sample approval for workflow demonstration only; specialist checks remain outstanding." }]);
  }

  return (
    <div className={styles.page}>
      <div className={styles.topline}><span>01 / Assessment workflow</span></div>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Working prototype · illustrative content</span>
        <h1>From approved source to a reviewable question.</h1>
        <p>Follow one draft through its source, authoring instruction, checks, specialist decision and audit record. Then see how it sits within the ten-question exercise.</p>
      </header>

      <div className={styles.stepbar} aria-label="Workflow steps">
        <span className={styles.activeStep}>1 · Source</span>
        <span className={styles.activeStep}>2 · Draft</span>
        <span className={styles.activeStep}>3 · Checks</span>
        <span className={styles.activeStep}>4 · Review</span>
        <span className={styles.activeStep}>5 · Export</span>
      </div>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Source and instruction</span><span className={styles.pill}>Versioned input</span></div>
          <h2>Fragile roof surfaces</h2>
          <p>The author selects the learning objective, assessment criterion and approved sources before generating any questions.</p>
          <div className={styles.evidenceCard}>
            <span>Source extract · HSE GEIS5 · page 1</span>
            <strong>Roof lights, fibre cement, corroded metal, slates and tiles may all be fragile.</strong>
            <small>Paraphrased for this demonstration. The source file and page reference stay attached to the item.</small>
          </div>
          <dl className={styles.sourceDetails}>
            <div><dt>Assessment criterion</dt><dd>{criterion}</dd></div>
            <div><dt>Authoring instruction</dt><dd>Create a concise question with one defensible answer, three plausible distractors, rationales and a precise citation.</dd></div>
            <div><dt>Human review</dt><dd>Construction accuracy and assessment quality must be checked by named specialists.</dd></div>
          </dl>
          <a className={styles.textLink} href="https://www.hse.gov.uk/pubns/geis5.pdf" target="_blank" rel="noreferrer">Open the public HSE source PDF ↗</a>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Draft item</span><span className={styles.pill}>Human review required</span></div>
          <h2>One question, four options</h2>
          {editing ? (
            <div className={styles.editBlock}>
              <label htmlFor="question-edit">Edit the question stem</label>
              <textarea id="question-edit" value={pendingQuestion} onChange={(event) => setPendingQuestion(event.target.value)} rows={4} />
              <div className={styles.buttonRow}>
                <button type="button" className={styles.primaryButton} disabled={!pendingQuestion.trim()} onClick={saveEdit}>Save revision</button>
                <button type="button" className={styles.secondaryButton} onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p className={styles.question}>{question}</p>
              <button type="button" className={styles.inlineButton} onClick={() => { setPendingQuestion(question); setEditing(true); }}>Edit draft</button>
            </>
          )}
          <div className={styles.options}>{options.map((option, index) => <button type="button" key={option} className={`${styles.option} ${answer === option ? styles.selectedOption : ""}`} onClick={() => setAnswer(option)}><b>{String.fromCharCode(65 + index)}</b>{option}</button>)}</div>
          {answer && <div className={styles.feedback}>{answer === options[1] ? "Proposed correct answer. A construction specialist still needs to confirm the source match and wording." : "Proposed distractor. The reviewer checks that it is plausible, clearly wrong and fair."}</div>}
          <div className={styles.sourceBox}><strong>Draft rationale and citation</strong><br/>{bankItems[0].rationales[1]} Proposed key: B.<br/>HSE GEIS5, page 1. Proposed rationale and key must be checked again after any stem edit.</div>
        </section>
      </div>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Quality gate</span><span className={styles.pill}>Checks support review</span></div>
          <h2>Checks with a clear owner</h2>
          <p>Automated checks narrow the review task. They do not certify that a question is correct or suitable for a live test.</p>
          <button type="button" className={styles.primaryButton} onClick={() => {
            if (!showChecks) setChecks(runDraftChecks({ ...bankItems[0], question }));
            setShowChecks(!showChecks);
          }}>{showChecks ? "Hide quality checks" : "Run draft checks"}</button>
          <p>{checks ? `Results for saved version 0.${current.revision}.` : "Checks have not run for this revision."} Checks always use the saved stem.</p>
          {showChecks && checks && <ul className={styles.checks}>
            {checks.map(check => <li key={check.detail}><b className={check.passed ? styles.pass : styles.warning}>{check.passed ? "Pass" : "Revise"}</b><span>{check.detail}</span></li>)}
            <li><b className={styles.warning}>Review</b><span>Only one answer must remain defensible in the full source context</span></li>
            <li><b className={styles.warning}>Review</b><span>Distractor C may be too easy for the intended audience</span></li>
            <li><b className={styles.warning}>Specialist</b><span>{specialistReview}</span></li>
          </ul>}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Review decision</span><span className={styles.pill}>{decision === "pending" ? "Awaiting review" : decision === "returned" ? "Returned for revision" : "Illustrative approval"}</span></div>
          <h2>Record the decision and reason</h2>
          <p>Record a sample decision for the saved version. Each action retains its reason and stem in this session. Reloading resets the demonstration.</p>
          <label className={styles.selectLabel} htmlFor="return-reason">Reason if returned</label>
          <select id="return-reason" className={styles.select} value={returnReason} onChange={(event) => setReturnReason(event.target.value)}>
            <option>Distractor C is too easy to dismiss</option>
            <option>The source reference is not precise enough</option>
            <option>More than one answer may be defensible</option>
            <option>The reading level needs to be reduced</option>
          </select>
          <div className={styles.buttonRow}>
            <button type="button" className={styles.secondaryButton} disabled={editing} onClick={() => recordDecision("returned")}>Return with reason</button>
            <button type="button" className={styles.primaryButton} disabled={editing} onClick={() => recordDecision("approved")}>Record sample approval</button>
          </div>
          {editing && <p>Save or cancel the stem edit before recording a decision.</p>}
          <div className={styles.record} aria-live="polite"><strong>Current review record</strong><br/>Version: 0.{current.revision}<br/>Decision: {records[0].Decision}<br/>Reason: {current.reason}<br/>Reviewer: {records[0].Reviewer}<br/>Release state: never published to a live test</div>
          <details className={styles.history}>
            <summary>Revision and decision history ({history.length} entries)</summary>
            <ol>{history.map((entry, index) => <li key={index}><strong>Version 0.{entry.revision} · {entry.decision === "approved" ? "Sample approval" : entry.decision}</strong><p>{entry.question}</p><p>{entry.reason}</p></li>)}</ol>
          </details>
        </section>
      </div>

      <section className={styles.bankPanel}>
        <div className={styles.bankIntro}>
          <div>
            <span className={styles.eyebrow}>Question bank and export</span>
            <h2>One item sits within a controlled set of ten.</h2>
            <p>Inspect all ten illustrative drafts below. Item 01 follows your saved edits and decisions. The preview includes pending and returned items for review; none is released for live use.</p>
          </div>
          <button type="button" className={styles.primaryButton} onClick={() => setShowExport(!showExport)}>{showExport ? "Hide export preview" : "Preview buyer export"}</button>
        </div>
        <div className={styles.bankTable} aria-label="Illustrative ten-question bank">
          {records.map(fields => <details className={styles.bankItem} key={fields["Question number"]}>
            <summary className={styles.bankRow}><b>{fields["Question number"]}</b><span>{fields.Topic}</span><small>{fields.Decision} · v{fields.Version}</small></summary>
            <RecordFields fields={fields} />
          </details>)}
        </div>
        {showExport && <div className={styles.exportPreview}>
          <strong>Buyer template preview</strong>
          <span>{records.length} draft items · {Object.keys(records[0]).length} fields per item · sources and proposed rationales included</span>
          <small>Populated review preview only. The official buyer spreadsheet remains the submission format. All content is illustrative; specialist approval is outstanding.</small>
          {records.map(fields => <article className={styles.exportItem} key={fields["Question number"]} aria-label={`Export item ${fields["Question number"]}`}>
            <h3>{fields["Question number"]} · {fields.Topic}</h3>
            <RecordFields fields={fields} />
          </article>)}
        </div>}
      </section>

      <section className={styles.endnote}><h2>What this demonstrates</h2><p>DataGo&apos;s proposed value is the controlled route from approved evidence to a question that people can challenge, improve and trace. A proof of concept would measure time to an accepted item, reviewer effort, return reasons and quality against CITB&apos;s rubric.</p></section>
    </div>
  );
}
