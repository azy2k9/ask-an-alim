import React from "react";
import { toSentenceCase } from "~/lib/utils";

interface Props {
  question: string;
  answer?: string;
}

const QAndA = ({ question, answer }: Props) => {
  return (
    <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
      <h3 className="text-2xl font-bold">{toSentenceCase(question)}</h3>
      {answer && <div className="text-lg">{toSentenceCase(answer)}</div>}
    </div>
  );
};

export default QAndA;
