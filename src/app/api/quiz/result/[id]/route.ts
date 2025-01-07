import connectDB from "@/lib/connectDB";
import { QuizResult } from "@/models/Quiz";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const resultId = params.id;

    if (!resultId) {
      return NextResponse.json(
        { success: false, message: "Result ID is required" },
        { status: 400 }
      );
    }
    const result = await QuizResult.findById(resultId)
      .populate({
        path: "answers",
        populate: [
          {
            path: "questionId",
            select: "text",
          },
          {
            path: "selectedOption",
            select: "text isCorrect",
          },
          {
            path: "correctOption",
            select: "text isCorrect",
          },
        ],
      })
      .exec();

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Result not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Result,", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch Result" },
      { status: 500 }
    );
  }
}
