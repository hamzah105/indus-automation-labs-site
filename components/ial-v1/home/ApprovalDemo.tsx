"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./universe.module.css";

type ApprovalState = "proposed" | "review" | "approved" | "declined";
export function ApprovalDemo() {
  const [state, setState] = useState<ApprovalState>("proposed");
  const title = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  useEffect(() => { if (interacted.current) title.current?.focus(); }, [state]);
  useEffect(() => {
    const story = title.current?.closest<HTMLElement>("[data-signal-story]");
    if (story) story.dataset.approvalOutcome = state;
  }, [state]);
  const change = (next: ApprovalState) => { interacted.current = true; setState(next); };
  const heading = state === "approved" ? "Approved in this example." : state === "declined" ? "Declined. The action is held." : state === "review" ? "Your decision is the boundary." : "A proposal, awaiting a person.";
  return <div className={styles.approval} data-approval-demo data-outcome={state}>
    <div className={styles.demoMeta}><span>CONCEPT DEMO</span><span>Fictional data</span></div>
    <div className={styles.approvalRoute} aria-hidden="true"><span className={styles.proposalDot} /><i /><span className={styles.humanGate}>HUMAN</span><i /><span className={styles.actionDot} /></div>
    <h3 ref={title} tabIndex={-1}>{heading}</h3>
    <p className={styles.proposal}>Proposed action: reply to a product-availability inquiry using a fictional catalog entry.</p>
    <div className={styles.reviewDraft} hidden={state !== "review"}><span>PROPOSED REPLY</span><p>“The standard Arc desk lamp is available in blue. Would you like the product details?”</p></div>
    <p role="status" className={styles.demoStatus}>{state === "approved" ? "The illustrated action passes the review boundary. No message was sent." : state === "declined" ? "The proposal stays with the operator. No action proceeds and no message is sent." : state === "review" ? "Read the proposal, then approve or decline this fictional action." : "A prepared action stays on this side of the approval boundary."}</p>
    <div className={styles.demoActions} data-approval-controls>
      {state === "proposed" && <button onClick={() => change("review")}>Review proposed action <span aria-hidden="true">→</span></button>}
      {state === "review" && <><button onClick={() => change("approved")}>Approve example</button><button onClick={() => change("declined")}>Decline example</button></>}
      {state !== "proposed" && <button className={styles.resetButton} onClick={() => change("proposed")}>Restart</button>}
    </div>
    <details className={styles.staticApproval}><summary>How both outcomes work</summary><p>Review the proposed reply. Approve: the illustrated action can proceed. Decline: the action is held for the operator. This demonstration sends nothing.</p></details>
    <noscript><style>{`[data-approval-demo] [data-approval-controls]{display:none!important}`}</style></noscript>
  </div>;
}
