import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/logo-transparent.png";
import rcicLogo from "@/assets/rcic-logo-footer.png";
import capicLogo from "@/assets/capic-acpi-logo.png";
import { FloatingPaths } from "@/components/ui/background-paths";

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "What We Do", href: "/what-we-do" },
  { title: "Plans & Pricing", href: "/plans-pricing" },
  { title: "Eligibility Assessment", href: "/eligibility-assessment" },
  { title: "Contact Us", href: "/contact-us" },
];

const services = [
  { title: "Migrate to Canada", href: "/what-we-do/migrate" },
  { title: "Study in Canada", href: "/what-we-do/study" },
  { title: "Work in Canada", href: "/what-we-do/work" },
  { title: "Visit Canada", href: "/what-we-do/visit" },
  { title: "Business Immigration", href: "/what-we-do/business" },
  { title: "Family Sponsorship", href: "/what-we-do/sponsor" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border text-foreground overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Main Footer */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Z-Axis Immigration"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Z-Axis Immigration is a licensed immigration consulting firm led by Regulated Canadian Immigration Consultants (RCIC). We provide expert guidance for all your Canadian immigration needs.
            </p>

            {/* Accreditations */}
            <div className="flex gap-4 items-center">
              <img src={rcicLogo} alt="RCIC License" className="h-12 w-auto object-contain" />
              <img src={capicLogo} alt="CAPIC ACPI" className="h-12 w-auto object-contain" />
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Head Office:</span><br />
                  2020 Winston Park, Oakville,<br />
                  Ontario, Canada L6H 6X7
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Branch - India:</span><br />
                  Puram Prakasam Rd, Balaji Nagar,<br />
                  Chennai-14
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Branch - USA:</span><br />
                  4126 W Rochelle Rd, Irving,<br />
                  Texas 75062<br />
                  Ph: +1 469 351 9554
                </span>
              </li>

              <li>
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+19052151888"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    +1 (905) 215-1888
                  </a>
                  <a
                    href="tel:+18884151888"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    +1 (888) 415-1888
                  </a>
                </div>
              </li>

              <li>
                <a
                  href="mailto:canada@z-axis.ca"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  canada@z-axis.ca
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-border/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Z-Axis Immigration. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
