"use client";

import Link from "next/link";
import styles from "@/components/ial-v1/ial-v1.module.css";

// Homepage-only boundary. Never reload automatically or change protected routes.
export default function GenesisError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className={styles.routeError} role="alert">
    <p>INDUS AUTOMATION LABS</p><h1>The stars can wait.</h1>
    <p>The homepage couldn’t load. You can retry or continue directly to our work.</p>
    <div><button type="button" onClick={reset}>Try again</button><Link href="/products">Explore our work</Link><Link href="/labs">Enter the Labs</Link></div>
  </section>;
}
