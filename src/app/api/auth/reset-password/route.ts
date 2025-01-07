import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, verifyCode, newPassword } = await req.json();
    console.log(email, verifyCode, newPassword);
    if (!email || !verifyCode || !newPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Wrong Email Address!" },
        { status: 400 }
      );
    }
    if (
      user.verifyCode !== verifyCode ||
      new Date(user.verifyCodeExpiry) < new Date()
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired verification code." },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json(
      { success: true, message: "Password changed successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erorr: ", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
