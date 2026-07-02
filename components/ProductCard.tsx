import { ButtonLink } from "@/components/ButtonLink";

type ProductCardProps = {
  title: string;
  status: string;
  description: string;
  actions: Array<{ label: string; href: string; variant?: "primary" | "secondary" | "quiet"; disabled?: boolean }>;
};

export function ProductCard({ title, status, description, actions }: ProductCardProps) {
  return (
    <article className="glass flex h-full flex-col rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold text-white">{title}</h2>
        <span className="rounded-full border border-mint/25 bg-mint/10 px-3 py-1 text-xs font-medium text-mint">
          {status}
        </span>
      </div>
      <p className="mt-5 flex-1 text-sm leading-6 text-slate-300">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {actions.map((action) =>
          action.disabled ? (
            <span
              key={action.label}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-slate-500 sm:w-auto"
            >
              {action.label}
            </span>
          ) : (
            <ButtonLink key={action.label} href={action.href} variant={action.variant ?? "secondary"}>
              {action.label}
            </ButtonLink>
          )
        )}
      </div>
    </article>
  );
}
