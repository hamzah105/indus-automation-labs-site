import Link from "next/link";
import type { ReactNode } from "react";
import { labsInter, labsSpaceGrotesk } from "@/lib/labs-fonts";
import ui from "./ial-ui.module.css";

export function IalPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main className={`${ui.page} ${labsInter.variable} ${labsSpaceGrotesk.variable} ${className}`}>{children}</main>;
}

export function ActionLink({ href, children, kind = "secondary", download = false }: { href: string; children: ReactNode; kind?: "primary" | "secondary" | "text"; download?: boolean }) {
  const className = `${ui.action} ${ui[kind]}`;
  const content = <>{children}<span aria-hidden="true">↗</span></>;
  return href.startsWith("/") && !download
    ? <Link href={href} className={className} prefetch={false}>{content}</Link>
    : <a href={href} className={className} download={download || undefined} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{content}</a>;
}
