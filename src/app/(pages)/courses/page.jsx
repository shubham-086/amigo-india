import PageHeader from "@/components/sections/PageHeader";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import CoursesSection from "@/components/sections/Courses";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Courses = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pb-10">
        <PageHeader img="/courses-bg.jpg" title="Courses" />
        <div className="container mx-auto pt-10">
          <div className="text-center mb-12">
            <div className="mb-4">
              <div className="bg-primary h-[2px] w-60 flex mx-auto -mb-3"></div>
              <h3 className="text-xl font-semibold text-primary bg-gray-50 inline-block px-5 uppercase">
                CATEGORIES
              </h3>
              <div className="bg-primary h-[2px] w-80 flex mx-auto -mt-2"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-relaxed">
              Explore our programs
            </h2>
          </div>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 xl:px-32 px-10 mb-24">
              <div className="col-span-2 md:col-span-3 mb-4 md:mb-0">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Link href="#" className="relative block overflow-hidden">
                      <img
                        className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-110"
                        src="/cat-1.jpg"
                        alt="Web Development"
                      />
                      <div className="bg-white text-center absolute bottom-0 right-0 py-2 px-3 m-2">
                        <h5 className="m-0">Web Development</h5>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="#" className="relative block overflow-hidden">
                      <img
                        className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-110"
                        src="/cat-3.jpg"
                        alt="AI/ML"
                      />
                      <div className="bg-white text-center absolute bottom-0 right-0 py-2 px-3 m-2">
                        <h5 className="m-0">AI/ML</h5>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="#" className="relative block overflow-hidden">
                      <img
                        className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-110"
                        src="/cat-2.jpg"
                        alt="English Language"
                      />
                      <div className="bg-white text-center absolute bottom-0 right-0 py-2 px-3 m-2">
                        <h5 className="m-0">English Language</h5>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 relative">
                <Link
                  href="#"
                  className="relative block h-full overflow-hidden"
                >
                  <img
                    className="w-full h-56 md:h-full object-cover transform transition-transform duration-300 hover:scale-110"
                    src="/cat-4.jpg"
                    alt="Campus Recruitment Training (CRT)"
                  />
                  <div className="bg-white text-center absolute bottom-0 right-0 py-2 px-3 m-2">
                    <h5 className="m-0">Campus Recruitment Training (CRT)</h5>
                  </div>
                </Link>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <CoursesSection />
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
