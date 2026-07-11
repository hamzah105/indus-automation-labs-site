import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Indus Automation Labs website and software.",
  openGraph: {
    title: "Terms of Service",
    description: "Website and software terms for Indus Automation Labs."
  }
};

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms of Service">
      <p>
        These Terms of Service describe the basic rules for using the Indus Automation Labs website, product information,
        software downloads, product access, and related services. They are provided as a practical policy placeholder and
        may be updated as the business, product, licensing, and payment systems mature.
      </p>

      <h2>Use of website and software</h2>
      <p>
        You may use this website to learn about Indus Automation Labs, review AutoChat product information, access release
        links, download product materials, and contact support. If you install AutoChat, you are responsible for using
        the software lawfully and in accordance with these terms and any applicable product instructions.
      </p>

      <h2>Product status</h2>
      <p>
        AutoChat v1.0.0 is a Windows desktop application for business messaging and customer-support automation.
        Features, pricing, licensing, integrations, limits, and supported workflows may change as the product develops.
      </p>

      <h2>Account and access responsibility</h2>
      <p>
        If accounts, licenses, or dashboard access are provided, you are responsible for keeping access details secure,
        using the software only for your own authorized business workflows, and notifying support if you believe access has
        been misused.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You may not use Indus Automation Labs software or services for spam, unsolicited bulk messaging, fraud,
        deception, phishing, platform abuse, harassment, malware, fake reviews, illegal activity, impersonation, or
        privacy violations. You must follow all laws and platform rules that apply to your messaging, customer data, and
        business operations.
      </p>

      <h2>Subscriptions and licensing</h2>
      <p>
        AutoChat may include desktop-app-based license activation through the in-app License section. Payments or license
        activation may be handled through the AutoChat desktop app License section, approved onboarding, or future
        website/payment-provider checkout depending on availability. Any pricing shown on this website is indicative
        unless the in-app licensing flow, a written agreement, invoice, approved onboarding, or future checkout flow
        confirms otherwise.
      </p>

      <h2>No misuse or harmful automation</h2>
      <p>
        You agree not to use the website or software to create malware, bypass platform safeguards, scrape systems without
        permission, send unauthorized bulk messages, misrepresent your identity, or automate activity that causes harm to
        customers, third parties, platforms, or networks.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent allowed by applicable law, Indus Automation Labs is not liable for indirect, incidental,
        special, consequential, or business losses arising from use of the website, product materials, AutoChat software,
        or third-party services. AutoChat should be configured and tested carefully before relying on it for critical
        business use.
      </p>

      <h2>Termination</h2>
      <p>
        Access to AutoChat software, licenses, or services may be suspended or terminated if there is misuse, policy
        violation, security risk, non-payment when billing becomes available, or behavior that creates legal, platform, or
        operational risk.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={site.generalContactMailto}>{site.email}</a>.
      </p>
    </PolicyLayout>
  );
}
