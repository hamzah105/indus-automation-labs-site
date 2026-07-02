import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy",
  description: "Refund and cancellation policy for Indus Automation Labs pilot access, subscriptions, and setup work.",
  openGraph: {
    title: "Refund and Cancellation Policy",
    description: "Early-stage refund and cancellation policy for AutoChat and related services."
  }
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund and Cancellation Policy">
      <p>
        This policy explains how refunds and cancellations may be handled for Indus Automation Labs pilot access,
        subscriptions, licenses, and related setup services when paid plans become available.
      </p>

      <h2>Pilot access and subscriptions</h2>
      <p>
        AutoChat is currently a working pilot under active development. Paid pilot access, subscriptions, or licenses may
        be offered by written agreement, invoice, or checkout when available. Terms may vary depending on the pilot scope,
        setup work, and support commitment.
      </p>

      <h2>Cancellation requests</h2>
      <p>
        Customers may request cancellation by contacting support. Cancellation timing, renewal handling, and access removal
        will depend on the plan, billing cycle, and any written agreement in place.
      </p>

      <h2>Refund eligibility</h2>
      <p>
        Refunds may be considered for duplicate charges, billing errors, service access issues that cannot be resolved, or
        cases where a written pilot agreement allows a refund. Requests should be made as soon as possible with order,
        account, or invoice details.
      </p>

      <h2>Non-refundable situations</h2>
      <p>
        Refunds may not be available for misuse, policy violations, completed custom setup, completed onboarding, completed
        consulting, platform rule violations, illegal use, or situations where access was provided and used as agreed,
        unless a separate written agreement says otherwise.
      </p>

      <h2>How to request help</h2>
      <p>
        Send refund or cancellation questions to <a href={`mailto:${site.email}`}>{site.email}</a>. Include your name,
        business name, contact email, invoice or payment reference if available, and a short explanation of the request.
      </p>
    </PolicyLayout>
  );
}
