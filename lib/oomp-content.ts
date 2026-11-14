import type { IconName } from "@/components/Icon";
import { site } from "./site";

type Capability = {
  title: string;
  description: string;
  detail: string;
  icon: IconName;
  source: string;
};

type OompContent = {
  name: string;
  expansion: string;
  version: string;
  maturity: string;
  status: { badge: string; label: string };
  license: string;
  canonical: string;
  headline: string;
  tagline: string;
  strapline: string;
  positioning: string;
  description: string;
  source: { branch: string; commit: string; verified: string };
  links: { github: string; docs: string; setup: string; inspection: string; quickstart: string; latest: string; limitations: string; license: string };
  navigation: { label: string; href: string }[];
  pipeline: { title: string; description: string }[];
  capabilities: Capability[];
  installation: { requirements: string; windows: string[]; posix: string[]; profile: string[] };
  limitations: string[];
  research: { title: string; description: string; status: string; benchmarkUrl: string | null };
  roadmap: { title: string; status: "Research goal"; description: string; evidenceUrl: string }[];
  // Only add a result with version, conditions and a public evidence document.
  benchmarkEvidence: { title: string; url: string; testedVersion: string; conditions: string; qualification: string }[];
  releases: { status: string; publishedTag: string | null; url: string; historyUrl: string; changelogUrl: string | null };
  internalVisionCopyCandidate: { text: string; status: "Unverified aspiration; not public product copy" };
};

const github = "https://github.com/hamzah105/OOMP";
const commit = "bebee6194c0c5f3963b15cbbf56ebc10dd83ccf6";

