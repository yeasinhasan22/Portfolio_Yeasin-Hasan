/**
 * Single source of truth for every piece of copy on the site.
 * Edit here, not in the section components.
 */

export const profile = {
  name: "Yeasin Hasan",
  firstName: "Yeasin",
  role: "Software Engineer",
  tagline: "Full-Stack Engineer · Next.js & MERN · Design-to-Deploy",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  email: "yeasin.hasan022@gmail.com",
  available: true,
  availableLabel: "Open to new work",
  portrait: "/images/yeasin-portrait.jpg",
  portraitAlt: "/images/yeasin-hasan.png",
  headline: ["I build software", "that gets out of your way."],
  intro:
    "Full-Stack Software Engineer with 2 years of professional experience taking products from UI/UX design all the way to deployment. I work in Next.js, React, Node and the MERN stack, and I've shipped production platforms, including a voting system that held up under live traffic from 100K+ users.",
  handwritten:
    "I care about the small stuff: the edge cases everyone forgets, the loading state nobody designed, the 200ms that makes a page feel alive.",
  stats: [
    { value: "2+", label: "Years shipping" },
    { value: "100K+", label: "Peak live users" },
    { value: "10+", label: "Projects delivered" },
    { value: "6", label: "Live in production" },
  ],
} as const;

/** `icon` keys map to the brand glyphs in components/social-icon.tsx. */
export const socials = [
  { label: "GitHub", short: "GH", icon: "github", href: "https://github.com/yeasinhasan22/" },
  { label: "LinkedIn", short: "IN", icon: "linkedin", href: "https://www.linkedin.com/in/yeasin-hasan-513064249/" },
  { label: "Instagram", short: "IG", icon: "instagram", href: "https://www.instagram.com/shihabb_h/" },
  { label: "Facebook", short: "FB", icon: "facebook", href: "https://www.facebook.com/yeasinhasan22/" },
] as const;

export type SocialIcon = (typeof socials)[number]["icon"];

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

/** Highlighter-tagged capability chips: the "what I actually do" row. */
export const capabilities = [
  { label: "Full-Stack Development", tone: "lime" },
  { label: "Next.js & React", tone: "sky" },
  { label: "API Architecture", tone: "pink" },
  { label: "UI/UX Design", tone: "amber" },
  { label: "Database Design", tone: "violet" },
  { label: "Deployment & DevOps", tone: "lime" },
] as const;

export const skillGroups = [
  {
    title: "Languages",
    note: "the fundamentals",
    items: ["JavaScript", "TypeScript", "Java", "Python", "C++", "C", "PHP", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks",
    note: "daily drivers",
    items: ["Next.js", "React.js", "Node.js", "Express.js", "Vite", "Tailwind CSS", "MERN Stack"],
  },
  {
    title: "Databases",
    note: "where it all lives",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"],
  },
  {
    title: "Design",
    note: "I draw it first",
    items: ["Figma", "Framer", "After Effects"],
  },
  {
    title: "Tools & DevOps",
    note: "the plumbing",
    items: ["Git", "GitHub", "Docker", "Postman", "XAMPP", "VS Code", "JIRA"],
  },
  {
    title: "Ways of working",
    note: "how it ships",
    items: ["Agile", "Scrum", "MVC Architecture", "RESTful APIs"],
  },
] as const;

export const experience = [
  {
    role: "Software Engineer",
    company: "CLAREx Ltd.",
    href: "https://clarex.co",
    period: "Nov 2024 - Present",
    current: true,
    summary:
      "Design, develop and deploy web applications end to end: Next.js, React, Node, PostgreSQL and Supabase.",
    points: [
      "Built and deployed The Marvel - Be You, a complex influencer-brand platform on React (Vite), Node and PostgreSQL.",
      "Designed and developed the CLAREx Ltd. official website from scratch in Figma, Next.js and After Effects.",
      "Shipped the CLAREx Agro and CLAREx Tech websites with Next.js.",
      "Designed and developed Presswayy.com, an AI-automated social publishing solution.",
      "Developed Rayazen, a pharma e-commerce platform.",
      "Delivered in Agile/Scrum cycles, tracking work in JIRA and reporting to senior engineers.",
    ],
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Supabase", "Figma"],
  },
] as const;

export const education = {
  degree: "B.Sc. in Computer Science & Engineering",
  school: "United International University (UIU)",
  period: "2020 - 2024",
  detail: "Graduated",
} as const;

export const certifications = [
  {
    title: "Next.js and JavaScript",
    issuer: "Center for Development of IT Professionals (CDIP), UIU",
    year: "",
  },
  {
    title: "AI Agent Builder Bootcamp 4.0",
    issuer: "Daffodil International Professional Training Institute (DIPTI)",
    year: "Sep 2025",
  },
] as const;

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  image: string;
  year: string;
  role: string;
  stack: string[];
  live?: string;
  github?: string;
  figma?: string;
  featured?: boolean;
  metric?: string;
  tone: "lime" | "sky" | "pink" | "amber" | "violet";
};

