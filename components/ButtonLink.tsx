import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  className?: string;
  download?: boolean;
  showArrow?: boolean;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  download = false,
  showArrow = false,
  ariaLabel
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const base =
    "group relative isolate inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-center text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyanGlow active:translate-y-px sm:w-auto";
  const variants = {
    primary:
      "border border-cyan-200/30 bg-gradient-to-r from-cyanGlow to-electric text-slate-950 shadow-[0_12px_35px_rgba(34,211,238,0.22)] hover:-translate-y-0.5 hover:from-white hover:to-cyan-100 hover:shadow-[0_16px_45px_rgba(34,211,238,0.32)]",
    secondary:
      "border border-white/[0.14] bg-white/[0.055] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-cyanGlow/45 hover:bg-cyanGlow/[0.09] hover:text-cyan-50",
    quiet: "min-h-10 px-3 py-2 text-slate-300 hover:bg-white/[0.05] hover:text-cyanGlow"
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (isExternal || download) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        download={download || undefined}
      >
        <span className="relative z-10">{children}</span>
        {showArrow ? <Icon name="arrow" className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
      </a>
    );
  }

  return (
    <Link aria-label={ariaLabel} className={classes} href={href}>
      <span className="relative z-10">{children}</span>
      {showArrow ? <Icon name="arrow" className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
    </Link>
  );
}
