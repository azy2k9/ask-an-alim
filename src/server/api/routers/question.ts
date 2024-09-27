import { type Question } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type AnsweredQuestion, type AnsweredQuestions } from "~/types";

export const questionRouter = createTRPCRouter({
  getAllAnsweredQuestions: publicProcedure.query(async ({ ctx }) => {
    const answeredQuestions = await ctx.db.question.findMany({
      where: {
        status: "ANSWERED",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return answeredQuestions as AnsweredQuestions;
  }),
  createQuestion: publicProcedure
    .input(z.object({ question: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.create({
        data: {
          question: input.question,
          createdBy: ctx.session?.user.id
            ? { connect: { id: ctx.session?.user.id } }
            : undefined,
        },
      });
    }),
  getUsersQuestions: protectedProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.question.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
    });

    const categorisedQuestions = questions.reduce(
      (accumlated, current) => {
        if (current.status === "ANSWERED") {
          accumlated.answered.push(current as AnsweredQuestion);
        } else {
          accumlated.unanswered.push(current);
        }
        return accumlated;
      },
      {
        answered: [] as AnsweredQuestions,
        unanswered: [] as Array<Question>,
      },
    );
    return categorisedQuestions;
  }),
  // getLatestQuestions: protectedProcedure.query(({ ctx }) => {
  //   if (ctx.session.user.role === "USER") {
  //     throw new Error(
  //       "Sorry only admins and alims can see unanswered questions",
  //     );
  //   }

  //   return ctx.db.question.findMany({
  //     where: { answered_status: "NOT_ANSWERED" },
  //   });
  // }),

  // getUsersQuestions: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.question.findMany({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),
});
