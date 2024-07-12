import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type AnsweredQuestions } from "~/types";

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
