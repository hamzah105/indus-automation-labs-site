"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/site";
import { ButtonLink } from "@/components/ButtonLink";
import { Icon } from "@/components/Icon";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-ink/[0.78] shadow-[0_8px_35px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-[90rem] items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link href="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyanGlow/30 bg-gradient-to-br from-cyanGlow/[0.18] to-violetGlow/[0.1] font-display text-base font-bold text-cyanGlow shadow-glow transition group-hover:border-cyanGlow/55 group-hover:bg-cyanGlow/[0.18]">
            IA
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-semibold tracking-[-0.015em] text-white sm:text-base">{site.name}</span>
            <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:block">Automation for operators</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm transition ${pathname === item.href ? "bg-white/[0.07] text-white" : "text-slate-400 hover:bg-white/[0.05] hover:text-white"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden xl:block">
          <ButtonLink href={site.releaseUrl}>Download v1.1.0</ButtonLink>
        </div>

        <div className="relative xl:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.14] bg-white/[0.06] text-white transition hover:border-cyanGlow/50 hover:bg-cyanGlow/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyanGlow"
          >
            <Icon name={open ? "x" : "menu"} className="h-5 w-5" />
          </button>
          {open ? <div id="mobile-navigation" className="absolute right-0 mt-3 max-h-[calc(100vh-6rem)] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-3xl border border-white/[0.12] bg-midnight/[0.98] p-3 shadow-2xl backdrop-blur-2xl">
            <div className="mb-2 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Navigation</div>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-3 text-sm transition ${pathname === item.href ? "bg-cyanGlow/[0.08] text-cyan-100" : "text-slate-300 hover:bg-white/[0.06] hover:text-white"}`}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href={site.releaseUrl} className="mt-3 !w-full">
              Download AutoChat v1.1.0
            </ButtonLink>
          </div> : null}
        </div>
      </nav>
      </header>
    </>
  );
}
