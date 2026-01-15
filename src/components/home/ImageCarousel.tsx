import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";
import carousel6 from "@/assets/carousel-6.jpg";
import carousel7 from "@/assets/carousel-7.jpg";
import carousel8 from "@/assets/carousel-8.jpg";
import carousel9 from "@/assets/carousel-9.jpg";
import carousel10 from "@/assets/carousel-10.jpg";

const images = [
    carousel1,
    carousel2,
    carousel3,
    carousel4,
    carousel5,
    carousel6,
    carousel7,
    carousel8,
    carousel9,
    carousel10,
];

const ImageCarousel = () => {
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <section className="py-8 md:py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto relative px-8">
                    <Carousel
                        plugins={[plugin.current]}
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {images.map((image, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <div className="p-1">
                                        <div className="overflow-hidden rounded-xl shadow-md border hover:shadow-xl transition-all duration-300 aspect-square">
                                            <img
                                                src={image}
                                                alt={`Immigration Success ${index + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-6 md:-left-12" />
                        <CarouselNext className="-right-6 md:-right-12" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default ImageCarousel;
