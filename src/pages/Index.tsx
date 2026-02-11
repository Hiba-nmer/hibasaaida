import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import WorkSection from "@/components/WorkSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import StarField from "@/components/StarField";
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
      <StarField />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <WorkSection />
      <SkillsSection />
      <ContactSection />
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        <p>© 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Index;
