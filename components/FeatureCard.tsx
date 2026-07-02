type FeatureCardProps = {
  title: string;
  description: string;
  icon?: string;
};

export function FeatureCard({ title, description, icon = "*" }: FeatureCardProps) {
  return (
    <article className="glass rounded-2xl p-5 transition hover:-translate-y-1 hover:border-cyanGlow/35">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyanGlow/30 bg-cyanGlow/10 text-lg text-cyanGlow">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
    </article>
  );
}
