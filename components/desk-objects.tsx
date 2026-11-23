"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   A single throwable object. Drag it, fling it, it keeps momentum and
   stays inside the section. Double-click snaps it home.
------------------------------------------------------------------- */
function Draggable({
  children,
  className,
  rotate = 0,
  constraints,
  z = 30,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  constraints: React.RefObject<HTMLElement>;
  z?: number;
}) {
  const [thrown, setThrown] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <motion.div
      key={key}
      data-draggable
      drag
      dragConstraints={constraints}
      dragElastic={0.18}
      dragMomentum
      dragTransition={{ power: 0.28, timeConstant: 320, bounceStiffness: 220, bounceDamping: 22 }}
      onDragStart={() => setThrown(true)}
      onDoubleClick={() => {
        setThrown(false);
        setKey((k) => k + 1); // remount to spring back to the authored spot
      }}
      initial={{ rotate }}
      whileHover={{ scale: 1.06, rotate: rotate + 2 }}
      whileDrag={{ scale: 1.12, rotate: rotate + 8, zIndex: 60 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      style={{ zIndex: thrown ? 55 : z }}
      className={cn(
        "absolute select-none touch-none will-change-transform",
        className
      )}
      title="Drag me, double-click to put me back"
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------- the objects ---------------------------- */

function StickyNote({ text, tone }: { text: string; tone: string }) {
  return (
    <div
      className="grid h-[88px] w-[88px] place-items-center p-2 text-center shadow-paper"
      style={{
        background: `hsl(var(--acc-${tone}) / 0.95)`,
        clipPath: "polygon(0 0, 100% 0, 100% 86%, 86% 100%, 0 100%)",
      }}
    >
      <span className="font-hand text-[15px] leading-tight text-ink">{text}</span>
    </div>
  );
}

function Paperclip() {
  return (
    <svg width="34" height="58" viewBox="0 0 34 58" fill="none" className="drop-shadow">
      <path
        d="M24.5 16.5v24a9.5 9.5 0 1 1-19 0V13a6.5 6.5 0 1 1 13 0v26a3.5 3.5 0 1 1-7 0V17"
        stroke="hsl(var(--ink) / 0.55)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WashiTape({ tone }: { tone: string }) {
  return (
    <div
      className="h-7 w-[104px] shadow-sm"
      style={{
        background: `hsl(var(--acc-${tone}) / 0.65)`,
        clipPath:
          "polygon(0 12%, 6% 0, 94% 6%, 100% 0, 100% 88%, 94% 100%, 6% 94%, 0 100%)",
      }}
    />
  );
}

function Pin() {
  return (
    <div className="relative h-6 w-6">
      <span className="absolute inset-0 rounded-full bg-pink shadow-paper" />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/25" />
    </div>
  );
}

function Star() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 1.5c.6 5.4 5.1 9.9 10.5 10.5-5.4.6-9.9 5.1-10.5 10.5C11.4 17.1 6.9 12.6 1.5 12 6.9 11.4 11.4 6.9 12 1.5Z"
        fill="hsl(var(--acc-amber))"
        stroke="hsl(var(--ink) / 0.5)"
        strokeWidth="1"
      />
    </svg>
  );
}

function Clip2() {
  return (
    <div className="h-10 w-7 rounded-sm border-[3px] border-ink/40 bg-transparent shadow-sm" />
  );
}

/* ------------------------------------------------------------------
   The scattered layer. Pointer-events are off on the container so the
   page stays usable; each object re-enables them for itself.
------------------------------------------------------------------- */
export default function DeskObjects({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement>;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden
      // Above the bento cards (which sit in normal flow) but below the nav
      // (z-50) and the project modal (z-80).
      className="pointer-events-none absolute inset-0 z-[45] hidden overflow-hidden lg:block"
    >
      <div className="pointer-events-auto">
        <Draggable constraints={containerRef} className="left-[2%] top-[14%]" rotate={-9}>
          <StickyNote text="ship it" tone="amber" />
        </Draggable>

        <Draggable constraints={containerRef} className="right-[2.5%] top-[26%]" rotate={7}>
          <StickyNote text="read the docs" tone="sky" />
        </Draggable>

        <Draggable constraints={containerRef} className="left-[5%] top-[52%]" rotate={14}>
          <Paperclip />
        </Draggable>

        <Draggable constraints={containerRef} className="right-[6%] top-[62%]" rotate={-6}>
          <WashiTape tone="pink" />
        </Draggable>

        <Draggable constraints={containerRef} className="left-[1.5%] top-[74%]" rotate={0}>
          <Pin />
        </Draggable>

        <Draggable constraints={containerRef} className="right-[3%] top-[12%]" rotate={-14}>
          <Star />
        </Draggable>

        <Draggable constraints={containerRef} className="left-[3.5%] top-[34%]" rotate={22}>
          <Clip2 />
        </Draggable>
      </div>
    </div>
  );
}
