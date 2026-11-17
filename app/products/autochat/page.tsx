import type { Metadata } from "next";
import { IalPage } from "@/components/ial-v1/IalPage";
import { AutoChatExperience } from "@/components/ial-v1/autochat/AutoChatExperience";
import styles from "@/components/ial-v1/autochat/operations.module.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AutoChat — From inquiry to controlled action",
  description: `Explore AutoChat v${site.autochatVersion}, Windows desktop business messaging software. Follow a fictional approval-mode workflow and find official downloads, setup resources and support.`,
  alternates: { canonical: "/products/autochat" },
  openGraph: { title: "AutoChat — From inquiry to controlled action", description: "A Windows desktop workspace for business messaging, useful context and operator choice.", url: `${site.url}/products/autochat`, images: [{ url: `${site.url}/ial-v1/autochat-og.png`, width: 1200, height: 630, alt: "AutoChat — An inquiry, a draft and a human approval boundary." }] },
  twitter: { card: "summary_large_image", title: "AutoChat — Controlled business messaging", images: [`${site.url}/ial-v1/autochat-og.png`] }
};

export default function AutoChatPage() {
  return <IalPage className={styles.operations}><AutoChatExperience /></IalPage>;
}
