import connectDB from "@/lib/connectDB";
import UserActivity from "@/models/Activity";
import { QuizStat } from "@/models/Quiz";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      throw new Error("User ID is required");
    }
    await connectDB();

    const latestUserActivity = await UserActivity.find({ user: userId })
      .select("-user")
      .populate({
        path: "activityId",
        select: "title level",
        populate: {
          path: "category",
          select: "name",
        },
      })
      .sort({ createdAt: -1 })
      .limit(1)
      .lean();

    const userActivities = await UserActivity.find({ user: userId })
      .select("-user")
      .populate("activityId", "title level")
      .lean();

    const quizStats = await QuizStat.findOne({ userId })
      .select("-userId")
      .populate({
        path: "results",
        select: "-userId -answers",
        populate: {
          path: "quizId",
          select: "title level",
        },
      })
      .lean();

    const combinedData = {
      userActivities,
      quizStats,
      latestUserActivity,
    };

    return NextResponse.json(
      {
        success: true,
        message: "User activity data fetched successfully",
        data: combinedData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user activity data",
      },
      { status: 500 }
    );
  }
}
