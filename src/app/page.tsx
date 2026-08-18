"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Category = "all" | "ai-data" | "simulation" | "infrastructure";

type Project = {
  number: string;
  name: string;
  displayName: string;
  category: Exclude<Category, "all">;
  categoryLabel: string;
  description: string;
  proof: string;
  tags: string[];
  url: string;
  visual:
    | "classifier"
    | "stocks"
    | "socket"
    | "metascout"
    | "creature"
    | "readiness";
  featured?: boolean;
  private?: boolean;
};

const filters: { label: string; value: Category }[] = [
  { label: "All work", value: "all" },
  { label: "AI + data", value: "ai-data" },
  { label: "Simulation", value: "simulation" },
  { label: "Infrastructure", value: "infrastructure" },
];

const projects: Project[] = [
  {
    number: "01",
    name: "MetaScout",
    displayName: "MetaScout",
    category: "ai-data",
    categoryLabel: "Enterprise data intelligence",
    description:
      "Map, enrich, and connect enterprise data before building AI on it—without moving raw data by default.",
    proof:
      "Cross-source relationship discovery, evidence-bound enrichment, readiness reports, and on-prem deployment.",
    tags: ["Python", "Metadata", "RAG", "On-prem"],
    url: "https://github.com/iodriller/MetaScout",
    visual: "metascout",
    featured: true,
    private: true,
  },
  {
    number: "02",
    name: "Creature-Lab",
    displayName: "Creature Lab",
    category: "simulation",
    categoryLabel: "Robotics + simulation",
    description:
      "A failure-first local workbench for designing, simulating, evolving, and replaying modular robot-creatures.",
    proof:
      "Every creature, task, controller, and episode stays inspectable, reproducible, and portable.",
    tags: ["PyBullet", "Robotics", "Python", "Offline"],
    url: "https://github.com/iodriller/Creature-Lab",
    visual: "creature",
    featured: true,
  },
  {
    number: "03",
    name: "StockPredictor-AI-Assistant",
    displayName: "StockPredictor",
    category: "ai-data",
    categoryLabel: "Trading research",
    description:
      "A configuration-first trading workbench for prediction, signal fusion, risk plans, backtesting, and local LLM news analysis.",
    proof:
      "Combines a FastAPI service, Streamlit dashboard, market context, journal, and reproducible analysis snapshots.",
    tags: ["FastAPI", "Streamlit", "Time series", "Local LLM"],
    url: "https://github.com/iodriller/StockPredictor-AI-Assistant",
    visual: "stocks",
  },
  {
    number: "04",
    name: "ai-readiness-lab",
    displayName: "AI Readiness Lab",
    category: "ai-data",
    categoryLabel: "Executive strategy",
    description:
      "Research a market, score AI readiness, surface practical pilots, and turn a selected idea into an executive-ready plan.",
    proof:
      "A cross-platform desktop workbench for competitive intelligence, pilot design, and risk-aware decision support.",
    tags: ["FastAPI", "Desktop", "Research", "Strategy"],
    url: "https://github.com/iodriller/ai-readiness-lab",
    visual: "readiness",
  },
  {
    number: "05",
    name: "image-classifier-web-search",
    displayName: "zero-label",
    category: "ai-data",
    categoryLabel: "Applied computer vision",
    description:
      "Type what you want to classify. It finds the images, trains the model, and returns a working classifier.",
    proof:
      "DuckDuckGo image collection, EfficientNet fine-tuning, a clean CLI, Python API, and Gradio demo.",
    tags: ["PyTorch", "EfficientNet", "Gradio", "Computer vision"],
    url: "https://github.com/iodriller/image-classifier-web-search",
    visual: "classifier",
  },
  {
    number: "06",
    name: "VueJs-Flask-SocketIO-Example-Template",
    displayName: "Vue × Flask Socket",
    category: "infrastructure",
    categoryLabel: "Real-time starter",
    description:
      "A compact, current foundation for a Vue 3 client talking to Flask-SocketIO over WebSockets.",
    proof:
      "Container-ready, CI-verified, and maintained by Dependabot across Python, Node, and GitHub Actions.",
    tags: ["Vue 3", "Flask", "WebSockets", "Dependabot"],
    url: "https://github.com/iodriller/VueJs-Flask-SocketIO-Example-Template",
    visual: "socket",
  },
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.92-1.3 2.76-1.02 2.76-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c.5 6.03 3.97 9.5 10 10-6.03.5-9.5 3.97-10 10-.5-6.03-3.97-9.5-10-10 6.03-.5 9.5-3.97 10-10Z" />
    </svg>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "metascout") {
    return (
      <div className={`${styles.visual} ${styles.metascoutVisual}`}>
        <div className={styles.windowBar}>
          <span />
          <span />
          <span />
          <small>DATA ESTATE / OVERVIEW</small>
        </div>
        <Image
          src="/media/metascout-dashboard.png"
          alt="MetaScout data estate overview dashboard"
          fill
          sizes="(max-width: 760px) 100vw, 66vw"
          className={styles.productImage}
          priority
        />
        <div className={styles.visualStamp}>582 assets mapped</div>
      </div>
    );
  }

  if (project.visual === "creature") {
    return (
      <div className={`${styles.visual} ${styles.creatureVisual}`}>
        <Image
          src="/media/creature-lab-demo.gif"
          alt="Creature Lab robot simulation"
          fill
          unoptimized
          sizes="(max-width: 760px) 100vw, 50vw"
          className={styles.creatureImage}
        />
        <div className={styles.creatureHud}>
          <span>RUN_0042</span>
          <span className={styles.liveDot}>SIMULATING</span>
        </div>
        <div className={styles.creatureMetric}>
          <strong>0.82</strong>
          <span>stability score</span>
        </div>
      </div>
    );
  }

  if (project.visual === "stocks") {
    return (
      <div className={`${styles.visual} ${styles.stockVisual}`}>
        <div className={styles.stockTopline}>
          <div>
            <span>ACTIVE ANALYSIS</span>
            <strong>AAPL / SWING</strong>
          </div>
          <div className={styles.signalBadge}>BUY · 74</div>
        </div>
        <svg
          className={styles.stockChart}
          viewBox="0 0 640 230"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g className={styles.chartGrid}>
            <path d="M0 38H640M0 96H640M0 154H640M0 212H640" />
            <path d="M80 0V230M200 0V230M320 0V230M440 0V230M560 0V230" />
          </g>
          <path
            className={styles.chartShadow}
            d="M0 190 C45 176 55 195 92 174 S146 136 183 150 S229 121 265 135 S320 102 354 110 S393 72 430 91 S473 62 503 68 S548 29 581 48 S615 28 640 18"
          />
          <path
            className={styles.chartLine}
            d="M0 190 C45 176 55 195 92 174 S146 136 183 150 S229 121 265 135 S320 102 354 110 S393 72 430 91 S473 62 503 68 S548 29 581 48 S615 28 640 18"
          />
          <circle cx="581" cy="48" r="6" />
        </svg>
        <div className={styles.stockStats}>
          <span>
            <small>RISK / REWARD</small>
            <b>1 : 2.4</b>
          </span>
          <span>
            <small>MODEL FUSION</small>
            <b>5 signals</b>
          </span>
          <span>
            <small>CONTEXT</small>
            <b>aligned</b>
          </span>
        </div>
      </div>
    );
  }

  if (project.visual === "readiness") {
    const cells = Array.from({ length: 24 }, (_, index) => index);
    return (
      <div className={`${styles.visual} ${styles.readinessVisual}`}>
        <div className={styles.readinessHeading}>
          <span>READINESS PROFILE</span>
          <strong>68<span>/100</span></strong>
        </div>
        <div className={styles.readinessMatrix} aria-hidden="true">
          {cells.map((cell) => (
            <span
              key={cell}
              className={
                cell < 16
                  ? styles.matrixOn
                  : cell === 18 || cell === 19
                    ? styles.matrixWarn
                    : ""
              }
            />
          ))}
        </div>
        <div className={styles.readinessAxis}>
          <span>Data</span>
          <span>Talent</span>
          <span>Governance</span>
          <span>Delivery</span>
        </div>
        <div className={styles.pilotCard}>
          <span>PRIORITY PILOT</span>
          <strong>Knowledge operations copilot</strong>
          <small>Feasibility high · 8–12 weeks</small>
        </div>
      </div>
    );
  }

  if (project.visual === "classifier") {
    return (
      <div className={`${styles.visual} ${styles.classifierVisual}`}>
        <div className={styles.searchPrompt}>
          <span>train</span>
          <code>&quot;golden retriever&quot; &quot;husky&quot;</code>
          <b>↵</b>
        </div>
        <div className={styles.imageSamples} aria-hidden="true">
          <span className={styles.sampleOne}>01</span>
          <span className={styles.sampleTwo}>02</span>
          <span className={styles.sampleThree}>03</span>
          <span className={styles.sampleFour}>04</span>
          <span className={styles.sampleFive}>05</span>
          <span className={styles.sampleSix}>06</span>
        </div>
        <div className={styles.modelFlow}>
          <span>WEB SEARCH</span>
          <i>→</i>
          <span>DATASET</span>
          <i>→</i>
          <span>MODEL</span>
        </div>
        <div className={styles.confidence}>
          <div>
            <span>golden retriever</span>
            <b>94.2%</b>
          </div>
          <i><span /></i>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.visual} ${styles.socketVisual}`}>
      <div className={styles.socketNodes} aria-hidden="true">
        <div className={styles.vueNode}>
          <small>CLIENT</small>
          <strong>V</strong>
          <span>Vue 3</span>
        </div>
        <div className={styles.socketWire}>
          <span />
          <i>SOCKET.IO</i>
          <span />
        </div>
        <div className={styles.flaskNode}>
          <small>SERVER</small>
          <strong>F</strong>
          <span>Flask</span>
        </div>
      </div>
      <div className={styles.eventLog}>
        <div><span>14:32:08</span><b>connect</b><em>200 OK</em></div>
        <div><span>14:32:09</span><b>message</b><em>42 bytes</em></div>
        <div><span>14:32:09</span><b>broadcast</b><em>3 clients</em></div>
      </div>
      <div className={styles.dependabotBadge}>
        <SparkIcon />
        Dependencies automated
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`${styles.projectCard} ${
        project.featured ? styles.featuredCard : ""
      }`}
    >
      <div className={styles.projectVisualWrap}>
        <ProjectVisual project={project} />
      </div>
      <div className={styles.projectCopy}>
        <div className={styles.projectMeta}>
          <span>{project.number}</span>
          <span>{project.categoryLabel}</span>
          {project.private && <span className={styles.privateTag}>Private source</span>}
        </div>
        <h3>{project.displayName}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <p className={styles.projectProof}>{project.proof}</p>
        <div className={styles.projectFooter}>
          <ul aria-label={`${project.displayName} technologies`}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.name} on GitHub`}
          >
            View repository
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const visibleProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  return (
    <>
      <a className={styles.skipLink} href="#work">
        Skip to selected work
      </a>
      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#top" aria-label="iodriller home">
          <span>io</span>
          <strong>driller</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#principles">Principles</a>
          <a
            href="https://github.com/iodriller"
            target="_blank"
            rel="noreferrer"
            className={styles.githubNav}
          >
            <GithubIcon />
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span>Oney Erge</span>
              Applied software practice
            </p>
            <h1>
              Useful software for
              <em>messy, real-world problems.</em>
            </h1>
            <p className={styles.heroIntro}>
              Open tools and working systems across applied AI, enterprise data,
              market research, robotics, and real-time infrastructure.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#work">
                Explore the work
                <span>↓</span>
              </a>
              <a
                className={styles.textLink}
                href="https://github.com/iodriller"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
                github.com/iodriller
                <ArrowUpRight />
              </a>
            </div>
          </div>

          <div className={styles.heroBoard} aria-label="Featured project index">
            <div className={styles.boardHeader}>
              <span>PROJECT INDEX / 2026</span>
              <span className={styles.boardStatus}><i /> SYSTEMS ONLINE</span>
            </div>
            <ol>
              {projects.map((project) => (
                <li key={project.name}>
                  <span>{project.number}</span>
                  <a href={`#project-${project.number}`}>
                    {project.displayName}
                  </a>
                  <small>{project.categoryLabel}</small>
                </li>
              ))}
            </ol>
            <div className={styles.boardFooter}>
              <span>BUILD</span>
              <span>TEST</span>
              <span>UNDERSTAND</span>
              <span>SHIP</span>
            </div>
          </div>
        </section>

        <section className={styles.statRail} aria-label="Portfolio overview">
          <div><strong>06</strong><span>systems featured</span></div>
          <div><strong>05</strong><span>problem domains</span></div>
          <div><strong>100%</strong><span>inspectable by design</span></div>
          <div><strong>LOCAL</strong><span>first when it matters</span></div>
        </section>

        <section className={styles.workSection} id="work">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>
                <span>01</span>
                Selected work
              </p>
              <h2>Built to make the hard part visible.</h2>
            </div>
            <p>
              Each project starts with an operational question, then turns it
              into something testable, legible, and useful.
            </p>
          </div>

          <div className={styles.filterBar} role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={activeFilter === filter.value}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
                {filter.value === "all" && <span>{projects.length}</span>}
              </button>
            ))}
          </div>

          <div className={styles.projectGrid} aria-live="polite">
            {visibleProjects.map((project) => (
              <div id={`project-${project.number}`} key={project.name}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.principles} id="principles">
          <div className={styles.principleIntro}>
            <p className={styles.eyebrow}>
              <span>02</span>
              Working principles
            </p>
            <h2>Good tools explain themselves.</h2>
            <p>
              The through-line is not a framework or a model. It is a bias
              toward software people can inspect, operate, and trust.
            </p>
          </div>
          <ol className={styles.principleList}>
            <li>
              <span>01</span>
              <div>
                <h3>Make evidence visible</h3>
                <p>Show provenance, uncertainty, and the path to a result.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Keep the operator in control</h3>
                <p>Prefer configurable workflows over hidden automation.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Design for the failure</h3>
                <p>Diagnostics and reproducibility are product features.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Run close to the work</h3>
                <p>Local and private by default when the data demands it.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaMark}>
            <SparkIcon />
          </div>
          <p>Explore the source, follow the experiments, or build from the foundations.</p>
          <h2>Six systems. One practical engineering practice.</h2>
          <a
            href="https://github.com/iodriller"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            Open GitHub profile
            <ArrowUpRight />
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <a className={styles.wordmark} href="#top">
            <span>io</span>
            <strong>driller</strong>
          </a>
          <p>Applied AI, data systems, and experiments by Oney Erge.</p>
        </div>
        <div className={styles.profile}>
          <Image
            src="/media/oney-erge.jpg"
            alt=""
            width={44}
            height={44}
            className={styles.avatar}
          />
          <span>
            <small>BUILT IN PUBLIC</small>
            <b>github.com/iodriller</b>
          </span>
        </div>
        <p className={styles.copyright}>© 2026 Oney Erge</p>
      </footer>
    </>
  );
}
