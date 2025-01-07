import { uploadImage } from "@/lib/cloudinary";
import connectDB from "@/lib/connectDB";
import { QuizCategory, Quiz } from "@/models/Quiz";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as string;
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File | null;

    if (!title || !level || !categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, Level, and Category ID are required",
        },
        { status: 400 }
      );
    }

    let imageUrl = null;
    if (image) {
      try {
        imageUrl = await uploadImage(image, "quiz-thumbnails");
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json(
          { success: false, message: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    const newQuiz = new Quiz({
      title,
      description,
      level,
      category: categoryId,
      imageUrl,
    });
    await newQuiz.save();

    await QuizCategory.findByIdAndUpdate(
      categoryId,
      { $push: { quizzes: newQuiz._id } },
      { new: true }
    );

    return NextResponse.json(
      { success: true, message: "Quiz created successfully", data: newQuiz },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating quiz", error);
    return NextResponse.json(
      { success: false, message: "Failed to create Quiz" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const quizzes = await Quiz.find().populate("category");

    return NextResponse.json({ success: true, data: quizzes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quizzes:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch quizzes",
      },
      { status: 500 }
    );
  }
}
