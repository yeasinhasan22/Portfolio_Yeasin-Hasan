"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Reveal: scroll-triggered entrance. The workhorse of the page.
------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Stagger helpers: parent sets rhythm, children inherit it.
------------------------------------------------------------------- */
export function StaggerGroup({
  children,
  className,
  stagger = 0.07,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...rest
}: { children: React.ReactNode; className?: string } & Omit<
  HTMLMotionProps<"div">,
  "ref"
>) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Magnetic: element leans toward the cursor, springs back on exit.
------------------------------------------------------------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    [reduce, strength, x, y]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   TiltCard: 3D tilt plus a light sheen that tracks the pointer.
------------------------------------------------------------------- */
export function TiltCard({
  children,
  className,
  max = 7,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 20, mass: 0.5 };
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  // Hoisted: must not be called conditionally in the JSX below.
  const sheen = useTransform(
    [px, py],
    ([a, b]: number[]) =>
      `radial-gradient(420px circle at ${a * 100}% ${b * 100}%, hsl(var(--ink) / 0.07), transparent 65%)`
  );

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      whileHover={reduce ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      {children}
      {glare && !reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: sheen }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Marquee: seamless infinite scroller (duplicates its children).
------------------------------------------------------------------- */
export function Marquee({
  children,
  speed = 36,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("mask-fade-x pause-on-hover overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${speed}s` }}
    >
      <div
        className={cn(
          "flex w-max items-center gap-3",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {children}
        <span aria-hidden className="contents">
          {children}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Tape: the little translucent strips holding photos down.
------------------------------------------------------------------- */
export function Tape({
  className,
  rotate = -8,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn("tape", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}

/* ------------------------------------------------------------------
   SplitText: per-character entrance for headlines.
------------------------------------------------------------------- */
export function SplitText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.03, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, ci) => (
            <motion.span
              key={ci}
              aria-hidden
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "0.45em", rotateZ: 4 },
                show: {
                  opacity: 1,
                  y: 0,
                  rotateZ: 0,
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

/* ------------------------------------------------------------------
   Accent token → CSS colour. Keeps tone names honest across the app.
------------------------------------------------------------------- */
export const toneVar: Record<string, string> = {
  lime: "var(--acc-lime)",
  sky: "var(--acc-sky)",
  pink: "var(--acc-pink)",
  amber: "var(--acc-amber)",
  violet: "var(--acc-violet)",
};

export function toneColor(tone: string, alpha = 1) {
  return `hsl(${toneVar[tone] ?? toneVar.lime} / ${alpha})`;
}
