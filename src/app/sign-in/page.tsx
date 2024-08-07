"use client";

import React from "react";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { SigninSchema } from "../../schema/SigninSchema";
import type { SigninForm } from "../../schema/SigninSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import FormField from "../_components/FormField";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();

  const { handleSubmit, control } = useForm<SigninForm>({
    resolver: zodResolver(SigninSchema),
    mode: "onBlur",
  });

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(async ({ email, password }) => {
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (!response?.error && response?.ok) {
          router.push("/");
          router.refresh();
        }
      })}
    >
      <FormField name="email" placeholder="Email..." control={control} />
      <FormField
        name="password"
        placeholder="Password..."
        type="password"
        control={control}
      />
      <div className="md:px-60 align-middle">
        <button
          type="submit"
          className="btn bg-purple-400 hover:bg-purple-500 text-white rounded-lg justify-right w-full mt-2 p-2"
        >
          Sign in
        </button>
        <button
          className="btn bg-purple-400 hover:bg-purple-500 text-white flex rounded-lg justify-center w-full my-2 p-2"
          onClick={async (e) => {
            e.preventDefault();
            await signIn("google", {
              callbackUrl: "/",
            });
          }}
        >
          <GoogleIcon size="22px" className="mr-2" />
          <span>Sign in with Google</span>
        </button>
        <button
          className="flex text-white bg-purple-500 hover:bg-purple-600 rounded-lg justify-center w-full my-2 p-2"
          onClick={async (e) => {
            e.preventDefault();
            router.push("/sign-up");
          }}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default Signin;
