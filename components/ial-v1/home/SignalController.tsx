"use client";
import { useEffect,useRef } from "react";

export function SignalController() {
  const marker=useRef<HTMLSpanElement>(null);
  useEffect(()=>{
    const root=marker.current?.closest<HTMLElement>("[data-signal-story]");if(!root)return;
    let cancelled=false,started=false,dispose:(()=>void)|undefined;
    const near=new IntersectionObserver(entries=>{
      if(started||!entries.some(e=>e.isIntersecting))return;started=true;near.disconnect();
      import("@/lib/ial-v1/signal-motion").then(m=>{if(!cancelled)dispose=m.mountSignalStory(root);}).catch(()=>{root.dataset.signalEnhanced="false";});
    },{rootMargin:"200px"});near.observe(root);
    return()=>{cancelled=true;near.disconnect();dispose?.();};
  },[]);
  return <span hidden ref={marker} aria-hidden="true" />;
}
