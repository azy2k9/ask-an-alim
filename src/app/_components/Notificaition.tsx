"use client";

import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";

type Props = {
  type: "success" | "error";
  message: string;
  open: boolean;
};

const Notificaition = ({ type, message, open }: Props) => {
  const [isShowing, setIsShowing] = useState(open);

  useEffect(() => {
    setTimeout(() => {
      setIsShowing(false);
    }, 2500);
  }, [isShowing]);

  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`absolute p-4 ${type === "success" ? "bg-green-700" : "bg-red-700"} bottom-4 right-4 rounded`}
      >
        {message}
      </div>
    </Transition>
  );
};

export default Notificaition;
