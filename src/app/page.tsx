import Image from "next/image";
import type { ReactNode } from "react";
import { ProjectVisual } from "@/components/project-visual";
import { projects, type Project } from "@/data/projects";
import styles from "./page.module.css";

const GITHUB = "https://github.com/oney-erge";
const SCHOLAR = "https://scholar.google.com/citations?user=x0tT7L4AAAAJ";
const LINKEDIN = "https://www.linkedin.com/in/oneyerge/";
const PATENTS = "https://patents.justia.com/inventor/oney-erge";

const projectCopy: Record<string, { outcome: string; detail: string; evidence: string }> = {
  "ybm-local-ai-agent": {
    outcome: "A policy-protected local agent that keeps working toward the task.",
    detail:
      "Talk to YBM from the web, Telegram, or WhatsApp. Tools pass through policy, approval, verification, and receipts. When a needed capability is missing, it can write and run the code required to continue.",
    evidence: "Local-first · Self-extending workflows · Auditable tool use",
  },
  "afterimage-full-precision-llm-inference": {
    outcome: "Run large, full-precision models on smaller GPUs.",
    detail:
      "Afterimage is a research toolbox for full-precision inference beyond VRAM. It ran a measured 29.5 GB Qwen3-14B BF16 model on an 8 GB GPU and compares compression, streaming, and speculative methods against named baselines. Its fastest tested mode reached 3.15x AirLLM and 1.56x HF Accelerate.",
    evidence: "29.5 GB model · 8 GB GPU · Lossless weights",
  },
  "localdeploy-local-ai-models": {
    outcome: "A complete local model deployment and benchmarking suite.",
    detail:
      "LocalDeploy inspects your hardware, estimates which models fit, lets you find and pull them from one UI, manages compatible runtimes, and measures the speed, quality, and memory use you actually get.",
    evidence: "Hardware fit · Runtime control · Repeatable benchmarks",
  },
  "agentarium-ai-agent-physics-sandbox": {
    outcome: "Bring AI agents and physics into the same experiment.",
    detail:
      "Agentarium gives an agent a simulated world, explicit tools, and physical challenges, then measures what it builds, what happens, and how its next attempt changes.",
    evidence: "24 explicit tools · Explainable scores · Replayable trials",
  },
  "creature-lab-robot-morphology": {
    outcome: "Design, evolve, and test robots in a reproducible physics lab.",
    detail:
      "Creature Lab lets you modify humanoids, quadrupeds, and other robot bodies, evolve morphology and control, diagnose failures, and package the complete experiment for another person to reproduce.",
    evidence: "Humanoids and quadrupeds · Evolution · PyBullet",
  },
  "segcraft-semantic-segmentation": {
    outcome: "Train, compare, and run semantic segmentation from one platform.",
    detail:
      "SegCraft includes ready-to-use presets and model backends for training, evaluation, and comparison, then carries the selected setup into image, uploaded video, and YouTube inference workflows.",
    evidence: "Model presets · Comparative evaluation · Video workflows",
  },
};

type TimelineItem = {
  period: string;
  organization: string;
  organizationHref?: string;
  role: string;
  kind: string;
  mark: string;
  description: string;
  links?: Array<{ label: string; href: string }>;
};

