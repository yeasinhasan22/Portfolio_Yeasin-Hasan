"use client";

import React, { useRef, useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  Box,
  Star,
  TrendingUp,
  Sparkles
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  proficiency: number;
}

interface FeaturedSkill {
  name: string;
  level: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

interface TimelineItem {
  year: string;
  position: "left" | "right";
  title: string;
  icon: React.ReactNode;
  description: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: <Code className="w-5 h-5" />,
    color: "#B5FF6D",
    skills: [
      { name: "React", icon: <RepeatIcon className="w-6 h-6" />, proficiency: 90 },
      { name: "Next.js", icon: <Braces className="w-6 h-6" />, proficiency: 85 },
      { name: "TypeScript", icon: <FileJson className="w-6 h-6" />, proficiency: 80 },
      { name: "JavaScript", icon: <Javascript className="w-6 h-6" />, proficiency: 95 },
      { name: "HTML/CSS", icon: <Css className="w-6 h-6" />, proficiency: 90 },
      { name: "Tailwind CSS", icon: <Layout className="w-6 h-6" />, proficiency: 90 },
      { name: "Redux", icon: <Boxes className="w-6 h-6" />, proficiency: 75 },
      { name: "Vue.js", icon: <Code className="w-6 h-6" />, proficiency: 70 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: <Server className="w-5 h-5" />,
    color: "#9EEEA1",
    skills: [
      { name: "Node.js", icon: <Terminal className="w-6 h-6" />, proficiency: 85 },
      { name: "Express", icon: <Terminal className="w-6 h-6" />, proficiency: 80 },
      { name: "NestJS", icon: <FileCode className="w-6 h-6" />, proficiency: 75 },
      { name: "GraphQL", icon: <Webhook className="w-6 h-6" />, proficiency: 80 },
      { name: "REST API", icon: <Server className="w-6 h-6" />, proficiency: 90 },
      { name: "Python", icon: <Python className="w-6 h-6" />, proficiency: 70 },
      { name: "Java", icon: <Java className="w-6 h-6" />, proficiency: 65 },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: <Database className="w-5 h-5" />,
    color: "#88DED9",
    skills: [
      { name: "MongoDB", icon: <Database className="w-6 h-6" />, proficiency: 85 },
      { name: "PostgreSQL", icon: <Table className="w-6 h-6" />, proficiency: 80 },
      { name: "MySQL", icon: <Storage className="w-6 h-6" />, proficiency: 75 },
      { name: "Redis", icon: <Cylinder className="w-6 h-6" />, proficiency: 70 },
      { name: "Firebase", icon: <CloudCog className="w-6 h-6" />, proficiency: 85 },
      { name: "Supabase", icon: <Database className="w-6 h-6" />, proficiency: 75 },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    icon: <Wrench className="w-5 h-5" />,
    color: "#74CEF5",
    skills: [
      { name: "Git", icon: <Git className="w-6 h-6" />, proficiency: 90 },
      { name: "Docker", icon: <Docker className="w-6 h-6" />, proficiency: 80 },
      { name: "AWS", icon: <Cloud className="w-6 h-6" />, proficiency: 75 },
      { name: "CI/CD", icon: <Cog className="w-6 h-6" />, proficiency: 85 },
      { name: "Jest", icon: <TestTube className="w-6 h-6" />, proficiency: 80 },
      { name: "Terminal", icon: <Terminal className="w-6 h-6" />, proficiency: 90 },
    ],
  },
  {
    id: "creative",
    name: "Creative",
    icon: <Palette className="w-5 h-5" />,
    color: "#61BEFF",
    skills: [
      { name: "Video Editing", icon: <Video className="w-6 h-6" />, proficiency: 75 },
      { name: "Illustration", icon: <Paintbrush className="w-6 h-6" />, proficiency: 70 },
      { name: "UI/UX Design", icon: <Pen className="w-6 h-6" />, proficiency: 85 },
      { name: "Figma", icon: <Figma className="w-6 h-6" />, proficiency: 90 },
      { name: "Photoshop", icon: <Image className="w-6 h-6" />, proficiency: 75 },
      { name: "3D Modeling", icon: <Box className="w-6 h-6" />, proficiency: 60 },
    ],
  },
];

const featuredSkills: FeaturedSkill[] = [
  { name: "React", level: "Expert", icon: <RepeatIcon className="w-6 h-6" /> },
  { name: "TypeScript", level: "Advanced", icon: <FileJson className="w-6 h-6" /> },
  { name: "Next.js", level: "Expert", icon: <Braces className="w-6 h-6" /> },
  { name: "Tailwind CSS", level: "Expert", icon: <Layout className="w-6 h-6" /> }
];

const timelineItems: TimelineItem[] = [
  { year: "2020-Present", position: "right", title: "Full Stack Mastery", icon: <Star className="w-5 h-5" />, description: "Advanced state management, micro-frontends, serverless architecture" },
  { year: "2018-2020", position: "left", title: "Frontend Specialization", icon: <TrendingUp className="w-5 h-5" />, description: "React ecosystem, single-page applications, component architecture" },
  { year: "2016-2018", position: "right", title: "Web Development Foundations", icon: <Code className="w-5 h-5" />, description: "JavaScript, HTML/CSS, responsive design principles" }
];

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const continuousRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize animations when component mounts
    const ctx = gsap.context(() => {
      // Main section entrance animation
      gsap.from(".skills-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Animate tabs container
      gsap.from(".tabs-container", {
        scrollTrigger: {
          trigger: ".tabs-container",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Skill card animations
      ScrollTrigger.batch(".skill-card", {
        interval: 0.1,
        batchMax: 10,
        onEnter: batch => {
          gsap.from(batch, {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      });

      // Featured skills animation
      gsap.from(".featured-skill", {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 85%",
        },
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)"
      });

      // Progress bar animation
      gsap.from(".skill-progress-fill", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
        },
        width: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out"
      });

      // Continuous learning section
      gsap.from(".continuous-element", {
        scrollTrigger: {
          trigger: continuousRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });

      // Floating badges animation
      gsap.to(".floating-badge", {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        stagger: 0.2,
        repeat: -1,
        yoyo: true
      });

      // Hexagon grid animation
      gsap.from(".hexagon", {
        scrollTrigger: {
          trigger: ".skills-hexagon-grid",
          start: "top 80%"
        },
        scale: 0.5,
        opacity: 0,
        stagger: {
          from: "center",
          amount: 0.8
        },
        duration: 0.6,
        ease: "back.out(1.7)"
      });
    });

    return () => ctx.revert(); // Clean up animations when component unmounts
  }, []);

  return (
    <div 
      ref={sectionRef} 
      id="skills" 
      className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900"
    >
      {/* Decorative Particles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,255,109,0.15),transparent_70%)]"></div>
        <svg className="absolute w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B5FF6D" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#61BEFF" stopOpacity="0.3" />
            </linearGradient>
            <pattern id="grid" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M 12 0 L 0 0 0 12" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Hexagon Background Grid */}
      <div className="absolute inset-0 -z-5 skills-hexagon-grid overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="hexagon absolute h-40 w-40 rounded-full bg-gradient-to-tr from-[#B5FF6D] to-[#61BEFF] blur-3xl" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 skills-heading">
          <h6 className="text-[#B5FF6D] uppercase tracking-wider mb-2 font-medium">Expertise</h6>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#B5FF6D] to-[#61BEFF]">Technical Skills</h2>
          <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-[#B5FF6D] to-[#61BEFF] mx-auto"></div>
          <p className="mt-6 text-gray-300/80 max-w-2xl mx-auto text-lg">
            I craft exceptional digital experiences with cutting-edge technologies.
            My expertise spans the full development stack with a focus on modern, 
            performant, and visually stunning web applications.
          </p>
        </div>

        {/* Featured Skills */}
        <div ref={featuredRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {featuredSkills.map((skill) => (
            <div 
              key={skill.name} 
              className="featured-skill rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-800/80 backdrop-blur-sm p-4 md:p-6 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#B5FF6D]/10 to-[#61BEFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex flex-col items-center md:items-start">
                <div className="text-[#B5FF6D] mb-3 md:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-white">
                  {skill.icon}
                </div>
                <h4 className="text-white font-medium mb-1">{skill.name}</h4>
                <span className="text-xs text-[#B5FF6D]/80 font-medium px-2 py-0.5 rounded-full bg-[#B5FF6D]/10">
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Tabs Section */}
        <div ref={skillsRef} className="tabs-container">
          <Tabs defaultValue="frontend" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="h-14 p-1 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-full">
                {skillCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="rounded-full transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B5FF6D] data-[state=active]:to-[#61BEFF] data-[state=active]:text-slate-900 data-[state=active]:font-medium px-4 md:px-6"
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {category.skills.map((skill) => (
                    <Card 
                      key={skill.name} 
                      className="skill-card group border-slate-800/50 bg-slate-900/60 hover:bg-gradient-to-br hover:from-slate-800/80 hover:to-slate-900/80 backdrop-blur-sm transition-all duration-300 hover:border-[#B5FF6D]/30"
                    >
                      <div className="p-6 flex flex-col bg-teal-900 hover:bg-transparent rounded-md text-white items-center">
                        <div 
                          className="skill-icon text-4xl mb-4 text-gray-400 group-hover:text-[#B5FF6D] group-hover:scale-110 transition-all duration-300"
                          style={{ color: category.color }}
                        >
                          {skill.icon}
                        </div>
                        <span className="text-lg font-medium text-center mb-3">{skill.name}</span>
                        
                        {/* Skill Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="skill-progress-fill h-full rounded-full bg-gradient-to-r from-[#B5FF6D] to-[#61BEFF]" 
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Timeline and Learning Path */}
        <div ref={timelineRef} className="mt-24 relative">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#B5FF6D] to-[#61BEFF]">
            My Technical Journey
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-[#B5FF6D] to-[#61BEFF] transform md:translate-x-px"></div>

            {/* Timeline Items */}
            {timelineItems.map((item, index) => (
              <div key={index} className="relative flex flex-col md:flex-row mb-8 md:mb-16">
                <div className={`md:w-1/2 ${item.position === "right" ? "md:ml-auto" : ""} relative`}>
                  <div className={`p-6 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 md:mr-6 md:ml-6 skill-card
                    ${item.position === "right" ? "md:mr-6" : "md:ml-6"}`}>
                    <div className={`absolute top-6 text-[#B5FF6D] bg-slate-900 p-1.5 rounded-full border-2 border-[#B5FF6D] 
                      ${item.position === "right" ? "md:-left-12 left-auto" : "md:-right-12 right-auto"}`}>
                      {item.icon}
                    </div>
                    <span className="inline-block mb-2 text-[#B5FF6D] font-semibold">{item.year}</span>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-300/80">{item.description}</p>
                  </div>
                </div>
                {/* Empty div for layout when item position is left */}
                {item.position === "right" && <div className="hidden md:block md:w-1/2"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Continuous Learning Section */}
        <div ref={continuousRef} className="mt-24 relative z-10">
          <div className="continuous-element bg-gradient-to-br from-slate-900 to-slate-900/95 rounded-2xl overflow-hidden relative shadow-xl">
            {/* Geometric background */}
            <div className="absolute inset-0 -z-10">
              <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
                <defs>
                  <pattern id="circuit" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 0 10 L 10 10 M 10 10 L 10 0" stroke="url(#grid-gradient)" strokeWidth="1" fill="none" />
                    <circle cx="10" cy="10" r="1" fill="#B5FF6D" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit)" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-[#B5FF6D]/5 to-[#61BEFF]/10"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="continuous-element">
                <div className="p-1.5 rounded-full inline-flex items-center justify-center bg-gradient-to-r from-[#B5FF6D] to-[#61BEFF] mb-4">
                  <div className="rounded-full p-2 bg-slate-900">
                    <Sparkles className="w-6 h-6 text-[#B5FF6D]" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#B5FF6D] to-[#61BEFF]">
                  Never Stop Growing
                </h3>
                <p className="text-gray-300/80 text-lg mb-6">
                  I believe in continuous evolution and staying ahead of the technology curve. 
                  My learning process combines deep technical exploration with real-world application.
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  {["Innovation", "Problem Solving", "Best Practices", "Clean Code"].map(
                    (badge, index) => (
                      <Badge
                        key={badge}
                        className="floating-badge px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#B5FF6D]/20 to-[#61BEFF]/20 backdrop-blur-sm border-[#B5FF6D]/30 text-white"
                      >
                        {badge}
                      </Badge>
                    )
                  )}
                </div>
              </div>
              
              <div className="continuous-element">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  {[
                    { title: "Current Focus", items: ["WebGL", "AI Integration", "Performance"] },
                    { title: "Aspirations", items: ["Web3", "AR/VR", "Enterprise Architecture"] }
                  ].map((group, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30">
                      <h4 className="text-[#B5FF6D] font-medium mb-4">{group.title}</h4>
                      <ul className="space-y-2">
                        {group.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#B5FF6D]"></div>
                            <span className="text-gray-200">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;