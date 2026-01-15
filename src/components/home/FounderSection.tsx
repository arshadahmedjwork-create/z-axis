import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import founderImage from "@/assets/founder-trudeau.jpg";

const FounderSection = () => {
    return (
        <section className="py-16 md:py-24 bg-white dark:bg-neutral-900 border-t border-border/40">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image Column */}
                    <div className="relative order-2 md:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-blue-500/10 rounded-2xl blur-xl opacity-70"></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/20 group">
                            <img
                                src={founderImage}
                                alt="Founder with Prime Minister Justin Trudeau"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="text-sm font-medium">Advocacy in Action</p>
                                    <p className="text-xs opacity-80">Representing immigrant women of colour</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="space-y-6 order-1 md:order-2">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                                About Our Founder
                            </h2>
                            <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                        </div>

                        <h3 className="text-xl font-semibold text-primary/90">
                            Licensed Engineer | Immigration Director | Advocate for Diversity & Inclusion
                        </h3>

                        <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
                            <p>
                                Proud Immigrant Hijabi Tamil Muslim Woman Engineer of Colour committed to building a more inclusive Canada.
                                As a Licensed Engineer at SNC-Lavalin and Director of Z-Axis Immigration Inc., I champion three core missions:
                                advancing Equality, Diversity & Inclusion in all sectors; promoting Nuclear energy as essential to achieving Net Zero emissions;
                                and advocating for fair immigration policies that truly welcome newcomers home.
                            </p>
                            <p>
                                Recently had the honor of representing immigrant women of colour in a meeting with Prime Minister Justin Trudeau,
                                bringing community voices to national conversations.
                            </p>
                            <p className="italic font-medium text-foreground">
                                Mother of two. Believer in lifting others as we rise. Grateful for family support and divine blessings.
                            </p>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                            <p className="text-sm font-semibold mb-2">Alumni:</p>
                            <p className="text-sm text-balance">
                                Sathyabama Institute of Science and Technology | University of Sheffield | Duke University | Herzing College Toronto
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-primary tracking-wide uppercase mb-2">Passionate About</p>
                            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground font-medium">
                                <span>#WomenInEngineering</span> •
                                <span>#WomenInNuclear</span> •
                                <span>#ImmigrationReform</span> •
                                <span>#EDI</span> •
                                <span>#NetZeroNeedsNuclear</span> •
                                <span>#RepresentationMatters</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <p className="text-sm font-serif italic text-muted-foreground">All praise to the Almighty. Alhamdulillah.</p>
                        </div>

                        <div className="pt-4">
                            <Link to="/contact-us">
                                <Button size="lg" className="rounded-full px-8">
                                    Get in Touch
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderSection;