const timeline: TimelineItem[] = [
  {
    period: "2025 to now",
    organization: "Oxy",
    role: "AI Lead, Language Modeling Engineering",
    kind: "Work",
    mark: "oxy",
    description:
      "I lead NLP and language-model engineering in Oxy's Applied AI Center of Excellence.",
  },
  {
    period: "2023 to 2025",
    organization: "Deloitte",
    role: "AI Lead",
    kind: "Work",
    mark: "deloitte",
    description:
      "I was responsible for 19 models from problem definition through deployment, spanning machine learning, NLP, and optimization.",
  },
  {
    period: "2015 to 2025",
    organization: "JGSE",
    organizationHref: "https://www.sciencedirect.com/journal/gas-science-and-engineering",
    role: "Associate Editor",
    kind: "Editorial service",
    mark: "elsevier",
    description:
      "I served for more than 10 years as an Associate Editor, overseeing peer review and editorial decisions for more than 250 scientific manuscripts.",
  },
  {
    period: "2022 to 2023",
    organization: "Dow",
    role: "Senior Research Specialist",
    kind: "Work",
    mark: "dow",
    description:
      "I published 4 internal technical papers on signal processing, data-driven modeling, and decision-making. I also led the assessment and integration of Boston Dynamics Spot and other quadruped robotic platforms.",
  },
  {
    period: "2021 to 2022",
    organization: "Robotics Startup",
    role: "Data Scientist / Robotics Software Engineer",
    kind: "Work",
    mark: "robotics",
    description:
      "I developed a custom SLAM and sensor-fusion method for an omnidirectional mobile robot, using motor effort and onboard sensing to estimate and correct motion drift for better pose estimation.",
  },
  {
    period: "2019 to 2021",
    organization: "The University of Texas at Austin",
    role: "PhD · Portfolio in Applied Statistical Modeling",
    kind: "Research and education",
    mark: "ut-austin",
    description:
      "My doctoral research focused on hybrid modeling: combining AI and physics to improve prediction and control in physical systems.",
    links: [
      {
        label: "Doctoral dissertation",
        href: "https://hdl.handle.net/2152/98836",
      },
      {
        label: "SciPy paper",
        href: "https://proceedings.scipy.org/articles/Majora-342d178e-011.pdf",
      },
    ],
  },
  {
    period: "2013 to 2019",
    organization: "SLB",
    role: "Data Scientist / Software Engineer",
    kind: "Work",
    mark: "slb",
    description:
      "I worked across the full software and data-science lifecycle of ABBL, from pattern-recognition models through product development and commercialization. The automated directional-drilling adviser was tested across more than 250 wells.",
    links: [
      {
        label: "ABBL service",
        href: "https://www.slb.com/resource-library/interview/drl/remote-directional-drilling-sets-roadmap-to-industrialization",
      },
    ],
  },
  {
    period: "2011 to 2013",
    organization: "The University of Tulsa",
    role: "MSc, Petroleum Engineering",
    kind: "Research and education",
    mark: "tulsa",
    description:
      "My MSc research combined experiments and numerical methods for non-Newtonian flow and freely rotating drillstrings. I later collaborated on work pairing a deep-learning model with genetic-algorithm optimization.",
    links: [
      {
        label: "Request master's thesis",
        href: LINKEDIN,
      },
      {
        label: "Genetic-algorithm paper",
        href: "https://doi.org/10.1115/OMAE2022-79623",
      },
    ],
  },
  {
    period: "2006 to 2010",
    organization: "Middle East Technical University",
    organizationHref: "https://www.metu.edu.tr/",
    role: "BSc, Petroleum and Natural Gas Engineering",
    kind: "Education",
    mark: "metu",
    description:
      "I built my engineering foundation in transport phenomena, numerical methods, and subsurface systems.",
  },
];

const educationSchools = [
  "The University of Texas at Austin",
  "The University of Tulsa",
  "Middle East Technical University",
];

const papers = [
  {
    year: "2022",
    venue: "JNGSE",
    title: "Combining physics-based and data-driven modeling in well construction: Hybrid fluid dynamics modeling",
    href: "https://doi.org/10.1016/j.jngse.2021.104348",
  },
  {
    year: "2022",
    venue: "Energies",
    title: "Well Construction Action Planning and Automation through Finite-Horizon Sequential Decision-Making",
    href: "https://doi.org/10.3390/en15165776",
  },
  {
    year: "2021",
    venue: "Energies",
    title: "Optimization of Flow Rate and Pipe Rotation Speed Considering Effective Cuttings Transport Using Data-Driven Models",
    href: "https://doi.org/10.3390/en14051484",
  },
];

