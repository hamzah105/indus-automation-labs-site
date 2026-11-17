import type { Metadata } from "next";
import { IalHero } from "@/components/ial-v1/IalHero";
import { IalPage } from "@/components/ial-v1/IalPage";
import { IntelligenceStory } from "@/components/ial-v1/home/IntelligenceStory";
import { MotionPreference } from "@/components/ial-v1/home/MotionPreference";
import styles from "@/components/ial-v1/ial-v1.module.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "IAL 1.0 — Building intelligence for the real world",
  description: "Explore the Indus Automation Labs universe: practical automation, human-controlled systems, available software and open engineering research.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Introducing IAL 1.0 — Indus Automation Labs",
    description: "From a galaxy of possibilities to useful, human-controlled systems. Explore our products, labs and research directions.",
    url: site.url,
    images: [{ url: `${site.url}/ial-v1/og.png`, width: 1200, height: 630, alt: "An original violet galaxy forming 1.0 — Indus Automation Labs." }]
  },
  twitter: { card: "summary_large_image", title: "Introducing IAL 1.0", description: "Building intelligence for the real world.", images: [`${site.url}/ial-v1/og.png`] }
};

export default function HomePage() {
  return <IalPage className={styles.home}><IalHero withBridge={false} /><MotionPreference /><IntelligenceStory /></IalPage>;
}
