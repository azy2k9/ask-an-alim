"use client";

import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

type Props = {
  type: "success" | "error";
  message: string;
};

const Notificaition = ({ type, message }: Props) => {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowing(false);
    }, 6000);
  }, [isShowing]);

  return (
    <div
      className={clsx(
        "size-full rounded-xl bg-white shadow-lg transition duration-400",
        "data-[closed]:scale-50 data-[closed]:rotate-[-120deg] data-[closed]:opacity-0",
        "data-[leave]:duration-200 data-[leave]:ease-in-out",
        "data-[leave]:data-[closed]:scale-95 data-[leave]:data-[closed]:rotate-[0deg]",
      )}
    >
      <Transition show={isShowing}>
        <div className="z-10">
          <div
            className={`absolute p-4 ${type === "success" ? "bg-green-700" : "bg-red-700"} bottom-4 right-4 rounded`}
          >
            {message}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Notificaition;
