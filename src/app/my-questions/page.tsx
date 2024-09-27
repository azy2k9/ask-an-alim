import React from "react";
import { api } from "~/trpc/server";
import QAndA from "../_components/QAndA";

const MyQuestions = async () => {
  const { answered, unanswered } = await api.question.getUsersQuestions();
  return (
    <div>
      <h1 className="my-4 text-center text-3xl font-bold tracking-tight text-[hsl(280,100%,70%)] sm:text-[2rem]">
        Answered Questions
      </h1>
      {answered.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {answered.map((q) => (
            <QAndA key={q.id} question={q.question} answer={q.answer} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          There hasn&apos;t been been any answered questions yet!
        </div>
      )}
      <h1 className="my-4 text-center text-3xl font-bold tracking-tight text-[hsl(280,100%,70%)] sm:text-[2rem] pt-16">
        Unanswered Questions
      </h1>
      {unanswered.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {unanswered.map((q) => (
            <QAndA key={q.id} question={q.question} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          There hasn&quot;t been any questions yet!
        </div>
      )}
    </div>
  );
};

export default MyQuestions;
