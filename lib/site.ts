export const site = {
  name: "Indus Automation Labs",
  domain: "indusautomationlabs.com",
  url: "https://indusautomationlabs.com",
  email: "support@indusautomationlabs.com",
  githubRelease: "https://github.com/hamzah105/AutoChat-PK-Releases/releases/tag/v0.1.0-pilot",
  prospectusPath: "/AutoChat_Prospectus.pdf",
  youtubeTutorial: "https://www.youtube.com/",
  youtubeAd: "https://www.youtube.com/"
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "AutoChat", href: "/products/autochat" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" }
];

export const legalLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Acceptable Use", href: "/acceptable-use" }
];

export const productFeatures = [
  "WhatsApp business messaging automation",
  "Product catalog and smart product search",
  "Manual, approval, and auto modes",
  "Customer-specific memory isolation",
  "Live training inbox",
  "Supplier desk for hidden fulfillment workflows",
  "Voice-note transcription",
  "Trial and license foundation",
  "Windows desktop deployment"
];

export function pageTitle(title: string) {
  return `${title} | ${site.name}`;
}
