"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Software Developer",
    company: "CLARExTech",
    period: "2024 - Present",
    description: "Designed & Developed the official site from scratch of CLAREx Ltd. using Next.js, Tailwind CSS, Redux & MongoDB. Also working on the Project : The Marvel - Be You,  which is the biggest Influencer & Brand management system in Bangladesh - Using MERN Stack.",
    technologies: ["MERN Stack", "Next.js", "Node.js", "Vite", "MongoDB", "Express", "PostgreSQL", "Redux"],
  },
  {
    title: "Full Stack Developer",
    company: "SHELL GLAZING SOLUTION",
    period: "2022 - 2024 (Part time)",
    description: "Developed and maintained multiple client projects using React and Express. Collaborated with design teams to implement responsive UI components and integrated third-party APIs.",
    technologies: ["React", "Express", "MySQL", "Redux"],
  },
];

const education = [
  {
    degree: "Master of Computer Science",
    institution: "Tech University",
    period: "2016 - 2018",
    description: "Specialized in Software Engineering with focus on distributed systems and cloud computing. Graduated with honors.",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "State University",
    period: "2012 - 2016",
    description: "Focused on algorithms, data structures, and web development. Participated in multiple hackathons and coding competitions.",
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <div className="absolute left-0 top-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Background</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
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
              <span className="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </span>
              Work Experience
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
                  {/* Timeline dot */}
                  <div className="experience-dot"></div>

                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-primary/10">
                    <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-transparent">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{exp.title}</CardTitle>
                          <CardDescription className="text-lg font-medium text-foreground/70">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-sm border-primary/30 text-primary">
                          {exp.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-foreground/80">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
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
              <span className="bg-chart-2 w-8 h-8 rounded-full flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </span>
              Education
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
                  {/* Timeline dot */}
                  <div className="experience-dot"></div>

                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-chart-2/10">
                    <CardHeader className="pb-2 bg-gradient-to-r from-chart-2/5 to-transparent">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{edu.degree}</CardTitle>
                          <CardDescription className="text-lg font-medium text-foreground/70">
                            {edu.institution}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-sm border-chart-2/30 text-chart-2">
                          {edu.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80">{edu.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}