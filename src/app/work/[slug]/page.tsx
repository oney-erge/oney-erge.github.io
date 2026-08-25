/* eslint-disable @next/next/no-html-link-for-pages -- GitHub Pages uses full-document navigation without RSC prefetch dependencies. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, projects } from "@/data/projects";
import { SITE, SITE_MODIFIED, SITE_PUBLISHED, SITE_YEAR } from "@/data/site";
import styles from "./page.module.css";

const GITHUB = "https://github.com/oney-erge";

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
  const relatedProjects = Array.from(
    { length: Math.min(2, projects.length - 1) },
    (_, offset) => projects[(index + offset + 1) % projects.length],
  );
  const strengths = project.proof.split(" · ");
  const canonical = `${SITE}/work/${project.slug}/`;
  const image = `${SITE}${project.socialImage}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "@id": `${canonical}#article`,
      headline: project.seoTitle,
      description: project.seoDescription,
      url: canonical,
      image,
      datePublished: SITE_PUBLISHED,
      dateModified: SITE_MODIFIED,
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
      <a className={styles.skipLink} href="#overview">
        Skip to project details
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/">Oney Erge</a>
          <nav aria-label="Primary navigation">
            <a href="/#work">Projects</a>
            <a href="/#research">Research</a>
            <a href="/#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="project-title">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <a href="/#work">Selected work</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.name}</span>
          </nav>

          <div className={styles.heroPanel}>
            <div className={styles.heroCopy}>
              <div className={styles.projectMeta}>
                <span>{project.field}</span>
                <span>{project.status}</span>
              </div>
              <h1 id="project-title">{project.name}</h1>
              <p className={styles.headline}>{project.headline}</p>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.actions}>
                <a href={`${GITHUB}/${project.repo}`} target="_blank" rel="noreferrer">
                  View source <Arrow />
                </a>
                <a href="#overview">What it does <span aria-hidden="true">↓</span></a>
              </div>
            </div>

            <div className={styles.heroMedia}>
              <ProjectVisual project={project} large />
            </div>
          </div>
        </section>

        <article className={styles.brief}>
          <section id="overview" className={styles.briefSection}>
            <div className={styles.briefHeading}>
              <p className={styles.sectionLabel}>Purpose</p>
              <h2>What {project.name} does.</h2>
            </div>
            <div className={styles.purposeGrid}>
              <div>
                <h3>Aim</h3>
                <p>{project.plainLanguage}</p>
              </div>
              <div>
                <h3>What it does</h3>
                <p>{project.technicalSummary}</p>
              </div>
              <div>
                <h3>Good at</h3>
                <ul>
                  {strengths.map((strength) => <li key={strength}>{strength}</li>)}
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.briefSection}>
            <div className={styles.compactHeading}>
              <div>
                <p className={styles.sectionLabel}>Flow</p>
                <h2>The {project.name} flow.</h2>
              </div>
            </div>
            <ol className={styles.workflow}>
              {project.workflow.map((step, stepIndex) => (
                <li key={step.label}>
                  <span className={styles.stepNumber}>{String(stepIndex + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.label}</h3>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className={styles.tryCard}>
              <div>
                <p className={styles.sectionLabel}>Try it</p>
                <h3>{project.tryIt}</h3>
              </div>
              <a href={`${GITHUB}/${project.repo}`} target="_blank" rel="noreferrer">
                Setup and examples <Arrow />
              </a>
            </div>
          </section>
        </article>

        <section className={styles.moreWork} aria-labelledby="more-work-title">
          <div className={styles.moreWorkHeading}>
            <div>
              <p className={styles.sectionLabel}>More work</p>
              <h2 id="more-work-title">Explore another project.</h2>
            </div>
            <a href="/#work">View all projects <Arrow /></a>
          </div>
          <ul className={styles.relatedGrid}>
            {relatedProjects.map((relatedProject) => (
              <li key={relatedProject.slug}>
                <a href={`/work/${relatedProject.slug}/`}>
                  <div className={styles.relatedMedia} aria-hidden="true">
                    <ProjectVisual project={relatedProject} />
                  </div>
                  <div className={styles.relatedCopy}>
                    <p>{relatedProject.field}</p>
                    <h3>{relatedProject.name} <Arrow /></h3>
                    <span>{relatedProject.headline}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href="/">Oney Erge</a>
        <p>Applied AI and physics, research and engineering.</p>
        <p>© {SITE_YEAR} Oney Erge</p>
      </footer>
    </>
  );
}
