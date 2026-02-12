import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementsSection from "@/components/AchievementsSection";
import WorkSection from "@/components/WorkSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import StarField from "@/components/StarField";
import LoadingScreen from "@/components/LoadingScreen";
import crownImage from "@/assets/crown.png";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen space-bg">
      <LoadingScreen isLoading={isLoading} />
      <StarField />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <AchievementsSection />
      <WorkSection />
      <SkillsSection />
      <ContactSection />
      <footer className="relative py-16 text-center border-t border-border overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img src={crownImage} alt="" className="w-full max-w-2xl h-full object-cover" />
        </div>
        <div className="relative z-10">
          <p className="text-sm text-muted-foreground">© 2025 Hiba Saaida — All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
