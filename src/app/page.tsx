import Navbar from "@/components/Navbar";
import CoursesSection from "../components/sections/Courses";
import ImageSlider from "../components/sections/ImageSlider";
import OurPromise from "../components/sections/OurPromises";
import ServicesSection from "../components/sections/Services";
import TestimonialSection from "../components/sections/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ImageSlider />
      <ServicesSection />
      <OurPromise />
      <CoursesSection />
      <TestimonialSection />
      <Footer />
    </>
  );
}
