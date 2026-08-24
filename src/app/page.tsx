import Image from "next/image";
import { ProjectVisual } from "@/components/project-visual";
import {
  featuredProjects,
  moreProjects,
  type Project,
} from "@/data/projects";
import styles from "./page.module.css";

const GITHUB = "https://github.com/oney-erge";
const SCHOLAR = "https://scholar.google.com/citations?user=x0tT7L4AAAAJ";
const LINKEDIN = "https://www.linkedin.com/in/oneyerge/";

const papers = [
  {
    year: "2022",
    title:
      "Combining physics-based and data-driven modeling in well construction: Hybrid fluid dynamics modeling",
  },
  {
    year: "2022",
    title:
      "Well Construction Action Planning and Automation through Finite-Horizon Sequential Decision-Making",
  },
  {
    year: "2020",
    title:
      "Modeling the effects of drillstring eccentricity, pipe rotation and annular blockage on cuttings transport in deviated wells",
  },
];

const background = [
  { organization: "Deloitte", role: "AI Lead" },
  { organization: "Elsevier", role: "Data Scientist" },
  {
    organization: "Robotics Startup",
    role: "Data Scientist / Robotics Software Engineer",
  },
  { organization: "SLB", role: "Data Scientist / Software Engineer" },
  { organization: "UT Austin", role: "PhD, Dynamic Systems and Control" },
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
    image: {
      "@type": "ImageObject",
      url: "https://oneyerge.com/media/oney-erge-portrait.webp",
      width: 1000,
      height: 1501,
    },
    jobTitle: "Applied AI Researcher and Engineer",
    sameAs: [GITHUB, SCHOLAR, LINKEDIN],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "The University of Texas at Austin",
    },
    knowsAbout: [
      "Agent systems",
      "Language models",
      "Local AI inference",
      "Machine learning",
      "Robotics simulation",
      "Hybrid physics and data-driven modeling",
    ],
  },
};

function Arrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M6 4h8v8" />
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

