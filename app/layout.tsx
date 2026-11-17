import type { Metadata } from "next";
import "./globals.css";
import "@/packages/matterflux/src/styles/matterflux.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { SiteMatterFluxProvider } from "@/components/matterflux/SiteMatterFluxProvider";
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
      "AI automation software for business messaging, customer support, sales workflows, and local business operations.",
    images: [{ url: `${site.url}/ial-v1/company-og.png`, width: 1200, height: 630, alt: "Indus Automation Labs — the official hexagonal A mark." }]
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/ial-v1/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/ial-v1/brand/favicon-48.png", sizes: "48x48", type: "image/png" }
    ],
    apple: [{ url: "/ial-v1/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SiteMatterFluxProvider>
          <StarBackground />
          <Navbar />
          <div id="main-content">{children}</div>
          <Footer />
        </SiteMatterFluxProvider>
      </body>
    </html>
  );
}
