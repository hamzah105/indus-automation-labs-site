import { OompMark } from "./OompMark";
import styles from "./oomp.module.css";

const flows = [
  {
    name: "01 / INGEST",
    explanation: "Preserve authorized history",
    steps: [
      ["AI host", "approved source events"],
      ["MCP interface", "signed ingest authority"],
      ["OOMP engine", "Mind extraction + validation"],
      ["Durable store", "local SQLite + source proofs"]
    ]
  },
  {
    name: "02 / RECALL",
    explanation: "Return evidence to the host",
    steps: [
      ["AI host → MCP", "authorized recall request"],
      ["OOMP + store", "scoped search + selection"],
      ["Selected evidence", "bounded packet via MCP"],
      ["Host model", "finite prompt → answer"]
    ]
  }
];

export function OompArchitecture() {
  return (
    <figure className={styles.architectureFigure}>
      <div className={styles.architectureHeader}><span><OompMark />SYSTEM OVERVIEW</span><span>INGEST / RECALL</span></div>
      <div className={styles.architectureFlows}>
        {flows.map((flow) => (
          <div className={styles.architectureFlow} key={flow.name}>
            <div className={styles.flowLabel}><p>{flow.name}</p><span>{flow.explanation}</span></div>
            <ol className={styles.flowSteps}>
              {flow.steps.map(([title, description], index) => (
                <li key={title}>
                  <div className={`${styles.flowNode} ${index === 2 ? styles.flowNodeAccent : ""}`}>
                    <span className={styles.nodeIndex}>0{index + 1}</span>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </div>
                  {index < flow.steps.length - 1 ? <span className={styles.flowArrow} aria-hidden="true">→</span> : null}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <figcaption><span aria-hidden="true" />OOMP supplies evidence. The host’s language model generates the answer.</figcaption>
    </figure>
  );
}
