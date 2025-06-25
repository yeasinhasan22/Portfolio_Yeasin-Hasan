"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Route, FlameKindling } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  ring: number;
}

const navItems: NavItem[] = [
  { name: "WIN", href: "#contact", ring: 0 },
  { name: "LEGACY", href: "#home", ring: 1 },
  { name: "TEAM", href: "#my-self", ring: 2 },
  { name: "LEADER", href: "#experience", ring: 3 },
  { name: "INNOVATOR", href: "#my-work", ring: 4 },
  { name: "STRATEGIST", href: "#reviews", ring: 5 },
  { name: "DISRUPTOR", href: "#certifications", ring: 6 },
  { name: "BUILDER", href: "#youtube", ring: 7 },
  { name: "VISIONARY", href: "#contact", ring: 8 },
  
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    setIsDarkMode(html.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDarkMode(html.classList.contains('dark'));
    });
    observer.observe(html, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const calculatePosition = (index: number) => {
    const angle = 45 + (45 * index) / (navItems.length - 1);
    return {
      transform: `rotate(${angle - 90}deg)`,
      transformOrigin: '800px 0px'
    };
  };

  return (
    <div className="fixed top-0 right-0 z-50 h-screen w-screen pointer-events-none">
      {/* Menu Toggle Button */}
      <motion.div
        className={`absolute top-6 right-6 z-50 rounded-full w-12 h-12 flex items-center justify-center pointer-events-auto transition-colors duration-300 ${
          isScrolled ? "bg-background/80 shadow-md" : "bg-red-500"
        } ${isDarkMode ? 'dark:bg-blue-600' : ''}`}
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full h-full flex items-center justify-center"
          aria-label="Toggle route"
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div key="close" initial={{ rotate: -180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 180, opacity: 0 }}>
                <FlameKindling className="h-6 w-6 stroke-white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -180, opacity: 0 }}>
                <Route className="h-6 w-6 stroke-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Concentric Circles Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-12 right-12 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg width="1000" height="1000" viewBox="0 0 800 800" className="overflow-visible">
              <defs>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B0000" />
                  <stop offset="100%" stopColor="#FF3030" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* Central Circle */}
              <circle
                cx="800"
                cy="0"
                r="40"
                fill={isDarkMode ? "url(#blueGradient)" : "url(#redGradient)"}
              />

              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx="800"
                  cy="0"
                  r={(800 - i * 80) / 2}
                  fill="none"
                  stroke={isDarkMode ? "url(#blueGradient)" : "url(#redGradient)"}
                  strokeWidth="80"
                  strokeOpacity={0.9 - i * 0.1}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                />
              ))}

              {navItems.map((item, index) => {
                const textRadius = 800 - (item.ring - 0.5) * 80;
                const rotation = 45 + (45 * index) / (navItems.length - 1) - 90;
                
                return (
                  <motion.g
                    key={item.name}
                    style={calculatePosition(index)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 * item.ring + 0.3 }}
                  >
                    <path
                      id={`textPath-${index}`}
                      d={`M ${800 - textRadius / 2} 0 A ${textRadius / 2} ${textRadius / 2} 0 0 0 800 ${textRadius / 2}`}
                      fill="none"
                    />
                    <text 
                      className={`text-lg font-bold cursor-pointer ${isDarkMode ? 'fill-blue-200' : 'fill-yellow-300'}`}
                      transform={`rotate(${-rotation} 800 0)`}
                    >
                      <textPath
                        href={`#textPath-${index}`}
                        startOffset="50%"
                        textAnchor="middle"
                        onClick={() => scrollToSection(item.href)}
                        className="pointer-events-auto"
                      >
                        {item.name}
                      </textPath>
                    </text>
                  </motion.g>
                );
              })}
            </svg>

            <div className="fixed inset-0 bg-transparent z-40" onClick={() => setMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}