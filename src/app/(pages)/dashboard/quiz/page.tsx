"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useGlobalContext } from "@/context/GlobalContext";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const { setSelectedQuiz } = useGlobalContext();
  const { data: session, status } = useSession();
  const user = useMemo<User | null>(() => {
    return status === "authenticated" ? (session?.user as User) : null;
  }, [session, status]);

  const router = useRouter();

  useEffect(() => {
    fetchQuizzes();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterQuizzes();
  }, [selectedCategory, selectedLevel]);

  // Fetch quizzes from the backend API
  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/quiz");
      setQuizzes(response.data.data);
      setFilteredQuizzes(response.data.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories for the filter dropdown
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/quiz/category");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle category and level filtering
  const filterQuizzes = () => {
    let filtered = quizzes;

    if (selectedCategory !== "All" && selectedCategory !== "") {
      filtered = filtered.filter(
        (quiz) => quiz.category?.name === selectedCategory
      );
    }

    if (selectedLevel !== "All" && selectedLevel !== "") {
      filtered = filtered.filter((quiz) => quiz.level === selectedLevel);
    }

    setFilteredQuizzes(filtered);
  };

  const handeleClick = (quizId: string, title: string) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    setSelectedQuiz({ id: quizId, userId: user.id });
    router.push(`/dashboard/quiz/${title.toLowerCase()}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">Quizzes</h1>

      {/* Filter Section */}
      <div className="mb-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Select
          onValueChange={(value) => setSelectedCategory(value)}
          value={selectedCategory}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setSelectedLevel(value)}
          value={selectedLevel}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Display Quizzes */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Card key={idx} className="animate-pulse">
              <CardHeader className="p-3">
                <div className="w-full h-40 bg-gray-300 rounded-t-md" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
                <div className="mt-2">
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredQuizzes.length === 0 ? (
            <p>No quizzes found</p>
          ) : (
            filteredQuizzes.map((quiz, idx) => (
              <Card key={idx} className="hover:shadow-lg transition">
                <CardHeader className="p-3">
                  <img
                    src={quiz.imageUrl}
                    alt={quiz.title}
                    className="w-full h-40 object-cover rounded-t-md"
                  />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardTitle className="text-base font-bold">
                    {quiz.title}
                  </CardTitle>
                  <p className="text-xs text-gray-600 line-clamp-3">
                    {quiz.description}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">
                      Level:{" "}
                      <span className="text-xs text-gray-600 font-medium">
                        {quiz.level}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Category:{" "}
                      <span className="text-xs text-gray-600 font-medium">
                        {quiz.category.name}
                      </span>
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handeleClick(quiz._id, quiz.title)}
                  >
                    Start quiz
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
