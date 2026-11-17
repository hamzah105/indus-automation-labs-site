import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ialGenesis } from "@/lib/ial-v1/config";
import { IalControls } from "./IalControls";
import { IalTypewriter } from "./IalTypewriter";
import { IalSignal } from "./IalSignal";
import styles from "./ial-v1.module.css";

export function IalMark({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true"><image href="/ial-v1/brand/mark.svg" width="64" height="64" /></svg>;
}

export function IalHero({ withBridge = true }: { withBridge?: boolean }) {
  return <>
    <section className={styles.hero} data-ial-hero data-intro="pending" data-renderer="fallback" aria-labelledby="ial-title">
      <noscript><style>{`[data-ial-hero] [data-ial-type-glyph]{opacity:1!important;animation:none!important}[data-ial-hero] [data-ial-type-glyph]::after{display:none!important}[data-ial-hero] [data-ial-fallback]{opacity:1!important;animation:none!important}[data-ial-hero] [data-ial-message]{opacity:1!important;animation:none!important}[data-ial-hero] [data-ial-caret]{display:none!important}`}</style></noscript>
      <span className={styles.introClock} data-ial-clock aria-hidden="true" />
      <div className={styles.heroTop}><IalControls /></div>
      <figure className={styles.galaxy} aria-label="An original stellar formation spelling 1.0, with an angled one, a bright decimal cluster and an elliptical spiral zero.">
        <picture className={styles.fallback} data-ial-fallback><source media="(max-width: 767px)" srcSet="/ial-v1/galaxy-mobile.webp" /><img src="/ial-v1/galaxy-desktop.webp" width="1440" height="560" alt="" fetchPriority="high" /></picture>
        <canvas className={styles.canvas} data-ial-canvas aria-hidden="true" />
        <span className={styles.leftCoordinate} aria-hidden="true">01 / THE GENESIS</span>
        <span className={styles.rightCoordinate} aria-hidden="true">IDEAS INTO SYSTEMS</span>
        <figcaption className={styles.srOnly}>IAL 1.0 is the website’s new creative identity, not a product release number.</figcaption>
      </figure>
      <div className={styles.message}>
        <IalTypewriter text={ialGenesis.title} />
        <p className={styles.tagline} data-ial-message>{ialGenesis.tagline}</p>
        <p className={styles.description}>{ialGenesis.description}</p>
        <div className={styles.actions}><Link href="/products" className={styles.primary} data-ial-primary>Explore Our Work<Icon name="arrow" className="h-4 w-4" /></Link><Link href="/labs" className={styles.secondary}>Enter the Labs<Icon name="arrow" className="h-4 w-4" /></Link></div>
        <Link href="/products/autochat" className={styles.autochat}>Available today<span aria-hidden="true"> / </span><span>AutoChat for Windows</span><span aria-hidden="true"> ↗</span></Link>
      </div>
      <div className={styles.heroBottom}><span>SOFTWARE / INTELLIGENCE / ENGINEERING</span><a href="#ial-work">Follow the signal<span aria-hidden="true"> ↓</span></a><span>IAL 1.0 / WEBSITE EDITION</span></div>
    </section>
    {withBridge && <section className={styles.bridge} id="ial-work" data-ial-section aria-labelledby="ial-work-title">
      <IalSignal />
      <div className={styles.signalTrack} aria-hidden="true"><i /><IalMark /></div>
      <div className={styles.bridgeCopy}><p className={styles.eyebrow}>01 / FROM POSSIBILITY TO PRACTICE</p><h2 id="ial-work-title">Intelligence means more<br />when it <span>works in the real world.</span></h2><p>Our work begins with practical software. AutoChat is our available Windows product. OOMP explores persistent AI memory; MatterFlux experiments with interaction. Robotics and edge intelligence remain future research directions.</p><div className={styles.bridgeLinks}><Link href="/products/autochat">AutoChat <span>Available</span></Link><Link href="/labs/oomp">OOMP <span>Alpha research</span></Link><Link href="/labs/matterflux">MatterFlux <span>Experimental</span></Link></div></div>
    </section>}
  </>;
}
