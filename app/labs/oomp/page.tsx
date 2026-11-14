import type { Metadata } from "next";
import { OompHero } from "@/components/oomp/OompHero";
import { OompSections } from "@/components/oomp/OompSections";
import { oompContent as content } from "@/lib/oomp-content";
import { labsInter, labsSpaceGrotesk } from "@/lib/labs-fonts";
import { site } from "@/lib/site";
import styles from "@/components/oomp/oomp.module.css";

export const metadata: Metadata = {
  title: "OOMP — Memory beyond the context window",
  description: content.description,
  alternates: { canonical: content.canonical },
  openGraph: {
    type: "website",
    siteName: "Indus Automation Labs",
    title: "Introducing OOMP — Memory beyond the context window",
    description: content.description,
    url: content.canonical,
    images: [{ url: `${site.url}/oomp/og.png`, width: 1200, height: 630, alt: "Introducing OOMP. Memory beyond the context window. Open-source alpha research by Indus Automation Labs." }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Introducing OOMP — Memory beyond the context window",
    description: content.description,
    images: [`${site.url}/oomp/og.png`]
  }
};

export default function OompPage() {
  return (
    <main className={`${styles.page} ${labsInter.variable} ${labsSpaceGrotesk.variable}`}>
      <OompHero />
      <OompSections />
    </main>
  );
}
