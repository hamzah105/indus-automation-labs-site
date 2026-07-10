export const site = {
  name: "Indus Automation Labs",
  domain: "indusautomationlabs.com",
  url: "https://indusautomationlabs.com",
  email: "support@indusautomationlabs.com",
  releaseUrl: "https://github.com/hamzah105/AutoChat-PK-Releases/releases/download/v1.0.0/AutoChat-Setup-v1.0.0.exe",
  githubRelease: "https://github.com/hamzah105/AutoChat-PK-Releases/releases/download/v1.0.0/AutoChat-Setup-v1.0.0.exe",
  legacyDownloads: [
    {
      name: "AutoChat PK v0.1.0 Pilot Release",
      version: "v0.1.0-pilot",
      type: "Legacy pilot release",
      href: "https://github.com/hamzah105/AutoChat-PK-Releases/releases/tag/v0.1.0-pilot"
    },
    {
      name: "AutoChat v0.1.1",
      version: "v0.1.1",
      type: "Previous installer",
      href: "https://github.com/hamzah105/AutoChat-PK-Releases/releases/download/v0.1.1/AutoChat-Setup-v0.1.1.exe"
    }
  ],
  prospectusPath: "/AutoChat_Prospectus.pdf",
  generalContactMailto: "mailto:support@indusautomationlabs.com?subject=Indus%20Automation%20Labs%20Inquiry",
  newcomVoucherMailto: "mailto:support@indusautomationlabs.com?subject=AutoChat%20NEWCOM%20Voucher",
  tutorialUrl: "https://youtu.be/gtUK3SuWmx8?si=Lfv5laGrJAXX1-uk",
  adUrl: "https://youtube.com/shorts/t7pUX-vO7Tk?si=TRtHz71772v-zMee"
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
  {
    title: "WhatsApp business messaging automation",
    description:
      "Connect WhatsApp through the desktop app and manage customer conversations from a controlled business dashboard."
  },
  {
    title: "Product catalog and smart product search",
    description:
      "Add products, prices, stock status, descriptions, tags, and product links so AutoChat can answer catalog-related questions more accurately."
  },
  {
    title: "Manual, approval, and auto modes",
    description:
      "Start safely in manual or approval mode, then move toward automation after the business knowledge base is trained."
  },
  {
    title: "Customer-specific memory isolation",
    description:
      "Store customer preferences and notes per contact so one customer's context is not mixed with another customer's conversation."
  },
  {
    title: "Live training inbox",
    description:
      "When AutoChat does not know an answer, the owner can answer once and save it as FAQ, product knowledge, policy, or customer memory."
  },
  {
    title: "Supplier desk workflow",
    description:
      "Handle supplier-dependent questions internally and generate customer-safe updates without exposing supplier details, cost, or procurement information."
  },
  {
    title: "Voice-note transcription",
    description:
      "Transcribe customer voice notes and pass the transcript into the same AI response pipeline for markets where voice messages are common."
  },
  {
    title: "Trial and license foundation",
    description:
      "Support pilot access, license activation, and voucher-based early onboarding through the desktop app."
  },
  {
    title: "Windows desktop deployment",
    description:
      "Designed first as a Windows desktop pilot so businesses can test automation without needing custom hardware."
  }
];

export function pageTitle(title: string) {
  return `${title} | ${site.name}`;
}
