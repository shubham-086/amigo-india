import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AnimatedSection from "../AnimatedSection";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Sneha Pandey",
      role: "Software Engineer",
      content:
        "The DSA course was challenging but incredibly rewarding. It gave me the foundation I needed to crack coding interviews at top companies.",
    },
    {
      name: "Rohit Singh",
      role: "Software Developer",
      content:
        "The Full Stack Development course really boosted my career. The instructors were excellent and covered everything from frontend to backend in detail.",
      highlighted: true,
    },
    {
      name: "Ananya Verma",
      role: "Data Analyst",
      content:
        "I loved the Data Analytics course! It gave me hands-on experience with tools like Excel and Python, which helped me get my first job as a data analyst.",
    },
    {
      name: "Priya Mehta",
      role: "Content Specialist",
      content:
        "The Professional Communication course really helped improve my confidence in public speaking and writing skills. It's been incredibly useful in my career.",
    },
    {
      name: "Amit Singh",
      role: "Python Developer",
      content:
        "The Python course was well-structured and helped me solidify my coding skills. I highly recommend it to anyone looking to start a career in development.",
    },
  ];

  return (
    <AnimatedSection>
      <section className="bg-white py-16 px-16 mb-10">
        <div className="text-center">
          <div className="mb-4">
            <div className="bg-primary h-[2px] w-60 flex mx-auto -mb-3"></div>
            <h3 className="text-xl font-semibold text-primary bg-white inline-block px-5 uppercase">
              TESTIMONIAL
            </h3>
            <div className="bg-primary h-[2px] w-80 flex mx-auto -mt-2"></div>
          </div>
          <h2 className="text-4xl font-bold mb-20 text-gray-800">
            Our Students Say!
          </h2>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: "true",
          }}
          className="max-w-sm md:max-w-3xl xl:max-w-6xl mx-auto relative"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="max-w-sm pl-6 cursor-grab select-none"
              >
                <Card className="border-none shadow-none h-full rounded-none">
                  <CardContent className="flex items-center justify-center pt-6 p-0 h-full">
                    <div className="flex flex-col items-center">
                      <div className="p-2 border border-gray-300 rounded-full mb-4">
                        <img
                          src="blank-user.png"
                          className="h-16 w-16 object-cover rounded-full"
                        />
                      </div>

                      <h4 className="text-lg font-semibold overflow-hidden object-contain">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                      <p className="mt-4 text-sm text-center bg-light p-4 h-full">
                        {testimonial.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious icon={<ChevronLeft />} />
          <CarouselNext icon={<ChevronRight />} />
        </Carousel>
      </section>
    </AnimatedSection>
  );
}
