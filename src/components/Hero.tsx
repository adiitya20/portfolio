"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { useExperience } from "@/context/ExperienceContext";
import { MagneticButton } from "./MagneticButton";
import { HeroBackground } from "./HeroBackground";
import { prefersReducedMotion, splitChars } from "@/lib/motion";
import { scrollToId } from "@/lib/useLenis";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { loaded } = useExperience();

  useEffect(() => {
    if (!loaded || !root.current) return;
    const reduced = prefersReducedMotion();
    const q = gsap.utils.selector(root);
    const first = q(".hero-first")[0] as HTMLElement;
    const last = q(".hero-last")[0] as HTMLElement;

    if (reduced) {
      gsap.set(q(".hero-hide"), { opacity: 1, y: 0, clipPath: "none", filter: "none" });
      return;
    }

    splitChars(first);
    splitChars(last);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    gsap.set(q(".hero-visual"), { scale: 1.04, opacity: 0.35 });

    tl.from(q(".hero-meta"), {
      y: 18,
      opacity: 0,
      stagger: 0.07,
      duration: 0.55,
    })
      .fromTo(
        q(".hero-first .char"),
        { yPercent: 120, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.028,
          duration: 0.7,
          ease: "power4.out",
        },
        "-=0.1",
      )
      .fromTo(
        q(".hero-last .char"),
        { yPercent: 120, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.024,
          duration: 0.7,
          ease: "power4.out",
        },
        "-=0.45",
      )
      .fromTo(
        q(".hero-name-wrap"),
        { scale: 1.04 },
        { scale: 1, duration: 0.9, ease: "power3.out" },
        "<",
      )
      .from(
        q(".hero-role"),
        { y: 28, opacity: 0, filter: "blur(10px)", duration: 0.6 },
        "-=0.35",
      )
      .from(
        q(".hero-line"),
        { yPercent: 100, opacity: 0, stagger: 0.08, duration: 0.55 },
        "-=0.25",
      )
      .from(q(".hero-cta"), { y: 22, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.2")
      .to(q(".hero-visual"), { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0.2);

    const ctx = gsap.context(() => {
      gsap.to(q(".hero-name-wrap"), {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(q(".hero-copy"), {
        yPercent: -8,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => {
      tl.kill();
      ctx.revert();
    };
  }, [loaded]);

  const { personal } = portfolioData;

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8 pt-[88px]"
    >
      <div className="hero-visual pointer-events-none absolute inset-0">
        <HeroBackground />
      </div>
      <div className="site-pad relative z-10 flex items-start justify-between gap-6">
        <p className="hero-meta hero-hide mono text-[11px] tracking-[0.2em] uppercase text-[var(--ink-soft)]">
          {personal.location}
        </p>
        <p className="hero-meta hero-hide mono text-[11px] tracking-[0.2em] uppercase text-[var(--ink-soft)]">
          {personal.collegeShort}
        </p>
        <p className="hero-meta hero-hide hidden text-right mono text-[11px] tracking-[0.2em] uppercase text-[var(--ink-soft)] sm:block">
          {personal.degree}
        </p>
        <p className="hero-meta hero-hide mono text-[11px] tracking-[0.2em] uppercase text-[var(--ink-soft)]">
          CGPA {personal.cgpa}
        </p>
      </div>

      <div className="site-pad relative z-10 mt-10">
        <div className="hero-name-wrap overflow-hidden">
          <h1 className="display leading-[0.82] tracking-[-0.06em]">
            <span className="hero-first block overflow-hidden text-[clamp(3.4rem,12vw,11rem)]">
              {personal.firstName}
            </span>
            <span className="hero-last block overflow-hidden text-[clamp(3.4rem,12vw,11rem)]">
              {personal.lastName}
            </span>
          </h1>
        </div>
        <p className="hero-role hero-hide display mt-6 text-[clamp(1.1rem,2.4vw,2rem)] tracking-[-0.03em]">
          {personal.role}
        </p>
        <p className="hero-hide mono mt-2 text-[11px] tracking-[0.18em] uppercase text-[var(--ink-soft)]">
          {personal.disciplines}
        </p>
      </div>

      <div className="hero-copy site-pad relative z-10 mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <p className="max-w-xl text-[1.05rem] leading-7 text-[var(--ink-soft)]">
          <span className="hero-line hero-hide inline-block overflow-hidden">
            {personal.heroSummary}
          </span>
        </p>
        <div className="flex flex-wrap gap-8 pb-4">
          <MagneticButton
            className="hero-cta hero-hide display text-sm tracking-[0.16em] uppercase"
            onClick={() => scrollToId("projects")}
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            className="hero-cta hero-hide display text-sm tracking-[0.16em] uppercase"
            onClick={() => scrollToId("contact")}
          >
            Contact Me
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
