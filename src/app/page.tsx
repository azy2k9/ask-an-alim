import { api, HydrateClient } from "~/trpc/server";
import QAndA from "./_components/QAndA";

export default async function Home() {
  void api.question.getAllAnsweredQuestions.prefetch();

  const questions = await api.question.getAllAnsweredQuestions();

  return (
    <HydrateClient>
      <div>
        {questions.length ? (
          questions.map((q) => (
            <div
              key={q.id}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"
            >
              <QAndA question={q.question} answer={q.answer} />
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            There hasnt been any questions yet!
          </div>
        )}
      </div>
      {/* <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div> */}
    </HydrateClient>
  );
}
