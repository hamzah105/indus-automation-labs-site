"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./exhibition.module.css";

const lenses = [
  { name: "Conversations", caption: "A question becomes a work item.", note: "Customer messages, made visible to the operator." },
  { name: "Business context", caption: "A useful answer starts with useful information.", note: "Catalog information and business knowledge support the reply." },
  { name: "Operator control", caption: "Choose how the work should move.", note: "Manual, Approval and Auto modes support different levels of automation." }
];

export function ProductSpotlight() {
  const [active, setActive] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  function key(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" ? (index + 1) % 3 : event.key === "ArrowLeft" ? (index + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : -1;
    if (next < 0) return;
    event.preventDefault(); setActive(next); buttons.current[next]?.focus();
  }
  return <div className={styles.spotlight} data-product-spotlight data-lens={active}>
    <div className={styles.instrumentHeader}><span>AUTOCHAT / SYSTEM VIEW</span><span>Illustrative</span></div>
    <div role="tabpanel" id="product-lens-panel" aria-labelledby={`product-lens-${active}`} className={styles.lensPanel}>
      <div className={styles.specimen} aria-hidden="true">
        <div className={styles.specimenFrame}><span className={styles.specimenCode}>AC</span><i /><i /><i /><span className={styles.specimenLabel}>{["INQUIRY", "CONTEXT", "APPROVAL"][active]}</span></div>
        <div className={styles.instrumentTicks}><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span></div>
      </div>
      <h3>{lenses[active].caption}</h3><p>{lenses[active].note}</p>
    </div>
    <div role="tablist" aria-label="Explore AutoChat capabilities" className={styles.lensTabs}>{lenses.map((lens, index) => <button key={lens.name} type="button" role="tab" id={`product-lens-${index}`} aria-controls="product-lens-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={button => { buttons.current[index] = button; }} onClick={() => setActive(index)} onKeyDown={event => key(event, index)}><span>0{index + 1}</span>{lens.name}</button>)}</div>
    <noscript><style>{`[data-product-spotlight] [role="tablist"]{display:none!important}`}</style><p className={styles.noScriptNote}>AutoChat combines conversations, business context and operator choice. Explore the complete capability descriptions below.</p></noscript>
  </div>;
}
