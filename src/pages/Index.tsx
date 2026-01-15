import AppShell from "@/components/layout/AppShell";
import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import ServiceGrid from "@/components/home/ServiceGrid";
import WhyCanadaSection from "@/components/home/WhyCanadaSection";
import EducationTiles from "@/components/home/EducationTiles";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import FinalCTASection from "@/components/home/FinalCTASection";
import ImageCarousel from "@/components/home/ImageCarousel";

const Index = () => {
  return (
    <AppShell>
      <HeroSection />
      <TrustBadges />
      <ServiceGrid />
      <WhyCanadaSection />
      <ImageCarousel />
      <EducationTiles />
      <TestimonialsCarousel />
      <FinalCTASection />
    </AppShell>
  );
};

export default Index;
