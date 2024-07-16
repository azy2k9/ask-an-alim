import z from "zod";

export const SignupSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Email must be valid" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(4, "Password must be at least 4 characters")
    .max(50, "Password cannot be more than 50 characters")
    .regex(/[a-z]/, "Password must contain a lowercase character")
    .regex(/\d/, "Password must contain a numeric character"),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(4, "Name must at least 4 characters")
    .max(50, "Name cannot be more than 50 characters"),
  image: z.string().url("Image URL must be a valid URL").optional(),
});

export type SignupForm = z.infer<typeof SignupSchema>;
