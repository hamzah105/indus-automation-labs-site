import type { ReactNode } from "react";

type PolicyLayoutProps = {
  title: string;
  children: ReactNode;
};

export function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="glass rounded-3xl p-6 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanGlow">Last updated: July 2026</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-normal text-white">{title}</h1>
        <div className="policy-content mt-8">
          {children}
        </div>
      </div>
    </main>
  );
}
