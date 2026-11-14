export type MemoryNodeId = "project" | "preference" | "plan" | "episode" | "source-01" | "source-04";

export type IllustrativeMemoryNode = {
  id: MemoryNodeId;
  kind: "project" | "preference" | "plan" | "episode" | "source";
  category: string;
  label: string;
  source: string;
  excerpt: string;
  explanation: string;
  x: number;
  y: number;
  related: MemoryNodeId[];
};

export const storyDisclosure = "Illustrative demo — fictional data";
export const storyQuestion = "What project was I working on?";

export const storyChapters = [
  {
    id: "the-problem",
    eyebrow: "WORKING CONTEXT",
    title: "A conversation moves on.",
    accent: "Its history shouldn’t disappear.",
    paragraphs: [
      "Every model prompt has a finite capacity. As a conversation grows, earlier details can fall outside the active context, even when an application keeps the transcript.",
      "Longer windows and summaries can help. Durable memory adds another layer: retain the source, then select the relevant evidence when it is needed again."
    ],
    note: "Outside the active prompt does not mean deleted history.",
    stageLabel: "Conversation / finite working space"
  },
  {
    id: "what-oomp-does",
    eyebrow: "PERSISTENT HISTORY",
    title: "Keep the source.",
    accent: "Build the memory.",
    paragraphs: [
      "Authorized source events are durably recorded first. Mind processing proposes memories; source and policy validation govern what is retained as attributed memory.",
      "A message can remain part of the history without becoming a canonical fact. The original event remains the reference."
    ],
    note: "Source intake → durable event → Mind processing → attributed memory.",
    stageLabel: "Ingestion / source before interpretation"
  },
  {
    id: "memory-constellation",
    eyebrow: "THE OBJECT MAP",
    title: "Objects,",
    accent: "with a past.",
    paragraphs: [
      "A project. A technical preference. A plan that hasn’t happened yet. A discussion with no final decision. Different kinds of history, connected without losing their source.",
      "Explore the constellation. Hover or focus a node to preview its attribution; select it to keep the source open."
    ],
    note: "Associations organize evidence. They do not establish truth.",
    stageLabel: "Object relationships / inspect a source"
  },
  {
    id: "selective-recall",
    eyebrow: "SELECTIVE RECALL",
    title: "Recall",
    accent: "what matters.",
    paragraphs: [
      "An authorized question enters scoped retrieval. The project and its original source are selected in this example; unrelated objects stay in the archive.",
      "OOMP returns a bounded evidence packet, not the final answer. Actual retrieval can miss information or return imperfect candidates."
    ],
    note: "The illustrated selection is predetermined, not a live retrieval result.",
    stageLabel: "Retrieval / source-backed evidence selection"
  },
  {
    id: "finite-context",
    eyebrow: "BACK TO THE HOST",
    title: "An expanding history.",
    accent: "A finite prompt.",
    paragraphs: [
      "Selected evidence crosses back to the AI host. Its language model combines that evidence with the current request inside a finite prompt.",
      "Persistent history stays outside the model. Answer generation stays with the host. Neither storage nor model context is infinite."
    ],
    note: "Persistent storage ≠ the model’s native context window.",
    stageLabel: "Handoff / the host model remains external"
  }
] as const;

// Hand-authored fictional examples only. No source, profile, API or database read.
export const illustrativeMemoryNodes: IllustrativeMemoryNode[] = [
  {
    id: "project", kind: "project", category: "PROJECT", label: "Project Lumen", source: "demo:evt-01",
    excerpt: "I’m developing a project called Lumen.",
    explanation: "A project claim attributed to an original fictional user event. Attribution is not independent verification.",
    x: 23, y: 24, related: ["source-01"]
  },
  {
    id: "preference", kind: "preference", category: "PREFERENCE", label: "Concise explanations", source: "demo:evt-02",
    excerpt: "I prefer concise technical explanations.",
    explanation: "An explicitly stated technical preference, with its own original source reference.",
    x: 78, y: 22, related: []
  },
  {
    id: "plan", kind: "plan", category: "PLANNED ACTIVITY", label: "Tabletop robot", source: "demo:evt-03",
    excerpt: "I plan to build a tabletop robot.",
    explanation: "A prospective activity: planned, not completed. The original wording preserves that distinction.",
    x: 20, y: 66, related: ["episode"]
  },
  {
    id: "episode", kind: "episode", category: "DISCUSSION EPISODE", label: "Enclosure discussion", source: "demo:evt-04",
    excerpt: "We discussed an enclosure for the planned tabletop robot. No decision was made.",
    explanation: "An attributed discussion episode. The topic does not imply a finalized decision.",
    x: 80, y: 64, related: ["plan", "source-04"]
  },
  {
    id: "source-01", kind: "source", category: "ORIGINAL SOURCE", label: "demo:evt-01", source: "demo:evt-01",
    excerpt: "I’m developing a project called Lumen.",
    explanation: "The original fictional user excerpt behind the project object. A source link explains attribution, not truth.",
    x: 32, y: 88, related: ["project"]
  },
  {
    id: "source-04", kind: "source", category: "ORIGINAL SOURCE", label: "demo:evt-04", source: "demo:evt-04",
    excerpt: "We discussed an enclosure for the planned tabletop robot. No decision was made.",
    explanation: "The original fictional discussion excerpt. Source references remain attached to derived representations.",
    x: 68, y: 88, related: ["episode"]
  }
];

export const illustrativeEdges = [
  { from: "project", to: "core", type: "object" },
  { from: "preference", to: "core", type: "object" },
  { from: "plan", to: "core", type: "object" },
  { from: "episode", to: "core", type: "object" },
  { from: "project", to: "source-01", type: "source" },
  { from: "episode", to: "source-04", type: "source" },
  { from: "plan", to: "episode", type: "association" }
] as const;

export const fictionalConversation = [
  ...illustrativeMemoryNodes.slice(0, 4).map(node => ({ text: node.excerpt, source: node.source })),
  { text: "Now, let’s work on a different task.", source: "demo:evt-05" },
  { text: "What should we explore next?", source: "demo:evt-06" }
];
