import z from "zod";

export const SigninSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "Password must contain at least 3 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
});

export type SigninForm = z.infer<typeof SigninSchema>;
