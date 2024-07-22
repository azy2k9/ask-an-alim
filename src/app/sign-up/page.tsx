"use client";

import React from "react";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { SignupSchema } from "../../schema/SignupSchema";
import type { SignupForm } from "../../schema/SignupSchema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import FormField from "../_components/FormField";
import { api } from "~/trpc/react";
import clsx from "clsx";

const Signup = () => {
  const router = useRouter();
  const createUser = api.auth.createUser.useMutation();
  const {
    handleSubmit,
    control,
    formState: { isValid: isFormValid },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
  });

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(async (formDetails) => {
        createUser.mutate(formDetails, {
          async onSuccess(createdUser, variables) {
            // TODO: toast for a success here and setTimeout for like 3 seconds

            const response = await signIn("credentials", {
              email: createdUser.email,
              password: variables.password,
              redirect: false,
            });

            if (response?.error) {
              // TODO: Display toast error
              console.log(response.error);
            }

            if (response?.ok) {
              router.push("/");
              router.refresh();
            }
          },
        });
      })}
    >
      <FormField name="name" placeholder="Name..." control={control} />
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
          className={clsx(
            !isFormValid
              ? "bg-gray-400  hover:bg-gray-500"
              : "bg-purple-300 hover:bg-purple-400",
            "btn text-white rounded-lg justify-right w-full mt-2 p-2",
          )}
          disabled={!isFormValid}
        >
          Sign Up
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
          <span>Sign Up with Google</span>
        </button>
        <button
          className="flex text-white bg-purple-400 hover:bg-purple-500 rounded-lg justify-center w-full my-2 p-2"
          onClick={async (e) => {
            e.preventDefault();
            router.push("/sign-in");
          }}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default Signup;
