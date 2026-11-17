import type { ReactNode } from "react";
import { IalPage } from "@/components/ial-v1/IalPage";
import styles from "@/components/ial-v1/company/policy.module.css";

type PolicyLayoutProps = {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
};

export function PolicyLayout({ title, lastUpdated = "July 2026", children }: PolicyLayoutProps) {
  return (
    <IalPage className={styles.legal}>
      <article className={styles.document}>
        <header><p>Last updated: {lastUpdated}</p>
        <h1>{title}</h1></header>
        <div className={styles.copy} data-policy-copy>
          {children}
        </div>
      </article>
    </IalPage>
  );
}
