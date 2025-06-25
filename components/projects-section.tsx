"use client";

import { useRef } from "react";
import Image from "next/image";
import { color, motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "CLAREx Ltd. Official Site",
    description: "A full-featured Business Solution, BPO & Software Development based platform. It is a one-stop-shop for all your business needs. It was fully Designed and Developed from scratch by me.",
    image: "/projects/clarex.webp",
    technologies: ["Figma", "Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    // github: "https://github.com",
    live: "https://clarex.co",
    color: "hsl(var(--primary))",
  },
  {
    title: "The Marvel - Be You",
    description: `The Marvel – Be You is a data-driven platform to bridge the gap between influencers and brands while aiming to systematically assist the influencers to network, receive their deserved recognition, and make a difference in the communication industry.
                  🚧 (Currently working on this project as a Full-Stack Developer)`,
    image: "/projects/theMarvel.webp",
    technologies: ["React", "Supabase", "Redux", "Material UI", "Tailwind CSS"],
    // github: "",
    // live: "",
    color: "hsl(var(--chart-2))",
  },
  {
    title: "SpeakSail - Communication Development Plaform for Elementary School Students",
    description: `SpeakSail is a web-based English learning platform built using the MERN stack and designed in Figma, aimed at improving listening and speaking skills of elementary 
              school students in Bangladesh. It addresses the gap in oral communication by combining technology with the national curriculum to create an engaging, effective, 
              and globally-aligned learning experience.
              
              🔐 Username: yeasin@example.com 
              🔐 Password: StrongPassword123!`,

    image: "/projects/speakSail.webp",
    technologies: ["React", "Express.js", "Node.js", "MongoDB"],
    github: "https://github.com/yeasinhasan22/SpeakSail",
    live: "https://speaksail-client.onrender.com/",
    color: "hsl(var(--chart-3))",
  },
  {
    title: "Webpify - An Image Converter",
    description: "Webpify is a fast and efficient image converter that transforms images from any format to WebP. Built with Next.js and server-side image processing, it ensures high-speed conversion and optimized output, perfect for web performance and modern development needs.",
    image: "/projects/webpify.webp",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    // github: "https://github.com",
    live: "https://webpify.root9devs.com/",
    color: "hsl(var(--chart-5))",
  },
  {
    title: "Marvel Of Tomorrow - Influncer Voting Platform",
    description: "Marvel of Tomorrow was an influencer voting platform built to spotlight and celebrate rising talents. Users were able to discover, support, and vote for their favorite influencers through a transparent and engaging system. The platform successfully fostered community interaction and recognition before the voting period concluded.",
    image: "/projects/marveloftomorrow.webp",
    technologies: ["Next.js", "Supabase", "Tailwind CSS", "Framer Motion", "GSAP"],
    // github: "https://github.com",
    live: "https://marveloftomorrow.xyz/",
    color: "hsl(var(--chart-5))",
  },
  {
    title: "AthletiHub - Sports & Esports Platform",
    description: "AthletiHub is a dynamic platform that combines turf rent sharing with a community-driven sports forum, allowing users to post and engage in all things sports. It also features an integrated Esports community and a robust tournament creation and tracking system, making it a one-stop hub for both physical and digital sports enthusiasts.",
    image: "/projects/athletiHub.webp",
    technologies: ["React", "Express.js", "Node.js", "MongoDB"],
    github: "https://github.com/yeasinhasan22/Athletihub",
    live: "https://www.figma.com/design/8ult5WJRUZXy0ErrEzoGlD/AthletiHub?node-id=0-1&t=cX1IZgPkDyVzDx3P-1",
    color: "hsl(var(--chart-4))",
  },
  {
    title: "Chef's Notebook",
    description: "Chef's Notebook is a social recipe-sharing platform where users can post their unique recipes, explore a wide range of categorized dishes shared by others, and engage with the community through likes, comments, shares, and ratings. Users can also follow fellow food enthusiasts and stay connected with their culinary creations.",
    image: "/projects/chefsNotebook.webp",
    technologies: ["Next.js", "Supabase", "Mapbox", "Tailwind CSS", "Framer Motion"],
    // github: "https://github.com",
    live: "https://www.figma.com/design/wgOmUhDaTm8ROsPxvg8o8l/Chef-s-Notebook?node-id=1-5&t=6t5K4jUyyyspYYRB-1",
    color: "hsl(var(--chart-5))",
  },
  {
    title: "AppointTrack - A Health Care App Design",
    description: `AppointTrack is a modern healthcare management mobile application designed to streamline doctor appointments, emergency services, and patient queue tracking. This user-friendly app enables 
                  patients to create accounts, sign in securely, and search for doctors by specialty. The platform offers real-time queue tracking, categorized 
                  doctor listings (e.g., Dentist, Therapist, Surgeon), and essential services like blood requests, emergency helplines, and ambulance bookings. 
                  With a clean, intuitive UI and options for social logins (Facebook and Google), AppointTrack ensures a smooth and efficient healthcare experience 
                  for both patients and medical professionals.`,
    image: "/projects/appointTrack.webp",
    technologies: ["Vue.js", "D3.js", "Node.js", "Express", "PostgreSQL"],
    // github: "https://github.com",
    live: "https://www.figma.com/design/CMKlCv98rtLG6WFT8hy5YL/AppointTrack?node-id=0-1&t=WXicDHlgEXtYgi7l-1",
    color: "hsl(var(--chart-2))",
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