"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { useExperience } from "@/context/ExperienceContext";
import { prefersReducedMotion } from "@/lib/motion";

export function LoadingScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const { loaded, setLoaded } = useExperience();

  useEffect(() => {
    if (loaded) return;
    const reduced = prefersReducedMotion();
    const started = performance.now();

    const finish = () => {
      const el = ref.current;
      if (!el) {
        setLoaded(true);
        return;
      }
      if (reduced) {
        gsap.set(el, { autoAlpha: 0, display: "none" });
        setLoaded(true);
        return;
      }
      const tl = gsap.timeline({
        onComplete: () => {
          el.style.display = "none";
          setLoaded(true);
        },
      });
      tl.to(".loader-line", { scaleX: 1, duration: 0.35, ease: "power3.inOut" })
        .to(
          el,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.85,
            ease: "power4.inOut",
          },
          "+=0.05",
        );
    };

    const maxWait = reduced ? 80 : 1100;
    const id = window.setTimeout(() => {
      const elapsed = performance.now() - started;
      window.setTimeout(finish, Math.max(0, maxWait - elapsed));
    }, 40);

    return () => window.clearTimeout(id);
  }, [loaded, setLoaded]);

  if (loaded) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[70] flex flex-col justify-between bg-[#1c1b18] px-[var(--pad)] py-8 text-[#f3efe6]"
      style={{ clipPath: "inset(0 0 0 0)" }}
      aria-hidden="true"
    >
      <p className="mono text-[11px] tracking-[0.28em] uppercase opacity-70">
        Portfolio
      </p>
      <div>
        <p className="display text-[clamp(2.4rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]">
          {portfolioData.personal.name}
        </p>
        <div className="mt-8 h-px w-full origin-left scale-x-0 bg-[#f3efe6]/40 loader-line" />
        <p className="mono mt-4 text-[11px] tracking-[0.22em] uppercase opacity-60">
          Loading
        </p>
      </div>
    </div>
  );
}
