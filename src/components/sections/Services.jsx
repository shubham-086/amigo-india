import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "../AnimatedSection";
import Image from "next/image";

const ServicesSection = () => {
  const services = [
    {
      icon: "/svg/graduation-cap.svg",
      title: "Skilled Instructors",
      description:
        "Learn from industry professionals with extensive experience.",
      size: 75,
    },
    {
      icon: "/svg/globe.svg",
      title: "Real-World Projects",
      description: "Work on projects that simulate real-world scenarios.",
      size: 65,
    },
    {
      icon: "/svg/award.svg",
      title: "Job-Ready Skills",
      description: "Acquire skills that employers are looking for.",
      size: 55,
    },
    {
      icon: "/svg/book-open.svg",
      title: "Flexible Learning",
      description: "Online and offline classes to fit your schedule.",
      size: 70,
    },
  ];

  return (
    <AnimatedSection>
      <div className="container mx-auto py-16 xl:px-32 px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="text-center shadow-none bg-light rounded-none px-2 py-4 border-none transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-4">
                  <Image
                    className="text-primary"
                    src={service.icon}
                    alt={service.title}
                    width={service.size}
                    height={service.size}
                  />
                </div>
                <h5 className="text-lg font-semibold mb-3">{service.title}</h5>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ServicesSection;
