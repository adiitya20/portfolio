import { portfolioData } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="site-pad flex flex-col gap-4 border-t border-[var(--line)] py-8 md:flex-row md:items-center md:justify-between">
      <p className="mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-soft)]">
        {portfolioData.personal.name}
      </p>
      <p className="mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-soft)]">
        {portfolioData.personal.location} · {portfolioData.personal.collegeShort}
      </p>
    </footer>
  );
}
