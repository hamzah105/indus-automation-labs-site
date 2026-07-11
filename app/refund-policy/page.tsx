import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy",
  description: "Refund and cancellation policy for Indus Automation Labs product access, subscriptions, and setup work.",
  openGraph: {
    title: "Refund and Cancellation Policy",
    description: "Early-stage refund and cancellation policy for AutoChat and related services."
  }
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund and Cancellation Policy">
      <p>
        This policy explains how refunds and cancellations may be handled for Indus Automation Labs product access,
        subscriptions, licenses, and related setup services when paid plans become available.
      </p>

      <h2>Product access and subscriptions</h2>
      <p>
        AutoChat v1.0.0 is Windows desktop automation software. License requests and voucher-based offers may be
        handled through app licensing or approved onboarding. Payments or license activation may be handled
        through the AutoChat desktop app License section, approved onboarding, or future website/payment-provider checkout
        depending on availability.
      </p>

      <h2>Cancellation requests</h2>
      <p>
        Customers may request cancellation by contacting support. Cancellation timing, renewal handling, and access removal
        will depend on the plan, billing cycle, and any written agreement in place.
      </p>

      <h2>Refund eligibility</h2>
      <p>
        Refunds may be considered for duplicate charges, billing errors, service access issues that cannot be resolved, or
        cases where a written license agreement allows a refund. Refund eligibility depends on license status,
        installation/support work completed, misuse, and agreed terms. Requests should be made as soon as possible with
        order, account, license, onboarding, or invoice details.
      </p>

      <h2>Non-refundable situations</h2>
      <p>
        Refunds may not be available for misuse, policy violations, completed custom setup, completed onboarding, completed
        consulting, platform rule violations, illegal use, or situations where access was provided and used as agreed,
        unless a separate written agreement says otherwise.
      </p>

      <h2>How to request help</h2>
      <p>
        Send billing, refund, or cancellation questions to <a href={site.generalContactMailto}>{site.email}</a>. Include your name,
        business name, contact email, invoice or payment reference if available, and a short explanation of the request.
      </p>
    </PolicyLayout>
  );
}