function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <article className={`${styles.projectCard} ${wide ? styles.wideCard : ""}`}>
      <ProjectVisual project={project} />
      <div className={styles.projectCopy}>
        <div className={styles.projectMeta}>
          <span>{project.field}</span>
          <span>{project.status}</span>
        </div>
        <h3>{project.name}</h3>
        <p className={styles.projectHeadline}>{project.headline}</p>
        <p className={styles.projectDescription}>{project.description}</p>
        <p className={styles.projectProof}>{project.proof}</p>
        <div className={styles.projectFooter}>
          <ul aria-label={`${project.name} technologies`}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className={styles.projectLinks}>
            <a href={`/work/${project.slug}/`}>
              {project.name} case study <Arrow />
            </a>
            <a
              href={`${GITHUB}/${project.repo}`}
              target="_blank"
              rel="noreferrer"
            aria-label={`View ${project.name} source on GitHub`}
            >
              Source <Arrow />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c"),
        }}
      />
      <a className={styles.skipLink} href="#work">
        Skip to selected work
      </a>

      <header className={styles.siteHeader} id="top">
        <a className={styles.brand} href="#top">
          <span className={styles.brandMark}>OE</span>
          <span>Oney Erge</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#research">Research</a>
          <a href="#background">Background</a>
          <a className={styles.headerCta} href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span /> Applied AI researcher and engineer
            </p>
            <h1>
              AI systems,
              <span>grounded in reality.</span>
            </h1>
            <p className={styles.heroIntro}>
              I build agent systems, local inference tools, and physics-based
              simulations. The goal is working software that can be inspected,
              tested, and trusted.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#work">
                Explore selected work <span aria-hidden="true">↓</span>
              </a>
              <a className={styles.profileLink} href={GITHUB} target="_blank" rel="noreferrer">
                <GithubIcon /> GitHub <Arrow />
              </a>
            </div>
            <dl className={styles.heroProof}>
              <div>
                <dt>Research</dt>
                <dd>800+ citations</dd>
              </div>
              <div>
                <dt>Training</dt>
                <dd>PhD, UT Austin</dd>
              </div>
              <div>
                <dt>Current focus</dt>
                <dd>Agents + physical systems</dd>
              </div>
            </dl>
          </div>

          <figure className={styles.portrait}>
            <Image
              src="/media/oney-erge-portrait.webp"
              alt="Oney Erge, applied AI researcher and engineer"
              width={1000}
              height={1501}
              priority
              sizes="(max-width: 800px) 100vw, 38vw"
            />
            <figcaption>
              <span>Researcher</span>
              <span>Engineer</span>
              <span>Builder</span>
            </figcaption>
          </figure>
        </section>

        <section className={styles.positioning} aria-label="Professional focus">
          <p>Applied research becomes useful when it survives contact with an operator, a machine, and a real constraint.</p>
          <span>01 / Systems</span>
          <span>02 / Evidence</span>
          <span>03 / Control</span>
        </section>

        <section className={styles.workSection} id="work">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionNumber}>01 / Selected systems</p>
            <h2>Built, measured, and open to inspection.</h2>
            <p>
              The strongest work is shown with the operating constraint it addresses,
              not a list of technologies.
            </p>
          </div>

          <div className={styles.featuredGrid}>
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.repo} project={project} wide={index === 2} />
            ))}
          </div>

          <div className={styles.moreHeading}>
            <h3>More experiments</h3>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              All repositories <Arrow />
            </a>
          </div>
          <div className={styles.moreGrid}>
            {moreProjects.map((project) => (
              <ProjectCard key={project.repo} project={project} />
            ))}
          </div>
        </section>

        <section className={styles.researchSection} id="research">
          <div className={styles.researchLead}>
            <p className={styles.sectionNumber}>02 / Research foundation</p>
            <h2>A researcher&apos;s standards. A builder&apos;s output.</h2>
            <p>
              My earlier work focused on fluid dynamics, control, automated
              operations, and hybrid physics and data-driven models. The subject
              has changed. The standard has not: state the assumptions, measure the
              result, and keep the system accountable to evidence.
            </p>
            <a href={SCHOLAR} target="_blank" rel="noreferrer">
              Google Scholar profile <Arrow />
            </a>
          </div>

          <div className={styles.researchBody}>
            <dl className={styles.researchStats}>
              <div>
                <dt>800+</dt>
                <dd>citations</dd>
              </div>
              <div>
                <dt>30+</dt>
                <dd>publications</dd>
              </div>
              <div>
                <dt>15</dt>
                <dd>h-index</dd>
              </div>
            </dl>
            <div className={styles.paperList}>
              <p>Selected publications</p>
              <ol>
                {papers.map((paper) => (
                  <li key={paper.title}>
                    <span>{paper.year}</span>
                    <p>{paper.title}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.backgroundSection} id="background">
          <div className={styles.backgroundIntro}>
            <p className={styles.sectionNumber}>03 / Background</p>
            <h2>Across research, software, and applied AI.</h2>
            <p>
              Experience spans technical leadership, product engineering,
              scientific publishing, robotics, and physical modeling.
            </p>
          </div>
          <ol className={styles.timeline}>
            {background.map((item, index) => (
              <li key={item.organization}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.organization}</strong>
                <p>{item.role}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.contactSection} id="contact">
          <p className={styles.sectionNumber}>04 / Contact</p>
          <h2>Have a hard AI problem?</h2>
          <p>
            I am interested in senior technical roles, research collaborations,
            and focused product work around agent systems, local AI, evaluation,
            simulation, and AI for physical systems.
          </p>
          <div className={styles.contactActions}>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              Start a conversation <Arrow />
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              Review the source <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#top">
          <span className={styles.brandMark}>OE</span>
          <span>Oney Erge</span>
        </a>
        <p>Applied AI, agent systems, and physical models.</p>
        <p>© {new Date().getFullYear()} Oney Erge</p>
      </footer>
    </>
  );
}
