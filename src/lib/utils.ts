import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toSentenceCase = (sentence: string) => {
  return sentence[0]?.toUpperCase() + sentence.substring(1, sentence.length);
};
