"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Code, 
  Server, 
  Database, 
  Wrench, 
  Monitor,
  Cloud,
  Star,
  CheckCircle,
  ArrowRight,
  Brain,
  Zap,
  Target,
  Award,
  Palette
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Skill {
  name: string;
  expertise: "Expert" | "Advanced" | "Proficient";
  description: string;
  years: number;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
}

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: <Monitor className="w-5 h-5" />,
    skills: [
      { 
        name: "React", 
        expertise: "Advanced", 
        description: "Component architecture, hooks, context, state management",
        years: 1
      },
      { 
        name: "Next.js", 
        expertise: "Advanced", 
        description: "SSR, SSG, API routes, App Router, deployment optimization",
        years: 1
      },
      { 
        name: "TypeScript", 
        expertise: "Proficient", 
        description: "Type safety, interfaces, generics, modern JavaScript",
        years: 1
      },
      { 
        name: "Tailwind CSS", 
        expertise: "Advanced", 
        description: "Utility-first styling, responsive design, custom configurations",
        years: 1
      },
      { 
        name: "JavaScript", 
        expertise: "Advanced", 
        description: "ES6+, async/await, DOM manipulation, modern patterns",
        years: 1
      }
    ],
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: <Server className="w-5 h-5" />,
    skills: [
      { 
        name: "Node.js", 
        expertise: "Advanced", 
        description: "Server-side JavaScript, API development, async programming",
        years: 1
      },
      { 
        name: "Express.js", 
        expertise: "Advanced", 
        description: "RESTful APIs, middleware, routing, authentication",
        years: 1
      },
      { 
        name: "Python", 
        expertise: "Proficient", 
        description: "FastAPI, web scraping, automation, data processing",
        years: 1
      },
      { 
        name: "API Design", 
        expertise: "Advanced", 
        description: "REST architecture, endpoint design, documentation",
        years: 1
      }
    ],
  },
  {
    id: "database",
    name: "Database & Storage",
    icon: <Database className="w-5 h-5" />,
    skills: [
      { 
        name: "MongoDB", 
        expertise: "Advanced", 
        description: "Document-based storage, aggregation, indexing strategies",
        years: 1
      },
      { 
        name: "PostgreSQL", 
        expertise: "Proficient", 
        description: "Relational database design, queries, data modeling",
        years: 1
      },
      { 
        name: "Firebase", 
        expertise: "Advanced", 
        description: "Realtime database, Firestore, authentication, hosting",
        years: 1
      },
      { 
        name: "Prisma", 
        expertise: "Proficient", 
        description: "Type-safe database access, schema management",
        years: 1
      }
    ],
  },
  {
    id: "tools",
    name: "Development Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { 
        name: "Git", 
        expertise: "Advanced", 
        description: "Version control, branching, collaboration workflows",
        years: 1
      },
      { 
        name: "VS Code", 
        expertise: "Advanced", 
        description: "Extensions, debugging, productivity configurations",
        years: 1
      },
      { 
        name: "Docker", 
        expertise: "Proficient", 
        description: "Containerization, development environments",
        years: 1
      },
      { 
        name: "Postman", 
        expertise: "Advanced", 
        description: "API testing, documentation, automation",
        years: 1
      }
    ],
  },
  {
    id: "creative",
    name: "Creative Tools",
    icon: <Palette className="w-5 h-5" />,
    skills: [
      { 
        name: "Video Editing", 
        expertise: "Advanced", 
        description: "Professional video production, motion graphics, storytelling",
        years: 1
      },
      { 
        name: "Illustration", 
        expertise: "Proficient", 
        description: "Digital art, vector graphics, concept design",
        years: 1
      },
      { 
        name: "UI/UX Design", 
        expertise: "Advanced", 
        description: "User experience design, wireframing, prototyping",
        years: 1
      },
      { 
        name: "Figma", 
        expertise: "Advanced", 
        description: "Interface design, collaborative design systems",
        years: 1
      },
      { 
        name: "Photoshop", 
        expertise: "Advanced", 
        description: "Photo manipulation, digital compositing, design assets",
        years: 1
      },
      { 
        name: "After Effects", 
        expertise: "Proficient", 
        description: "Motion graphics, visual effects, animation",
        years: 1
      },
      { 
        name: "3D Modeling", 
        expertise: "Proficient", 
        description: "3D asset creation, texturing, rendering workflows",
        years: 1
      },
      { 
        name: "Blender", 
        expertise: "Proficient", 
        description: "3D modeling, animation, rendering, sculpting",
        years: 1
      }
    ],
  }
];

const achievements: Achievement[] = [
  {
    title: "Full-Stack Development",
    description: "End-to-end application development",
    icon: <Code className="w-5 h-5" />
  },
  {
    title: "Modern Tech Stack",
    description: "Latest frameworks and tools",
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Project Delivery",
    description: "15+ successful projects completed",
    icon: <Target className="w-5 h-5" />
  },
  {
    title: "Problem Solving",
    description: "Creative solutions for complex challenges",
    icon: <Award className="w-5 h-5" />
  }
];

