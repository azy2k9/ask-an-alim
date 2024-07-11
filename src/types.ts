import { type Question } from "@prisma/client";

export type AnsweredQuestion = Omit<Question, "answer"> & {
  answer: string;
};

export type AnsweredQuestions = Array<AnsweredQuestion>;
