/** Original IAL signal storyboard. Five retained elements change their roles;
 * this is an illustration, not a unified product or a model's private reasoning. */
export const signalChapters = [
  { id: "ial-work", scene: "problem", number: "02", label: "Fragmented operations", heading: "A signal finds the scattered pieces." },
  { id: "ial-systems", scene: "systems", number: "03", label: "Intelligence architecture", heading: "Information becomes a useful path." },
  { id: "ial-control", scene: "control", number: "04", label: "Human control", heading: "The signal reaches a human boundary." },
  { id: "ial-portfolio", scene: "work", number: "05", label: "Engineering portfolio", heading: "One direction. Three independent projects." },
  { id: "ial-frontier", scene: "frontier", number: "06", label: "The next frontier", heading: "The path opens into research." },
  { id: "ial-collaboration", scene: "invitation", number: "07", label: "Collaboration", heading: "A useful question starts the next chapter." }
] as const;

type Point = readonly [number, number];
const positions: readonly (readonly Point[])[] = [
  [[110, 115], [410, 95], [585, 265], [345, 410], [100, 340]],
  [[100, 125], [355, 125], [610, 125], [610, 350], [290, 350]],
  [[100, 125], [355, 125], [610, 125], [610, 350], [290, 350]],
  [[105, 260], [445, 115], [445, 260], [445, 405], [640, 260]],
  [[115, 365], [230, 220], [355, 155], [485, 225], [600, 365]],
  [[355, 105], [355, 190], [355, 275], [355, 360], [355, 445]]
];
const compactPositions: readonly (readonly Point[])[] = [
  [[75,60],[265,60],[285,180],[180,290],[70,200]],
  [[85,60],[290,60],[290,180],[85,180],[190,305]],
  [[85,60],[290,60],[290,180],[85,180],[190,305]],
  [[40,180],[230,65],[230,180],[230,295],[355,180]],
  [[85,280],[80,155],[190,65],[300,155],[295,280]],
  [[190,35],[190,105],[190,175],[190,245],[190,315]]
];
const labels = [
  [["Customer", "inquiries", "MESSAGE"], ["Catalog", "knowledge", "INFORMATION"], ["Follow-ups", "", "CONVERSATION"], ["Human", "approvals", "DECISION"], ["Supplier", "decisions", "COORDINATION"]],
  [["Information", "", "INPUT"], ["Context", "", "RELEVANT FACTS"], ["Decision", "support", "PROPOSAL"], ["Human", "authorization", "A PERSON DECIDES"], ["Action", "", "BOUNDED OUTCOME"]],
  [["Information", "", "INPUT"], ["Context", "", "RELEVANT FACTS"], ["Proposed", "action", "REVIEW FIRST"], ["Human", "authorization", "YOUR DECISION"], ["Action", "", "AFTER APPROVAL"]],
  [["", "", ""], ["AutoChat", "", "AVAILABLE / WINDOWS"], ["OOMP", "", "ALPHA MEMORY RESEARCH"], ["MatterFlux", "", "EXPERIMENTAL TOOL"], ["", "", ""]],
  [["Local / edge AI", "", "RESEARCH"], ["Intelligent agents", "", "RESEARCH"], ["Computer vision", "", "RESEARCH"], ["Robotics", "", "RESEARCH"], ["World models", "Spatial intelligence", "RESEARCH"]],
  [["A real problem", "", "START HERE"], ["Useful context", "", "UNDERSTAND"], ["A conversation", "", "WITH THE LAB"], ["Engineering", "", "EXPLORE"], ["What comes next", "", "BUILD CAREFULLY"]]
] as const;
const pulse: readonly Point[] = [[110,115],[290,350],[447,350],[105,260],[355,155],[355,445]];
const compactPulse: readonly Point[] = [[75,60],[190,305],[143,242],[40,180],[190,65],[190,315]];
const linearEdges = [[0,1],[1,2],[2,3],[3,4]];
const branchEdges = [[0,1],[0,2],[0,3],[0,4]];
const clamp = (x: number) => Math.max(0, Math.min(1, x));
const mix = (a: number,b: number,t: number) => a + (b-a)*t;
function size(phase: number,index: number,compact:boolean): Point {
  if (phase === 3) return index === 0 || index === 4 ? [12,12] : [compact?190:220,82];
  if (phase === 4) return [7,7];
  if (phase === 5) return [compact?175:190,48];
  return phase === 0 ? [compact?128:145,83] : [compact?128:116,84];
}
export function signalFrame(position: number,compact=false) {
  const poses=compact?compactPositions:positions,signal=compact?compactPulse:pulse;
  const p = Math.max(0,Math.min(5,position)),from=Math.min(4,Math.floor(p)),to=from+1;
  const raw=p-from,t=raw*raw*(3-2*raw),active=Math.round(p);
  const nodes=poses[from].map((point,index)=>{
    const next=poses[to][index],a=size(from,index,compact),b=size(to,index,compact);
    return {x:mix(point[0],next[0],t),y:mix(point[1],next[1],t),width:mix(a[0],b[0],t),height:mix(a[1],b[1],t),label:labels[active][index],labelY:active===4?-34:-7,metaY:active===4?27:active===5?15:28};
  });
  const paths=linearEdges.map((_,index)=>{
    const e1=(from===3?branchEdges:linearEdges)[index],e2=(to===3?branchEdges:linearEdges)[index];
    const start=poses[from][e1[0]],end=poses[from][e1[1]],nextStart=poses[to][e2[0]],nextEnd=poses[to][e2[1]];
    const x1=mix(start[0],nextStart[0],t),y1=mix(start[1],nextStart[1],t),x2=mix(end[0],nextEnd[0],t),y2=mix(end[1],nextEnd[1],t);
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} C${mix(x1,x2,.45).toFixed(2)} ${y1.toFixed(2)} ${mix(x1,x2,.55).toFixed(2)} ${y2.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  });
  const weight=(phase:number)=>clamp(1-Math.abs(p-phase));
  return {position:p,active,nodes,paths,gate:weight(2),horizon:weight(4),branch:weight(3),connection:mix(from===0?.18:1,to===0?.18:1,t),pulse:{x:mix(signal[from][0],signal[to][0],t),y:mix(signal[from][1],signal[to][1],t)-Math.sin(Math.PI*t)*22},progress:p/5};
}
