import type { CSSProperties } from "react";
import { fictionalConversation, illustrativeMemoryNodes, storyChapters, storyDisclosure } from "@/lib/oomp-story-data";
import { OompMark } from "./OompMark";
import { OompMemoryConstellation } from "./OompMemoryConstellation";
import { HostHandoff, RecallOverlay, StaticRecall } from "./OompEvidenceFlow";
import styles from "./oomp-story.module.css";

function Conversation() {
  return <>
    <div className={styles.sceneCanvas}>
      <div className={styles.conversationFrame}>
        <div className={styles.conversationHeader}><span className={styles.technicalLabel}>AI HOST / ACTIVE CONTEXT</span><span>FINITE WINDOW</span></div>
        <div className={styles.conversationViewport}><ol className={styles.conversationTrack}>{fictionalConversation.map((message, index) => <li key={message.source} className={styles.chatMessage} style={{ "--message-index": index } as CSSProperties}><code>{message.source}</code><p>{message.text}</p></li>)}</ol></div>
        <div className={styles.contextBoundary}><span /><small>Earlier context passes this boundary</small><span /></div>
      </div>
      <div className={styles.conversationThread} aria-hidden="true" />
      <div className={styles.contextCore} aria-hidden="true"><OompMark /><span>OOMP</span></div>
    </div>
    <div className={styles.sceneFoot}><p>The prompt moves on. <span>The source can remain.</span></p><span>A finite active window is not a claim that the host deletes its transcripts.</span></div>
  </>;
}

function Persistence() {
  return <>
    <div className={styles.sceneCanvas}>
      <div className={styles.intakeLabel}><span className={styles.technicalLabel}>AUTHORIZED SOURCE INTAKE</span><span>Original events recorded first</span></div>
      <svg className={styles.intakeConnections} viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M12 26C32 26 29 47 50 47M12 48H50M12 70C32 70 29 47 50 47M50 47H86" pathLength="1" /></svg>
      <div className={styles.intakeFragments} aria-hidden="true">{illustrativeMemoryNodes.slice(0, 3).map(node => <span key={node.id}>{node.source}</span>)}</div>
      <div className={styles.persistenceCore} aria-hidden="true"><div className={styles.coreOrbit} /><div className={styles.coreSymbol}><OompMark /></div><strong>OOMP</strong><span>MIND + SOURCE VALIDATION</span></div>
      <div className={styles.formedMemories}>{illustrativeMemoryNodes.slice(0, 2).map(node => <div key={node.id}><span>{node.category}</span><strong>{node.label}</strong><code>↳ {node.source}</code></div>)}</div>
      <span className={styles.sourceRetention}>Some passages stay source-only.</span>
    </div>
    <div className={`${styles.sceneFoot} ${styles.intakeStages}`}><ol><li>Source intake</li><li>Durable event</li><li>Mind + validation</li><li>Attributed memory</li></ol><span>Not every source passage becomes a canonical fact.</span></div>
  </>;
}

export function OompStoryStage({ scene }: { scene?: number }) {
  const all = scene === undefined;
  return (
    <figure className={styles.stageVisual} data-story-stage data-scene={scene ?? 0} style={{ "--scene-progress": all ? 0 : 1 } as CSSProperties}>
      <figcaption className={styles.stageTop}><span><OompMark />THE LIVING MEMORY</span><span>{storyDisclosure}</span></figcaption>
      <div className={styles.stageBody}>
        <div className={styles.depthField} aria-hidden="true"><span /><span /><span /></div>
        {(all || scene === 0) && <div className={`${styles.visualLayer} ${styles.conversationLayer}`}><Conversation /></div>}
        {(all || scene === 1) && <div className={`${styles.visualLayer} ${styles.persistenceLayer}`}><Persistence /></div>}
        {(all || scene === 2) && <div className={`${styles.visualLayer} ${styles.graphLayer}`}><OompMemoryConstellation /></div>}
        {all && <RecallOverlay />}
        {scene === 3 && <div className={styles.inlineRecallLayer}><StaticRecall /></div>}
        {(all || scene === 4) && <div className={`${styles.visualLayer} ${styles.handoffLayer}`}><HostHandoff /></div>}
      </div>
      {all ? <nav className={styles.sceneNavigation} aria-label="Visual story chapters">{storyChapters.map((chapter, index) => <a href={`#${chapter.id}`} data-story-jump={index} key={chapter.id} aria-label={`Chapter ${index + 1}: ${chapter.eyebrow.toLowerCase()}`}><span>0{index + 1}</span><i aria-hidden="true" /></a>)}</nav> : <p className={styles.inlineStageLabel}>0{(scene ?? 0) + 1} <span>/</span> {storyChapters[scene ?? 0].stageLabel}</p>}
    </figure>
  );
}
