"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "writing", label: "Writing" },
  { id: "work", label: "Projects" },
  { id: "background", label: "Timeline" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
] as const;

type Props = {
  className: string;
  activeClassName: string;
};

export function HomepageSectionNav({ className, activeClassName }: Props) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      const readingLine = Math.min(window.innerHeight * 0.33, 280);
      let nextSection: string | null = null;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= readingLine) {
          nextSection = section.id;
        }
      }

      const pageBottom = window.scrollY + window.innerHeight;
      if (pageBottom >= document.documentElement.scrollHeight - 8) {
        nextSection = "contact";
      }

      setActiveSection((current) => current === nextSection ? current : nextSection);
      animationFrame = 0;
    };

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  return (
    <nav className={className} aria-label="Primary navigation">
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <a
            className={isActive ? activeClassName : undefined}
            href={`#${section.id}`}
            aria-current={isActive ? "location" : undefined}
            key={section.id}
          >
            {section.label}
          </a>
        );
      })}
    </nav>
  );
}
