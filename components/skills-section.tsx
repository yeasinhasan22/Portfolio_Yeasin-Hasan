"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  Palette,
  Sparkles
} from "lucide-react";

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
    case "Expert": return "bg-gradient-to-r from-[#B5FF6D] to-[#9AE856] text-slate-900 shadow-lg shadow-[#B5FF6D]/30";
    case "Advanced": return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/10";
    case "Proficient": return "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/10";
    default: return "bg-slate-700 text-slate-300";
  }
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#B5FF6D]/20 rounded-full"
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Mouse follower component
const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-[#B5FF6D]/10 rounded-full pointer-events-none z-50 mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
};

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div 
      ref={sectionRef} 
      id="skills" 
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B5FF6D]/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Optimized Gradient Overlays */}
      <div className="absolute top-15 left-1/4 w-96 h-96 bg-[#B5FF6D] rounded-full opacity-[0.015] blur-[160px] animate-pulse" />
      <div className="absolute bottom-12 right-1/3 w-96 h-96 bg-blue-500 rounded-full opacity-[0.015] blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full opacity-[0.008] blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
      
      <FloatingParticles />
      <MouseFollower />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B5FF6D]/10 border border-[#B5FF6D]/20 mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(181, 255, 109, 0.3)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-4 h-4 text-[#B5FF6D]" />
            </motion.div>
            <span className="text-[#B5FF6D] font-medium text-sm">Technical Expertise</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-light mb-6 text-white">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B5FF6D] to-[#9AE856] font-normal">Technologies</span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Crafting exceptional digital experiences with modern technologies and best practices
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {["1+ Years Experience", "15+ Projects", "Full-Stack Developer"].map((badge, index) => (
              <motion.div
                key={badge}
                className="px-4 py-2 bg-slate-900/50 text-slate-300 border border-slate-700 rounded-full backdrop-blur-sm hover:border-[#B5FF6D]/50 hover:text-[#B5FF6D] hover:shadow-lg hover:shadow-[#B5FF6D]/20 transition-all cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {badge}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="group bg-slate-900/40 border-slate-800/50 hover:border-[#B5FF6D]/40 hover:bg-slate-900/60 backdrop-blur-sm transition-all duration-300 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(181, 255, 109, 0.1)",
                y: -5
              }}
            >
              <div className="p-6 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B5FF6D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div 
                  className="inline-flex p-3 rounded-xl bg-[#B5FF6D]/10 text-[#B5FF6D] mb-4 group-hover:bg-[#B5FF6D]/20 transition-all relative z-10"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {achievement.icon}
                </motion.div>
                <h3 className="text-white font-medium mb-2 group-hover:text-[#B5FF6D] transition-colors relative z-10">{achievement.title}</h3>
                <p className="text-slate-400 text-sm font-light relative z-10">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.7 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <motion.div 
                className="flex items-center gap-4 mb-8 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm hover:border-[#B5FF6D]/30 transition-all duration-300"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(181, 255, 109, 0.1)" }}
              >
                <motion.div 
                  className="p-3 rounded-xl bg-[#B5FF6D]/10 text-[#B5FF6D] border border-[#B5FF6D]/20"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-2xl font-light text-white">{category.name}</h3>
                <div className="ml-auto">
                  <Sparkles className="w-4 h-4 text-[#B5FF6D]/50" />
                </div>
              </motion.div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="group bg-slate-900/40 border-slate-800/40 hover:border-[#B5FF6D]/30 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm rounded-xl overflow-hidden relative"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: skillIndex * 0.08, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.03, 
                      boxShadow: "0 15px 35px rgba(181, 255, 109, 0.1)",
                      y: -3
                    }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B5FF6D]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="p-6 relative z-10">
                      {/* Skill Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2 group-hover:text-[#B5FF6D] transition-colors">{skill.name}</h4>
                          <motion.div 
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getExpertiseColor(skill.expertise)}`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {skill.expertise}
                          </motion.div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <motion.div
                            animate={hoveredSkill === skill.name ? { rotate: 360 } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <Star className="w-3 h-3" />
                          </motion.div>
                          <span>{skill.years}y</span>
                        </div>
                      </div>

                      {/* Skill Description */}
                      <p className="text-slate-400 text-sm font-light leading-relaxed mb-4 group-hover:text-slate-300 transition-colors">
                        {skill.description}
                      </p>

                      {/* Hover indicator */}
                      <div className="flex items-center justify-end">
                        <motion.div
                          animate={hoveredSkill === skill.name ? { x: 4 } : { x: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#B5FF6D] transition-colors" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Section */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-900/40 border-slate-800/50 backdrop-blur-sm hover:border-[#B5FF6D]/20 transition-all duration-300 rounded-xl overflow-hidden relative">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#B5FF6D]/5 via-transparent to-[#B5FF6D]/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="p-8 md:p-12 relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      className="p-3 rounded-xl bg-[#B5FF6D]/10 text-[#B5FF6D] border border-[#B5FF6D]/20"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </motion.div>
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
                    {[
                      { title: "Currently Exploring", items: ["AI/ML Integration", "Advanced React Patterns", "Cloud Architecture"] },
                      { title: "Next Focus", items: ["Serverless Architecture", "Mobile Development", "DevOps Practices"] }
                    ].map((section, index) => (
                      <motion.div
                        key={section.title}
                        className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-[#B5FF6D]/20 transition-all duration-300 backdrop-blur-sm"
                        whileHover={{ scale: 1.02, y: -2 }}
                        initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <h4 className="text-white font-medium mb-3 text-sm">{section.title}</h4>
                        <ul className="space-y-2 text-xs text-slate-400 font-light">
                          {section.items.map((item, itemIndex) => (
                            <motion.li
                              key={item}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.1 + 0.3, duration: 0.4 }}
                              viewport={{ once: true }}
                            >
                              <motion.span 
                                className={`w-1 h-1 rounded-full ${
                                  itemIndex === 0 ? 'bg-[#B5FF6D]' : 
                                  itemIndex === 1 ? 'bg-blue-400' : 'bg-purple-400'
                                }`}
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: itemIndex * 0.5 }}
                              />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-4 gap-3">
                    {[...Array(12)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="h-12 w-12 rounded-lg bg-slate-800/50 border border-slate-700/40 flex items-center justify-center hover:border-[#B5FF6D]/40 hover:bg-[#B5FF6D]/5 transition-all duration-300 group cursor-pointer backdrop-blur-sm"
                        whileHover={{ scale: 1.1, y: -2 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-4 h-4 rounded bg-[#B5FF6D]/30 group-hover:bg-[#B5FF6D]/60 transition-colors"
                          animate={{ 
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 2 + (i * 0.2), 
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsSection;