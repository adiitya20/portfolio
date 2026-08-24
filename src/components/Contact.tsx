"use client";

import { FormEvent, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { MagneticButton } from "./MagneticButton";

type Status = "idle" | "loading" | "success";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const contact = portfolioData.contact;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1200);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("adityaverlekarr@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="site-pad py-[16vh] relative">
      <p className="section-kicker">Let&apos;s Connect</p>
      <h2 className="display mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.05em] font-semibold text-[var(--ink)]">
        {contact.heading}
      </h2>
      <p className="mt-6 max-w-2xl text-lg text-[var(--ink-soft)] leading-relaxed">
        {contact.text} Reach out via direct message or connect through any of my direct contact links below.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Direct Contact Form */}
        <div className="border border-[var(--line)] bg-[var(--paper-2)]/60 p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-6">
            <span className="display text-xl font-semibold text-[var(--ink)]">Send a Direct Message</span>
            <span className="mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-bold">
              ✦ Inquiry Form
            </span>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <label className="block group">
              <span className="mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-soft)] group-focus-within:text-[var(--accent)] transition-colors font-medium">
                Your Name *
              </span>
              <input
                required
                name="name"
                placeholder="e.g. Alex Smith"
                className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--ink)] placeholder:text-[var(--ink-soft)]/40 outline-none transition-colors focus:border-[var(--accent)]"
              />
            </label>
            <label className="block group">
              <span className="mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-soft)] group-focus-within:text-[var(--accent)] transition-colors font-medium">
                Email Address *
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
              <span className="mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-soft)] group-focus-within:text-[var(--accent)] transition-colors font-medium">
                Project Details / Message *
              </span>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Tell me about your project, software opportunity, or idea..."
                className="mt-2 w-full resize-none border-b border-[var(--line)] bg-transparent py-3 text-[var(--ink)] placeholder:text-[var(--ink-soft)]/40 outline-none transition-colors focus:border-[var(--accent)]"
              />
            </label>
            <div className="pt-2">
              <MagneticButton
                type="submit"
                className="display text-sm tracking-[0.16em] uppercase px-6 py-3 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-md"
              >
                {status === "idle" && "Send Message →"}
                {status === "loading" && "Transmitting..."}
                {status === "success" && "✓ Message Transmitted"}
              </MagneticButton>
            </div>
            {status === "loading" && (
              <div className="h-1 w-full overflow-hidden bg-[var(--line)] rounded">
                <div className="h-full w-1/2 origin-left animate-pulse bg-[var(--accent)]" />
              </div>
            )}
            {status === "success" && (
              <p className="max-w-md text-xs text-[var(--accent)] bg-[var(--accent-soft)]/50 p-3 border border-[var(--accent)]/30 rounded font-medium">
                Thank you for reaching out! Your message has been sent successfully.
              </p>
            )}
          </form>
        </div>

        {/* Clear Social & Contact Link Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-2">
            <span className="mono text-[11px] tracking-[0.2em] uppercase text-[var(--ink-soft)] font-bold">
              Direct Contact & Social Links
            </span>
            <span className="mono text-[10px] text-emerald-600 font-medium flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Hire
            </span>
          </div>

          <ul className="space-y-3">
            {/* Phone Card */}
            <ContactLinkCard
              platform="Phone / Call"
              detail="+91 7558696546"
              subtext="Direct Mobile Contact"
              href="tel:+917558696546"
              badge="Phone"
              icon={
                <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />

            {/* Email Card */}
            <ContactLinkCard
              platform="Email Address"
              detail="adityaverlekarr@gmail.com"
              subtext="Primary Inbox Inquiry"
              href="mailto:adityaverlekarr@gmail.com"
              badge="Email"
              icon={
                <svg className="h-6 w-6 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            {/* LinkedIn Card */}
            <ContactLinkCard
              platform="LinkedIn"
              detail="linkedin.com/in/aditya-verlekar"
              subtext="Professional Career Profile"
              href={contact.linkedin}
              badge="LinkedIn"
              icon={
                <svg className="h-6 w-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              }
            />

            {/* GitHub Card */}
            <ContactLinkCard
              platform="GitHub"
              detail="github.com/adiitya20"
              subtext="Open Source & Code Repositories"
              href={contact.github}
              badge="GitHub"
              icon={
                <svg className="h-6 w-6 text-[var(--ink)]" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              }
            />

            {/* Instagram Card */}
            <ContactLinkCard
              platform="Instagram"
              detail="@adityaverlekar_"
              subtext="Personal Highlights"
              href={contact.instagram}
              badge="Social"
              icon={
                <svg className="h-6 w-6 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              }
            />
          </ul>

          {/* Quick Copy Email Bar */}
          <div className="mt-4 border border-[var(--line)] bg-[var(--paper-2)] p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)] font-bold">
                Quick Action
              </p>
              <p className="display text-sm font-semibold text-[var(--ink)] mt-0.5">
                adityaverlekarr@gmail.com
              </p>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="mono text-[10px] uppercase tracking-wider border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] px-3.5 py-2 rounded hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer"
            >
              {copied ? "✓ Copied Email!" : "Copy Email"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLinkCard({
  platform,
  detail,
  subtext,
  href,
  badge,
  icon,
}: {
  platform: string;
  detail: string;
  subtext: string;
  href: string;
  badge: string;
  icon: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center justify-between border border-[var(--line)] bg-[var(--paper-2)]/80 p-4 rounded-xl transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--paper-2)] hover:shadow-md hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--paper)] group-hover:scale-105 transition-transform shadow-xs">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="display text-base font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                {platform}
              </span>
              <span className="mono text-[9px] uppercase tracking-wider bg-[var(--paper-3)] text-[var(--ink-soft)] px-2 py-0.5 rounded font-semibold">
                {badge}
              </span>
            </div>
            <p className="mono text-[11px] text-[var(--accent)] font-semibold mt-0.5">{detail}</p>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">{subtext}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 mono text-[10px] font-bold text-[var(--ink-soft)] group-hover:text-[var(--accent)] transition-colors border border-[var(--line)] px-2.5 py-1 rounded bg-[var(--paper)]">
          <span>Open</span>
          <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
        </div>
      </a>
    </li>
  );
}
