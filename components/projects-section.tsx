"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, payment processing, and order tracking.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1974&auto=format&fit=crop",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
    color: "hsl(var(--primary))",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team workspaces, and progress tracking.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1974&auto=format&fit=crop",
    technologies: ["React", "Firebase", "Redux", "Material UI", "Jest"],
    github: "https://github.com",
    live: "https://example.com",
    color: "hsl(var(--chart-2))",
  },
  {
    title: "Social Media Dashboard",
    description: "A comprehensive dashboard for social media analytics with data visualization, scheduling, and performance metrics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    technologies: ["Vue.js", "D3.js", "Node.js", "Express", "PostgreSQL"],
    github: "https://github.com",
    live: "https://example.com",
    color: "hsl(var(--chart-3))",
  },
  {
    title: "Fitness Tracking App",
    description: "A mobile-first fitness tracking application with workout plans, progress visualization, and social features.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    technologies: ["React Native", "GraphQL", "Apollo", "MongoDB", "Chart.js"],
    github: "https://github.com",
    live: "https://example.com",
    color: "hsl(var(--chart-4))",
  },
  {
    title: "Real Estate Platform",
    description: "A real estate listing platform with advanced search, virtual tours, and appointment scheduling.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    technologies: ["Next.js", "Supabase", "Mapbox", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    live: "https://example.com",
    color: "hsl(var(--chart-5))",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
            A selection of my recent work showcasing my skills and experience in building
            interactive and responsive web applications.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                {/* Project number */}
                <div 
                  className="absolute -top-16 opacity-10 text-[120px] font-bold z-0"
                  style={{ color: project.color, left: isEven ? '0' : 'auto', right: isEven ? 'auto' : '0' }}
                >
                  {index + 1}
                </div>
                
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                  {/* Project Image */}
                  <motion.div 
                    className="w-full md:w-1/2 project-card h-[300px] md:h-[400px]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-card-inner h-full">
                      <div className="project-card-front h-full">
                        <div className="relative w-full h-full overflow-hidden rounded-xl border border-border/50">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-6">
                              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.slice(0, 3).map((tech) => (
                                  <Badge key={tech} variant="outline" className="bg-black/50 text-white border-white/20">
                                    {tech}
                                  </Badge>
                                ))}
                                {project.technologies.length > 3 && (
                                  <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                                    +{project.technologies.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="project-card-back h-full bg-card border border-border/50">
                        <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-4 justify-center">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" style={{ borderColor: `${project.color}40`, color: project.color }}>
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-4 mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </a>
                          </Button>
                          <Button size="sm" style={{ backgroundColor: project.color }} asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Project Details */}
                  <div className="w-full md:w-1/2 space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: project.color }}>
                        {project.title}
                      </h3>
                      <p className="text-foreground/70 mb-6">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="outline" 
                            className="text-foreground/80"
                            style={{ borderColor: `${project.color}40` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button variant="outline" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                          </a>
                        </Button>
                        <Button style={{ backgroundColor: project.color }} asChild>
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div 
                  className="absolute -z-10 w-64 h-64 rounded-full blur-3xl opacity-10"
                  style={{ 
                    backgroundColor: project.color,
                    left: isEven ? '10%' : 'auto',
                    right: isEven ? 'auto' : '10%',
                    top: '20%'
                  }}
                ></div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}