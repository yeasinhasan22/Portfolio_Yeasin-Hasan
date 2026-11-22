"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useAnimationFrame,
} from "framer-motion";

type Mode = "default" | "link" | "drag" | "view" | "text";

/**
 * Paper-shop cursor:
 *  - an ink dot that sits exactly on the pointer
 *  - a lagging registration ring drawn as a dashed "cut line" that rotates
 *  - corner ticks, like crop marks on a print layout
 *  - a highlighter swatch + label when over something interactive
 * Disabled on touch pointers and for prefers-reduced-motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 190, damping: 20, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 190, damping: 20, mass: 0.5 });

  const spin = useRef<SVGSVGElement>(null);
  const angle = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !calm);
  }, []);

  // Rotate the dashed ring continuously — cheap, runs off the MotionValue loop.
  useAnimationFrame((_, delta) => {
    if (!spin.current) return;
    angle.current = (angle.current + delta * 0.03) % 360;
    spin.current.style.transform = `rotate(${angle.current}deg)`;
  });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement)?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor], [data-draggable]"
      ) as HTMLElement | null;

      if (!el) {
        setMode("default");
        setLabel(null);
        return;
      }

      const custom = el.dataset?.cursor ?? null;
      setLabel(custom);

      if (el.hasAttribute("data-draggable")) setMode("drag");
      else if (el.matches("input, textarea")) setMode("text");
      else if (custom === "view" || custom === "open") setMode("view");
      else setMode("link");
    };

    const leave = () => setVisible(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const active = mode !== "default";
  const scale = down ? 0.82 : active ? 1 : 0.52;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
    >
      {/* ink dot */}
      <motion.div
        style={{ x, y }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: mode === "text" ? 0.4 : active ? 0 : 1,
        }}
        transition={{ duration: 0.16 }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-ink"
      />

      {/* registration ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="absolute -ml-7 -mt-7 grid h-14 w-14 place-items-center"
      >
        {/* highlighter swatch that fills in behind the label */}
        <motion.span
          className="absolute inset-[6px] rounded-full"
          animate={{
            backgroundColor: active
              ? "hsl(var(--acc-lime) / 0.9)"
              : "hsl(var(--acc-lime) / 0)",
          }}
          transition={{ duration: 0.2 }}
        />

        {/* dashed cut-line circle */}
        <svg
          ref={spin}
          viewBox="0 0 56 56"
          className="absolute inset-0 h-full w-full origin-center"
        >
          <circle
            cx="28"
            cy="28"
            r="25"
            fill="none"
            stroke="hsl(var(--ink))"
            strokeOpacity={active ? 0.9 : 0.45}
            strokeWidth="1.25"
            strokeDasharray="5 6"
            strokeLinecap="round"
          />
        </svg>

        {/* crop marks */}
        {!active && (
          <>
            <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-ink/45" />
            <span className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-ink/45" />
            <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-ink/45" />
            <span className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-ink/45" />
          </>
        )}

        {/* label */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.span
              key={label ?? mode}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.16 }}
              className="relative z-10 max-w-[48px] text-center font-mono text-[7px] font-bold uppercase leading-[1.1] tracking-[0.1em] text-ink"
            >
              {label ?? (mode === "drag" ? "drag" : mode === "text" ? "" : "open")}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
