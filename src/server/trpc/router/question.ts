import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const questionRouter = router({
	hello: publicProcedure
		.input(z.object({ text: z.string().nullish() }).nullish())
		.query(({ input }) => {
			return {
				greeting: `Hello ${input?.text ?? 'world'}`
			};
		}),
	getAnsweredQuestions: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.question.findMany({
			where: {
				answered_status: 'ANSWERED'
			}
		});
	})
});
