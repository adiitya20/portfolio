"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function EducationTimeline() {
  const root = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const tracerDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      // Fill line & tracer dot moving down with scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 65%",
            end: "bottom 35%",
            scrub: 0.5,
            onUpdate: (self) => {
              if (tracerDotRef.current) {
                tracerDotRef.current.style.top = `${self.progress * 100}%`;
              }
            },
          },
        },
      );

      // Card reveals on scroll down
      gsap.utils.toArray<HTMLElement>(".edu-item").forEach((item, index) => {
        gsap.fromTo(
          item.querySelectorAll(".edu-reveal"),
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            },
          },
        );

        // Highlight timeline node when scrolled into view
        gsap.fromTo(
          item.querySelector(".edu-node"),
          { scale: 0.6, backgroundColor: "var(--paper)" },
          {
            scale: 1.25,
            backgroundColor: index === 0 ? "var(--accent)" : "var(--ink)",
            duration: 0.4,
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={root} className="site-pad relative py-[16vh] overflow-hidden">
      <p className="section-kicker">Education & Academic Journey</p>
      <h2 className="display mt-4 text-[clamp(2.4rem,6vw,5rem)] tracking-[-0.05em] font-semibold text-[var(--ink)]">
        A Measured Path
      </h2>
      <p className="mt-4 max-w-xl text-[var(--ink-soft)] leading-relaxed">
        Tracing my academic foundation from secondary school through higher secondary science to Information Technology engineering at Padre Conceição College of Engineering.
      </p>

      <div className="relative mt-16 min-h-[500px]">
        {/* Base Timeline Line */}
        <div className="absolute left-[8px] top-0 h-full w-0.5 bg-[var(--line)] md:left-1/2 md:-translate-x-1/2" />
        
        {/* Animated Fill Line on Scroll Down */}
        <div
          ref={progressLineRef}
          className="absolute left-[8px] top-0 h-full w-0.5 origin-top bg-[var(--accent)] shadow-[0_0_10px_#b44a28] md:left-1/2 md:-translate-x-1/2"
          style={{ transform: "scaleY(0)" }}
        />

        {/* Laser Tracer Dot moving down on scroll */}
        <div
          ref={tracerDotRef}
          className="pointer-events-none absolute left-[3px] top-0 z-20 h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_14px_#b44a28] transition-all md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="space-y-16 relative z-10">
          {portfolioData.education.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                "edu-item group relative grid gap-6 md:grid-cols-2",
                index % 2 === 1 && "md:[&>*:first-child]:col-start-2",
              )}
            >
              {/* Timeline Node Point */}
              <div
                className={cn(
                  "edu-node absolute left-0 top-3 h-4 w-4 rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] transition-all duration-300 md:left-1/2 md:-translate-x-1/2 z-10",
                  item.current && "shadow-[0_0_14px_rgba(180,74,40,0.8)] animate-pulse",
                )}
              />

              {/* Card Container */}
              <div
                className={cn(
                  "pl-8 md:pl-0 border border-[var(--line)]/50 bg-[var(--paper-2)]/40 p-6 rounded-xl transition-all duration-500 hover:border-[var(--accent)] hover:bg-[var(--paper-2)] hover:shadow-xl hover:-translate-y-1",
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12",
                )}
              >
                <div
                  className="flex items-center gap-2 flex-wrap"
                  style={{ justifyContent: index % 2 === 0 ? "flex-end" : "flex-start" }}
                >
                  <span className="edu-reveal mono text-[10px] tracking-[0.18em] uppercase bg-[var(--paper-3)] px-2.5 py-1 rounded text-[var(--ink-soft)] font-bold">
                    0{index + 1} · {item.status}
                  </span>
                  {item.current && (
                    <span className="edu-reveal mono text-[9px] tracking-wider uppercase text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded shadow-xs">
                      ✦ Current Program
                    </span>
                  )}
                </div>

                <h3 className="edu-reveal display mt-3 text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.04em] font-semibold text-[var(--ink)]">
                  {item.institution}
                </h3>
                
                {item.degree ? (
                  <p className="edu-reveal mt-1 text-[var(--accent)] font-semibold text-sm">{item.degree}</p>
                ) : null}
                
                {item.location ? (
                  <p className="edu-reveal mono mt-1 text-[11px] tracking-[0.12em] uppercase text-[var(--ink-soft)]">
                    📍 {item.location}
                  </p>
                ) : null}
                
                <p className="edu-reveal mt-2 text-xs mono text-[var(--ink-soft)] font-medium">🗓 {item.period}</p>

                {/* Score Pill */}
                <div className="edu-reveal mt-4 inline-block border-l-2 border-[var(--accent)] bg-[var(--paper)] px-4 py-2 rounded-r-md text-left shadow-xs">
                  <p className="mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)] font-bold">Academic Score</p>
                  <p className="display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">{item.score}</p>
                </div>

                {item.id === "pcce" && (
                  <div className="edu-reveal mt-5 pt-3 border-t border-[var(--line)]/50">
                    <p className="mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)] mb-2 font-bold">Core Coursework</p>
                    <div className={cn("flex flex-wrap gap-1.5", index % 2 === 0 ? "md:justify-end" : "justify-start")}>
                      {["Data Structures", "DBMS", "Machine Learning", "Computer Vision", "Web Tech", "OS"].map((course) => (
                        <span key={course} className="mono text-[9px] uppercase px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] rounded-xs hover:border-[var(--accent)] transition-colors">
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
