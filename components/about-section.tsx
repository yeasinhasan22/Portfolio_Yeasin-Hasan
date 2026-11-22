"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, BadgeCheck, Sparkles } from "lucide-react";
import {
  profile,
  skillGroups,
  education,
  certifications,
} from "@/lib/content";
import {
  Reveal,
  Tape,
  StaggerGroup,
  StaggerItem,
  toneColor,
} from "@/components/primitives";

const tones = ["lime", "sky", "pink", "amber", "violet", "lime"] as const;

export default function AboutSection() {
  return (
    <section id="about" className="relative px-[3vw] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1180px]">
        {/* section heading */}
        <Reveal className="mb-10">
          <span className="font-hand text-2xl text-ink-soft">about me!</span>
          <h2 className="mt-1 font-display text-[clamp(2rem,6vw,3.6rem)] font-bold uppercase leading-none tracking-tight text-ink">
            What&apos;s up
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-6 lg:grid-cols-12">
          {/* ---- handwritten note ---- */}
          <Reveal className="sm:col-span-6 lg:col-span-7">
            <div className="bento h-full p-6 md:p-8">
              <span className="bento-label">The short version</span>
              <p className="mt-4 font-hand text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.6] text-ink">
                {profile.handwritten}
              </p>
              <div className="cut-line my-6" />
              <p className="text-[15px] leading-relaxed text-ink-soft text-pretty">
                I started in design — Figma, prototypes, motion — and kept
                following the problem downstream until I was writing the
                backend too. That path is why I&apos;m comfortable owning a
                feature end to end: the interface, the API behind it, the
                database under that, and the deploy that puts it live.
              </p>
            </div>
          </Reveal>

          {/* ---- graduation photo ---- */}
          <Reveal delay={0.08} className="sm:col-span-3 lg:col-span-5">
            <div className="bento group relative h-[260px] overflow-hidden lg:h-full">
              <Tape className="left-1/2 top-3 z-20 -translate-x-1/2" rotate={-3} />
              <Image
                src="/images/portfolio-convo.jpeg"
                alt={`${profile.name} on his BSc graduation day`}
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-paper/90 px-3 py-1 font-hand text-sm text-ink backdrop-blur">
                my BSc graduation day
              </span>
            </div>
          </Reveal>

          {/* ---- education ---- */}
          <Reveal delay={0.12} className="sm:col-span-3 lg:col-span-5">
            <div className="bento flex h-full flex-col gap-3 p-6">
              <span className="bento-label flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5" />
                Education
              </span>
              <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-ink">
                {education.degree}
              </h3>
              <p className="text-sm text-ink-soft">{education.school}</p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                  {education.period}
                </span>
                <span
                  className="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink"
                  style={{ background: toneColor("sky", 0.8) }}
                >
                  {education.detail}
                </span>
              </div>
            </div>
          </Reveal>

          {/* ---- certifications ---- */}
          <Reveal delay={0.16} className="sm:col-span-3 lg:col-span-7">
            <div className="bento flex h-full flex-col gap-3 p-6">
              <span className="bento-label flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5" />
                Certifications
              </span>
              <ul className="mt-1 flex flex-col gap-3">
                {certifications.map((c) => (
                  <li
                    key={c.title}
                    className="flex items-start justify-between gap-4 rounded-xl border border-ink/10 p-3.5 transition-colors duration-300 hover:border-ink/30"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink">{c.title}</p>
                      <p className="mt-0.5 text-xs text-ink-faint">{c.issuer}</p>
                    </div>
                    {c.year && (
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                        {c.year}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ---- skills grid ---- */}
          <Reveal delay={0.2} className="sm:col-span-6 lg:col-span-12">
            <div className="bento p-6 md:p-8">
              <span className="bento-label flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                The toolkit
              </span>

              <StaggerGroup
                className="mt-5 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.06}
              >
                {skillGroups.map((group, gi) => (
                  <StaggerItem key={group.title}>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-display text-base font-bold tracking-tight text-ink">
                          {group.title}
                        </h3>
                        <span className="font-hand text-base text-ink-faint">
                          {group.note}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <motion.span
                            key={item}
                            whileHover={{ y: -3, rotate: -1.5 }}
                            transition={{ type: "spring", stiffness: 380, damping: 18 }}
                            className="cursor-default rounded-md px-2.5 py-1 text-[13px] font-medium text-ink"
                            style={{
                              background: toneColor(tones[gi % tones.length], 0.42),
                            }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
