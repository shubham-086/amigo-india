import User from "@/models/User";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Something went wrong:", error);
    return NextResponse.json(
      { success: false, message: "Failed to find user." },
      { status: 500 }
    );
  }
}
