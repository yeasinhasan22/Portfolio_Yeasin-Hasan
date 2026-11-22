"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check, MapPin, Mail } from "lucide-react";
import { profile, socials, contactIntents } from "@/lib/content";
import {
  Reveal,
  Marquee,
  StaggerGroup,
  StaggerItem,
  toneColor,
} from "@/components/primitives";

export default function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked — the mailto links below still work */
    }
  };

  const mailto = (subject: string) =>
    `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <section id="contact" className="relative px-[3vw] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1180px]">
        <Reveal className="mb-10">
          <span className="font-hand text-2xl text-ink-soft">let&apos;s talk</span>
          <h2 className="mt-1 font-display text-[clamp(2rem,6vw,3.6rem)] font-bold uppercase leading-none tracking-tight text-ink">
            Get in touch
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-6 lg:grid-cols-12">
          {/* ---- big CTA ---- */}
          <Reveal className="sm:col-span-6 lg:col-span-7">
            <div className="bento flex h-full flex-col justify-between gap-6 p-6 md:p-8">
              <span className="bento-label">Start here</span>

              <h3 className="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
                Got something you want built?{" "}
                <span
                  className="marker"
                  style={{ ["--marker-color" as string]: toneColor("lime") }}
                >
                  Let&apos;s make it real.
                </span>
              </h3>

              <p className="max-w-[48ch] text-[15px] leading-relaxed text-ink-soft text-pretty">
                I reply to everything — a role, a project, a half-formed idea
                you want a second opinion on. Pick whichever fits and the email
                writes its own subject line.
              </p>

              <StaggerGroup className="grid grid-cols-1 gap-2 sm:grid-cols-2" stagger={0.06}>
                {contactIntents.map((intent) => (
                  <StaggerItem key={intent.subject}>
                    <a
                      href={mailto(intent.subject)}
                      className="group/i flex h-full items-center justify-between gap-3 rounded-xl border border-ink/10 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/35"
                      style={{
                        background: `linear-gradient(135deg, ${toneColor(
                          intent.tone,
                          0.16
                        )}, transparent 70%)`,
                      }}
                    >
                      <span>
                        <span className="block text-sm font-semibold text-ink">
                          {intent.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-faint">
                          {intent.detail}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-300 group-hover/i:translate-x-0.5 group-hover/i:-translate-y-0.5 group-hover/i:text-ink" />
                    </a>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </Reveal>

          {/* ---- direct details ---- */}
          <Reveal delay={0.08} className="sm:col-span-3 lg:col-span-5">
            <div className="bento flex h-full flex-col gap-3 p-6">
              <span className="bento-label">Direct</span>

              {/* email */}
              <button
                onClick={() => copy(profile.email, "email")}
                className="group/d flex items-center justify-between gap-3 rounded-xl border border-ink/10 p-3.5 text-left transition-colors duration-300 hover:border-ink/35"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                    Email
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-ink">
                    {profile.email}
                  </span>
                </span>
                {copied === "email" ? (
                  <Check className="h-4 w-4 shrink-0 text-ink" />
                ) : (
                  <Copy className="h-4 w-4 shrink-0 text-ink-faint group-hover/d:text-ink" />
                )}
              </button>

              {/* location */}
              <a
                href="https://maps.app.goo.gl/P1qSCxu7GpKAWg2m8"
                target="_blank"
                rel="noopener noreferrer"
                className="group/d flex items-center justify-between gap-3 rounded-xl border border-ink/10 p-3.5 transition-colors duration-300 hover:border-ink/35"
              >
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                    Based in
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-sm text-ink">
                    <MapPin className="h-3 w-3" />
                    {profile.location}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint group-hover/d:text-ink" />
              </a>

              {/* availability */}
              <div className="rounded-xl border border-ink/10 p-3.5">
                <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                  Status
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-sm text-ink">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                  </span>
                  {profile.availableLabel}
                </span>
              </div>

              <a
                href={mailto("Hello Yeasin")}
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-transform duration-300 ease-spring hover:scale-[1.02]"
              >
                <Mail className="h-3.5 w-3.5" />
                Send an email
              </a>
            </div>
          </Reveal>

          {/* ---- socials ---- */}
          <Reveal delay={0.12} className="sm:col-span-3 lg:col-span-12">
            <div className="bento p-6">
              <span className="bento-label">Find me elsewhere</span>
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 340, damping: 20 }}
                    className="group/s flex items-center justify-between rounded-xl border border-ink/10 px-4 py-3 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                      {s.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/s:translate-x-0.5 group-hover/s:-translate-y-0.5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <footer className="mx-auto mt-16 w-full max-w-[1180px]">
        <div className="cut-line mb-6" />

        <Marquee speed={44} className="mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-6 pr-6 font-display text-4xl font-bold uppercase tracking-tight text-ink/12 md:text-6xl"
            >
              Let&apos;s build something
              <span className="text-lime">✦</span>
            </span>
          ))}
        </Marquee>

        <div className="flex flex-col items-center justify-between gap-4 pb-10 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-hand text-lg text-ink-soft">
            built from scratch, by hand ✌️
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-ink"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
