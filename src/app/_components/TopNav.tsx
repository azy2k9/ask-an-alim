import React from "react";
import AskQuestion from "./AskQuestion";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { Button } from "~/components/ui/button";

const TopNav = async () => {
  const session = await getServerAuthSession();
  const isSignedIn = session?.user.id;
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Link href="/">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Ask <span className="text-[hsl(280,100%,70%)]">An</span> Alim
        </h1>
      </Link>

      <div className="flex py-8">
        <AskQuestion />

        {isSignedIn && (
          <Button asChild>
            <Link
              href="/my-questions"
              className="mx-2 bg-white/10 hover:bg-white/20"
            >
              My Questions
            </Link>
          </Button>
        )}
        {isAdmin && (
          <Button asChild>
            <Link
              href="/answer-questions"
              className="mx-2 bg-white/10 hover:bg-white/20"
            >
              Answer Questions
            </Link>
          </Button>
        )}
        <Button asChild>
          <Link
            href={isSignedIn ? "/api/auth/signout" : "/sign-in"}
            className="mx-2 bg-white/10 hover:bg-white/20"
          >
            {isSignedIn ? "Sign out" : "Sign in"}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TopNav;
