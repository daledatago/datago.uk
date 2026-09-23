"use client";

import { useState } from "react";
import styles from "../prototype.module.css";

type Decision = "pending" | "returned" | "approved";

const options = [
  "The surface is safe if the task is brief",
  "The surface may break under a person's weight",
  "The surface is safe when it looks dry",
  "The surface is safe if only one person crosses it",
];

const bankItems = [
  ["01", "Old roof lights", "Ready for review"],
  ["02", "Fibre cement sheets", "Source check passed"],
  ["03", "Corroded metal sheets", "Returned"],
  ["04", "Slates and tiles", "Assessment review"],
  ["05", "Roof assessment", "Draft"],
  ["06", "Avoiding roof access", "Draft"],
  ["07", "Using a work platform", "Draft"],
  ["08", "Safe access", "Draft"],
  ["09", "Remaining fall risk", "Draft"],
  ["10", "Warning signs", "Draft"],
];

export function AssessmentDemo() {
  const [decision, setDecision] = useState<Decision>("pending");
  const [showChecks, setShowChecks] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [question, setQuestion] = useState("Why should someone avoid stepping onto a fragile roof surface?");
  const [returnReason, setReturnReason] = useState("Distractor C is too easy to dismiss");

  function saveEdit() {
    setEditing(false);
    setEdited(true);
    setDecision("pending");
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
            <div><dt>Assessment criterion</dt><dd>Identify fragile roof surfaces and the controls associated with work on or near them.</dd></div>
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
              <textarea id="question-edit" value={question} onChange={(event) => setQuestion(event.target.value)} rows={4} />
              <div className={styles.buttonRow}>
                <button type="button" className={styles.primaryButton} onClick={saveEdit}>Save revision</button>
                <button type="button" className={styles.secondaryButton} onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p className={styles.question}>{question}</p>
              <button type="button" className={styles.inlineButton} onClick={() => setEditing(true)}>Edit draft</button>
            </>
          )}
          <div className={styles.options}>{options.map((option, index) => <button type="button" key={option} className={`${styles.option} ${answer === option ? styles.selectedOption : ""}`} onClick={() => setAnswer(option)}><b>{String.fromCharCode(65 + index)}</b>{option}</button>)}</div>
          {answer && <div className={styles.feedback}>{answer === options[1] ? "Proposed correct answer. A construction specialist still needs to confirm the source match and wording." : "Proposed distractor. The reviewer checks that it is plausible, clearly wrong and fair."}</div>}
          <div className={styles.sourceBox}><strong>Draft rationale and citation</strong><br/>Fragile material may not support a person&apos;s weight. Proposed key: B.<br/>HSE GEIS5, page 1. Work at Height Regulations 2005, regulation 9.</div>
        </section>
      </div>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Quality gate</span><span className={styles.pill}>Checks support review</span></div>
          <h2>Checks with a clear owner</h2>
          <p>Automated checks narrow the review task. They do not certify that a question is correct or suitable for a live test.</p>
          <button type="button" className={styles.primaryButton} onClick={() => setShowChecks(!showChecks)}>{showChecks ? "Hide quality checks" : "Run draft checks"}</button>
          {showChecks && <ul className={styles.checks}>
            <li><b className={styles.pass}>Pass</b><span>One proposed key and three distinct distractors</span></li>
            <li><b className={styles.pass}>Pass</b><span>Stem and options meet the plain-language length check</span></li>
            <li><b className={styles.pass}>Pass</b><span>Source file, page and legislation are attached</span></li>
            <li><b className={styles.warning}>Review</b><span>Only one answer must remain defensible in the full source context</span></li>
            <li><b className={styles.warning}>Review</b><span>Distractor C may be too easy for the intended audience</span></li>
            <li><b className={styles.warning}>Specialist</b><span>Construction accuracy and assessment validity are still outstanding</span></li>
          </ul>}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Review decision</span><span className={styles.pill}>{decision === "pending" ? "Awaiting review" : decision === "returned" ? "Returned for revision" : "Illustrative approval"}</span></div>
          <h2>Record the decision and reason</h2>
          <p>A named reviewer can edit, return or approve the item. The decision, reason and version remain with the question.</p>
          <label className={styles.selectLabel} htmlFor="return-reason">Reason if returned</label>
          <select id="return-reason" className={styles.select} value={returnReason} onChange={(event) => setReturnReason(event.target.value)}>
            <option>Distractor C is too easy to dismiss</option>
            <option>The source reference is not precise enough</option>
            <option>More than one answer may be defensible</option>
            <option>The reading level needs to be reduced</option>
          </select>
          <div className={styles.buttonRow}>
            <button type="button" className={styles.secondaryButton} onClick={() => setDecision("returned")}>Return with reason</button>
            <button type="button" className={styles.primaryButton} onClick={() => setDecision("approved")}>Record sample approval</button>
          </div>
          <div className={styles.record}><strong>Current review record</strong><br/>Version: {edited ? "0.2, reviewer edit saved" : "0.1, generated draft"}<br/>Decision: {decision === "pending" ? "pending" : decision === "returned" ? `returned: ${returnReason}` : "sample approval recorded"}<br/>Reviewer: demonstration user<br/>Release state: never published to a live test</div>
        </section>
      </div>

      <section className={styles.bankPanel}>
        <div className={styles.bankIntro}>
          <div>
            <span className={styles.eyebrow}>Question bank and export</span>
            <h2>One item sits within a controlled set of ten.</h2>
            <p>The full exercise keeps the status, source and review evidence for every draft. Only accepted items should move into the buyer&apos;s template or question bank.</p>
          </div>
          <button type="button" className={styles.primaryButton} onClick={() => setShowExport(!showExport)}>{showExport ? "Hide export preview" : "Preview buyer export"}</button>
        </div>
        <div className={styles.bankTable} role="table" aria-label="Illustrative ten-question bank">
          {bankItems.map(([number, topic, status]) => <div className={styles.bankRow} role="row" key={number}><b role="cell">{number}</b><span role="cell">{topic}</span><small role="cell">{status}</small></div>)}
        </div>
        {showExport && <div className={styles.exportPreview}>
          <strong>Buyer template preview</strong>
          <span>10 draft items · 19 fields per item · sources and rationales included</span>
          <code>Question number | criterion | source reference | stem | options A to D | key | rationales | confidence | review | risks | accessibility | audit trail</code>
          <small>Preview only. The official buyer spreadsheet remains the submission format.</small>
        </div>}
      </section>

      <section className={styles.endnote}><h2>What this demonstrates</h2><p>DataGo&apos;s proposed value is the controlled route from approved evidence to a question that people can challenge, improve and trace. A proof of concept would measure time to an accepted item, reviewer effort, return reasons and quality against CITB&apos;s rubric.</p></section>
    </div>
  );
}
