import connectDB from "@/lib/connectDB";
import { QuizCategory } from "@/models/Quiz";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, description } = await request.json();
    if (!name) {
      return Response.json(
        { success: false, message: "Category Name is required" },
        { status: 500 }
      );
    }
    const existingCategory = await QuizCategory.findOne({ name });

    if (existingCategory) {
      return Response.json(
        { success: false, message: "Category with this name already exists" },
        { status: 500 }
      );
    }
    const newCategory = new QuizCategory({
      name,
      description,
    });
    await newCategory.save();
    // const categories = await request.json();
    // const newCategory = await QuizCategory.insertMany(categories);
    return Response.json(
      {
        success: true,
        message: "Category added successfully",
        data: newCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding category", error);
    return Response.json(
      { success: false, message: "Failed to add category" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const categories = await QuizCategory.find();
    return Response.json({ success: true, data: categories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories", error);
    return Response.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
