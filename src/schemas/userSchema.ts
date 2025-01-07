import { z } from "zod";

const MAX_FILE_SIZE = 50 * 1024; // 50KB in bytes

// Custom Zod schema for image validation
const imageValidationSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "File must be an image",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `File size must be less than ${MAX_FILE_SIZE / 1024}KB`,
  });

export const userSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters.")
    .max(30, "Name must be at most 30 characters.")
    .regex(/^[a-zA-Z ]+$/, "Name must contain only alphabets and spaces."),
  email: z.string().email("Invalid email address."),
  institute: z
    .string()
    .min(3, "College name must be at least 3 characters.")
    .max(50, "College name must be at most 50 characters."),
  image: z.any().optional(),
  // image: imageValidationSchema.optional(),
});

export type UserData = z.infer<typeof userSchema>;
