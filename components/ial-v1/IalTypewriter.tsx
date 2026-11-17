import type { CSSProperties } from "react";
import styles from "./ial-v1.module.css";

export function IalTypewriter({ text }: { text: string }) {
  return <h1 className={styles.title} id="ial-title" tabIndex={-1}>
    <span className={styles.srOnly}>{text}</span>
    <span aria-hidden="true" className={styles.titleRun}>
      {Array.from(text).map((letter, index) => <span key={index} data-ial-type-glyph className={styles.typeGlyph} style={{ "--ial-letter": index } as CSSProperties & { "--ial-letter": number }}>{letter === " " ? "\u00a0" : letter}</span>)}
      <span className={styles.caret} data-ial-caret />
    </span>
  </h1>;
}
