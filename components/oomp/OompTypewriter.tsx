import type { CSSProperties } from "react";
import styles from "./oomp.module.css";

// CSS reveals whole glyphs in reserved space, so animation needs no client JS,
// timers or hydration state. Assistive technology reads the full heading once.
export function OompTypewriter({ text }: { text: string }) {
  return (
    <h1 className={styles.title} id="oomp-title">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={styles.titleRun}>
        <span className={styles.initialCursor} />
        {Array.from(text).map((character, index) => (
          <span
            key={`${index}-${character}`}
            className={styles.typedCharacter}
            style={{ "--oomp-char-index": index } as CSSProperties}
          >
            {character === " " ? "\u00a0" : character}
          </span>
        ))}
      </span>
    </h1>
  );
}
