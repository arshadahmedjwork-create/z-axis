import AppShell from "@/components/layout/AppShell";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const consultationPlans = [
  {
    slug: "exploratory-consultation",
    title: "Exploratory Consultation",
    price: "$150",
    duration: "30 minutes",
    description: "Perfect for those just starting to explore their options.",
    features: [
      "Initial profile assessment",
      "Overview of eligible programs",
      "Timeline expectations",
      "Next steps guidance",
    ],
  },
  {
    slug: "case-specific-consultation",
    title: "Case-Specific Consultation",
    price: "$250",
    duration: "60 minutes",
    description: "Deep dive into your specific immigration case.",
    features: [
      "Detailed eligibility analysis",
      "Document checklist",
      "Strategy recommendations",
      "Written summary provided",
    ],
    featured: true,
  },
];

const otherServices = [
  {
    slug: "full-representation",
    title: "Full Representation",
    price: "From $2,500",
    description: "End-to-end immigration application handling by our RCIC team.",
  },
  {
    slug: "application-review",
    title: "Application Review",
    price: "$350",
    description: "Expert review of your self-prepared application before submission.",
  },
  {
    slug: "documentation-review",
    title: "Documentation Review",
    price: "$200",
    description: "Verification that your supporting documents meet IRCC requirements.",
  },
];

const PlansPricing = () => {
  return (
    <AppShell>
      {/* Hero */}
      <section className="bg-background text-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Plans & Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Transparent pricing with no hidden fees. Choose the service level that fits your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Plans */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Consultation Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Start with a consultation to understand your options.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {consultationPlans.map((plan) => (
              <Card
                key={plan.slug}
                className={`border-border hover-lift ${plan.featured ? "ring-2 ring-primary" : ""
                  }`}
              >
                {plan.featured && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">
                      / {plan.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/booking?service=consultation-${plan.slug.replace('consultation-', '')}`}>
                    <Button
                      variant={plan.featured ? "hero" : "outline"}
                      className="w-full"
                    >
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional Services
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {otherServices.map((service) => (
              <Card key={service.slug} className="border-border hover-lift">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {service.title}
                  </h3>
                  <div className="text-2xl font-bold text-primary mb-3">
                    {service.price}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <Link to={`/booking?service=${service.slug}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </Link>
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
            Not Sure Which Service Is Right for You?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Take our free eligibility assessment to get a personalized recommendation.
          </p>
          <Link to="/eligibility-assessment">
            <Button variant="hero" size="lg">
              Check Your Eligibility
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </AppShell>
  );
};

export default PlansPricing;
