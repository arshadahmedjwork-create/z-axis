import { Shield, Users, FileCheck, Award } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "RCIC Licensed",
    description: "Registered with CICC",
  },
  {
    icon: Users,
    title: "1000+ Clients",
    description: "Successfully served",
  },
  {
    icon: FileCheck,
    title: "Transparent",
    description: "No hidden fees",
  },
  {
    icon: Award,
    title: "Expert Team",
    description: "Years of experience",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className="flex items-center gap-3 justify-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 p-2 border border-border rounded-lg bg-background">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{badge.title}</p>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
