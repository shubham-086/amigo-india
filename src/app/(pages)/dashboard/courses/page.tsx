import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const courses = [
  {
    title: "Full Stack Web Development",
    image: "/courses/mern-stack.jpg",
    description:
      "Become a proficient developer by mastering both front-end and back-end technologies, including React, Node.js, and MongoDB.",
    duration: "6 Months",
    level: "Intermediate",
    link: "/courses/web-development",
  },
  {
    title: "Data Analytics",
    image: "/courses/data-analytics.jpg",
    description:
      "Dive into the world of data analysis with skills in Python, SQL, and visualization tools like Tableau and Power BI.",
    duration: "4 Months",
    level: "Advanced",
    link: "/courses/data-science",
  },
  {
    title: "Data Structure with Java",
    image: "/courses/data-structure.jpg",
    description:
      "Learn efficient algorithms and data structures to build optimized software solutions, with a focus on Java programming.",
    duration: "3 Months",
    level: "Beginner",
    link: "/courses/data-structure",
  },
  {
    title: "Python Programming",
    image: "/courses/python.png",
    description:
      "Master Python from basics to advanced concepts, including web development, automation, and data manipulation.",
    duration: "3 Months",
    level: "Beginner",
    link: "/courses/python-programming",
  },
  {
    title: "English Communication",
    image: "/courses/english.jpg",
    description:
      "Enhance your English speaking, writing, and comprehension skills for professional and everyday communication.",
    duration: "3 Months",
    level: "Beginner",
    link: "/courses/english-communication",
  },
  {
    title: "Campus Recruitment Training",
    image: "/courses/campus-recruitment.jpg",
    description:
      "Prepare for campus placements with training in aptitude, group discussions, and interview skills.",
    duration: "3 Months",
    level: "Intermediate",
    link: "/courses/campus-recruitment-training",
  },
];

const categories = [
  "All",
  "Development",
  "Design",
  "Marketing",
  "Data Science",
];

export default function CoursesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-2 overflow-auto">
        {categories.map((category, index) => (
          <Button key={index} variant="outline" className="whitespace-nowrap">
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, idx) => (
          <Card key={idx} className="hover:shadow-lg transition">
            <CardHeader className="p-0 w-full h-44">
              <Image
                src={course.image}
                alt={course.title}
                layout="responsive"
                width={16}
                height={9}
                className="object-cover rounded-t-md overflow-hidden"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-base font-bold mb-1">
                {course.title}
              </CardTitle>
              <p className="text-sm text-gray-600 line-clamp-3">
                {course.description}
              </p>
              <span className="inline-block mt-2 px-3 py-1 text-xs bg-gray-200 rounded-full">
                {course.level}
              </span>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="default" className="w-full">
                View Course
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
