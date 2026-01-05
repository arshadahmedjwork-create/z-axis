import AppShell from "@/components/layout/AppShell";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import migrateIcon from "@/assets/migrate-icon.png";

const pathways = [
  {
    title: "Express Entry",
    description: "Canada's flagship immigration system for skilled workers. Includes Federal Skilled Worker (FSW), Federal Skilled Trades (FST), and Canadian Experience Class (CEC).",
    features: [
      "Points-based ranking system",
      "Processing time: 6 months or less",
      "No job offer required for FSW",
      "Direct path to permanent residence",
    ],
  },
  {
    title: "Provincial Nominee Programs (PNP)",
    description: "Each Canadian province has its own immigration programs targeting specific skills and experience levels.",
    features: [
      "Over 80+ provincial streams",
      "Express Entry aligned options",
      "Lower CRS requirements possible",
      "Regional settlement support",
    ],
  },
  {
    title: "Pilot Programs",
    description: "Specialized programs for specific industries and regions including Atlantic Immigration, Rural & Northern, and Agri-Food Pilot.",
    features: [
      "Pathway to permanent residence",
      "Employer-driven process",
      "Community support",
      "Fast-track processing",
    ],
  },
];

const Migrate = () => {
  return (
    <AppShell>
      {/* Hero */}
      <section className="bg-background text-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Permanent Residency
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Migrate to Canada
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Multiple pathways to permanent residency await skilled professionals,
                entrepreneurs, and families. Let us guide you to the best option for your profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/eligibility-assessment">
                  <Button variant="hero" size="lg">
                    Check Your Eligibility
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/book-consultation">
                  <Button variant="outline" size="lg">
                    Book a Consultation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <img
                src={migrateIcon}
                alt="Migrate to Canada"
                className="w-96 h-96 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Pathway to Permanent Residence
            </h2>
            <p className="text-lg text-muted-foreground">
              Canada offers over 100 immigration programs. Here are the most popular pathways.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pathways.map((pathway) => (
              <Card key={pathway.title} className="border-border hover-lift">
                <CardHeader>
                  <CardTitle className="text-xl">{pathway.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {pathway.description}
                  </p>
                  <ul className="space-y-3">
                    {pathway.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary-soft">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your PR Journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our RCIC-licensed consultants will evaluate your profile and recommend the best pathway.
          </p>
          <Link to="/book-consultation">
            <Button variant="hero" size="lg">
              Book Your Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </AppShell>
  );
};

export default Migrate;
