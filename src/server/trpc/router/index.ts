// src/server/trpc/router/index.ts
import { router } from '../trpc';
import { questionRouter } from './question';
import { authRouter } from './auth';

export const appRouter = router({
	question: questionRouter,
	auth: authRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
