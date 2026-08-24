"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { MagneticButton } from "./MagneticButton";

export function Resume() {
  const { personal, resume } = portfolioData;

  const pdfUrl = resume.pdfUrl || resume.url;

  return (
    <section id="resume" className="site-pad py-[14vh] relative">
      <p className="section-kicker">Résumé Document</p>
      <div className="mt-6 border border-[var(--line)] bg-[var(--paper-2)]/60 p-8 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span className="mono text-[10px] uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent)] px-2.5 py-1 rounded font-bold">
            Curriculum Vitae
          </span>
          <h2 className="display mt-3 text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.05em] font-semibold text-[var(--ink)]">
            {personal.name}&apos;s Résumé
          </h2>
          <p className="mt-2 text-[var(--ink-soft)] text-sm max-w-md">
            Inspect, view in browser, or download official PDF résumé document.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="display text-sm tracking-[0.16em] uppercase px-6 py-3.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-md rounded-md inline-flex items-center gap-2"
          >
            📄 Open / Download PDF ↗
          </a>
        </div>
      </div>
    </section>
  );
}
