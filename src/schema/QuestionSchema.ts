import { z } from "zod";

export const QuestionSchema = z.object({
  question: z.string({ required_error: "You must enter a question" }),
});

export type QuestionSchema = z.infer<typeof QuestionSchema>;
