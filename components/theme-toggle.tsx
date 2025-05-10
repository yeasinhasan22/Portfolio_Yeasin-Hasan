"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Only run this effect on client-side
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show a placeholder during SSR and initial hydration
  if (!mounted) {
    return (
      <button
        className="relative flex h-8 w-16 items-center rounded-full shadow-lg p-1 transition-all duration-300 ease-in-out bg-slate-200"
        aria-label="Loading theme toggle"
      >
        <span className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg border transition-all" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex h-8 w-16 items-center rounded-full shadow-lg p-1 transition-all duration-300 ease-in-out ${
        isDark ? "bg-slate-800" : "bg-slate-200"
      }`}
      aria-label="Toggle theme"
    >
      {/* Track */}
      <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
      
      {/* Thumb/Handle */}
      <span 
        className={`absolute flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg border transition-all duration-500 ease-in-out ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {/* Icons with crossfade effect */}
        <Sun 
          className={`absolute h-4 w-4 text-amber-500 transition-all duration-300 ${
            isDark ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0"
          }`} 
        />
        <Moon 
          className={`absolute h-4 w-4 text-slate-800 transition-all duration-300 ${
            isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"
          }`} 
        />
      </span>
    </button>
  );
}