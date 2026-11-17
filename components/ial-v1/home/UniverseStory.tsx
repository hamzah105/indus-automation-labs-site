import Link from "next/link";
import type { CSSProperties } from "react";
import { ialProjects, researchDirections } from "@/lib/ial-v1/portfolio";
import { IalMark } from "../IalHero";
import { ActionLink } from "../IalPage";
import { ApprovalDemo } from "./ApprovalDemo";
import { StoryController } from "./StoryController";
import styles from "./universe.module.css";
import ui from "../ial-ui.module.css";

const fragments = [
  { title: "Customer inquiries", note: "A question needs an answer.", x: -24, y: -16, rotate: -4 },
  { title: "Product information", note: "The detail is somewhere else.", x: 21, y: 14, rotate: 3 },
  { title: "Manual approvals", note: "Someone needs to decide.", x: -12, y: 5, rotate: -2 },
  { title: "Supplier coordination", note: "An update is still missing.", x: 18, y: -9, rotate: 3 },
  { title: "Follow-ups", note: "The conversation keeps moving.", x: -8, y: 19, rotate: -3 }
];
const systemSteps = ["Information", "Context", "Decision support", "Human authorization", "Action"];

function Chapter({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className={styles.chapter}><span>{number}</span>{children}</p>;
}

export function UniverseStory() {
  return <div className={styles.story} data-ial-story>
    <StoryController />
    <div className={styles.handoff} aria-hidden="true"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none"><path d="M500 0C500 72 0 0 0 100" /></svg></div>
    <section className={`${styles.scene} ${styles.problem}`} id="ial-work" data-story-scene="problem" aria-labelledby="problem-title">
      <div className={styles.arrival} aria-hidden="true"><span /><IalMark /></div>
      <div className={styles.sceneHeader}><Chapter number="02">THE PROBLEM SPACE</Chapter><h2 id="problem-title">Intelligence should<br />solve <em>real problems.</em></h2><p>A customer asks a simple question. The answer sits across a catalog, a conversation and a person who knows what to do. Useful automation brings those pieces together.</p></div>
      <div className={styles.problemField}><div className={styles.fieldLabel}><span>EVERYDAY OPERATIONS</span><span>Conceptual illustration</span></div>
        <ol className={styles.fragments}>{fragments.map((fragment, index) => <li key={fragment.title} style={{ "--drift-x": `${fragment.x}px`, "--drift-y": `${fragment.y}px`, "--drift-r": `${fragment.rotate}deg` } as CSSProperties}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{fragment.title}</h3><p>{fragment.note}</p></div><i aria-hidden="true" /></li>)}</ol>
        <div className={styles.fieldResolution}><span aria-hidden="true">↳</span> Less fragmentation. More useful context.</div>
      </div>
    </section>
    <section className={`${styles.scene} ${styles.systems}`} data-story-scene="systems" aria-labelledby="systems-title">
      <Chapter number="03">SYSTEMS THAT WORK TOGETHER</Chapter>
      <div className={styles.systemsHeader}><h2 id="systems-title">A signal becomes<br /><em>a useful system.</em></h2><p>Organize information. Apply context. Support a decision. Keep authorization visible before an action proceeds.</p></div>
      <div className={styles.systemDiagram}><div className={styles.systemRail} aria-hidden="true" /><ol>{systemSteps.map((step, index) => <li key={step} className={index === 3 ? styles.humanStep : ""}><span className={styles.systemNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3><p>{["Inputs arrive", "Relevant facts", "A proposed next step", "A person decides", "A bounded outcome"][index]}</p><span className={styles.systemRole}>{index === 3 ? "HUMAN CONTROL" : index === 4 ? "AFTER AUTHORIZATION" : "PROCESSING"}</span></li>)}</ol></div>
      <p className={styles.diagramNote}>A conceptual engineering pattern. Each IAL project has its own implementation; this is not a shared product architecture or a view into model reasoning.</p>
    </section>
    <section className={`${styles.scene} ${styles.control}`} data-story-scene="control" aria-labelledby="control-title">
      <div className={styles.sceneHeader}><Chapter number="04">HUMAN CONTROL</Chapter><h2 id="control-title">The important step<br />is <em>still yours.</em></h2><p>Automation can prepare an action. A clear review boundary lets a person decide whether it should happen.</p><p className={styles.secondaryCopy}>Try both paths. Approval and decline produce different outcomes in this local, fictional example.</p></div>
      <ApprovalDemo />
    </section>
    <section className={`${styles.scene} ${styles.portfolio}`} data-story-scene="work" aria-labelledby="work-title">
      <Chapter number="05">PRODUCTS & LABS</Chapter><div className={styles.portfolioHeader}><h2 id="work-title">Ideas, with<br /><em>something to show.</em></h2><p>One available desktop product. Two independent explorations. Different stages, made clear.</p></div>
      <div className={styles.projectList}>{ialProjects.map(project => <article key={project.name}><span className={styles.projectNumber}>{project.number}</span><div><span className={styles.maturity} data-maturity={project.status}>{project.status}</span><h3>{project.name}</h3><p>{project.detail}</p></div><p className={styles.projectDescription}>{project.description}</p><Link href={project.href} prefetch={false} className={styles.projectLink}>{project.action}<span aria-hidden="true">↗</span></Link></article>)}</div>
    </section>
    <section className={`${styles.scene} ${styles.frontier}`} data-story-scene="frontier" aria-labelledby="frontier-title">
      <Chapter number="06">RESEARCH DIRECTIONS</Chapter><div className={styles.frontierHeader}><h2 id="frontier-title">The horizon<br /><em>stays open.</em></h2><p>Our long-term curiosity reaches beyond business software. These are research directions, not released products or claims of deployed systems.</p></div>
      <div className={styles.researchMap}><svg className={styles.horizon} viewBox="0 0 1000 420" fill="none" aria-hidden="true"><ellipse cx="500" cy="430" rx="480" ry="310" /><ellipse cx="500" cy="430" rx="370" ry="230" /><ellipse cx="500" cy="430" rx="250" ry="155" /><path d="M500 120v270M115 245l385 145 385-145M300 145l200 245 200-245" /><circle cx="500" cy="390" r="5" /></svg><ul>{researchDirections.map((direction, index) => <li key={direction.name}><span className={styles.researchPoint} aria-hidden="true" /><span className={styles.researchIndex}>R / 0{index + 1}</span><h3>{direction.name}</h3><p>{direction.detail}</p></li>)}</ul><div className={styles.horizonCaption}>IDEAS WORTH EXPLORING / NO SHIPPING CLAIM</div></div>
    </section>
    <section className={`${styles.scene} ${styles.invitation}`} data-story-scene="invitation" aria-labelledby="invitation-title">
      <IalMark className={styles.finalMark} /><Chapter number="07">COLLABORATION</Chapter><h2 id="invitation-title">Build what<br /><em>comes next.</em></h2><p>Bring a real problem, a useful question or an engineering idea. Let’s find a thoughtful place to begin.</p><div className={ui.actions}><ActionLink href="/products" kind="primary">Explore Products</ActionLink><ActionLink href="/labs">Visit the Labs</ActionLink><ActionLink href="/contact" kind="text">Contact Indus Automation Labs</ActionLink></div><span className={styles.edition}>INDUS AUTOMATION LABS / IAL 1.0</span>
    </section>
  </div>;
}
