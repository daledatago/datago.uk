"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../prototype.module.css";

type Decision = "pending" | "returned" | "approved";

export function AssessmentDemo() {
  const [decision, setDecision] = useState<Decision>("pending");
  const [showChecks, setShowChecks] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const options = [
    "The surface is safe if work is brief",
    "The surface may break under a person's weight",
    "The surface is safe when it looks dry",
    "The surface is safe if only one person crosses it",
  ];
  return (
    <div className={styles.page}>
      <div className={styles.topline}><Link href="/demos">← All demonstrations</Link><span>01 / Assessment workflow</span></div>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Working prototype · illustrative content</span>
        <h1>From controlled source to a reviewable question.</h1>
        <p>A draft is only useful when a specialist can see why it was written, challenge it and record what happened next.</p>
      </header>
      <div className={styles.stepbar} aria-label="Workflow steps"><span className={styles.activeStep}>1 · Source</span><span className={styles.activeStep}>2 · Draft</span><span className={styles.activeStep}>3 · Checks</span><span className={styles.activeStep}>4 · Review</span></div>
      <div className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Source record</span><span className={styles.pill}>Versioned input</span></div>
          <h2>Fragile roof surfaces</h2>
          <p>In this example, the authoring team selects a proposed source set about work at height. The source and version travel with the draft; the buyer still decides what is approved for use.</p>
          <div className={styles.sourceBox}><strong>Illustrative source register</strong><br/>HSE GEIS5, Fragile roofs<br/>HSE INDG401, Working at height<br/>Source status: awaiting buyer approval for use</div>
          <a className={styles.textLink} href="https://www.hse.gov.uk/pubns/geis5.htm" target="_blank" rel="noreferrer">Inspect the public HSE guidance ↗</a>
        </section>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Draft item</span><span className={styles.pill}>Human review required</span></div>
          <h2>One question, four options</h2>
          <p className={styles.question}>Why should someone avoid stepping onto a fragile roof surface?</p>
          <div className={styles.options}>{options.map((option, index) => <button type="button" key={option} className={`${styles.option} ${answer === option ? styles.selectedOption : ""}`} onClick={() => setAnswer(option)}><b>{String.fromCharCode(65+index)}</b>{option}</button>)}</div>
          {answer && <div className={styles.feedback}>{answer === options[1] ? "Proposed correct answer. A specialist still needs to confirm the wording and source match." : "This is a plausible distractor. The review checks that it is clearly wrong, fair and useful."}</div>}
          <div className={styles.sourceBox}><strong>Draft rationale</strong><br/>Fragile material may not support a person&apos;s weight. The proposed key is B. The question, key, distractors and source alignment all require expert review.</div>
        </section>
      </div>
      <div className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Quality gate</span><span className={styles.pill}>Visible checks</span></div>
          <h2>What the machine can flag</h2>
          <p>Automated checks help reviewers focus. They do not decide whether an item is technically correct or fit for an assessment.</p>
          <button type="button" className={styles.primaryButton} onClick={() => setShowChecks(!showChecks)}>{showChecks ? "Hide checks" : "Run draft checks"}</button>
          {showChecks && <ul className={styles.checks}><li>✓ One proposed correct answer and three distractors</li><li>✓ Plain-language length check</li><li>✓ Source link attached to the draft</li><li>! Technical accuracy requires a subject expert</li><li>! Fairness and assessment quality require an item writer</li></ul>}
        </section>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Review decision</span><span className={styles.pill}>{decision === "pending" ? "Awaiting review" : decision === "returned" ? "Returned for revision" : "Illustrative approval"}</span></div>
          <h2>Keep the human accountable</h2>
          <p>A named reviewer checks the key, distractors, rationale, source and suitability. The decision and reason become part of the item record.</p>
          <div className={styles.buttonRow}><button type="button" className={styles.secondaryButton} onClick={() => setDecision("returned")}>Return for revision</button><button type="button" className={styles.primaryButton} onClick={() => setDecision("approved")}>Record sample approval</button></div>
          <div className={styles.record}><strong>Demo record</strong><br/>Decision: {decision === "pending" ? "pending" : decision === "returned" ? "returned, rationale and source need review" : "sample approval recorded"}<br/>Reviewer: demonstration user<br/>Release state: never published to a live test</div>
        </section>
      </div>
      <section className={styles.endnote}><h2>The point of the prototype</h2><p>DataGo would measure time to an accepted item, review effort and the reasons drafts are returned. The next step is to test this workflow with assessment and construction specialists using buyer-approved source material.</p></section>
    </div>
  );
}
