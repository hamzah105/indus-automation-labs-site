import Link from "next/link";
import { legalLinks, site } from "@/lib/site";

const productLinks = [
  { label: "Products", href: "/products" },
  { label: "AutoChat", href: "/products/autochat" },
  { label: "Pricing", href: "/pricing" },
  { label: "GitHub Releases", href: site.releaseUrl }
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="font-display text-xl font-semibold text-white">{site.name}</div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            AI automation software for customer support, business messaging, and practical local business workflows.
          </p>
          <a className="mt-4 inline-block break-words text-sm text-cyanGlow hover:text-white" href={site.generalContactMailto}>
            {site.email}
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Products</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            {productLinks.map((link) =>
              link.href.startsWith("http") ? (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-cyanGlow">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="hover:text-cyanGlow">
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Legal</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-cyanGlow">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">
        &copy; 2026 {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
