export type ProjectVisual =
  | "ybm"
  | "afterimage"
  | "localdeploy"
  | "agentgymnasium"
  | "creature"
  | "segcraft";

export type Project = {
  /**
   * Anchor for the homepage card (`/#project-<slug>`) and the path of the
   * retired `/work/<slug>/` page, which now redirects to that card. Changing a
   * slug breaks links that already point at either address.
   */
  slug: string;
  name: string;
  /** Repository name under github.com/oney-erge. The card links straight to it. */
  repo: string;
  field: string;
  outcome: string;
  detail: string;
  tags: string[];
  visual: ProjectVisual;
  replay?: string;
};

export const projects: Project[] = [
  {
    slug: "ybm-local-ai-agent",
    name: "YBM",
    repo: "YBM",
    field: "Agent systems",
    outcome: "A policy-protected local agent that keeps working toward the task.",
    detail:
      "Talk to it from the web, Telegram, or WhatsApp, and approve important actions before they run.",
    tags: ["Policy-gated tools", "Self-extending workflows", "Local-first"],
    visual: "ybm",
  },
  {
    slug: "afterimage-full-precision-llm-inference",
    name: "Afterimage",
    repo: "Afterimage",
    field: "Inference systems",
    outcome: "Run large, full-precision models on smaller GPUs.",
    detail:
      "It ran a 29.5 GB model on an 8 GB GPU by streaming losslessly compressed weights one layer at a time.",
    tags: ["Lossless compression", "CUDA memory streaming", "Inference research"],
    visual: "afterimage",
  },
  {
    slug: "localdeploy-local-ai-models",
    name: "LocalDeploy",
    repo: "LocalDeploy",
    field: "Local AI",
    outcome: "A complete local model deployment and benchmarking suite.",
    detail:
      "It checks your hardware, estimates which models fit, and measures the speed, quality, and memory you actually get.",
    tags: ["Hardware-aware deployment", "Model benchmarking", "Runtime orchestration"],
    visual: "localdeploy",
  },
  {
    slug: "agentgymnasium-ai-agent-physics-sandbox",
    name: "AgentGymnasium",
    repo: "AgentGymnasium",
    field: "Agent evaluation",
    outcome: "Watch an agent build, then compare what changed.",
    detail:
      "Run a physics challenge, inspect the agent's tool calls, and compare recorded attempts.",
    tags: ["Agent evaluation", "Physics challenges", "Recorded evidence"],
    visual: "agentgymnasium",
    replay: "https://oney-physics-replays.hazycow18.chatgpt.site/agentgymnasium.html",
  },
  {
    slug: "creature-lab-robot-morphology",
    name: "Creature Lab",
    repo: "Creature-Lab",
    field: "Robotics",
    outcome: "Build a robot and investigate why it fails.",
    detail:
      "Change a body, gait, or task, then compare and share the recorded evidence.",
    tags: ["Robot design", "Failure lessons", "Reproducible trials"],
    visual: "creature",
    replay: "https://oney-physics-replays.hazycow18.chatgpt.site/creature-lab.html",
  },
  {
    slug: "segcraft-semantic-segmentation",
    name: "SegCraft",
    repo: "SegCraft-Semantic-Segmentation",
    field: "Computer vision",
    outcome: "Train, compare, and run semantic segmentation from one platform.",
    detail:
      "One setup trains a segmentation model, compares it, and runs it on images or videos.",
    tags: ["Semantic segmentation", "Model comparison", "Video inference"],
    visual: "segcraft",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