// Claims were checked against this main snapshot, not the October proposal.
// Update the evidence and maturity together when changing public capabilities.
export const oompContent: OompContent = {
  name: "OOMP",
  expansion: "Object-Oriented Context Map",
  version: "0.1.0",
  maturity: "Open-source alpha research project",
  status: { badge: "ALPHA", label: "Alpha research" },
  license: "Apache-2.0",
  canonical: `${site.url}/labs/oomp`,
  headline: "Introducing OOMP",
  tagline: "Memory beyond the context window.",
  strapline: "Persistent history. Selective recall. Finite prompts.",
  positioning:
    "An independent, local-first, provider-neutral memory engine. Preserve source-backed history and selectively recall the evidence your AI agent needs.",
  description:
    "Meet OOMP, an open-source alpha memory engine for AI agents. Durable local history, source provenance and selective recall for finite-context models.",
  source: { branch: "main", commit, verified: "2026-11-14" },
  links: {
    github,
    docs: `${github}/blob/${commit}/docs/getting-started.md`,
    setup: `${github}/blob/${commit}/docs/product-onboarding.md`,
    inspection: `${github}/blob/${commit}/docs/memory-inspection.md`,
    quickstart: `${github}/blob/${commit}/examples/quickstart.py`,
    latest: `${github}/tree/main`,
    limitations: `${github}/blob/${commit}/docs/limitations.md`,
    license: `${github}/blob/${commit}/LICENSE`
  },
  navigation: [
    { label: "Overview", href: "#overview" },
    { label: "Architecture", href: "#architecture" },
    { label: "Get started", href: "#get-started" }
  ],
  pipeline: [
    { title: "Preserve the source", description: "Authorized events retain their original source references, roles and timestamps." },
    { title: "Extract with attribution", description: "Rules, or explicitly configured local-model proposals, produce candidates checked against source spans and policy." },
    { title: "Keep a durable history", description: "Local SQLite stores source events, attributed memories, episodes and temporal relationships." },
    { title: "Recall within a budget", description: "Scoped retrieval selects relevant evidence and provenance for the host’s finite prompt." }
  ],
  capabilities: [
    {
      title: "History that survives the session",
      description: "Durable SQLite source events and attributed memories let relevant earlier work remain available after the recent conversation moves on.",
      detail: "SQLite · local persistence",
      icon: "memory",
      source: "src/oomp/storage/sqlite.py"
    },
    {
      title: "A path back to the source",
      description: "Event references and validated excerpts make returned evidence inspectable. Attribution explains where a claim came from; it does not establish truth.",
      detail: "Event IDs · source spans",
      icon: "license",
      source: "src/oomp/understanding/validator.py"
    },
    {
      title: "Recall with boundaries",
      description: "Lexical search, optional local embeddings and bounded graph traversal select evidence across sessions. Context packets have explicit byte budgets.",
      detail: "FTS5 · optional hybrid retrieval",
      icon: "modes",
      source: "src/oomp/retrieval/engine.py"
    },
    {
      title: "Objects, relationships, time",
      description: "Inspect a source-backed object map with multiple topic paths, typed relationships and temporal history. Building the projection is an explicit operation.",
      detail: "Object map · temporal graph",
      icon: "connected",
      source: "src/oomp/objects/service.py"
    },
    {
      title: "Your host. Your model.",
      description: "An optional MCP interface connects authorized hosts through stdio or authenticated loopback HTTP. The host’s model stays outside OOMP and generates the answer.",
      detail: "MCP · separate read and write authority",
      icon: "workflow",
      source: "src/oomp/mcp/server.py"
    },
    {
      title: "Local operation, visible state",
      description: "CLI onboarding previews profile setup. Owned-process supervision, diagnostics and inspection commands help operators understand their local system.",
      detail: "Onboard · doctor · lifecycle",
      icon: "dashboard",
      source: "src/oomp/product/cli.py"
    }
  ],
  installation: {
    requirements: "Python 3.11 or 3.12 · Git · SQLite with FTS5",
    windows: [
      "git clone --branch main --single-branch https://github.com/hamzah105/OOMP.git",
      "cd OOMP",
      `git checkout ${commit}`,
      "py -3.11 -m venv .venv",
      '.\\.venv\\Scripts\\python.exe -m pip install ".[mcp,ui]"',
      ".\\.venv\\Scripts\\oomp.exe --version",
      ".\\.venv\\Scripts\\python.exe examples/quickstart.py"
    ],
    posix: [
      "git clone --branch main --single-branch https://github.com/hamzah105/OOMP.git",
      "cd OOMP",
      `git checkout ${commit}`,
      "python3.11 -m venv .venv",
      '.venv/bin/python -m pip install ".[mcp,ui]"',
      ".venv/bin/oomp --version",
      ".venv/bin/python examples/quickstart.py"
    ],
    profile: [
      ".\\.venv\\Scripts\\oomp.exe onboard --profile local",
      ".\\.venv\\Scripts\\oomp.exe doctor --full --profile local",
      ".\\.venv\\Scripts\\oomp.exe up --profile local"
    ]
  },
  limitations: [
    "Alpha research software, without a production-readiness certification or universal host compatibility claim.",
    "Local storage is plaintext SQLite. Protect the filesystem and backups; local-first does not mean encrypted.",
    "Extraction and retrieval can miss relevant information or return imperfect candidates. Provenance is not factual verification.",
    "Embedding and extraction models are optional and explicitly configured. Model capacity and retrieval work remain finite.",
    "Evidence budgets count UTF-8 packet bytes, not exact model tokens. The host must also budget its own prompt and protocol overhead.",
    "The documented submission profile uses one principal per namespace. Independently owned hosts need separate scopes and credentials."
  ],
  research: {
    title: "An expanding past.\nA finite prompt.",
    description:
      "The long-term objective is memory that can navigate an increasingly extensive history without loading the entire archive into a model’s prompt. Better natural-language recall, evaluation and independent usability remain ongoing research.",
    status: "Ongoing research · no literal infinite-context claim",
    benchmarkUrl: null
  },
  roadmap: [
    {
      title: "Broader natural-language recall",
      status: "Research goal",
      description: "Evaluate acquisition across more phrasing, uncertainty and changing project state, with independently reviewed labels.",
      evidenceUrl: `${github}/blob/${commit}/docs/product-roadmap.md`
    },
    {
      title: "Independent evaluation",
      status: "Research goal",
      description: "Extend reproducible evidence studies with independent fixtures, exact tokenizer accounting and review of downstream answers.",
      evidenceUrl: `${github}/blob/${commit}/docs/research-plan.md`
    },
    {
      title: "Measured operation at scale",
      status: "Research goal",
      description: "Measure storage, latency and recovery across representative workloads. A growing archive still needs finite retrieval and prompt budgets.",
      evidenceUrl: `${github}/blob/${commit}/docs/research-plan.md`
    }
  ],
  benchmarkEvidence: [],
  releases: {
    status: "No GitHub release published at the source review on 14 November 2026.",
    publishedTag: null,
    url: `${github}/releases`,
    historyUrl: `${github}/commits/main/`,
    changelogUrl: null
  },
  // Founder’s requested identity is retained for factual review, never rendered.
  internalVisionCopyCandidate: {
    text: "World's first infinite context handler memory agent.",
    status: "Unverified aspiration; not public product copy"
  }
};
