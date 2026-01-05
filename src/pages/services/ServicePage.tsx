import AppShell from "@/components/layout/AppShell";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Generic service page for services not yet fully implemented
const serviceData: Record<string, { title: string; description: string }> = {
  work: {
    title: "Work in Canada",
    description: "Work permits, LMIA applications, PGWP, and pathways to permanent residence through Canadian work experience.",
  },
  visit: {
    title: "Visit Canada",
    description: "Visitor visas, Super Visa for parents and grandparents, business visitor permits, and temporary resident visas.",
  },
  business: {
    title: "Business Immigration",
    description: "Start-up Visa, Self-Employed Program, provincial investor programs, and business ownership pathways.",
  },
  sponsor: {
    title: "Family Sponsorship",
    description: "Spousal sponsorship, dependent child sponsorship, parent and grandparent sponsorship, and family reunification.",
  },
  refugees: {
    title: "Refugee Protection",
    description: "Government-Assisted Refugees, Private Sponsorship, and asylum claim support in Canada.",
  },
  "canada-citizenship": {
    title: "Canadian Citizenship",
    description: "Citizenship applications, test preparation, ceremony scheduling, and naturalization process guidance.",
  },
  inadmissibility: {
    title: "Inadmissibility Solutions",
    description: "Criminal rehabilitation, Temporary Resident Permits, medical inadmissibility waivers, and ministerial relief.",
  },
  "document-services": {
    title: "Document Services",
    description: "PR card renewal, travel document replacement, PRTD applications, and document authentication.",
  },
};

const ServicePage = () => {
  const { service } = useParams();
  const data = serviceData[service || ""] || {
    title: "Service",
    description: "Learn more about our immigration services.",
  };

  return (
    <AppShell>
      {/* Hero */}
      <section className="bg-background text-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {data.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {data.description}
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
        </div>
      </section>

      {/* Content placeholder */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Expert Guidance for Your Journey
            </h2>
            <p className="text-muted-foreground mb-8">
              Our licensed RCIC consultants have extensive experience with {data.title.toLowerCase()}.
              Book a consultation to discuss your specific situation and requirements.
            </p>
            <Link to="/book-consultation">
              <Button variant="hero" size="lg">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default ServicePage;
