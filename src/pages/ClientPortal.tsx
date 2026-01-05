import AppShell from "@/components/layout/AppShell";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ClientPortal = () => {
  return (
    <AppShell>
      {/* Hero */}
      <section className="bg-dark text-text-on-dark py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Client Portal
            </h1>
            <p className="text-xl text-muted-foreground">
              Access your immigration case files, documents, and progress updates.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  Existing Clients
                </h2>
                <p className="text-muted-foreground mb-6">
                  If you're an existing Z-Axis Immigration client, access your secure 
                  client portal to view case updates, upload documents, and communicate 
                  with your consultant.
                </p>
                <a
                  href="https://officio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="hero" size="lg">
                    Access Client Portal
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <p className="text-sm text-muted-foreground mt-4">
                  You will be redirected to our secure client management system.
                </p>
              </CardContent>
            </Card>

            {/* New Clients */}
            <div className="mt-12 p-6 bg-primary-soft rounded-xl">
              <h3 className="text-xl font-semibold mb-3">
                New to Z-Axis Immigration?
              </h3>
              <p className="text-muted-foreground mb-4">
                Portal access is provided after you book a consultation and become a client.
              </p>
              <Link to="/book-consultation">
                <Button variant="hero">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default ClientPortal;
