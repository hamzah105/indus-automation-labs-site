import { IalPage } from "@/components/ial-v1/IalPage";
import { ContactExperience } from "@/components/ial-v1/company/ContactExperience";
import { companyMetadata } from "@/lib/ial-v1/company";
import styles from "@/components/ial-v1/company/company.module.css";

export const metadata = companyMetadata("Contact — Start a conversation", "Contact Indus Automation Labs at support@indusautomationlabs.com for product support, technical inquiries and research collaboration. Prepare an email in your own email app.", "/contact");
export default function ContactPage() { return <IalPage className={styles.signalRoom}><ContactExperience /></IalPage>; }
