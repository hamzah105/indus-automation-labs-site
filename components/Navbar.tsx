import Link from "next/link";
import { navigation, site } from "@/lib/site";
import { ButtonLink } from "@/components/ButtonLink";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/76 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyanGlow/35 bg-cyanGlow/10 font-display text-lg font-bold text-cyanGlow shadow-glow">
            IA
          </span>
          <span className="font-display text-base font-semibold tracking-normal text-white sm:text-lg">
            {site.name}
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href={site.githubRelease}>Download AutoChat</ButtonLink>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-cyanGlow/70">
            <span className="sr-only">Open navigation</span>
            <span className="block h-0.5 w-5 bg-current before:mb-1.5 before:block before:h-0.5 before:bg-current after:mt-1.5 after:block after:h-0.5 after:bg-current" />
          </summary>
          <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-white/12 bg-midnight/95 p-3 shadow-2xl backdrop-blur-xl">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href={site.githubRelease} className="mt-3 w-full">
              Download AutoChat
            </ButtonLink>
          </div>
        </details>
      </nav>
    </header>
  );
}
