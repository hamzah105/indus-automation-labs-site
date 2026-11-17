import { signalChapters,signalFrame } from "./signal-model";

/** Bounded sticky SVG stage; only native scroll/resize asks for a frame. */
export function mountSignalStory(root:HTMLElement) {
  const rail=root.querySelector<HTMLElement>("[data-signal-rail]"),stage=root.querySelector<HTMLElement>("[data-shared-signal] [data-signal-stage]");
  const chapters=[...root.querySelectorAll<HTMLElement>("[data-story-scene]")];
  if(!rail||!stage||chapters.length!==6)return()=>{};
  const desktop=matchMedia("(min-width: 1024px)"),reduced=matchMedia("(prefers-reduced-motion: reduce)");
  const nodes=[...stage.querySelectorAll<SVGGElement>("[data-signal-node]")],paths=[...stage.querySelectorAll<SVGPathElement>("[data-signal-path]")],links=[...stage.querySelectorAll<HTMLAnchorElement>("[data-signal-jump]")];
  let frame=0,visible=false,listening=false,disposed=false,active=-1,centres:number[]=[];
  const stop=()=>{if(frame)cancelAnimationFrame(frame);frame=0;};
  function measure(){const top=rail!.getBoundingClientRect().top;centres=chapters.map(e=>{const r=e.getBoundingClientRect();return r.top-top+r.height*.5;});}
  function paint(){
    frame=0;if(disposed||!listening)return;
    const point=innerHeight*.48-rail!.getBoundingClientRect().top;
    let index=0;for(let i=1;i<centres.length;i++)if(point>=centres[i])index=i;
    const position=point<=centres[0]?0:index===5?5:index+Math.min(1,Math.max(0,(point-centres[index])/(centres[index+1]-centres[index])));
    const f=signalFrame(position);
    root.style.setProperty("--signal-progress",f.progress.toFixed(4));root.dataset.signalPosition=f.position.toFixed(4);
    nodes.forEach((node,i)=>{const v=f.nodes[i];node.setAttribute("transform",`translate(${v.x.toFixed(2)} ${v.y.toFixed(2)})`);const box=node.querySelector("[data-signal-box]")!;box.setAttribute("x",String(-v.width/2));box.setAttribute("y",String(-v.height/2));box.setAttribute("width",String(v.width));box.setAttribute("height",String(v.height));});
    paths.forEach((p,i)=>p.setAttribute("d",f.paths[i]));
    stage!.querySelector("[data-signal-connections]")!.setAttribute("opacity",String(f.connection));stage!.querySelector("[data-signal-gate]")!.setAttribute("opacity",String(f.gate));stage!.querySelector("[data-signal-horizon]")!.setAttribute("opacity",String(f.horizon));stage!.querySelector("[data-signal-research]")!.setAttribute("opacity",String(f.horizon));
    const pulse=stage!.querySelector("[data-signal-pulse]")!;pulse.setAttribute("transform",`translate(${f.pulse.x.toFixed(2)} ${f.pulse.y.toFixed(2)})`);pulse.setAttribute("opacity",String(1-f.gate));
    if(active!==f.active){
      active=f.active;stage!.dataset.signalPhase=String(active);root.dataset.currentScene=signalChapters[active].scene;
      stage!.querySelector("[data-signal-heading]")!.textContent=signalChapters[active].heading;
      nodes.forEach((node,i)=>{const v=f.nodes[i],label=node.querySelector("[data-signal-label]")!,spans=label.querySelectorAll("tspan"),meta=node.querySelector("[data-signal-meta]")!;spans[0].textContent=v.label[0];spans[1].textContent=v.label[1];label.setAttribute("y",String(v.labelY));meta.textContent=v.label[2];meta.setAttribute("y",String(v.metaY));});
      chapters.forEach((e,i)=>{e.dataset.active=String(i===active);});links.forEach((e,i)=>{if(i===active)e.setAttribute("aria-current","step");else e.removeAttribute("aria-current");});
    }
  }
  function schedule(){if(listening&&!frame)frame=requestAnimationFrame(paint);}
  function sync(){
    const enhanced=desktop.matches&&!reduced.matches;root.dataset.signalLayout=enhanced?"sticky":"stacked";
    const next=enhanced&&visible&&!document.hidden;
    if(next&&!listening){listening=true;measure();window.addEventListener("scroll",schedule,{passive:true});schedule();}
    else if(!next&&listening){listening=false;window.removeEventListener("scroll",schedule);stop();}
    if(!enhanced){active=-1;chapters.forEach(e=>delete e.dataset.active);links.forEach(e=>e.removeAttribute("aria-current"));}
    root.dataset.signalMotion=listening?"observing-scroll":"idle";
  }
  function resize(){if(!disposed){measure();sync();schedule();}}
  const observer=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);sync();});observer.observe(rail);
  const size=new ResizeObserver(resize);size.observe(rail);
  desktop.addEventListener("change",resize);reduced.addEventListener("change",resize);document.addEventListener("visibilitychange",sync);window.addEventListener("resize",resize,{passive:true});window.addEventListener("pageshow",resize);
  void document.fonts.ready.then(()=>{if(!disposed)resize();});root.dataset.signalEnhanced="true";resize();
  return()=>{disposed=true;stop();observer.disconnect();size.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",resize);window.removeEventListener("pageshow",resize);desktop.removeEventListener("change",resize);reduced.removeEventListener("change",resize);document.removeEventListener("visibilitychange",sync);};
}
