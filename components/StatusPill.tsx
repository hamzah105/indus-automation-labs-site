import type { ReactNode } from "react";

type StatusPillProps = {
  children: ReactNode;
  tone?: "cyan" | "mint" | "violet" | "solar";
  dot?: boolean;
};

const tones = {
  cyan: "border-cyanGlow/25 bg-cyanGlow/[0.08] text-cyan-100",
  mint: "border-mint/25 bg-mint/[0.08] text-emerald-100",
  violet: "border-violetGlow/25 bg-violetGlow/[0.08] text-violet-100",
  solar: "border-solar/25 bg-solar/[0.08] text-amber-100"
};

const dots = {
  cyan: "bg-cyanGlow",
  mint: "bg-mint",
  violet: "bg-violetGlow",
  solar: "bg-solar"
};

export function StatusPill({ children, tone = "cyan", dot = true }: StatusPillProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${tones[tone]}`}>
      {dot ? <span className={`h-1.5 w-1.5 rounded-full ${dots[tone]} shadow-[0_0_12px_currentColor]`} /> : null}
      {children}
    </span>
  );
}
