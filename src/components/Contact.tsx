"use client";

import { FormEvent, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const contact = portfolioData.contact;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <section id="contact" className="site-pad py-[16vh]">
      <p className="section-kicker">Let&apos;s connect</p>
      <h2 className="display mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.05em]">
        {contact.heading}
      </h2>
      <p className="mt-6 max-w-xl text-lg text-[var(--ink-soft)]">{contact.text}</p>

      <div className="mt-14 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={onSubmit} className="space-y-8">
          <label className="block group">
            <span className="mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-soft)] group-focus-within:text-[var(--accent)] transition-colors">
              Your Name
            </span>
            <input
              required
              name="name"
              placeholder="e.g. Alex Smith"
              className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--ink)] placeholder:text-[var(--ink-soft)]/40 outline-none transition-colors focus:border-[var(--accent)]"
            />
          </label>
          <label className="block group">
            <span className="mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-soft)] group-focus-within:text-[var(--accent)] transition-colors">
              Email Address
            </span>
            <input
              required
              type="email"
              name="email"
              placeholder="alex@example.com"
              className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--ink)] placeholder:text-[var(--ink-soft)]/40 outline-none transition-colors focus:border-[var(--accent)]"
            />
          </label>
          <label className="block group">
            <span className="mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-soft)] group-focus-within:text-[var(--accent)] transition-colors">
              Project Details / Message
            </span>
            <textarea
              required
              name="message"
              rows={4}
              placeholder="Tell me about your project, idea, or role opportunity..."
              className="mt-2 w-full resize-none border-b border-[var(--line)] bg-transparent py-3 text-[var(--ink)] placeholder:text-[var(--ink-soft)]/40 outline-none transition-colors focus:border-[var(--accent)]"
            />
          </label>
          <div className="pt-2">
            <MagneticButton
              type="submit"
              className="display text-sm tracking-[0.16em] uppercase px-6 py-3 border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
            >
              {status === "idle" && "Send Message →"}
              {status === "loading" && "Sending Message..."}
              {status === "success" && "✓ Message Transmitted"}
            </MagneticButton>
          </div>
          {status === "loading" && (
            <div className="h-1 w-full overflow-hidden bg-[var(--line)] rounded">
              <div className="h-full w-1/2 origin-left animate-pulse bg-[var(--accent)]" />
            </div>
          )}
          {status === "success" && (
            <p className="max-w-md text-sm text-[var(--accent)] bg-[var(--accent-soft)]/50 p-3 border border-[var(--accent)]/30 rounded font-medium">
              Thank you for reaching out! I will review your message and reply promptly.
            </p>
          )}
        </form>

        <ul className="space-y-6">
          <SocialLink href={contact.linkedin} kind="linkedin" label="LinkedIn" />
          <SocialLink href={contact.github} kind="github" label="GitHub" />
          <SocialLink href={contact.instagram} kind="instagram" label="Instagram" />
          {contact.phone ? (
            <SocialLink href={`tel:${contact.phone}`} kind="phone" label={contact.phone} />
          ) : null}
          {contact.email ? (
            <SocialLink href={`mailto:${contact.email}`} kind="email" label={contact.email} />
          ) : null}
        </ul>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  kind,
  label,
}: {
  href: string;
  kind: "linkedin" | "github" | "instagram" | "phone" | "email";
  label: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn("group flex items-center justify-between border-b border-[var(--line)] py-4")}
      >
        <span className="display text-2xl tracking-[-0.04em]">{label}</span>
        {kind === "linkedin" && (
          <span className="h-px w-0 bg-[var(--ink)] transition-[width] duration-500 group-hover:w-16" />
        )}
        {kind === "github" && (
          <svg width="48" height="16" viewBox="0 0 48 16" className="overflow-visible">
            <path
              d="M2 14 V8 H18 V4 H30 V8 H46"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="origin-left scale-x-50 transition-transform duration-500 group-hover:scale-x-100"
            />
          </svg>
        )}
        {kind === "instagram" && (
          <span className="h-6 w-6 overflow-hidden border border-[var(--ink)]">
            <span className="block h-full w-full origin-left scale-x-0 bg-[var(--accent-soft)] transition-transform duration-500 group-hover:scale-x-100" />
          </span>
        )}
        {kind === "phone" && (
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] group-hover:animate-pulse" />
        )}
      </a>
    </li>
  );
}
