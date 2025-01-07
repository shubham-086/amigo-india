import connectDB from "@/lib/connectDB";
import { Quiz } from "@/models/Quiz";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const quizId = params.id;

    if (!quizId) {
      return NextResponse.json(
        { success: false, message: "Quiz ID is required" },
        { status: 400 }
      );
    }
    const quiz = await Quiz.findById(quizId)
      .populate("category")
      .populate({
        path: "questions",
        populate: {
          path: "options",
          model: "QuizOption",
        },
      });

    if (!quiz) {
      return NextResponse.json(
        { success: false, message: "Quiz not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: quiz }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz,", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}
