import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pb-10">
        <PageHeader img="/about-bg.jpg" title="About Us" />
        <div className="container mx-auto px-4 lg:px-32 py-10">
          <div className="text-center mb-16">
            <div className="mb-4">
              <div className="bg-primary h-[2px] w-60 flex mx-auto -mb-3"></div>
              <h3 className="text-xl font-semibold text-primary bg-gray-50 inline-block px-5 uppercase">
                ABOUT US
              </h3>
              <div className="bg-primary h-[2px] w-80 flex mx-auto -mt-2"></div>
            </div>
            <h2 className="text-xl md:text-2xl font-medium text-gray-700">
              Discover our story, our values, and what sets us apart in the
              world of software training.
            </h2>
          </div>
          <AnimatedSection>
            <section className="mb-20">
              <div className="flex flex-col md:flex-row items-center md:gap-8 gap-10 md:px-16">
                <div className="md:w-1/2 shadow-lg px-20 py-5 bg-white">
                  <Image
                    src="/logo.png"
                    alt="Our Journey"
                    width={300}
                    height={300}
                    className="flex mx-auto object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    Our Journey
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Founded by a team of passionate educators and tech
                    enthusiasts, Amigo India has been at the forefront of
                    software training. Our mission is to nurture the next
                    generation of tech innovators through world-class education,
                    a forward-thinking curriculum, and unparalleled community
                    support.
                  </p>
                  <div className="mt-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                      Follow Us
                    </h4>
                    <div className="flex space-x-6">
                      <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-blue-600 hover:text-blue-800 transition-all duration-300"
                      >
                        <Facebook />
                      </Link>
                      <Link
                        href="https://www.instagram.com/amigoindialucknow/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-pink-600 hover:text-pink-800 transition-all duration-300"
                      >
                        <Instagram />
                      </Link>
                      <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-blue-700 hover:text-blue-900 transition-all duration-300"
                      >
                        <Linkedin />
                      </Link>
                      <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-red-600 hover:text-red-700 transition-all duration-300"
                      >
                        <Youtube />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>
          <AnimatedSection>
            <section className="bg-light text-gray-800 py-12 mb-16 relative overflow-hidden">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold">
                  What Sets Us Apart
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
                <div className="bg-white text-gray-800 p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <h4 className="text-lg font-semibold text-secondary mb-2">
                    Comprehensive Curriculum
                  </h4>
                  <p className="text-gray-600">
                    Regularly updated courses that reflect the latest trends and
                    innovations in the tech industry.
                  </p>
                </div>
                <div className="bg-white text-gray-800 p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <h4 className="text-lg font-semibold text-secondary mb-2">
                    Experienced Trainers
                  </h4>
                  <p className="text-gray-600">
                    Learn from industry veterans with years of real-world
                    experience.
                  </p>
                </div>
                <div className="bg-white text-gray-800 p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <h4 className="text-lg font-semibold text-secondary mb-2">
                    Vibrant Community
                  </h4>
                  <p className="text-gray-600">
                    Be part of a thriving network of learners, mentors, and
                    professionals.
                  </p>
                </div>
              </div>
            </section>
          </AnimatedSection>
          <AnimatedSection>
            <section className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                Our Commitment
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-lg mb-16">
                "At Amigo India, we are committed to delivering a transformative
                learning experience that goes beyond academics. Our aim is to
                inspire, educate, and empower our students to reach their
                highest potential."
              </p>
              <Link
                href="/courses"
                className="inline-block bg-primary text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md hover:bg-secondary transition-all duration-300"
              >
                Explore Courses
              </Link>
            </section>
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
