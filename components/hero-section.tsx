"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { Github, Linkedin, Twitter, Mail, ArrowDown } from "lucide-react";
import { useTheme } from "next-themes";

export default function HeroSection() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleHireMe = () => {
    window.open("mailto:yeasin.hasan022@gmail.com?subject=Job Opportunity&body=Hi Yeasin, I'd like to discuss a job opportunity with you.", "_blank");
  };

  const socialLinks = [
    { 
      icon: <Github className="h-5 w-5" />, 
      url: "https://github.com", 
      label: "GitHub" 
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      url: "https://linkedin.com", 
      label: "LinkedIn" 
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      url: "https://twitter.com", 
      label: "Twitter" 
    },
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient background */}
        <div className="hero-gradient"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="smallGrid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
        
        {/* Animated particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 z-10 pt-20"
        style={{ opacity, scale, y }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Profile Image */}
          <motion.div 
            className="relative w-64 h-64 md:w-80 md:h-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-primary to-chart-2 opacity-20 blur-xl"></div>
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
            <Image
              src="/images/dp-1.png"
              alt="Yeasin Hasan"
              fill
              className="object-cover rounded-[30%]"
              priority
            />
              
              {/* Interactive particles */}
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-primary/50"
                  animate={{
                    x: mousePosition.x / 10 - 10 + Math.random() * 20,
                    y: mousePosition.y / 10 - 10 + Math.random() * 20,
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
            
            {/* Rotating circle around image */}
            <div className="absolute inset-0 w-full h-full rotating-circle pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="48" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5"
                  strokeDasharray="1,5"
                  className="text-primary/30"
                />
                {/* Dots on the circle */}
                {[0, 90, 180, 270].map((angle, i) => (
                  <circle
                    key={i}
                    cx={50 + 48 * Math.cos(angle * Math.PI / 180)}
                    cy={50 + 48 * Math.sin(angle * Math.PI / 180)}
                    r="1.5"
                    fill="currentColor"
                    className="text-primary"
                  />
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.h2
              className="text-xl md:text-2xl font-medium text-primary mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hello There, I'm
            </motion.h2>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Yeasin Hasan
            </motion.h1>
            
            <motion.h3
              className="text-xl md:text-2xl font-semibold mb-6 text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Software Engineer
            </motion.h3>
            
            <div className="space-y-6">
              {/* Bio with character-by-character animation */}
              <motion.p
                className="text-foreground/70 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {Array.from("Passionate software engineer specializing in creating beautiful, interactive web experiences.").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.03, delay: 0.4 + index * 0.01 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
              
              {/* Social links */}
              <motion.div 
                className="flex justify-center lg:justify-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors social-icon"
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </motion.div>
              
              {/* Hire me button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button 
                  onClick={handleHireMe}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                  style={{
                    animation: "pulse 2s infinite",
                  }}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  );
}