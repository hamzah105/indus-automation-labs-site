import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Customer dashboard placeholder for approved AutoChat pilot customers.",
  openGraph: {
    title: "Customer Dashboard Coming Soon",
    description: "AutoChat dashboard access will be available for approved pilot customers."
  }
};

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center px-4 py-20 sm:px-6 lg:px-8">
      <section className="glass w-full rounded-3xl p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanGlow">Pilot access</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-normal text-white">
          Customer Dashboard Coming Soon
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
          AutoChat dashboard access will be available for approved pilot customers.
        </p>
        <ButtonLink href={site.generalContactMailto} className="mt-8">
          Contact Support
        </ButtonLink>
      </section>
    </main>
  );
}
