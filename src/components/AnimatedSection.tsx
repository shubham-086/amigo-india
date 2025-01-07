"use client";
import { useInView } from "react-intersection-observer";
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  slideDirection?: "up" | "down";
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  slideDirection = "up",
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const slideClass = {
    up: "animate-slideInUp",
    down: "animate-slideInDownComponent",
  }[slideDirection];

  return (
    <div
      ref={ref}
      className={cn(
        `transition-opacity duration-700 ease-out transform`,
        inView ? `${slideClass} opacity-100` : `opacity-0 translate-y-10`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
