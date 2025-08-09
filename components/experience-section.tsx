"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

const experiences: Experience[] = [
  {
    title: "Software Developer",
    company: "CLAREx Limited",
    period: "2024 - Present",
    description: "Designed & Developed the official site from scratch of CLAREx Ltd. using Next.js, Tailwind CSS, Redux & MongoDB. Also working on the Project : The Marvel - Be You,  which is the biggest Influencer & Brand management system in Bangladesh - Using MERN Stack.",
    technologies: ["MERN Stack", "Next.js", "Node.js", "Vite", "MongoDB", "Express", "PostgreSQL", "Redux"],
  },
  {
    title: "Full Stack Developer",
    company: "Shell Glazing Solution",
    period: "2022 - 2024 (Part time)",
    description: "Developed and maintained multiple client projects using React and Express. Collaborated with design teams to implement responsive UI components and integrated third-party APIs.",
    technologies: ["React", "Express", "MySQL", "Redux"],
  },
];

const education: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science & Engineering",
    institution: "United International University",
    period: "2019 - 2024",
    description: "Specialized in Software Engineering with a strong foundation in Data Structures, Algorithms, and Machine Learning. Gained hands-on experience in system design, cloud computing, and distributed systems. Additional coursework included database systems, computer networks, and artificial intelligence. Graduated with honors.",
  },
  {
    degree: "JavaScript Full-Stack Mastery with Next.js",
    institution: "Center for Development of IT Professionals (CDIP), UIU",
    period: "2024",
    description: "Hands-on training in full-stack development with JavaScript and Next.js, focusing on scalable web apps, data structures, and real-world projects.",
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  useEffect(() => {
    // Create background animation
    const bgCtx = gsap.context(() => {
      // Animated gradient background
      gsap.to(backgroundRef.current, {
        backgroundPosition: "200% 200%",
        duration: 15,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      });

      // Create particles
      if (particlesRef.current) {
        const particles = [];
        const numParticles = 20; // Reduced number of particles for a cleaner look
        const colors = ["#B5FF6D", "#61BEFF", "#ffffff"];
        
        for (let i = 0; i < numParticles; i++) {
          const particle = document.createElement("div");
          particle.className = "absolute rounded-full";
          
          // Randomize particle properties
          const size = Math.random() * 8 + 2; // Slightly smaller particles
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const opacity = Math.random() * 0.3 + 0.05; // More subtle opacity
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          // Set particle style
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${x}%`;
          particle.style.top = `${y}%`;
          particle.style.opacity = opacity.toString();
          particle.style.backgroundColor = color;
          particle.style.boxShadow = `0 0 ${size * 1.5}px ${color}`; // Reduced glow
          
          particlesRef.current.appendChild(particle);
          particles.push(particle);
          
          // Animate each particle
          gsap.to(particle, {
            x: `${(Math.random() - 0.5) * 80}`, // Less movement
            y: `${(Math.random() - 0.5) * 80}`,
            duration: 8 + Math.random() * 15, // Slower movement
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 5,
          });
        }
      }
    });

    return () => bgCtx.revert();
  }, []);

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Minimal background with subtle effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Gradient background with animation */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 bg-gradient-to-br from-black via-[#081a08] to-[#062032]"
          style={{
            backgroundSize: "400% 400%",
            backgroundPosition: "0% 0%"
          }}
        ></div>

        {/* Animated glow particles */}
        <div ref={particlesRef} className="absolute inset-0"></div>

        {/* Subtle accent elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#B5FF6D]/5 to-transparent"></div>
        
        {/* Subtle light rays */}
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-[#B5FF6D]/3 blur-3xl transform -skew-x-12"></div>
        <div className="absolute top-0 right-1/4 w-1/3 h-full bg-[#61BEFF]/3 blur-3xl transform skew-x-12"></div>
      </div>

      <motion.div
        className="container mx-auto px-4"
        ref={containerRef}
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#B5FF6D] to-[#61BEFF]">Professional Background</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B5FF6D] to-[#61BEFF] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Work Experience */}
          <div>
            <motion.h3
              className="text-2xl font-bold mb-8 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-[#B5FF6D] to-[#9eff47] w-8 h-8 rounded-full flex items-center justify-center text-black mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </span>
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#B5FF6D] to-[#9eff47] tracking-wider font-medium">
                Work Experience
              </p>
            </motion.h3>

            <div className="relative experience-timeline pl-8">
              {/* Experience items */}
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Timeline dot and line */}
                  <div className="absolute -left-4 top-6 w-3 h-3 rounded-full bg-gradient-to-r from-[#B5FF6D] to-[#9eff47] z-10 shadow-[0_0_8px_#B5FF6D]"></div>
                  <div className="absolute -left-3 top-6 w-0.5 h-full bg-gradient-to-b from-[#B5FF6D] to-transparent"></div>

                  <Card className="overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(181,255,109,0.1)] hover:-translate-y-1 border border-[#B5FF6D]/20 backdrop-blur-sm bg-black/40">
                    <CardHeader className="pb-2 bg-gradient-to-r from-[#B5FF6D]/10 to-transparent">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-white">{exp.title}</CardTitle>
                          <CardDescription className="text-lg font-medium text-[#B5FF6D]/80">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-sm border-[#B5FF6D]/30 text-[#B5FF6D] bg-[#B5FF6D]/5">
                          {exp.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-300">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="bg-[#B5FF6D]/10 text-[#B5FF6D] hover:bg-[#B5FF6D]/20 transition-all duration-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              className="text-2xl font-bold mb-8 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-[#61BEFF] to-[#47b0ff] w-8 h-8 rounded-full flex items-center justify-center text-black mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </span>
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#61BEFF] to-[#47b0ff] tracking-wider font-medium">
                Education
              </p>
            </motion.h3>

            <div className="relative experience-timeline pl-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Timeline dot and line */}
                  <div className="absolute -left-4 top-6 w-3 h-3 rounded-full bg-gradient-to-r from-[#61BEFF] to-[#47b0ff] z-10 shadow-[0_0_8px_#61BEFF]"></div>
                  <div className="absolute -left-3 top-6 w-0.5 h-full bg-gradient-to-b from-[#61BEFF] to-transparent"></div>

                  <Card className="overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(97,190,255,0.1)] hover:-translate-y-1 border border-[#61BEFF]/20 backdrop-blur-sm bg-black/40">
                    <CardHeader className="pb-2 bg-gradient-to-r from-[#61BEFF]/10 to-transparent">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-white">{edu.degree}</CardTitle>
                          <CardDescription className="text-lg font-medium text-[#61BEFF]/80">
                            {edu.institution}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-sm border-[#61BEFF]/30 text-[#61BEFF] bg-[#61BEFF]/5">
                          {edu.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{edu.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Add CSS for timeline styling */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        
        .experience-timeline .absolute {
          transition: all 0.3s ease;
        }
        
        .experience-dot {
          position: absolute;
          left: -1rem;
          top: 1.5rem;
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          z-index: 10;
          animation: pulse 2s infinite;
        }
      `}</style>
    </section>
  );
}