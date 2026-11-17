import { site } from "@/lib/site";
import { ActionLink } from "../IalPage";
import { IalMark } from "../IalHero";
import ui from "../ial-ui.module.css";
import styles from "./company.module.css";

export function AccessPreview() {
  return <section className={styles.accessGrid} aria-labelledby="access-title"><div><p className={ui.eyebrow}>CUSTOMER ACCESS / COMING SOON</p><h1 id="access-title">A gateway to<br /><em>what comes next.</em></h1><p className={styles.lead}>The customer portal is not open yet. This is an access preview, with no website sign-in or account authentication.</p><p className={styles.accessLicensing}>Current licensing and activation are handled through the AutoChat desktop app License section and approved onboarding.</p><div className={ui.actions}><ActionLink href={site.releaseUrl} kind="primary">Download AutoChat v{site.autochatVersion}</ActionLink><ActionLink href={site.generalContactMailto}>Contact Support</ActionLink></div></div><div className={styles.accessPlate}><div className={styles.accessPlateHeader}><span>IAL / ACCESS PREVIEW</span><span>COMING SOON</span></div><div className={styles.accessGeometry} aria-hidden="true"><i /><IalMark /><i /></div><h2>Space for a future<br />customer workspace.</h2><p>Planned functions. They are not available on this website today.</p><dl><div><dt>Approved customer access</dt><dd>Planned</dd></div><div><dt>License and account overview</dt><dd>Planned</dd></div><div><dt>Support resources</dt><dd>Planned</dd></div></dl><div className={styles.accessStatus}><span aria-hidden="true">◇</span> No account fields. No credentials requested.</div></div></section>;
}
