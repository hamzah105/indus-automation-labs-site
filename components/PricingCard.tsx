import { ButtonLink } from "@/components/ButtonLink";

type PricingCardProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export function PricingCard({ name, price, description, features, highlighted }: PricingCardProps) {
  return (
    <article
      className={`glass flex h-full flex-col rounded-2xl p-6 ${
        highlighted ? "border-cyanGlow/45 shadow-glow" : ""
      }`}
    >
      <h2 className="font-display text-2xl font-semibold text-white">{name}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-6 flex items-end gap-1">
        <span className="font-display text-4xl font-semibold text-white">{price}</span>
      </div>
      <ul className="mt-6 grid flex-1 gap-3 text-sm text-slate-300">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyanGlow shadow-glow" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ButtonLink href="/contact" variant={highlighted ? "primary" : "secondary"} className="mt-8">
        Request product access
      </ButtonLink>
    </article>
  );
}
