import AppShell from "@/components/layout/AppShell";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, UserCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Shield,
    title: "Licensed RCIC Consultants",
    description: "Our consultants are registered with the College of Immigration and Citizenship Consultants (CICC).",
  },
  {
    icon: UserCheck,
    title: "Personalized Guidance",
    description: "Every consultation is tailored to your unique situation and immigration goals.",
  },
  {
    icon: Clock,
    title: "Expert Assessment",
    description: "Get a clear understanding of your eligibility, timeline, and required documents.",
  },
];

const BookConsultation = () => {
  return (
    <AppShell>
      {/* Hero */}
      <section className="bg-dark text-text-on-dark py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Professional Guidance
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book a Consultation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Meet with a Regulated Canadian Immigration Consultant (RCIC) who will 
              assess your profile and guide you through your best immigration options.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Book with Z-Axis?
            </h2>
            <p className="text-lg text-muted-foreground">
              Our consultations provide clarity and direction for your immigration journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto mb-12">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-border hover-lift text-center">
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 p-4 bg-primary-soft rounded-full w-fit">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* What to Expect */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">
              What to Expect
            </h3>
            <ul className="space-y-4">
              {[
                "Review of your background, education, and work experience",
                "Assessment of eligible immigration programs",
                "Discussion of timeline and processing expectations",
                "Document requirements and checklist",
                "Q&A session to address your concerns",
                "Written summary and next steps (for case-specific consultations)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-soft">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Begin?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            First, check your eligibility to find the best consultation type for your needs. 
            Then proceed to book your appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/eligibility-assessment">
              <Button variant="hero" size="lg">
                Check Your Eligibility First
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/plans-pricing">
              <Button variant="outline" size="lg">
                View Consultation Options
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default BookConsultation;
