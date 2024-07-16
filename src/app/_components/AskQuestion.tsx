"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Textarea,
} from "@headlessui/react";
import clsx from "clsx";
import { api } from "~/trpc/react";
import Notificaition from "./Notificaition";

export default function AskQuestion() {
  const [open, setOpen] = useState(true);
  const [question, setQuestion] = useState("");

  const {
    mutate: askQuestion,
    isSuccess,
    error,
  } = api.question.createQuestion.useMutation({
    onSuccess: () => {
      setQuestion("");
      setOpen(false);
    },
  });

  return (
    <>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        Ask a question
      </Button>
      {isSuccess && (
        <Notificaition
          open={isSuccess}
          message={
            isSuccess && !error
              ? "Successfully asked question!"
              : "Error asking question, please try again!"
          }
          type={isSuccess ? "success" : "error"}
        />
      )}
      <Dialog
        open={open}
        onClick={() => setOpen((prev) => !prev)}
        onClose={setOpen}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    What would you like to know?
                  </DialogTitle>
                  <div className="w-full max-w-md">
                    <Textarea
                      className={clsx(
                        "mt-3 block w-full resize-none rounded-lg border-none bg-gray-900/5 py-1.5 px-3 text-sm/6 text-gray-950",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900/25",
                      )}
                      rows={3}
                      placeholder="Enter question here..."
                      value={question}
                      onChange={(e) => setQuestion(e.currentTarget.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => askQuestion({ question })}
                  disabled={question.length === 0}
                  className={
                    question.length === 0
                      ? "inline-flex w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                      : "inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                  }
                >
                  Ask
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
