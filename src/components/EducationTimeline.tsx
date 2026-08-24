"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function EducationTimeline() {
  const root = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const tracerDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    registerGsap();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      // Fill line & tracer dot moving down with scroll
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 0.5,
              onUpdate: (self) => {
                if (tracerDotRef.current) {
                  tracerDotRef.current.style.top = `${self.progress * 100}%`;
                }
              },
            },
          },
        );
      }

      // Card reveals on scroll down
      gsap.utils.toArray<HTMLElement>(".edu-item").forEach((item, index) => {
        gsap.fromTo(
          item.querySelectorAll(".edu-reveal"),
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
            },
          },
        );

        // Highlight timeline node when scrolled into view
        gsap.fromTo(
          item.querySelector(".edu-node"),
          { scale: 0.7, backgroundColor: "var(--paper)" },
          {
            scale: 1.3,
            backgroundColor: index === 0 ? "var(--accent)" : "var(--ink)",
            duration: 0.4,
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
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
      <h2 className="display mt-4 text-[clamp(2.4rem,6vw,5.2rem)] tracking-[-0.05em] font-semibold text-[var(--ink)]">
        A Measured Path
      </h2>
      <p className="mt-4 max-w-xl text-[var(--ink-soft)] leading-relaxed">
        Tracing my academic foundation from secondary school through higher secondary science to Information Technology engineering at Padre Conceição College of Engineering.
      </p>

      <div className="relative mt-16 max-w-4xl">
        {/* Timeline Axis Line (Left Side) */}
        <div className="absolute left-[7px] top-0 h-full w-0.5 bg-[var(--line)]" />

        {/* Animated Fill Line on Scroll Down */}
        <div
          ref={progressLineRef}
          className="absolute left-[7px] top-0 h-full w-0.5 origin-top bg-[var(--accent)] shadow-[0_0_12px_#b44a28]"
          style={{ transform: "scaleY(0)" }}
        />

        {/* Laser Tracer Dot moving down on scroll */}
        <div
          ref={tracerDotRef}
          className="pointer-events-none absolute left-[2px] top-0 z-20 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_16px_#b44a28] transition-all"
        />

        <ol className="space-y-12 relative z-10">
          {portfolioData.education.map((item, index) => (
            <li key={item.id} className="edu-item group relative pl-8">
              {/* Timeline Node Point */}
              <div
                className={cn(
                  "edu-node absolute left-0 top-6 h-4 w-4 rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] transition-all duration-300 z-20",
                  item.current && "shadow-[0_0_16px_rgba(180,74,40,0.9)] animate-pulse",
                )}
              />

              {/* Education Card */}
              <div className="border border-[var(--line)] bg-[var(--paper-2)]/60 p-6 md:p-8 rounded-xl shadow-md transition-all duration-500 hover:border-[var(--accent)] hover:bg-[var(--paper-2)] hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                  <div className="flex items-center gap-2">
                    <span className="edu-reveal mono text-[10px] tracking-[0.18em] uppercase bg-[var(--paper-3)] px-2.5 py-1 rounded text-[var(--ink-soft)] font-bold">
                      0{index + 1} · {item.status}
                    </span>
                    {item.current && (
                      <span className="edu-reveal mono text-[9px] tracking-wider uppercase text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded shadow-xs">
                        ✦ Current Program
                      </span>
                    )}
                  </div>
                  <p className="edu-reveal text-xs mono text-[var(--ink-soft)] font-semibold">🗓 {item.period}</p>
                </div>

                <h3 className="edu-reveal display text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.04em] font-semibold text-[var(--ink)]">
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

                <div className="edu-reveal mt-4 inline-block border-l-2 border-[var(--accent)] bg-[var(--paper)] px-4 py-2 rounded-r-md text-left shadow-xs">
                  <p className="mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)] font-bold">Academic Score</p>
                  <p className="display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">{item.score}</p>
                </div>

                {item.id === "pcce" && (
                  <div className="edu-reveal mt-5 pt-4 border-t border-[var(--line)]/50">
                    <p className="mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)] mb-2 font-bold">Core Coursework</p>
                    <div className="flex flex-wrap gap-2">
                      {["Data Structures", "DBMS", "Machine Learning", "Computer Vision", "Web Tech", "Operating Systems", "Networking"].map((course) => (
                        <span key={course} className="mono text-[9px] uppercase px-2.5 py-1 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] rounded-xs hover:border-[var(--accent)] transition-colors">
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
