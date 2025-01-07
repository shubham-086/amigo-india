import User from "@/models/User";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import cloudinary, { uploadImage } from "@/lib/cloudinary";

export async function PUT(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const instituteName = formData.get("instituteName") as string;
    const image = formData.get("image") as File | null;

    let imageUrl = null;
    if (image) {
      try {
        imageUrl = await uploadImage(image, "user-profiles");
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json(
          { success: false, message: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    const updateData = {
      name,
      instituteName,
      ...(imageUrl && { image: imageUrl }),
    };

    const user = await User.findOneAndUpdate({ email }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
