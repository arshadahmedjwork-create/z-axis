import AppShell from "@/components/layout/AppShell";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import studyIcon from "@/assets/study-icon.png";

const studyOptions = [
  {
    title: "Student Direct Stream (SDS)",
    description: "Fast-track study permit processing for students from eligible countries with expedited timelines.",
    features: [
      "Processing in 20 calendar days",
      "Available for 14 countries",
      "GIC deposit required",
      "Language test needed",
    ],
  },
  {
    title: "Regular Study Permit",
    description: "Standard study permit application for international students from any country.",
    features: [
      "No GIC required",
      "Flexible document requirements",
      "Spouse/partner work permit option",
      "Pathway to PGWP",
    ],
  },
  {
    title: "Post-Graduation Work Permit",
    description: "Work in Canada after completing your studies at a designated learning institution.",
    features: [
      "Up to 3 years work permit",
      "Open work permit - any employer",
      "Pathway to PR through CEC",
      "Gain Canadian experience",
    ],
  },
];

const Study = () => {
  return (
    <AppShell>
      {/* Hero */}
      <section className="bg-background text-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Study Permits
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Study in Canada
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                World-class education with a pathway to permanent residency.
                Canada ranks among the top destinations for international students.
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
                src={studyIcon}
                alt="Study in Canada"
                className="w-96 h-96 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Study Options */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Study Permit Options
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the right pathway for your educational journey in Canada.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {studyOptions.map((option) => (
              <Card key={option.title} className="border-border hover-lift">
                <CardHeader>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {option.description}
                  </p>
                  <ul className="space-y-3">
                    {option.features.map((feature) => (
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
            Ready to Begin Your Academic Journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let our experts guide you through the study permit process.
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

export default Study;
