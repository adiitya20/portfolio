"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const moods = ["Calm", "Focused", "Upbeat"] as const;

const playlists: Record<(typeof moods)[number], string[]> = {
  Calm: ["Evening Air", "Low Tide Notes", "Quiet Room"],
  Focused: ["Deep Work Loop", "Clear Desk", "Signal Path"],
  Upbeat: ["Open Windows", "Sunlit Corridor", "Bright Interval"],
};

type Props = {
  active: boolean;
};

export function MoodDetectorVisualization({ active }: Props) {
  const [phase, setPhase] = useState<"idle" | "scan" | "mood" | "music">("idle");
  const [count, setCount] = useState(10);
  const mood = moods[1];

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      setCount(10);
      return;
    }
    setPhase("scan");
    setCount(10);
    const interval = window.setInterval(() => {
      setCount((value) => {
        if (value <= 1) {
          window.clearInterval(interval);
          setPhase("mood");
          window.setTimeout(() => setPhase("music"), 900);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [active]);

  return (
    <div className="relative overflow-hidden border border-[var(--line)] bg-[#1c1b18] text-[#f3efe6]">
      <div className="flex items-center justify-between px-4 py-3 mono text-[10px] tracking-[0.16em] uppercase">
        <span>Camera analysis</span>
        <span>Visualization only — camera is not accessed</span>
      </div>
      <div className="relative aspect-[16/10]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#3a342c,transparent_55%),#141311]" />
        <div className="scan-line absolute inset-x-8 top-[18%] h-px bg-[#f3efe6]/50" />
        <div
          className={cn(
            "absolute left-1/2 top-[22%] h-[48%] w-[32%] -translate-x-1/2 border border-[#f3efe6]/70",
            phase === "scan" && "animate-pulse",
          )}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" aria-hidden>
          {/* Facial Mesh Wireframe Points */}
          <circle cx="42" cy="22" r="1.5" fill="#34d399" opacity="0.9" />
          <circle cx="58" cy="22" r="1.5" fill="#34d399" opacity="0.9" />
          <circle cx="50" cy="28" r="1.2" fill="#34d399" opacity="0.9" />
          <circle cx="44" cy="36" r="1.2" fill="#34d399" opacity="0.8" />
          <circle cx="56" cy="36" r="1.2" fill="#34d399" opacity="0.8" />
          <circle cx="50" cy="38" r="1.5" fill="#34d399" opacity="0.9" />
          
          {/* Connecting Mesh Lines */}
          <line x1="42" y1="22" x2="50" y2="28" stroke="#34d399" strokeOpacity="0.4" strokeDasharray="1,1" />
          <line x1="58" y1="22" x2="50" y2="28" stroke="#34d399" strokeOpacity="0.4" strokeDasharray="1,1" />
          <line x1="50" y1="28" x2="50" y2="38" stroke="#34d399" strokeOpacity="0.4" strokeDasharray="1,1" />
          <path d="M42 22 Q50 16 58 22" fill="none" stroke="#34d399" strokeOpacity="0.5" />
          <path d="M44 36 Q50 42 56 36" fill="none" stroke="#34d399" strokeOpacity="0.6" />
        </svg>

        <div className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/40 bg-black/40 backdrop-blur-xs display text-xl text-emerald-400 font-bold">
          {String(count).padStart(2, "0")}s
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            {phase === "scan" && (
              <div className="space-y-1">
                <p className="mono text-[11px] tracking-[0.16em] uppercase text-emerald-400 font-medium">
                  • Analyzing facial expressions & facial landmarks
                </p>
                <div className="flex gap-3 text-[9px] mono opacity-60">
                  <span>Eye Aspect Ratio: 0.28</span>
                  <span>Mouth Smile Index: 0.84</span>
                </div>
              </div>
            )}
            {phase === "mood" && (
              <p className="display text-2xl tracking-[-0.04em] text-emerald-300 font-semibold">
                Mood detected — {mood} (89% Confidence)
              </p>
            )}
            {phase === "music" && (
              <div className="flex items-center gap-3">
                <p className="mono text-[11px] tracking-[0.16em] uppercase text-emerald-400">
                  ♫ Generating personalized music queue
                </p>
                {/* Animated Equalizer Bars */}
                <div className="flex items-end gap-1 h-4">
                  <span className="w-1 bg-emerald-400 h-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 bg-emerald-400 h-3/4 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 bg-emerald-400 h-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="w-1 bg-emerald-400 h-1/2 animate-bounce" style={{ animationDelay: "450ms" }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid gap-px bg-[var(--line)] sm:grid-cols-3">
        {playlists[mood].map((item, index) => (
          <div
            key={item}
            className={cn(
              "bg-[#1c1b18] px-4 py-5 transition-all duration-700 hover:bg-[#262420]",
              phase === "music" ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <p className="mono text-[10px] tracking-[0.16em] uppercase text-emerald-400/80">
              Track 0{index + 1}
            </p>
            <p className="display mt-2 text-lg tracking-[-0.03em] font-medium">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
