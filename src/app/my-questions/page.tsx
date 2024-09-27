import React from "react";
import { api } from "~/trpc/server";
import QAndA from "../_components/QAndA";

const MyQuestions = async () => {
  const { answered, unanswered } = await api.question.getUsersQuestions();
  return (
    <div>
      <h1 className="text-center text-3xl font-bold tracking-tight text-[hsl(280,100%,70%)] sm:text-[2rem]">
        Answered Questions
      </h1>
      {answered.length ? (
        answered.map((q) => (
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
      <h1 className="text-center text-3xl font-bold tracking-tight text-[hsl(280,100%,70%)] sm:text-[2rem] pt-16">
        Unanswered Questions
      </h1>
      {unanswered.length ? (
        unanswered.map((q) => (
          <div
            key={q.id}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"
          >
            <QAndA question={q.question} />
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          There hasnt been any questions yet!
        </div>
      )}
    </div>
  );
};

export default MyQuestions;
