import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpg";

const services = [
  { title: "Migrate", href: "/what-we-do/migrate", description: "Express Entry, PNP & more" },
  { title: "Study", href: "/what-we-do/study", description: "Study permits & SDS" },
  { title: "Work", href: "/what-we-do/work", description: "Work permits & LMIA" },
  { title: "Visit", href: "/what-we-do/visit", description: "Visitor visas & Super Visa" },
  { title: "Business", href: "/what-we-do/business", description: "Business immigration" },
  { title: "Sponsor", href: "/what-we-do/sponsor", description: "Family sponsorship" },
  { title: "Refugees", href: "/what-we-do/refugees", description: "Refugee assistance" },
  { title: "Citizenship", href: "/what-we-do/canada-citizenship", description: "Canadian citizenship" },
  { title: "Inadmissibility", href: "/what-we-do/inadmissibility", description: "Overcome barriers" },
  { title: "Documents", href: "/what-we-do/document-services", description: "Document services" },
];

const HeaderNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Z-Axis Immigration"
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/">
              <Button
                variant="nav"
                className={cn(isActive("/") && "text-primary")}
              >
                Home
              </Button>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-primary data-[state=open]:text-primary">
                    What We Do
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-2 p-4 md:grid-cols-2">
                      {services.map((service) => (
                        <li key={service.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={service.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{service.title}</div>
                              <p className="line-clamp-1 text-sm leading-snug text-muted-foreground">
                                {service.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/plans-pricing">
              <Button
                variant="nav"
                className={cn(isActive("/plans-pricing") && "text-primary")}
              >
                Plans & Pricing
              </Button>
            </Link>

            <Link to="/eligibility-assessment">
              <Button
                variant="nav"
                className={cn(isActive("/eligibility-assessment") && "text-primary")}
              >
                Eligibility
              </Button>
            </Link>

            <Link to="/contact-us">
              <Button
                variant="nav"
                className={cn(isActive("/contact-us") && "text-primary")}
              >
                Contact
              </Button>
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/eligibility-assessment">
              <Button variant="heroOutline" size="sm">
                Apply Now
              </Button>
            </Link>
            <Link to="/book-consultation">
              <Button variant="hero" size="sm">
                Book a Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-up">
            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                className="px-4 py-3 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <div className="px-4 py-3">
                <div className="flex items-center justify-between font-medium mb-2">
                  <span>What We Do</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="grid grid-cols-2 gap-1 pl-2">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      to={service.href}
                      className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/plans-pricing"
                className="px-4 py-3 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Plans & Pricing
              </Link>

              <Link
                to="/eligibility-assessment"
                className="px-4 py-3 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Eligibility Assessment
              </Link>

              <Link
                to="/contact-us"
                className="px-4 py-3 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              <div className="flex flex-col gap-2 mt-4 px-4">
                <Link to="/eligibility-assessment" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="heroOutline" className="w-full">
                    Apply Now
                  </Button>
                </Link>
                <Link to="/book-consultation" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="hero" className="w-full">
                    Book a Consultation
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderNav;
