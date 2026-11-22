import SiteNav from "@/components/site-nav";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import WorkSection from "@/components/work-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <div className="paper-surface min-h-screen">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.14em] focus:text-paper"
      >
        Skip to work
      </a>
      <SiteNav />
      <main className="relative z-[2]">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <WorkSection />
        <ContactSection />
      </main>
    </div>
  );
}
