import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  tag?: string;
  accent?: "cyan" | "violet" | "mint" | "solar";
  className?: string;
};

const accents = {
  cyan: {
    icon: "border-cyanGlow/25 bg-cyanGlow/[0.09] text-cyanGlow",
    glow: "bg-cyanGlow/10",
    line: "from-cyanGlow/70"
  },
  violet: {
    icon: "border-violetGlow/25 bg-violetGlow/[0.09] text-violetGlow",
    glow: "bg-violetGlow/10",
    line: "from-violetGlow/70"
  },
  mint: {
    icon: "border-mint/25 bg-mint/[0.09] text-mint",
    glow: "bg-mint/10",
    line: "from-mint/70"
  },
  solar: {
    icon: "border-solar/25 bg-solar/[0.09] text-solar",
    glow: "bg-solar/10",
    line: "from-solar/70"
  }
};

export function FeatureCard({ title, description, icon = "·", tag, accent = "cyan", className = "" }: FeatureCardProps) {
  const tone = accents[accent];

  return (
    <article className={`premium-card group relative h-full overflow-hidden rounded-3xl p-6 ${className}`}>
      <div className={`pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full blur-3xl transition duration-500 group-hover:scale-125 ${tone.glow}`} aria-hidden="true" />
      <div className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r to-transparent opacity-60 ${tone.line}`} aria-hidden="true" />
      <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${tone.icon}`}>
        {icon}
      </div>
      {tag ? <p className="relative mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{tag}</p> : null}
      <h3 className={`${tag ? "mt-2" : "mt-6"} relative font-display text-xl font-semibold tracking-[-0.015em] text-white`}>{title}</h3>
      <p className="relative mt-3 text-sm leading-6 text-slate-400">{description}</p>
    </article>
  );
}
