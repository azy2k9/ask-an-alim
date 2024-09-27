import { api, HydrateClient } from "~/trpc/server";
import QAndA from "./_components/QAndA";

export default async function Home() {
  void api.question.getAllAnsweredQuestions.prefetch();
  const questions = await api.question.getAllAnsweredQuestions();

  return (
    <HydrateClient>
      <div>
        {questions.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {questions.map((q) => (
              <QAndA key={q.id} question={q.question} answer={q.answer} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            There hasnt been any questions yet!
          </div>
        )}
      </div>
    </HydrateClient>
  );
}
