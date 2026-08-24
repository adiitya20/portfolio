"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { portfolioData, projectSkillMap } from "@/data/portfolio";
import { SkillCategory } from "./skills/SkillCategory";
import { SkillInteraction } from "./skills/SkillInteraction";
import { prefersReducedMotion } from "@/lib/motion";
import { useIsDesktop } from "@/lib/useMedia";

export function Skills() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const desktop = useIsDesktop();

  const related = useMemo(() => {
    const set = new Set<string>();
    if (!active) return set;
    set.add(active);
    (portfolioData.skillRelations[active] ?? []).forEach((item) => set.add(item));
    return set;
  }, [active]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.from(".skill-category", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });

      if (!desktop) return;

      const clusters = el.querySelector(".skill-clusters");
      gsap.set(clusters, { autoAlpha: 0, y: 30 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 1,
        },
      });
      tl.to(".skills-grid", { y: -30, opacity: 0.12, duration: 0.4 }).to(
        clusters,
        { autoAlpha: 1, y: 0, duration: 0.4 },
        "<+=0.1",
      );
    }, el);
    return () => ctx.revert();
  }, [desktop]);

  return (
    <section id="skills" ref={root} className="site-pad relative py-[14vh]">
      <p className="section-kicker">Technical skills</p>
      <h2 className="display mt-4 text-[clamp(2.4rem,6vw,5.2rem)] tracking-[-0.05em]">
        A working vocabulary
      </h2>
      <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
        Hover a technology to see the relationships I actually use. As you continue, those
        tools regroup around the systems they belong to.
      </p>

      <div className="relative mt-12">
        <SkillInteraction active={active} />
        <div className="skills-grid relative">
          {portfolioData.skillCategories.map((category) => (
            <SkillCategory
              key={category.id}
              label={category.label}
              skills={portfolioData.skills[category.id]}
              active={active}
              related={related}
              onEnter={setActive}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>
        {active && portfolioData.skillNotes[active] ? (
          <p className="mono mt-4 text-[11px] tracking-[0.12em] uppercase text-[var(--accent)]">
            {portfolioData.skillNotes[active]}
          </p>
        ) : (
          <p className="mono mt-4 text-[11px] tracking-[0.12em] uppercase text-[var(--ink-soft)]">
            Select a skill
          </p>
        )}
      </div>

      <div className="skill-clusters mt-16 grid gap-8 lg:grid-cols-3">
        {portfolioData.projects.map((project) => (
          <div key={project.slug} className="border-t border-[var(--ink)] pt-4">
            <p className="mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-soft)]">
              {project.number} becomes
            </p>
            <p className="display mt-2 text-2xl tracking-[-0.04em]">{project.title}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {(projectSkillMap[project.slug] ?? []).map((skill) => (
                <li
                  key={skill}
                  className="mono border border-[var(--line)] px-2 py-1 text-[10px] tracking-[0.12em] uppercase"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
