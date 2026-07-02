import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  className?: string;
  download?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  download = false
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const base =
    "inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-2.5 text-center text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyanGlow sm:w-auto";
  const variants = {
    primary:
      "bg-cyanGlow text-slate-950 shadow-glow hover:bg-white hover:shadow-[0_0_42px_rgba(34,211,238,0.32)]",
    secondary:
      "border border-white/15 bg-white/8 text-white hover:border-cyanGlow/70 hover:bg-cyanGlow/10",
    quiet: "text-slate-200 hover:text-cyanGlow"
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (isExternal || download) {
    return (
      <a
        className={classes}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        download={download || undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
