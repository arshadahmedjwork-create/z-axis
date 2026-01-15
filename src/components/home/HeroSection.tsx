import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="Toronto skyline" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 lg:py-40">
        <div className="max-w-3xl animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-transparent text-primary-foreground px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Licensed RCIC Immigration Consultants</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Your Gateway to a <span className="text-primary">New Life</span> in Canada
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl animate-fade-in-delayed">
            Z-Axis Immigration provides expert, transparent, and personalized immigration services. From study permits
            to permanent residency, we guide you every step of the way.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delayed stagger-2">
            <Link to="/eligibility-assessment">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Check Your Eligibility
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/book-consultation">
              <Button variant="outline" size="xl" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-dark">
                Book a Consultation
              </Button>
            </Link>
          </div>

          {/* Trust Points */}
          <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>RCIC Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>1000+ Successful Cases</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Transparent Pricing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
