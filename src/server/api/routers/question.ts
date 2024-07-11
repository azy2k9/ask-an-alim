import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAllAnsweredQuestions: publicProcedure.query(() => {
    const answeredQuestions = [
      {
        id: 1,
        question: "How are you?",
        answer:
          "Just the basics - Everything you need to know to set up your database and authentication",
      },
      {
        id: 2,
        question: "Are you the best?",
        answer: "No i am not the best i am just a normal person",
      },
      {
        id: 3,
        question: "Is the sky blue?",
        answer: "Yes the sky is blue during the day but not at night",
      },
    ];
    return answeredQuestions;
  }),

  createQuestion: publicProcedure
    .input(z.object({ question: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // return ctx.db.question.create({
      //   data: {
      //     question: input.question,
      //     createdBy: { connect: { id: ctx.session?.user.id } },
      //   },
      // });
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
