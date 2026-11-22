"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderOpen, MapPin, Copy, Check } from "lucide-react";
import { profile, socials, capabilities } from "@/lib/content";
import {
  Reveal,
  Magnetic,
  SplitText,
  Marquee,
  Tape,
  StaggerGroup,
  StaggerItem,
  toneColor,
} from "@/components/primitives";
import DeskObjects from "@/components/desk-objects";

function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  // Rendered client-side only — the server has no idea what time it is in Dhaka.
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: profile.timezone,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000 * 20);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-2xl font-medium tabular-nums text-ink">
      {time ?? "--:--"}
    </span>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <button
      onClick={copy}
      data-cursor={copied ? "copied" : "copy"}
      className="group/mail flex w-full items-center justify-between gap-2 rounded-xl border border-ink/10 bg-paper px-3 py-2 text-left transition-colors duration-300 hover:border-ink/30"
    >
      <span className="truncate font-mono text-[11px] text-ink-soft">
        {profile.email}
      </span>
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0 text-ink" />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0 text-ink-faint transition-colors group-hover/mail:text-ink" />
      )}
    </button>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative px-[3vw] pb-16 pt-28 md:pt-32"
    >
      {/* throwable stationery — constrained to this section */}
      <DeskObjects containerRef={sectionRef} />

      <div className="mx-auto w-full max-w-[1180px]">
        {/* ---------- top annotation row ---------- */}
        <Reveal className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <span
            className="rotate-[-2deg] rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink"
            style={{ background: toneColor("lime", 0.85) }}
          >
            Ships to production
          </span>
          <span className="font-hand text-lg text-ink-soft">my name is</span>
          <span
            className="rotate-[2deg] rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink"
            style={{ background: toneColor("amber", 0.85) }}
          >
            Sweats the details
          </span>
        </Reveal>

        {/* ---------- name ---------- */}
        <div className="relative mb-3 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-block rounded-2xl border-[2.5px] border-pink px-5 py-1.5 md:px-8 md:py-2"
          >
            <h1 className="font-display text-[clamp(2.6rem,10vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-ink">
              <SplitText text={profile.name} delay={0.15} />
            </h1>
          </motion.div>
        </div>

        {/* ---------- role + availability ---------- */}
        <Reveal delay={0.25} className="mb-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span className="rotate-[-1.5deg] font-hand text-xl text-ink-soft">
            {profile.role}
          </span>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            {profile.availableLabel}
          </span>
          <span className="rotate-[1.5deg] font-hand text-xl text-ink-soft">
            {profile.location}
          </span>
        </Reveal>

        {/* =================== BENTO GRID =================== */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-6 lg:grid-cols-12">
          {/* ---- headline (big) ---- */}
          <Reveal
            delay={0.05}
            className="sm:col-span-6 lg:col-span-7 lg:row-span-2"
          >
            <div className="bento group flex h-full flex-col justify-between gap-6 p-6 md:p-8">
              <span className="bento-label">01 / Intro</span>

              <h2 className="font-display text-[clamp(1.8rem,4.2vw,3.1rem)] font-bold leading-[1.04] tracking-tight text-ink text-balance">
                {profile.headline[0]}{" "}
                <span
                  className="marker"
                  style={{ ["--marker-color" as string]: toneColor("lime") }}
                >
                  {profile.headline[1]}
                </span>
              </h2>

              <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-soft text-pretty">
                {profile.intro}
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                <Magnetic strength={0.25}>
                  <a
                    href="#contact"
                    data-cursor="say hi"
                    className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Contact me
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <a
                    href="#work"
                    data-cursor="browse"
                    className="flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                  >
                    <FolderOpen className="h-3.5 w-3.5" />
                    See the work
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>

          {/* ---- portrait ---- */}
          <Reveal delay={0.12} className="sm:col-span-3 lg:col-span-5">
            <div className="bento group relative h-[400px] overflow-hidden sm:h-full sm:min-h-[360px]">
              <Tape className="-left-4 top-5 z-30" rotate={-28} />
              <Tape className="-right-4 top-5 z-30" rotate={28} />

              {/* --- backdrop shapes, back to front --- */}

              {/* halftone dot field */}
              <span
                aria-hidden
                className="absolute inset-0 opacity-[0.16]"
                style={{
                  backgroundImage:
                    "radial-gradient(hsl(var(--ink)) 1px, transparent 1px)",
                  backgroundSize: "9px 9px",
                }}
              />

              {/* rotated square, top right */}
              <span
                aria-hidden
                className="absolute right-5 top-7 h-14 w-14 rotate-12 rounded-xl border-2 border-ink/20 transition-transform duration-700 ease-spring group-hover:rotate-[22deg]"
              />

              {/* small solid dot, bottom left */}
              <span
                aria-hidden
                className="absolute bottom-[86px] left-5 h-5 w-5 rounded-full"
                style={{ background: toneColor("pink", 0.9) }}
              />

              {/* baseline the arch stands on */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-[62px] h-px bg-ink/15"
              />

              {/* --- arch: colour plate behind, photo in front --- */}
              <div className="absolute inset-x-[13%] bottom-[62px] top-[9%] z-10">
                {/* offset plate, like a misregistered print layer */}
                <span
                  aria-hidden
                  className="absolute inset-0 translate-x-[11px] translate-y-[9px] rounded-t-full transition-transform duration-700 ease-spring group-hover:translate-x-[16px] group-hover:translate-y-[13px]"
                  style={{ background: toneColor("lime", 0.9) }}
                />
                {/* thin outline, offset the other way */}
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-[9px] -translate-y-[7px] rounded-t-full border border-ink/25"
                />
                {/* the photo, clipped to the arch */}
                <div className="absolute inset-0 overflow-hidden rounded-t-full border border-ink/12 bg-paper-deep">
                  <Image
                    src={profile.portrait}
                    alt={`Portrait of ${profile.name}`}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 40vw"
                    /* `cover` + top anchor fills the arch and keeps the head
                       whole — the photo has enough headroom that the curve
                       never reaches it. */
                    className="object-cover object-top grayscale transition-all duration-700 ease-spring group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                </div>
              </div>

              {/* --- caption chip --- */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-2 border-t border-ink/10 bg-paper-raised/85 px-4 py-3 backdrop-blur">
                <p className="font-hand text-lg leading-none text-ink">
                  that&apos;s me 👋
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                  Dhaka · 2026
                </span>
              </div>
            </div>
          </Reveal>

          {/* ---- local time ---- */}
          <Reveal delay={0.18} className="sm:col-span-3 lg:col-span-3">
            <div className="bento flex h-full flex-col justify-between gap-3 p-5">
              <span className="bento-label">Local time</span>
              <LocalClock />
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                <MapPin className="h-3 w-3" />
                Dhaka · GMT+6
              </span>
            </div>
          </Reveal>

          {/* ---- email ---- */}
          <Reveal delay={0.22} className="sm:col-span-3 lg:col-span-2">
            <div className="bento flex h-full flex-col justify-between gap-3 p-5">
              <span className="bento-label">Say hello</span>
              <CopyEmail />
            </div>
          </Reveal>

          {/* ---- stats strip ---- */}
          <Reveal delay={0.26} className="sm:col-span-6 lg:col-span-12">
            <StaggerGroup className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {profile.stats.map((s) => (
                <StaggerItem key={s.label}>
                  <div className="bento group flex h-full flex-col gap-1 p-5 transition-transform duration-500 ease-spring hover:-translate-y-1">
                    <span className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                      {s.value}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                      {s.label}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>

          {/* ---- socials ---- */}
          <Reveal delay={0.3} className="sm:col-span-6 lg:col-span-5">
            <div className="bento flex h-full flex-col gap-3 p-5">
              <span className="bento-label">Elsewhere</span>
              <div className="grid grid-cols-2 gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/s flex items-center justify-between rounded-xl border border-ink/10 px-3 py-2 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                      {s.label}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/s:translate-x-0.5 group-hover/s:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ---- capability marquee ---- */}
          <Reveal delay={0.34} className="sm:col-span-6 lg:col-span-7">
            <div className="bento flex h-full flex-col justify-center gap-4 py-5">
              <span className="bento-label px-5">What I do</span>
              <Marquee speed={30}>
                {capabilities.map((c, i) => (
                  <span
                    key={`${c.label}-${i}`}
                    className="whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium text-ink"
                    style={{
                      background: toneColor(c.tone, 0.8),
                      transform: `rotate(${i % 2 ? 1 : -1}deg)`,
                    }}
                  >
                    {c.label}
                  </span>
                ))}
              </Marquee>
              <Marquee speed={38} reverse>
                {["PostgreSQL", "Supabase", "MongoDB", "Docker", "Figma", "JIRA", "Express", "Redux"].map(
                  (t, i) => (
                    <span
                      key={`${t}-${i}`}
                      className="whitespace-nowrap rounded-lg border border-ink/12 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft"
                    >
                      {t}
                    </span>
                  )
                )}
              </Marquee>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
