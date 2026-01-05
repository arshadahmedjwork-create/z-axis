import AppShell from "@/components/layout/AppShell";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Plane, Building2, Users, HeartHandshake, Leaf, Scale, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import prPaths from "@/assets/pr-paths.png";
import studyIcon from "@/assets/study-icon.png";

const services = [
  {
    slug: "migrate",
    title: "Migrate to Canada",
    description: "Express Entry, Provincial Nominee Programs, Federal Skilled Worker, and more pathways to permanent residency.",
    image: prPaths,
  },
  {
    slug: "study",
    title: "Study in Canada",
    description: "Study permits, SDS stream, and pathway to permanent residency through education.",
    image: studyIcon,
  },
  {
    slug: "work",
    title: "Work in Canada",
    description: "Work permits, LMIA-based applications, and post-graduation work permits.",
    Icon: Briefcase,
  },
  {
    slug: "visit",
    title: "Visit Canada",
    description: "Visitor visas, Super Visa for parents/grandparents, and business visitor permits.",
    Icon: Plane,
  },
  {
    slug: "business",
    title: "Business Immigration",
    description: "Start-up Visa, Self-Employed, investor programs, and provincial business streams.",
    Icon: Building2,
  },
  {
    slug: "sponsor",
    title: "Family Sponsorship",
    description: "Spousal sponsorship, dependent child, parent/grandparent, and other family class.",
    Icon: Users,
  },
  {
    slug: "refugees",
    title: "Refugee Protection",
    description: "Refugee resettlement programs and asylum applications in Canada.",
    Icon: HeartHandshake,
  },
  {
    slug: "canada-citizenship",
    title: "Canadian Citizenship",
    description: "Citizenship applications, test preparation, and naturalization process.",
    Icon: Leaf,
  },
  {
    slug: "inadmissibility",
    title: "Inadmissibility Solutions",
    description: "Overcome criminal, medical, or other inadmissibility barriers to Canada.",
    Icon: Scale,
  },
  {
    slug: "document-services",
    title: "Document Services",
    description: "Document replacement, renewal, authentication, and other services.",
    Icon: FileText,
  },
];

const WhatWeDo = () => {
  return (
    <AppShell>
      {/* Hero */}
      <section className="bg-background text-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What We Do
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive immigration services tailored to your unique needs.
              Our licensed RCIC consultants guide you through every pathway to Canada.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/what-we-do/${service.slug}`}
                className="group"
              >
                <Card className="h-full hover-lift border-border hover:border-primary/30 transition-all duration-200">
                  <CardContent className="p-6">
                    {/* Icon/Image */}
                    <div className="mb-4 h-24 w-24 flex items-center justify-center rounded-lg bg-background border border-border shadow-sm">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-20 w-20 object-contain"
                        />
                      ) : service.Icon ? (
                        <service.Icon className="h-12 w-12 text-primary" />
                      ) : null}
                    </div>

                    {/* Content */}
                    <h2 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-primary font-medium">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Not Sure Which Program Is Right for You?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Take our free eligibility assessment to discover your best immigration options.
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

export default WhatWeDo;
