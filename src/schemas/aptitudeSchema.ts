import { z } from "zod";

export const testSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute."),
  createdBy: z.string().uuid("Invalid creator ID."),
  createdAt: z.date().optional(),
});

export type AptitudeTestInput = z.infer<typeof testSchema>;

export const questionSchema = z.object({
  testId: z.string().uuid("Invalid test ID."),
  questionText: z.string().min(1, "Question text is required."),
  options: z
    .array(z.string().min(1, "Option text is required."))
    .min(2, "At least 2 options are required."),
  correctAnswer: z.number().min(0, "Correct answer index must be valid."),
  createdAt: z.date().optional(),
});

export type AptitudeQuestionInput = z.infer<typeof questionSchema>;

export const responseSchema = z.object({
  userId: z.string().uuid("Invalid user ID."),
  testId: z.string().uuid("Invalid test ID."),
  questionId: z.string().uuid("Invalid question ID."),
  selectedOption: z.number().min(0, "Selected option must be valid."),
  submittedAt: z.date().optional(),
});

export type AptitudeResponseInput = z.infer<typeof responseSchema>;
