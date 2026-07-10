import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
  titleAs?: "h1" | "h2";
};

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
  centered = false,
  titleAs = "h2"
}: SectionProps) {
  const Heading = titleAs;

  return (
    <section className={`section-shell relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24 ${className}`}>
      <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
        {eyebrow ? (
          <p className="eyebrow-label">{eyebrow}</p>
        ) : null}
        <Heading className="mt-4 text-balance font-display text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
          {title}
        </Heading>
        {description ? <p className="mt-5 text-pretty text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{description}</p> : null}
      </div>
      {children ? <div className="mt-12">{children}</div> : null}
    </section>
  );
}
