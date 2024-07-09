// import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAllAnsweredQuestions: publicProcedure.query(() => {
    const answeredQuestions = [
      { id: 1, question: "how are you?", answer: "i am fine" },
    ];
    return answeredQuestions;
  }),

  // createQuestion: publicProcedure
  //   .input(z.object({ question: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.question.create({
  //       data: {
  //         question: input.question,
  //         createdBy: { connect: { id: ctx.session?.user.id } },
  //       },
  //     });
  //   }),

  // getUsersQuestions: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.question.findMany({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),
});
