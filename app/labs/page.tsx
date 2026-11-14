import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { OompMark } from "@/components/oomp/OompMark";
import { labsInter, labsSpaceGrotesk } from "@/lib/labs-fonts";
import { oompContent } from "@/lib/oomp-content";
import { site } from "@/lib/site";
import styles from "./labs.module.css";

const title = "Labs — Tools for what comes next";
const description = "Explore MatterFlux, an experimental UI interaction library, and OOMP, a local-first alpha memory engine for AI applications. Built at Indus Automation Labs.";
const canonical = `${site.url}/labs`;

export const metadata: Metadata = {
  title, description,
  alternates: { canonical },
  openGraph: { type: "website", title, description, siteName: site.name, url: canonical, images: [{ url: `${site.url}/labs/og.png`, width: 1200, height: 630, alt: "Indus Automation Labs. MatterFlux: interface experiments. OOMP: persistent memory research." }] },
  twitter: { card: "summary_large_image", title, description, images: [`${site.url}/labs/og.png`] }
};

function MemoryGraphic() {
  return <div className={styles.memoryGraphic} aria-hidden="true">
    <svg viewBox="0 0 480 330" fill="none">
      <ellipse cx="240" cy="165" rx="164" ry="112" stroke="#a274d2" strokeOpacity=".15" />
      <path d="M240 165 100 86M240 165 376 75M240 165 90 251M240 165 371 250M100 86 90 251M376 75 371 250" stroke="#a87ed4" strokeOpacity=".55" />
      <path d="M90 251 165 295M371 250 306 295" stroke="#78b7cc" strokeOpacity=".5" />
      <g fill="#181123" stroke="#9a70be"><rect x="58" y="62" width="84" height="48" rx="8" /><rect x="334" y="51" width="84" height="48" rx="8" /><rect x="48" y="227" width="84" height="48" rx="8" /><rect x="329" y="226" width="84" height="48" rx="8" /></g>
      <g fill="#101c27" stroke="#6596aa"><rect x="139" y="282" width="52" height="25" rx="5" /><rect x="280" y="282" width="52" height="25" rx="5" /></g>
      <g fill="#d5b8f0" fontFamily="monospace" fontSize="10" textAnchor="middle"><text x="100" y="90">PROJECT</text><text x="376" y="79">PREFERENCE</text><text x="90" y="255">PLAN</text><text x="371" y="254">EPISODE</text></g>
      <g fill="#a4cddd" fontFamily="monospace" fontSize="8" textAnchor="middle"><text x="165" y="298">SOURCE</text><text x="306" y="298">SOURCE</text></g>
      <circle cx="240" cy="165" r="48" fill="#20132e" stroke="#a574d2" /><circle cx="240" cy="165" r="61" stroke="#9566bf" strokeOpacity=".2" />
    </svg>
    <OompMark className={styles.memoryMark} />
    <span className={styles.graphCaption}>PERSISTENT HISTORY / SELECTIVE RECALL</span>
  </div>;
}

function FluxGraphic() {
  return <div className={styles.fluxGraphic} aria-hidden="true">
    <div className={styles.fluxOrbit} />
    <div className={styles.fluxWindow}>
      <div className={styles.windowTop}><span /><span /><span /><code>INTERACTION / 001</code></div>
      <div className={styles.fluxTarget}><span className={styles.fluxSpark}>✳</span><span>Action becomes<br /><strong>an experience.</strong></span></div>
      <div className={styles.fluxProgress}><span /></div>
      <p>INTENT<span>→</span>TRANSITION<span>→</span>RESOLVE</p>
    </div>
    <span className={styles.fluxCoordinate}>x: interface<br />y: possibility</span>
  </div>;
}

export default function LabsPage() {
  return <main className={`${styles.page} ${labsInter.variable} ${labsSpaceGrotesk.variable}`}>
    <div className={styles.intro}>
      <p className={styles.eyebrow}><span />INDUS AUTOMATION LABS / EXPLORATIONS</p>
      <div className={styles.introColumns}><h1>Tools for<br /><span>what comes next.</span></h1><div><p>A place for working ideas. Explore the interfaces we experiment with and the memory systems we’re researching.</p><span className={styles.projectCount}>02 PROJECTS / OPEN TO EXPLORATION</span></div></div>
    </div>
    <div className={styles.projects}>
      <article className={`${styles.project} ${styles.fluxProject}`} aria-labelledby="matterflux-title">
        <div className={styles.projectCopy}><p className={styles.projectNumber}>01 <span>INTERFACE EXPERIMENTS</span></p><span className={styles.status}>Experimental library</span><h2 id="matterflux-title">MatterFlux<span>Interaction, with intent.</span></h2><p>An experimental UI interaction library that turns actions into expressive visual transitions. Try the demos, explore the source, and download the package.</p><Link href="/labs/matterflux" className={styles.projectLink}>Explore MatterFlux<Icon name="arrow" className="h-4 w-4" /></Link><span className={styles.projectFootnote}>UI INTERACTIONS / LIVE DEMOS</span></div>
        <FluxGraphic />
      </article>
      <article className={`${styles.project} ${styles.memoryProject}`} aria-labelledby="oomp-title">
        <MemoryGraphic />
        <div className={styles.projectCopy}><p className={styles.projectNumber}>02 <span>MEMORY RESEARCH</span></p><span className={styles.status}>{oompContent.maturity}</span><h2 id="oomp-title">OOMP<span>{oompContent.tagline}</span></h2><p className={styles.expansion}>{oompContent.expansion}</p><p>A local-first memory engine for AI applications. Keep a durable, source-backed history and select the evidence an AI host needs for its finite prompt.</p><Link href="/labs/oomp" className={styles.projectLink}>Discover OOMP<Icon name="arrow" className="h-4 w-4" /></Link><span className={styles.projectFootnote}>PERSISTENT HISTORY / SELECTIVE RECALL / FINITE PROMPTS</span></div>
      </article>
    </div>
    <div className={styles.closing}><span className={styles.closingMark}>IA / LABS</span><p>Built to explore.<br /><span>Shared so you can look closer.</span></p><Link href="/about">About the lab<Icon name="arrow" className="h-4 w-4" /></Link></div>
  </main>;
}
