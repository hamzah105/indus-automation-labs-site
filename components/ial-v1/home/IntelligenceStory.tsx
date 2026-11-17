import Link from "next/link";
import { ialProjects,researchDirections } from "@/lib/ial-v1/portfolio";
import { signalChapters } from "@/lib/ial-v1/signal-model";
import { ActionLink } from "../IalPage";
import { ApprovalDemo } from "./ApprovalDemo";
import { SignalController } from "./SignalController";
import { SignalStage } from "./SignalStage";
import styles from "./signal-story.module.css";
import ui from "../ial-ui.module.css";

const fragments=["Customer inquiries","Catalog knowledge","Follow-ups","Supplier decisions","Human approvals"];
const systemSteps=["Information","Context","Decision support","Human authorization","Action"];

function ChapterCopy({index}:{index:number}) {
  if(index===0)return <><h2>Intelligence should<br />solve <em>real problems.</em></h2><p>A customer asks a simple question. The answer sits across a catalog, a conversation and a person who knows what to do. Useful automation brings those pieces together.</p><ul className={styles.fragments}>{fragments.map((label,i)=><li key={label}><span>0{i+1}</span>{label}</li>)}</ul><p className={styles.annotation}>Follow the ultraviolet signal. Separate interactions begin to form a useful path.</p></>;
  if(index===1)return <><h2>A signal becomes<br /><em>a useful system.</em></h2><p>Organize information. Apply context. Support a decision. Keep authorization visible before an action proceeds.</p><ol className={styles.systemSteps}>{systemSteps.map((label,i)=><li key={label}><span>0{i+1}</span><h3>{label}</h3><span aria-hidden="true">{i===4?"↳":"↓"}</span></li>)}</ol><p className={styles.annotation}>A conceptual engineering pattern. Each IAL project has its own implementation; this is not a shared platform or a view into model reasoning.</p></>;
  if(index===2)return <><h2>The important step<br />is <em>still yours.</em></h2><p>Automation can prepare an action. A clear review boundary lets a person decide whether it should happen.</p><p className={styles.annotation}>Scrolling never makes the decision. Try both outcomes in this fictional example.</p><ApprovalDemo /></>;
  if(index===3)return <><h2>Ideas, with<br /><em>something to show.</em></h2><p>One available desktop product. Two independent explorations. Different stages, made clear.</p><div className={styles.projects}>{ialProjects.map(project=><article key={project.name}><span>{project.status}</span><h3>{project.name}</h3><p>{project.description}</p><Link href={project.href} prefetch={false}>{project.action}<span aria-hidden="true"> ↗</span></Link></article>)}</div></>;
  if(index===4)return <><h2>The horizon<br /><em>stays open.</em></h2><p>Our long-term curiosity reaches beyond business software. These are research directions, not released products or claims of deployed systems.</p><ul className={styles.research}>{researchDirections.map((item,i)=><li key={item.name}><span>R / 0{i+1}</span><h3>{item.name}</h3><p>{item.detail}</p></li>)}</ul></>;
  return <><h2>Build what<br /><em>comes next.</em></h2><p>Bring a real problem, a useful question or an engineering idea. Let’s find a thoughtful place to begin.</p><div className={ui.actions}><ActionLink href="/products" kind="primary">Explore Products</ActionLink><ActionLink href="/labs">Visit the Labs</ActionLink><ActionLink href="/contact" kind="text">Contact Indus Automation Labs</ActionLink></div><p className={styles.annotation}>A clear starting point. A useful next step.</p></>;
}

export function IntelligenceStory() {
  return <section className={styles.story} data-ial-story data-signal-story data-approval-outcome="proposed" aria-label="The intelligence signal, an illustrated engineering journey">
    <SignalController />
    <noscript><style>{`[data-shared-signal]{display:none!important}[data-signal-rail]{display:block!important}[data-inline-signal]{display:block!important}[data-signal-story] [data-story-scene]{min-height:0!important}`}</style></noscript>
    <div className={styles.arrival} aria-hidden="true"><svg viewBox="0 0 1000 90" preserveAspectRatio="none"><path d="M500 0v12C500 65 62 8 62 90" /></svg><span>01 → 02 / FOLLOW THE INTELLIGENCE SIGNAL</span></div>
    <div className={styles.rail} data-signal-rail>
      <div className={styles.chapters}>{signalChapters.map((chapter,index)=><article className={styles.chapter} id={chapter.id} data-story-scene={chapter.scene} key={chapter.id} aria-labelledby={`${chapter.scene}-chapter-label`}>
        <p className={styles.chapterLabel} id={`${chapter.scene}-chapter-label`}><span>{chapter.number}</span>{chapter.label}</p><ChapterCopy index={index} /><div className={styles.inlineStage} data-inline-signal><SignalStage chapter={index} /></div>
      </article>)}</div>
      <div className={styles.sharedStage} data-shared-signal><SignalStage /></div>
    </div>
    <div className={styles.resolution}><span aria-hidden="true" /><p>From a field of possibilities<br /><strong>to the next useful system.</strong></p><span>INDUS AUTOMATION LABS / IAL 1.0</span></div>
  </section>;
}
