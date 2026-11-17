import { signalChapters, signalFrame } from "@/lib/ial-v1/signal-model";
import styles from "./signal-story.module.css";

export function SignalStage({ chapter }: { chapter?: number }) {
  const compact=chapter!==undefined,frame=signalFrame(chapter ?? 0,compact);
  return <figure className={`${styles.stage} ${compact?styles.compactStage:""}`} data-signal-stage data-signal-phase={frame.active}>
    <figcaption className={styles.stageHeader}><span>THE INTELLIGENCE SIGNAL</span><span>{chapter===undefined?"ONE CONTINUOUS WORLD":`CHAPTER ${signalChapters[chapter].number}`}</span></figcaption>
    <div className={styles.stageHeading} data-signal-heading>{signalChapters[frame.active].heading}</div>
    <svg viewBox={compact?"0 0 380 370":"0 0 710 530"} className={styles.signalCanvas} fill="none" aria-hidden="true">
      <path className={styles.frameCorners} d={compact?"M10 40V10h30M340 10h30v30M370 330v30h-30M40 360H10v-30":"M20 65V20h45M645 20h45v45M690 465v45h-45M65 510H20v-45"} />
      <g className={styles.horizon} data-signal-horizon opacity={frame.horizon}><path d={compact?"M15 330Q190 120 365 330M50 345Q190 230 330 345M90 360l100-190 100 190M190 170v190":"M32 450Q355 140 678 450M90 465Q355 260 620 465M175 485Q355 355 535 485M40 510l315-235 315 235M180 510l175-235 175 235M355 275v235"} /><circle cx={compact?190:355} cy={compact?65:155} r={compact?31:58} /><circle cx={compact?190:355} cy={compact?65:155} r={compact?48:90} strokeDasharray="2 14" /></g>
      <g className={styles.connections} data-signal-connections opacity={frame.connection}>{frame.paths.map((d,i)=><path d={d} data-signal-path={i} key={i} />)}</g>
      <g className={styles.authorization} data-signal-gate opacity={frame.gate}><path d={compact?"M40 242h240":"M435 275v150"} /><text x={compact?300:435} y={compact?248:260} textAnchor="middle">HUMAN</text><text className={styles.waitingStatus} x={compact?190:355} y={compact?355:470} textAnchor="middle">A PERSON DECIDES.</text><text className={styles.approvedStatus} x={compact?190:355} y={compact?355:470} textAnchor="middle">APPROVED / NO MESSAGE SENT</text><text className={styles.declinedStatus} x={compact?190:355} y={compact?355:470} textAnchor="middle">DECLINED / ACTION HELD</text><g className={styles.approvalPacket}><circle cx={compact?143:447} cy={compact?242:350} r="5" /></g></g>
      {frame.nodes.map((node,i)=><g className={styles.signalNode} data-signal-node={i} transform={`translate(${node.x} ${node.y})`} key={i}><rect x={-node.width/2} y={-node.height/2} width={node.width} height={node.height} rx="4" data-signal-box /><text data-signal-label textAnchor="middle" y={node.labelY}><tspan x="0">{node.label[0]}</tspan><tspan x="0" dy="16">{node.label[1]}</tspan></text><text className={styles.nodeMeta} textAnchor="middle" y={node.metaY} data-signal-meta>{node.label[2]}</text></g>)}
      <g className={styles.signalPulse} data-signal-pulse transform={`translate(${frame.pulse.x} ${frame.pulse.y})`} opacity={1-frame.gate}><circle r="12" /><circle r="4" /></g>
      <text x={compact?190:355} y={compact?355:500} textAnchor="middle" className={styles.researchLegend} data-signal-research opacity={frame.horizon}>RESEARCH / NOT RELEASED SYSTEMS</text>
    </svg>
    <p className={styles.stageNote}>An illustrative engineering pattern. Independent projects, each with its own implementation. No model reasoning is shown.</p>
    {chapter===undefined&&<nav className={styles.stageNavigation} aria-label="Intelligence signal chapters">{signalChapters.map((item,i)=><a href={`#${item.id}`} data-signal-jump={i} key={item.id} aria-label={`Chapter ${item.number}: ${item.label}`}><span>{item.number}</span><i aria-hidden="true" /></a>)}</nav>}
  </figure>;
}
