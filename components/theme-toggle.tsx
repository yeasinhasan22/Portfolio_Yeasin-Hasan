"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes only knows the real theme after hydration.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // Stays generic until mounted — the server can't know the resolved theme,
      // and a theme-specific label here would mismatch on hydration.
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle colour theme"
      }
      className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-ink/12 text-ink-soft transition-colors duration-300 hover:border-ink hover:text-ink"
    >
      {/* Render nothing theme-specific until mounted to avoid a mismatch. */}
      {mounted && (
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </motion.span>
      )}
    </button>
  );
}
