"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import { Answer, QuizResult } from "@/types/QuizData";
import Error from "../../_components/Error";

const FormSchema = z.object({
  selectedOption: z.string({
    required_error: "Please select an option.",
  }),
});

const Quiz: React.FC = () => {
  const router = useRouter();
  const { selectedQuiz } = useGlobalContext();
  const [quizData, setQuizData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);
  const [quizResults, setQuizResults] = useState<Answer[]>([]);
  const [attemptLogged, setAttemptLogged] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedOption: "",
    },
  });

  useEffect(() => {
    if (!selectedQuiz?.id) return;
    setIsLoading(true);
    const fetchQuiz = async () => {
      try {
        const response = await axios.post<ApiResponse>("/api/quiz/quizData", {
          quizId: selectedQuiz.id,
        });
        setQuizData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [selectedQuiz]);

  useEffect(() => {
    if (quizData) {
      const questions = [...quizData.questions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(questions);
    }
  }, [quizData]);

  useEffect(() => {
    if (shuffledQuestions[currentIndex]) {
      const options = shuffledQuestions[currentIndex].options.sort(
        () => Math.random() - 0.5
      );
      setShuffledOptions(options);
      form.reset();
    }
  }, [shuffledQuestions, currentIndex, form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (!attemptLogged && value.selectedOption) {
        logAttempt();
        setAttemptLogged(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, attemptLogged]);

  const logAttempt = async () => {
    try {
      await axios.post(`/api/quiz/stats`, {
        userId: selectedQuiz.userId,
        quizId: selectedQuiz.id,
      });
    } catch (error) {
      console.error("Failed to log attempt:", error);
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const currentQuestion = shuffledQuestions[currentIndex];

    const correctAnswer = currentQuestion.options.find(
      (opt: any) => opt.isCorrect
    );

    if (!correctAnswer) {
      console.error(
        "No correct answer found for question:",
        currentQuestion._id
      );
      return;
    }

    const answer: Answer = {
      questionId: currentQuestion._id,
      selectedOption: data.selectedOption,
      correctOption: correctAnswer._id,
      isCorrect: data.selectedOption === correctAnswer._id,
    };

    const updatedQuizResults = [...quizResults, answer];

    setQuizResults(updatedQuizResults);

    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitResults(updatedQuizResults);
    }
  };

  const submitResults = async (finalResults: Answer[]) => {
    setIsSubmitting(true);
    const userId = selectedQuiz.userId;
    const quizId = selectedQuiz.id;
    const correctAnswers = finalResults.filter(
      (answer) => answer.isCorrect
    ).length;
    const scorePercentage = (correctAnswers / shuffledQuestions.length) * 100;

    const payload: QuizResult = {
      userId,
      quizId,
      scorePercentage,
      totalQuestions: shuffledQuestions.length,
      answers: finalResults,
    };

    try {
      const response = await axios.post("/api/quiz/result", payload);
      if (response.data.success) {
        router.push(`/dashboard/quiz/result/${response.data.data}`);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Failed to submit quiz results:", error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg font-semibold text-gray-600">Loading quiz...</h1>
      </div>
    );
  }

  if (!selectedQuiz?.id || !quizData) {
    return <Error message="Quiz not found!" urlPath="/dashboard/quiz" />;
  }

  if (error) {
    return (
      <Error
        message="Failed to submit quiz results!"
        urlPath="/dashboard/quiz"
      />
    );
  }

  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          {quizData.title}
        </h1>
        <p className="text-center text-gray-600 mb-8">{quizData.description}</p>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
          <Progress
            value={((currentIndex + 1) / shuffledQuestions.length) * 100}
            className="bg-gray-200"
          />
        </div>

        {shuffledQuestions[currentIndex] && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-700">
                    Question {currentIndex + 1} of {shuffledQuestions.length}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {shuffledQuestions[currentIndex].text}
                  </p>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="selectedOption"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Select an option:</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="flex flex-col space-y-3"
                          >
                            {shuffledOptions.map(
                              (option: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={option._id}
                                    id={`option-${index}`}
                                    className="peer"
                                  />
                                  <label
                                    htmlFor={`option-${index}`}
                                    className="text-gray-700 peer-checked:font-medium cursor-pointer"
                                  >
                                    {option.text}
                                  </label>
                                </div>
                              )
                            )}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    disabled={!form.watch("selectedOption") || isSubmitting}
                  >
                    {currentIndex < shuffledQuestions.length - 1
                      ? "Next"
                      : "Finish"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Quiz;
