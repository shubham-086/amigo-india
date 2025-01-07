import User from "@/models/User";
import { sendEmail } from "@/lib/emailService";
import crypto from "crypto";
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

    const verifyCode = crypto.randomBytes(3).toString("hex"); // Generate a random 4-byte code
    const expiryDate = new Date(Date.now() + 15 * 60 * 1000); // Code expires in 15 minutes

    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = expiryDate;
    await user.save();

    await sendEmail(
      email,
      "Password Reset Code",
      `Your verification code is: ${verifyCode}`
    );

    return NextResponse.json(
      { success: true, message: "Verification code sent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Something went wrong:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send verification code." },
      { status: 500 }
    );
  }
}
