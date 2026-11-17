"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import styles from "./licensing.module.css";

const steps = [
  { title: "Download", detail: "Get AutoChat from Microsoft Store or the official Windows installer.", note: "Start with the official desktop build." },
  { title: "License", detail: "Install the app and open its License section.", note: "The licensing area is inside AutoChat, not this website." },
  { title: "Voucher", detail: "Enter NEWCOM for the current 50% launch offer.", note: "Use the existing voucher in the in-app licensing flow." },
  { title: "Activation", detail: "Complete the in-app process or contact support for approved onboarding assistance.", note: "This website does not process a payment or activate a license." }
];

export function LicenseJourney() {
  const [active, setActive] = useState(0);
  return <div className={styles.licenseJourney} data-license-journey data-step={active}>
    <ol>{steps.map((step, index) => <li key={step.title} data-selected={active === index}><span className={styles.routeNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p><button type="button" aria-pressed={active === index} onClick={() => setActive(index)}>Inspect {step.title.toLowerCase()}<span aria-hidden="true"> ↗</span></button></li>)}</ol>
    <div className={styles.journeyNote} role="status"><span>STEP 0{active + 1}</span><p>{steps[active].note}</p></div>
    <a className={styles.supportLink} href={site.newcomVoucherMailto}>Ask about licensing <span aria-hidden="true">↗</span></a>
    <noscript><style>{`[data-license-journey] button,[data-license-journey] [role="status"]{display:none!important}`}</style></noscript>
  </div>;
}
