"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";

export function Leadership() {
  const [open, setOpen] = useState(true);
  const entry = portfolioData.leadership[0];

  return (
    <section id="leadership" className="site-pad border-y border-[var(--line)] py-[12vh]">
      <p className="section-kicker">Leadership & Campus Impact</p>
      
      <div className="mt-8 border border-[var(--line)] bg-[var(--paper-2)]/60 p-6 md:p-8 rounded-lg transition-all duration-300 hover:border-[var(--line-strong)] hover:shadow-lg">
        <button
          type="button"
          className="flex w-full items-start justify-between gap-6 text-left group"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="mono text-[10px] tracking-[0.18em] uppercase bg-[var(--accent)] text-white px-2.5 py-1 rounded font-semibold">
                {entry.role}
              </span>
              <span className="mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-soft)]">
                {entry.type} · {entry.organization}
              </span>
            </div>
            <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.8rem)] tracking-[-0.05em] font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
              {entry.event}
            </h2>
          </div>
          <span className="mono text-[11px] tracking-[0.18em] uppercase border border-[var(--line)] px-3 py-1.5 rounded bg-[var(--paper)] group-hover:border-[var(--ink)] transition-colors">
            {open ? "Hide Details —" : "View Details +"}
          </span>
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-500 ease-in-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="mt-8 border-t border-[var(--line)] pt-6 grid gap-6 md:grid-cols-3">
              <div className="border border-[var(--line)] bg-[var(--paper)] p-4 rounded">
                <p className="mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)] font-bold">
                  01. Financial Management
                </p>
                <p className="display text-lg font-semibold mt-2">Budgeting & Allocation</p>
                <p className="mt-2 text-xs text-[var(--ink-soft)] leading-relaxed">
                  Managed and structured complete event finances, budgeting, and revenue allocations across multi-department technical tracks.
                </p>
              </div>

              <div className="border border-[var(--line)] bg-[var(--paper)] p-4 rounded">
                <p className="mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)] font-bold">
                  02. Sponsorship & Vendors
                </p>
                <p className="display text-lg font-semibold mt-2">Sponsorships & Procurement</p>
                <p className="mt-2 text-xs text-[var(--ink-soft)] leading-relaxed">
                  Coordinated corporate sponsorship outreach, vendor procurement contracts, and budget auditing for maximum ROI.
                </p>
              </div>

              <div className="border border-[var(--line)] bg-[var(--paper)] p-4 rounded">
                <p className="mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)] font-bold">
                  03. Fest Operations
                </p>
                <p className="display text-lg font-semibold mt-2">1,000+ Participants</p>
                <p className="mt-2 text-xs text-[var(--ink-soft)] leading-relaxed">
                  Collaborated with student committees and faculty leads to ensure seamless financial execution throughout the annual flagship fest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
