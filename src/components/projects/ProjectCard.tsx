"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Project } from "@/data/portfolio";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { MoodDetectorVisualization } from "./MoodDetectorVisualization";
import { MagneticButton } from "../MagneticButton";
import { useExperience } from "@/context/ExperienceContext";
import { velocityEffect } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  project: Project;
  active: boolean;
};

export function ProjectCard({ project, active }: Props) {
  const visual = useRef<HTMLDivElement>(null);
  const { openProject, setCursorMode } = useExperience();

  useEffect(() => {
    if (!visual.current) return;
    return velocityEffect([visual.current]);
  }, []);

  return (
    <article className="project-slide relative flex h-full min-h-[100svh] w-screen shrink-0 flex-col justify-center px-[var(--pad)] py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mono text-[11px] tracking-[0.2em] uppercase text-[var(--ink-soft)]">
            {project.number}
          </p>
          <h3 className="display mt-3 max-w-xl text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.9] tracking-[-0.05em]">
            {project.title}
          </h3>
          <p className="mono mt-4 text-[10px] tracking-[0.16em] uppercase text-[var(--accent)]">
            {project.category}
          </p>
          <p className="mt-6 max-w-md text-[var(--ink-soft)]">{project.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((tech) => (
              <li
                key={tech}
                className="mono border border-[var(--line)] px-2 py-1 text-[10px] tracking-[0.12em] uppercase"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <MagneticButton
              cursor="view"
              className="display text-sm tracking-[0.16em] uppercase"
              onClick={() => openProject(project)}
            >
              Explore project
            </MagneticButton>
            {"liveDemoUrl" in project && project.liveDemoUrl ? (
              <a
                href={project.liveDemoUrl as string}
                target="_blank"
                rel="noreferrer"
                className="display text-xs tracking-[0.16em] uppercase px-4 py-2.5 border border-[var(--accent)] bg-[var(--accent-soft)]/50 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors rounded font-semibold inline-flex items-center gap-1.5 shadow-sm"
              >
                🚀 Live Demo ↗
              </a>
            ) : null}
          </div>
        </div>
        <div
          ref={visual}
          className="project-visual origin-center will-change-transform"
          onMouseEnter={() => setCursorMode("view")}
          onMouseLeave={() => setCursorMode("default")}
        >
          {project.id === 1 && <DeepfakeVisual active={active} />}
          {project.id === 2 && <GrillHouseVisual active={active} />}
          {project.id === 3 && <MoodDetectorVisualization active={active} />}
          <div className="mt-6">
            <ArchitectureDiagram project={project} active={active} />
          </div>
        </div>
      </div>
    </article>
  );
}

function DeepfakeVisual({ active }: { active: boolean }) {
  const [scanMode, setScanMode] = useState<"video" | "audio">("video");
  const [confidence, setConfidence] = useState(96.4);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setConfidence(94 + Math.random() * 5);
    }, 1800);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="relative overflow-hidden border border-[var(--line)] bg-[#141311] text-[#f3efe6] shadow-xl p-5">
      {/* Header toolbar */}
      <div className="flex items-center justify-between border-b border-[#f3efe6]/15 pb-3 mono text-[10px] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Multimodal Detector</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setScanMode("video")}
            className={cn("px-2 py-0.5 border text-[9px]", scanMode === "video" ? "border-emerald-400 text-emerald-400" : "border-white/20 opacity-60")}
          >
            Video Frame
          </button>
          <button
            type="button"
            onClick={() => setScanMode("audio")}
            className={cn("px-2 py-0.5 border text-[9px]", scanMode === "audio" ? "border-emerald-400 text-emerald-400" : "border-white/20 opacity-60")}
          >
            Acoustic Spectrum
          </button>
        </div>
      </div>

      {/* Main Scanner Viewport */}
      <div className="relative mt-4 aspect-[16/9] overflow-hidden border border-[#f3efe6]/20 bg-[#1c1b18] flex items-center justify-center">
        {scanMode === "video" ? (
          <>
            {/* Grid heatmap overlay */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 opacity-25">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="border border-emerald-500/30 bg-emerald-500/5" />
              ))}
            </div>
            {/* Animated Laser Scanner */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-bounce shadow-[0_0_12px_#34d399]" />
            {/* Face Detection Bounding Box */}
            <div className="relative h-28 w-28 border-2 border-emerald-400/80 bg-emerald-400/10 flex flex-col justify-between p-1.5 transition-all">
              <span className="mono text-[8px] text-emerald-400 font-bold">MTCNN : FACE DETECTED</span>
              <div className="flex justify-between mono text-[8px] text-emerald-300">
                <span>CONF: {confidence.toFixed(1)}%</span>
                <span className="text-emerald-400">REAL</span>
              </div>
            </div>
          </>
        ) : (
          /* Audio spectrogram simulation */
          <div className="flex items-end justify-center gap-1.5 h-3/5 w-4/5">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-amber-500 via-emerald-400 to-emerald-300 rounded-t"
                style={{
                  height: `${20 + Math.sin(i * 0.8 + (active ? confidence : 95)) * 40 + (i % 5) * 10}%`,
                  transition: "height 0.4s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Metrics Bar */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#f3efe6]/15 pt-3 mono text-[10px] uppercase">
        <div>
          <span className="opacity-50 text-[9px] block">Model Pipeline</span>
          <span className="text-emerald-400 font-semibold">CNN + LSTM</span>
        </div>
        <div>
          <span className="opacity-50 text-[9px] block">Frame Rate</span>
          <span>60 FPS Active</span>
        </div>
        <div className="text-right">
          <span className="opacity-50 text-[9px] block">Result Signal</span>
          <span className="text-emerald-400 font-semibold">AUTHENTIC</span>
        </div>
      </div>
    </div>
  );
}

function GrillHouseVisual({ active }: { active: boolean }) {
  const [tab, setTab] = useState<"ui" | "api" | "db">("ui");

  return (
    <div className="relative border border-[var(--line)] bg-[var(--white)] p-5 shadow-xl">
      {/* Header Controls */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="display text-base font-semibold">GrillHouse Architecture</span>
        </div>
        <div className="flex gap-1 mono text-[10px] uppercase">
          {(["ui", "api", "db"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "px-2.5 py-1 border transition-colors",
                tab === t ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]" : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--ink)]",
              )}
            >
              {t === "ui" ? "Restaurant UI" : t === "api" ? "REST API" : "MySQL DB"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Body Content */}
      <div className="mt-4 min-h-[190px]">
        {tab === "ui" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border border-[var(--line)] bg-[var(--paper-2)] p-3">
              <span className="mono text-xs uppercase font-medium">Browse Restaurants</span>
              <span className="mono text-[10px] bg-[var(--accent-soft)] px-2 py-0.5 text-[var(--accent)]">Goa Region</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Spicy Harbor", "Coastline Grill", "Deck & Dine"].map((name, idx) => (
                <div key={name} className="border border-[var(--line)] bg-[var(--paper)] p-3 hover:border-[var(--accent)] transition-colors">
                  <span className="mono text-[9px] text-[var(--ink-soft)]">Rest 0{idx + 1}</span>
                  <p className="display text-sm font-semibold mt-1">{name}</p>
                  <p className="mono text-[9px] text-emerald-600 mt-2">★ 4.{8 - idx} · Open</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "api" && (
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border border-[var(--line)] bg-[var(--paper-2)] p-2.5">
              <span className="text-emerald-700 font-bold">GET /api/v1/menu</span>
              <span className="text-[10px] text-gray-500">200 OK (24ms)</span>
            </div>
            <div className="flex items-center justify-between border border-[var(--line)] bg-[var(--paper-2)] p-2.5">
              <span className="text-blue-700 font-bold">POST /api/v1/reservations</span>
              <span className="text-[10px] text-gray-500">201 CREATED</span>
            </div>
            <div className="flex items-center justify-between border border-[var(--line)] bg-[var(--paper-2)] p-2.5">
              <span className="text-purple-700 font-bold">POST /api/v1/auth/otp</span>
              <span className="text-[10px] text-gray-500">VERIFIED</span>
            </div>
          </div>
        )}

        {tab === "db" && (
          <div className="grid grid-cols-2 gap-3 text-left mono text-[11px]">
            <div className="border border-[var(--line)] bg-[var(--paper-2)] p-3">
              <p className="font-bold text-[var(--accent)] uppercase text-[10px]">Table: users</p>
              <ul className="mt-2 space-y-1 text-[10px] opacity-75">
                <li>• id (INT PK)</li>
                <li>• phone (VARCHAR)</li>
                <li>• otp_status (BOOL)</li>
              </ul>
            </div>
            <div className="border border-[var(--line)] bg-[var(--paper-2)] p-3">
              <p className="font-bold text-[var(--accent)] uppercase text-[10px]">Table: orders</p>
              <ul className="mt-2 space-y-1 text-[10px] opacity-75">
                <li>• order_id (INT PK)</li>
                <li>• user_id (FK users)</li>
                <li>• items_json (TEXT)</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer Stack Info */}
      <div className="mt-4 grid grid-cols-4 gap-2 text-center mono text-[10px] tracking-[0.12em] uppercase">
        <span className="border border-[var(--line)] py-1.5 bg-[var(--paper)]">Frontend</span>
        <span className="border border-[var(--line)] py-1.5 bg-[var(--paper)]">Node.js</span>
        <span className="border border-[var(--line)] py-1.5 bg-[var(--paper)]">Express API</span>
        <span className="border border-[var(--line)] py-1.5 bg-[var(--paper)]">MySQL DB</span>
      </div>
    </div>
  );
}
