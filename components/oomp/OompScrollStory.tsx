import { oompContent } from "@/lib/oomp-content";
import { storyChapters } from "@/lib/oomp-story-data";
import { OompArchitecture } from "./OompArchitecture";
import { OompStoryControls } from "./OompStoryControls";
import { OompStoryStage } from "./OompStoryStage";
import base from "./oomp.module.css";
import styles from "./oomp-story.module.css";

export function OompScrollStory() {
  return (
    <section className={styles.story} id="architecture" aria-labelledby="story-title" data-layout="auto">
      <noscript><style>{`.${styles.story}{--story-layout:block!important;--desktop-stage-display:none!important;--inline-stage-display:block!important;--chapter-height:auto!important;--chapter-display:grid!important;--rail-tail:0px!important}`}</style></noscript>
      <header className={styles.storyHeader}>
        <div><p className={base.sectionLabel}><span>01—03</span>THE LIVING MEMORY</p><h2 id="story-title">A past worth keeping.<br /><span>A context worth selecting.</span></h2></div>
        <div><p className={styles.storyIntroduction}>Follow a conversation beyond the active window.<br />From original source to the next finite prompt.</p><OompStoryControls /></div>
      </header>
      <div className={styles.storyLayout}>
        <div className={styles.chapterRail} data-story-rail>
          {storyChapters.map((chapter, index) => (
            <article className={styles.chapter} id={chapter.id} key={chapter.id} data-story-chapter={index} tabIndex={-1} aria-labelledby={`${chapter.id}-title`}>
              <div className={styles.chapterCopy}>
                <p className={styles.chapterEyebrow}><span>0{index + 1}</span>{chapter.eyebrow}</p>
                <h3 id={`${chapter.id}-title`} className={styles.chapterTitle}>{chapter.title}<br /><span>{chapter.accent}</span></h3>
                {chapter.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                <p className={styles.chapterNote}>{chapter.note}</p>
                {index === 0 ? <blockquote className={styles.storyQuestion}>The useful question isn’t “How much can we fit?”<br /><span>It’s “What do we need to recall?”</span></blockquote> : null}
              </div>
              <div className={styles.inlineStage}><OompStoryStage scene={index} /></div>
            </article>
          ))}
        </div>
        <div className={styles.desktopStage} data-desktop-stage><OompStoryStage /></div>
      </div>
      <div className={styles.storyConclusion}><span aria-hidden="true" /><p>Keep the history. <strong>Choose the evidence.</strong></p><a href="#capabilities">Continue to the implementation <span aria-hidden="true">↓</span></a></div>
      <details className={styles.architectureNotes}>
        <summary>Inspect the system boundaries <span aria-hidden="true">+</span></summary>
        <div><h3>Memory has a place. Outside the model.</h3><p>Ingestion and recall are separate paths. Source history stays in the durable store; selected evidence returns to the host. The trusted Python API also accesses the engine directly. MCP is optional. Retrieval permission does not grant ingestion authority.</p><OompArchitecture /><ol className={styles.pipelineNotes}>{oompContent.pipeline.map(step => <li key={step.title}><strong>{step.title}</strong><p>{step.description}</p></li>)}</ol></div>
      </details>
    </section>
  );
}
