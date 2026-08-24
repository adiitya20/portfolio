"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { prefersReducedMotion, splitLines } from "@/lib/motion";

export function About() {
  const root = useRef<HTMLElement>(null);
  const { personal } = portfolioData;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const copy = el.querySelectorAll<HTMLElement>(".about-copy");
      copy.forEach((node) => splitLines(node));
      if (reduced) return;

      gsap.from(".about-kicker", {
        y: 20,
        clipPath: "inset(100% 0 0 0)",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
      gsap.from(".about-title span", {
        yPercent: 110,
        stagger: 0.08,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 68%" },
      });
      gsap.from(".about-copy .line-inner", {
        yPercent: 110,
        stagger: 0.06,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 62%" },
      });
      gsap.from(".about-meta p", {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 58%" },
      });
      gsap.fromTo(
        ".about-frame",
        { clipPath: "inset(18% 18% 18% 18%)", scale: 1.08 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%" },
        },
      );
      gsap.to(".about-frame", {
        y: 60,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".about-type", {
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="site-pad relative py-[18vh]">
      <p className="about-kicker section-kicker">About me</p>
      <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="about-type">
          <h2 className="about-title display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.88] tracking-[-0.05em]">
            <span className="block overflow-hidden">
              <span className="inline-block">{personal.firstName}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block">{personal.lastName}</span>
            </span>
          </h2>
          <div className="mt-10 max-w-xl space-y-5 text-[1.05rem] leading-7 text-[var(--ink-soft)]">
            {personal.about.map((paragraph) => (
              <p key={paragraph} className="about-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="relative">
          <div
            className="about-frame group relative aspect-[4/5] overflow-hidden border border-[var(--line)] bg-[var(--paper-2)] p-6 shadow-xl transition-transform duration-300 ease-out hover:shadow-2xl"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              card.style.transform = `perspective(1000px) rotateY(${x / 25}deg) rotateX(${-y / 25}deg) scale3d(1.02, 1.02, 1.02)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
            }}
          >
            {/* Background texture & ambient grid */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#e8dacb,transparent_60%),radial-gradient(ellipse_at_bottom_left,#dfcfbb,transparent_60%),#f3efe6]" />
            <svg
              className="absolute inset-0 h-full w-full opacity-20 transition-opacity duration-500 group-hover:opacity-35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="about-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#about-grid)" />
            </svg>
            <div className="absolute inset-[8%] border border-[var(--ink)]/15" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              {/* Top Bar: Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-[var(--ink)]/20 bg-[var(--paper)]/80 px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur-xs mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Roles</span>
                </div>
                <span className="mono text-[10px] tracking-widest text-[var(--ink-soft)] uppercase">
                  IND / {personal.location.split(",")[0]}
                </span>
              </div>

              {/* Center: Stylized Developer Monogram */}
              <div className="my-auto text-center py-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-[var(--ink)]/20 bg-[var(--paper)]/60 shadow-inner backdrop-blur-xs">
                  <span className="display text-4xl font-light tracking-tighter text-[var(--ink)]">
                    {personal.firstName[0]}
                    {personal.lastName[0]}
                  </span>
                </div>
                <p className="display mt-4 text-2xl tracking-tight text-[var(--ink)]">
                  {personal.name}
                </p>
                <p className="mono mt-1 text-[11px] tracking-widest uppercase text-[var(--accent)] font-medium">
                  {personal.role}
                </p>
              </div>

              {/* Bottom: Stat highlights */}
              <div className="grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-4">
                <div>
                  <p className="mono text-[9px] uppercase tracking-widest text-[var(--ink-soft)]">
                    Degree Score
                  </p>
                  <p className="display text-lg font-bold text-[var(--ink)]">{personal.cgpa}</p>
                </div>
                <div>
                  <p className="mono text-[9px] uppercase tracking-widest text-[var(--ink-soft)]">
                    Institution
                  </p>
                  <p className="display text-xs font-semibold text-[var(--ink)] leading-tight">
                    {personal.collegeShort} · IT
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-meta mt-6 flex flex-wrap items-center justify-between gap-2 mono text-[11px] tracking-[0.14em] uppercase text-[var(--ink-soft)]">
            <p>{personal.degree}</p>
            <p>•</p>
            <p>{personal.location}</p>
            <p>•</p>
            <p>{personal.years}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
