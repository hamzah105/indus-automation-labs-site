import { IalPage } from "@/components/ial-v1/IalPage";
import { PricingExperience } from "@/components/ial-v1/company/PricingExperience";
import { companyMetadata } from "@/lib/ial-v1/company";
import styles from "@/components/ial-v1/company/licensing.module.css";

export const metadata = companyMetadata("Pricing — Transparent access", "AutoChat launch licensing: PKR 20,000 regular price, NEWCOM at 50% off, PKR 10,000 promotional price. Licensing is handled in the desktop app and approved onboarding.", "/pricing");
export default function PricingPage() { return <IalPage className={styles.licensing}><PricingExperience /></IalPage>; }
