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
            className="about-frame group relative aspect-[4/5] overflow-hidden border border-[var(--line)] bg-[var(--paper-2)] p-4 shadow-2xl transition-transform duration-300 ease-out hover:shadow-2xl rounded-xl"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              card.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale3d(1.02, 1.02, 1.02)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
            }}
          >
            {/* Background texture & ambient grid */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#e8dacb,transparent_60%),radial-gradient(ellipse_at_bottom_left,#dfcfbb,transparent_60%),#f3efe6]" />
            
            {/* Main Portrait Container */}
            <div className="relative z-10 h-full w-full overflow-hidden rounded-lg border border-[var(--line)] bg-black/5 flex flex-col justify-between p-4">
              
              {/* Top Bar: Status */}
              <div className="flex items-center justify-between z-20">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur-md text-white mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Aditya Verlekar</span>
                </div>
                <span className="mono text-[10px] tracking-widest text-white/80 uppercase bg-black/40 backdrop-blur-md px-2.5 py-1 rounded border border-white/20">
                  GOA, IND
                </span>
              </div>

              {/* Developer Photo with Hover Effects */}
              <div className="absolute inset-0 z-0">
                {/* Image */}
                <img
                  src="/aditya.jpg"
                  alt="Aditya Verlekar"
                  className="h-full w-full object-cover object-center grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                {/* Laser scanline on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-bounce shadow-[0_0_15px_#f59e0b]" />

                {/* Cyberpunk HUD Frame corner markers */}
                <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-amber-400/80 pointer-events-none" />

                {/* Dark gradient overlay for bottom text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Bottom: Stat highlights over photo */}
              <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-white/20 pt-3 text-white backdrop-blur-md bg-black/40 px-3 py-2 rounded-md">
                <div>
                  <p className="mono text-[9px] uppercase tracking-widest opacity-75">
                    Role & Focus
                  </p>
                  <p className="display text-xs font-bold text-amber-400">Software & AI Engineer</p>
                </div>
                <div>
                  <p className="mono text-[9px] uppercase tracking-widest opacity-75">
                    Degree & CGPA
                  </p>
                  <p className="display text-xs font-semibold leading-tight">
                    B.E. IT · {personal.cgpa}
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
