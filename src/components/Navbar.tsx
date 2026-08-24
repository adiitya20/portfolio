"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { useExperience } from "@/context/ExperienceContext";
import { scrollToId } from "@/lib/useLenis";
import { cn } from "@/lib/cn";

export function Navbar() {
  const { loaded, activeSection, closeProject, activeProject } = useExperience();
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 40);
      if (y > last.current + 8 && y > 120) setHidden(true);
      else if (y < last.current - 6) setHidden(false);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    gsap.fromTo(
      ".nav-root",
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15 },
    );
  }, [loaded]);

  const go = (id: string) => {
    setOpen(false);
    if (activeProject) closeProject();
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "nav-root fixed inset-x-0 top-0 z-50 px-[var(--pad)] pt-5 transition-transform duration-500",
        hidden && !open ? "-translate-y-[120%]" : "translate-y-0",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-[1400px] items-center justify-between border border-transparent px-4 py-3 transition-all duration-500",
          compact || open
            ? "border-[var(--line)] bg-[color:var(--paper)]/85 backdrop-blur-sm"
            : "bg-transparent",
        )}
      >
        <button
          type="button"
          className="display text-sm tracking-[-0.03em]"
          onClick={() => go("hero")}
        >
          {portfolioData.personal.name}
        </button>
        <ul className="hidden items-center gap-7 lg:flex">
          {portfolioData.nav.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={cn(
                  "mono text-[11px] tracking-[0.18em] uppercase underline-anim",
                  activeSection === item.id && "is-active",
                )}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mono text-[11px] tracking-[0.18em] uppercase lg:hidden"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open ? (
        <div className="mt-2 border border-[var(--line)] bg-[color:var(--paper)] px-6 py-8 lg:hidden">
          <ul className="space-y-4">
            {portfolioData.nav.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="display text-3xl tracking-[-0.04em]"
                  onClick={() => go(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
