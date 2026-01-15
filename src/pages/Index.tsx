import AppShell from "@/components/layout/AppShell";
import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import ServiceGrid from "@/components/home/ServiceGrid";
import WhyCanadaSection from "@/components/home/WhyCanadaSection";
import EducationTiles from "@/components/home/EducationTiles";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import ImageCarousel from "@/components/home/ImageCarousel";
import FounderSection from "@/components/home/FounderSection";

const Index = () => {
  return (
    <AppShell>
      <HeroSection />
      <TrustBadges />
      <ServiceGrid />
      <WhyCanadaSection />
      <FounderSection />
      <ImageCarousel />
      <EducationTiles />
      <TestimonialsCarousel />
    </AppShell>
  );
};

export default Index;
