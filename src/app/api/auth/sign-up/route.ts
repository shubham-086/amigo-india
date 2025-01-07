import connectDB from "@/lib/connectDB";
import { sendEmail } from "@/lib/emailService";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();
    const existingUser = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    if (existingUser) {
      if (existingUser.isVerified) {
        return Response.json(
          { success: false, message: "User already exists." },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;
        existingUser.verifyCode = verifyCode;
        existingUser.verifyCodeExpiry = expiryDate;
        await existingUser.save();
      }
    } else {
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
      });

      await newUser.save();
    }

    const subject = "Verify your email";
    const text = `Your verification code is ${verifyCode}. It will expire in 1 hour.`;
    const emailResponse = await sendEmail(email, subject, text);
    console.log("Email response:", emailResponse);

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User created successfully. Verification code sent to email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json(
      { success: false, message: "Failed to create user" },
      { status: 500 }
    );
  }
}
