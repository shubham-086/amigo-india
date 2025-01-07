"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Error from "../../../_components/Error";
import { Progress } from "@/components/ui/progress";

const Result = () => {
  const [quizResult, setQuizResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams<{ id: string }>();
  const resultId = params.id ? decodeURIComponent(params.id) : "";

  useEffect(() => {
    if (!resultId) {
      console.log("Result Id not found.");
      return;
    }

    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<ApiResponse>(
          `/api/quiz/result/${resultId}`
        );
        if (!response.data.success) {
          console.log("No quiz result found.");
          return;
        }
        setQuizResult(response.data.data);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [resultId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg font-semibold text-gray-600">Loading quiz...</h1>
      </div>
    );
  }

  if (!quizResult) {
    return <Error message="No quiz result found." urlPath="/dashboard" />;
  }

  const actualScore =
    (quizResult.scorePercentage * quizResult.totalQuestions) / 100;

  return (
    <div className="flex flex-col items-center justify-center px-4 my-10">
      <Card className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-2">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-gray-800 text-center">
            Congratulations! 🎉
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-lg text-center text-gray-600">
            You&apos;ve completed the quiz. Thank you for participating!
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-2/3">
              <p className="text-2xl font-semibold text-gray-800 text-center">
                Your Score:{" "}
                <span className="text-secondary">{actualScore}</span> /{" "}
                <span className="text-secondary">
                  {quizResult.totalQuestions}
                </span>
              </p>
              <div className="mt-4">
                <Progress
                  value={quizResult.scorePercentage}
                  className="bg-gray-200 h-2 rounded-full"
                />
                <p className="text-center text-gray-600 mt-2">
                  {quizResult.scorePercentage}%
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-800">
              Questions Attempted:{" "}
              <span className="text-secondary">
                {quizResult.answers?.length}
              </span>{" "}
              /{" "}
              <span className="text-secondary">
                {quizResult.totalQuestions}
              </span>
            </p>
          </div>
          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-800">
              Answer Breakdown:
            </p>
            <div className="space-y-4 mt-4">
              {quizResult.answers?.map((result: any, index: number) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 md:grid-cols-8 gap-4 p-4 rounded-lg ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } shadow-sm`}
                >
                  <div className="flex items-center md:col-span-2 space-x-2">
                    <p className="text-gray-800 font-medium">{`Q${
                      index + 1
                    }:`}</p>
                    <span
                      className={`text-lg ${
                        result.isCorrect ? "text-green-600" : "text-red-600"
                      } font-semibold`}
                    >
                      {result.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                    </span>
                  </div>
                  <div className="md:col-span-6 space-y-2">
                    <p className="text-gray-700">
                      <span className="font-bold">Question:</span>{" "}
                      {result.questionId?.text}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-bold">Your Answer:</span>{" "}
                      {result.selectedOption?.text}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-bold">Correct Answer:</span>{" "}
                      {result.correctOption?.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        {/* 
        <CardFooter>
          <Button
            variant="default"
            className="w-full mt-6"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default Result;
