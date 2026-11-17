"use client";

import { useEffect, useReducer, useRef, type KeyboardEvent } from "react";
import { autochatExample as example, initialWorkflow, workflowReducer, workflowStages, type WorkflowStage, type WorkflowState } from "@/lib/ial-v1/autochat-example";
import styles from "./operations.module.css";

function StageContent({ stage, decision, staticView = false }: { stage: WorkflowStage; decision: WorkflowState["decision"]; staticView?: boolean }) {
  if (stage === 0) return <div className={styles.inquiryView}><span className={styles.messageAvatar} aria-hidden="true">?</span><div><p className={styles.smallLabel}>EXAMPLE CUSTOMER</p><blockquote>{example.inquiry}</blockquote><p className={styles.messageFootnote}>A text inquiry. No account or connection is involved.</p></div></div>;
  if (stage === 1) return <div className={styles.contextView}><p className={styles.smallLabel}>SAMPLE CATALOG RECORD</p><dl><div><dt>Product</dt><dd>{example.product}</dd></div><div><dt>Variant</dt><dd>{example.variant}</dd></div><div><dt>Stock status</dt><dd>{example.availability}</dd></div></dl><p className={styles.contextNote}>Only the shown product facts are used in this illustration. This is a catalog example, not a view into model reasoning.</p></div>;
  if (stage === 2) return <div className={styles.draftView}><p className={styles.smallLabel}>DRAFT / NOT A SENT MESSAGE</p><blockquote>{example.draft}</blockquote><div className={styles.draftSources}><span>Catalog: matching variant</span><span>Review: required in this example</span></div></div>;
  if (stage === 3) return <div className={styles.reviewView}><div className={styles.reviewBoundary}><span aria-hidden="true">◇</span><strong>Human authorization</strong><span>Approval mode</span></div><p className={styles.reviewInstructions}>Read the draft before choosing an outcome. Approval mode waits for the operator; Auto mode is a separate product setting.</p><blockquote>{example.draft}</blockquote></div>;
  if (staticView) return <div className={styles.staticOutcomes}><div><strong>Approved example</strong><p>The final reply would use the approved draft shown above.</p></div><div><strong>Declined example</strong><p>The draft is held. No final response is sent.</p></div><p>Both are fictional outcomes. This page sends nothing.</p></div>;
  return <div className={styles.outcomeView} data-final-decision={decision}><span className={styles.outcomeSymbol} aria-hidden="true">{decision === "approved" ? "✓" : decision === "declined" ? "—" : "◇"}</span><p className={styles.smallLabel}>{decision === "approved" ? "APPROVED REPLY / ILLUSTRATION" : decision === "declined" ? "DECLINED / ACTION HELD" : "AUTHORIZATION REQUIRED"}</p><h4>{decision === "approved" ? "Approved. Ready to reply." : decision === "declined" ? "The reply stays unsent." : "No decision. No final reply."}</h4>{decision === "approved" ? <blockquote>{example.draft}</blockquote> : <p>{decision === "declined" ? "The operator declined the draft. It remains available for a later revision." : "Return to Human approval and review the proposed response first."}</p>}<p className={styles.noDelivery}>Demonstrated outcome only. No message was transmitted.</p></div>;
}

