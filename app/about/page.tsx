import { IalPage } from "@/components/ial-v1/IalPage";
import { AboutJourney } from "@/components/ial-v1/company/AboutJourney";
import { companyMetadata } from "@/lib/ial-v1/company";
import styles from "@/components/ial-v1/company/company.module.css";

export const metadata = companyMetadata("About — The engineering journey", "From practical SME workflows to shipped software and open research. Meet Indus Automation Labs and founder Muhammad Hamza Shoaib.", "/about");
export default function AboutPage() { return <IalPage className={styles.journey}><AboutJourney /></IalPage>; }
