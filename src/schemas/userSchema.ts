import { z } from "zod";

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
});

export type UserData = z.infer<typeof userSchema>;
