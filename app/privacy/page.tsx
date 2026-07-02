import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Indus Automation Labs website, contact communication, and AutoChat pilot usage.",
  openGraph: {
    title: "Privacy Policy",
    description: "How Indus Automation Labs handles website, contact, and pilot product data."
  }
};

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy Policy">
      <p>
        This Privacy Policy explains how Indus Automation Labs may collect, use, and protect information from website
        visitors, business contacts, and AutoChat pilot users. It is a practical early-stage policy and may be updated as
        the product and service model develops.
      </p>

      <h2>Website visitors</h2>
      <p>
        The website may collect basic technical information commonly processed by hosting providers, such as device,
        browser, IP address, page request, and timing information. This helps keep the website secure, reliable, and
        functional.
      </p>

      <h2>Contact forms and email communication</h2>
      <p>
        If you contact us by email or through a form, we may process your name, email address, company name, message, and
        related communication history so we can respond to inquiries, provide support, and discuss pilot access.
      </p>

      <h2>AutoChat product usage data</h2>
      <p>
        If you install or test AutoChat, the app may process configuration, license status, logs, training items, product
        catalog information, workflow settings, and usage details needed to operate, improve, troubleshoot, and support the
        product. The exact behavior may evolve during pilot development.
      </p>

      <h2>Customer messaging data</h2>
      <p>
        AutoChat is designed to work with customer messaging data connected by the user through their own authorized
        business accounts. Users are responsible for ensuring they have appropriate rights, notices, and permissions for
        the customer data and conversations they process through the software.
      </p>

      <h2>No sale of personal data</h2>
      <p>
        Indus Automation Labs does not sell personal data. Information is used to operate the website, communicate with
        users, provide product support, manage pilot access, improve the product, and meet legal or security obligations.
      </p>

      <h2>Data security practices</h2>
      <p>
        We use reasonable technical and organizational practices appropriate for an early-stage product, including access
        controls, careful handling of support data, and limiting data use to business and product purposes. No method of
        electronic transmission or storage can be guaranteed as fully secure.
      </p>

      <h2>User rights and choices</h2>
      <p>
        You may contact us to ask about your information, request corrections, request deletion where appropriate, or
        raise privacy questions. Some records may need to be retained for legal, security, billing, or support reasons.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions can be sent to <a href={site.generalContactMailto}>{site.email}</a>.
      </p>
    </PolicyLayout>
  );
}
