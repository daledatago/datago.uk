"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../prototype.module.css";

const money = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

export function CircularDemo() {
  const [units, setUnits] = useState(1000);
  const [recovery, setRecovery] = useState(40);
  const [refurbishment, setRefurbishment] = useState(36);
  const [materialCost, setMaterialCost] = useState(70);
  const [uplift, setUplift] = useState(0);
  const annualRecovered = Math.round(units * recovery / 100);
  const linearMaterial = units * materialCost * (1 + uplift / 100);
  const circularMaterial = (units - annualRecovered) * materialCost * (1 + uplift / 100);
  const refurbishmentCost = annualRecovered * refurbishment;
  const netDifference = linearMaterial - circularMaterial - refurbishmentCost;
  const breakEven = Math.round((refurbishment / (materialCost * (1 + uplift / 100))) * 100);

  return (
    <div className={styles.page}>
      <div className={styles.topline}><Link href="/demos">← All demonstrations</Link><span>02 / Circular value</span></div>
      <nav className={styles.demoTabs} aria-label="Demonstration views">
        <span className={styles.activeTab}>Circular economy</span>
        <Link href="/demos/enterprise-delivery">Enterprise delivery</Link>
      </nav>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Working prototype · illustrative figures</span>
        <h1>Can a circular choice stand up commercially?</h1>
        <p>Change the assumptions. See the financial effect, the exposure to material prices and what evidence is still missing before a business can act.</p>
      </header>
      <div className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Scenario</span><span className={styles.pill}>Repair and reuse</span></div>
          <h2>Business inputs</h2>
          <p>A business supplies equipment and is considering collecting used units, refurbishing them and supplying them again. This simple model isolates material and refurbishment costs.</p>
          <div className={styles.controls}>
            <label>Units supplied each year <strong>{units.toLocaleString("en-GB")}</strong><input type="range" min="100" max="5000" step="100" value={units} onChange={e => setUnits(Number(e.target.value))}/></label>
            <label>Usable units recovered <strong>{recovery}%</strong><input type="range" min="0" max="80" step="5" value={recovery} onChange={e => setRecovery(Number(e.target.value))}/></label>
            <label>Refurbishment cost per recovered unit <strong>{money(refurbishment)}</strong><input type="range" min="10" max="120" step="2" value={refurbishment} onChange={e => setRefurbishment(Number(e.target.value))}/></label>
            <label>New material cost per unit <strong>{money(materialCost)}</strong><input type="range" min="30" max="150" step="5" value={materialCost} onChange={e => setMaterialCost(Number(e.target.value))}/></label>
            <label>Material price increase <strong>{uplift}%</strong><input type="range" min="0" max="50" step="5" value={uplift} onChange={e => setUplift(Number(e.target.value))}/></label>
          </div>
        </section>
        <section className={styles.panel} aria-live="polite">
          <div className={styles.panelHead}><span>Decision view</span><span className={styles.pill}>Annual illustration</span></div>
          <h2>What changes?</h2>
          <div className={styles.metric}><span>Cost difference in this narrow model</span><strong className={netDifference > 0 ? styles.positive : netDifference < 0 ? styles.negative : undefined}>{netDifference > 0 ? "+" : ""}{money(netDifference)}</strong><small>{netDifference > 0 ? "Lower modelled cost with reuse" : netDifference < 0 ? "Higher modelled cost with reuse" : "Equal modelled costs"}</small></div>
          <div className={styles.metricGrid}><div><span>Linear material cost</span><strong>{money(linearMaterial)}</strong></div><div><span>Reuse material + refurbishment</span><strong>{money(circularMaterial + refurbishmentCost)}</strong></div><div><span>New units avoided</span><strong>{annualRecovered.toLocaleString("en-GB")}</strong></div><div><span>Recovered-unit break-even cost</span><strong>{money(materialCost * (1 + uplift / 100))}</strong></div></div>
          <p className={styles.analysis}>{annualRecovered === 0 ? "With no units recovered, both alternatives buy the same number of new units and have equal modelled costs." : netDifference < 0 ? "Refurbishment currently costs more than new material in this model. Test process efficiency or other sources of value before making the case." : netDifference > 0 ? `At these inputs, refurbishing costs less than buying new material. The result still depends on whether ${recovery}% recovery is achievable.` : "At these inputs, refurbishment and new material cost the same per unit, so both alternatives have equal modelled costs."}</p>
        </section>
      </div>
      <div className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Resilience</span><span className={styles.pill}>Scenario comparison</span></div>
          <h2>Exposure to new material prices</h2>
          <p>{annualRecovered > 0 ? `With ${recovery}% recovery, the model would need ${annualRecovered.toLocaleString("en-GB")} fewer new units. A material price increase affects fewer purchases.` : "With no units recovered, both alternatives need the same number of new units. A material price increase affects the same number of purchases."} This is a resilience hypothesis, not a measured supply-chain outcome.</p>
          <div className={styles.barLabel}>Material spending under selected price change</div>
          <div className={styles.barTrack}><div className={styles.barLinear} style={{width:"100%"}}/></div><div className={styles.barLegend}>Linear <strong>{money(linearMaterial)}</strong></div>
          <div className={styles.barTrack}><div className={styles.barCircular} style={{width:`${linearMaterial === 0 ? 0 : Math.min(100, (circularMaterial / linearMaterial) * 100)}%`}}/></div><div className={styles.barLegend}>Circular material <strong>{money(circularMaterial)}</strong></div>
        </section>
        <section className={styles.panel}>
          <div className={styles.panelHead}><span>Evidence register</span><span className={styles.pill}>Not yet validated</span></div>
          <h2>What would make this credible?</h2>
          <ul className={styles.evidenceList}><li><strong>Recovery rate</strong><span>Measure collection and usable return rates in a real pilot.</span></li><li><strong>True operating cost</strong><span>Add collection, inspection, storage, warranty and reverse logistics.</span></li><li><strong>Customer value</strong><span>Test whether availability, service and retention improve.</span></li><li><strong>Environmental claims</strong><span>Use an agreed method and verified inputs before quantifying impact.</span></li></ul>
          <p className={styles.analysis}>Break-even recovery only matters after the full cost model is added. Current recovery assumption: {recovery}%. Refurbishment is {breakEven}% of new material cost at today&apos;s selected price.</p>
        </section>
      </div>
      <section className={styles.endnote}><h2>From calculator to decision service</h2><p>The next version would connect real business data, record assumption owners and confidence, compare multiple circular practices and aggregate anonymised patterns for programme learning. It needs circular-economy and commercial specialists to test the methodology with users.</p></section>
    </div>
  );
}
