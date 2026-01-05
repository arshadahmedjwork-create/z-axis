import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Ranked #1 in quality of life globally",
  "World-class healthcare and education",
  "Strong economy with diverse opportunities",
  "Multicultural society welcoming immigrants",
  "Clear pathways to permanent residency",
  "Safe, stable, and democratic nation",
];

const WhyCanadaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Why Choose Canada?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Canada Welcomes Over{" "}
              <span className="text-primary">400,000</span>{" "}
              Immigrants Annually
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Canada consistently ranks as one of the best countries to live in. 
              With its strong economy, excellent social services, and welcoming 
              attitude toward newcomers, it's no wonder so many choose to make Canada home.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link to="/eligibility-assessment">
              <Button variant="hero" size="lg">
                Check Your Eligibility
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover-lift">
              <div className="text-4xl font-bold text-primary mb-2">400K+</div>
              <div className="text-muted-foreground">Annual Immigration Target</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover-lift">
              <div className="text-4xl font-bold text-primary mb-2">#1</div>
              <div className="text-muted-foreground">Quality of Life</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover-lift">
              <div className="text-4xl font-bold text-primary mb-2">80+</div>
              <div className="text-muted-foreground">Immigration Programs</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover-lift">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Countries Welcome</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCanadaSection;
