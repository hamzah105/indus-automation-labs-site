import { ButtonLink } from "@/components/ButtonLink";
import type { ReactNode } from "react";

type ProductCardProps = {
  title: string;
  status: string;
  description: string;
  actions: Array<{ label: string; href: string; variant?: "primary" | "secondary" | "quiet"; disabled?: boolean }>;
  eyebrow?: string;
  icon?: ReactNode;
  featured?: boolean;
  planned?: boolean;
};

export function ProductCard({ title, status, description, actions, eyebrow, icon, featured = false, planned = false }: ProductCardProps) {
  return (
    <article className={`premium-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-8 ${featured ? "lg:col-span-2" : ""}`}>
      <div className={`pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full blur-3xl ${planned ? "bg-violetGlow/[0.07]" : "bg-cyanGlow/[0.11]"}`} aria-hidden="true" />
      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon ? <span className={`grid h-12 w-12 place-items-center rounded-2xl border ${planned ? "border-violetGlow/20 bg-violetGlow/[0.08] text-violetGlow" : "border-cyanGlow/25 bg-cyanGlow/[0.09] text-cyanGlow"}`}>{icon}</span> : null}
          <div>
            {eyebrow ? <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p> : null}
            <h2 className={`${eyebrow ? "mt-1" : ""} font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl`}>{title}</h2>
          </div>
        </div>
        <span className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${planned ? "border-white/[0.1] bg-white/[0.04] text-slate-400" : "border-mint/25 bg-mint/[0.08] text-mint"}`}>
          {status}
        </span>
      </div>
      <p className={`relative mt-6 flex-1 text-sm leading-7 text-slate-300 ${featured ? "max-w-2xl sm:text-base" : ""}`}>{description}</p>
      <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {actions.map((action) =>
          action.disabled ? (
            <span
              key={action.label}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.025] px-5 py-3 text-sm font-semibold text-slate-500 sm:w-auto"
            >
              {action.label}
            </span>
          ) : (
            <ButtonLink key={action.label} href={action.href} variant={action.variant ?? "secondary"} showArrow={action.variant === "primary"}>
              {action.label}
            </ButtonLink>
          )
        )}
      </div>
    </article>
  );
}
