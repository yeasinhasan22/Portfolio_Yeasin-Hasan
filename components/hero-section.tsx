"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Facebook } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";

interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
}

export default function HeroSection() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  const particleSeeds = useRef(
    Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      offsetX: Math.random() * 20 - 10,
      offsetY: Math.random() * 20 - 10,
    }))
  );

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

    const bgCtx = gsap.context(() => {
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          backgroundPosition: "200% 0%",
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      }

      if (particlesRef.current) {
        particlesRef.current.innerHTML = "";
        const numParticles = 25;
        const colors = ["#B5FF6D", "#61BEFF", "#ffffff"];

        for (let i = 0; i < numParticles; i++) {
          const particle = document.createElement("div");
          particle.className = "absolute rounded-full particle";

          const size = Math.random() * 8 + 2;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const opacity = Math.random() * 0.5 + 0.1;
          const color = colors[Math.floor(Math.random() * colors.length)];

          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${x}%`;
          particle.style.top = `${y}%`;
          particle.style.opacity = opacity.toString();
          particle.style.backgroundColor = color;
          particle.style.boxShadow = `0 0 ${size * 1.5}px ${color}`;

          particlesRef.current.appendChild(particle);

          const tl = gsap.timeline({ repeat: -1, yoyo: true });
          tl.to(particle, {
            x: `${(Math.random() - 0.5) * 250}`,
            y: `${(Math.random() - 0.5) * 250}`,
            rotation: 360,
            duration: 5 + Math.random() * 7,
            ease: "power1.inOut",
          });
        }
      }
    });

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      bgCtx.revert();
    };
  }, []);

  if (!isMounted) return null;

  const handleHireMe = () => {
    window.open(
      "mailto:yeasin.hasan022@gmail.com?subject=Job Opportunity&body=Hi Yeasin, I'd like to discuss a job opportunity with you.",
      "_blank"
    );
  };

  const socialLinks: SocialLink[] = [
    {
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/yeasinhasan22/",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/yeasin-hasan-513064249/",
      label: "LinkedIn",
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      url: "https://www.facebook.com/yeasinhasan22/",
      label: "Facebook",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          ref={backgroundRef}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(270deg, #B5FF6D, #61BEFF, #062032, #081a08)",
            backgroundSize: "400% 400%",
            backgroundPosition: "0% 0%",
          }}
        />
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[#B5FF6D]/5 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[#61BEFF]/5 mix-blend-overlay"></div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 z-10 pt-32"
        style={{ opacity, scale, y }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Profile */}
          <motion.div
            className="relative w-64 h-64 md:w-96 md:h-96 group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#B5FF6D] to-[#61BEFF] opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#B5FF6D]/20 shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <Image
                src="/images/portfolio-convo.jpeg"
                alt="Portrait of Yeasin Hasan"
                fill
                className="object-cover rounded-[30%] group-hover:scale-110 transition-transform duration-500"
                priority
              />
              {particleSeeds.current.map((seed, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#B5FF6D]/50"
                  animate={{
                    x: mousePosition.x / 8 + seed.offsetX,
                    y: mousePosition.y / 8 + seed.offsetY,
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    left: `${seed.left}%`,
                    top: `${seed.top}%`,
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2,5"
                  className="text-[#B5FF6D]/30"
                />
              </svg>
            </div>
          </motion.div>

          {/* Text */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.h2
              className="text-xl md:text-2xl font-medium text-[#B5FF6D] mb-2 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Hello There, I'm
            </motion.h2>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#B5FF6D] to-[#61BEFF] animate-text-shimmer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              Yeasin Hasan
            </motion.h1>
            <motion.h3
              className="text-lg md:text-xl font-semibold mb-6 text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Full-Stack Developer | MERN & Next.js Specialist | Creative Technologist
            </motion.h3>
            <div className="space-y-6">
              <motion.p
                className="text-white/70 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <p>A passionate Full-Stack Developer who loves turning ideas into smooth, meaningful digital experiences. I specialize in Next.js, MERN stack, and modern UI/UX, building fast, scalable, and user-focused applications.</p>
                <br />
                <p>With hands-on experience in real-world projects, from complex web platforms to fully redesigned mobile app prototypes, I bridge the gap between creativity and clean engineering. I enjoy crafting interfaces that feel good to use — and systems that perform even better.</p>
                <br />
                <p>I build with purpose, design with clarity, and deliver with impact.</p>
              </motion.p>

              {/* Social Icons */}
              <motion.div
                className="flex justify-center lg:justify-start space-x-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 group"
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      rotate: Math.random() * 10 - 5,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <Button
                  onClick={handleHireMe}
                  className="bg-[#B5FF6D] hover:bg-[#B5FF6D]/90 text-black px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all group"
                >
                  <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Contact Me
                </Button>
                <Button
                  asChild
                  className="bg-[#B5FF6D] hover:bg-[#B5FF6D]/90 text-black px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all group"
                >
                  <a

                    href="/CV-Yeasin Hasan-Software-Engineer_UIU.pdf"
                    download
                  >
                    <svg className="mr-2 h-5 w-5 group-hover:animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Download CV
                  </a>
                </Button>

              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="hidden sm:absolute sm:bottom-10 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:flex sm:flex-col sm:items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="w-0.5 h-10 bg-gradient-to-b from-[#B5FF6D] to-[#61BEFF] mb-2 animate-pulse"></div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg
            className="w-6 h-6 text-[#B5FF6D]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
