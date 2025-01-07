import z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be atleast 4 characters.")
    .max(30, "Name must be atmost 30 characters.")
    .regex(/^[a-zA-Z ]+$/, "Name must contain only alphabets and spaces."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const verifyCodeSchema = z.object({
  code: z.string().length(6, "Verification code must be 6 characters."),
});

export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address."),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  code: z
    .string()
    .length(6, { message: "Verification code must be 6 characters." }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
