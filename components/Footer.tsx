import Link from "next/link";
import { legalLinks, site } from "@/lib/site";
import { Icon } from "@/components/Icon";

const productLinks = [
  { label: "Products", href: "/products" },
  { label: "AutoChat", href: "/products/autochat" },
  { label: "Pricing", href: "/pricing" },
  { label: "AutoChat v1.0.0", href: site.releaseUrl }
];

const resourceLinks = [
  { label: "Watch Tutorial", href: site.tutorialUrl },
  { label: "Watch Product Ad", href: site.adUrl },
  { label: "Download Prospectus", href: site.prospectusPath, download: true },
  { label: "Previous versions", href: "/products/autochat#previous-versions" }
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-ink/[0.82]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.9fr_0.8fr] lg:px-8 lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyanGlow/25 bg-cyanGlow/[0.09] font-display text-sm font-bold text-cyanGlow">IA</span>
            <span className="font-display text-xl font-semibold tracking-[-0.02em] text-white">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            AI automation software for customer support, business messaging, and practical local business workflows.
          </p>
          <a className="mt-5 inline-flex items-center gap-2 break-all text-sm text-cyanGlow hover:text-white" href={site.generalContactMailto}>
            <Icon name="mail" className="h-4 w-4 shrink-0" />{site.email}
          </a>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-mint">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-mint" />Windows desktop automation software
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Product</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            {productLinks.map((link) =>
              link.href.startsWith("http") ? (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-cyanGlow">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="transition hover:text-cyanGlow">
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Resources</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            {resourceLinks.map((link) =>
              link.href.startsWith("http") || link.download ? (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  download={link.download || undefined}
                  className="transition hover:text-cyanGlow"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="transition hover:text-cyanGlow">{link.label}</Link>
              )
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Legal</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-cyanGlow">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.08] px-4 py-5 text-center text-xs leading-5 text-slate-500">
        &copy; 2026 {site.name}. All rights reserved. AutoChat v1.0.0 is a Windows desktop application for business messaging and customer-support automation.
      </div>
    </footer>
  );
}
