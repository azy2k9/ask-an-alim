import React from "react";

interface Props {
  question: string;
  answer: string;
}

const QAndA = ({ question, answer }: Props) => {
  return (
    <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
      <h3 className="text-2xl font-bold">{question}</h3>
      <div className="text-lg">{answer}</div>
    </div>
  );
};

export default QAndA;
