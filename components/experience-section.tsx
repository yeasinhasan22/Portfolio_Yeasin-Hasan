"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { experience } from "@/lib/content";
import { Reveal, StaggerGroup, StaggerItem, toneColor } from "@/components/primitives";

export default function ExperienceSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  // The vertical rule fills as you scroll past the timeline.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="relative px-[3vw] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1180px]">
        <Reveal className="mb-10">
          <span className="font-hand text-2xl text-ink-soft">where I&apos;ve been</span>
          <h2 className="mt-1 font-display text-[clamp(2rem,6vw,3.6rem)] font-bold uppercase leading-none tracking-tight text-ink">
            Experience
          </h2>
        </Reveal>

        <div ref={trackRef} className="relative">
          {/* timeline rail */}
          <div className="absolute left-[7px] top-2 hidden h-full w-[2px] bg-ink/10 md:block">
            <motion.div
              style={{ scaleY: fill }}
              className="h-full w-full origin-top bg-ink"
            />
          </div>

          <div className="flex flex-col gap-3 md:pl-10">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.08}>
                <div className="relative">
                  {/* node */}
                  <span className="absolute -left-10 top-7 hidden h-4 w-4 items-center justify-center md:flex">
                    <span className="h-4 w-4 rounded-full border-2 border-ink bg-paper" />
                    {job.current && (
                      <span className="absolute h-2 w-2 animate-ping rounded-full bg-lime" />
                    )}
                  </span>

                  <div className="bento group p-6 transition-shadow duration-500 hover:shadow-lift md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <span className="bento-label flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5" />
                          {job.period}
                        </span>
                        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                          {job.role}
                        </h3>
                        <a
                          href={job.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/c mt-1 inline-flex items-center gap-1 text-base text-ink-soft transition-colors hover:text-ink"
                        >
                          <span
                            className="marker"
                            style={{ ["--marker-color" as string]: toneColor("amber", 0.75) }}
                          >
                            {job.company}
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/c:translate-x-0.5 group-hover/c:-translate-y-0.5" />
                        </a>
                      </div>

                      {job.current && (
                        <span className="flex items-center gap-1.5 rounded-full border border-ink/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft text-pretty">
                      {job.summary}
                    </p>

                    <StaggerGroup className="mt-5 flex flex-col gap-2.5" stagger={0.05}>
                      {job.points.map((p) => (
                        <StaggerItem key={p}>
                          <div className="flex gap-3">
                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/35" />
                            <p className="text-sm leading-relaxed text-ink-soft text-pretty">
                              {p}
                            </p>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerGroup>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {job.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-ink/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft transition-colors duration-300 group-hover:border-ink/25"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
