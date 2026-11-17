import { site } from "@/lib/site";

/** Presentation data for the three redesigned routes; shared site configuration stays untouched. */
export const ialProjects = [
  { name: "AutoChat", number: "01", status: "Available", detail: `v${site.autochatVersion} / Windows`, audience: "Small-business operators", description: "Business messaging, useful context and owner-controlled replies in a Windows desktop app.", href: "/products/autochat", action: "Explore AutoChat" },
  { name: "OOMP", number: "02", status: "Alpha research", detail: "Open-source memory research", audience: "AI developers and researchers", description: "An open-source alpha exploring persistent, inspectable memory for AI systems.", href: "/labs/oomp", action: "Explore the research" },
  { name: "MatterFlux", number: "03", status: "Experimental", detail: "Developer interaction library", audience: "Interface developers", description: "A developer experiment in giving important interface actions a physical sense of completion.", href: "/labs/matterflux", action: "Open the experiment" }
] as const;

export const researchDirections = [
  { name: "Local & edge AI", detail: "Intelligence closer to where it is needed." },
  { name: "AI agents", detail: "Tools that coordinate useful, bounded work." },
  { name: "Computer vision", detail: "Connecting visual information to practical context." },
  { name: "Robotics", detail: "Exploring intelligence beyond the screen." },
  { name: "Spatial intelligence", detail: "World models and the structure of physical environments." }
] as const;

export const autochatCapabilities = [
  { title: "Business context", description: "Use product catalog information and business knowledge to support customer replies." },
  { title: "A training loop", description: "Review unknown questions and build useful answers through the Training Inbox." },
  { title: "Contact-specific memory", description: "Keep repeat-customer notes associated with the relevant contact." },
  { title: "Operator choice", description: "Choose Manual, Approval or Auto mode for the business workflow." }
] as const;

export const autochatReleasePage = `https://github.com/hamzah105/AutoChat-PK-Releases/releases/tag/v${site.autochatVersion}`;