const getExpertiseColor = (expertise: string) => {
  switch (expertise) {
    case "Expert": return "bg-[#B5FF6D] text-slate-900 shadow-lg shadow-[#B5FF6D]/20";
    case "Advanced": return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
    case "Proficient": return "bg-purple-500/20 text-purple-300 border border-purple-500/30";
    default: return "bg-slate-700 text-slate-300";
  }
};

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".skills-header", { opacity: 0, y: 30 });
      gsap.set(".achievement-card", { opacity: 0, y: 20 });
      gsap.set(".category-section", { opacity: 0, y: 20 });
      gsap.set(".skill-item", { opacity: 0, y: 15 });

      // Header animation
      gsap.to(".skills-header", {
        scrollTrigger: {
          trigger: ".skills-header",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Achievements animation
      gsap.to(".achievement-card", {
        scrollTrigger: {
          trigger: ".achievements-grid",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Category sections animation
      gsap.to(".category-section", {
        scrollTrigger: {
          trigger: ".skills-categories",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power2.out"
      });

      // Skill items animation
      gsap.to(".skill-item", {
        scrollTrigger: {
          trigger: ".skills-categories",
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out"
      });

      // Learning section animation
      gsap.set(".learning-section", { opacity: 0, y: 30 });
      gsap.to(".learning-section", {
        scrollTrigger: {
          trigger: ".learning-section",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      id="skills" 
      className="py-24 bg-slate-950"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="skills-header text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B5FF6D]/10 border border-[#B5FF6D]/20 mb-6">
            <Brain className="w-4 h-4 text-[#B5FF6D]" />
            <span className="text-[#B5FF6D] font-medium text-sm">Technical Expertise</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light mb-6 text-white">
            Skills & <span className="text-[#B5FF6D] font-normal">Technologies</span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Crafting exceptional digital experiences with modern technologies and best practices
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="px-4 py-2 bg-slate-900/50 text-slate-300 border-slate-700 hover:border-[#B5FF6D]/50 hover:text-[#B5FF6D] transition-all">
              1+ Years Experience
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-slate-900/50 text-slate-300 border-slate-700 hover:border-[#B5FF6D]/50 hover:text-[#B5FF6D] transition-all">
              15+ Projects
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-slate-900/50 text-slate-300 border-slate-700 hover:border-[#B5FF6D]/50 hover:text-[#B5FF6D] transition-all">
              Full-Stack Developer
            </Badge>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {achievements.map((achievement, index) => (
            <Card key={index} className="achievement-card group bg-slate-900/40 border-slate-800/50 hover:border-[#B5FF6D]/40 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-[#B5FF6D]/10 backdrop-blur-sm transition-all duration-300">
              <div className="p-6 text-center">
                <div className="inline-flex p-3 rounded-xl bg-[#B5FF6D]/10 text-[#B5FF6D] mb-4 group-hover:bg-[#B5FF6D]/20 group-hover:shadow-lg group-hover:shadow-[#B5FF6D]/20 transition-all">
                  {achievement.icon}
                </div>
                <h3 className="text-white font-medium mb-2 group-hover:text-[#B5FF6D] transition-colors">{achievement.title}</h3>
                <p className="text-slate-400 text-sm font-light">{achievement.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Skills Categories */}
        <div className="skills-categories space-y-16">
          {skillCategories.map((category) => (
            <div key={category.id} className="category-section">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
                <div className="p-3 rounded-xl bg-[#B5FF6D]/10 text-[#B5FF6D] border border-[#B5FF6D]/20">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-light text-white">{category.name}</h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <Card 
                    key={skill.name} 
                    className="skill-item group bg-slate-900/40 border-slate-800/40 hover:border-[#B5FF6D]/30 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-[#B5FF6D]/5 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="p-6">
                      {/* Skill Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">{skill.name}</h4>
                          <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getExpertiseColor(skill.expertise)}`}>
                            {skill.expertise}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Star className="w-3 h-3" />
                          <span>{skill.years}y</span>
                        </div>
                      </div>

                      {/* Skill Description */}
                      <p className="text-slate-400 text-sm font-light leading-relaxed mb-4">
                        {skill.description}
                      </p>

                      {/* Hover indicator */}
                      <div className="flex items-center justify-end">
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#B5FF6D] group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Learning Section */}
        <div className="learning-section mt-24">
          <Card className="bg-slate-900/40 border-slate-800/50 backdrop-blur-sm hover:border-[#B5FF6D]/20 transition-all duration-300">
            <div className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-[#B5FF6D]/10 text-[#B5FF6D] border border-[#B5FF6D]/20">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-white">Continuous Learning</h3>
                      <p className="text-[#B5FF6D] text-sm">Always evolving with technology</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 font-light mb-8 leading-relaxed">
                    Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, 
                    methodologies, and best practices to deliver cutting-edge solutions.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-[#B5FF6D]/20 transition-colors">
                      <h4 className="text-white font-medium mb-3 text-sm">Currently Exploring</h4>
                      <ul className="space-y-2 text-xs text-slate-400 font-light">
                        <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#B5FF6D] rounded-full"></span>AI/ML Integration</li>
                        <li className="flex items-center gap-2"><span className="w-1 h-1 bg-blue-400 rounded-full"></span>Advanced React Patterns</li>
                        <li className="flex items-center gap-2"><span className="w-1 h-1 bg-purple-400 rounded-full"></span>Cloud Architecture</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-[#B5FF6D]/20 transition-colors">
                      <h4 className="text-white font-medium mb-3 text-sm">Next Focus</h4>
                      <ul className="space-y-2 text-xs text-slate-400 font-light">
                        <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#B5FF6D] rounded-full"></span>Serverless Architecture</li>
                        <li className="flex items-center gap-2"><span className="w-1 h-1 bg-blue-400 rounded-full"></span>Mobile Development</li>
                        <li className="flex items-center gap-2"><span className="w-1 h-1 bg-purple-400 rounded-full"></span>DevOps Practices</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-4 gap-3">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i}
                        className="h-12 w-12 rounded-lg bg-slate-800/50 border border-slate-700/40 flex items-center justify-center hover:border-[#B5FF6D]/40 hover:bg-[#B5FF6D]/5 transition-colors group"
                      >
                        <div className="w-4 h-4 rounded bg-[#B5FF6D]/30 group-hover:bg-[#B5FF6D]/60 transition-colors"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;