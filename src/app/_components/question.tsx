"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestQuestions() {
  // const [latestQuestions] = api.question.getLatestQuestions.useSuspenseQuery();

  const utils = api.useUtils();
  const [question, setQuestion] = useState("");
  const createQuestion = api.question.createQuestion.useMutation({
    onSuccess: async () => {
      await utils.question.invalidate();
      setQuestion("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {/* {latestQuestions ? (
        latestQuestions.map((q) => (
          <p className="truncate">Your most recent post: {q.question}</p>
        ))
      ) : (
        <p>You have no posts yet.</p>
      )} */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createQuestion.mutate({ question });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createQuestion.isPending}
        >
          {createQuestion.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