export function WorkflowDemo() {
  const [state, dispatch] = useReducer(workflowReducer, initialWorkflow);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const title = useRef<HTMLHeadingElement>(null);
  const focus = useRef<"title" | "first" | null>(null);
  useEffect(() => {
    if (focus.current === "title") title.current?.focus();
    if (focus.current === "first") buttons.current[0]?.focus();
    focus.current = null;
  }, [state]);
  function inspect(stage: WorkflowStage) { dispatch({ type: "inspect", stage }); }
  function navigate(type: "next" | "back") { focus.current = "title"; dispatch({ type }); }
  function decide(decision: "approved" | "declined") { focus.current = "title"; dispatch({ type: "decide", decision }); }
  function key(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = ["ArrowRight", "ArrowDown"].includes(event.key) ? (index + 1) % 5 : ["ArrowLeft", "ArrowUp"].includes(event.key) ? (index + 4) % 5 : event.key === "Home" ? 0 : event.key === "End" ? 4 : -1;
    if (next < 0) return;
    event.preventDefault(); inspect(workflowStages[next].id); buttons.current[next]?.focus();
  }
  return <section id="autochat-example" className={styles.workflow} aria-labelledby="workflow-title" data-autochat-workflow data-stage={state.stage} data-decision={state.decision}>
    <div className={styles.workflowTop}><div><p className={styles.smallLabel}>AUTOCHAT / APPROVAL MODE EXAMPLE</p><h2 id="workflow-title">Follow one customer question.</h2></div><span className={styles.fictionLabel}>Illustrative workflow — fictional data</span></div>
    <div className={styles.workflowBody} data-workflow-interactive>
      <ol role="tablist" aria-label="AutoChat workflow stages" className={styles.stageNav}>{workflowStages.map(stage => <li key={stage.id} role="presentation"><button type="button" role="tab" id={`workflow-tab-${stage.id}`} aria-label={`Stage ${stage.id + 1}: ${stage.name}`} aria-selected={stage.id === state.stage} aria-controls="workflow-panel" tabIndex={stage.id === state.stage ? 0 : -1} ref={button => { buttons.current[stage.id] = button; }} onClick={() => inspect(stage.id)} onKeyDown={event => key(event, stage.id)}><span className={styles.stageNumber}>0{stage.id + 1}</span><span className={styles.fullStage}>{stage.name}</span><span className={styles.shortStage} aria-hidden="true">{stage.short}</span><span className={styles.stageIndicator} aria-hidden="true" /></button></li>)}</ol>
      <div className={styles.workPanel} role="tabpanel" id="workflow-panel" aria-labelledby={`workflow-tab-${state.stage}`}>
        <div className={styles.panelHeading}><span>EXAMPLE / 0{state.stage + 1}</span><span>{state.stage === 3 ? "HUMAN DECISION" : state.stage === 4 ? "OUTCOME" : "PREPARATION"}</span></div><h3 ref={title} tabIndex={-1}>{workflowStages[state.stage].name}</h3><p className={styles.stageDescription}>{workflowStages[state.stage].description}</p>
        <div className={styles.stageContent}><StageContent stage={state.stage} decision={state.decision} /></div>
        <div className={styles.workflowControls}>
          <button type="button" onClick={() => navigate("back")} disabled={state.stage === 0}>← Back</button>
          {state.stage < 3 && <button className={styles.advanceButton} onClick={() => navigate("next")}>Next stage →</button>}
          {state.stage === 3 && <div className={styles.decisionActions}><button className={styles.advanceButton} onClick={() => decide("approved")}>Approve example</button><button className={styles.declineButton} onClick={() => decide("declined")}>Decline example</button></div>}
          {state.stage === 4 && state.decision === "pending" && <button className={styles.advanceButton} onClick={() => { focus.current = "title"; inspect(3); }}>Review before proceeding</button>}
          <button className={styles.replayButton} onClick={() => { focus.current = "first"; dispatch({ type: "reset" }); }}>Replay example ↻</button>
        </div>
      </div>
    </div>
    <div className={styles.staticWorkflow} data-workflow-static><p className={styles.staticLabel}>THE COMPLETE STATIC EXAMPLE</p><ol>{workflowStages.map(stage => <li key={stage.id}><h3><span>0{stage.id + 1}</span>{stage.name}</h3><StageContent stage={stage.id} decision="pending" staticView /></li>)}</ol></div>
    <p className={styles.workflowFooter}>A local demonstration of an approval-mode pattern. No WhatsApp session, API request or message delivery.</p>
    <noscript><style>{`[data-autochat-workflow] [data-workflow-interactive]{display:none!important}[data-autochat-workflow] [data-workflow-static]{display:block!important}`}</style></noscript>
    <span className={styles.srOnly} role="status" aria-live="polite">Stage {state.stage + 1} of 5: {workflowStages[state.stage].name}. {state.stage === 4 ? state.decision === "pending" ? "No decision has been made." : `Example ${state.decision}. No message was sent.` : ""}</span>
  </section>;
}
