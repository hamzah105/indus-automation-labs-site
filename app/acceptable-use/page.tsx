import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description: "Acceptable Use Policy for Indus Automation Labs website, software, and automation services.",
  openGraph: {
    title: "Acceptable Use Policy",
    description: "Rules prohibiting spam, fraud, harmful automation, privacy violations, and platform abuse."
  }
};

const prohibited = [
  "Spam or unsolicited bulk messaging",
  "Harassment, threats, or abusive communication",
  "Fraud, scams, deceptive automation, or fake offers",
  "Impersonation, phishing, or identity misuse",
  "Malware, credential theft, or harmful code",
  "Scraping abuse or unauthorized data collection",
  "Fake reviews, fake engagement, or misleading customer manipulation",
  "Adult, illegal, gambling, or crypto scam use cases",
  "Platform abuse, rate-limit abuse, or attempts to bypass safeguards",
  "Privacy violations or processing data without proper authorization",
  "Unauthorized surveillance or harmful automation"
];

export default function AcceptableUsePage() {
  return (
    <PolicyLayout title="Acceptable Use Policy">
      <p>
        This Acceptable Use Policy applies to the Indus Automation Labs website, AutoChat pilot software, downloads,
        support services, and future hosted or licensed services. It exists to keep automation safe, lawful, and respectful
        of customers and platforms.
      </p>

      <h2>Prohibited uses</h2>
      <p>You may not use Indus Automation Labs software or services for:</p>
      <ul>
        {prohibited.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Messaging and platform responsibility</h2>
      <p>
        Users are responsible for following all laws, platform rules, customer consent requirements, privacy obligations,
        and business communication rules that apply to their connected accounts and customer conversations.
      </p>

      <h2>Automation safeguards</h2>
      <p>
        Businesses should use approval mode, owner-reviewed training, and careful pilot testing before increasing
        automation. AutoChat should not be used to send messages that the business would not lawfully and ethically send
        manually.
      </p>

      <h2>Enforcement</h2>
      <p>
        Access may be limited, suspended, or terminated if use creates legal risk, platform risk, security risk, privacy
        concerns, or violates this policy. Serious misuse may be reported when required by law or platform obligations.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about acceptable use can be sent to <a href={site.generalContactMailto}>{site.email}</a>.
      </p>
    </PolicyLayout>
  );
}
