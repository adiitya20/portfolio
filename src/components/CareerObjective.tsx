"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { prefersReducedMotion, splitLines } from "@/lib/motion";

export function CareerObjective() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const copy = el.querySelector<HTMLElement>(".objective-copy");
    if (copy) splitLines(copy);
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.from(".objective-copy .line-inner", {
        yPercent: 120,
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
      gsap.to(".objective-copy", {
        x: -40,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="objective" ref={root} className="site-pad border-y border-[var(--line)] py-[16vh] relative overflow-hidden">
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 display text-[18vw] font-bold text-[var(--ink)]/5 select-none leading-none">
        GOAL
      </span>
      <p className="section-kicker">What I aim to build</p>
      <div className="relative z-10">
        <p className="objective-copy display mt-8 max-w-5xl text-[clamp(1.6rem,3.4vw,3.1rem)] leading-[1.15] tracking-[-0.035em] font-medium text-[var(--ink)]">
          {portfolioData.objective}
        </p>
        <div className="mt-8 flex flex-wrap gap-2 mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
          <span className="border border-[var(--accent)]/30 px-3 py-1 bg-[var(--accent-soft)]/20 rounded">✦ Full-Stack Web Development</span>
          <span className="border border-[var(--accent)]/30 px-3 py-1 bg-[var(--accent-soft)]/20 rounded">✦ Machine Learning & Computer Vision</span>
          <span className="border border-[var(--accent)]/30 px-3 py-1 bg-[var(--accent-soft)]/20 rounded">✦ Data-Driven Systems</span>
        </div>
      </div>
    </section>
  );
}
