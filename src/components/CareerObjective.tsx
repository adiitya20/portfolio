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
    <section id="objective" ref={root} className="site-pad border-y border-[var(--line)] py-[16vh]">
      <p className="section-kicker">What I aim to build</p>
      <p className="objective-copy display mt-8 max-w-5xl text-[clamp(1.6rem,3.4vw,3.1rem)] leading-[1.15] tracking-[-0.035em]">
        {portfolioData.objective}
      </p>
    </section>
  );
}
