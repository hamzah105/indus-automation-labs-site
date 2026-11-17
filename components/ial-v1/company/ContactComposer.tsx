"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { inquiryCategories } from "@/lib/ial-v1/company";
import styles from "./company.module.css";

export function ContactComposer() {
  const [category, setCategory] = useState<typeof inquiryCategories[number]["id"]>("product");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const selected = inquiryCategories.find(item => item.id === category)!;
  const body = `${name.trim() ? `Name: ${name.trim()}\n\n` : ""}${message.trim() || "Hello Indus Automation Labs,\n\nI would like to ask about " + selected.label.toLowerCase() + "."}`;
  const href = `mailto:${site.email}?subject=${encodeURIComponent(selected.subject)}&body=${encodeURIComponent(body)}`;
  return <section className={styles.composer} aria-labelledby="compose-title" data-contact-composer>
    <div className={styles.composerTop}><span>EMAIL / PREPARE A DRAFT</span><span>User initiated</span></div><h2 id="compose-title">A useful conversation<br />starts with context.</h2>
    <fieldset><legend>What brings you here?</legend><div className={styles.categoryChoices}>{inquiryCategories.map(item => <label key={item.id}><input type="radio" name="inquiry-category" value={item.id} checked={category === item.id} onChange={() => setCategory(item.id)} /><span>{item.label}</span></label>)}</div></fieldset>
    <label className={styles.composeField} htmlFor="inquiry-name">Your name <span>(optional)</span><input id="inquiry-name" autoComplete="name" value={name} maxLength={80} onChange={event => setName(event.target.value)} /></label>
    <label className={styles.composeField} htmlFor="inquiry-message">Your message <span>(optional)</span><textarea id="inquiry-message" rows={5} value={message} maxLength={1200} onChange={event => setMessage(event.target.value)} placeholder="Describe the question, setup or idea you’d like to discuss." /></label>
    <div className={styles.emailPreview}><span>TO</span><strong>{site.email}</strong><span>SUBJECT</span><p>{selected.subject}</p></div>
    <a href={href} className={styles.openDraft} data-email-draft>Open draft in your email app <span aria-hidden="true">↗</span></a><p className={styles.mailExplanation}>Review and send in your email app. This page does not send or store your message. You can also email the address directly.</p>
    <noscript><style>{`[data-contact-composer]{display:none!important}`}</style></noscript>
  </section>;
}
