import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Canadian Journey?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Take the first step towards your new life in Canada. Our licensed 
            immigration consultants are here to guide you through every step.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to="/eligibility-assessment">
              <Button
                size="xl"
                className="w-full sm:w-auto bg-background text-primary hover:bg-background/90"
              >
                Check Your Eligibility
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/book-consultation">
              <Button
                variant="heroOutlineDark"
                size="xl"
                className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Book a Consultation
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/90">
            <a
              href="tel:+16475334499"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>+1 647 533 4499</span>
            </a>
            <a
              href="mailto:info@zaxisimmigration.ca"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>info@zaxisimmigration.ca</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
