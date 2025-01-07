import connectDB from "@/lib/connectDB";
import { QuizOption, QuizQuestion, Quiz } from "@/models/Quiz";
import { Types } from "mongoose";

type OptionInput = {
  text: string;
  isCorrect: boolean;
};

type QuestionInput = {
  text: string;
  quizId: string;
  difficulty: string;
  options: OptionInput[];
};

export async function POST(request: Request) {
  try {
    await connectDB();
    const questionsData: QuestionInput[] = await request.json();

    if (!Array.isArray(questionsData) || questionsData.length === 0) {
      return Response.json(
        { success: false, message: "Invalid questions data" },
        { status: 400 }
      );
    }

    const createdQuestions = [];

    for (const question of questionsData) {
      const { text, quizId, difficulty, options } = question;

      if (!text || !quizId || !options || options.length < 2) {
        return Response.json(
          {
            success: false,
            message:
              "Each question must have text, quizId, and at least two options",
          },
          { status: 400 }
        );
      }

      // Create question
      const newQuestion = new QuizQuestion({
        text,
        quizId,
        difficulty,
      });
      await newQuestion.save();

      // Create options
      const createdOptions = await Promise.all(
        options.map(async (option: OptionInput): Promise<Types.ObjectId> => {
          const { text, isCorrect } = option;
          if (typeof isCorrect !== "boolean") {
            throw new Error("Each option must include isCorrect as a boolean");
          }
          const newOption = new QuizOption({
            text,
            isCorrect,
            questionId: newQuestion._id,
          });
          await newOption.save();
          return newOption._id as Types.ObjectId;
        })
      );

      // Update question with options
      newQuestion.options = createdOptions;
      await newQuestion.save();
      await Quiz.findByIdAndUpdate(
        quizId,
        { $push: { questions: newQuestion._id } },
        { new: true }
      );

      createdQuestions.push(newQuestion);
    }

    return Response.json(
      {
        success: true,
        message: "Questions added successfully",
        data: createdQuestions,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding questions:", error);
    return Response.json(
      { success: false, message: "Failed to add questions" },
      { status: 500 }
    );
  }
}
