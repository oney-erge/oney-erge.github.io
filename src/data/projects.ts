export type ProjectVisual =
  | "ybm"
  | "afterimage"
  | "localdeploy"
  | "agentarium"
  | "creature"
  | "segcraft";

export type Project = {
  slug: string;
  name: string;
  repo: string;
  field: string;
  status: string;
  headline: string;
  description: string;
  plainLanguage: string;
  technicalSummary: string;
  tryIt: string;
  proof: string;
  tags: string[];
  visual: ProjectVisual;
  image: string;
  socialImage: string;
  seoTitle: string;
  seoDescription: string;
  searchIntent: string;
  question: string;
  overview: string[];
  workflow: Array<{ label: string; detail: string }>;
  decisions: Array<{ title: string; detail: string }>;
  evidence: string[];
  limits: string;
};

export const projects: Project[] = [
  {
    slug: "ybm-local-ai-agent",
    name: "YBM",
    repo: "YBM",
    field: "Agent systems",
    status: "Alpha product",
    headline: "A local agent for completing real work on your computer.",
    description:
      "YBM runs on your machine and handles files, browser work, scheduled tasks, and longer jobs. You choose what it can access and approve important actions before they run.",
    plainLanguage:
      "YBM helps you complete file, browser, and long-running tasks from the web, Telegram, or WhatsApp while keeping important actions under your control.",
    technicalSummary:
      "It plans the task, asks before important actions, runs only enabled tools, verifies the result, and records what happened.",
    tryIt:
      "Install YBM, choose a model in the browser, then start with a small task such as organizing a test folder.",
    proof: "File and browser tasks · Long-running work · Reviewable actions",
    tags: ["Policy-gated tools", "Self-extending workflows", "Local-first"],
    visual: "ybm",
    image: "/media/ybm-demo.gif",
    socialImage: "/media/ybm-social.png",
    seoTitle: "YBM Local AI Agent with Policy-Gated Computer Tools",
    seoDescription:
      "YBM is a local AI agent for files, browsers, desktop work, and long tasks, with per-tool policy checks, short-lived approvals, verification, and receipts.",
    searchIntent: "Local AI agent safety and computer automation",
    question:
      "YBM turns a request into an approved and verified computer task.",
    overview: [
      "YBM turns a message into either a direct reply or a traceable task on the user's machine. It can work through the web, Telegram, or WhatsApp while sharing one backend for orchestration, policy, persistence, and evidence.",
      "The core design is a five-stage contract. A task is planned, shown for approval when it is consequential, executed through explicitly enabled tools, checked against the resulting evidence, and closed with a receipt.",
    ],
    workflow: [
      { label: "Plan", detail: "Show the task and the files or apps involved." },
      { label: "Approve", detail: "Ask before important actions." },
      { label: "Execute", detail: "Use only the tools and access you enabled." },
      { label: "Verify", detail: "Check the result against files and tool output." },
      { label: "Receipt", detail: "Show what changed and what remains uncertain." },
    ],
    decisions: [
      {
        title: "Capability policy is part of execution",
        detail:
          "Filesystem, terminal, browser, desktop, dependency, and publishing abilities are separate controls. Enabling one adapter does not bypass the policy on the underlying capability.",
      },
      {
        title: "Access expires",
        detail:
          "High-impact abilities start disabled, filesystem access is limited to chosen roots, and approvals are short-lived instead of standing grants.",
      },
      {
        title: "Evidence survives the conversation",
        detail:
          "Each task retains tool results, approvals, timing, costs, and an audit trail so a result can be inspected after the chat has moved on.",
      },
    ],
    evidence: [
      "Web, Telegram, and WhatsApp channels feed the same task pipeline.",
      "Twelve local and hosted model providers are supported, including custom OpenAI-compatible endpoints.",
      "Installers are available for Windows, macOS, Linux, and headless Docker use.",
    ],
    limits:
      "YBM is alpha software and is tested most heavily on Windows. Desktop control is Windows-only. Review access settings before use.",
  },
  {
    slug: "afterimage-full-precision-llm-inference",
    name: "Afterimage",
    repo: "Afterimage",
    field: "Inference systems",
    status: "Research system",
    headline: "Run large, full-precision models on smaller GPUs.",
    description:
      "A research toolbox for testing lossless compression, streaming, and speculative methods beyond VRAM. A measured 29.5 GB Qwen3-14B BF16 model ran on an 8 GB GPU, with some tested modes outperforming AirLLM and Hugging Face Accelerate.",
    plainLanguage:
      "Run a model larger than GPU memory without reducing the precision of its stored weights by loading only the layers needed at each moment.",
    technicalSummary:
      "Lossless weight storage and layerwise CUDA streaming executed a 29.536 GB BF16 model on an 8 GB GPU. The tradeoff is disk-bound latency measured in seconds per token.",
    tryIt:
      "Run the estimator for your model and hardware, then compare a supported exact mode with a named baseline.",
    proof: "29.5 GB model on 8 GB GPU · Lossless weights",
    tags: ["Lossless compression", "CUDA memory streaming", "Inference research"],
    visual: "afterimage",
    image: "/media/afterimage-streaming.webp",
    socialImage: "/media/afterimage-social.png",
    seoTitle: "Afterimage Full-Precision LLM Inference Beyond GPU VRAM",
    seoDescription:
      "Afterimage losslessly compresses and streams BF16 model weights, running a measured 29.5 GB model on an 8 GB GPU without weight quantization.",
    searchIntent: "Run full-precision LLMs that exceed GPU VRAM",
    question:
      "How can a full-precision language model run when its original weights are much larger than GPU memory?",
    overview: [
      "Afterimage compresses model weights losslessly and streams them through the GPU one layer at a time. It is intended for research, evaluation, and offline generation where preserving the original BF16 weights matters more than chat-speed latency.",
      "The project exposes the same engine through a CLI, browser interface, Python API, and OpenAI-compatible server. An opt-in research lab records hypotheses, controls, raw results, and negative findings alongside improvements.",
    ],
    workflow: [
      { label: "Inspect", detail: "Estimate download, store, host memory, and VRAM requirements." },
      { label: "Compress", detail: "Build a lossless on-disk store from the original model weights." },
      { label: "Plan", detail: "Choose exact residency and optional speculative decoding settings." },
      { label: "Stream", detail: "Move each required layer through the available GPU memory." },
      { label: "Measure", detail: "Record latency, peak memory, exactness, and named baselines." },
    ],
    decisions: [
      {
        title: "Exactness is explicit",
        detail:
          "Reference-equivalent, greedy-token-exact, distribution-exact, and approximate modes are labeled instead of being presented as interchangeable.",
      },
      {
        title: "Memory limits fail early",
        detail:
          "A user sets VRAM and optional host-RAM budgets. Infeasible exact plans fail before generation instead of silently changing the requested contract.",
      },
      {
        title: "Baselines stay visible",
        detail:
          "Afterimage is compared with AirLLM and Hugging Face Accelerate at named operating points, including cases where a baseline wins.",
      },
    ],
    evidence: [
      "A 29.536 GB Qwen3-14B BF16 model ran on an 8 GB RTX 3080 Laptop GPU.",
      "The measured fixed-speculation point used 3.813 GB peak VRAM at 9.150 seconds per token.",
      "The lossless store reduced the reference weights to 20.328 GB, a 1.453x reduction.",
    ],
    limits:
      "The system is disk-bound and runs at seconds per token. It is not a substitute for an in-memory engine when the model already fits, and its verified architecture support is narrower than general-purpose runtimes.",
  },
  {
    slug: "localdeploy-local-ai-models",
    name: "LocalDeploy",
    repo: "LocalDeploy",
    field: "Local AI",
    status: "Released tool",
    headline: "A complete local model deployment and benchmarking suite.",
    description:
      "Inspect hardware, estimate which models fit, find and pull them from one UI, manage compatible runtimes, and measure speed, quality, and memory.",
    plainLanguage:
      "LocalDeploy checks your computer, recommends models likely to fit, installs them, and measures how they actually perform.",
    technicalSummary:
      "Hardware detection, memory-fit estimation, runtime adapters, and repeatable benchmarks connect model selection with local serving across several inference runtimes.",
    tryIt:
      "Let LocalDeploy inspect your hardware, deploy a recommended model, then record a repeatable benchmark.",
    proof: "Hardware fit · Runtime control · Repeatable benchmarks",
    tags: ["Hardware-aware deployment", "Model benchmarking", "Runtime orchestration"],
    visual: "localdeploy",
    image: "/media/localdeploy-demo.gif",
    socialImage: "/media/localdeploy-social.png",
    seoTitle: "LocalDeploy Local AI Model Selection and Benchmarking",
    seoDescription:
      "LocalDeploy detects hardware, estimates model fit, manages local AI models, and compares accuracy, latency, throughput, and memory from one private interface.",
    searchIntent: "Choose and benchmark local AI models for your hardware",
    question:
      "Which local AI model will fit this machine, and what does it actually deliver once it runs?",
    overview: [
      "LocalDeploy is a local web interface and API for the uncertain part of local inference: selecting a model for a particular machine, estimating whether it fits, deploying it, and comparing real runs.",
      "It works with Ollama, llama.cpp, LM Studio, vLLM, Docker Model Runner, and loopback OpenAI-compatible runtimes. Prompts, responses, hardware details, and benchmark results stay local unless the user explicitly invokes a feature that searches public model catalogs.",
    ],
    workflow: [
      { label: "Detect", detail: "Inspect CPU, RAM, GPU type, VRAM, and compatible multi-GPU layouts." },
      { label: "Search", detail: "Compare Ollama, Hugging Face, ModelScope, and direct GGUF options." },
      { label: "Estimate", detail: "Explain memory fit and when CPU offload is likely before download." },
      { label: "Deploy", detail: "Pull, start, switch, unload, and monitor the selected local model." },
      { label: "Benchmark", detail: "Compare accuracy, latency, throughput, and observed memory." },
    ],
    decisions: [
      {
        title: "Estimates are guidance, measurements are history",
        detail:
          "Drivers, context length, desktop GPU use, and quantization change actual fit. Observed memory is recorded so later estimates can adapt to that machine.",
      },
      {
        title: "Local means loopback",
        detail:
          "Runtime URLs are checked in code and non-local addresses are rejected. An offline mode disables model search and release checks.",
      },
      {
        title: "One surface, several runtimes",
        detail:
          "OpenAI-compatible routes and native lifecycle endpoints give other local tools a stable interface without hiding the active runtime.",
      },
    ],
    evidence: [
      "Hardware detection covers NVIDIA, AMD, Intel, and Apple Silicon.",
      "Repeatable reports capture quality, latency, throughput, placement, and memory use.",
      "The package is published on PyPI and provides native launch paths for Windows, macOS, Linux, and Docker.",
    ],
    limits:
      "Fit estimates cannot account perfectly for every driver, runtime, context, or background workload. The local server is not designed to be exposed directly to the public internet.",
  },
  {
    slug: "agentarium-ai-agent-physics-sandbox",
    name: "Agentarium",
    repo: "Agentarium",
    field: "Agent evaluation",
    status: "Simulation platform",
    headline: "Bring AI agents and physics into the same experiment.",
    description:
      "Give an agent a simulated world, explicit tools, and physical challenges, then measure what it builds, what happens, and how its next attempt changes.",
    plainLanguage:
      "An AI agent builds something in a simulated world, sees what happened, and gets another chance to improve it.",
    technicalSummary:
      "Validated tools produce engine-neutral episode traces. Named reward functions and paired model-by-seed trials make behavior replayable and statistically comparable.",
    tryIt:
      "Choose a reference challenge, run one agent trial, then replay the trace and inspect the score.",
    proof: "24 explicit tools · Explainable scores · Replayable trials",
    tags: ["Agent evaluation", "Physics simulation", "Reproducible trials"],
    visual: "agentarium",
    image: "/media/agentarium-city.png",
    socialImage: "/media/agentarium-social.png",
    seoTitle: "Agentarium AI Agent Evaluation in Physics Simulations",
    seoDescription:
      "Agentarium is a visual AI physics sandbox for replayable agent experiments, validated tools, explainable scoring, and paired model evaluation.",
    searchIntent: "Evaluate AI agents in reproducible physics simulations",
    question:
      "How do you evaluate an agent that must build, observe a physical result, and improve its own design?",
    overview: [
      "Agentarium gives an AI agent a challenge, a simulated world, an engine, and a set of explicit tools. The design is validated, simulated, replayed, and scored before the agent receives evidence for its next attempt.",
      "The visual interface connects setup, live simulation, durable history, paired experiments, synchronized comparison, physical adapters, and a deterministic catalog of reference scenes.",
    ],
    workflow: [
      { label: "Configure", detail: "Choose the world, task, protocol, model, tools, and resource bounds." },
      { label: "Build", detail: "Require every design mutation to pass one validated tool boundary." },
      { label: "Simulate", detail: "Run the candidate design and capture an engine-neutral episode trace." },
      { label: "Explain", detail: "Convert named trace metrics into a scorecard and improvement hint." },
      { label: "Compare", detail: "Replay paired runs with configuration, tokens, latency, and score deltas." },
    ],
    decisions: [
      {
        title: "The trace is the stable interface",
        detail:
          "Rendering and analysis consume an EpisodeTrace rather than an engine-specific object, leaving room for multiple simulation backends.",
      },
      {
        title: "Evaluation is reproducible",
        detail:
          "Provider, model, seed, protocol, benchmark fingerprint, prompts, tool results, token usage, retries, and latency are retained per run.",
      },
      {
        title: "Scores explain themselves",
        detail:
          "Named reward functions expose their contributing metrics and a concrete next step instead of reducing the run to one unexplained number.",
      },
    ],
    evidence: [
      "Twenty-four explicit tools cover building, sensing, control, physics, inspection, and evolution.",
      "Paired model by seed by repeat matrices report confidence intervals and win, tie, and loss deltas.",
      "Four reference challenges test construction, locomotion, classification, and spatial layout behavior.",
    ],
    limits:
      "Simulation evidence is not physical certification. The optional robot gateway requires independent hardware-side limits, watchdogs, collision avoidance, and an emergency stop.",
  },
  {
    slug: "creature-lab-robot-morphology",
    name: "Creature Lab",
    repo: "Creature-Lab",
    field: "Robotics",
    status: "Local workbench",
    headline: "Design, evolve, and test robot bodies in physics.",
    description:
      "Modify humanoids, quadrupeds, and other robot bodies, evolve morphology and control, diagnose failures, and share a reproducible experiment pack.",
    plainLanguage:
      "Design a robot body, run it in physics, and identify whether the body, controller, task, or simulator caused a failure.",
    technicalSummary:
      "Portable morphology, task, and controller specifications support perturbation tests, backend counterfactuals, trace-based diagnosis, and reproducible experiment exports.",
    tryIt:
      "Choose a bundled creature and task, run the simulation, then inspect the failure diagnosis.",
    proof: "Humanoids and quadrupeds · Evolution · PyBullet",
    tags: ["Robot morphology", "Evolutionary search", "PyBullet"],
    visual: "creature",
    image: "/media/creature-lab-demo.gif",
    socialImage: "/media/creature-social.png",
    seoTitle: "Creature Lab Robot Morphology Simulation and Failure Analysis",
    seoDescription:
      "Creature Lab is a local robot morphology workbench for simulation, failure diagnosis, robustness checks, and reproducible experiment packs.",
    searchIntent: "Diagnose failures in robot morphology experiments",
    question:
      "Did a robot experiment fail because of its body, controller, task, fragility, or the simulator?",
    overview: [
      "Creature Lab is a local, failure-first workbench for robot morphology experiments. It treats diagnosis and reproducibility as primary outputs, not cleanup steps after a simulation.",
      "Creatures, tasks, controllers, traces, hashes, and runtime provenance can be packaged into a minimum reproducible robot experiment that another person can inspect and rerun.",
    ],
    workflow: [
      { label: "Design", detail: "Start from a curated body or edit a portable creature specification." },
      { label: "Run", detail: "Execute a measured controller against an explicit task in physics." },
      { label: "Autopsy", detail: "Test controller, task, perturbation, and backend counterfactuals." },
      { label: "Improve", detail: "Edit, search, or optimize the body and gait from the diagnosis." },
      { label: "Share", detail: "Export the exact experiment, trace, hashes, and provenance." },
    ],
    decisions: [
      {
        title: "Failure is a result",
        detail:
          "The system attributes likely causes and recommends the next experiment instead of treating a low score as an uninformative endpoint.",
      },
      {
        title: "Specifications remain portable",
        detail:
          "Every creature, task, and controller is represented as inspectable data. The simulator sits behind an adapter rather than defining the whole project.",
      },
      {
        title: "Robustness is measured",
        detail:
          "Perturbation trials, backend comparisons, qualification profiles, and intentionally broken examples make fragility visible.",
      },
    ],
    evidence: [
      "A browser editor connects body design, validation, simulation, diagnosis, and robustness checks.",
      "The bundled zoo includes quadruped, worm, hexapod, tripod, damaged quadruped, and humanoid examples.",
      "Verified export packs preserve the experiment inputs, trace, hashes, scores, contacts, and runtime warnings.",
    ],
    limits:
      "Creature Lab is an educational and early-prototyping tool. It is not a hardware qualification system, cloud service, or GPU-scale reinforcement learning platform.",
  },
  {
    slug: "segcraft-semantic-segmentation",
    name: "SegCraft",
    repo: "SegCraft-Semantic-Segmentation",
    field: "Computer vision",
    status: "Vision toolkit",
    headline: "Train, compare, and deploy semantic segmentation workflows.",
    description:
      "Use ready-to-run presets and model backends for training, evaluation, comparison, and image, video, or YouTube inference from one platform.",
    plainLanguage:
      "Use one setup to train a segmentation model, compare it, and run it on images or videos.",
    technicalSummary:
      "Layered YAML configuration drives consistent model, data, evaluation, and inference contracts across CLI, Python, and web interfaces with optional model backends.",
    tryIt:
      "Choose a preset, run the environment check, then test inference on an image or video.",
    proof: "Model presets · Comparative evaluation · Video workflows",
    tags: ["Semantic segmentation", "Model comparison", "Video inference"],
    visual: "segcraft",
    image: "/media/segcraft-demo-animated.webp",
    socialImage: "/media/segcraft-social.png",
    seoTitle: "SegCraft Config-First Semantic Segmentation Toolkit",
    seoDescription:
      "SegCraft uses one YAML configuration for semantic segmentation training, evaluation, image and video inference, CLI use, Python, and a web interface.",
    searchIntent: "Reusable semantic segmentation training and video inference",
    question:
      "How do you stop semantic segmentation training, evaluation, and video inference from becoming separate workflows?",
    overview: [
      "SegCraft uses a layered YAML configuration across model training, evaluation, image prediction, video prediction, the Python API, and an optional browser interface.",
      "Presets cover quick CPU checks, quality training, binary segmentation, Cityscapes, PASCAL VOC, ADE20K, and segmentation-models-pytorch workflows while a local override keeps machine-specific paths out of source control.",
    ],
    workflow: [
      { label: "Configure", detail: "Merge a base configuration, a reusable preset, and a local override." },
      { label: "Validate", detail: "Check the environment, task shape, model backend, and device visibility." },
      { label: "Train", detail: "Run a consistent model, data, schedule, and metrics configuration." },
      { label: "Evaluate", detail: "Measure the same configured task without rebuilding the pipeline." },
      { label: "Infer", detail: "Produce masks, overlays, comparison video, and a machine-readable summary." },
    ],
    decisions: [
      {
        title: "Configuration is the contract",
        detail:
          "The CLI, Python API, notebooks, and web app resolve the same preset and local overrides so interfaces do not invent their own defaults.",
      },
      {
        title: "Backends remain optional",
        detail:
          "TorchVision, segmentation-models-pytorch, Transformers, video, and web dependencies are installed only for the workflows that need them.",
      },
      {
        title: "Outputs are inspectable",
        detail:
          "Video inference writes the original, overlay, comparison, and summary metadata rather than exposing only an on-screen preview.",
      },
    ],
    evidence: [
      "Preset names work consistently in the CLI, Python API, and browser interface.",
      "The environment doctor reports Python, Torch, CUDA, and visible GPU details before a long run.",
      "Image and video workflows retain masks, overlays, comparison media, and JSON summaries.",
    ],
    limits:
      "Model quality still depends on the selected architecture, checkpoint, labels, and dataset. Device auto-selection can fall back to CPU, which is functional but may be slow for video workloads.",
  },
];

export const featuredProjects = projects.slice(0, 3);
export const moreProjects = projects.slice(3);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
