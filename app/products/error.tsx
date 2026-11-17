"use client";

import Link from "next/link";
import styles from "@/components/ial-v1/ial-v1.module.css";

export default function ProductError({ reset }: { reset: () => void }) {
  return <section className={styles.routeError}><p>INDUS AUTOMATION LABS / PRODUCTS</p><h1>The workspace needs another moment.</h1><p>Try this page again, or use the existing product and support links.</p><div><button onClick={reset}>Try again</button><Link href="/products">Products</Link><Link href="/contact">Contact support</Link></div></section>;
}
