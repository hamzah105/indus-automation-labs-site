import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { oompContent as content } from "@/lib/oomp-content";
import { OompScrollStory } from "./OompScrollStory";
import { OompMark } from "./OompMark";
import { OompCodeBlock } from "./OompCodeBlock";
import styles from "./oomp.module.css";

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className={styles.sectionLabel}><span>{number}</span>{children}</p>;
}

export function OompSections() {
  return (
    <>
      <OompScrollStory />

      <section className={styles.section} id="capabilities" aria-labelledby="capabilities-title">
        <div className={styles.sectionHeading}>
          <div><SectionLabel number="04">IN THE CURRENT SOURCE</SectionLabel><h2 id="capabilities-title">Built around evidence.<br />Designed for control.</h2></div>
          <span className={styles.sourceStamp}>v{content.version} <span> / </span> {content.status.badge}</span>
        </div>
        <div className={styles.capabilities}>
          {content.capabilities.map((capability) => (
            <article key={capability.title} className={styles.capability}>
              <Icon name={capability.icon} className={styles.capabilityIcon} />
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <span className={styles.capabilityDetail}>{capability.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.installSection}`} id="get-started" aria-labelledby="install-title">
        <div className={styles.installIntro}>
          <SectionLabel number="05">GET STARTED</SectionLabel>
          <h2 id="install-title">Start local.<br /><span>Inspect the source.</span></h2>
          <p className={styles.sectionIntro}>Install a reviewed source snapshot, then run a small fictional example. Core OOMP needs no TRACE, MongoDB, GPU or answer model.</p>
          <dl className={styles.installFacts}>
            <div><dt>Runtime</dt><dd>Python 3.11 / 3.12</dd></div>
            <div><dt>Storage</dt><dd>SQLite with FTS5</dd></div>
            <div><dt>Distribution</dt><dd>GitHub source</dd></div>
            <div><dt>License</dt><dd><a href={content.links.license}>{content.license} ↗</a></dd></div>
          </dl>
          <a href={content.links.setup} className={styles.textLink}>Read the complete setup guide<Icon name="arrow" className="h-4 w-4" /></a>
        </div>
        <div className={styles.installInstructions}>
          <div className={styles.terminal}>
            <div className={styles.terminalBar}><span><i /><i /><i /></span><span>WINDOWS / POWERSHELL</span><span aria-hidden="true">&gt;_</span></div>
            <div className={styles.terminalContext}><span>01 — INSTALL + VERIFY</span><a href={`${content.links.github}/tree/${content.source.commit}`}>PINNED / {content.source.commit.slice(0, 7)} ↗</a></div>
            <OompCodeBlock commands={content.installation.windows} label="Windows setup commands" />
            <p className={styles.terminalNote}>The checkout is pinned to the source reviewed for this page. The <a href={content.links.quickstart}>fictional quickstart ↗</a> prints an attributed memory and source IDs, reopens the store to verify persistence, then removes its temporary database. It makes no model calls.</p>
          </div>
          <details className={styles.installDetails}>
            <summary>POSIX shell equivalent<span aria-hidden="true">+</span></summary>
            <OompCodeBlock commands={content.installation.posix} label="POSIX setup commands" />
            <p>Shell equivalents are source-based; this website validation did not independently test Linux or macOS installation. See upstream platform coverage. Python 3.12 can be selected instead of 3.11.</p>
          </details>
          <details className={styles.installDetails}>
            <summary>Next: configure local MCP services<span aria-hidden="true">+</span></summary>
            <p>Optional: after the demo, onboarding previews profile configuration and requests approval before creating a database or credentials. Review the setup guide and choose a supported host.</p>
            <OompCodeBlock commands={content.installation.profile} label="Optional Windows profile commands" />
            <p><code>up</code> runs in the foreground; Ctrl+C stops owned services. The last command starts local MCP and Mind processes. It does not host your answer model.</p>
          </details>
          <div className={styles.sourceReferences}>
            <p>For an existing store, follow the <a href={content.links.inspection}>read-only memory inspection guide ↗</a>. It explains source events, derived memories and the separately built object map.</p>
            <p>These commands reproduce <a href={`${content.links.github}/tree/${content.source.commit}`}>{content.source.commit.slice(0, 7)} ↗</a>. The <a href={content.links.latest}>latest main branch ↗</a> moves independently; review its documentation before switching.</p>
            <p>{content.releases.status} <a href={content.releases.url}>Releases ↗</a> · <a href={content.releases.historyUrl}>Source history ↗</a></p>
          </div>
          <p className={styles.installCaveat}>Source installation, not an advertised PyPI release or cloud installer. Read the <a href={content.links.limitations}>current limitations ↗</a> before using personal data.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.visionSection}`} id="research-vision" aria-labelledby="vision-title">
        <div className={styles.visionOrbit} aria-hidden="true"><OompMark /></div>
        <SectionLabel number="06">THE RESEARCH HORIZON</SectionLabel>
        <h2 id="vision-title">{content.research.title}</h2>
        <p>{content.research.description}</p>
        <span className={styles.visionStatus}>{content.research.status}</span>
        <div className={styles.researchGoals}>
          {content.roadmap.map((goal) => <article key={goal.title}>
            <span>{goal.status}</span><h3>{goal.title}</h3><p>{goal.description}</p><a href={goal.evidenceUrl}>Read the research direction ↗</a>
          </article>)}
        </div>
        {content.benchmarkEvidence.length > 0 ? <ul className={styles.benchmarkEvidence}>{content.benchmarkEvidence.map((evidence) => <li key={evidence.url}><a href={evidence.url}>{evidence.title} ↗</a><p>{evidence.testedVersion} · {evidence.conditions}. {evidence.qualification}</p></li>)}</ul> : <p className={styles.evidenceNote}>No benchmark result is presented on this page. These goals describe future evaluation, beyond the implemented capabilities above.</p>}
      </section>

      <section className={`${styles.section} ${styles.finalSection}`} aria-labelledby="final-title">
        <div className={styles.finalTop}>
          <div><p className={styles.sectionLabel}>OPEN SOURCE. OPEN TO EXPLORATION.</p><h2 id="final-title">Give your next session<br /><span>something to build on.</span></h2></div>
          <a href={content.links.github} className={styles.primaryButton}>Explore OOMP on GitHub<Icon name="arrow" className="h-4 w-4" /></a>
        </div>
        <div className={styles.finalLinks}><a href={content.links.docs}>Documentation ↗</a><a href={content.links.limitations}>Limitations ↗</a><a href={content.links.license}>{content.license} ↗</a><span>v{content.version} · {content.status.label}</span></div>
        <details className={styles.limitations}>
          <summary>Understand the current boundaries<span aria-hidden="true">+</span></summary>
          <ul>{content.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
          <a href={content.links.limitations} className={styles.textLink}>Read the upstream limitations<Icon name="arrow" className="h-4 w-4" /></a>
        </details>
      </section>
    </>
  );
}
