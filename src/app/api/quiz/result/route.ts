import connectDB from "@/lib/connectDB";
import { QuizResult, QuizStat } from "@/models/Quiz";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, quizId, scorePercentage, totalQuestions, answers } =
      await req.json();

    if (
      !userId ||
      !quizId ||
      scorePercentage == null ||
      !totalQuestions ||
      !answers
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: userId, quizId, scorePercentage, totalQuestions, answers",
        },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(answers) ||
      answers.some((answer) => !answer.questionId || !answer.correctOption)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid answers format. Each answer must include questionId and correctOption.",
        },
        { status: 400 }
      );
    }

    if (
      typeof scorePercentage !== "number" ||
      typeof totalQuestions !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "scorePercentage and totalQuestions must be numbers.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const result = new QuizResult({
      userId,
      quizId,
      scorePercentage,
      totalQuestions,
      answers,
    });

    await result.save();

    const quizStat = await QuizStat.findOne({ userId });

    if (quizStat) {
      quizStat.results.push(result._id as mongoose.Types.ObjectId);
      quizStat.completed += 1;
      quizStat.lastAttempt = new Date();

      const totalScore =
        (quizStat.averageScore || 0) * (quizStat.attempts - 1) +
        scorePercentage;
      quizStat.averageScore = totalScore / quizStat.attempts;

      await quizStat.save();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Quiz result saved successfully",
        data: result._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving quiz result:", error.message || error);
    return NextResponse.json(
      { success: false, message: "Failed to save quiz result" },
      { status: 500 }
    );
  }
}
