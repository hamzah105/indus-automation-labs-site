"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { illustrativeEdges, illustrativeMemoryNodes as nodes, type MemoryNodeId } from "@/lib/oomp-story-data";
import { OompMark } from "./OompMark";
import styles from "./oomp-story.module.css";

export function OompMemoryConstellation() {
  const id = useId().replace(/:/g, "");
  const widget = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<MemoryNodeId | null>(null);
  const [preview, setPreview] = useState<MemoryNodeId | null>(null);
  const [recalling, setRecalling] = useState(false);
  const active = nodes.find(node => node.id === (selected ?? preview));
  const highlighted = new Set(active ? [active.id, ...active.related] : []);
  useEffect(() => {
    setReady(true);
    const stage = widget.current?.closest("[data-story-stage]");
    const changeScene = (event: Event) => {
      // Inspection belongs to the constellation chapter. The recall illustration
      // selects its fixed project example, independently of earlier inspection.
      const isRecall = (event as CustomEvent<number>).detail === 3;
      setRecalling(isRecall);
      setSelected(isRecall ? "project" : null);
      setPreview(null);
    };
    stage?.addEventListener("oomp:scenechange", changeScene);
    return () => stage?.removeEventListener("oomp:scenechange", changeScene);
  }, []);

  function clear() {
    setSelected(null);
    setPreview(null);
  }

  function coordinates(nodeId: string) {
    const node = nodes.find(item => item.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 50, y: 47 };
  }

  return (
    <div ref={widget} className={styles.graphWidget} data-graph-ready={ready} data-has-selection={Boolean(active)} onKeyDown={event => { if (event.key === "Escape" && !recalling) clear(); }}>
      <div className={styles.graphCanvas}>
        <div className={styles.graphComposition}>
          <svg className={styles.graphEdges} viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
            {illustrativeEdges.map((edge, index) => {
              const from = coordinates(edge.from);
              const to = coordinates(edge.to);
              const activeEdge = highlighted.has(edge.from as MemoryNodeId) && (edge.to === "core" || highlighted.has(edge.to as MemoryNodeId));
              return <path key={`${edge.from}-${edge.to}`} d={`M${from.x} ${from.y} Q50 ${(from.y + to.y) / 2} ${to.x} ${to.y}`} pathLength="1" data-edge-type={edge.type} data-highlighted={activeEdge} data-recall-match={edge.from === "project"} style={{ "--edge-delay": index * .055 } as CSSProperties} />;
            })}
          </svg>
          <div className={styles.graphCore} aria-hidden="true"><div className={styles.coreSymbol}><OompMark /></div><span>OOMP</span><small>OBJECT MAP</small></div>
          {nodes.map((node, index) => (
            <button
              type="button"
              key={node.id}
              className={styles.memoryNode}
              disabled={!ready}
              data-memory-node={node.id}
              data-kind={node.kind}
              data-highlighted={highlighted.has(node.id)}
              data-recall-match={node.id === "project" || node.id === "source-01"}
              aria-label={`${node.category}: ${node.label}. Inspect fictional source.`}
              aria-pressed={selected === node.id}
              aria-controls={`${id}-source-detail`}
              style={{ "--node-x": `${node.x}%`, "--node-y": `${node.y}%`, "--node-delay": index * .065 } as CSSProperties}
              onPointerEnter={event => { if (event.pointerType === "mouse") setPreview(node.id); }}
              onPointerLeave={() => setPreview(null)}
              onFocus={() => setPreview(node.id)}
              onBlur={() => setPreview(null)}
              onClick={() => setSelected(current => current === node.id ? null : node.id)}
            >
              <span className={styles.nodeCategory}><i aria-hidden="true" />{node.category}</span>
              <strong>{node.label}</strong>
              {node.kind !== "source" ? <span className={styles.nodeSource}>↳ {node.source}</span> : null}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.sourceDetail} id={`${id}-source-detail`} role="region" aria-label="Fictional memory source detail" tabIndex={0}>
        <div className={styles.sourceDetailHeader}><span>{selected ? "SELECTED SOURCE" : "SOURCE INSPECTOR"}</span>{recalling ? <span className={styles.illustratedSelection}>Illustrated selection</span> : <button type="button" disabled={!selected} onClick={clear}>Clear selection <span aria-hidden="true">×</span></button>}</div>
        <div className={styles.sourceDetailContent} aria-live="polite" aria-atomic="true">
          {active ? <><p><strong>{active.label}</strong><code>{active.source}</code></p><blockquote>“{active.excerpt}”</blockquote><span>{active.explanation}</span></> : <><p className={styles.sourcePlaceholder}>Every memory has a way back.</p><span>Hover or focus a node to inspect its fictional source. Select to keep it open; Escape or Clear selection releases it.</span></>}
        </div>
      <details className={styles.staticSourceNotes}>
        <summary>Read the fictional source references</summary>
        <dl>{nodes.filter(node => node.kind !== "source").map(node => <div key={node.id}><dt>{node.label} · {node.source}</dt><dd>“{node.excerpt}” {node.explanation}</dd></div>)}</dl>
      </details>
      </div>
    </div>
  );
}
