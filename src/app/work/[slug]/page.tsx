/* eslint-disable @next/next/no-html-link-for-pages -- GitHub Pages uses full-document navigation without RSC prefetch dependencies. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, projects } from "@/data/projects";
import styles from "./page.module.css";

const GITHUB = "https://github.com/oney-erge";
const SITE = "https://oneyerge.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  const canonical = `/work/${project.slug}/`;
  const image = project.socialImage;

  return {
    title: project.seoTitle,
    description: project.seoDescription,
    alternates: { canonical },
    keywords: [project.name, project.searchIntent, ...project.tags],
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      type: "article",
      url: canonical,
      siteName: "Oney Erge",
      images: [{ url: image, alt: `${project.name} project by Oney Erge` }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle,
      description: project.seoDescription,
      images: [image],
    },
  };
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const canonical = `${SITE}/work/${project.slug}/`;
  const image = `${SITE}${project.image}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "@id": `${canonical}#article`,
      headline: project.seoTitle,
      description: project.seoDescription,
      url: canonical,
      image,
      datePublished: "2026-08-24",
      dateModified: "2026-08-24",
      author: { "@id": `${SITE}/#person` },
      mainEntityOfPage: canonical,
      about: project.tags,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Oney Erge",
          item: `${SITE}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Selected work",
          item: `${SITE}/#work`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.name,
          item: canonical,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <a className={styles.skipLink} href="#case-study">
        Skip to case study
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/">Oney Erge</a>
          <nav aria-label="Project navigation">
            <a href="/#work">Work</a>
            <a href="/#research">Research</a>
            <a href="/#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="case-study">
        <section className={styles.hero}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <a href="/">Oney Erge</a>
            <span>/</span>
            <a href="/#work">Work</a>
            <span>/</span>
            <span>{project.name}</span>
          </div>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{project.field} / {project.status}</p>
              <h1>{project.name}</h1>
              <p className={styles.headline}>{project.headline}</p>
            </div>
            <div className={styles.heroAside}>
              <p>{project.description}</p>
              <div className={styles.actions}>
                <a href={`${GITHUB}/${project.repo}`} target="_blank" rel="noreferrer">
                  Open source <Arrow />
                </a>
                <a href="/#contact">Discuss a project <Arrow /></a>
              </div>
            </div>
          </div>
          <dl className={styles.proofBar}>
            <div>
              <dt>Focus</dt>
              <dd>{project.searchIntent}</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>{project.proof}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.tags.join(" · ")}</dd>
            </div>
          </dl>
          <p className={styles.byline}>
            Case study by <a href="/">Oney Erge</a>
            <span>·</span>
            Updated August 24, 2026
          </p>
        </section>

        <section className={styles.showcase} aria-label={`${project.name} visual preview`}>
          <ProjectVisual project={project} large />
        </section>

        <article className={styles.article}>
          <section className={styles.questionSection}>
            <p className={styles.sectionLabel}>01 / The question</p>
            <h2>{project.question}</h2>
            <div className={styles.overview}>
              {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section className={styles.workflowSection}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionLabel}>02 / System shape</p>
              <h2>The shortest path through the system.</h2>
            </div>
            <ol className={styles.workflow}>
              {project.workflow.map((step, stepIndex) => (
                <li key={step.label}>
                  <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                  <strong>{step.label}</strong>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.decisionsSection}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionLabel}>03 / Engineering decisions</p>
              <h2>What the architecture makes explicit.</h2>
            </div>
            <div className={styles.decisionGrid}>
              {project.decisions.map((decision, decisionIndex) => (
                <article key={decision.title}>
                  <span>{String(decisionIndex + 1).padStart(2, "0")}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.evidenceSection}>
            <div>
              <p className={styles.sectionLabel}>04 / Evidence and limits</p>
              <h2>Claims stay attached to what was measured.</h2>
            </div>
            <div>
              <ul>
                {project.evidence.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className={styles.limitCallout}>
                <span>Known boundary</span>
                <p>{project.limits}</p>
              </div>
            </div>
          </section>
        </article>

        <section className={styles.nextProject}>
          <p>Next case study</p>
          <a href={`/work/${nextProject.slug}/`}>
            <span>{nextProject.field}</span>
            <strong>{nextProject.name}</strong>
            <Arrow />
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href="/">Oney Erge</a>
        <p>Applied AI, agent systems, and physical models.</p>
        <p>© {new Date().getFullYear()} Oney Erge</p>
      </footer>
    </>
  );
}
