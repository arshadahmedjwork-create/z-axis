import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Plane, Building2, Users, HeartHandshake, Leaf, Scale, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Import service icons
import migrateIcon from "@/assets/migrate-icon.png";
import studyIcon from "@/assets/study-icon.png";

const services = [
  {
    slug: "migrate",
    title: "Migrate",
    description: "Express Entry, Provincial Nominee Programs, and permanent residency pathways.",
    image: migrateIcon,
  },
  {
    slug: "study",
    title: "Study",
    description: "Study permits, SDS stream, and pathway to permanent residency.",
    image: studyIcon,
  },
  {
    slug: "work",
    title: "Work",
    description: "Work permits, LMIA, and post-graduation work permits.",
    Icon: Briefcase,
  },
  {
    slug: "visit",
    title: "Visit",
    description: "Visitor visas, Super Visa, and business visitor permits.",
    Icon: Plane,
  },
  {
    slug: "business",
    title: "Business",
    description: "Start-up Visa, Self-Employed, and investor immigration.",
    Icon: Building2,
  },
  {
    slug: "sponsor",
    title: "Sponsor",
    description: "Spousal, dependent child, and parent/grandparent sponsorship.",
    Icon: Users,
  },
  {
    slug: "refugees",
    title: "Refugees",
    description: "Refugee resettlement and asylum applications.",
    Icon: HeartHandshake,
  },
  {
    slug: "canada-citizenship",
    title: "Citizenship",
    description: "Canadian citizenship applications and guidance.",
    Icon: Leaf,
  },
  {
    slug: "inadmissibility",
    title: "Inadmissibility",
    description: "Overcome criminal, medical, or other inadmissibility issues.",
    Icon: Scale,
  },
  {
    slug: "document-services",
    title: "Documents",
    description: "Document replacement, renewal, and authentication services.",
    Icon: FileText,
  },
];

const ServiceGrid = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive immigration services tailored to your unique needs. 
            Our licensed consultants guide you through every pathway to Canada.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/what-we-do/${service.slug}`}
              className="group"
            >
              <Card className="h-full hover-lift border-border hover:border-primary/30 transition-all duration-200">
                <CardContent className="p-6">
                  {/* Icon/Image - Unified large size */}
                  <div className="relative z-10 mb-4 h-32 w-32 flex items-center justify-center rounded-xl bg-background border border-border shadow-md">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-28 w-28 object-contain"
                      />
                    ) : service.Icon ? (
                      <service.Icon className="h-20 w-20 text-primary" strokeWidth={1.5} />
                    ) : null}
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link to="/what-we-do">
            <Button variant="outline" size="lg">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
