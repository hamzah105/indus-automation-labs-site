import type { ReactNode } from "react";

type PolicyLayoutProps = {
  title: string;
  children: ReactNode;
};

export function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <main className="relative mx-auto max-w-4xl overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="hero-orb hero-orb-violet" aria-hidden="true" />
      <div className="glass relative rounded-[2rem] p-6 sm:p-10 lg:p-12">
        <p className="eyebrow-label">Last updated: July 2026</p>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">{title}</h1>
        <div className="policy-content mt-10 border-t border-white/[0.08] pt-2">
          {children}
        </div>
      </div>
    </main>
  );
}
