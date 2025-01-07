import mongoose, { Schema, Document } from "mongoose";

// QuizCategory Schema
interface IQuizCategory extends Document {
  name: string;
  description?: string;
  quizzes: mongoose.Types.ObjectId[];
}

const QuizCategorySchema = new Schema<IQuizCategory>({
  name: { type: String, required: true },
  description: { type: String },
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
});

const QuizCategory =
  (mongoose.models.QuizCategory as mongoose.Model<IQuizCategory>) ||
  mongoose.model<IQuizCategory>("QuizCategory", QuizCategorySchema);

// Quiz Schema
interface IQuiz extends Document {
  title: string;
  description?: string;
  imageUrl?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: mongoose.Types.ObjectId;
  questions: mongoose.Types.ObjectId[];
}

const QuizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizCategory",
    required: true,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuizQuestion" }],
});

const Quiz =
  (mongoose.models.Quiz as mongoose.Model<IQuiz>) ||
  mongoose.model<IQuiz>("Quiz", QuizSchema);

// QuizQuestion Schema
interface IQuizQuestion extends Document {
  text: string;
  quizId: mongoose.Types.ObjectId;
  difficulty?: "Easy" | "Medium" | "Hard";
  options: mongoose.Types.ObjectId[];
}

const QuizQuestionSchema = new Schema<IQuizQuestion>({
  text: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuizOption" }],
});

const QuizQuestion =
  (mongoose.models.QuizQuestion as mongoose.Model<IQuizQuestion>) ||
  mongoose.model<IQuizQuestion>("QuizQuestion", QuizQuestionSchema);

// QuizOption Schema
interface IQuizOption extends Document {
  text: string;
  isCorrect: boolean;
  questionId: mongoose.Types.ObjectId;
}

const QuizOptionSchema = new Schema<IQuizOption>({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizQuestion",
    required: true,
  },
});

const QuizOption =
  (mongoose.models.QuizOption as mongoose.Model<IQuizOption>) ||
  mongoose.model<IQuizOption>("QuizOption", QuizOptionSchema);

// QuizResult Schema
interface IQuizResult extends Document {
  userId: mongoose.Types.ObjectId;
  quizId: mongoose.Types.ObjectId;
  scorePercentage: number;
  totalQuestions: number;
  answers: {
    questionId: mongoose.Types.ObjectId;
    selectedOption: mongoose.Types.ObjectId;
    correctOption: mongoose.Types.ObjectId;
    isCorrect: boolean;
  }[];
}

const QuizResultSchema = new Schema<IQuizResult>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  scorePercentage: { type: Number, required: true, max: 100, min: 0 },
  totalQuestions: { type: Number, required: true },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizQuestion",
        required: true,
      },
      selectedOption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizOption",
      },
      correctOption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizOption",
        required: true,
      },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

const QuizResult =
  (mongoose.models.QuizResult as mongoose.Model<IQuizResult>) ||
  mongoose.model<IQuizResult>("QuizResult", QuizResultSchema);

// IQuizStat Schema
interface IQuizStat extends Document {
  userId: mongoose.Types.ObjectId;
  results: mongoose.Types.ObjectId[];
  attempts: number;
  completed: number;
  averageScore?: number;
  lastAttempt?: Date;
}

const QuizStatSchema = new Schema<IQuizStat>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuizResult" }],
    attempts: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    averageScore: { type: Number },
    lastAttempt: { type: Date },
  },
  { timestamps: true }
);

const QuizStat =
  (mongoose.models.QuizStat as mongoose.Model<IQuizStat>) ||
  mongoose.model<IQuizStat>("QuizStat", QuizStatSchema);

export { QuizCategory, Quiz, QuizQuestion, QuizOption, QuizStat, QuizResult };
