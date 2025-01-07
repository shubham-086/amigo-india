"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const images = [
    "classroom2",
    "classroom3",
    "classroom4",
    "classroom10",
    "event13",
    "event14",
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="bg-dark text-white py-10">
      <div className="container mx-auto xl:px-10 sm:px-3 px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 lg:gap-5 gap-8">
          <div className="">
            <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://amigoindia.in/about"
                  className="hover:underline flex items-center"
                >
                  <span className="mr-2">
                    <ChevronRight className="h-5" />
                  </span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://amigoindia.in/contact"
                  className="hover:underline flex items-center"
                >
                  <span className="mr-2">
                    <ChevronRight className="h-5" />
                  </span>{" "}
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://amigoindia.in/courses"
                  className="hover:underline flex items-center"
                >
                  <span className="mr-2">
                    <ChevronRight className="h-5" />
                  </span>{" "}
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="https://amigoindia.in/gallery"
                  className="hover:underline flex items-center"
                >
                  <span className="mr-2">
                    <ChevronRight className="h-5" />
                  </span>{" "}
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm flex items-start">
              <MapPin className="w-5 h-5 mr-3" />
              C-187, 2nd Floor, Sector 18 Road, Indira Nagar, <br />
              Lucknow - 226016 (Indira Nagar Metro Station)
            </p>
            <p className="text-sm flex items-center mt-2">
              <Phone className="w-5 h-5 mr-3" />
              +91 6393506500
            </p>
            <p className="text-sm flex items-center mt-2">
              <Mail className="w-5 h-5 mr-3" />
              info@amigoindia.in
            </p>
            <div className="flex space-x-4 mt-5">
              <Link
                href="https://www.instagram.com/amigoindialucknow/"
                className="hover:text-secondary rounded-full border p-2"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://amigoindia.in/about"
                className="hover:text-secondary rounded-full border p-2"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://amigoindia.in/about"
                className="hover:text-secondary rounded-full border p-2"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link
                href="https://amigoindia.in/about"
                className="hover:text-secondary rounded-full border p-2"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-2 lg:mx-6">
            <h3 className="text-lg font-semibold mb-4">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={`/gallery/${src}.jpg`}
                  alt="Gallery"
                  className="w-full h-14 object-cover border-gray-100 border-4"
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Providing industry-relevant and job-oriented training to shape the
              tech leaders of tomorrow.
            </p>
            <div className="flex w-full max-w-full space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full max-w-xs px-4 py-2 text-gray-800 focus:outline-none"
              />
              <button className="bg-primary text-white px-4 py-2 hover:bg-secondary">
                SignUp
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            ©{" "}
            <Link
              href="https://amigoindia.in"
              className="text-secondary hover:underline"
            >
              amigoindia.in
            </Link>
            , All Right Reserved.
          </p>
        </div>
      </div>
      {isVisible && (
        <div className="fixed bottom-4 right-4">
          <button
            className="bg-primary text-white w-10 h-10 flex items-center justify-center shadow-lg hover:bg-secondary"
            aria-label="Scroll to Top"
            onClick={scrollToTop}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
