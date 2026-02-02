"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSolutionSection } from "@/components/ProblemSolutionSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ModulesSection } from "@/components/ModulesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { AINewsSection } from "@/components/AINewsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          <HeroSection />
          <ProblemSolutionSection />
          <FeaturesSection />
          <ModulesSection />
          <PricingSection />
          <ProgramsSection />
          <TestimonialsSection />
          <AINewsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
