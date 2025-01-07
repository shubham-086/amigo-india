import Link from "next/link";
import AnimatedSection from "../AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";

const CoursesSection = () => {
  const courses = [
    {
      title: "Full Stack Web Development",
      image: "/courses/mern-stack.jpg",
      description:
        "Learn front-end and back-end development in this comprehensive bootcamp.",
      duration: "6 Months",
      link: "/courses/web-development",
    },
    {
      title: "Data Analytics",
      image: "/courses/data-analytics.jpg",
      description: "Master data analysis, machine learning, and AI techniques.",
      duration: "4 Months",
      link: "/courses/data-science",
    },
    {
      title: "Data Structure with Java",
      image: "/courses/data-structure.jpg",
      description:
        "Gain practical experience with SEO, social media, and content marketing.",
      duration: "3 Months",
      link: "/courses/digital-marketing",
    },
    {
      title: "Python Programming",
      image: "/courses/python.png",
      description:
        "Gain practical experience with SEO, social media, and content marketing.",
      duration: "3 Months",
      link: "/courses/digital-marketing",
    },
    {
      title: "English Communication",
      image: "/courses/english.jpg",
      description:
        "Gain practical experience with SEO, social media, and content marketing.",
      duration: "3 Months",
      link: "/courses/digital-marketing",
    },
    {
      title: "Campus Recruitment Training",
      image: "/courses/campus-recruitment.jpg",
      description:
        "Gain practical experience with SEO, social media, and content marketing.",
      duration: "3 Months",
      link: "/courses/digital-marketing",
    },
  ];

  return (
    <AnimatedSection>
      <section className="mb-16">
        <div className="container mx-auto xl:px-32 px-10 text-center">
          <div className="text-center">
            <div className="mb-4">
              <div className="bg-primary h-[2px] w-60 flex mx-auto -mb-3"></div>
              <h3 className="text-xl font-semibold text-primary bg-white inline-block px-5 uppercase">
                COURSES
              </h3>
              <div className="bg-primary h-[2px] w-80 flex mx-auto -mt-2"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-16 text-gray-800">
              Our Popular Courses
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="bg-light rounded-none border-none shadow-none hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full object-cover"
                    />
                    <div className="absolute bottom-0 mb-10 w-full">
                      <Link
                        href={course.link}
                        className="bg-primary hover:bg-secondary text-white text-sm px-4 py-2 rounded-s-full border-r border-white"
                      >
                        Read More
                      </Link>
                      <Link
                        href={course.link}
                        className="bg-primary hover:bg-secondary text-white text-sm px-4 py-2 rounded-e-full"
                      >
                        Join Now
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      {course.description}
                    </p>
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      Duration: {course.duration}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default CoursesSection;
