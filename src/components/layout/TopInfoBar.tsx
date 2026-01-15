import { Mail, Phone, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const TopInfoBar = () => {
  return (
    <div className="bg-background border-b border-border py-2 text-sm">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <a
            href="mailto:canada@z-axis.ca"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">canada@z-axis.ca</span>
          </a>

          <a
            href="tel:+19052151888"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span>+1 (905) 215-1888</span>
          </a>

          <a
            href="tel:+18884151888"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span>+1 (888) 415-1888</span>
          </a>

          <div className="hidden lg:flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>Mon–Fri: 9AM–6PM EST</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopInfoBar;
