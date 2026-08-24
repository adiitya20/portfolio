"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { MoodDetectorVisualization } from "./MoodDetectorVisualization";
import { useExperience } from "@/context/ExperienceContext";
import { prefersReducedMotion } from "@/lib/motion";

export function ProjectDetail() {
  const { activeProject, closeProject } = useExperience();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeProject]);

  useEffect(() => {
    if (!activeProject || !root.current || prefersReducedMotion()) return;
    gsap.fromTo(
      root.current,
      { clipPath: "inset(12% 12% 12% 12%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power4.inOut" },
    );
    gsap.from(".detail-block", {
      y: 28,
      opacity: 0,
      stagger: 0.06,
      duration: 0.6,
      delay: 0.2,
      ease: "power3.out",
    });
  }, [activeProject]);

  if (!activeProject) return null;
  const project = activeProject;

  return (
    <section
      ref={root}
      className="fixed inset-0 z-[55] overflow-y-auto bg-[var(--paper)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      <div className="site-pad flex items-center justify-between py-6">
        <p className="mono text-[11px] tracking-[0.18em] uppercase">
          {project.number} / {project.category}
        </p>
        <button
          type="button"
          className="mono text-[11px] tracking-[0.18em] uppercase underline-anim"
          onClick={closeProject}
        >
          Close
        </button>
      </div>
      <div className="site-pad pb-24">
        <h2
          id="project-detail-title"
          className="detail-block display max-w-5xl text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.05em]"
        >
          {project.title}
        </h2>
        <p className="detail-block mt-6 max-w-2xl text-lg text-[var(--ink-soft)]">
          {project.description}
        </p>

        <div className="detail-block mt-12">
          {project.id === 3 ? (
            <MoodDetectorVisualization active />
          ) : (
            <ArchitectureDiagram project={project} />
          )}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <DetailBlock title="Overview" body={project.description} />
          {"problem" in project && project.problem ? (
            <DetailBlock title="Problem" body={project.problem} />
          ) : null}
          {"solution" in project && project.solution ? (
            <DetailBlock title="Solution" body={project.solution} />
          ) : null}
          {"contribution" in project && project.contribution ? (
            <DetailBlock title="My contribution" body={project.contribution} />
          ) : null}
        </div>

        <div className="detail-block mt-12">
          <h3 className="mono text-[11px] tracking-[0.18em] uppercase">Features</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="border-t border-[var(--line)] py-3">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-block mt-12">
          <h3 className="mono text-[11px] tracking-[0.18em] uppercase">Technologies</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="mono border border-[var(--line)] px-3 py-2 text-[11px] tracking-[0.12em] uppercase"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {"github" in project && typeof project.github === "string" ? (
          <a className="mt-8 inline-block underline-anim" href={project.github}>
            GitHub
          </a>
        ) : null}
        {"liveDemo" in project && typeof project.liveDemo === "string" ? (
          <a className="mt-8 ml-6 inline-block underline-anim" href={project.liveDemo}>
            Live demo
          </a>
        ) : null}
      </div>
    </section>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="detail-block">
      <h3 className="mono text-[11px] tracking-[0.18em] uppercase">{title}</h3>
      <p className="mt-3 leading-7 text-[var(--ink-soft)]">{body}</p>
    </div>
  );
}
