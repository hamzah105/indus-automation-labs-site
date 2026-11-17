import { site } from "@/lib/site";
import { inquiryCategories } from "@/lib/ial-v1/company";
import { ActionLink } from "../IalPage";
import { StoryController } from "../home/StoryController";
import { ContactComposer } from "./ContactComposer";
import ui from "../ial-ui.module.css";
import styles from "./company.module.css";

export function ContactExperience() {
  return <>
    <header className={styles.contactIntro}><p className={ui.eyebrow}>CONTACT / SIGNAL TO THE LABORATORY</p><h1>Start a conversation<br /><em>with the lab.</em></h1><p>A product question, a technical detail or a research idea. Give it a clear starting point.</p></header>
    <div className={styles.contactGrid}><section className={styles.contactChannel} aria-labelledby="official-contact-title"><div className={styles.channelSymbol} aria-hidden="true"><svg viewBox="0 0 180 100" fill="none"><path d="M10 50h42l19-26 23 54 22-28h54" /><circle cx="10" cy="50" r="4" /><circle cx="170" cy="50" r="4" /></svg></div><p className={ui.eyebrow}>THE OFFICIAL CHANNEL</p><h2 id="official-contact-title">An email reaches<br />the right place.</h2><a className={styles.emailAddress} href={site.generalContactMailto}>{site.email}</a><p>Email is the support and inquiry channel. The website prepares a draft for your email app; it does not operate a message-submission service.</p><ActionLink href={site.generalContactMailto} kind="primary">Email Indus Automation Labs</ActionLink><div className={styles.contactRoutes} data-ial-story><StoryController />{inquiryCategories.map((item, index) => <article key={item.id} data-story-scene={item.id}><span>0{index + 1}</span><div><h3>{item.label}</h3><p>{item.detail}</p></div></article>)}</div><ActionLink href={site.tutorialUrl} kind="text">AutoChat setup tutorial</ActionLink></section><ContactComposer /></div>
    <div className={styles.contactFootnote}><p>Product details are on <a href="/products/autochat">AutoChat</a>; current launch pricing and licensing are on <a href="/pricing">Pricing</a>. For longer messages or email-client limitations, write directly to the official address.</p><ActionLink href="/privacy" kind="text">Privacy information</ActionLink></div>
  </>;
}
