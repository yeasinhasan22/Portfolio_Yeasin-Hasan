"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  Code, 
  Server, 
  Database, 
  Wrench, 
  Palette, 
  Repeat as RepeatIcon, 
  Braces, 
  FileJson, 
  Subscript as Javascript, 
  Rss as Css, 
  Layout, 
  Terminal,
  Phone as Python, 
  Caravan as Java, 
  Webhook, 
  FileCode, 
  Table, 
  Store as Storage, 
  Boxes, 
  Cylinder, 
  CloudCog, 
  Github as Git, 
  Dock as Docker, 
  Cloud, 
  Cog, 
  TestTube, 
  Video, 
  Paintbrush, 
  Pen, 
  Figma, 
  Image, 
  Box 
} from "lucide-react";

const skillCategories = [
  {
    id: "frontend",
    name: "Frontend",
    icon: <Code className="w-5 h-5" />,
    color: "hsl(var(--primary))",
    skills: [
      { name: "React", icon: <RepeatIcon className="w-6 h-6" /> },
      { name: "Next.js", icon: <Braces className="w-6 h-6" /> },
      { name: "TypeScript", icon: <FileJson className="w-6 h-6" /> },
      { name: "JavaScript", icon: <Javascript className="w-6 h-6" /> },
      { name: "HTML/CSS", icon: <Css className="w-6 h-6" /> },
      { name: "Tailwind CSS", icon: <Layout className="w-6 h-6" /> },
      { name: "Redux", icon: <Boxes className="w-6 h-6" /> },
      { name: "Vue.js", icon: <Code className="w-6 h-6" /> },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: <Server className="w-5 h-5" />,
    color: "hsl(var(--chart-2))",
    skills: [
      { name: "Node.js", icon: <Terminal className="w-6 h-6" /> },
      { name: "Express", icon: <Terminal className="w-6 h-6" /> },
      { name: "NestJS", icon: <FileCode className="w-6 h-6" /> },
      { name: "GraphQL", icon: <Webhook className="w-6 h-6" /> },
      { name: "REST API", icon: <Server className="w-6 h-6" /> },
      { name: "Python", icon: <Python className="w-6 h-6" /> },
      { name: "Java", icon: <Java className="w-6 h-6" /> },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: <Database className="w-5 h-5" />,
    color: "hsl(var(--chart-3))",
    skills: [
      { name: "MongoDB", icon: <Database className="w-6 h-6" /> },
      { name: "PostgreSQL", icon: <Table className="w-6 h-6" /> },
      { name: "MySQL", icon: <Storage className="w-6 h-6" /> },
      { name: "Redis", icon: <Cylinder className="w-6 h-6" /> },
      { name: "Firebase", icon: <CloudCog className="w-6 h-6" /> },
      { name: "Supabase", icon: <Database className="w-6 h-6" /> },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    icon: <Wrench className="w-5 h-5" />,
    color: "hsl(var(--chart-4))",
    skills: [
      { name: "Git", icon: <Git className="w-6 h-6" /> },
      { name: "Docker", icon: <Docker className="w-6 h-6" /> },
      { name: "AWS", icon: <Cloud className="w-6 h-6" /> },
      { name: "CI/CD", icon: <Cog className="w-6 h-6" /> },
      { name: "Jest", icon: <TestTube className="w-6 h-6" /> },
      { name: "Terminal", icon: <Terminal className="w-6 h-6" /> },
    ],
  },
  {
    id: "creative",
    name: "Creative",
    icon: <Palette className="w-5 h-5" />,
    color: "hsl(var(--chart-5))",
    skills: [
      { name: "Video Editing", icon: <Video className="w-6 h-6" /> },
      { name: "Illustration", icon: <Paintbrush className="w-6 h-6" /> },
      { name: "UI/UX Design", icon: <Pen className="w-6 h-6" /> },
      { name: "Figma", icon: <Figma className="w-6 h-6" /> },
      { name: "Photoshop", icon: <Image className="w-6 h-6" /> },
      { name: "3D Modeling", icon: <Box className="w-6 h-6" /> },
    ],
  },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Vector Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <svg className="absolute w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity="0.2" />
            </linearGradient>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Technical Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] mx-auto"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
            I specialize in modern web technologies with expertise across the full stack.
            My focus is on creating performant, accessible, and beautiful web experiences.
          </p>
        </motion.div>

        {/* Skills Tabs */}
        <Tabs defaultValue="frontend" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="h-12 bg-background/50 backdrop-blur-sm border border-border/50">
              {skillCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-[hsl(var(--chart-2))] data-[state=active]:text-white px-6"
                >
                  <span className="flex items-center gap-2">
                    {category.icon}
                    <span className="hidden md:inline">{category.name}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {skillCategories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="skill-card group hover:shadow-lg transition-all duration-300">
                      <div className="p-6 flex flex-col items-center gap-4">
                        <div className="skill-icon text-4xl group-hover:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <span className="text-lg font-medium text-center">{skill.name}</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Interactive Learning Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative h-[400px] skill-card rounded-xl overflow-hidden">
            <div className="absolute inset-0">
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                <defs>
                  <pattern id="circuit" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 0 10 L 10 10 M 10 10 L 10 0" stroke="url(#grid-gradient)" strokeWidth="0.5" fill="none" />
                    <circle cx="10" cy="10" r="1" fill="hsl(var(--primary))" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit)" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
              <motion.h3
                className="text-3xl font-bold mb-4 text-gradient"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Continuous Learning
              </motion.h3>
              <motion.p
                className="text-foreground/70 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Technology is ever-evolving, and so am I. I'm constantly exploring new
                technologies and methodologies to stay at the forefront of innovation.
                My diverse skill set allows me to approach problems from multiple angles
                and create comprehensive solutions.
              </motion.p>

              {/* Floating Badges */}
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                {["Innovation", "Problem Solving", "Best Practices", "Clean Code"].map(
                  (badge, index) => (
                    <motion.div
                      key={badge}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Badge
                        variant="outline"
                        className="px-4 py-2 text-sm bg-gradient-to-r from-primary/10 to-[hsl(var(--chart-2))/10] backdrop-blur-sm border-primary/20"
                      >
                        {badge}
                      </Badge>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}