"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Route, FlameKindling } from 'lucide-react';

const navigationItems = [
  { name: "Home", href: "#home" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

// Original circular menu items
const navItems = [
  { name: "HOME", href: "#home", ring: 1 },
  { name: "MY SELF", href: "#my-self", ring: 2 },
  { name: "EXPERIENCE", href: "#experience", ring: 3 },
  { name: "MY WORK", href: "#my-work", ring: 4 },
  { name: "REVIEWS", href: "#reviews", ring: 5 },
  { name: "CERTIFICATIONS", href: "#certifications", ring: 6 },
  { name: "MY YOUTUBE", href: "#youtube", ring: 7 },
  { name: "CONTACT", href: "#contact", ring: 8 },
];

export default function SimpleNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      
      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.href.substring(1));
      const currentPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= currentPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
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

  // Toggle the circular menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setIsMenuVisible(!isMenuVisible);
  };

  const scrollToSection = (sectionId) => {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
    if (menuOpen) setMenuOpen(false);
    
    // Update the active section
    setActiveSection(sectionId.substring(1));
  };


  return (
    <>
    <div className="left-0 right-0 flex justify-center">  
      <motion.header
        className={`fixed top-6 transform z-40 transition-all duration-500 ease-in-out ${
          isScrolled ? "w-[90%] md:w-[70%]" : "w-[85%] md:w-[90%]"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.nav
          className={`rounded-full justify-center border backdrop-blur-md transition-all duration-500 ${
            isScrolled 
              ? "bg-background/70 shadow-lg backdrop-blur-md" 
              : "bg-background/30"
          }`}
        >
          <div className="flex items-center justify-between py-4 px-6">
            <p className="font-extrabold px-4 text-xl md:text-2xl bg-gradient-to-r from-green-200 to-blue-600 bg-clip-text text-transparent">
                .yeasin
            </p>

            {/* Centered Navigation */}
            <div className="flex-grow flex justify-center">
              <ul className="flex items-center space-x-1 md:space-x-3 no-scrollbar">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  
                  return (
                    <li key={item.name}>
                      <motion.button
                        onClick={() => scrollToSection(item.href)}
                        className="relative px-1 md:px-3 py-2 text-[7px] md:text-base font-medium rounded-lg hover:bg-background/50 dark:hover:bg-slate-800/60 transition-colors duration-300 flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isActive && (
                          <motion.span
                            className="absolute left-0 ml-1 w-2 h-2 rounded-full bg-green-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            layoutId="activeIndicator"
                          />
                        )}
                        <span className={`${isActive ? "ml-3" : ""}`}>
                          {item.name}
                        </span>
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex-none">
              <ThemeToggle />
            </div>
          </div>
        </motion.nav>
      </motion.header>
      
      {/* Concentric Circles Menu */}
      <AnimatePresence>
        {isMenuVisible && (
          <motion.div
            className="fixed top-12 right-12 z-50 pointer-events-auto"
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
                const angle = 45 + (45 * index) / (navItems.length - 1);
                const position = {
                  transform: `rotate(${angle - 90}deg)`,
                  transformOrigin: '800px 0px'
                };
                
                return (
                  <motion.g
                    key={item.name}
                    style={position}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 * index + 0.3 }}
                  >
                    <path
                      id={`textPath-${index}`}
                      d={`M 800 ${textRadius / 2} A ${textRadius / 2} ${textRadius / 2} 0 0 1 ${800 - textRadius / 2} 0`}
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
            

            <div className="fixed inset-0 bg-transparent z-40" onClick={toggleMenu} />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}