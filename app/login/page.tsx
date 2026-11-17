import { IalPage } from "@/components/ial-v1/IalPage";
import { AccessPreview } from "@/components/ial-v1/company/AccessPreview";
import { companyMetadata } from "@/lib/ial-v1/company";
import styles from "@/components/ial-v1/company/company.module.css";

export const metadata = companyMetadata("Customer access — Coming soon", "The Indus Automation Labs customer portal is a planned access preview. Current AutoChat licensing and activation remain in the desktop application and approved onboarding.", "/login");
export default function LoginPage() { return <IalPage className={styles.accessRoom}><AccessPreview /></IalPage>; }
