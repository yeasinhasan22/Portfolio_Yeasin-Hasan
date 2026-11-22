"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Github, Figma, X, Globe } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { Reveal, toneColor } from "@/components/primitives";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Full-Stack", "Design", "Live"] as const;
type Filter = (typeof FILTERS)[number];

function matches(p: Project, f: Filter) {
  if (f === "All") return true;
  if (f === "Live") return Boolean(p.live);
  if (f === "Design") return p.role.toLowerCase().includes("designer");
  return !p.role.toLowerCase().includes("designer");
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ================================================================== */
/* Detail modal                                                        */
/* ================================================================== */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] grid place-items-center bg-ink/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-ink/12 bg-paper-raised shadow-lift"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              data-cursor="close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-ink/12 bg-paper/90 backdrop-blur transition-colors hover:bg-ink hover:text-paper"
            >
              <X className="h-4 w-4" />
            </button>

            {/* contained, like the cards — these are screenshots, and
                cropping one loses the part that makes it worth showing */}
            <div className="relative aspect-[2/1] w-full overflow-hidden border-b border-ink/10 bg-paper-deep">
              <Image
                src={project.image}
                alt={`${project.title} — screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
              />
              <span
                className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink"
                style={{ background: toneColor(project.tone, 0.92) }}
              >
                {project.metric}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                <span>{project.year}</span>
                <span className="h-1 w-1 rounded-full bg-ink/25" />
                <span>{project.role}</span>
              </div>

              <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
                {project.title}
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                {project.description.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-relaxed text-ink-soft text-pretty"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-ink/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-paper"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    Visit site
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </a>
                )}
                {project.figma && (
                  <a
                    href={project.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    <Figma className="h-3.5 w-3.5" />
                    Figma
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/* Card                                                                */
/* A mounted print, not a folder: one quiet paper panel, a hairline    */
/* border, and a single hairline of the project's colour along the top */
/* edge. That edge is the only part still visible once the next card   */
/* pins over this one, so the pile reads as a row of coloured spines.  */
/* ================================================================== */
function CardFace({
  project,
  index,
  total,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  const tone = toneColor(project.tone, 1);

  return (
    <article className="group/card relative overflow-hidden rounded-[26px] border border-ink/10 bg-paper-raised shadow-lift">
      {/* the coloured spine */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-[5px]"
        style={{ background: tone }}
      />

      {/* ---------- artwork, edge to edge ----------
          Every shot is a wide screen capture (ratios run 1.5 to 2.2), so the
          frame is 2:1 and the image is CONTAINED, never cropped: anything
          wider than 2:1 fills the card edge to edge, and the rest come within
          a hair of it. `cover` in a half-width column was cutting a third off
          the sides of the widest ones. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-ink/10 bg-paper-deep sm:aspect-[2/1]">
        <Image
          src={project.image}
          alt={`${project.title} — screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1180px"
          className="object-contain"
        />

        {/* index chip, in the project's colour */}
        <span
          className="absolute left-4 top-4 z-10 grid h-8 min-w-8 place-items-center rounded-lg px-2 font-mono text-[11px] font-bold text-ink shadow-paper"
          style={{ background: tone }}
        >
          {pad(index + 1)}
        </span>
      </div>

      {/* ---------- details ---------- */}
      <div className="grid gap-x-8 gap-y-4 px-6 pb-6 pt-5 md:grid-cols-[1.35fr_1fr] md:items-end md:px-8 md:pb-7">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: tone }}
            />
            <span className="text-ink-soft">{project.metric}</span>
            <span className="h-1 w-1 rounded-full bg-ink/20" />
            <span>{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-ink/20" />
            <span>{project.role}</span>
          </div>

          <h3 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-bold leading-[1.04] tracking-tight text-ink text-balance">
            {project.title}
          </h3>

          <p className="mt-1.5 max-w-[56ch] text-[15px] leading-relaxed text-ink-soft text-pretty">
            {project.blurb}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint md:justify-end">
            {project.stack.slice(0, 5).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint lg:block">
              {pad(index + 1)} / {pad(total)}
            </span>

            <button
              onClick={onOpen}
              data-cursor="read more"
              className="group/btn flex items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-paper transition-transform duration-300 ease-spring hover:scale-[1.03]"
            >
              Case study
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink-soft transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink-soft transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.figma && (
              <a
                href={project.figma}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} in Figma`}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink-soft transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
              >
                <Figma className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ================================================================== */
/* One card in the stack                                               */
/* ================================================================== */
const SPINE = 9; // px of the card below left peeking above each card

function StackCard({
  project,
  index,
  total,
  onOpen,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  onOpen: () => void;
  progress: MotionValue<number>;
}) {
  /* Once the cards after this one start covering it, ease it back and let
     paper wash over it. Scaling from the top edge keeps every spine on its
     own line, so the pile stays tidy however many files there are. */
  const start = index / total;
  const depth = total - index;
  const targetScale = Math.max(0.88, 1 - depth * 0.018);
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const veil = useTransform(progress, [start, 1], [0, 0.4]);

  return (
    <div
      id={`work-file-${index}`}
      /* The sticky box carries its own scroll runway AND is a direct child of
         the stack container, so every card stays pinned for the rest of the
         section and they pile up. (Wrapping each one in its own div made that
         wrapper the containing block, and cards scrolled away one at a time.) */
      className="sticky flex h-[78vh] items-start justify-center md:h-[92vh]"
      style={{ top: `calc(5.25rem + ${index * SPINE}px)`, zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, transformOrigin: "top center" }}
        /* Width is capped by viewport height as well as by 1180px: a 2:1 image
           plus the details bar is roughly 0.72 × the card's width tall, and a
           card taller than the screen would have its buttons pinned off the
           bottom edge. */
        className="relative w-full max-w-[min(1180px,118vh)] will-change-transform"
      >
        <CardFace
          project={project}
          index={index}
          total={total}
          onOpen={onOpen}
        />
        {/* paper wash, so buried cards recede instead of going muddy */}
        <motion.span
          aria-hidden
          style={{ opacity: veil }}
          className="pointer-events-none absolute inset-0 rounded-[26px] bg-paper"
        />
      </motion.div>
    </div>
  );
}

/* ================================================================== */
/* Sticky rail — where you are in the pile, and a way to jump          */
/* ================================================================== */
function StackRail({
  list,
  active,
}: {
  list: Project[];
  active: number;
}) {
  const jump = useCallback((i: number) => {
    document
      .getElementById(`work-file-${i}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-y-0 right-[2vw] z-40 hidden xl:block">
      <div className="sticky top-1/2 flex -translate-y-1/2 flex-col items-end gap-2.5">
        <span className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint tabular-nums">
          {pad(active + 1)}/{pad(list.length)}
        </span>

        {list.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.slug}
              onClick={() => jump(i)}
              aria-label={`Go to ${p.title}`}
              aria-current={on ? "true" : undefined}
              className="group/rail pointer-events-auto flex items-center justify-end gap-2.5"
            >
              {/* The title only appears on hover: at xl the gutter beside the
                  card is narrow, and a permanently visible label for the
                  active file would run over the card's edge. */}
              <span className="whitespace-nowrap rounded-full bg-paper-raised/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink opacity-0 shadow-paper backdrop-blur transition-opacity duration-300 group-hover/rail:opacity-100">
                {p.title}
              </span>
              <span
                className="block h-[2px] rounded-full transition-all duration-500 ease-spring group-hover/rail:!w-7"
                style={{
                  width: on ? 26 : 13,
                  background: on
                    ? toneColor(p.tone, 1)
                    : "hsl(var(--ink) / 0.22)",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Header                                                              */
/* ================================================================== */
function ArchiveHeader({
  filter,
  setFilter,
  count,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
  count: number;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        <span className="font-hand text-2xl text-ink-soft">the archive</span>
        <h2 className="mt-1 font-display text-[clamp(2rem,6vw,3.6rem)] font-bold uppercase leading-none tracking-tight text-ink">
          Selected work
        </h2>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          {pad(count)} projects · keep scrolling
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "relative rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300",
              filter === f
                ? "border-ink text-ink"
                : "border-ink/12 text-ink-faint hover:border-ink/35 hover:text-ink"
            )}
          >
            {filter === f && (
              <motion.span
                layoutId="work-filter"
                className="absolute inset-0 -z-10 rounded-full bg-lime"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Stacking layout                                                     */
/* Own component so `useScroll` resolves its ref on mount.             */
/* ================================================================== */
function StackArchive({
  list,
  onOpen,
  filter,
  setFilter,
}: {
  list: Project[];
  onOpen: (p: Project) => void;
  filter: Filter;
  setFilter: (f: Filter) => void;
}) {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  /* Smooth the raw progress once, here, and hand the same spring to every
     card — so the whole pile settles together instead of each card chasing
     the scroll wheel on its own. */
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.0005,
  });

  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (p) => {
    const i = Math.min(list.length - 1, Math.max(0, Math.round(p * list.length - 0.5)));
    setActive(i);
  });

  return (
    <section id="work" className="relative px-[3vw] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1180px]">
        <Reveal>
          <ArchiveHeader filter={filter} setFilter={setFilter} count={list.length} />
        </Reveal>
      </div>

      <StackRail list={list} active={active} />

      <div ref={stackRef} className="mx-auto w-full max-w-[1180px]">
        {list.map((p, i) => (
          <StackCard
            key={p.slug}
            project={p}
            index={i}
            total={list.length}
            onOpen={() => onOpen(p)}
            progress={progress}
          />
        ))}
      </div>

      {/* tail so the last card can settle before the next section */}
      <div className="h-[16vh]" />
    </section>
  );
}

/* ================================================================== */
/* Plain list (reduced motion)                                         */
/* ================================================================== */
function PlainArchive({
  list,
  onOpen,
  filter,
  setFilter,
}: {
  list: Project[];
  onOpen: (p: Project) => void;
  filter: Filter;
  setFilter: (f: Filter) => void;
}) {
  return (
    <section id="work" className="relative px-[3vw] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1180px]">
        <ArchiveHeader filter={filter} setFilter={setFilter} count={list.length} />
        <div className="flex flex-col gap-6">
          {list.map((p, i) => (
            <CardFace
              key={p.slug}
              project={p}
              index={i}
              total={list.length}
              onOpen={() => onOpen(p)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Section                                                             */
/* ================================================================== */
export default function WorkSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const list = useMemo(() => projects.filter((p) => matches(p, filter)), [filter]);
  const reduce = useReducedMotion();

  return (
    <>
      {reduce ? (
        <PlainArchive
          list={list}
          onOpen={setOpen}
          filter={filter}
          setFilter={setFilter}
        />
      ) : (
        <StackArchive
          list={list}
          onOpen={setOpen}
          filter={filter}
          setFilter={setFilter}
        />
      )}
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </>
  );
}
