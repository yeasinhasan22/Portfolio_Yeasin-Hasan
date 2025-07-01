"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Instagram, Facebook, Globe, Coffee, Code, Palette, Zap, Sparkles, Layers, Database, Smartphone, Brush } from "lucide-react";

export default function ContactSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "yeasin.hasan022@gmail.com",
      href: "mailto:yeasin.hasan022@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "Prefer mail",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Dhaka, Bangladesh",
      href: "https://maps.google.com/?q=Dhaka,+Bangladesh",
    },
  ];

  const socialLinks = [
    { 
      icon: <Github className="h-5 w-5" />, 
      url: "https://github.com/yeasinhasan22/", 
      label: "GitHub",
      color: "#333" 
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      url: "https://www.linkedin.com/in/yeasin-hasan-513064249/", 
      label: "LinkedIn",
      color: "#0077B5"
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      url: "https://twitter.com", 
      label: "Twitter",
      color: "#1DA1F2"
    },
    { 
      icon: <Instagram className="h-5 w-5" />, 
      url: "https://instagram.com", 
      label: "Instagram",
      color: "#E4405F"
    },
    { 
      icon: <Facebook className="h-5 w-5" />, 
      url: "https://facebook.com", 
      label: "Facebook",
      color: "#1877F2"
    },
    { 
      icon: <Globe className="h-5 w-5" />, 
      url: "https://root9devs.com", 
      label: "Root9Devs",
      color: "#10B981"
    },
  ];

  const quickActions = [
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Let's Chat",
      description: "Schedule a coffee chat",
      action: () => window.open("mailto:yeasin.hasan022@gmail.com?subject=Coffee Chat Request", "_blank"),
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Project Inquiry",
      description: "Discuss your next project",
      action: () => window.open("mailto:yeasin.hasan022@gmail.com?subject=Project Inquiry", "_blank"),
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Design Collab",
      description: "Creative collaboration",
      action: () => window.open("mailto:yeasin.hasan022@gmail.com?subject=Design Collaboration", "_blank"),
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Quick Question",
      description: "Ask me anything",
      action: () => window.open("mailto:yeasin.hasan022@gmail.com?subject=Quick Question", "_blank"),
      gradient: "from-green-500 to-teal-500"
    }
  ];

  const skills = [
    { 
      name: "React", 
      icon: <Code className="h-5 w-5" />,
      description: "Building dynamic UIs",
      gradient: "from-blue-400 to-blue-600",
      particles: 8,
      expertise: "expert"
    },
    { 
      name: "Next.js", 
      icon: <Layers className="h-5 w-5" />,
      description: "Full-stack frameworks",
      gradient: "from-gray-400 to-gray-600",
      particles: 7,
      expertise: "expert"
    },
    { 
      name: "TypeScript", 
      icon: <Database className="h-5 w-5" />,
      description: "Type-safe development",
      gradient: "from-indigo-400 to-indigo-600",
      particles: 6,
      expertise: "advanced"
    },
    { 
      name: "Node.js", 
      icon: <Smartphone className="h-5 w-5" />,
      description: "Backend development",
      gradient: "from-green-400 to-green-600",
      particles: 6,
      expertise: "advanced"
    },
    { 
      name: "UI/UX Design", 
      icon: <Brush className="h-5 w-5" />,
      description: "User-centered design",
      gradient: "from-purple-400 to-pink-500",
      particles: 8,
      expertise: "expert"
    }
  ];

  type ExpertiseLevel = "expert" | "advanced" | string;

  const getExpertiseColor = (expertise: ExpertiseLevel): string => {
    switch (expertise) {
      case "expert": return "text-emerald-400 bg-emerald-500/10";
      case "advanced": return "text-blue-400 bg-blue-500/10";
      default: return "text-amber-400 bg-amber-500/10";
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-gray-900 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900"></div>
        <div className="absolute left-0 bottom-0 w-full h-1/2 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="waves" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 C5,5 10,15 20,10 L20,20 L0,20 Z" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration?
            Feel free to reach out and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Let's Connect
            </h3>
            
            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={action.action}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 backdrop-blur-sm">
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-full bg-gradient-to-br ${action.gradient} text-white mb-4`}>
                        {action.icon}
                      </div>
                      <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mt-8 backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-4">Direct Contact</h4>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg hover:bg-blue-500/10 transition-colors group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="bg-blue-500/20 p-2 rounded-full text-blue-400 mr-3 group-hover:bg-blue-500/30 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h5 className="font-medium text-white text-sm">{info.label}</h5>
                      <p className="text-gray-400 text-sm">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Social Links & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Social Media Grid */}
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Follow My Journey
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-blue-500/50 transition-all duration-300 text-center backdrop-blur-sm"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                        {link.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors">
                        {link.label}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Creative Skills Showcase */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Skills & Expertise
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="relative group cursor-pointer"
                    onHoverStart={() => setHoveredSkill(index)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative overflow-hidden p-4 bg-gray-900/50 rounded-lg border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-300">
                      {/* Animated particles */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(skill.particles)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-gradient-to-r ${skill.gradient} rounded-full opacity-0 group-hover:opacity-60`}
                            animate={hoveredSkill === index ? {
                              x: [0, Math.random() * 200 - 100],
                              y: [0, Math.random() * 100 - 50],
                              scale: [0, 1, 0],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.1,
                              ease: "easeInOut"
                            }}
                            style={{
                              left: `${10 + (i * 12)}%`,
                              top: `${20 + (i % 3) * 20}%`,
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                            {skill.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                              {skill.name}
                            </h4>
                            <p className="text-xs text-gray-400 group-hover:text-gray-300">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {/* Expertise badge */}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getExpertiseColor(skill.expertise)} transition-all duration-300`}>
                            {skill.expertise}
                          </span>
                          
                          {/* Visual proficiency indicator */}
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className={`w-1.5 h-6 rounded-full ${i < skill.particles - 3 ? `bg-gradient-to-t ${skill.gradient}` : 'bg-gray-700'}`}
                                initial={{ scaleY: 0 }}
                                animate={hoveredSkill === index ? { scaleY: 1 } : { scaleY: 0.5 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                                style={{ transformOrigin: 'bottom' }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">Current Status</h3>
                  <p className="text-gray-400 text-sm">
                    Available for new projects and collaborations
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-400">Available</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-500 text-sm">
                  Response time: Usually within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-700/30 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Yeasin Hasan. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}