const patents = [
  {
    number: "US 10400570",
    title: "A physics-informed composite condition index with online trend forecasting",
    role: "Lead inventor",
    topics: ["Physics-informed risk scoring", "Multivariate feature fusion", "Online trend detection"],
    href: "https://patents.google.com/patent/US10400570B2/en",
  },
  {
    number: "US 12473818",
    title: "Flow-regime transition control with real-time fluid-interface tracking",
    role: "Lead inventor",
    topics: ["Physics-based simulation", "Constrained optimization", "Closed-loop control"],
    href: "https://patents.google.com/patent/US12473818B2/en",
  },
  {
    number: "US 11994017",
    title: "Axial fluid-interface estimation from pressure, rheology, and volume",
    role: "Lead inventor",
    topics: ["Volumetric state estimation", "Change-point detection", "Multisensor fusion"],
    href: "https://patents.google.com/patent/US11994017B2/en",
  },
  {
    number: "US 10920584",
    title: "Uncertainty-bounded anomaly detection from flowback fingerprints",
    role: "Lead inventor",
    topics: ["Gaussian process regression", "Uncertainty quantification", "Anomaly detection"],
    href: "https://patents.google.com/patent/US10920584B2/en",
  },
  {
    number: "US 12158555",
    title: "Probabilistic operation-sequence recognition from compressed time series",
    role: "Co-inventor",
    topics: ["Symbolic Aggregate Approximation", "Hidden Markov models", "Viterbi inference"],
    href: "https://patents.google.com/patent/US12158555B2/en",
  },
  {
    number: "US 10900288",
    title: "Model-based axial excitation and closed-loop surface actuation",
    role: "Co-inventor",
    topics: ["Frequency-response modeling", "Model-based control", "Optimal parameter selection"],
    href: "https://patents.google.com/patent/US10900288B2/en",
  },
  {
    number: "US 10648296",
    title: "Multisensor time-series recognition with decision-level fusion",
    role: "Co-inventor",
    topics: ["Time-series classification", "Pattern recognition", "Sensor fusion"],
    href: "https://patents.google.com/patent/US10648296B2/en",
  },
  {
    number: "US 10316653",
    title: "Online multivariate response modeling and predictive operating envelopes",
    role: "Co-inventor",
    topics: ["Online system identification", "Adaptive response modeling", "Multivariate optimization"],
    href: "https://patents.google.com/patent/US10316653B2/en",
  },
];

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://oneyerge.com/#profile",
  url: "https://oneyerge.com/",
  name: "Oney Erge | Applied AI Researcher and Engineer",
  dateModified: "2026-08-24",
  mainEntity: {
    "@type": "Person",
    "@id": "https://oneyerge.com/#person",
    name: "Oney Erge",
    url: "https://oneyerge.com/",
    image: "https://oneyerge.com/media/oney-erge-portrait.webp",
    jobTitle: "Applied AI Researcher and Engineer",
    sameAs: [GITHUB, SCHOLAR, LINKEDIN, PATENTS],
    alumniOf: educationSchools.map((school) => ({ "@type": "CollegeOrUniversity", name: school })),
    knowsAbout: [
      "Agent systems",
      "Language models",
      "Local AI inference",
      "Robotics simulation",
      "Machine learning",
      "Hybrid physics and data-driven modeling",
    ],
  },
};

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.92-1.3 2.76-1.02 2.76-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function ScholarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 9 9-5 9 5-9 5-9-5Zm4 3.2V17c2.8 2 7.2 2 10 0v-4.8M21 9v6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 9v9M6.5 6.2v.1M10.5 18v-9m0 4c.8-2.7 6-3.3 6 1.1V18M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function ProfileIconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
      {children}
    </a>
  );
}

