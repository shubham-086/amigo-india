import connectDB from "@/lib/connectDB";
import UserActivity from "@/models/Activity";
import { QuizStat } from "@/models/Quiz";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, quizId } = await req.json();
    if (!userId || !quizId) {
      return NextResponse.json(
        { success: false, message: "UserId and QuizId is required" },
        { status: 400 }
      );
    }

    await connectDB();
    let stat = await QuizStat.findOne({ userId });
    if (!stat) {
      stat = new QuizStat({
        userId,
        completed: 0,
        attempts: 0,
        averageScore: 0,
      });
    }
    stat.attempts += 1;
    stat.lastAttempt = new Date();

    await stat.save();

    await UserActivity.create({
      user: userId,
      activityType: "quiz",
      activityId: quizId,
      activityTypeRef: "Quiz",
    });

    return NextResponse.json(
      { success: true, message: "Quiz statistics updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update quiz statistics" },
      { status: 500 }
    );
  }
}
