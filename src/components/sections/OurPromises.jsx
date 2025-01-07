import { ArrowRight } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import Link from "next/link";

export default function OurPromise() {
  return (
    <AnimatedSection>
      <div className="conatainer mx-auto xl:px-32 px-10 mb-28 mt-10">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="relative w-full lg:w-1/2 min-h-[400px]">
            <img
              src="our-promise.jpg"
              alt="Our Promise"
              className="absolute w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 wow fadeInUp" data-wow-delay="0.3s">
            <div className="mb-4 text-center flex items-center">
              <h3 className="text-xl font-semibold text-primary bg-white inline-block pr-5 uppercase">
                ABOUT
              </h3>
              <div>
                <div className="bg-primary h-[2px] w-14 mb-2"></div>
                <div className="bg-primary h-[2px] w-20"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Our Promise
            </h1>
            <p className="text-gray-600 mb-6">
              Amigo India is a leading software training institute dedicated to
              empowering aspiring professionals with practical skills and
              knowledge in the latest technologies.
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
              <div className="flex items-center">
                <ArrowRight className="text-primary mr-2" />
                <p className="text-gray-700">Real-World Projects</p>
              </div>
              <div className="flex items-center">
                <ArrowRight className="text-primary mr-2" />
                <p className="text-gray-700">Expert Guidance</p>
              </div>
              <div className="flex items-center">
                <ArrowRight className="text-primary mr-2" />
                <p className="text-gray-700">Job-Ready Skills</p>
              </div>
              <div className="flex items-center">
                <ArrowRight className="text-primary mr-2" />
                <p className="text-gray-700">Flexible Learning</p>
              </div>
            </div>
            <Link
              href="https://amigoindia.in/about"
              className="bg-primary text-white py-3 px-5 hover:bg-secondary transition mt-2 inline-block"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
