"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { MagneticButton } from "./MagneticButton";

export function Resume() {
  const [open, setOpen] = useState(false);
  const { personal, resume, education, leadership, skills } = portfolioData;

  const printResume = () => {
    window.print();
  };

  return (
    <section id="resume" className="site-pad py-[14vh]">
      <p className="section-kicker">Resume</p>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <h2 className="display text-[clamp(2.4rem,6vw,5rem)] tracking-[-0.05em]">
          {personal.name}
        </h2>
        <div className="flex gap-8">
          <MagneticButton
            className="display text-sm tracking-[0.16em] uppercase"
            onClick={() => setOpen(true)}
          >
            View resume
          </MagneticButton>
          <MagneticButton
            className="display text-sm tracking-[0.16em] uppercase"
            href={resume.url}
          >
            Download resume
          </MagneticButton>
        </div>
      </div>
      <p className="mt-4 max-w-lg text-sm text-[var(--ink-soft)]">{resume.note}</p>

      <div
        className="mt-10 overflow-hidden border border-[var(--line)] bg-[var(--white)] transition-[max-height] duration-700"
        style={{ maxHeight: open ? 1200 : 180 }}
      >
        <div id="resume-preview" className="p-8 md:p-12">
          <div className="flex justify-between gap-6">
            <div>
              <p className="display text-4xl tracking-[-0.05em]">{personal.name}</p>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                {personal.role} · {personal.degree}
              </p>
            </div>
            <button
              type="button"
              className="mono text-[10px] tracking-[0.16em] uppercase"
              onClick={printResume}
            >
              Print
            </button>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p className="mono text-[10px] tracking-[0.16em] uppercase">Education</p>
              {education.map((item) => (
                <p key={item.id} className="mt-3 text-sm">
                  {item.institution}
                  {item.degree ? ` — ${item.degree}` : ""} · {item.score}
                </p>
              ))}
            </div>
            <div>
              <p className="mono text-[10px] tracking-[0.16em] uppercase">Leadership</p>
              <p className="mt-3 text-sm">
                {leadership[0].event} — {leadership[0].role}
              </p>
              <p className="mono mt-8 text-[10px] tracking-[0.16em] uppercase">Skills</p>
              <p className="mt-3 text-sm">{skills.programming.join(" · ")}</p>
              <p className="mt-2 text-sm">{skills.web.join(" · ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