function JobLogo({ kind }: { kind: string }) {
  if (["oxy", "slb", "deloitte", "dow", "elsevier", "ut-austin", "tulsa", "metu"].includes(kind)) {
    return (
      <span className={styles.jobLogo} data-mark={kind} aria-hidden="true">
        <Image src={`/brands/${kind}.svg`} alt="" width={84} height={84} />
      </span>
    );
  }

  if (kind === "robotics") {
    return (
      <span className={styles.jobLogo} data-mark={kind} aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <path d="M16 5v4M13 5h6M8 12h16v13H8V12Zm4 5h.1m7.8 0h.1M12 21h8M5 16h3m16 0h3" />
        </svg>
      </span>
    );
  }

  return null;
}

function ProjectCard({ project }: { project: Project }) {
  const copy = projectCopy[project.slug];
  return (
    <li id={`project-${project.slug}`}>
      <article className={styles.projectCard}>
        <div className={styles.projectMedia}>
          <div aria-hidden="true"><ProjectVisual project={project} /></div>
          <a className={styles.projectMediaLink} href={`/work/${project.slug}/`} aria-label={`View the ${project.name} case study`} />
        </div>
        <div className={styles.projectBody}>
          <p className={styles.projectField}>{project.field}</p>
          <h3><a href={`/work/${project.slug}/`}>{project.name} <Arrow /></a></h3>
          <p className={styles.projectOutcome}>{copy.outcome}</p>
          <p className={styles.projectSummary}>{copy.detail}</p>
          <p className={styles.projectEvidence}>{copy.evidence}</p>
          <div className={styles.projectFooter}>
            <ul aria-label={`${project.name} technologies`}>
              {project.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <a href={`${GITHUB}/${project.repo}`} target="_blank" rel="noreferrer">Source <Arrow /></a>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c") }} />
      <a className={styles.skipLink} href="#work">Skip to selected work</a>

      <main className={styles.page} id="top">
        <header className={styles.profile}>
          <figure className={styles.avatar}>
            <Image src="/media/oney-erge-portrait.webp" alt="Oney Erge" width={1000} height={1501} priority sizes="(max-width: 600px) 90px, 172px" />
          </figure>
          <div className={styles.profileMain}>
            <h1>Oney Erge</h1>
            <p className={styles.subtitle}>Applied AI and Physics, Research and Engineering</p>
            <ul className={styles.profileFacts} aria-label="Profile facts">
              <li>PhD, UT Austin</li><li>32+ papers</li><li>8 patents</li><li>800+ citations</li><li>Houston, Texas</li>
            </ul>
            <nav className={styles.profileIcons} aria-label="Professional profiles">
              <ProfileIconLink href={GITHUB} label="Oney Erge on GitHub"><GitHubIcon /></ProfileIconLink>
              <ProfileIconLink href={SCHOLAR} label="Oney Erge on Google Scholar"><ScholarIcon /></ProfileIconLink>
              <ProfileIconLink href={LINKEDIN} label="Oney Erge on LinkedIn"><LinkedInIcon /></ProfileIconLink>
            </nav>
          </div>
          <div className={styles.bio}>
            <p>I am interested in where AI and physics meet: systems that use tools, fit the hardware available, and learn from physical outcomes.</p>
            <p>My background is in dynamical systems, control, and fluid mechanics. It shapes the problems I choose and how I test what actually works.</p>
          </div>
        </header>

        <nav className={styles.jumpNav} aria-label="Page sections">
          <a href="#work">Projects</a><a href="#background">Timeline</a><a href="#research">Research</a><a href="#contact">Contact</a>
        </nav>

        <section className={styles.now} aria-labelledby="now-heading">
          <h2 id="now-heading">Now</h2>
          <p>These are some of the projects I work on in public, from local agents and full-precision inference on small GPUs to simulation environments where agents learn from physical outcomes. I hope they are useful to you in one way or another.</p>
        </section>

        <section className={`${styles.section} ${styles.workBreakout}`} id="work" aria-labelledby="work-heading">
          <header className={styles.sectionHeader}>
            <div><p>Projects</p><h2 id="work-heading">Selected work</h2></div>
            <p>Six open-source systems, each with working code, a visual demo, and a technical case study that explains what was tested.</p>
          </header>
          <ol className={styles.projectGrid}>{projects.map((project) => <ProjectCard key={project.repo} project={project} />)}</ol>
          <a className={styles.textLink} href={GITHUB} target="_blank" rel="noreferrer">More on GitHub <Arrow /></a>
        </section>

        <section className={styles.section} id="background" aria-labelledby="background-heading">
          <header className={styles.sectionHeader}>
            <div><p>Timeline</p><h2 id="background-heading">Past work</h2></div>
            <p>A single chronology of the places where I worked, researched, and studied.</p>
          </header>
          <ol className={styles.timeline}>
            {timeline.map((item) => (
              <li key={`${item.period}-${item.organization}`}>
                <time>{item.period}</time>
                <div className={styles.timelineRail}><JobLogo kind={item.mark} /></div>
                <div className={styles.timelineCopy}>
                  <span>{item.kind}</span>
                  {item.organizationHref ? (
                    <strong>
                      <a className={styles.timelineOrganizationLink} href={item.organizationHref} target="_blank" rel="noreferrer">
                        {item.organization} <Arrow />
                      </a>
                    </strong>
                  ) : <strong>{item.organization}</strong>}
                  <p className={styles.timelineRole}>{item.role}</p>
                  <p className={styles.timelineDescription}>
                    {item.description}{" "}
                    {item.links?.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <Arrow /></a>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} id="research" aria-labelledby="research-heading">
          <header className={styles.sectionHeader}>
            <div><p>Research</p><h2 id="research-heading">Papers and patents</h2></div>
            <p>Research in hybrid modeling, control, automation, and well construction, including eight selected US patent grants and 32+ publications.</p>
          </header>
          <dl className={styles.researchStats}>
            <div><dt>800+</dt><dd>Citations</dd></div><div><dt>32+</dt><dd>Publications</dd></div><div><dt>15</dt><dd>h-index</dd></div><div><dt>8</dt><dd>US patents</dd></div>
          </dl>
          <div className={styles.researchGroup}>
            <div className={styles.researchGroupHeader}><h3>Selected publications</h3><a href={SCHOLAR} target="_blank" rel="noreferrer">Google Scholar <Arrow /></a></div>
            <ol className={styles.paperList}>
              {papers.map((paper) => (
                <li key={paper.title}><a href={paper.href} target="_blank" rel="noreferrer"><span>{paper.year}</span><div><strong>{paper.title}</strong><p>{paper.venue}</p></div><Arrow /></a></li>
              ))}
            </ol>
          </div>
          <div className={styles.researchGroup}>
            <div className={styles.researchGroupHeader}>
              <div><h3>Patents</h3><p>Eight selected grants</p></div>
              <a href={PATENTS} target="_blank" rel="noreferrer">Patent profile <Arrow /></a>
            </div>
            <ol className={styles.patentGrid}>
              {patents.map((patent) => (
                <li key={patent.number}>
                  <a href={patent.href} target="_blank" rel="noreferrer">
                    <div className={styles.patentMeta}><span>{patent.role}</span><p>{patent.number}</p></div>
                    <strong>{patent.title}</strong>
                    <ul>{patent.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.contact}`} id="contact" aria-labelledby="contact-heading">
          <header className={styles.sectionHeader}>
            <div><p>Contact</p><h2 id="contact-heading">Say hello</h2></div>
            <div className={styles.contactCopy}><p>I am easiest to reach on LinkedIn. I am always glad to hear from people working on agents, local AI, simulation, or AI for physical systems.</p><a className={styles.textLink} href={LINKEDIN} target="_blank" rel="noreferrer">Connect on LinkedIn <Arrow /></a></div>
          </header>
        </section>
      </main>

      <footer className={styles.footer}><p>© {new Date().getFullYear()} Oney Erge</p><a href="#top">Back to top ↑</a></footer>
    </>
  );
}
