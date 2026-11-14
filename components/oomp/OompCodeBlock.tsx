"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./oomp.module.css";

export function OompCodeBlock({ commands, label }: { commands: string[]; label: string }) {
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");
  const code = useRef<HTMLElement>(null);
  useEffect(() => setReady(true), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(commands.join("\n"));
      setStatus(`${label} copied.`);
    } catch {
      if (code.current) {
        const range = document.createRange();
        range.selectNodeContents(code.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        code.current.parentElement?.focus();
      }
      setStatus("Automatic copy is unavailable. Commands selected; use your device’s copy command.");
    }
  }

  return (
    <div className={styles.codeGroup}>
      <div className={styles.codeToolbar}>
        <span role="status" aria-live="polite" aria-atomic="true">{status}</span>
        {ready && <button type="button" onClick={copy} aria-label={`Copy ${label}`}>Copy<span aria-hidden="true"> ↗</span></button>}
      </div>
      <pre className={styles.codeBlock} tabIndex={0} aria-label={`${label}, horizontally scrollable`}><code ref={code}>{commands.join("\n")}</code></pre>
    </div>
  );
}