export const projects: Project[] = [
  {
    slug: "marvel-of-tomorrow",
    title: "Marvel of Tomorrow",
    blurb: "A live voting platform that held 100K+ users on award night.",
    description:
      "An influencer voting platform built to spotlight rising talent. Users discovered, supported and voted for their favourites through a transparent, real-time system. It carried live traffic from over 100,000 users during the award show without dropping a beat.",
    image: "/projects/marveloftomorrow.webp",
    year: "2025",
    role: "Full-Stack Engineer",
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Framer Motion", "GSAP"],
    live: "https://marveloftomorrow.xyz/",
    featured: true,
    metric: "100K+ live voters",
    tone: "lime",
  },
  {
    slug: "the-marvel",
    title: "The Marvel - Be You",
    blurb: "Bangladesh's largest influencer & brand management platform.",
    description:
      "A data-driven platform bridging influencers and brands, helping influencers network, earn recognition and make a difference in the communication industry. Currently my main build at CLAREx.",
    image: "/projects/theMarvel.webp",
    year: "2024 - Present",
    role: "Full-Stack Engineer",
    stack: ["React (Vite)", "Node.js", "PostgreSQL", "Redux", "Material UI"],
    featured: true,
    metric: "In active development",
    tone: "pink",
  },
  {
    slug: "sonali-ewallet",
    title: "Sonali e-Wallet",
    blurb: "A national bank's wallet app, redesigned and presented to the Board.",
    description:
      "A complete UI/UX redesign and interactive prototype of Sonali e-Wallet: the mobile banking app of Sonali Bank PLC, the largest state-owned commercial bank in Bangladesh. The original app asked people to hunt through dense menus for everyday tasks, so I rebuilt the structure around what customers actually open the app to do.\n\nThe redesign introduces a bilingual onboarding and login flow with Touch ID, a home screen that leads with balance and recent services instead of burying them, and a services directory grouped into Banking, Payments and Other so that transfers, bill payments, mobile recharge, NFC and QR payments, FDR, DPS, cheque services and account opening are each one tap from the dashboard. Recent beneficiaries sit on the home screen so repeat transfers take seconds, and a persistent bottom bar keeps Home, Services, Statements and Settings always reachable.\n\nI designed every screen and built a clickable prototype in Figma, then presented the work directly to the Board of Directors of Sonali Bank.",
    image: "/projects/sonali-ewallet.png",
    year: "2023",
    role: "Product Designer",
    stack: ["Figma", "Prototyping", "UI/UX", "Design System", "Bilingual UX"],
    featured: true,
    metric: "Presented to the Board",
    tone: "violet",
  },
  {
    slug: "presswayy",
    title: "Presswayy",
    blurb: "AI automation for Facebook & Instagram pages.",
    description:
      "A live production web app automating social publishing with AI. I built frontend features against real business requirements, implemented backend APIs and business logic, and handled deployment, environment configuration and production updates, including platform approval processes.",
    image: "/projects/presswayy.jpeg",
    year: "2025",
    role: "Full-Stack Engineer",
    stack: ["Next.js", "Node.js", "PostgreSQL", "AI Automation"],
    live: "https://presswayy.com/",
    featured: true,
    metric: "Production",
    tone: "sky",
  },
  {
    slug: "clarex",
    title: "CLAREx Ltd.",
    blurb: "The company's official site, designed and built from zero.",
    description:
      "A business solution, BPO and software development platform. I owned the whole thing: UI/UX in Figma, motion in After Effects, and the front-end implementation in Next.js.",
    image: "/projects/clarex.webp",
    year: "2024",
    role: "Designer & Developer",
    stack: ["Figma", "Next.js", "TypeScript", "After Effects", "Tailwind CSS"],
    live: "https://clarex.co",
    featured: true,
    metric: "Design → Deploy",
    tone: "amber",
  },
  {
    slug: "rayazen",
    title: "Rayazen",
    blurb: "Pharma e-commerce, built for browsing and buying online.",
    description:
      "A pharmaceutical e-commerce platform for browsing and purchasing products online, developed at CLAREx Ltd.",
    image: "/projects/rayazen.jpg",
    year: "2025",
    role: "Full-Stack Engineer",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    live: "https://rayazen.com",
    metric: "E-commerce",
    tone: "violet",
  },
  {
    slug: "speaksail",
    title: "SpeakSail",
    blurb: "English speaking practice for elementary students.",
    description:
      "A MERN platform for interactive elementary English learning in Bangladesh, addressing the gap in oral communication. Teachers track student progress and leave personalised feedback through stored audio and written responses.",
    image: "/projects/speakSail.webp",
    year: "2024",
    role: "Full-Stack Developer",
    stack: ["React", "Express.js", "Node.js", "MongoDB", "Figma"],
    github: "https://github.com/yeasinhasan22/SpeakSail",
    live: "https://speaksail-client.onrender.com/",
    metric: "Capstone project",
    tone: "sky",
  },
  {
    slug: "athletihub",
    title: "AthletiHub",
    blurb: "Turf rentals, esports tournaments and a sports community.",
    description:
      "A MERN platform managing commercial football turfs and esports tournaments, with rent splitting, scheduling and community engagement for athletes and gamers alike.",
    image: "/projects/athletiHub.webp",
    year: "2024",
    role: "Full-Stack Developer",
    stack: ["React", "Express.js", "Node.js", "MongoDB"],
    github: "https://github.com/yeasinhasan22/Athletihub",
    figma: "https://www.figma.com/design/8ult5WJRUZXy0ErrEzoGlD/AthletiHub?node-id=0-1",
    metric: "Sports + esports",
    tone: "lime",
  },
  {
    slug: "webpify",
    title: "Webpify",
    blurb: "Any image in, optimised WebP out. Fast.",
    description:
      "A fast image converter that transforms any format to WebP using server-side processing, built for web performance work.",
    image: "/projects/webpify.webp",
    year: "2024",
    role: "Developer",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    live: "https://webpify.root9devs.com/",
    metric: "Utility tool",
    tone: "amber",
  },
  {
    slug: "chefs-notebook",
    title: "Chef's Notebook",
    blurb: "A social recipe platform for people who actually cook.",
    description:
      "A recipe-sharing platform where users post recipes, explore categorised dishes and engage through likes, comments, shares and ratings, plus following other food enthusiasts.",
    image: "/projects/chefsNotebook.webp",
    year: "2024",
    role: "Designer & Developer",
    stack: ["Next.js", "Supabase", "Mapbox", "Tailwind CSS"],
    figma:
      "https://www.figma.com/design/wgOmUhDaTm8ROsPxvg8o8l/Chef-s-Notebook?node-id=1-5",
    metric: "Concept + design",
    tone: "pink",
  },
  {
    slug: "appointtrack",
    title: "AppointTrack",
    blurb: "Healthcare appointments and live queue tracking.",
    description:
      "A healthcare management app design streamlining doctor appointments, emergency services and patient queue tracking, with categorised doctor listings, blood requests, helplines and ambulance booking.",
    image: "/projects/appointTrack.webp",
    year: "2023",
    role: "Product Designer",
    stack: ["Figma", "UI/UX", "Prototyping"],
    figma: "https://www.figma.com/design/CMKlCv98rtLG6WFT8hy5YL/AppointTrack?node-id=0-1",
    metric: "Mobile app design",
    tone: "sky",
  },
];

export const contactIntents = [
  {
    label: "Hire me full-time",
    detail: "Roles, contracts, the serious stuff",
    subject: "Full-time opportunity",
    tone: "lime" as const,
  },
  {
    label: "Build something",
    detail: "Project work and freelance",
    subject: "Project inquiry",
    tone: "sky" as const,
  },
  {
    label: "Design collaboration",
    detail: "UI/UX, prototypes, motion",
    subject: "Design collaboration",
    tone: "pink" as const,
  },
  {
    label: "Just say hi",
    detail: "Coffee chats always welcome",
    subject: "Coffee chat",
    tone: "amber" as const,
  },
];
