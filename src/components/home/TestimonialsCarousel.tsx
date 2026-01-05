import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import successStories from "@/assets/success-stories.png";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Express Entry Client",
    content: "Z-Axis made my Express Entry process smooth and stress-free. They were with me at every step, from document preparation to landing. Highly recommended!",
    rating: 5,
  },
  {
    name: "Ahmed Hassan",
    role: "Study Permit Client",
    content: "Thanks to Z-Axis, I got my study permit approved on the first attempt. Their guidance on SDS stream was invaluable. Now I'm pursuing my dreams in Canada!",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    role: "Family Sponsorship",
    content: "The team helped reunite me with my parents through the Super Visa program. Professional, compassionate, and efficient service throughout.",
    rating: 5,
  },
];

const TestimonialsCarousel = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-4">
            <img
              src={successStories}
              alt="Success Stories"
              className="h-20 w-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied clients who have achieved their 
            Canadian immigration goals with Z-Axis.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="border-border hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/30 mb-4" />

                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Author */}
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
