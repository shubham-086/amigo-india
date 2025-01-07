"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const images = ["carousel-1.jpg", "carousel-2.jpg"];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative max-h-[85vh] overflow-hidden"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh]"
          >
            <div className="relative h-full">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
              <div className="absolute inset-0 flex items-center bg-[rgba(24,29,56,0.7)] overflow-hidden">
                <div className="container mx-4 md:mx-24 sm:mb-10 lg:mb-20">
                  <div className="flex justify-start">
                    <div className="w-full lg:w-10/12">
                      <h5 className="text-white text-sm sm:text-xl uppercase mb-3 md:font-semibold animate-slideInDown">
                        Best Classroom | Online | Live Courses
                      </h5>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-3 sm:mb-5 text-white font-extrabold animate-slideInDown">
                        Transform Your Career with Amigo India’s Cutting-Edge
                        Software Training
                      </h1>
                      <p className="text-sm sm:text-lg md:font-semibold text-white mb-4 lg:mb-8 pb-2">
                        Industry-focused courses designed to equip you with the
                        skills needed for a successful career in tech.
                      </p>
                      <Link
                        href="/courses.html"
                        className="bg-primary text-white px-4 lg:px-6 py-2 lg:py-4 text-sm sm:text-base sm:font-medium hover:bg-secondary"
                      >
                        Read More
                      </Link>
                      <Link
                        href=""
                        className="bg-white text-gray-900 px-4 lg:px-6 py-2 lg:py-4 text-sm sm:text-base sm:font-medium ml-3 lg:ml-5"
                      >
                        Join Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        size={200}
        className="h-7 w-7 md:h-10 md:w-10 rounded-none bg-transparent hover:bg-primary hover:border-primary right-16 md:left-6 md:top-1/2 bottom-[5%] -translate-y-1/2"
        icon={<ChevronLeft className="text-white" />}
      />
      <CarouselNext
        className="h-7 w-7 rounded-none right-6 md:h-10 md:w-10 bg-transparent hover:bg-primary hover:border-primary bottom-[5%] md:top-1/2 -translate-y-1/2"
        icon={<ChevronRight className="text-white" />}
      />
    </Carousel>
  );
}
