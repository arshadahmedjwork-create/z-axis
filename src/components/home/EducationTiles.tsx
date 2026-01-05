import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import mythsVsFacts from "@/assets/myths-vs-facts.png";
import canadaUpdates from "@/assets/canada-updates.png";

const educationTiles = [
  {
    image: mythsVsFacts,
    title: "Immigration Myths vs Facts",
    description: "Separate fact from fiction. Learn the truth about Canadian immigration.",
    cta: "Take Our Free Assessment",
    href: "/eligibility-assessment",
  },
  {
    image: canadaUpdates,
    title: "Canada Immigration Updates",
    description: "Stay informed with the latest policy changes and immigration news.",
    cta: "Stay Updated",
    href: "/blog",
    disabled: true,
  },
];

const EducationTiles = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Immigration Resources
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay informed and make educated decisions about your immigration journey.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {educationTiles.map((tile) => (
            <Link
              key={tile.title}
              to={tile.disabled ? "#" : tile.href}
              className={tile.disabled ? "pointer-events-none" : "group"}
            >
              <Card className="h-full hover-lift border-border hover:border-primary/30 transition-all duration-200 overflow-hidden bg-background">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="h-48 bg-background border-b border-border flex items-center justify-center">
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="h-32 w-auto object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      {tile.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {tile.description}
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      {tile.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    {tile.disabled && (
                      <span className="text-xs text-muted-foreground mt-2 block">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationTiles;
