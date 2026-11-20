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
  /** Text of the replay link; defaults to "Watch recorded replay". */
  replayLabel?: string;
  /** A page of this site that runs the project in the browser, and the text of its link. */
  demo?: string;
  demoLabel?: string;
};

export const projects: Project[] = [
  {
    slug: "ybm-local-ai-agent",
    name: "YBM",
    repo: "YBM",
    field: "Agent systems",
    outcome: "An assistant for your own computer that runs on a local model.",
    detail:
      "Message it from the web, Telegram, or WhatsApp. It works on your files, web pages, and programs, and records what it did.",
    tags: ["Local 9B model", "Approvals and receipts", "Measured results"],
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
    outcome: "Stress-test a real robot, see why it fell, and prove the fix.",
    detail:
      "Runs published robots with their own trained policies, explains each fall, and tests the fix.",
    tags: ["Real robots", "Fall diagnosis", "What-if runs"],
    visual: "creature",
    replay: "/media/creature-lab-tour.mp4",
    replayLabel: "Watch the 1-minute tour",
    demo: "/demo/creature-lab/",
    demoLabel: "Try the recorded demo",
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
