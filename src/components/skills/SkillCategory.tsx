"use client";

import { cn } from "@/lib/cn";

type Props = {
  label: string;
  skills: readonly string[];
  active: string | null;
  related: Set<string>;
  onEnter: (name: string) => void;
  onLeave: () => void;
};

export function SkillCategory({ label, skills, active, related, onEnter, onLeave }: Props) {
  return (
    <div className="skill-category border-t border-[var(--line)] py-6">
      <p className="mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink-soft)] font-semibold">{label}</p>
      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2.5">
        {skills.map((skill) => {
          const isActive = active === skill;
          const isRelated = related.has(skill);
          const dim = Boolean(active) && !isActive && !isRelated;
          return (
            <li key={`${label}-${skill}`}>
              <button
                type="button"
                data-skill={skill}
                className={cn(
                  "skill-item display relative inline-flex items-center px-3.5 py-1.5 border border-transparent text-[clamp(1rem,1.8vw,1.4rem)] tracking-[-0.03em] transition-all duration-300 rounded-md",
                  isActive && "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] shadow-md -translate-y-1 scale-105",
                  dim && "opacity-25",
                  isRelated && !isActive && "border-[var(--accent)] bg-[var(--accent-soft)]/40 text-[var(--accent)] font-medium -translate-y-0.5",
                  !isActive && !isRelated && !dim && "hover:border-[var(--line-strong)] hover:bg-[var(--paper-2)] hover:-translate-y-0.5"
                )}
                onMouseEnter={() => onEnter(skill)}
                onMouseLeave={onLeave}
                onFocus={() => onEnter(skill)}
                onBlur={onLeave}
              >
                {skill}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
