import type { Metadata } from "next";
import { IalPage } from "@/components/ial-v1/IalPage";
import { ProductsExhibition } from "@/components/ial-v1/products/ProductsExhibition";
import styles from "@/components/ial-v1/products/exhibition.module.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products — Engineering that becomes useful",
  description: "Explore AutoChat for Windows, open-source alpha memory research with OOMP, and the experimental MatterFlux interaction library. Availability made clear.",
  alternates: { canonical: "/products" },
  openGraph: { title: "Engineering that becomes useful — IAL Products", description: "Available software and independent lab experiments, with their maturity made clear.", url: `${site.url}/products`, images: [{ url: `${site.url}/ial-v1/products-og.png`, width: 1200, height: 630, alt: "IAL product exhibition — Engineering that becomes useful." }] },
  twitter: { card: "summary_large_image", title: "IAL Products", images: [`${site.url}/ial-v1/products-og.png`] }
};

export default function ProductsPage() {
  return <IalPage className={styles.exhibition}><ProductsExhibition /></IalPage>;
}
