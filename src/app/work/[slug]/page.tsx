import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { SITE } from "@/data/site";
import styles from "../../not-found.module.css";

/*
 * The project case studies are retired: each homepage card links straight to
 * its repository. GitHub Pages cannot send HTTP redirects, so every old
 * /work/<slug>/ address keeps this stub, which forwards to that card. Search
 * engines read an instant (0 second) meta refresh as a permanent redirect.
 */

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

  return {
    title: `${project.name} has moved`,
    description: `${project.name} now lives with the other projects on the Oney Erge homepage.`,
    alternates: { canonical: `${SITE}/` },
  };
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export default async function RetiredProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const target = `/#project-${project.slug}`;

  return (
    <main className={styles.page}>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <p className={styles.eyebrow}>Moved</p>
      <h1>{project.name} is on the homepage now.</h1>
      <p>You should be redirected in a moment. If nothing happens, use the link below.</p>
      <nav className={styles.actions} aria-label="New location">
        <a href={target}>Go to {project.name} <Arrow /></a>
      </nav>
    </main>
  );
}
