import React from "react";
import AskQuestion from "./AskQuestion";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const TopNav = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Link href="/">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Ask <span className="text-[hsl(280,100%,70%)]">An</span> Alim
        </h1>
      </Link>
      <div className="flex py-8">
        <AskQuestion />
        <Link
          href={session ? "/api/auth/signout" : "/sign-in"}
          className="mx-2 rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
