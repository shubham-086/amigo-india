import connectDB from "@/lib/connectDB";
import User from "@/models/User";

export async function POST(request: Request) {
  await connectDB();
  try {
    const { email, code } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { success: false, message: "No user found with this email." },
        { status: 400 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeExpired) {
      await User.updateOne({ email }, { isVerified: true });
      return Response.json(
        { success: true, message: "Code verified successfully." },
        { status: 200 }
      );
    } else if (!isCodeExpired) {
      return Response.json(
        { success: false, message: "Code has expired." },
        { status: 400 }
      );
    } else {
      return Response.json(
        { success: false, message: "Invalid code." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    return Response.json(
      { success: false, message: "Failed to verify code." },
      { status: 500 }
    );
  }
}
