"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function EducationTimeline() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".edu-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 20%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>(".edu-item").forEach((item) => {
        gsap.from(item.querySelectorAll(".edu-reveal"), {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 78%" },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={root} className="site-pad relative py-[16vh]">
      <p className="section-kicker">Education</p>
      <h2 className="display mt-4 text-[clamp(2.4rem,6vw,5rem)] tracking-[-0.05em]">
        A measured path
      </h2>
      <div className="relative mt-16">
        <div className="edu-line absolute left-[7px] top-0 h-full w-px origin-top bg-[var(--ink)] md:left-1/2" />
        <ol className="space-y-16">
          {portfolioData.education.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                "edu-item group relative grid gap-6 md:grid-cols-2",
                index % 2 === 1 && "md:[&>*:first-child]:col-start-2",
              )}
            >
              <div
                className={cn(
                  "absolute left-0 top-2 h-4 w-4 rounded-full border border-[var(--ink)] bg-[var(--paper)] transition-transform duration-300 group-hover:scale-125 md:left-1/2 md:-translate-x-1/2",
                  item.current && "bg-[var(--accent)] border-[var(--accent)] shadow-[0_0_12px_rgba(180,74,40,0.6)] animate-pulse",
                )}
              />
              <div
                className={cn(
                  "pl-8 md:pl-0 border border-transparent p-5 rounded-lg transition-all duration-300 hover:border-[var(--line)] hover:bg-[var(--paper-2)]/60 hover:shadow-md",
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12",
                )}
              >
                <div className="flex items-center gap-2 flex-wrap md:justify-start" style={{ justifyContent: index % 2 === 0 ? "flex-end" : "flex-start" }}>
                  <span className="edu-reveal mono text-[10px] tracking-[0.18em] uppercase bg-[var(--paper-3)] px-2 py-0.5 rounded text-[var(--ink-soft)] font-medium">
                    {item.status}
                  </span>
                  {item.current && (
                    <span className="edu-reveal mono text-[9px] tracking-wider uppercase text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
                <h3 className="edu-reveal display mt-3 text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.04em] font-semibold">
                  {item.institution}
                </h3>
                {item.degree ? (
                  <p className="edu-reveal mt-1 text-[var(--ink-soft)] font-medium">{item.degree}</p>
                ) : null}
                {item.location ? (
                  <p className="edu-reveal mono mt-1 text-[11px] tracking-[0.12em] uppercase text-[var(--ink-soft)]">
                    {item.location}
                  </p>
                ) : null}
                <p className="edu-reveal mt-2 text-xs mono text-[var(--ink-soft)]">{item.period}</p>

                <div className="edu-reveal mt-4 inline-block border-l-2 border-[var(--accent)] pl-3 text-left">
                  <p className="mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)]">Academic Score</p>
                  <p className="display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">{item.score}</p>
                </div>

                {item.id === "pcce" && (
                  <div className="edu-reveal mt-4 pt-3 border-t border-[var(--line)]/50">
                    <p className="mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)] mb-2">Core Coursework</p>
                    <div className={cn("flex flex-wrap gap-1.5", index % 2 === 0 ? "md:justify-end" : "justify-start")}>
                      {["Data Structures", "DBMS", "Machine Learning", "Computer Vision", "Node.js"].map((course) => (
                        <span key={course} className="mono text-[9px] uppercase px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
