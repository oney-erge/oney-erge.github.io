import styles from "./page.module.css";

const GITHUB = "https://github.com/oney-erge";
const SCHOLAR = "https://scholar.google.com/citations?user=x0tT7L4AAAAJ";
const LINKEDIN = "https://www.linkedin.com/in/oneyerge/";

type Project = {
  name: string;
  repo: string;
  blurb: string;
  tags: string[];
  stars?: number;
};

// The six pinned repositories, in the order they appear on the GitHub profile.
const projects: Project[] = [
  {
    name: "YBM",
    repo: "YBM",
    blurb:
      "A local agent-control system driven from a messaging app. Applies policy, schedules work, and invokes coding agents and tools across the browser, desktop, and filesystem.",
    tags: ["Python", "FastAPI", "Agents"],
    stars: 1,
  },
  {
    name: "Afterimage",
    repo: "Afterimage",
    blurb:
      "Runs a 27B model on an 8 GB GPU by compressing weights losslessly and streaming them, caching what the weights did rather than the weights themselves. No quantization, no accuracy loss.",
    tags: ["Python", "Inference", "PyTorch"],
  },
  {
    name: "LocalDeploy",
    repo: "LocalDeploy",
    blurb:
      "Discover, run, monitor, and benchmark models on your own hardware, through a browser UI and an OpenAI-compatible API. Integrates Ollama, llama.cpp, LM Studio, and vLLM.",
    tags: ["Python", "Local models", "Benchmarking"],
  },
  {
    name: "SegCraft",
    repo: "SegCraft-Semantic-Segmentation",
    blurb:
      "A config-first semantic segmentation toolkit: training, evaluation, and image or video inference driven entirely from reusable YAML workflows.",
    tags: ["PyTorch", "Computer vision"],
    stars: 2,
  },
  {
    name: "Agentarium",
    repo: "Agentarium",
    blurb:
      "A visual physics sandbox where agents build objects in small simulated worlds, run them, observe the outcome, and revise their designs across multiple attempts.",
    tags: ["Python", "Simulation", "Agents"],
  },
  {
    name: "Creature-Lab",
    repo: "Creature-Lab",
    blurb:
      "Design, simulate, evolve, and replay modular robot-creatures. Every creature, task, controller, and episode stays inspectable and reproducible.",
    tags: ["PyBullet", "Robotics"],
  },
];

type Paper = {
  title: string;
  year: string;
  citations: number;
};

// Most-cited work, ordered newest first so the physics -> hybrid -> ML arc reads top to bottom.
const papers: Paper[] = [
  {
    title:
      "Combining physics-based and data-driven modeling in well construction: Hybrid fluid dynamics modeling",
    year: "2022",
    citations: 65,
  },
  {
    title:
      "Modeling the effects of drillstring eccentricity, pipe rotation and annular blockage on cuttings transport in deviated wells",
    year: "2020",
    citations: 49,
  },
  {
    title:
      "The effects of drillstring eccentricity, rotation, and buckling configurations on annular frictional pressure losses while circulating yield-power-law fluids",
    year: "2015",
    citations: 133,
  },
  {
    title:
      "Frictional pressure loss of drilling fluids in a fully eccentric annulus",
    year: "2015",
    citations: 52,
  },
  {
    title:
      "Effect of drillstring deflection and rotary speed on annular frictional pressure losses",
    year: "2013",
    citations: 73,
  },
];

type Role = {
  org: string;
  role: string;
};

const background: Role[] = [
  { org: "Deloitte", role: "Senior Data Scientist, AI Operations" },
  { org: "Elsevier", role: "Data Scientist" },
  { org: "Advanced Robotics Group", role: "Data Scientist / Robotics Software Engineer" },
  { org: "Schlumberger", role: "Data Scientist / Software Engineer" },
  { org: "UT Austin", role: "PhD, Mechanical Engineering" },
];

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#work">
        Skip to selected work
      </a>

      <header className={styles.intro}>
        <img
          className={styles.avatar}
          src="/media/oney-erge.jpg"
          alt=""
          width={72}
          height={72}
        />

        <h1>Oney Erge</h1>
        <p className={styles.role}>
          AI Manager, Language Modeling Engineering
        </p>

        <ul className={styles.credentials}>
          <li>PhD, UT Austin</li>
          <li>872 citations</li>
          <li>h-index 15</li>
          <li>Houston, TX</li>
        </ul>

        <p className={styles.lede}>
          I work on language models and agent systems. Before that, roughly a
          decade on physics-based and hybrid modeling for well construction —
          fluid dynamics, control, and the messy business of making models
          agree with instrumented reality.
        </p>

        <nav className={styles.links} aria-label="Profiles">
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
          <a href={SCHOLAR} target="_blank" rel="noreferrer">
            Google Scholar <Arrow />
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn <Arrow />
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.section} aria-labelledby="now-heading">
          <h2 id="now-heading">Now</h2>
          <p className={styles.prose}>
            Building local-first agent tooling — systems that run models on
            your own hardware, keep tool execution policy-bound, and stay
            inspectable end to end. Most of it is open source below.
          </p>
        </section>

        <section className={styles.section} id="work" aria-labelledby="work-heading">
          <h2 id="work-heading">Selected work</h2>
          <ul className={styles.projects}>
            {projects.map((project) => (
              <li key={project.repo}>
                <a
                  className={styles.project}
                  href={`${GITHUB}/${project.repo}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={styles.projectHead}>
                    <h3>
                      {project.name}
                      <Arrow />
                    </h3>
                    {project.stars ? (
                      <span className={styles.stars} title={`${project.stars} stars`}>
                        ★ {project.stars}
                      </span>
                    ) : null}
                  </div>
                  <p>{project.blurb}</p>
                  <ul className={styles.tags}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="research-heading">
          <h2 id="research-heading">Research</h2>
          <p className={styles.prose}>
            872 citations, h-index 15, i10-index 22. The through-line from
            drilling fluid dynamics to hybrid physics/data modeling is the same
            problem I work on now: getting a learned model to respect what is
            physically true.
          </p>
          <ul className={styles.papers}>
            {papers.map((paper) => (
              <li key={paper.title}>
                <span className={styles.year}>{paper.year}</span>
                <span className={styles.paperTitle}>{paper.title}</span>
                <span className={styles.cites}>{paper.citations}</span>
              </li>
            ))}
          </ul>
          <a
            className={styles.textLink}
            href={SCHOLAR}
            target="_blank"
            rel="noreferrer"
          >
            All publications on Google Scholar <Arrow />
          </a>
        </section>

        <section className={styles.section} aria-labelledby="background-heading">
          <h2 id="background-heading">Background</h2>
          <ul className={styles.background}>
            {background.map((item) => (
              <li key={item.org}>
                <span className={styles.org}>{item.org}</span>
                <span className={styles.orgRole}>{item.role}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Oney Erge</p>
        <p>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            github.com/oney-erge
          </a>
        </p>
      </footer>
    </div>
  );
}
