import Link from "next/link";
import { Icon } from "@/components/Icon";
import { oompContent as content } from "@/lib/oomp-content";
import { OompMark } from "./OompMark";
import { OompTypewriter } from "./OompTypewriter";
import styles from "./oomp.module.css";

function MemorySignal() {
  return (
    <figure className={styles.memorySignal}>
      <div className={styles.signalVisual} aria-hidden="true">
        <svg className={styles.signalConnections} viewBox="0 0 1000 240" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="oomp-signal" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" stopOpacity=".08" />
              <stop offset=".5" stopColor="#a78bfa" stopOpacity=".8" />
              <stop offset="1" stopColor="#67e8f9" stopOpacity=".35" />
            </linearGradient>
          </defs>
          <g stroke="url(#oomp-signal)" strokeWidth="1">
            <path d="M210 58H290C345 58 340 120 410 120H475" />
            <path d="M246 120H475" />
            <path d="M210 182H290C345 182 340 120 410 120" />
            <path d="M525 120H710C755 120 750 88 792 88" />
            <path d="M710 120C755 120 750 153 792 153" />
          </g>
          <circle cx="370" cy="114" r="3" fill="#c4b5fd" />
          <circle cx="706" cy="120" r="3" fill="#67e8f9" />
        </svg>
        <div className={styles.signalHistory}>
          <span className={styles.signalLabel}>PERSISTENT HISTORY</span>
          <div className={styles.sourceLine}><span />A project.</div>
          <div className={styles.sourceLine}><span />A preference.</div>
          <div className={styles.sourceLine}><span />A decision.</div>
        </div>
        <div className={styles.signalCore}>
          <div className={styles.coreRing}><OompMark /></div>
          <span>OOMP</span>
          <small>selective recall</small>
        </div>
        <div className={styles.signalPacket}>
          <span className={styles.signalLabel}>FINITE CONTEXT</span>
          <div className={styles.evidencePacket}>
            <span className={styles.packetHeading}><span />Selected evidence</span>
            <div className={styles.packetLines}><i /><i /><i /></div>
            <span className={styles.packetSource}>source-backed · bounded</span>
          </div>
        </div>
      </div>
      <figcaption>Illustrative memory flow <span aria-hidden="true">/</span> Keep the history. Recall what matters.</figcaption>
    </figure>
  );
}

export function OompHero() {
  return (
    <>
      <div className={styles.productBar}>
        <Link href="/labs/oomp" className={styles.productIdentity} aria-label="OOMP overview">
          <OompMark />
          <span>OOMP</span>
          <span className={styles.productExpansion}>{content.expansion}</span>
        </Link>
        <nav aria-label="OOMP page sections" className={styles.productNavigation}>
          {content.navigation.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a href={content.links.license} className={styles.versionLink}>v{content.version}<span> / {content.license}</span></a>
      </div>

      <section id="overview" aria-labelledby="oomp-title" className={styles.hero}>
        <div className={styles.heroAtmosphere} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.status}><span aria-hidden="true" />{content.maturity}</p>
          <OompTypewriter text={content.headline} />
          <div className={styles.heroSupporting}>
            <p className={styles.tagline}>{content.tagline}</p>
            <p className={styles.strapline}>{content.strapline}</p>
            <p className={styles.positioning}>{content.positioning}</p>
            <div className={styles.heroActions}>
              <a href={content.links.github} className={styles.primaryButton}>View on GitHub<Icon name="arrow" className="h-4 w-4" /></a>
              <a href="#get-started" className={styles.secondaryButton}>Get Started<span aria-hidden="true">↗</span></a>
            </div>
            <a href="#architecture" className={styles.architectureLink}>Explore the Architecture<span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <MemorySignal />
        <div className={styles.heroFootnote}><span>BUILT AT INDUS AUTOMATION LABS</span><span>LOCAL-FIRST <i /> PROVIDER-NEUTRAL <i /> SOURCE-BACKED</span></div>
      </section>
    </>
  );
}
