import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | AI Automation Software`,
    template: `%s | ${site.name}`
  },
  description:
    "Indus Automation Labs builds AI automation software for business messaging, customer support, and practical local workflows.",
  applicationName: site.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | AI Automation Software`,
    description:
      "AI automation software for business messaging, customer support, sales workflows, and local business operations."
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <StarBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
