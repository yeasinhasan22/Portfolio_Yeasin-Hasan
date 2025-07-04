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
