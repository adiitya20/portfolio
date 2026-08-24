"use client";

import { ProjectShowcase } from "./projects/ProjectShowcase";

export function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="site-pad pt-[12vh]">
        <p className="section-kicker">Select a project</p>
        <h2 className="display mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.05em]">
          Explore the systems, architecture and problems behind my work.
        </h2>
      </div>
      <ProjectShowcase />
    </section>
  );
}
