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
      onSubmit={handleSubmit((d) => {
        console.log({ email: d.email, password: d.password });
      })}
    >
      <FormField name="email" placeholder="Email..." control={control} />
      <FormField
        name="password"
        placeholder="Password..."
        type="password"
        control={control}
      />
      <div className="md:px-16 align-middle">
        <button
          type="submit"
          className="btn bg-purple-300 text-white rounded-lg justify-right w-full mt-2 p-2"
        >
          Sign in
        </button>
        <button
          className="btn bg-purple-300 text-white flex rounded-lg justify-center w-full my-2 p-2"
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
          className="flex text-white bg-purple-400 hover:bg-purple-500 rounded-lg justify-center w-full my-2 p-2"
          onClick={async (e) => {
            e.preventDefault();
            router.push("/signup");
          }}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default Signin;
