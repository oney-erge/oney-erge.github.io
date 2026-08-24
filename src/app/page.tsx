import Image from "next/image";
import { ProjectVisual } from "@/components/project-visual";
import { projects, type Project } from "@/data/projects";
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
    <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

function ProfileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children} <Arrow />
    </a>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li>
      <article className={styles.projectRow}>
        <div className={styles.projectCopy}>
          <div className={styles.projectMeta}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{project.field}</span>
            <span>{project.status}</span>
          </div>
          <h3>
            <a href={`/work/${project.slug}/`}>
              {project.name} <Arrow />
            </a>
          </h3>
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
                Case study <Arrow />
              </a>
              <a
                href={`${GITHUB}/${project.repo}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Source for ${project.name} on GitHub`}
              >
                Source <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a
          className={styles.projectMedia}
          href={`/work/${project.slug}/`}
          aria-label={`View the ${project.name} case study`}
        >
          <div aria-hidden="true">
            <ProjectVisual project={project} />
          </div>
        </a>
      </article>
    </li>
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
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#top">
            Oney Erge
          </a>
          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#research">Research</a>
            <a href="#background">Background</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className={styles.page}>
        <section className={styles.intro} aria-labelledby="intro-title">
          <div className={styles.introCopy}>
            <p className={styles.kicker}>Applied AI researcher and engineer</p>
            <h1 id="intro-title">Oney Erge</h1>
            <p className={styles.role}>
              I build agent systems, local inference tools, and simulations for
              systems that have to work beyond a demo.
            </p>

            <ul className={styles.credentials} aria-label="Credentials">
              <li>PhD, UT Austin</li>
              <li>800+ citations</li>
              <li>h-index 15</li>
              <li>Houston, TX</li>
            </ul>

            <p className={styles.lede}>
              My work connects language models with software tools and physical
              systems. Earlier research in control, fluid dynamics, and hybrid
              modeling still shapes how I evaluate AI: define the constraint,
              measure the result, and make the system inspectable.
            </p>

            <nav className={styles.profileLinks} aria-label="Profiles">
              <ProfileLink href={GITHUB}>GitHub</ProfileLink>
              <ProfileLink href={SCHOLAR}>Google Scholar</ProfileLink>
              <ProfileLink href={LINKEDIN}>LinkedIn</ProfileLink>
            </nav>
          </div>

          <figure className={styles.portrait}>
            <Image
              src="/media/oney-erge-portrait.webp"
              alt="Oney Erge"
              width={1000}
              height={1501}
              priority
              sizes="(max-width: 720px) 132px, 176px"
            />
          </figure>
        </section>

        <section className={styles.section} aria-labelledby="now-heading">
          <div className={styles.sectionLabel}>
            <p>Now</p>
          </div>
          <div className={styles.nowBody}>
            <h2 id="now-heading">
              Building useful AI systems with explicit boundaries.
            </h2>
            <p>
              Current work centers on local-first agents, full-precision model
              inference under memory limits, and reproducible evaluation in
              simulated environments. Most of the work is open source.
            </p>
            <ul aria-label="Current focus areas">
              <li>Agent systems</li>
              <li>Local inference</li>
              <li>Evaluation</li>
              <li>Physical simulation</li>
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.workSection}`} id="work" aria-labelledby="work-heading">
          <div className={styles.sectionLabel}>
            <p>Selected work</p>
            <span>Six systems</span>
          </div>
          <div className={styles.sectionLead}>
            <h2 id="work-heading">Projects with evidence attached.</h2>
            <p>
              Open-source systems presented through the constraint, the design,
              and the result. Each project has a deeper case study and source.
            </p>
          </div>
          <ol className={styles.projects}>
            {projects.map((project, index) => (
              <ProjectRow key={project.repo} project={project} index={index} />
            ))}
          </ol>
          <a className={styles.allWorkLink} href={GITHUB} target="_blank" rel="noreferrer">
            View all repositories on GitHub <Arrow />
          </a>
        </section>

        <section className={`${styles.section} ${styles.researchSection}`} id="research" aria-labelledby="research-heading">
          <div className={styles.sectionLabel}>
            <p>Research</p>
            <span>Selected publications</span>
          </div>
          <div className={styles.researchIntro}>
            <div>
              <h2 id="research-heading">A research foundation for applied AI.</h2>
              <p>
                More than 30 publications across modeling, control, automation,
                and machine learning. The through-line is building systems whose
                assumptions can be tested against observed behavior.
              </p>
            </div>
            <dl className={styles.researchStats}>
              <div><dt>800+</dt><dd>Citations</dd></div>
              <div><dt>30+</dt><dd>Publications</dd></div>
              <div><dt>15</dt><dd>h-index</dd></div>
            </dl>
          </div>
          <ol className={styles.papers}>
            {papers.map((paper) => (
              <li key={paper.title}>
                <span>{paper.year}</span>
                <p>{paper.title}</p>
              </li>
            ))}
          </ol>
          <ProfileLink href={SCHOLAR}>All publications on Google Scholar</ProfileLink>
        </section>

        <section className={`${styles.section} ${styles.backgroundSection}`} id="background" aria-labelledby="background-heading">
          <div className={styles.sectionLabel}>
            <p>Background</p>
          </div>
          <div className={styles.backgroundIntro}>
            <h2 id="background-heading">Research, software, and applied AI.</h2>
            <p>
              Experience spans technical leadership, product engineering,
              scientific publishing, robotics, and physical modeling.
            </p>
          </div>
          <ol className={styles.backgroundList}>
            {background.map((item) => (
              <li key={item.organization}>
                <strong>{item.organization}</strong>
                <span>{item.role}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.section} ${styles.contactSection}`} id="contact" aria-labelledby="contact-heading">
          <div className={styles.sectionLabel}>
            <p>Contact</p>
          </div>
          <div>
            <h2 id="contact-heading">Interested in working together?</h2>
            <p>
              I am open to senior technical roles, research collaborations, and
              focused product work involving agents, local AI, evaluation,
              simulation, and AI for physical systems.
            </p>
            <nav className={styles.contactLinks} aria-label="Contact links">
              <ProfileLink href={LINKEDIN}>Connect on LinkedIn</ProfileLink>
              <ProfileLink href={GITHUB}>Review my GitHub</ProfileLink>
            </nav>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Oney Erge</p>
        <p>Applied AI, agent systems, and physical models.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
