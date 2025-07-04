import Head from "next/head";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import SimpleNavbar from "@/components/SimpleNavbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yeasin Hasan | Full-Stack Developer Portfolio</title>
        <meta name="description" content="I'm a full-stack developer building modern, fast, and responsive web applications with MERN & Next.js." />

        <meta property="og:title" content="Yeasin Hasan | Software Engineer Portfolio" />
        <meta property="og:description" content="Explore my personal portfolio — a showcase of modern web development projects, skills, and experiences." />
        <meta property="og:image" content="/images/preview.webp" />
        <meta property="og:url" content="https://yeasinhasan.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yeasin Hasan | Software Engineer Portfolio" />
        <meta name="twitter:description" content="Explore my personal portfolio — a showcase of modern web development projects, skills, and experiences." />
        <meta name="twitter:image" content="/images/preview.webp" />
      </Head>

      <main className="min-h-screen relative">
        <Navbar />
        <SimpleNavbar />
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
