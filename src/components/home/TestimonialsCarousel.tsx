import { Star, Building2, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import successStories from "@/assets/success-stories.png";

const testimonials = [
  {
    name: "Srinath Tr",
    time: "3 years ago",
    content: "i sincerely thank everyone in Z-Axis team for helping my spousal family sponsor ship application. And the team really did a good job in application procedure giving importance to every page they fill, caring about their clients. They initially started my application by Jan 9 2022, and after many final checks and clarification we submitted the application on March 04 2022, and i was hoping for good news ever then... I personally thank Azeeza and his team for making this happen.",
    rating: 5,
    initial: "S",
    bg: "bg-green-600",
  },
  {
    name: "Arul Joel",
    time: "3 years ago",
    content: "Z-Axis provides one of the best professional immigration services that I have come across in last 4 decades of my life. Before I tell how good they are, let me tell why I needed their services so badly. I am recently widowed mother with two children. Our family moved to Canada in hopes of settling here... Z-axis has been very prompt and professional in their service and I hope they would continue their exemplary service to all.",
    rating: 5,
    initial: "A",
    image: null, // Placeholder if no image
  },
  {
    name: "Sivaranjane Panchatcharam",
    time: "3 years ago",
    content: "Excellent service!!! Team has profound knowledge on the immigration routes and was able to assist with clear steps and instructions. Azeeza from the group was attentive to queries and had given precise solution based on her experience. Very approachable and reliable consultation. Appreciate their service!",
    rating: 5,
    initial: "S",
    bg: "bg-teal-600",
  },
  {
    name: "Badri Narayanan",
    time: "3 years ago",
    content: "Z-axis helped me to get SWOP. There were very keen in documentation and vetted the SOP towards successful visa. The team were very supportive and prompt in responding to our queries at any time. I will recommend Z-Axis for any sort of immigration services. Thanks for your wonderful support.",
    rating: 5,
    initial: "B",
    bg: "bg-brown-600",
  },
  {
    name: "MOHAMMED HAREEZ",
    time: "3 years ago",
    content: "Z-Axis Immigration helped me get admission for UG Diploma and also got my study permit approved. They were not pushy / money minded",
    rating: 5,
    initial: "M",
    image: null,
  },
];

const TestimonialsCarousel = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center mb-8">
            <img
              src={successStories}
              alt="Success Stories"
              className="h-32 md:h-40 w-auto object-contain drop-shadow-lg"
            />
          </div>

          <h3 className="text-primary font-bold tracking-widest text-sm uppercase">
            TESTIMONIALS
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            HAPPY CLIENTS
          </h2>

          {/* Google Badge */}
          <div className="flex flex-col items-center mt-8">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full border border-gray-100 relative">
              {/* Google G Icon Absolute */}
              <div className="absolute top-4 right-4">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26-.19-.58z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-2 rounded-md">
                  <Building2 className="h-8 w-8 text-gray-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg text-gray-900 leading-tight">Z-Axis Immigration Inc.</h4>
                  <div className="flex items-center gap-1 my-1">
                    <span className="font-bold text-orange-400">5.0</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Based on 15 reviews</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-400">powered by</span>
                    <span className="font-semibold text-gray-600 text-sm">Google</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJ600FXqFpK4gR24j0ut46sd8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                    review us on
                    <svg viewBox="0 0 24 24" className="h-4 w-4 ml-1" aria-hidden="true">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="currentColor"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26-.19-.58z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="max-w-7xl mx-auto px-8 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="bg-white border rounded-lg p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${testimonial.bg || "bg-gray-500"}`}>
                          {testimonial.initial}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{testimonial.name}</p>
                          <p className="text-xs text-gray-500">{testimonial.time}</p>
                        </div>
                      </div>
                      {/* Google G Logo */}
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26-.19-.58z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                    </div>

                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                      ))}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-[8] flex-grow">
                      {testimonial.content}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="h-12 w-12 bg-primary text-white hover:bg-primary/90 hover:text-white border-none -left-6 md:-left-12" />
            <CarouselNext className="h-12 w-12 bg-primary text-white hover:bg-primary/90 hover:text-white border-none -right-6 md:-right-12" />
          </Carousel>

          <div className="flex justify-center mt-8 space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary/20"></div>
            <div className="h-2 w-2 rounded-full bg-primary/20"></div>
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <div className="h-2 w-2 rounded-full bg-primary/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
