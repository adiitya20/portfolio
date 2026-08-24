"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/context/ExperienceContext";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/useMedia";
import { cn } from "@/lib/cn";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const { cursorMode } = useExperience();
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (touch || reduced) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }
    document.documentElement.classList.add("has-custom-cursor");

    const pos = { x: 0, y: 0 };
    const lag = { x: 0, y: 0 };

    const onMove = (event: MouseEvent) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
    };

    let raf = 0;
    const loop = () => {
      lag.x += (pos.x - lag.x) * 0.18;
      lag.y += (pos.y - lag.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${lag.x}px, ${lag.y}px)`;
      }
      if (label.current) {
        label.current.style.transform = `translate(${lag.x}px, ${lag.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [touch, reduced]);

  if (touch || reduced) return null;

  const hover = cursorMode !== "default";

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden lg:block" aria-hidden>
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)]"
      />
      <div
        ref={ring}
        className={cn(
          "absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--ink)] transition-[width,height,opacity] duration-300",
          hover ? "h-16 w-16 opacity-100" : "h-8 w-8 opacity-40",
        )}
      />
      <div
        ref={label}
        className={cn(
          "absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 mono text-[9px] tracking-[0.2em] uppercase transition-opacity duration-300",
          hover ? "opacity-100" : "opacity-0",
        )}
      >
        {cursorMode === "view" ? "View" : cursorMode === "open" ? "Open" : ""}
      </div>
    </div>
  );
}
