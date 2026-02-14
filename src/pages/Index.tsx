import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementsSection from "@/components/AchievementsSection";
import WorkSection from "@/components/WorkSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen space-bg">
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <AchievementsSection />
      <WorkSection />
      <SkillsSection />
      <ContactSection />
      <footer className="relative py-8 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">© 2025 Hiba Saaida — All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Index;
